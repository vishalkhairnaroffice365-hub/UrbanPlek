"""
backend/main.py
Flask API for UrbanPlek Property Listings
"""

import os
import json
import uuid
import random
import string
import requests
import math
import concurrent.futures
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
import cloudinary.api
from io import BytesIO

# --- Concurrency & Optimization Setup ---
# Global thread pool prevents the overhead of creating threads for each request
io_executor = concurrent.futures.ThreadPoolExecutor(max_workers=50)

# Global HTTP session handles connection pooling to Cloudinary for massive speedups
http_session = requests.Session()
http_session.mount('https://', requests.adapters.HTTPAdapter(pool_connections=50, pool_maxsize=100))

# --- Configuration ---
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Database Config (SQLite for this example)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://neondb_owner:npg_Deu7yNLkw3Cq@ep-rough-boat-a112rjp2-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Cloudinary Config (Replace with your actual credentials)
cloudinary.config(
    cloud_name="ddb48bzp5",
    api_key="286951315187484",
    api_secret="K6amhqcelI_pzHR29-toFIDUi0Y"
)

# --- Database Models ---
class Listing(db.Model):
    """
    Lightweight model storing only metadata and the reference to the full data JSON.
    """
    id = db.Column(db.String(36), primary_key=True)
    property_type = db.Column(db.String(50), nullable=False) # residential, student, commercial, land
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_verified = db.Column(db.Boolean, default=False)
    data_url = db.Column(db.String(500), nullable=False) # URL to the JSON file on Cloudinary

    # Add fields for efficient filtering and searching
    name = db.Column(db.String(200), nullable=True)
    location = db.Column(db.String(200), nullable=True)
    price = db.Column(db.Integer, nullable=True)
    subtype = db.Column(db.String(50), nullable=True) # e.g., PG, Hostel, Room/Flat
    listing_action = db.Column(db.String(50), nullable=True) # e.g., Rent, Sale
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'property_type': self.property_type,
            'created_at': self.created_at.isoformat(),
            'is_verified': self.is_verified,
            'data_url': self.data_url,
            'name': self.name,
            'location': self.location,
            'price': self.price,
            'subtype': self.subtype,
            'listing_action': self.listing_action,
            'lat': self.lat,
            'lng': self.lng,
        }

# --- Helper Functions ---

def upload_to_cloudinary(file_obj, resource_type="image", folder="urbanplek"):
    """
    Uploads a file (image or raw JSON) to Cloudinary.
    """
    try:
        response = cloudinary.uploader.upload(
            file_obj,
            resource_type=resource_type,
            folder=folder
        )
        return response['secure_url']
    except Exception as e:
        print(f"Error uploading to Cloudinary: {e}")
        return None

def fetch_json_data(url):
    """
    Fetches JSON data from a remote URL.
    """
    try:
        # Utilize connection pooling and a timeout so dead threads don't lock the executor
        resp = http_session.get(url, timeout=7)
        if resp.status_code == 200:
            return resp.json()
    except Exception as e:
        print(f"Error fetching JSON from {url}: {e}")
    return {}

# --- Routes ---

@app.route('/api/listings', methods=['POST'])
def add_listing():
    """
    Endpoint to add a property.
    Expects:
    - multipart/form-data
    - 'data': JSON string containing text fields (title, price, location, etc.)
    - 'images': List of file objects
    - 'type': String (residential, student, land, commercial)
    """
    try:
        # 1. Parse Basic Data
        listing_type = request.form.get('type')
        raw_data_str = request.form.get('data')
        if not listing_type or not raw_data_str:
            return jsonify({"error": "Missing type or data"}), 400
        
        listing_data = json.loads(raw_data_str)
        files = request.files.getlist('images')
        
        # Generate a truly unique ID for this listing to prevent collisions
        listing_id = f"LST-{uuid.uuid4()}"
        listing_data['id'] = listing_id
        listing_data['type'] = listing_type
        listing_data['created_at'] = datetime.utcnow().isoformat()

        # 2. Upload Images Concurrently
        image_urls = []
        if files:
            # We map the upload function to each file using the global executor
            future_to_file = {
                io_executor.submit(upload_to_cloudinary, file, "image", "urbanplek/images"): file 
                for file in files
            }
            for future in concurrent.futures.as_completed(future_to_file):
                url = future.result()
                if url:
                    image_urls.append(url)
        
        # Add image URLs to the data payload
        listing_data['images'] = image_urls

        # 3. Create JSON File and Upload to Cloudinary
        # Convert dict to JSON bytes
        json_buffer = BytesIO(json.dumps(listing_data).encode('utf-8'))
        json_buffer.name = f"{listing_id}.json" # Naming the "file"
        
        # Upload the JSON file as a 'raw' resource
        json_url = upload_to_cloudinary(json_buffer, "raw", "urbanplek/data")
        
        if not json_url:
            return jsonify({"error": "Failed to save listing data"}), 500

        # 4. Safely parse price for DB storage
        price_for_db = None
        try:
            # Ensure price is a clean integer for filtering
            price_for_db = int(listing_data.get('price'))
        except (ValueError, TypeError):
            # If price is not a valid integer (e.g., contains commas or is None), store as null
            pass

        lat_for_db = None
        lng_for_db = None
        try:
            if listing_data.get('latitude'): lat_for_db = float(listing_data.get('latitude'))
            elif listing_data.get('lat'): lat_for_db = float(listing_data.get('lat'))
            
            if listing_data.get('longitude'): lng_for_db = float(listing_data.get('longitude'))
            elif listing_data.get('lng'): lng_for_db = float(listing_data.get('lng'))
        except (ValueError, TypeError):
            pass

        # 4. Save Metadata to Database
        new_listing = Listing(
            id=listing_id,
            property_type=listing_type,
            data_url=json_url,
            is_verified=False, # Default to false until admin verifies
            # Populate new fields from the JSON data
            name=listing_data.get('name') or listing_data.get('title'),
            location=listing_data.get('location'),
            price=price_for_db,
            subtype=listing_data.get('accommodationType') or listing_data.get('subtype'), # Save the specific type (PG, Hostel, Room)
            listing_action=listing_data.get('listingType'),
            lat=lat_for_db,
            lng=lng_for_db
        )
        
        db.session.add(new_listing)
        db.session.commit()

        return jsonify({
            "message": "Listing added successfully", 
            "id": listing_id,
            "data_url": json_url
        }), 201

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/listings', methods=['GET'])
def get_listings():
    """
    Get listings for cards.
    Params:
    - type: (optional) Filter by property type
    - page: (optional) Page number, default 1
    - limit: (optional) Items per page, default 10
    - search: (optional) Search term for name and location
    - price_min: (optional) Minimum price
    - price_max: (optional) Maximum price
    - subtype: (optional) Filter by specific accommodation type
    - lat: (optional) Latitude for geographic search
    - lng: (optional) Longitude for geographic search
    - radius: (optional) Radius in kilometers for geographic search
    """
    try:
        # 1. Query Database
        prop_type = request.args.get('type')
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        search_term = request.args.get('search')
        price_min = request.args.get('price_min')
        price_max = request.args.get('price_max')
        subtype = request.args.get('subtype')
        listing_action = request.args.get('listing_action')
        lat = request.args.get('lat', type=float)
        lng = request.args.get('lng', type=float)
        radius = request.args.get('radius', type=float, default=1.0)
        
        query = Listing.query
        if prop_type:
            query = query.filter_by(property_type=prop_type)
        
        if search_term:
            search_pattern = f"%{search_term}%"
            query = query.filter(db.or_(
                Listing.name.ilike(search_pattern),
                Listing.location.ilike(search_pattern)
            ))
            
        if subtype:
            query = query.filter(Listing.subtype.ilike(f"%{subtype}%"))
            
        if listing_action:
            query = query.filter(Listing.listing_action.ilike(f"%{listing_action}%"))

        if price_min:
            try:
                query = query.filter(Listing.price >= int(price_min))
            except ValueError:
                pass # Ignore if price_min is not a valid integer
        
        if price_max:
            try:
                query = query.filter(Listing.price <= int(price_max))
            except ValueError:
                pass # Ignore if price_max is not a valid integer
        
        def get_bounding_box(lat, lon, radius_km):
            lat_diff = radius_km / 111.0
            lon_diff = radius_km / (111.0 * math.cos(math.radians(lat)))
            return (lat - lat_diff, lat + lat_diff, lon - lon_diff, lon + lon_diff)

        def haversine(lat1, lon1, lat2, lon2):
            R = 6371 # Earth radius in kilometers
            dLat = math.radians(lat2 - lat1)
            dLon = math.radians(lon2 - lon1)
            a = math.sin(dLat/2) * math.sin(dLat/2) + \
                math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * \
                math.sin(dLon/2) * math.sin(dLon/2)
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
            return R * c

        if lat is not None and lng is not None:
            min_lat, max_lat, min_lng, max_lng = get_bounding_box(lat, lng, radius)
            query = query.filter(Listing.lat >= min_lat, Listing.lat <= max_lat,
                                 Listing.lng >= min_lng, Listing.lng <= max_lng)

        all_listings = query.order_by(Listing.created_at.desc()).all()

        if lat is not None and lng is not None:
            filtered_listings = []
            for listing in all_listings:
                if listing.lat is not None and listing.lng is not None:
                    dist = haversine(lat, lng, listing.lat, listing.lng)
                    if dist <= radius:
                        filtered_listings.append(listing)
            all_listings = filtered_listings

        total = len(all_listings)
        pages = math.ceil(total / limit) if limit > 0 else 0
        
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        
        listings_metadata = all_listings[start_idx:end_idx]
        
        results = []
        
        # 2. Fetch JSON Details Concurrently
        # We need the full data (Title, Price, Image) to show the card, which is in the JSON.
        # Create a map of future -> listing_obj to keep track utilizing the global thread pool
        future_to_listing = {
            io_executor.submit(fetch_json_data, listing.data_url): listing 
            for listing in listings_metadata
        }
        
        for future in concurrent.futures.as_completed(future_to_listing):
            listing_obj = future_to_listing[future]
            try:
                data = future.result()
                # Merge DB metadata with JSON data
                combined_data = {
                    "db_id": listing_obj.id,
                    "db_verified": listing_obj.is_verified,
                    **data # This spreads the JSON content (title, price, location, etc.)
                }
                if hasattr(listing_obj, 'travel_time_mins'):
                    combined_data["travel_time_mins"] = listing_obj.travel_time_mins
                results.append(combined_data)
            except Exception as exc:
                print(f"Generated an exception for {listing_obj.id}: {exc}")

        return jsonify({
            "listings": results,
            "total": total,
            "pages": pages,
            "current_page": page
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/search', methods=['GET'])
def search_listings():
    """
    Search listings using time filter and Distance Matrix API.
    """
    try:
        prop_type = request.args.get('type')
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        search_term = request.args.get('search')
        price_min = request.args.get('price_min')
        price_max = request.args.get('price_max')
        subtype = request.args.get('subtype')
        listing_action = request.args.get('listing_action')
        lat = request.args.get('lat', type=float)
        lng = request.args.get('lng', type=float)
        radius = request.args.get('radius', type=float, default=5.0)
        time_filter = request.args.get('time_filter', type=int)

        if time_filter:
            # Heuristic: 30 km/h average travel speed = 0.5 km/min
            radius = max(1.0, time_filter * 0.5)

        if lat is None or lng is None:
            return jsonify({"error": "Missing lat or lng"}), 400

        # Print all listings in the database
        all_db_listings = Listing.query.all()
        print(f"--- All Listings in Database ({len(all_db_listings)}) ---")
        for l in all_db_listings:
            print(f"ID: {l.id} | Location: {l.location} | Lat: {l.lat}, Lng: {l.lng}")
        print("-----------------------------------")
        
        query = Listing.query
        if prop_type:
            query = query.filter_by(property_type=prop_type)
        
        if search_term:
            search_pattern = f"%{search_term}%"
            query = query.filter(db.or_(
                Listing.name.ilike(search_pattern),
                Listing.location.ilike(search_pattern)
            ))
            
        if subtype:
            query = query.filter(Listing.subtype.ilike(f"%{subtype}%"))
            
        if listing_action:
            query = query.filter(Listing.listing_action.ilike(f"%{listing_action}%"))

        if price_min:
            try:
                query = query.filter(Listing.price >= int(price_min))
            except ValueError:
                pass
        
        if price_max:
            try:
                query = query.filter(Listing.price <= int(price_max))
            except ValueError:
                pass
        
        def get_bounding_box(lat, lon, radius_km):
            lat_diff = radius_km / 111.0
            lon_diff = radius_km / (111.0 * math.cos(math.radians(lat)))
            return (lat - lat_diff, lat + lat_diff, lon - lon_diff, lon + lon_diff)

        def haversine(lat1, lon1, lat2, lon2):
            R = 6371 # Earth radius in kilometers
            dLat = math.radians(lat2 - lat1)
            dLon = math.radians(lon2 - lon1)
            a = math.sin(dLat/2) * math.sin(dLat/2) + \
                math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * \
                math.sin(dLon/2) * math.sin(dLon/2)
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
            return R * c

        min_lat, max_lat, min_lng, max_lng = get_bounding_box(lat, lng, radius)
        query = query.filter(Listing.lat >= min_lat, Listing.lat <= max_lat,
                             Listing.lng >= min_lng, Listing.lng <= max_lng)

        all_listings = query.order_by(Listing.created_at.desc()).all()

        valid_listings = []
        for lst in all_listings:
            if lst.lat is not None and lst.lng is not None:
                dist = haversine(lat, lng, lst.lat, lst.lng)
                if dist <= radius:
                    lst.distance_km = round(dist, 2)
                    valid_listings.append(lst)
        
        all_listings = valid_listings
        
        print(f"\n=== SEARCH API: Locations within {radius:.2f} km of ({lat}, {lng}) ===")
        for lst in all_listings:
            print(f"-> ID: {lst.id} | Location: {lst.location} | Distance: {lst.distance_km} km")
        print("===========================================================================\n")

        total = len(all_listings)
        pages = math.ceil(total / limit) if limit > 0 else 0
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        listings_metadata = all_listings[start_idx:end_idx]
        
        results = []
        future_to_listing = {io_executor.submit(fetch_json_data, listing.data_url): listing for listing in listings_metadata}
        for future in concurrent.futures.as_completed(future_to_listing):
            listing_obj = future_to_listing[future]
            try:
                data = future.result()
                combined_data = {"db_id": listing_obj.id, "db_verified": listing_obj.is_verified, **data}
                if hasattr(listing_obj, 'distance_km'):
                    combined_data["distance_km"] = listing_obj.distance_km
                results.append(combined_data)
            except Exception as exc:
                print(f"Generated an exception for {listing_obj.id}: {exc}")

        return jsonify({"listings": results, "total": total, "pages": pages, "current_page": page}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/listings/<listing_id>', methods=['GET'])
def get_listing_details(listing_id):
    """
    Get full details for a specific listing.
    """
    try:
        listing = Listing.query.get(listing_id)
        if not listing:
            return jsonify({"error": "Listing not found"}), 404
        
        # Fetch the JSON data
        data = fetch_json_data(listing.data_url)
        
        # Merge
        result = {
            "db_id": listing.id,
            "db_verified": listing.is_verified,
            "db_created_at": listing.created_at,
            **data
        }
        
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- Init ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LuMapPin, 
  LuChevronLeft, 
  LuChevronRight, 
  LuLayoutGrid, 
  LuPhone, 
  LuMail, 
  LuHeart, 
  LuShare2, 
  LuCheck,
  LuX,
  LuDownload
} from 'react-icons/lu';

import { FaCheckCircle, FaWhatsapp, FaTwitter, FaFacebook, FaLink } from 'react-icons/fa';
import Header from '../home/header';
import dynamic from 'next/dynamic';
import OWNERPFP_IMAGE from "../../assets/ownerpfp.jpg"
import { BACKEND_URL } from '../../constants/constants';

const LeafletViewMap = dynamic(() => import('../map/LeafletViewMap'), { ssr: false });

const Listing = ({ listing_id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!listing_id) return;
    
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/listings/${listing_id}`);
        
        if (!response.ok) {
          if (response.status === 404) throw new Error('Listing not found or has been sold or taken down already');
          throw new Error('Failed to fetch listing details');
        }
        
        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listing_id]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleShareClick = () => {
    isMobile ? setShowShareMenu(true) : setShowShareMenu(!showShareMenu);
  }
  // Skeleton Loading UI
  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 animate-pulse">
          <div className="w-full aspect-[16/9] md:aspect-[2.4/1] bg-slate-200 rounded-xl mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="h-8 bg-slate-200 rounded w-3/4" />
                <div className="h-5 bg-slate-200 rounded w-1/2" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-slate-200 rounded-xl" />)}
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-slate-200 rounded w-1/4" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-lg">
                <div className="flex gap-3 mb-4 items-center">
                  <div className="w-12 h-12 bg-slate-200 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-12 bg-slate-200 rounded-xl" />
                  <div className="h-12 bg-slate-200 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // 404 / Error UI
  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-lg border border-slate-100">
            <h2 className="text-3xl font-bold mb-3 tracking-tight text-slate-900">Oops!</h2>
            <p className="text-slate-500 mb-6 leading-relaxed">{error}</p>
            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto shadow-md shadow-blue-200">
              <LuChevronLeft className="w-5 h-5" /> Go back home
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Fallbacks for data properties
  const propertyImages = data?.images?.length > 0 ? data.images : ["https://placehold.co/1920x1080?text=No+Image+Available"];
  
  // Combine amenities from different property types (residential/commercial use buildingAmenities & inFlatFeatures)
  let amenitiesList = [];
  if (Array.isArray(data?.amenities)) amenitiesList.push(...data.amenities);
  if (Array.isArray(data?.buildingAmenities)) amenitiesList.push(...data.buildingAmenities);
  if (Array.isArray(data?.inFlatFeatures)) amenitiesList.push(...data.inFlatFeatures);
  if (Array.isArray(data?.features)) amenitiesList.push(...data.features);
  
  // Remove duplicates just in case
  amenitiesList = [...new Set(amenitiesList)];

  // Dynamic specs to accommodate Residential, Commercial, Land, and Student listings
  const specs = [
    { label: "Type", value: data?.type ? data.type.charAt(0).toUpperCase() + data.type.slice(1) : "N/A" },
    ...(data?.listingType ? [{ label: "Listing", value: data.listingType }] : []),
    ...(data?.landType ? [{ label: "Land Type", value: data.landType }] : []),
    ...(data?.area ? [{ label: "Area", value: `${data.area} sq.ft` }] : []),
    ...(data?.plotArea ? [{ label: "Plot Area", value: `${data.plotArea} sq.ft` }] : []),
    ...(data?.length && data?.breadth ? [{ label: "Dimensions", value: `${data.length} x ${data.breadth}` }] : []),
    ...(data?.facing ? [{ label: "Facing", value: data.facing }] : []),
    ...(data?.bedrooms ? [{ label: "Bedrooms", value: `${data.bedrooms} BHK` }] : []),
    ...(data?.bathrooms ? [{ label: "Bathrooms", value: data.bathrooms }] : []),
    ...(data?.furnishing ? [{ label: "Furnishing", value: data.furnishing }] : []),
    ...(data?.zoning ? [{ label: "Zoning", value: data.zoning }] : []),
    ...(data?.capacity ? [{ label: "Capacity", value: data.capacity }] : []),
    ...(data?.visitTiming ? [{ label: "Visit Timing", value: data.visitTiming }] : []),
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  const getDaysAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Listed today';
    if (diffDays === 1) return 'Listed yesterday';
    return `Listed ${diffDays} days ago`;
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this property: ${data?.title || ''}`;

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      {/* Hero Section */}
      <div 
        className="relative w-full aspect-[16/9] md:aspect-[2.4/1] rounded-xl overflow-hidden group shadow-lg mb-6 animate-fade-in-up"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${propertyImages[currentImageIndex]})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
        </div>

        {/* Badges */}
        {data?.db_verified && (
          <div className="absolute top-6 left-6 flex gap-2">
            <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
              <FaCheckCircle className="w-3.5 h-3.5" />
              Verified
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 lg:opacity-100 lg:group-hover:scale-110"
        >
          <LuChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 lg:opacity-100 lg:group-hover:scale-110"
        >
          <LuChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div className="flex gap-2">
            {propertyImages.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
          <button 
            onClick={() => setShowAllPhotos(true)}
            className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/30 flex items-center gap-2 hover:bg-white/30 transition-colors"
          >
            <LuLayoutGrid className="w-4 h-4" />
            View {propertyImages.length} photos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{data?.title || 'Untitled Property'}</h1>
                <div className="flex items-center gap-2 text-slate-500 mt-2">
                  <LuMapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-base">{data?.location || data?.address || 'Location not specified'}</span>
                </div>
              </div>
              <div className="text-left md:text-right flex-shrink-0">
                <p className="text-2xl font-bold text-blue-600">₹{data?.price || 'Price on Request'}</p>
              </div>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            {specs.map((spec, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{spec.label}</p>
                <div className="flex items-center gap-1.5">
                  <FaCheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-900 text-sm">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">About Property</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {data?.description || data?.about || 'No description available for this property.'}
            </p>
          </div>

          {/* Amenities */}
          {amenitiesList.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                      <LuCheck className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span className="font-medium text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location Map */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Location</h3>
            <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200">
              {data?.latitude && data?.longitude ? (
                <>
                  <LeafletViewMap latitude={data.latitude} longitude={data.longitude} />
                  <a 
                    href={`https://maps.google.com/?q=${data.latitude},${data.longitude}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label="Open in Google Maps"
                  />
                  <a 
                    href={`https://maps.google.com/?q=${data.latitude},${data.longitude}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors z-20 pointer-events-auto"
                  >
                    Open in Maps
                  </a>
                </>
              ) : (
                <>
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80')" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-600 rounded-full animate-ping opacity-75 absolute" />
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl relative z-10">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Agent Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100">
                  <img 
                    src={OWNERPFP_IMAGE.src} 
                    alt="Agent" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{data?.fullName || data?.agent?.name || 'Contact Agent'}</h4>
                  <p className="text-sm text-slate-500">{getDaysAgo(data?.created_at || data?.db_created_at)}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <a href={data?.whatsapp ? `tel:${data.whatsapp}` : '#'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-200 text-sm">
                  <LuPhone className="w-5 h-5" />
                  Call Now
                </a>
                <a href={data?.whatsapp ? `https://wa.me/${data.whatsapp}` : '#'} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-slate-200 text-sm">
                  <LuMail className="w-5 h-5" />
                  Send Message
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 relative">
              <button 
                onClick={handleShareClick}
                className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 py-3 rounded-xl font-bold text-slate-700 transition-colors shadow-sm text-sm"
              >
                {copied ? <LuCheck className="w-5 h-5 text-green-600" /> : <LuShare2 className="w-5 h-5 text-blue-600" />}
                {copied ? 'Copied URL!' : 'Share'}
              </button>

              {showShareMenu && !isMobile && (
                  <div className="absolute bottom-full mb-2 right-0 left-0 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 p-2 animate-fade-in-up">
                    <a 
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                      onClick={() => setShowShareMenu(false)}
                    >
                      <FaWhatsapp className="w-5 h-5 text-green-500" /> WhatsApp
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                      onClick={() => setShowShareMenu(false)}
                    >
                      <FaTwitter className="w-5 h-5 text-blue-400" /> Twitter
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                      onClick={() => setShowShareMenu(false)}
                    >
                      <FaFacebook className="w-5 h-5 text-blue-600" /> Facebook
                    </a>
                    <button 
                      onClick={() => {
                        handleShare();
                        setShowShareMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700 transition-colors"
                    >
                      <FaLink className="w-5 h-5 text-slate-500" /> Copy Link
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Share Sheet */}
      {showShareMenu && isMobile && (
        <div className="fixed inset-0 z-[10000] flex items-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowShareMenu(false)}></div>
          <div className="relative w-full bg-white rounded-t-2xl p-4 pb-6 animate-slide-in-up">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-bold text-center mb-4 text-slate-800">Share this property</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-slate-600 hover:text-blue-600">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center"><FaWhatsapp className="w-7 h-7 text-green-500" /></div>
                <span className="text-xs font-medium">WhatsApp</span>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-slate-600 hover:text-blue-600">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center"><FaTwitter className="w-7 h-7 text-blue-400" /></div>
                <span className="text-xs font-medium">Twitter</span>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-slate-600 hover:text-blue-600">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center"><FaFacebook className="w-7 h-7 text-blue-600" /></div>
                <span className="text-xs font-medium">Facebook</span>
              </a>
              <button onClick={handleShare} className="flex flex-col items-center gap-2 text-slate-600 hover:text-blue-600">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center"><FaLink className="w-6 h-6 text-slate-500" /></div>
                <span className="text-xs font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
            <button 
              onClick={() => setShowShareMenu(false)}
              className="mt-6 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Photo Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-[10000] bg-black/95 overflow-y-auto">
          <div className="min-h-screen px-4 py-12 flex items-center justify-center">
            <button 
              onClick={() => setShowAllPhotos(false)}
              className="fixed top-6 right-6 z-50 text-white/90 hover:text-white flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all"
            >
              <span className="text-sm font-medium">Close</span>
              <LuX className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
              {propertyImages.map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 shadow-2xl group">
                  <img src={img} alt={`${data?.title || 'Property'} - Photo ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Listing;

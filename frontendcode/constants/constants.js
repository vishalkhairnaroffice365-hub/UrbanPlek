import { 
  MdElevator, 
  MdLocalParking, 
  MdSecurity, 
  MdFitnessCenter, 
  MdBalcony, 
  MdKitchen, 
  MdWaterDrop, 
  MdAcUnit 
} from 'react-icons/md';

export const INITIAL_DATA = {
  title: '',
  propertyType: 'Apartment / Flat',
  listingType: 'Rent',
  location: '',
  bhk: '1 BHK',
  area: '',
  floor: '',
  furnishing: 'Unfurnished',
  buildingAmenities: [],
  inFlatFeatures: [],
  visuals: [],
  fullName: '',
  whatsapp: '',
  visitTiming: 'Weekdays Morning',
  proTip: '',
};

export const PROPERTY_TYPES = [
  'Apartment / Flat',
  'Independent House / Villa',
  'Studio Apartment',
  'Penthouse'
];

export const BHK_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '3.5+ BHK'];

export const FURNISHING_OPTIONS = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];

export const BUILDING_AMENITIES = [
  { icon: MdElevator, label: 'Elevator' },
  { icon: MdLocalParking, label: 'Parking' },
  { icon: MdSecurity, label: 'Security' },
  { icon: MdFitnessCenter, label: 'Gym' },
];

export const IN_FLAT_FEATURES = [
  { icon: MdBalcony, label: 'Balcony' },
  { icon: MdAcUnit, label: 'A/C Ready' },
  { icon: MdKitchen, label: 'Modular Kit' },
  { icon: MdWaterDrop, label: 'Gas Pipeline' },
];

export const VISIT_TIMINGS = ['Weekdays Morning', 'Weekdays Evening', 'Weekends Anytime'];

export const BACKEND_URL = "https://urbanplek-website-backend.vercel.app"

export const CONTACT_DETAILS = {
  address: {
    line1: "Jivan Vihar Apartment,",
    line2: "Beside Harshal Electricals, Bhabha Nagar, Nashik",
    full: "Jivan Vihar Apartment, B wing, Flat no 3, Beside Harshal Electricals, Bhabha Nagar, Nashik",
    mapLink: "https://maps.app.goo.gl/pUHHDc1i2spyCQTZA"
  },
  emails: {
    general: "urbanplek@gmail.com",
    careers: "urbanplek@gmail.com",
    partners: "urbanplek@gmail.com",
    support: "urbanplek@gmail.com"
  },
  phones: {
    general: "+91 98500 57411",
    partners: "+91 98500 57411",
    tollFree: "+91 98500 57411"
  }
};

export const SOCIAL_MEDIA = {
  instagram: "https://www.instagram.com/urbanplek/",
  linkedin: "https://www.linkedin.com/company/urbanplek/",
  twitter: "#"
};
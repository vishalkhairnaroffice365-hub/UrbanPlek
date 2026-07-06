import React from 'react';
import { MdInfoOutline, MdLocationOn } from 'react-icons/md';
import { SectionTitle } from "../residential/SectionTitle";
import { InputGroup } from "../residential/InputGroup";

const COMMERCIAL_PROPERTY_TYPES = [
  'Office Space', 'Shop', 'Showroom', 'Warehouse', 'Co-working', 'Industrial Shed',
];

export const BasicDetails = ({ formData, handleInputChange }) => {
  return (
    <section id="basic-details" className="scroll-mt-28 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <SectionTitle icon={MdInfoOutline} title="Basic Details" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Catchy Property Title" className="col-span-2">
          <input 
            type="text" 
            placeholder="e.g. Premium Office Space in College Road" 
            className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium placeholder:text-slate-400 text-sm"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </InputGroup>

        <InputGroup label="Property Type">
          <div className="relative">
            <select 
              className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium appearance-none cursor-pointer text-sm"
              value={formData.propertyType}
              onChange={(e) => handleInputChange('propertyType', e.target.value)}
            >
              {COMMERCIAL_PROPERTY_TYPES.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </InputGroup>

        <InputGroup label="Listing Type">
          <div className="flex p-1 bg-slate-100 rounded-lg h-11 relative">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-md shadow-sm transition-all duration-300 ease-out ${formData.listingType === 'Sale' ? 'left-[calc(50%+2px)]' : 'left-1'}`}
            ></div>
            {['Rent', 'Sale'].map((type) => (
              <button 
                key={type}
                className={`flex-1 relative z-10 text-sm font-bold transition-colors ${formData.listingType === type ? 'text-slate-800' : 'text-slate-500'}`}
                onClick={() => handleInputChange('listingType', type)}
              >
                {type}
              </button>
            ))}
          </div>
        </InputGroup>

        <InputGroup label="Location in Nashik" className="col-span-2">
          <div className="relative">
            <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input 
              type="text" 
              placeholder="Locality, Landmark or Society Name" 
              className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium placeholder:text-slate-400 text-sm"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
        </InputGroup>
      </div>
    </section>
  );
};
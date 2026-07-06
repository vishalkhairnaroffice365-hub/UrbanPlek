'use client'

import React, { useState } from 'react';
import { MdPlayCircleOutline } from 'react-icons/md';

import { BACKEND_URL } from '../../../constants/constants';
import Header from '../../home/header';
import { BasicDetails } from './BasicDetails';
import { PlotDetails } from './PlotDetails';
import { Features } from './Features';
import { Visuals } from './Visuals';
import { ContactInformation } from './ContactInformation';

const INITIAL_LAND_DATA = {
  title: '',
  landType: 'Residential Plot',
  listingType: 'Sell',
  price: '',
  location: '',
  plotArea: '',
  length: '',
  breadth: '',
  facing: '',
  features: [],
  fullName: '',
  whatsapp: '',
  visitTiming: '',
  images: [],
  latitude: '',
  longitude: '',
};

export default function ListLandFormHero() {
  const [formData, setFormData] = useState(INITIAL_LAND_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [missingFieldsList, setMissingFieldsList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (files) => {
    setFormData(prev => ({ ...prev, images: files }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const list = prev[field];
      return {
        ...prev,
        [field]: list.includes(item) ? list.filter(i => i !== item) : [...list, item]
      };
    });
  };

  const handleSubmit = () => {
    const requiredFields = [
      { key: 'title', label: 'Property Title' },
      { key: 'landType', label: 'Land Type' },
      { key: 'price', label: 'Expected Price' },
      { key: 'location', label: 'Location' },
      { key: 'plotArea', label: 'Plot Area (sq.ft.)' },
      { key: 'listingType', label: 'Listing Type' },
      { key: 'images', label: 'Upload at least one property image' },
      { key: 'longitude', label: 'Pin the property on the map' },
      { key: 'fullName', label: 'Full Name' },
      { key: 'whatsapp', label: 'WhatsApp Number' },
      { key: 'visitTiming', label: 'Preferred Visit Timings' },
    ];

    const missingFields = requiredFields.filter(field => {
      const value = formData[field.key];
      if (field.key === 'images') {
        return !value || value.length === 0;
      }
      return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
      setMissingFieldsList(missingFields.map(f => f.label));
      setIsErrorModalOpen(true);
      return;
    }

    setIsModalOpen(true);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submitData = { ...formData };
      if (submitData.latitude && submitData.longitude) {
        submitData.googleMapsUrl = `https://www.google.com/maps?q=${submitData.latitude},${submitData.longitude}`;
      }

      const { images, ...jsonPayload } = submitData;
      const formDataToSend = new FormData();
      formDataToSend.append('type', 'land');
      formDataToSend.append('data', JSON.stringify(jsonPayload));

      if (formData.images && formData.images.length > 0) {
        Array.from(formData.images).forEach((file) => {
          formDataToSend.append('images', file);
        });
      }

      const response = await fetch(`${BACKEND_URL}/api/listings`, { method: 'POST', body: formDataToSend });

      if (response.ok) {
        alert('Land listing submitted successfully! Our team will verify it and the page will now refresh.');
        window.location.reload();
      } else {
        const res = await response.json();
        alert('Submission failed: ' + (res.error || 'Unknown error'));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during submission.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] font-[var(--font-sans)] text-[#111318]">
      
      <Header />
      
      <main className="max-w-[800px] mx-auto px-6 py-8 space-y-10 pb-32 animate-slide-up pt-24">
          
        <section>
          <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900">List Your Land / Plot</h1>
          <p className="text-slate-500 text-base font-medium">Sell or rent out your residential plots, agricultural land, or industrial plots quickly.</p>
        </section>

        <BasicDetails formData={formData} handleInputChange={handleInputChange} />
        
        <PlotDetails formData={formData} handleInputChange={handleInputChange} />

        {/* Price Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Pricing Details</h2>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900">
              Expected Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="Enter expected price"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </section>

        <Features formData={formData} toggleArrayItem={toggleArrayItem} />

        <Visuals formData={formData} handleInputChange={handleInputChange} onFileChange={handleFileChange} />

        <ContactInformation formData={formData} handleInputChange={handleInputChange} />

        <div className="pt-4">
          <button 
            onClick={handleSubmit}
            className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl text-lg font-extrabold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-300"
          >
            Submit for Verification
          </button>
          <div className="text-center mt-4 space-y-1">
            <p className="text-[var(--color-primary)] font-semibold text-xs">Your listing will be live once our team verifies the property details.</p>
            <p className="text-slate-400 text-[10px]">By clicking submit, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>

      </main>

      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={formData} 
        onConfirm={handleFinalSubmit} 
        isSubmitting={isSubmitting}
      />

      {isErrorModalOpen && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200 scale-100">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900">Missing Information</h3>
              <p className="text-slate-500 font-medium">Please fill in the following fields to proceed:</p>
              
              <div className="w-full bg-red-50 rounded-xl p-4 text-left border border-red-100 max-h-60 overflow-y-auto">
                <ul className="space-y-2">
                  {missingFieldsList.map((field, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-red-700 font-semibold">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      {field}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setIsErrorModalOpen(false)}
                className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-red-600/20"
              >
                Okay, got it
              </button>
            </div>
          </div>
        </div>
      )}

          <a 
            href="#" 
            className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all hover:-translate-y-1 flex items-center gap-2 font-bold text-sm"
          >
            <MdPlayCircleOutline className="text-xl" />
            <span>Need help for listing? Watch YouTube video</span>
          </a>
    </div>
  );
}

function ReviewModal({ isOpen, onClose, data, onConfirm, isSubmitting }) {
  if (!isOpen) return null;

  const displayFields = [
    { key: 'title', label: 'Property Title' },
    { key: 'landType', label: 'Land Type' },
    { key: 'listingType', label: 'Listing Type' },
    { key: 'price', label: 'Price' },
    { key: 'location', label: 'Location' },
    { key: 'plotArea', label: 'Plot Area' },
    { key: 'length', label: 'Length' },
    { key: 'breadth', label: 'Breadth' },
    { key: 'facing', label: 'Facing' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'visitTiming', label: 'Visit Timing' },
  ];

  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 scale-100">
        <h3 className="text-2xl font-bold mb-6 text-slate-900">Review Plot Details</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayFields.map(({ key, label }) => (
              <div key={key} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                <p className="font-semibold text-slate-900 break-words">
                  {data[key] || <span className="text-slate-400 italic">Not provided</span>}
                </p>
              </div>
            ))}
          </div>

          {data.features?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Features</h4>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {data.features.map(item => (
                    <span key={item} className="bg-blue-50 text-[var(--color-primary)] px-3 py-1 rounded-lg text-xs font-bold">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-8 pt-4 border-t border-slate-100">
          {!isSubmitting && (
            <button onClick={onClose} className="flex-1 px-6 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Edit Details</button>
          )}
          <button 
            onClick={onConfirm} 
            disabled={isSubmitting}
            className={`flex-1 bg-[var(--color-primary)] text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting, please don\'t refresh or close the window...' : 'Confirm & Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
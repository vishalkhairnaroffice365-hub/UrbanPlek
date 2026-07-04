import React from 'react';
import { MdContactPhone } from 'react-icons/md';
import { SectionTitle } from "../residential/SectionTitle";
import { InputGroup } from "../residential/InputGroup";
import { Chip } from "../residential/Chip";
import { VISIT_TIMINGS } from '../../../constants/constants';

export const ContactInfo = ({ formData, handleInputChange }) => {
  return (
    <section id="contact" className="scroll-mt-28 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <SectionTitle icon={MdContactPhone} title="Contact Information" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="Full Name">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium text-sm"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
        </InputGroup>

        <InputGroup label="WhatsApp Number">
          <div className="flex gap-2">
            <div className="w-16 h-11 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold border border-slate-200 text-slate-600">
              +91
            </div>
            <input 
              type="tel" 
              placeholder="Mobile Number" 
              className="flex-1 h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all font-medium text-sm"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            />
          </div>
        </InputGroup>

        <div className="col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Visit Timings</label>
          <div className="flex flex-wrap gap-2">
            {VISIT_TIMINGS.map((opt) => (
              <Chip 
                key={opt} 
                label={opt} 
                selected={formData.visitTiming === opt} 
                onClick={() => handleInputChange('visitTiming', opt)} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
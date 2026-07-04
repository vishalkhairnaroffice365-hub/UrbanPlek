import React, { useState } from 'react';
import { MdPool, MdAdd, MdCheck, MdClose } from 'react-icons/md';
import { BUILDING_AMENITIES, IN_FLAT_FEATURES } from '../../../constants/constants';
import { SectionTitle } from './SectionTitle';
import { AmenityCard } from './AmenityCard';

export const Amenities = ({ formData, toggleArrayItem }) => {
  // Local state to manage which section is currently showing an input field
  const [activeInput, setActiveInput] = useState(null); // 'building' | 'unit' | null
  const [customValue, setCustomValue] = useState("");

  const handleSubmitCustom = (category) => {
    const trimmed = customValue.trim();
    if (trimmed !== "") {
      // Add to formData if not already present
      if (!formData[category].includes(trimmed)) {
        toggleArrayItem(category, trimmed);
      }
      // Reset UI
      setCustomValue("");
      setActiveInput(null);
    }
  };

  const renderAddButton = (category) => {
    const isEditing = activeInput === category;

    if (isEditing) {
      return (
        <div className="flex items-center gap-2 p-2 border border-[var(--color-primary)] rounded-lg bg-white shadow-sm transition-all animate-in fade-in zoom-in duration-200">
          <input
            autoFocus
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitCustom(category)}
            placeholder="Type here..."
            className="w-full text-xs font-bold outline-none bg-transparent px-1"
          />
          <button 
            onClick={() => handleSubmitCustom(category)}
            className="text-green-600 hover:bg-green-50 p-1 rounded transition-colors"
          >
            <MdCheck className="text-lg" />
          </button>
          <button 
            onClick={() => { setActiveInput(null); setCustomValue(""); }}
            className="text-slate-400 hover:bg-slate-100 p-1 rounded transition-colors"
          >
            <MdClose className="text-lg" />
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => setActiveInput(category)}
        className="flex items-center justify-center gap-2 p-3 border border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all text-slate-500 bg-slate-50"
      >
        <MdAdd className="text-lg" />
        <span className="text-xs font-bold">Add Other</span>
      </button>
    );
  };

  return (
    <section id="amenities" className="scroll-mt-28 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <SectionTitle icon={MdPool} title="Amenities" />
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Building Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {BUILDING_AMENITIES.map((item) => (
              <AmenityCard 
                key={item.label}
                icon={item.icon}
                label={item.label}
                selected={formData.buildingAmenities.includes(item.label)}
                onClick={() => toggleArrayItem('buildingAmenities', item.label)}
              />
            ))}
            {/* Custom Building Amenities */}
            {formData.buildingAmenities
              .filter(val => !BUILDING_AMENITIES.some(a => a.label === val))
              .map((customLabel) => (
                <AmenityCard 
                  key={customLabel}
                  icon={MdAdd} 
                  label={customLabel}
                  selected={true}
                  onClick={() => toggleArrayItem('buildingAmenities', customLabel)}
                />
              ))}
            {renderAddButton('buildingAmenities')}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">In-Flat Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {IN_FLAT_FEATURES.map((item) => (
              <AmenityCard 
                key={item.label}
                icon={item.icon}
                label={item.label}
                selected={formData.inFlatFeatures.includes(item.label)}
                onClick={() => toggleArrayItem('inFlatFeatures', item.label)}
              />
            ))}
            {/* Custom Unit Features */}
            {formData.inFlatFeatures
              .filter(val => !IN_FLAT_FEATURES.some(f => f.label === val))
              .map((customLabel) => (
                <AmenityCard 
                  key={customLabel}
                  icon={MdAdd} 
                  label={customLabel}
                  selected={true}
                  onClick={() => toggleArrayItem('inFlatFeatures', customLabel)}
                />
              ))}
            {renderAddButton('inFlatFeatures')}
          </div>
        </div>
      </div>
    </section>
  );
};
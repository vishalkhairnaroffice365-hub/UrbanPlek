import React, { useState } from 'react';
import { 
  MdPool, 
  MdAdd,
  MdWaterDrop,
  MdElectricBolt,
  MdAddRoad,
  MdFence,
  MdCropSquare,
  MdSecurity,
  MdCheck,
  MdClose
} from 'react-icons/md';
import { SectionTitle } from '../residential/SectionTitle';
import { AmenityCard } from '../residential/AmenityCard';

const LAND_FEATURES = [
  { label: 'Water Connection', icon: MdWaterDrop },
  { label: 'Electricity', icon: MdElectricBolt },
  { label: 'Road Access', icon: MdAddRoad },
  { label: 'Boundary Wall', icon: MdFence },
  { label: 'Corner Plot', icon: MdCropSquare },
  { label: 'Gated Society', icon: MdSecurity },
];

export const Features = ({ formData, toggleArrayItem }) => {
  const [activeInput, setActiveInput] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const handleSubmitCustom = () => {
    const trimmed = customValue.trim();
    if (trimmed !== "") {
      if (!formData.features.includes(trimmed)) {
        toggleArrayItem('features', trimmed);
      }
      setCustomValue("");
      setActiveInput(false);
    }
  };

  return (
    <section id="features" className="scroll-mt-28 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <SectionTitle icon={MdPool} title="Features & Amenities" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {LAND_FEATURES.map((item) => (
          <AmenityCard 
            key={item.label}
            icon={item.icon}
            label={item.label}
            selected={formData.features.includes(item.label)}
            onClick={() => toggleArrayItem('features', item.label)}
          />
        ))}

        {/* Custom Features */}
        {formData.features
          .filter(val => !LAND_FEATURES.some(f => f.label === val))
          .map((customLabel) => (
            <AmenityCard 
              key={customLabel}
              icon={MdAdd} 
              label={customLabel}
              selected={true}
              onClick={() => toggleArrayItem('features', customLabel)}
            />
          ))}

        {activeInput ? (
          <div className="flex items-center gap-2 p-2 border border-[var(--color-primary)] rounded-lg bg-white shadow-sm transition-all animate-in fade-in zoom-in duration-200">
            <input
              autoFocus
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitCustom()}
              placeholder="Type here..."
              className="w-full text-xs font-bold outline-none bg-transparent px-1"
            />
            <button 
              onClick={handleSubmitCustom}
              className="text-green-600 hover:bg-green-50 p-1 rounded transition-colors"
            >
              <MdCheck className="text-lg" />
            </button>
            <button 
              onClick={() => { setActiveInput(false); setCustomValue(""); }}
              className="text-slate-400 hover:bg-slate-100 p-1 rounded transition-colors"
            >
              <MdClose className="text-lg" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setActiveInput(true)}
            className="flex items-center justify-center gap-2 p-3 border border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all text-slate-500 bg-slate-50"
          >
            <MdAdd className="text-lg" />
            <span className="text-xs font-bold">Add Other</span>
          </button>
        )}
      </div>
    </section>
  );
};
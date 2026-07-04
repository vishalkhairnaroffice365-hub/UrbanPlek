import React, { useState } from 'react';
import { 
  MdPool, 
  MdAdd,
  MdWifi,
  MdAcUnit,
  MdRestaurant,
  MdLocalLaundryService,
  MdCleaningServices,
  MdVideocam,
  MdSecurity,
  MdMeetingRoom,
  MdLocalParking,
  MdHotTub,
  MdBathtub,
  MdDesktopWindows,
  MdCheck,
  MdClose
} from 'react-icons/md';
import { SectionTitle } from '../residential/SectionTitle';
import { AmenityCard } from '../residential/AmenityCard';

const STUDENT_AMENITIES = [
  { label: 'Wi-Fi', icon: MdWifi },
  { label: 'AC', icon: MdAcUnit },
  { label: 'Food/Mess', icon: MdRestaurant },
  { label: 'Laundry', icon: MdLocalLaundryService },
  { label: 'Housekeeping', icon: MdCleaningServices },
  { label: 'CCTV', icon: MdVideocam },
  { label: 'Security', icon: MdSecurity },
  { label: 'Common Room', icon: MdMeetingRoom },
  { label: 'Parking', icon: MdLocalParking },
  { label: 'Geyser', icon: MdHotTub },
  { label: 'Attached Bathroom', icon: MdBathtub },
  { label: 'Study Table', icon: MdDesktopWindows },
];

export const Amenities = ({ formData, toggleArrayItem }) => {
  // Local state to manage which section is currently showing an input field
  const [activeInput, setActiveInput] = useState(null); // 'amenities' | null
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
      <SectionTitle icon={MdPool} title="Amenities & Features" />
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Select all available amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {STUDENT_AMENITIES.map((item) => (
              <AmenityCard 
                key={item.label}
                icon={item.icon}
                label={item.label}
                selected={formData.amenities.includes(item.label)}
                onClick={() => toggleArrayItem('amenities', item.label)}
              />
            ))}
            {/* Custom Amenities */}
            {formData.amenities
              .filter(val => !STUDENT_AMENITIES.some(a => a.label === val))
              .map((customLabel) => (
                <AmenityCard 
                  key={customLabel}
                  icon={MdAdd} 
                  label={customLabel}
                  selected={true}
                  onClick={() => toggleArrayItem('amenities', customLabel)}
                />
              ))}
            {renderAddButton('amenities')}
          </div>
        </div>
      </div>
    </section>
  );
};
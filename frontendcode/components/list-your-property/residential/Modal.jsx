import React from 'react';
import Icon from "./Icon"
import { MdClose } from 'react-icons/md';

export const Modal = ({ isOpen, onClose, data, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-scale-in flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-slate-800">Confirm Details</h3>
          <button onClick={onClose} className="p-1.5 rounded-full transition-colors">
            <MdClose className="text-lg text-slate-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-3">Property Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Title</p>
                <p className="font-bold text-slate-800 text-base">{data.title || 'Untitled Property'}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Type</p>
                <p className="font-bold text-slate-800 text-sm">
                  {data.accommodationType
                    ? `${data.sharingType || ''} in a ${data.accommodationType} for ${data.gender}`
                    : `${data.bhk} ${data.propertyType} for ${data.listingType}`}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Location</p>
                <p className="font-bold text-slate-800 text-sm">{data.location || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Price/Rent</p>
                <p className="font-bold text-slate-800 text-sm">₹ -- (Not set)</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-800 mb-3 border-b pb-2">Amenities Selected</h4>
            <div className="flex flex-wrap gap-2">
              {(data.amenities || [...(data.buildingAmenities || []), ...(data.inFlatFeatures || [])]).length > 0 ? (
                (data.amenities || [...(data.buildingAmenities || []), ...(data.inFlatFeatures || [])]).map((amenity, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200">
                    {amenity}
                  </span>
                ))
              ) : (
                <p className="text-slate-500 italic text-sm">No amenities selected</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-800 mb-3 border-b pb-2">Contact Info</h4>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600">
                {data.fullName ? data.fullName.charAt(0).toUpperCase() : '?'}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{data.fullName || 'No Name'}</p>
                <p className="text-slate-500 text-xs">+91 {data.whatsapp || '----------'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2 sticky bottom-0">
          <button 
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors text-sm"
          >
            Edit Details
          </button>
          <button 
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-lg font-bold text-white bg-[var(--color-primary)]  shadow-lg shadow-blue-500/30 transition-all active:scale-95 text-sm"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

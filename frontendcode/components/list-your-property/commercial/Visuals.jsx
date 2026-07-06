'use client';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SectionTitle } from "../residential/SectionTitle";
import { MdAddAPhoto, MdUploadFile, MdClose } from 'react-icons/md';

const GoogleSelectMap = dynamic(() => import('../../map/GoogleSelectMap'), { ssr: false });

export const Visuals = ({ formData, handleInputChange, onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const images = formData.images || [];
    if (images.length === 0) {
      setPreviewUrls([]);
      return;
    }

    const newUrls = images.map(file => {
      if (file instanceof File) {
        return URL.createObjectURL(file);
      }
      return file;
    });
    setPreviewUrls(newUrls);

    return () => {
      newUrls.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [formData.images]);

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length !== files.length) {
      alert('Please upload only image files.');
    }

    if (imageFiles.length === 0) return;

    const currentImages = formData.images || [];
    if (currentImages.length + imageFiles.length > 4) {
      alert('You can upload a maximum of 4 images.');
      return;
    }

    const validSizeFiles = imageFiles.filter(file => file.size <= 3 * 1024 * 1024);

    if (validSizeFiles.length < imageFiles.length) {
      alert('One or more images are larger than 3MB and were not uploaded.');
    }

    if (validSizeFiles.length > 0) {
      onFileChange([...currentImages, ...validSizeFiles]);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = (e) => {
    handleFiles(Array.from(e.target.files));
    e.target.value = null;
  };

  const openFileDialog = () => fileInputRef.current.click();

  const handleRemoveImage = (index) => {
    onFileChange((formData.images || []).filter((_, i) => i !== index));
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <SectionTitle icon={MdAddAPhoto} title="Visuals & Location" />
      
      <div className="space-y-4">
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white size-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <MdClose size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div 
          onClick={openFileDialog}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group ${isDragging ? 'border-[var(--color-primary)] bg-blue-50' : 'border-slate-200 hover:border-[var(--color-primary)] hover:bg-blue-50/30 bg-slate-50'}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <MdUploadFile className="text-[var(--color-primary)] text-2xl" />
          </div>
          <h3 className="text-base font-bold mb-1 text-slate-800">Drag and drop photos here</h3>
          <p className="text-slate-500 text-xs">Upload up to 4 photos. Only image files are accepted.</p>
        </div>

        <GoogleSelectMap formData={formData} handleInputChange={handleInputChange} />
        
        <div className="grid grid-cols-1 gap-4">
          <input 
            type="text"
            value={formData.latitude && formData.longitude ? `${formData.latitude}, ${formData.longitude}` : ''}
            className="p-3 bg-[#cfcfcf] cursor-not-allowed rounded-lg text-center text-slate-800 font-semibold" 
            placeholder="Coordinates will appear here (from map)" 
            disabled
          />
        </div>
      </div>
    </section>
  );
};
import React, { useRef } from 'react';
import { Upload, Camera } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  label?: string;
  description?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  label = "Upload Image",
  description = "Drag and drop an image or click to browse"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock sample images for demo purposes
  const sampleImages = [
    'https://images.pexels.com/photos/326013/pexels-photo-326013.jpeg',
    'https://images.pexels.com/photos/414191/pexels-photo-414191.jpeg',
    'https://images.pexels.com/photos/37076/butterfly-insect-nature-green-37076.jpeg'
  ];

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center">
          <div className="p-3 bg-blue-100 rounded-full mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{label}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Choose File
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Sample Images for Demo */}
      <div className="border-t pt-4">
        <p className="text-sm text-gray-600 mb-3">Or try with sample images:</p>
        <div className="grid grid-cols-3 gap-3">
          {sampleImages.map((imageUrl, index) => (
            <button
              key={index}
              onClick={() => onImageUpload(imageUrl)}
              className="relative group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
            >
              <img
                src={imageUrl}
                alt={`Sample butterfly ${index + 1}`}
                className="w-full h-20 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
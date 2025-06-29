import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, MapPin, Calendar, AlertTriangle, CheckCircle, Camera, Leaf } from 'lucide-react';
import { mockClassify } from '../utils/mockClassification';
import ImageUpload from './shared/ImageUpload';
import ClassificationResult from './shared/ClassificationResult';

interface BiodiversityMonitoringProps {
  onBack: () => void;
}

const BiodiversityMonitoring: React.FC<BiodiversityMonitoringProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [classification, setClassification] = useState<any>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleImageUpload = async (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsClassifying(true);
    
    // Get location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }

    // Simulate classification
    setTimeout(() => {
      const result = mockClassify(imageUrl);
      setClassification(result);
      setIsClassifying(false);
    }, 2000);
  };

  const saveToDatabase = () => {
    // Simulate saving to research database
    alert('Observation saved to biodiversity database with GPS coordinates!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Biodiversity Monitoring</h1>
                  <p className="text-sm text-gray-600">Field Research & Conservation Tool</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>GPS Enabled</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Classification Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Species Identification</h2>
              
              <ImageUpload onImageUpload={handleImageUpload} />
              
              {selectedImage && (
                <div className="mt-8">
                  <img
                    src={selectedImage}
                    alt="Uploaded butterfly"
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  
                  {isClassifying && (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-600">Analyzing butterfly characteristics...</p>
                    </div>
                  )}
                  
                  {classification && !isClassifying && (
                    <ClassificationResult 
                      classification={classification}
                      showConservationStatus={true}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Field Data Panel */}
          <div className="space-y-6">
            {/* Location Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
                Location Data
              </h3>
              {location ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Latitude:</span>
                    <span className="font-mono text-sm">{location.lat.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Longitude:</span>
                    <span className="font-mono text-sm">{location.lng.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="text-emerald-600 font-medium">±5m</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Enable location services for GPS tracking</p>
              )}
            </div>

            {/* Observation Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                Observation Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weather:</span>
                  <span>Sunny, 24°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Habitat:</span>
                  <span>Meadow edge</span>
                </div>
              </div>
            </div>

            {/* Conservation Alerts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                Conservation Status
              </h3>
              {classification && (
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${
                    classification.conservationStatus === 'Endangered' ? 'bg-red-50 border border-red-200' :
                    classification.conservationStatus === 'Vulnerable' ? 'bg-orange-50 border border-orange-200' :
                    'bg-green-50 border border-green-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Status:</span>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        classification.conservationStatus === 'Endangered' ? 'bg-red-100 text-red-700' :
                        classification.conservationStatus === 'Vulnerable' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {classification.conservationStatus}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {classification.conservationNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {classification && (
              <div className="space-y-3">
                <button
                  onClick={saveToDatabase}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Save to Database
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                  Generate Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodiversityMonitoring;
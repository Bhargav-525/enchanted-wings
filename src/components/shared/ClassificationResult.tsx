import React from 'react';
import { CheckCircle, AlertTriangle, Info, Star } from 'lucide-react';

interface ClassificationResultProps {
  classification: {
    species: string;
    scientificName: string;
    confidence: number;
    family: string;
    characteristics: string[];
    conservationStatus?: string;
    conservationNotes?: string;
    funFact?: string;
    habitat?: string;
    flightPeriod?: string;
  };
  showConservationStatus?: boolean;
  showEducationalInfo?: boolean;
}

const ClassificationResult: React.FC<ClassificationResultProps> = ({ 
  classification, 
  showConservationStatus = false,
  showEducationalInfo = false 
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-100';
    if (confidence >= 0.7) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.9) return CheckCircle;
    if (confidence >= 0.7) return AlertTriangle;
    return Info;
  };

  const ConfidenceIcon = getConfidenceIcon(classification.confidence);

  return (
    <div className="space-y-6">
      {/* Main Classification */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{classification.species}</h3>
            <p className="text-lg text-gray-600 italic">{classification.scientificName}</p>
            <p className="text-sm text-gray-500 mt-1">Family: {classification.family}</p>
          </div>
          <div className={`flex items-center px-3 py-2 rounded-full ${getConfidenceColor(classification.confidence)}`}>
            <ConfidenceIcon className="w-4 h-4 mr-2" />
            <span className="font-medium">{(classification.confidence * 100).toFixed(1)}%</span>
          </div>
        </div>

        {/* Characteristics */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Key Characteristics:</h4>
          <div className="flex flex-wrap gap-2">
            {classification.characteristics.map((characteristic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white bg-opacity-60 rounded-full text-sm text-gray-700 border"
              >
                {characteristic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Conservation Status */}
      {showConservationStatus && classification.conservationStatus && (
        <div className={`rounded-xl p-4 ${
          classification.conservationStatus === 'Endangered' ? 'bg-red-50 border border-red-200' :
          classification.conservationStatus === 'Vulnerable' ? 'bg-orange-50 border border-orange-200' :
          'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-center mb-2">
            <AlertTriangle className={`w-5 h-5 mr-2 ${
              classification.conservationStatus === 'Endangered' ? 'text-red-600' :
              classification.conservationStatus === 'Vulnerable' ? 'text-orange-600' :
              'text-green-600'
            }`} />
            <h4 className="font-medium text-gray-900">Conservation Status: {classification.conservationStatus}</h4>
          </div>
          {classification.conservationNotes && (
            <p className="text-sm text-gray-600">{classification.conservationNotes}</p>
          )}
        </div>
      )}

      {/* Educational Info */}
      {showEducationalInfo && (
        <div className="grid md:grid-cols-2 gap-4">
          {classification.habitat && (
            <div className="bg-green-50 rounded-xl p-4">
              <h4 className="font-medium text-green-900 mb-2 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Habitat
              </h4>
              <p className="text-sm text-green-700">{classification.habitat}</p>
            </div>
          )}
          
          {classification.flightPeriod && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Flight Period
              </h4>
              <p className="text-sm text-blue-700">{classification.flightPeriod}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassificationResult;
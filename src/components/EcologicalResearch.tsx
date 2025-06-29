import React, { useState } from 'react';
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Database, Download, Filter } from 'lucide-react';
import { mockClassify } from '../utils/mockClassification';
import ImageUpload from './shared/ImageUpload';

interface EcologicalResearchProps {
  onBack: () => void;
}

const EcologicalResearch: React.FC<EcologicalResearchProps> = ({ onBack }) => {
  const [batchResults, setBatchResults] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for research dashboard
  const mockResearchData = {
    totalObservations: 1247,
    speciesCount: 32,
    hotspots: [
      { location: 'Pine Forest Trail', count: 156, species: 12 },
      { location: 'Meadow Creek', count: 134, species: 18 },
      { location: 'Oak Hill Reserve', count: 98, species: 15 }
    ],
    seasonalTrends: [
      { month: 'Mar', count: 45 },
      { month: 'Apr', count: 78 },
      { month: 'May', count: 142 },
      { month: 'Jun', count: 198 },
      { month: 'Jul', count: 234 },
      { month: 'Aug', count: 187 }
    ],
    topSpecies: [
      { name: 'Monarch', count: 89, trend: '+12%' },
      { name: 'Painted Lady', count: 76, trend: '+8%' },
      { name: 'Red Admiral', count: 65, trend: '-3%' },
      { name: 'Cabbage White', count: 54, trend: '+15%' }
    ]
  };

  const handleBatchUpload = async (imageUrl: string) => {
    setIsProcessing(true);
    
    // Simulate batch processing
    setTimeout(() => {
      const result = mockClassify(imageUrl);
      setBatchResults(prev => [...prev, {
        ...result,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        location: 'Camera Trap #' + Math.floor(Math.random() * 20 + 1)
      }]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Ecological Research</h1>
                  <p className="text-sm text-gray-600">Long-term Study & Analytics Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Research Dashboard */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{mockResearchData.totalObservations}</span>
            </div>
            <h3 className="font-medium text-gray-900">Total Observations</h3>
            <p className="text-sm text-gray-500">Camera trap data collected</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{mockResearchData.speciesCount}</span>
            </div>
            <h3 className="font-medium text-gray-900">Species Identified</h3>
            <p className="text-sm text-gray-500">Across all locations</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">+18%</span>
            </div>
            <h3 className="font-medium text-gray-900">Population Trend</h3>
            <p className="text-sm text-gray-500">Compared to last season</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">234</span>
            </div>
            <h3 className="font-medium text-gray-900">Peak Activity</h3>
            <p className="text-sm text-gray-500">July observations</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Batch Processing */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Camera Trap Image Processing</h2>
              
              <ImageUpload 
                onImageUpload={handleBatchUpload}
                label="Upload Camera Trap Images"
                description="Process multiple images from camera traps for batch analysis"
              />
              
              {isProcessing && (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Processing camera trap image...</p>
                </div>
              )}
            </div>

            {/* Batch Results */}
            {batchResults.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Processing Results</h3>
                <div className="space-y-4">
                  {batchResults.slice(-5).map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        <img 
                          src={result.imageUrl} 
                          alt="Processed" 
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{result.species}</h4>
                          <p className="text-sm text-gray-500">{result.location}</p>
                          <p className="text-xs text-gray-400">{new Date(result.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{(result.confidence * 100).toFixed(1)}%</div>
                        <div className="text-sm text-gray-500">Confidence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Analytics Panel */}
          <div className="space-y-6">
            {/* Top Species */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Most Observed Species</h3>
              <div className="space-y-3">
                {mockResearchData.topSpecies.map((species, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{species.name}</div>
                      <div className="text-sm text-gray-500">{species.count} observations</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      species.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {species.trend}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Hotspots */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Hotspots</h3>
              <div className="space-y-4">
                {mockResearchData.hotspots.map((hotspot, index) => (
                  <div key={index} className="border-l-4 border-blue-400 pl-4">
                    <div className="font-medium text-gray-900">{hotspot.location}</div>
                    <div className="text-sm text-gray-500">{hotspot.count} observations</div>
                    <div className="text-xs text-blue-600">{hotspot.species} species identified</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Migration Tracking */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Migration Patterns</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monarch Migration</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Peak Season</span>
                  <span className="text-blue-600 font-medium">July-August</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Expected</span>
                  <span className="text-orange-600 font-medium">September</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcologicalResearch;
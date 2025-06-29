import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Award, Users, Star, Camera, Lightbulb, Map } from 'lucide-react';
import { mockClassify } from '../utils/mockClassification';
import ImageUpload from './shared/ImageUpload';
import ClassificationResult from './shared/ClassificationResult';

interface CitizenScienceProps {
  onBack: () => void;
}

const CitizenScience: React.FC<CitizenScienceProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [classification, setClassification] = useState<any>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [userPoints, setUserPoints] = useState(250);
  const [achievements, setAchievements] = useState(['First Identification', 'Species Explorer']);

  const handleImageUpload = async (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsClassifying(true);
    
    setTimeout(() => {
      const result = mockClassify(imageUrl);
      setClassification(result);
      setIsClassifying(false);
      
      // Award points for identification
      setUserPoints(prev => prev + 10);
      
      // Check for new achievements
      if (userPoints + 10 >= 300 && !achievements.includes('Butterfly Expert')) {
        setAchievements(prev => [...prev, 'Butterfly Expert']);
      }
    }, 2000);
  };

  const shareDiscovery = () => {
    if (classification) {
      const message = `I just identified a ${classification.species} butterfly using ButterflyAI! 🦋 #ButterflyIdentification #CitizenScience`;
      // In a real app, this would integrate with social media APIs
      navigator.share?.({ text: message }) || alert('Discovery ready to share!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg mr-3">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Citizen Science</h1>
                  <p className="text-sm text-gray-600">Learn & Contribute to Butterfly Research</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-orange-600 mr-1" />
                <span className="font-medium text-orange-700">{userPoints} points</span>
              </div>
              <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                <Award className="w-4 h-4 text-blue-600 mr-1" />
                <span className="font-medium text-blue-700">{achievements.length} badges</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Identification Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Identify Your Butterfly</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Camera className="w-4 h-4 mr-1" />
                  <span>Snap or upload a photo</span>
                </div>
              </div>
              
              <ImageUpload 
                onImageUpload={handleImageUpload}
                label="Upload Butterfly Photo"
                description="Take a clear photo of the butterfly with wings visible for best results"
              />
              
              {selectedImage && (
                <div className="mt-8">
                  <img
                    src={selectedImage}
                    alt="Butterfly to identify"
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  
                  {isClassifying && (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-600">Identifying your butterfly...</p>
                      <p className="text-sm text-gray-500 mt-2">Analyzing wing patterns, colors, and markings</p>
                    </div>
                  )}
                  
                  {classification && !isClassifying && (
                    <div>
                      <ClassificationResult 
                        classification={classification}
                        showEducationalInfo={true}
                      />
                      
                      {/* Educational Content */}
                      <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <Lightbulb className="w-5 h-5 text-orange-600 mr-2" />
                          Did You Know?
                        </h3>
                        <p className="text-gray-700 mb-4">{classification.funFact}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white bg-opacity-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Habitat</h4>
                            <p className="text-sm text-gray-600">{classification.habitat}</p>
                          </div>
                          <div className="bg-white bg-opacity-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Flight Period</h4>
                            <p className="text-sm text-gray-600">{classification.flightPeriod}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-6">
                        <button
                          onClick={shareDiscovery}
                          className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
                        >
                          <Users className="w-5 h-5 mr-2" />
                          Share Discovery
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <Map className="w-5 h-5 mr-2" />
                          View on Map
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Learning Panel */}
          <div className="space-y-6">
            {/* Progress & Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 text-yellow-600 mr-2" />
                Your Progress
              </h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Level Progress</span>
                  <span>{userPoints}/500 XP</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(userPoints / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Recent Achievements</h4>
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center p-2 bg-yellow-50 rounded-lg">
                    <Award className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="text-sm text-yellow-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Resources */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Resources</h3>
              <div className="space-y-3">
                <a href="#" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <h4 className="font-medium text-blue-900">Butterfly Identification Guide</h4>
                  <p className="text-sm text-blue-600">Learn to identify key features</p>
                </a>
                <a href="#" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <h4 className="font-medium text-green-900">Garden for Butterflies</h4>
                  <p className="text-sm text-green-600">Create butterfly-friendly spaces</p>
                </a>
                <a href="#" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <h4 className="font-medium text-purple-900">Migration Patterns</h4>
                  <p className="text-sm text-purple-600">Track seasonal movements</p>
                </a>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Community Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Global Identifications</span>
                  <span className="font-bold text-blue-600">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Citizen Scientists</span>
                  <span className="font-bold text-green-600">2,156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Species Documented</span>
                  <span className="font-bold text-orange-600">248</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conservation Alerts</span>
                  <span className="font-bold text-red-600">34</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Photography Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Get close but don't disturb the butterfly
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Capture both wing patterns clearly
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Use natural lighting when possible
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Include background habitat details
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenScience;
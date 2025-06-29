import React from 'react';
import { Camera, Leaf, BookOpen, BarChart3, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { AppPage } from '../App';
import { useAuth } from '../contexts/AuthContext';

interface LandingPageProps {
  onNavigate: (page: AppPage) => void;
  onShowAuth: (mode: 'login' | 'signup') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onShowAuth }) => {
  const { isAuthenticated } = useAuth();

  const scenarios = [
    {
      id: 'biodiversity' as AppPage,
      title: 'Biodiversity Monitoring',
      description: 'Assist field researchers and conservationists in identifying butterfly species for habitat management and conservation planning.',
      icon: Leaf,
      color: 'from-emerald-500 to-teal-600',
      features: ['Real-time field identification', 'GPS location tracking', 'Conservation status alerts']
    },
    {
      id: 'research' as AppPage,
      title: 'Ecological Research',
      description: 'Enable long-term studies by classifying species from camera trap data to analyze distribution and migration patterns.',
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-600',
      features: ['Batch processing', 'Migration tracking', 'Population analytics']
    },
    {
      id: 'citizen' as AppPage,
      title: 'Citizen Science & Education',
      description: 'Interactive tool for students and hobbyists to identify butterflies with instant feedback and educational insights.',
      icon: BookOpen,
      color: 'from-orange-500 to-red-500',
      features: ['Educational content', 'Achievement system', 'Community sharing']
    }
  ];

  const handleScenarioClick = (scenarioId: AppPage) => {
    if (isAuthenticated) {
      onNavigate(scenarioId);
    } else {
      onShowAuth('login');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-blue-600 to-orange-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <Camera className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Butterfly<span className="text-orange-300">AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Advanced butterfly species classification using transfer learning and computer vision
            </p>
            
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => onShowAuth('signup')}
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <UserPlus className="w-6 h-6 mr-3" />
                  Get Started Free
                </button>
                <button
                  onClick={() => onShowAuth('login')}
                  className="bg-white bg-opacity-20 backdrop-blur-sm text-white border-2 border-white border-opacity-30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-30 transition-colors flex items-center justify-center"
                >
                  <LogIn className="w-6 h-6 mr-3" />
                  Sign In
                </button>
              </div>
            )}
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-4 text-white text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-300">75</div>
                  <div className="text-sm opacity-80">Species</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-300">6,499</div>
                  <div className="text-sm opacity-80">Images</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-300">95%</div>
                  <div className="text-sm opacity-80">Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenarios Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Application</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our butterfly classification system supports multiple use cases, from field research to education
          </p>
          {!isAuthenticated && (
            <p className="text-sm text-gray-500 mt-4">
              Sign in to access all features and start identifying butterflies
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;
            return (
              <div
                key={scenario.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                onClick={() => handleScenarioClick(scenario.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${scenario.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${scenario.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-blue-600 transition-all duration-300">
                    {scenario.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {scenario.description}
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    {scenario.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">
                      {isAuthenticated ? 'Launch Application' : 'Sign in to access'}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technology Section */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-300">Transfer learning with pre-trained CNN architectures for superior accuracy</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Transfer Learning', desc: 'Pre-trained CNN models', icon: '🧠' },
              { title: 'Real-time Processing', desc: 'Sub-second predictions', icon: '⚡' },
              { title: 'Mobile Optimized', desc: 'Field-ready deployment', icon: '📱' },
              { title: 'Continuous Learning', desc: 'Model improvement over time', icon: '🔄' }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{tech.title}</h3>
                <p className="text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
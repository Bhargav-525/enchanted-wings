import React, { useState } from 'react';
import { Camera, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';

interface HeaderProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    if (onNavigate) {
      onNavigate('landing');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'researcher':
        return 'bg-blue-100 text-blue-700';
      case 'conservationist':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'researcher':
        return 'Researcher';
      case 'conservationist':
        return 'Conservationist';
      default:
        return 'Citizen Scientist';
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => onNavigate?.('landing')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">
                    Butterfly<span className="text-orange-500">AI</span>
                  </h1>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {isAuthenticated && onNavigate && (
                <nav className="flex space-x-6">
                  <button
                    onClick={() => onNavigate('biodiversity')}
                    className={`text-sm font-medium transition-colors ${
                      currentPage === 'biodiversity'
                        ? 'text-emerald-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Biodiversity
                  </button>
                  <button
                    onClick={() => onNavigate('research')}
                    className={`text-sm font-medium transition-colors ${
                      currentPage === 'research'
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Research
                  </button>
                  <button
                    onClick={() => onNavigate('citizen')}
                    className={`text-sm font-medium transition-colors ${
                      currentPage === 'citizen'
                        ? 'text-orange-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Citizen Science
                  </button>
                </nav>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </div>
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-700 hover:to-blue-700 transition-all duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 py-4">
              {isAuthenticated && onNavigate ? (
                <nav className="space-y-2">
                  <button
                    onClick={() => {
                      onNavigate('biodiversity');
                      setShowMobileMenu(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Biodiversity Monitoring
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('research');
                      setShowMobileMenu(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Ecological Research
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('citizen');
                      setShowMobileMenu(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Citizen Science
                  </button>
                </nav>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleAuthClick('login');
                      setShowMobileMenu(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      handleAuthClick('signup');
                      setShowMobileMenu(false);
                    }}
                    className="block w-full text-left px-3 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;
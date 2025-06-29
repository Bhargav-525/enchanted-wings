import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/shared/Header';
import LandingPage from './components/LandingPage';
import BiodiversityMonitoring from './components/BiodiversityMonitoring';
import EcologicalResearch from './components/EcologicalResearch';
import CitizenScience from './components/CitizenScience';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/auth/AuthModal';

export type AppPage = 'landing' | 'biodiversity' | 'research' | 'citizen';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleShowAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'biodiversity':
        return (
          <ProtectedRoute onShowAuth={handleShowAuth}>
            <BiodiversityMonitoring onBack={() => setCurrentPage('landing')} />
          </ProtectedRoute>
        );
      case 'research':
        return (
          <ProtectedRoute onShowAuth={handleShowAuth}>
            <EcologicalResearch onBack={() => setCurrentPage('landing')} />
          </ProtectedRoute>
        );
      case 'citizen':
        return (
          <ProtectedRoute onShowAuth={handleShowAuth}>
            <CitizenScience onBack={() => setCurrentPage('landing')} />
          </ProtectedRoute>
        );
      default:
        return <LandingPage onNavigate={setCurrentPage} onShowAuth={handleShowAuth} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-orange-50">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        {renderPage()}
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={authMode}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardWelcome } from './DashboardWelcome';
import { Dashboard } from './Dashboard';

export const Welcome: React.FC = () => {
  const { user, logout } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <DashboardWelcome onComplete={handleWelcomeComplete} />;
  }

  return <Dashboard />;
};

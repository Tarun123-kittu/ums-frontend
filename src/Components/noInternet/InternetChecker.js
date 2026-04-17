// InternetChecker.js
import React, { useState, useEffect } from 'react';
import NoInternet from './NoInternet'; 

const InternetChecker = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return isOnline ? children : <NoInternet />;
};

export default InternetChecker;

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AdContextType {
  showInterstitialAd: () => void;
  showRewardedAd: (onReward: () => void) => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

interface AdProviderProps {
  children: ReactNode;
}

export const AdProvider: React.FC<AdProviderProps> = ({ children }) => {
  const showInterstitialAd = () => {
    // In a real implementation, you would show an interstitial ad here
    // For now, we'll just log it
    console.log('Showing interstitial ad...');
    
    // Simulate ad loading and showing
    setTimeout(() => {
      console.log('Interstitial ad completed');
    }, 2000);
  };

  const showRewardedAd = (onReward: () => void) => {
    // Rewarded ads can be shown even for premium users
    console.log('Showing rewarded ad...');
    
    // Simulate ad loading and showing
    setTimeout(() => {
      console.log('Rewarded ad completed');
      onReward();
    }, 3000);
  };

  return (
    <AdContext.Provider value={{
      showInterstitialAd,
      showRewardedAd,
    }}>
      {children}
    </AdContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};
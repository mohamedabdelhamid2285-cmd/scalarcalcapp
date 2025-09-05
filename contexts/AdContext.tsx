import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AdContextType {
  isPremium: boolean;
  setPremium: (premium: boolean) => void;
  showInterstitialAd: () => void;
  showRewardedAd: (onReward: () => void) => void;
  adFreeTrial: boolean;
  startAdFreeTrial: () => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

interface AdProviderProps {
  children: ReactNode;
}

export const AdProvider: React.FC<AdProviderProps> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [adFreeTrial, setAdFreeTrial] = useState(false);

  useEffect(() => {
    loadPremiumStatus();
    loadTrialStatus();
  }, []);

  const loadPremiumStatus = async () => {
    try {
      const premium = await AsyncStorage.getItem('isPremium');
      if (premium === 'true') {
        setIsPremium(true);
      }
    } catch (error) {
      console.error('Error loading premium status:', error);
    }
  };

  const loadTrialStatus = async () => {
    try {
      const trialStart = await AsyncStorage.getItem('trialStartTime');
      if (trialStart) {
        const startTime = parseInt(trialStart);
        const now = Date.now();
        const trialDuration = 24 * 60 * 60 * 1000; // 24 hours
        
        if (now - startTime < trialDuration) {
          setAdFreeTrial(true);
        } else {
          await AsyncStorage.removeItem('trialStartTime');
          setAdFreeTrial(false);
        }
      }
    } catch (error) {
      console.error('Error loading trial status:', error);
    }
  };

  const setPremium = async (premium: boolean) => {
    try {
      await AsyncStorage.setItem('isPremium', premium.toString());
      setIsPremium(premium);
    } catch (error) {
      console.error('Error saving premium status:', error);
    }
  };

  const startAdFreeTrial = async () => {
    try {
      await AsyncStorage.setItem('trialStartTime', Date.now().toString());
      setAdFreeTrial(true);
    } catch (error) {
      console.error('Error starting trial:', error);
    }
  };

  const showInterstitialAd = () => {
    if (isPremium || adFreeTrial) return;
    
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
      isPremium,
      setPremium,
      showInterstitialAd,
      showRewardedAd,
      adFreeTrial,
      startAdFreeTrial,
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
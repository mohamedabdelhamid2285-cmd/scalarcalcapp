import { Platform } from 'react-native';

export const initializeMobileAds = async () => {
  if (Platform.OS === 'web') {
    console.log('Google Mobile Ads not available on web platform.');
    return;
  }

  console.log('Google Mobile Ads initialization skipped - requires native build.');
};

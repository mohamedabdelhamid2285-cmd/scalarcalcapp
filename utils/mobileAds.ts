import { Platform } from 'react-native';

let MobileAds: any = null;

if (Platform.OS !== 'web') {
  try {
    MobileAds = require('react-native-google-mobile-ads').default;
  } catch (error) {
    console.log('Google Mobile Ads not available');
  }
}

export const initializeMobileAds = async () => {
  if (Platform.OS === 'web' || !MobileAds) {
    console.log('Google Mobile Ads not available on this platform');
    return;
  }

  try {
    const adapterStatuses = await MobileAds().initialize();
    console.log('Google Mobile Ads initialized:', adapterStatuses);
  } catch (error) {
    console.log('Google Mobile Ads not available in Expo Go - development build required');
  }
};

export default MobileAds;

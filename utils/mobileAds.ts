import { Platform } from 'react-native';

let MobileAds: any = null;

// Dynamically import only if not on web
if (Platform.OS !== 'web') {
  import('react-native-google-mobile-ads').then(({ default: ads }) => {
    MobileAds = ads;
    console.log('Google Mobile Ads library loaded dynamically.');
  }).catch((error) => {
    console.log('Google Mobile Ads library failed to load dynamically:', error);
    // Ensure MobileAds is set to an empty object or similar if import fails,
    // so subsequent checks don't break.
    MobileAds = {};
  });
}

export const initializeMobileAds = async () => {
  // Only proceed if on a non-web platform and MobileAds is successfully imported and initialized
  if (Platform.OS === 'web' || !MobileAds || Object.keys(MobileAds).length === 0) {
    console.log('Google Mobile Ads not available or not initialized for this platform.');
    return;
  }

  try {
    // Use the actual IDs from app.json extra config
    const appId = Platform.select({
      android: require('expo-constants').default.expoConfig.extra.scalarCalcAndroidAppId,
      ios: require('expo-constants').default.expoConfig.extra.scalarCalcIosAppId,
    });

    if (!appId) {
      console.log('App ID not found. Cannot initialize Google Mobile Ads.');
      return;
    }

    // Check if initialize method exists before calling
    if (typeof MobileAds.initialize === 'function') {
      const adapterStatuses = await MobileAds().initialize(appId);
      console.log('Google Mobile Ads initialized:', adapterStatuses);
    } else {
      console.log('MobileAds.initialize function not found.');
    }
  } catch (error) {
    console.log('Error initializing Google Mobile Ads:', error);
    console.log('Google Mobile Ads might require a development build or specific configuration.');
  }
};

export default MobileAds;

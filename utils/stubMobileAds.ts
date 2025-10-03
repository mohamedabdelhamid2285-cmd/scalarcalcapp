// This file acts as a stub for react-native-google-mobile-ads when building for the web.
    // It prevents native code from being included in web bundles and avoids TurboModule errors.

    const noOp = () => {};
    const noOpAsync = async () => {};

    const stubModule = {
      // Mock functions for common ad methods
      MobileAds: {
        initialize: noOpAsync,
        setAppMuted: noOp,
        setAppVolume: noOp,
        // Add other methods as needed, all as no-ops
      },
      BannerAd: ({ unitId, size, requestNonPersonalizedAds }) => null, // Render nothing
      InterstitialAd: {
        create: () => ({
          load: noOpAsync,
          show: noOpAsync,
          // Add other methods as needed
        }),
      },
      // Add other ad types if they are being used and causing issues
    };

    export default stubModule;

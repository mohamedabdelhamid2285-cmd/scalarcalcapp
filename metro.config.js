// metro.config.js
    const { getDefaultConfig } = require('expo/metro-config');
    const path = require('path');

    const config = getDefaultConfig(__dirname);

    config.resolver.assetExts.push('cjs');

    // Map react-native-google-mobile-ads to a stub module for web builds
    // This prevents native code from being included in web bundles.
    config.resolver.extraNodeModules = {
      ...config.resolver.extraNodeModules,
      'react-native-google-mobile-ads': path.resolve(__dirname, './utils/stubMobileAds.ts'),
    };

    module.exports = config;

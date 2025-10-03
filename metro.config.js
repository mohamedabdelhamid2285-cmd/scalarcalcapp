const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('cjs');

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-native-google-mobile-ads' && platform === 'web') {
    return {
      filePath: path.resolve(__dirname, './utils/stubMobileAds.ts'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

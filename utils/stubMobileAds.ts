const noOp = () => {};
const noOpAsync = async () => {};

const stubModule = {
  initialize: noOpAsync,
  setAppMuted: noOp,
  setAppVolume: noOp,
  setRequestConfiguration: noOp,
};

export const BannerAd = () => null;
export const InterstitialAd = {
  createForAdRequest: () => ({
    load: noOpAsync,
    show: noOpAsync,
    addAdEventListener: noOp,
    removeAllListeners: noOp,
  }),
};
export const RewardedAd = {
  createForAdRequest: () => ({
    load: noOpAsync,
    show: noOpAsync,
    addAdEventListener: noOp,
    removeAllListeners: noOp,
  }),
};
export const TestIds = {
  BANNER: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  REWARDED: 'ca-app-pub-3940256099942544/5224354917',
};
export const BannerAdSize = {
  BANNER: 'BANNER',
  LARGE_BANNER: 'LARGE_BANNER',
  MEDIUM_RECTANGLE: 'MEDIUM_RECTANGLE',
  FULL_BANNER: 'FULL_BANNER',
  LEADERBOARD: 'LEADERBOARD',
};
export const AdEventType = {};
export const RewardedAdEventType = {};

export default stubModule;

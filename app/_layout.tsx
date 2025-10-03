import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { CalculatorProvider } from '@/contexts/CalculatorContext';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const initializeAds = async () => {
        try {
          const mobileAds = require('react-native-google-mobile-ads').default;
          const adapterStatuses = await mobileAds().initialize();
          console.log('Google Mobile Ads initialized:', adapterStatuses);
        } catch (error) {
          console.log('Google Mobile Ads not available in Expo Go - development build required');
        }
      };

      initializeAds();
    }
  }, []);

  return (
    <CalculatorProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </CalculatorProvider>
  );
}

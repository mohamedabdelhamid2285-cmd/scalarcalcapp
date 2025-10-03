import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { CalculatorProvider } from '@/contexts/CalculatorContext';
import { initializeMobileAds } from '@/utils/mobileAds';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    initializeMobileAds();
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

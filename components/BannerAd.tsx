import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCalculator } from '@/contexts/CalculatorContext';
import { useAds } from '@/contexts/AdContext';

export default function BannerAd() {
  const { state } = useCalculator();
  const { isPremium, adFreeTrial } = useAds();
  const isDark = state.theme === 'dark';

  // Don't show ads for premium users or during trial
  if (isPremium || adFreeTrial) {
    return null;
  }

  const backgroundColor = isDark ? '#2A2A2A' : '#F0F0F0';
  const textColor = isDark ? '#FFFFFF' : '#1F2937';
  const borderColor = isDark ? '#404040' : '#D1D5DB';

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <Text style={[styles.adLabel, { color: textColor }]}>Advertisement</Text>
      <TouchableOpacity style={styles.adContent}>
        <Text style={[styles.adText, { color: textColor }]}>
          📱 Upgrade to Premium Calculator Pro
        </Text>
        <Text style={[styles.adSubtext, { color: textColor }]}>
          Remove ads • Advanced functions • Cloud sync
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adLabel: {
    fontSize: 10,
    position: 'absolute',
    top: 2,
    left: 4,
    opacity: 0.6,
  },
  adContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  adText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  adSubtext: {
    fontSize: 12,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 2,
  },
});
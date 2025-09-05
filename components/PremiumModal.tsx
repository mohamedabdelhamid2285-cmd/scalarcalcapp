import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCalculator } from '@/contexts/CalculatorContext';
import { useAds } from '@/contexts/AdContext';
import { Ionicons } from '@expo/vector-icons';

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PremiumModal({ visible, onClose }: PremiumModalProps) {
  const { state } = useCalculator();
  const { setPremium, startAdFreeTrial, adFreeTrial } = useAds();
  const isDark = state.theme === 'dark';

  const backgroundColor = isDark ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#1F2937';
  const cardBgColor = isDark ? '#2A2A2A' : '#F8F9FA';

  const handlePurchasePremium = () => {
    // In a real app, this would trigger the actual purchase flow
    setPremium(true);
    onClose();
  };

  const handleStartTrial = () => {
    startAdFreeTrial();
    onClose();
  };

  const features = [
    { icon: 'remove-circle-outline', title: 'Ad-Free Experience', description: 'No more interruptions while calculating' },
    { icon: 'calculator-outline', title: 'Advanced Functions', description: 'Access to all scientific and engineering functions' },
    { icon: 'cloud-outline', title: 'Cloud Sync', description: 'Sync your calculations across devices' },
    { icon: 'color-palette-outline', title: 'Premium Themes', description: 'Exclusive color themes and customization' },
    { icon: 'headset-outline', title: 'Priority Support', description: 'Get help faster with premium support' },
    { icon: 'infinite-outline', title: 'Unlimited History', description: 'Never lose your calculation history' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>ScalarCalc Premium</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={textColor} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <LinearGradient
            colors={['#3B82F6', '#1D4ED8']}
            style={styles.heroCard}
          >
            <Text style={styles.heroTitle}>Unlock Full Potential</Text>
            <Text style={styles.heroSubtitle}>
              Get the most advanced calculator experience
            </Text>
          </LinearGradient>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={[styles.featureCard, { backgroundColor: cardBgColor }]}>
                <Ionicons name={feature.icon as any} size={24} color="#3B82F6" />
                <View style={styles.featureText}>
                  <Text style={[styles.featureTitle, { color: textColor }]}>
                    {feature.title}
                  </Text>
                  <Text style={[styles.featureDescription, { color: textColor }]}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.pricingContainer}>
            <View style={[styles.pricingCard, { backgroundColor: cardBgColor }]}>
              <Text style={[styles.pricingTitle, { color: textColor }]}>Premium</Text>
              <Text style={[styles.pricingPrice, { color: textColor }]}>$4.99</Text>
              <Text style={[styles.pricingPeriod, { color: textColor }]}>one-time purchase</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          {!adFreeTrial && (
            <TouchableOpacity
              style={[styles.trialButton, { backgroundColor: cardBgColor }]}
              onPress={handleStartTrial}
            >
              <Text style={[styles.trialButtonText, { color: textColor }]}>
                Start 24h Free Trial
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={styles.purchaseButton}
            onPress={handlePurchasePremium}
          >
            <LinearGradient
              colors={['#3B82F6', '#1D4ED8']}
              style={styles.purchaseGradient}
            >
              <Text style={styles.purchaseButtonText}>
                {adFreeTrial ? 'Upgrade to Premium' : 'Buy Premium'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  pricingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pricingCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 200,
  },
  pricingTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  pricingPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pricingPeriod: {
    fontSize: 14,
    opacity: 0.7,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  trialButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  trialButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  purchaseButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  purchaseGradient: {
    padding: 16,
    alignItems: 'center',
  },
  purchaseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
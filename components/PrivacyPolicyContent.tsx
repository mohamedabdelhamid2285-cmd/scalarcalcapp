import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export const PrivacyPolicyContent = ({ textColor }: { textColor: string }) => {
  return (
    <View>
      <Text style={[styles.heading1, { color: textColor }]}>Privacy Policy</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        Last updated: 2024-05-10
      </Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        This Privacy Policy describes how ScalarCalc ("we," "us," or "our") collects, uses, and shares information when you use our calculator app (the "App").
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Information We Collect</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We do not collect any personally identifiable information (PII) from you. The App does not require you to create an account or provide any personal details.
      </Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We may collect non-personal information, such as:
      </Text>
      <Text style={[styles.listItem, { color: textColor }]}>
        - Usage data: Information about how you use the App, such as the features you use, the calculations you perform, and the frequency of your use.
      </Text>
      <Text style={[styles.listItem, { color: textColor }]}>
        - Device information: Information about your device, such as the device type, operating system, and unique device identifiers.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>How We Use Your Information</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We use the non-personal information we collect to:
      </Text>
      <Text style={[styles.listItem, { color: textColor }]}>
        - Improve the App's functionality and user experience.
      </Text>
      <Text style={[styles.listItem, { color: textColor }]}>
        - Analyze usage trends and patterns.
      </Text>
      <Text style={[styles.listItem, { color: textColor }]}>
        - Monitor the performance of the App.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Sharing of Your Information</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We do not share your non-personal information with third parties.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Security</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We take reasonable measures to protect the information we collect from unauthorized access, use, or disclosure.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Changes to This Privacy Policy</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Contact Us</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        If you have any questions about this Privacy Policy, please contact us at mohamedali2285@gmail.com.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
    marginBottom: 3,
  },
});

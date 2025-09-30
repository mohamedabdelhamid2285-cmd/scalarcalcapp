import React from 'react';
import { Text, StyleSheet, View, Linking } from 'react-native';
import Constants from 'expo-constants';

export const PrivacyPolicyContent = ({ textColor }: { textColor: string }) => {
  return (
    <View>
      <Text style={[styles.heading1, { color: textColor }]}>Privacy Policy</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        Last updated: 2024-05-10
      </Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        This Privacy Policy describes how ScalarCalc ("we," "us," or "our") collects, uses, and shares information when you use our calculator app (the "App").
        You can review our website at <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://sites.google.com/view/privacy-policy-scalarcalc')}>https://sites.google.com/view/privacy-policy-scalarcalc</Text>.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Information We Collect</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We do not collect any personally identifiable information (PII) from you directly. The App does not require you to create an account or provide any personal details.
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

      <Text style={[styles.heading2, { color: textColor }]}>Third-Party Services</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        The App uses Google AdMob, an advertising service provided by Google LLC. AdMob may collect and use certain information from your device to provide personalized advertisements. This information may include device identifiers, location data, and usage data.
      </Text>
     
      <Text style={[styles.paragraph, { color: textColor }]}>
        For more information on how Google uses data, please visit Google's Privacy & Terms page: <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://policies.google.com/privacy')}>https://policies.google.com/privacy</Text>
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Sharing of Your Information</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We do not share your non-personal information with third parties, except for data collected by third-party services like Google AdMob as described above, which is used for advertising purposes.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Security</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We take reasonable measures to protect the information we collect from unauthorized access, use, or disclosure.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Changes to This Privacy Policy</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Governing Law</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        This Privacy Policy shall be governed and construed in accordance with the laws of Germany.
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

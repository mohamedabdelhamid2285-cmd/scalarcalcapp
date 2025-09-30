import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export const TermsOfServiceContent = ({ textColor }: { textColor: string }) => {
  return (
    <View>
      <Text style={[styles.heading1, { color: textColor }]}>Terms of Service</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        Last updated: 2024-05-10
      </Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        Please read these Terms of Service ("Terms") carefully before using the ScalarCalc calculator app (the "App").
      </Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        By using the App, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you may not use the App.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Use of the App</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        The App is provided for your personal, non-commercial use. You may use the App to perform calculations and other functions as intended.
      </Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        You agree not to:
      </Text>
      <Text style={[styles.listItem, { color: textColor }]}>
        - Use the App for any illegal or unauthorized purpose.
      </Text>
      <Text style={[styles.listItem, { color: textColor }]}>
        - Interfere with or disrupt the operation of the App.
      </Text>
      <Text style={[styles.listItem, { color: textColor }]}>
        - Attempt to gain unauthorized access to any part of the App.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Intellectual Property</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        The App and its original content, features, and functionality are owned by itmo and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Disclaimer of Warranties</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        The App is provided "as is" and "as available" without any warranties of any kind, express or implied. We do not warrant that the App will be error-free or that your use of the App will be uninterrupted.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Limitation of Liability</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        In no event shall we be liable for any damages whatsoever (including, without limitation, damages for loss of profits, business interruption, loss of information) arising out of the use of or inability to use the App, even if we have been advised of the possibility of such damages.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Changes to the Terms</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        We may modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Governing Law</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        These Terms shall be governed and construed in accordance with the laws of Germany.
      </Text>

      <Text style={[styles.heading2, { color: textColor }]}>Contact Us</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>
        If you have any questions about these Terms, please contact us at mohamedali2285@gmail.com.
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

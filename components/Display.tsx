import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCalculator } from '@/contexts/CalculatorContext';

export default function Display() {
  const { state } = useCalculator();
  const isDark = state.theme === 'dark';

  const containerColors = isDark ? ['#1E1E1E', '#2A2A2A'] : ['#FFFFFF', '#F8F9FA'];
  const textColor = isDark ? '#FFFFFF' : '#1F2937';
  const expressionColor = isDark ? '#A0A0A0' : '#6B7280';

  return (
    <LinearGradient
      colors={containerColors}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.statusBar}>
        <Text style={[styles.angleUnit, { color: textColor }]}>
          {state.angleUnit.toUpperCase()}
        </Text>
        {state.memoryValue !== 0 && (
          <Text style={[styles.memoryIndicator, { color: '#10B981' }]}>
            M
          </Text>
        )}
        {/* Display variable values for debugging/info */}
        <View style={styles.variableDisplay}>
          {Object.entries(state.variables).map(([key, value]) => (
            <Text key={key} style={[styles.variableText, { color: expressionColor }]}>
              {key}={value.toFixed(2)}
            </Text>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.displayArea}
        contentContainerStyle={styles.displayContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Display the current expression being typed */}
        {state.expression !== '' && (
          <Text style={[styles.expression, { color: expressionColor }]}>
            {state.expression}
          </Text>
        )}
        {/* Display the result or error */}
        <Text style={[styles.result, { color: state.error ? '#EF4444' : textColor }]}>
          {state.error || state.result}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 16,
    margin: 16,
    padding: 16,
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  angleUnit: {
    fontSize: 14,
    fontWeight: '600',
  },
  memoryIndicator: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  variableDisplay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 1,
  },
  variableText: {
    fontSize: 12,
    marginLeft: 8,
  },
  displayArea: {
    flex: 1,
  },
  displayContent: {
    justifyContent: 'flex-end',
    minHeight: '100%',
  },
  expression: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 8,
    lineHeight: 20,
  },
  result: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'right',
    lineHeight: 40,
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
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
        {/* Assuming memoryValue will be added later, keeping this for future */}
        {/* {state.memoryValue !== 0 && (
          <Text style={[styles.memoryIndicator, { color: '#10B981' }]}>
            M
          </Text>
        )} */}
      </View>

      <ScrollView
        style={styles.displayArea}
        contentContainerStyle={styles.displayContent}
        showsVerticalScrollIndicator={false}
      >
        {/* This line will show the full expression being built or the previous expression after equals */}
        <Text style={[styles.expression, { color: expressionColor }]}>
          {state.lastInputType === 'equals' ? state.previousExpression : state.expression}
        </Text>
        {/* This line will show the result if available, otherwise the current expression */}
        <Text style={[styles.result, { color: state.error ? '#EF4444' : textColor }]}>
          {state.error
            ? state.error // If there's an error, show the error
            : state.lastInputType === 'equals' || state.expression === '' // If equals was pressed, or expression is empty (initial state)
              ? state.result // Show the result
              : state.expression // Otherwise, show the current expression being typed
          }
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 16,
    margin: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { evaluate, mean, median, mode, std, variance } from 'mathjs';
import CalculatorButton from '@/components/CalculatorButton';
import { useCalculator } from '@/contexts/CalculatorContext';

export default function StatisticsScreen() {
  const { state } = useCalculator();
  const isDark = state.theme === 'dark';
  
  const [dataPoints, setDataPoints] = useState<string[]>(['']);
  const [results, setResults] = useState<any>({});

  const backgroundColors = isDark ? ['#121212', '#1E1E1E'] : ['#F3F4F6', '#FFFFFF'];
  const textColor = isDark ? '#FFFFFF' : '#1F2937';
  const inputBgColor = isDark ? '#2A2A2A' : '#F8F9FA';

  const addDataPoint = () => {
    setDataPoints([...dataPoints, '']);
  };

  const removeDataPoint = (index: number) => {
    if (dataPoints.length > 1) {
      setDataPoints(dataPoints.filter((_, i) => i !== index));
    }
  };

  const updateDataPoint = (index: number, value: string) => {
    const newDataPoints = [...dataPoints];
    newDataPoints[index] = value;
    setDataPoints(newDataPoints);
  };

  const calculateStatistics = () => {
    try {
      const numbers = dataPoints
        .filter(point => point.trim() !== '')
        .map(point => parseFloat(point))
        .filter(num => !isNaN(num));

      if (numbers.length === 0) {
        setResults({ error: 'No valid data points' });
        return;
      }

      const stats = {
        count: numbers.length,
        sum: numbers.reduce((a, b) => a + b, 0),
        mean: mean(numbers),
        median: median(numbers),
        standardDeviation: std(numbers),
        variance: variance(numbers),
        min: Math.min(...numbers),
        max: Math.max(...numbers),
        range: Math.max(...numbers) - Math.min(...numbers),
      };

      setResults(stats);
    } catch (error) {
      setResults({ error: 'Calculation error' });
    }
  };

  const clearAll = () => {
    setDataPoints(['']);
    setResults({});
  };

  const renderDataPoint = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.dataPointRow}>
      <Text style={[styles.indexText, { color: textColor }]}>
        X{index + 1}:
      </Text>
      <TextInput
        style={[styles.dataInput, { 
          backgroundColor: inputBgColor,
          color: textColor,
          borderColor: isDark ? '#333333' : '#CCCCCC'
        }]}
        value={item}
        onChangeText={(text) => updateDataPoint(index, text)}
        inputMode="numeric"
        placeholder="Enter value"
        placeholderTextColor={isDark ? '#666666' : '#999999'}
      />
      <CalculatorButton
        symbol="×"
        type="clear"
        onPress={() => removeDataPoint(index)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={backgroundColors} style={styles.container}>
        <ScrollView style={styles.content}>
          <Text style={[styles.title, { color: textColor }]}>Statistics Calculator</Text>
          {/* Data Input Section */}
          <View style={[styles.section, { backgroundColor: inputBgColor }]}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Data Points</Text>
            
            <FlatList
              data={dataPoints}
              renderItem={renderDataPoint}
              keyExtractor={(_, index) => index.toString()}
              style={styles.dataList}
              scrollEnabled={false}
            />
            
            <View style={styles.dataControls}>
              <CalculatorButton
                symbol="Add Point"
                type="function"
                onPress={addDataPoint}
              />
              <CalculatorButton
                symbol="Calculate"
                type="equals"
                onPress={calculateStatistics}
              />
              <CalculatorButton
                symbol="Clear All"
                type="clear"
                onPress={clearAll}
              />
            </View>
          </View>

          {/* Results Section */}
          {Object.keys(results).length > 0 && (
            <View style={[styles.section, { backgroundColor: inputBgColor }]}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>Statistical Results</Text>
              
              {results.error ? (
                <Text style={[styles.errorText, { color: '#EF4444' }]}>
                  {results.error}
                </Text>
              ) : (
                <View style={styles.resultsGrid}>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: textColor }]}>Count (n):</Text>
                    <Text style={[styles.resultValue, { color: textColor }]}>{results.count}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: textColor }]}>Sum (Σx):</Text>
                    <Text style={[styles.resultValue, { color: textColor }]}>{results.sum?.toFixed(4)}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: textColor }]}>Mean (x̄):</Text>
                    <Text style={[styles.resultValue, { color: textColor }]}>{results.mean?.toFixed(4)}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: textColor }]}>Median:</Text>
                    <Text style={[styles.resultValue, { color: textColor }]}>{results.median?.toFixed(4)}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: textColor }]}>Std Dev (σ):</Text>
                    <Text style={[styles.resultValue, { color: textColor }]}>{results.standardDeviation?.toFixed(4)}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: textColor }]}>Variance (σ²):</Text>
                    <Text style={[styles.resultValue, { color: textColor }]}>{results.variance?.toFixed(4)}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: textColor }]}>Min:</Text>
                    <Text style={[styles.resultValue, { color: textColor }]}>{results.min?.toFixed(4)}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: textColor }]}>Max:</Text>
                    <Text style={[styles.resultValue, { color: textColor }]}>{results.max?.toFixed(4)}</Text>
                  </View>
                  <View style={styles.resultRow}>
                    <Text style={[styles.resultLabel, { color: textColor }]}>Range:</Text>
                    <Text style={[styles.resultValue, { color: textColor }]}>{results.range?.toFixed(4)}</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  dataList: {
    maxHeight: 300,
  },
  dataPointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  indexText: {
    fontSize: 16,
    fontWeight: '600',
    width: 40,
  },
  dataInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginHorizontal: 8,
    borderWidth: 1,
  },
  dataControls: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  resultsGrid: {
    gap: 8,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { evaluate, dot, cross, norm } from 'mathjs';
import CalculatorButton from '@/components/CalculatorButton';
import { useCalculator } from '@/contexts/CalculatorContext';

export default function VectorScreen() {
  const { state } = useCalculator();
  const isDark = state.theme === 'dark';
  
  const [vectorA, setVectorA] = useState(['1', '2', '3']);
  const [vectorB, setVectorB] = useState(['4', '5', '6']);
  const [result, setResult] = useState('');

  const backgroundColors = isDark ? ['#121212', '#1E1E1E'] : ['#F3F4F6', '#FFFFFF'];
  const textColor = isDark ? '#FFFFFF' : '#1F2937';
  const inputBgColor = isDark ? '#2A2A2A' : '#F8F9FA';

  const updateVectorValue = (vector: 'A' | 'B', index: number, value: string) => {
    if (vector === 'A') {
      const newVector = [...vectorA];
      newVector[index] = value;
      setVectorA(newVector);
    } else {
      const newVector = [...vectorB];
      newVector[index] = value;
      setVectorB(newVector);
    }
  };

  const performVectorOperation = (operation: string) => {
    try {
      const vectorANumbers = vectorA.map(val => parseFloat(val) || 0);
      const vectorBNumbers = vectorB.map(val => parseFloat(val) || 0);
      
      let resultValue;
      
      switch (operation) {
        case 'add':
          resultValue = vectorANumbers.map((a, i) => a + vectorBNumbers[i]);
          setResult(`A + B = [${resultValue.map(v => v.toFixed(4)).join(', ')}]`);
          break;
        case 'subtract':
          resultValue = vectorANumbers.map((a, i) => a - vectorBNumbers[i]);
          setResult(`A - B = [${resultValue.map(v => v.toFixed(4)).join(', ')}]`);
          break;
        case 'dot':
          resultValue = dot(vectorANumbers, vectorBNumbers);
          setResult(`A · B = ${resultValue.toFixed(4)}`);
          break;
        case 'cross':
          if (vectorANumbers.length === 3 && vectorBNumbers.length === 3) {
            resultValue = cross(vectorANumbers, vectorBNumbers);
            setResult(`A × B = [${resultValue.map((v: number) => v.toFixed(4)).join(', ')}]`);
          } else {
            setResult('Cross product requires 3D vectors');
          }
          break;
        case 'magnitudeA':
          resultValue = norm(vectorANumbers);
          setResult(`|A| = ${resultValue.toFixed(4)}`);
          break;
        case 'magnitudeB':
          resultValue = norm(vectorBNumbers);
          setResult(`|B| = ${resultValue.toFixed(4)}`);
          break;
        case 'angle':
          const dotProduct = dot(vectorANumbers, vectorBNumbers);
          const magnitudeA = norm(vectorANumbers);
          const magnitudeB = norm(vectorBNumbers);
          const cosAngle = dotProduct / (magnitudeA * magnitudeB);
          const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
          const angleDeg = (angleRad * 180) / Math.PI;
          setResult(`Angle = ${angleDeg.toFixed(4)}° (${angleRad.toFixed(4)} rad)`);
          break;
        default:
          return;
      }
    } catch (error) {
      setResult('Error: Invalid operation');
    }
  };

  const clearAll = () => {
    setVectorA(['1', '2', '3']);
    setVectorB(['4', '5', '6']);
    setResult('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={backgroundColors} style={styles.container}>
        <ScrollView style={styles.content}>
          <Text style={[styles.title, { color: textColor }]}>Vector Calculator</Text>
          {/* Vector A Input */}
          <View style={[styles.vectorContainer, { backgroundColor: inputBgColor }]}>
            <Text style={[styles.vectorLabel, { color: textColor }]}>Vector A</Text>
            <View style={styles.vectorInputs}>
              {vectorA.map((value, index) => (
                <View key={index} style={styles.componentContainer}>
                  <Text style={[styles.componentLabel, { color: textColor }]}>
                    {index === 0 ? 'i' : index === 1 ? 'j' : 'k'}
                  </Text>
                  <TextInput
                    style={[styles.vectorInput, { 
                      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
                      color: textColor,
                      borderColor: isDark ? '#333333' : '#CCCCCC'
                    }]}
                    value={value}
                    onChangeText={(text) => updateVectorValue('A', index, text)}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor={isDark ? '#666666' : '#999999'}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Vector B Input */}
          <View style={[styles.vectorContainer, { backgroundColor: inputBgColor }]}>
            <Text style={[styles.vectorLabel, { color: textColor }]}>Vector B</Text>
            <View style={styles.vectorInputs}>
              {vectorB.map((value, index) => (
                <View key={index} style={styles.componentContainer}>
                  <Text style={[styles.componentLabel, { color: textColor }]}>
                    {index === 0 ? 'i' : index === 1 ? 'j' : 'k'}
                  </Text>
                  <TextInput
                    style={[styles.vectorInput, { 
                      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
                      color: textColor,
                      borderColor: isDark ? '#333333' : '#CCCCCC'
                    }]}
                    value={value}
                    onChangeText={(text) => updateVectorValue('B', index, text)}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor={isDark ? '#666666' : '#999999'}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Operations */}
          <View style={styles.operationsGrid}>
            <View style={styles.row}>
              <CalculatorButton
                symbol="A + B"
                type="operator"
                onPress={() => performVectorOperation('add')}
              />
              <CalculatorButton
                symbol="A - B"
                type="operator"
                onPress={() => performVectorOperation('subtract')}
              />
              <CalculatorButton
                symbol="A · B"
                type="function"
                onPress={() => performVectorOperation('dot')}
              />
            </View>
            <View style={styles.row}>
              <CalculatorButton
                symbol="A × B"
                type="function"
                onPress={() => performVectorOperation('cross')}
              />
              <CalculatorButton
                symbol="|A|"
                type="function"
                onPress={() => performVectorOperation('magnitudeA')}
              />
              <CalculatorButton
                symbol="|B|"
                type="function"
                onPress={() => performVectorOperation('magnitudeB')}
              />
            </View>
            <View style={styles.row}>
              <CalculatorButton
                symbol="Angle"
                type="function"
                onPress={() => performVectorOperation('angle')}
              />
              <CalculatorButton
                symbol="Clear"
                type="clear"
                onPress={clearAll}
              />
            </View>
          </View>

          {/* Result Display */}
          {result && (
            <View style={[styles.resultContainer, { backgroundColor: inputBgColor }]}>
              <Text style={[styles.resultLabel, { color: textColor }]}>Result:</Text>
              <Text style={[styles.resultText, { color: textColor }]}>{result}</Text>
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
  vectorContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  vectorLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  vectorInputs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  componentContainer: {
    alignItems: 'center',
  },
  componentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  vectorInput: {
    width: 80,
    height: 40,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    borderWidth: 1,
  },
  operationsGrid: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  resultContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    fontFamily: 'monospace',
    lineHeight: 24,
  },
});

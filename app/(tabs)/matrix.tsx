import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { evaluate, matrix, det, inv, transpose } from 'mathjs';
import CalculatorButton from '@/components/CalculatorButton';
import { useCalculator } from '@/contexts/CalculatorContext';

export default function MatrixScreen() {
  const { state } = useCalculator();
  const isDark = state.theme === 'dark';
  
  const [matrixA, setMatrixA] = useState([
    ['1', '2'],
    ['3', '4']
  ]);
  const [matrixB, setMatrixB] = useState([
    ['5', '6'],
    ['7', '8']
  ]);
  const [result, setResult] = useState('');
  const [selectedMatrix, setSelectedMatrix] = useState<'A' | 'B'>('A');

  const backgroundColors = isDark ? ['#121212', '#1E1E1E'] : ['#F3F4F6', '#FFFFFF'];
  const textColor = isDark ? '#FFFFFF' : '#1F2937';
  const inputBgColor = isDark ? '#2A2A2A' : '#F8F9FA';

  const updateMatrixValue = (row: number, col: number, value: string) => {
    const currentMatrix = selectedMatrix === 'A' ? matrixA : matrixB;
    const newMatrix = currentMatrix.map((r, rIndex) =>
      rIndex === row ? r.map((c, cIndex) => (cIndex === col ? value : c)) : r
    );
    
    if (selectedMatrix === 'A') {
      setMatrixA(newMatrix);
    } else {
      setMatrixB(newMatrix);
    }
  };

  const performMatrixOperation = (operation: string) => {
    try {
      const matrixANumbers = matrixA.map(row => row.map(val => parseFloat(val) || 0));
      const matrixBNumbers = matrixB.map(row => row.map(val => parseFloat(val) || 0));
      
      let resultMatrix;
      
      switch (operation) {
        case 'add':
          resultMatrix = evaluate(`[[${matrixANumbers.map(row => row.join(',')).join('],[')}]] + [[${matrixBNumbers.map(row => row.join(',')).join('],[')}]]`);
          break;
        case 'subtract':
          resultMatrix = evaluate(`[[${matrixANumbers.map(row => row.join(',')).join('],[')}]] - [[${matrixBNumbers.map(row => row.join(',')).join('],[')}]]`);
          break;
        case 'multiply':
          resultMatrix = evaluate(`[[${matrixANumbers.map(row => row.join(',')).join('],[')}]] * [[${matrixBNumbers.map(row => row.join(',')).join('],[')}]]`);
          break;
        case 'detA':
          const detResult = det(matrixANumbers);
          setResult(`det(A) = ${detResult}`);
          return;
        case 'detB':
          const detResultB = det(matrixBNumbers);
          setResult(`det(B) = ${detResultB}`);
          return;
        case 'invA':
          resultMatrix = inv(matrixANumbers);
          break;
        case 'invB':
          resultMatrix = inv(matrixBNumbers);
          break;
        case 'transposeA':
          resultMatrix = transpose(matrixANumbers);
          break;
        case 'transposeB':
          resultMatrix = transpose(matrixBNumbers);
          break;
        default:
          return;
      }
      
      if (Array.isArray(resultMatrix)) {
        setResult(formatMatrix(resultMatrix));
      } else {
        setResult(resultMatrix.toString());
      }
    } catch (error) {
      Alert.alert('Error', 'Matrix operation failed. Check dimensions and values.');
      setResult('Error');
    }
  };

  const formatMatrix = (matrix: number[][]): string => {
    return matrix.map(row => 
      `[${row.map(val => parseFloat(val.toFixed(4))).join(', ')}]`
    ).join('\n');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={backgroundColors} style={styles.container}>
        <ScrollView style={styles.content}>
          <Text style={[styles.title, { color: textColor }]}>Matrix Calculator</Text>
          {/* Matrix Selection */}
          <View style={styles.matrixSelector}>
            <CalculatorButton
              symbol="Matrix A"
              type={selectedMatrix === 'A' ? 'function' : 'digit'}
              onPress={() => setSelectedMatrix('A')}
            />
            <CalculatorButton
              symbol="Matrix B"
              type={selectedMatrix === 'B' ? 'function' : 'digit'}
              onPress={() => setSelectedMatrix('B')}
            />
          </View>

          {/* Matrix Input */}
          <View style={[styles.matrixContainer, { backgroundColor: inputBgColor }]}>
            <Text style={[styles.matrixLabel, { color: textColor }]}>
              Matrix {selectedMatrix}
            </Text>
            <View style={styles.matrixGrid}>
              {(selectedMatrix === 'A' ? matrixA : matrixB).map((row, rowIndex) => (
                <View key={rowIndex} style={styles.matrixRow}>
                  {row.map((value, colIndex) => (
                    <TextInput
                      key={`${rowIndex}-${colIndex}`}
                      style={[styles.matrixInput, { 
                        backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
                        color: textColor 
                      }]}
                      value={value}
                      onChangeText={(text) => updateMatrixValue(rowIndex, colIndex, text)}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor={isDark ? '#666666' : '#999999'}
                    />
                  ))}
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
                onPress={() => performMatrixOperation('add')}
              />
              <CalculatorButton
                symbol="A - B"
                type="operator"
                onPress={() => performMatrixOperation('subtract')}
              />
              <CalculatorButton
                symbol="A × B"
                type="operator"
                onPress={() => performMatrixOperation('multiply')}
              />
            </View>
            <View style={styles.row}>
              <CalculatorButton
                symbol="det(A)"
                type="function"
                onPress={() => performMatrixOperation('detA')}
              />
              <CalculatorButton
                symbol="det(B)"
                type="function"
                onPress={() => performMatrixOperation('detB')}
              />
              <CalculatorButton
                symbol="A⁻¹"
                type="function"
                onPress={() => performMatrixOperation('invA')}
              />
            </View>
            <View style={styles.row}>
              <CalculatorButton
                symbol="Aᵀ"
                type="function"
                onPress={() => performMatrixOperation('transposeA')}
              />
              <CalculatorButton
                symbol="Bᵀ"
                type="function"
                onPress={() => performMatrixOperation('transposeB')}
              />
              <CalculatorButton
                symbol="Clear"
                type="clear"
                onPress={() => setResult('')}
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
  matrixSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  matrixContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  matrixLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  matrixGrid: {
    alignItems: 'center',
  },
  matrixRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  matrixInput: {
    width: 60,
    height: 40,
    marginHorizontal: 4,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333333',
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
    fontSize: 14,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
});

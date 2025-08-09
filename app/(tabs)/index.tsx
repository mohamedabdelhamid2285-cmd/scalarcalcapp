import React from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCalculator } from '@/contexts/CalculatorContext';
import Display from '@/components/Display';
import CalculatorButton from '@/components/CalculatorButton';

export default function CalculatorScreen() {
  console.log('CalculatorScreen: Rendering CalculatorScreen'); // Added log
  const { state, dispatch } = useCalculator();
  const isDark = state.theme === 'dark';

  const backgroundColors = isDark ? ['#121212', '#1E1E1E'] : ['#F3F4F6', '#FFFFFF'];

  const handlePress = (action: any) => {
    console.log('CalculatorScreen: Dispatching action:', action);
    dispatch(action);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient
        colors={backgroundColors}
        style={styles.container}
      >
        <Display />
        <View style={styles.buttonGrid}>
          {/* Row 1: Scientific Functions */}
          <View style={styles.row}>
            <CalculatorButton
              symbol="SHIFT"
              type="function"
              onPress={() => {}} // No functionality yet
            />
            <CalculatorButton
              symbol="ALPHA"
              type="function"
              onPress={() => {}} // No functionality yet
            />
            <CalculatorButton
              symbol={state.angleUnit.toUpperCase()}
              type="function"
              onPress={() => handlePress({ type: 'TOGGLE_ANGLE_UNIT' })}
            />
            <CalculatorButton
              symbol="("
              type="function"
              onPress={() => handlePress({ type: 'ADD_PARENTHESIS', payload: '(' })}
            />
            <CalculatorButton
              symbol=")"
              type="function"
              onPress={() => handlePress({ type: 'ADD_PARENTHESIS', payload: ')' })}
            />
          </View>

          {/* Row 2: Advanced Functions */}
          <View style={styles.row}>
            <CalculatorButton
              symbol="x²"
              type="function"
              onPress={() => handlePress({ type: 'OPERATOR_PRESS', payload: '^2' })}
            />
            <CalculatorButton
              symbol="xʸ"
              type="function"
              onPress={() => handlePress({ type: 'OPERATOR_PRESS', payload: '^' })}
            />
            <CalculatorButton
              symbol="sin"
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: 'sin' })}
            />
            <CalculatorButton
              symbol="cos"
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: 'cos' })}
            />
            <CalculatorButton
              symbol="tan"
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: 'tan' })}
            />
          </View>

          {/* Row 3: More Functions */}
          <View style={styles.row}>
            <CalculatorButton
              symbol="√"
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: 'sqrt' })}
            />
            <CalculatorButton
              symbol="log"
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: 'log10' })}
            />
            <CalculatorButton
              symbol="ln"
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: 'log' })}
            />
            <CalculatorButton
              symbol="π"
              type="function"
              onPress={() => handlePress({ type: 'CONSTANT_PRESS', payload: 'pi' })}
            />
            <CalculatorButton
              symbol="e"
              type="function"
              onPress={() => handlePress({ type: 'CONSTANT_PRESS', payload: 'e' })}
            />
          </View>

          {/* Row 4: Memory and Clear */}
          <View style={styles.row}>
            <CalculatorButton
              symbol="MS"
              type="memory"
              onPress={() => {}} // No functionality yet
            />
            <CalculatorButton
              symbol="MR"
              type="memory"
              onPress={() => {}} // No functionality yet
            />
            <CalculatorButton
              symbol="MC"
              type="memory"
              onPress={() => {}} // No functionality yet
            />
            <CalculatorButton
              symbol="DEL"
              type="clear"
              onPress={() => handlePress({ type: 'DELETE' })}
            />
            <CalculatorButton
              symbol="AC"
              type="clear"
              onPress={() => handlePress({ type: 'CLEAR' })}
            />
          </View>

          {/* Row 5: Numbers and Operations */}
          <View style={styles.row}>
            <CalculatorButton
              symbol="7"
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '7' })}
            />
            <CalculatorButton
              symbol="8"
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '8' })}
            />
            <CalculatorButton
              symbol="9"
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '9' })}
            />
            <CalculatorButton
              symbol="×"
              type="operator"
              onPress={() => handlePress({ type: 'OPERATOR_PRESS', payload: '*' })}
            />
            <CalculatorButton
              symbol="÷"
              type="operator"
              onPress={() => handlePress({ type: 'OPERATOR_PRESS', payload: '/' })}
            />
          </View>

          {/* Row 6 */}
          <View style={styles.row}>
            <CalculatorButton
              symbol="4"
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '4' })}
            />
            <CalculatorButton
              symbol="5"
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '5' })}
            />
            <CalculatorButton
              symbol="6"
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '6' })}
            />
            <CalculatorButton
              symbol="+"
              type="operator"
              onPress={() => handlePress({ type: 'OPERATOR_PRESS', payload: '+' })}
            />
            <CalculatorButton
              symbol="−"
              type="operator"
              onPress={() => handlePress({ type: 'OPERATOR_PRESS', payload: '-' })}
            />
          </View>

          {/* Row 7 */}
          <View style={styles.row}>
            <CalculatorButton
              symbol="1"
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '1' })}
            />
            <CalculatorButton
              symbol="2"
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '2' })}
            />
            <CalculatorButton
              symbol="3"
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '3' })}
            />
            <CalculatorButton
              symbol="Ans"
              type="function"
              onPress={() => {
                if (state.result && state.result !== '0' && state.result !== 'Error') {
                  handlePress({ type: 'NUMBER_PRESS', payload: state.result });
                }
              }}
            />
            <CalculatorButton
              symbol="="
              type="equals"
              onPress={() => handlePress({ type: 'EQUALS' })}
            />
          </View>

          {/* Row 8 */}
          <View style={styles.row}>
            <CalculatorButton
              symbol="0"
              flex={2}
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '0' })}
            />
            <CalculatorButton
              symbol="."
              onPress={() => handlePress({ type: 'NUMBER_PRESS', payload: '.' })}
            />
            <CalculatorButton
              symbol="+/-"
              type="function"
              onPress={() => handlePress({ type: 'TOGGLE_SIGN' })}
            />
            <CalculatorButton
              symbol="EXP"
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: 'exp' })}
            />
            <CalculatorButton
              symbol="!"
              type="function"
              onPress={() => handlePress({ type: 'FACTORIAL_PRESS' })}
            />
          </View>
        </View>
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
  buttonGrid: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
});

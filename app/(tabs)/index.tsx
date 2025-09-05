import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Text, // Import Text for the SHIFT indicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCalculator } from '@/contexts/CalculatorContext';
import { useAds } from '@/contexts/AdContext';
import Display from '@/components/Display';
import CalculatorButton from '@/components/CalculatorButton';
import BannerAd from '@/components/BannerAd';

export default function CalculatorScreen() {
  const { state, dispatch } = useCalculator();
  const { showInterstitialAd } = useAds();
  const isDark = state.theme === 'dark';

  useEffect(() => {
    console.log('CalculatorScreen: Component mounted/re-rendered');
  }, [state.theme, state.shiftActive, state.alphaActive, state.storeActive]); // Log on initial mount, theme, and shift changes

  const backgroundColors = isDark ? ['#121212', '#1E1E1E'] : ['#F3F4F6', '#FFFFFF'];
  const textColor = isDark ? '#FFFFFF' : '#1F2937';

  const handlePress = (action: any) => {
    console.log('CalculatorScreen: handlePress called with action:', action); // Log when handlePress is triggered
    
    // Show interstitial ad occasionally for non-premium users
    if (action.type === 'EQUALS' && Math.random() < 0.3) {
      showInterstitialAd();
    }
    
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
        <BannerAd />
        <View style={styles.buttonGrid}>
          {/* Row 1: Scientific Functions */}
          <View style={styles.row}>
            <CalculatorButton
              symbol="SHIFT"
              type={state.shiftActive ? 'equals' : 'function'} // Highlight SHIFT when active
              onPress={() => handlePress({ type: 'TOGGLE_SHIFT' })}
            />
            <CalculatorButton
              symbol="ALPHA"
              type={state.alphaActive ? 'equals' : 'function'} // Highlight ALPHA when active
              onPress={() => handlePress({ type: 'TOGGLE_ALPHA' })}
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
              symbol={state.shiftActive ? 'x³' : 'x²'}
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: state.shiftActive ? '^3' : '^2' })}
            />
            <CalculatorButton
              symbol={state.shiftActive ? 'y√x' : 'xʸ'}
              type="function"
              onPress={() => handlePress({ type: 'OPERATOR_PRESS', payload: state.shiftActive ? 'nthRoot(' : '^' })}
            />
            <CalculatorButton
              symbol={state.shiftActive ? 'sin⁻¹' : 'sin'}
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: state.shiftActive ? 'asin(' : 'sin(' })}
            />
            <CalculatorButton
              symbol={state.shiftActive ? 'cos⁻¹' : 'cos'}
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: state.shiftActive ? 'acos(' : 'cos(' })}
            />
            <CalculatorButton
              symbol={state.shiftActive ? 'tan⁻¹' : 'tan'}
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: state.shiftActive ? 'atan(' : 'tan(' })}
            />
          </View>

          {/* Row 3: More Functions */}
          <View style={styles.row}>
            <CalculatorButton
              symbol={state.shiftActive ? '³√x' : '√'}
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: state.shiftActive ? 'cbrt(' : 'sqrt(' })}
            />
            <CalculatorButton
              symbol={state.shiftActive ? '10ˣ' : 'log'}
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: state.shiftActive ? '10^' : 'log10(' })}
            />
            <CalculatorButton
              symbol={state.shiftActive ? 'eˣ' : 'ln'}
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: state.shiftActive ? 'e^' : 'log(' })}
            />
            <CalculatorButton
              symbol="π"
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: 'pi' })}
            />
            <CalculatorButton
              symbol="e"
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: 'e' })}
            />
          </View>

          {/* Row 4: Memory and Clear */}
          <View style={styles.row}>
            <CalculatorButton
              symbol="MS"
              type="memory"
              onPress={() => handlePress({ type: 'MEMORY_STORE', payload: state.result })}
            />
            <CalculatorButton
              symbol="MR"
              type="memory"
              onPress={() => handlePress({ type: 'MEMORY_RECALL' })}
            />
            <CalculatorButton
              symbol="MC"
              type="memory"
              onPress={() => handlePress({ type: 'MEMORY_CLEAR' })}
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
              symbol={state.alphaActive || state.storeActive ? 'A' : 'Ans'} // Display 'A' if alpha/store active
              type="function"
              onPress={() => {
                if (state.alphaActive) {
                  handlePress({ type: 'INSERT_VARIABLE', payload: 'A' });
                } else if (state.storeActive) {
                  handlePress({ type: 'STORE_VARIABLE', payload: { variableName: 'A', value: parseFloat(state.result) } });
                } else if (state.result) {
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
              symbol="STO" // Replaced EXP with STO
              type={state.storeActive ? 'equals' : 'function'} // Highlight STO when active
              onPress={() => handlePress({ type: 'TOGGLE_STORE' })}
            />
            <CalculatorButton
              symbol="!"
              type="function"
              onPress={() => handlePress({ type: 'FUNCTION_PRESS', payload: '!' })}
            />
          </View>
        </View>
        {state.shiftActive && (
          <View style={styles.shiftIndicatorContainer}>
            <Text style={[styles.shiftIndicatorText, { color: textColor }]}>SHIFT</Text>
          </View>
        )}
        {state.alphaActive && (
          <View style={styles.alphaIndicatorContainer}>
            <Text style={[styles.alphaIndicatorText, { color: textColor }]}>ALPHA</Text>
          </View>
        )}
        {state.storeActive && (
          <View style={styles.storeIndicatorContainer}>
            <Text style={[styles.storeIndicatorText, { color: textColor }]}>STO</Text>
          </View>
        )}
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
  shiftIndicatorContainer: {
    position: 'absolute',
    top: 50, // Adjust as needed
    left: 20, // Adjust as needed
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  shiftIndicatorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alphaIndicatorContainer: {
    position: 'absolute',
    top: 50, // Adjust as needed
    left: 90, // Adjust to be next to SHIFT
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alphaIndicatorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storeIndicatorContainer: {
    position: 'absolute',
    top: 50, // Adjust as needed
    left: 170, // Adjust to be next to ALPHA
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  storeIndicatorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { create, all } from 'mathjs';

// Define the state and action types for the calculator
interface CalculatorState {
  expression: string;
  result: string;
  history: { expression: string; result: string }[];
  error: string | null;
  angleUnit: 'deg' | 'rad'; // 'deg' for degrees, 'rad' for radians
  lastInputType: 'number' | 'operator' | 'function' | 'parenthesis' | 'equals' | null;
  theme: 'light' | 'dark'; // Add theme to state
  memoryValue: number; // Add memoryValue to state
  shiftActive: boolean; // Add shiftActive state
  isAlphaModeActive: boolean; // New ALPHA mode state
  storeModeActive: boolean; // New state for STO flow
  recallModeActive: boolean; // New state for RCL flow
  selectedVariable: string | null; // Currently selected variable (A, B, C, X, Y)
  variables: { [key: string]: number }; // Store variables (A, B, C, X, Y)
  calculationCount: number; // Track calculation count for ad display
}

type CalculatorAction =
  | { type: 'NUMBER_PRESS'; payload: string }
  | { type: 'OPERATOR_PRESS'; payload: string }
  | { type: 'FUNCTION_PRESS'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'DELETE' }
  | { type: 'EQUALS' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'TOGGLE_ANGLE_UNIT' }
  | { type: 'ADD_PARENTHESIS'; payload: '(' | ')' }
  | { type: 'TOGGLE_THEME' } // Action for theme toggling
  | { type: 'SET_ANGLE_UNIT'; payload: 'deg' | 'rad' } // Action to set angle unit
  | { type: 'MEMORY_STORE'; payload: string } // Action for memory store
  | { type: 'MEMORY_RECALL' } // Action for memory recall
  | { type: 'MEMORY_CLEAR' } // Action for memory clear
  | { type: 'TOGGLE_SHIFT' } // Action for toggling shift mode
  | { type: 'TOGGLE_ALPHA' } // Action for toggling ALPHA mode
  | { type: 'INITIATE_STORE_MODE' } // New action to activate store mode
  | { type: 'INITIATE_RECALL_MODE' } // New action to activate recall mode
  | { type: 'VARIABLE_KEY_PRESS'; payload: string } // Action for A, B, C, X, Y buttons
  | { type: 'CLEAR_VARIABLES' } // Action to clear all variables
  | { type: 'INCREMENT_CALCULATION_COUNT' } // Action to increment calculation count
  | { type: 'RESET_CALCULATION_COUNT' } // Action to reset calculation count

const initialState: CalculatorState = {
  expression: '',
  result: '0',
  history: [],
  error: null,
  angleUnit: 'deg', // Default to degrees
  lastInputType: null,
  theme: 'light', // Default theme
  memoryValue: 0, // Default memory value
  shiftActive: false, // Default shift state
  isAlphaModeActive: false, // Default ALPHA mode state
  storeModeActive: false, // Default store mode state
  recallModeActive: false, // Default recall mode state
  selectedVariable: null, // No variable selected initially
  variables: {
    'A': 0,
    'B': 0,
    'C': 0,
    'X': 0,
    'Y': 0,
  },
  calculationCount: 0, // Initialize calculation count
};

// Helper function to check if a character is an operator
const isOperator = (char: string) => ['+', '-', '*', '/', '%', '^'].includes(char);

// Helper function to check if a character is a function
const isFunction = (char: string) => ['sin', 'cos', 'tan', 'log', 'sqrt', 'log10', 'pi', 'e', 'nthRoot'].includes(char);

const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  // Initialize mathjs instance for evaluation
  const math = create(all);
  math.config({
    angle: state.angleUnit,
    number: 'BigNumber',
    precision: 14,
  });

  // Helper to reset variable modes
  const resetVariableModes = () => ({
    isAlphaModeActive: false,
    storeModeActive: false,
    recallModeActive: false,
    selectedVariable: null,
  });

  switch (action.type) {
    case 'NUMBER_PRESS': {
      let newExpression = state.expression;
      const lastCharInExpr = newExpression.slice(-1);

      if (state.lastInputType === 'equals' || state.error) {
        // If last action was equals or there was an error, start a new expression
        newExpression = action.payload;
      } else if (newExpression === '0' && action.payload !== '.') {
        // Prevent multiple leading zeros unless it's a decimal
        newExpression = action.payload;
      } else if (newExpression === '' && action.payload === '.') {
        // Handle initial '.' input to display '0.'
        newExpression = '0.';
      } else if (action.payload === '.' && newExpression.includes('.') && state.lastInputType === 'number') {
        // Prevent multiple decimals in a single number
        const lastNumber = newExpression.split(/[\+\-\*\/%()^]/).pop();
        if (lastNumber && lastNumber.includes('.')) {
          return state;
        }
        newExpression += action.payload;
      } else {
        // Implicit multiplication: if number follows variable or closing parenthesis
        if (
          (state.lastInputType === 'parenthesis' && lastCharInExpr === ')') || // e.g., (2+3)2
          (/[A-Z]/.test(lastCharInExpr) && state.variables.hasOwnProperty(lastCharInExpr)) // e.g., A2
        ) {
          newExpression += '*';
        }
        newExpression += action.payload;
      }

      return {
        ...state,
        expression: newExpression,
        lastInputType: 'number',
        error: null,
        ...resetVariableModes(), // Reset variable modes on number press
      };
    }

    case 'OPERATOR_PRESS': {
      let exprAfterOperator = state.expression;
      if (state.lastInputType === 'equals' || state.error) {
        exprAfterOperator = state.result;
      }

      if (exprAfterOperator === '' && action.payload !== '-') {
        return state;
      }

      if (state.lastInputType === 'operator') {
        const lastChar = exprAfterOperator.slice(-1);
        if (isOperator(lastChar) && !(action.payload === '-' && lastChar === '-')) {
          return {
            ...state,
            expression: exprAfterOperator.slice(0, -1) + action.payload,
            lastInputType: 'operator',
            error: null,
            ...resetVariableModes(), // Reset variable modes
          };
        }
      }

      if (exprAfterOperator.endsWith('(') && isOperator(action.payload) && action.payload !== '-') {
        return state;
      }

      return {
        ...state,
        expression: exprAfterOperator + action.payload,
        lastInputType: 'operator',
        error: null,
        ...resetVariableModes(), // Reset variable modes on operator press
      };
    }

    case 'FUNCTION_PRESS':
      return {
        ...state,
        expression: state.expression + action.payload,
        lastInputType: 'function',
        error: null,
        ...resetVariableModes(), // Reset variable modes on function press
      };

    case 'ADD_PARENTHESIS': {
      const lastChar = state.expression.slice(-1);
      const openParenthesesCount = (state.expression.match(/\(/g) || []).length;
      const closeParenthesesCount = (state.expression.match(/\)/g) || []).length;

      if (action.payload === '(') {
        if (state.expression === '' || isOperator(lastChar) || lastChar === '(' || isFunction(lastChar)) {
          return { ...state, expression: state.expression + '(', lastInputType: 'parenthesis', error: null, ...resetVariableModes() };
        }
        if (/\d/.test(lastChar) || lastChar === ')') {
          return { ...state, expression: state.expression + '* (', lastInputType: 'parenthesis', error: null, ...resetVariableModes() };
        }
      } else { // action.payload === ')'
        if (openParenthesesCount > closeParenthesesCount && !isOperator(lastChar) && lastChar !== '(') {
          return { ...state, expression: state.expression + ')', lastInputType: 'parenthesis', error: null, ...resetVariableModes() };
        }
      }
      return state; // Do nothing if the parenthesis placement is invalid
    }

    case 'CLEAR':
      return {
        ...initialState,
        theme: state.theme,
        angleUnit: state.angleUnit,
        memoryValue: state.memoryValue,
        variables: state.variables, // Preserve variables on clear
        ...resetVariableModes(), // Ensure modes are reset on clear
      };

    case 'DELETE':
      return {
        ...state,
        expression: state.expression.slice(0, -1),
        result: '0', // Reset result when deleting
        error: null,
        lastInputType: state.expression.length > 1 ? (isOperator(state.expression.slice(-2, -1)) ? 'operator' : 'number') : null, // Simple heuristic
        ...resetVariableModes(), // Reset variable modes on delete
      };

    case 'TOGGLE_SIGN': {
      const expression = state.expression;
      const lastNumberMatch = expression.match(/(\d+\.?\d*)$/);
      if (lastNumberMatch) {
        const lastNumber = lastNumberMatch[1];
        const startIndex = lastNumberMatch.index!;
        const before = expression.substring(0, startIndex);
        const toggledNumber = parseFloat(lastNumber) * -1;
        return {
          ...state,
          expression: before + toggledNumber.toString(),
          error: null,
          ...resetVariableModes(),
        };
      } else if (expression === '') {
        return { ...state, expression: '-', lastInputType: 'operator', error: null, ...resetVariableModes() };
      } else if (expression === '-') {
        return { ...state, expression: '', lastInputType: null, error: null, ...resetVariableModes() };
      }
      return { ...state, ...resetVariableModes() }; // Reset modes even if no change
    }

    case 'TOGGLE_ANGLE_UNIT':
      return {
        ...state,
        angleUnit: state.angleUnit === 'deg' ? 'rad' : 'deg',
        error: null,
        ...resetVariableModes(),
      };

    case 'SET_ANGLE_UNIT':
      return {
        ...state,
        angleUnit: action.payload,
        error: null,
        ...resetVariableModes(),
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
        ...resetVariableModes(),
      };

    case 'MEMORY_STORE':
      try {
        let valueToStore: number;
        if (action.payload === 'Error' || action.payload === '') {
          return state;
        }

        if (!isNaN(Number(action.payload)) && state.lastInputType !== 'operator') {
          valueToStore = Number(action.payload);
        } else {
          valueToStore = math.evaluate(action.payload);
        }

        return {
          ...state,
          memoryValue: valueToStore,
          error: null,
          ...resetVariableModes(),
        };
      } catch (error) {
        console.error('Memory store error:', error);
        return {
          ...state,
          error: 'Memory Error',
          ...resetVariableModes(),
        };
      }

    case 'MEMORY_RECALL':
      return {
        ...state,
        expression: state.expression + state.memoryValue.toString(),
        lastInputType: 'number',
        error: null,
        ...resetVariableModes(),
      };

    case 'MEMORY_CLEAR':
      return {
        ...state,
        memoryValue: 0,
        error: null,
        ...resetVariableModes(),
      };

    case 'TOGGLE_SHIFT':
      return {
        ...state,
        shiftActive: !state.shiftActive,
        error: null,
        ...resetVariableModes(),
      };

    case 'TOGGLE_ALPHA':
      return {
        ...state,
        isAlphaModeActive: !state.isAlphaModeActive,
        storeModeActive: false, // Turn off other modes
        recallModeActive: false,
        selectedVariable: null, // Clear selected variable
        error: null,
      };

    case 'INITIATE_STORE_MODE':
      return {
        ...state,
        storeModeActive: true,
        recallModeActive: false,
        isAlphaModeActive: false,
        selectedVariable: null, // Clear selected variable
        error: null,
      };

    case 'INITIATE_RECALL_MODE':
      return {
        ...state,
        recallModeActive: true,
        storeModeActive: false,
        isAlphaModeActive: false,
        selectedVariable: null, // Clear selected variable
        error: null,
      };

    case 'VARIABLE_KEY_PRESS': {
      const variableName = action.payload;
      let newState = { ...state };

      if (newState.storeModeActive) {
        // Store value to variable
        let valueToStore: number;
        try {
          if (newState.expression !== '') {
            valueToStore = math.evaluate(newState.expression, newState.variables);
          } else {
            valueToStore = parseFloat(newState.result);
          }

          if (isNaN(valueToStore)) {
            throw new Error('Invalid value to store');
          }

          newState = {
            ...newState,
            variables: {
              ...newState.variables,
              [variableName]: valueToStore,
            },
            expression: '', // Clear expression after storing
            result: math.format(valueToStore, { precision: 14 }), // Display the stored value as result
            error: null,
          };
        } catch (error) {
          console.error('Store to variable error:', error);
          newState = { ...newState, error: 'Store Error' };
        }
        newState = { ...newState, ...resetVariableModes() }; // Reset modes after operation
      } else if (newState.recallModeActive || newState.isAlphaModeActive) {
        // Recall variable value or insert variable name
        let newExpr = newState.expression;
        const lastChar = newExpr.slice(-1);

        // Implicit multiplication: if variable follows number, closing parenthesis, or another variable
        if (
          (newState.lastInputType === 'number' && !isOperator(lastChar)) || // e.g., 2A
          (newState.lastInputType === 'parenthesis' && lastChar === ')') || // e.g., (2+3)A
          (/[A-Z]/.test(lastChar) && newState.variables.hasOwnProperty(lastChar)) // e.g., AB
        ) {
          newExpr += '*';
        }

        newExpr += variableName; // Append the variable name

        newState = {
          ...newState,
          expression: newExpr,
          lastInputType: 'number', // Treat variable as a number for subsequent inputs
          error: null,
        };
        newState = { ...newState, ...resetVariableModes() }; // Reset modes after operation
      }

      return newState;
    }

    case 'CLEAR_VARIABLES':
      return {
        ...state,
        variables: {
          'A': 0,
          'B': 0,
          'C': 0,
          'X': 0,
          'Y': 0,
        },
        error: null,
        ...resetVariableModes(), // Reset modes
      };

    case 'INCREMENT_CALCULATION_COUNT':
      return {
        ...state,
        calculationCount: state.calculationCount + 1,
      };

    case 'RESET_CALCULATION_COUNT':
      return {
        ...state,
        calculationCount: 0,
      };

    case 'EQUALS':
      try {
        if (!state.expression) return state;

        let result = math.evaluate(state.expression, state.variables);
        let formattedResult = math.format(result, { precision: 14 });

        const numericResult = parseFloat(formattedResult);
        if (Math.abs(numericResult) < 1e-12) {
          formattedResult = '0';
        } else if (Math.abs(numericResult - Math.round(numericResult)) < 1e-12) {
          formattedResult = Math.round(numericResult).toString();
        }

        const newHistory = [
          ...state.history.slice(-9),
          { expression: state.expression, result: formattedResult }
        ];

        return {
          ...state,
          result: formattedResult,
          expression: '',
          history: newHistory,
          error: null,
          lastInputType: 'equals',
          calculationCount: state.calculationCount + 1,
          ...resetVariableModes(), // Reset variable modes on equals
        };
      } catch (error) {
        console.error('Math evaluation error:', error);
        return {
          ...state,
          error: 'Math Error',
          result: 'Error',
          expression: '',
          lastInputType: null,
          ...resetVariableModes(), // Reset variable modes on error
        };
      }

    default:
      return state;
  }
};

interface CalculatorContextType {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  shouldShowInterstitialAd: () => boolean;
  markInterstitialAdShown: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

interface CalculatorProviderProps {
  children: ReactNode;
}

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const shouldShowInterstitialAd = () => {
    const shouldShow = state.calculationCount >= 10;
    return shouldShow;
  };

  const markInterstitialAdShown = () => {
    dispatch({ type: 'RESET_CALCULATION_COUNT' });
  };
  return (
    <CalculatorContext.Provider value={{ 
      state, 
      dispatch, 
      shouldShowInterstitialAd, 
      markInterstitialAdShown 
    }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};

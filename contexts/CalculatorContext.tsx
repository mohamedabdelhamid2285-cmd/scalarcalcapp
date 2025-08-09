import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { create, all } from 'mathjs';

// Define the state and action types for the calculator
interface CalculatorState {
  expression: string;
  result: string;
  history: { expression: string; result: string }[];
  error: string | null;
  angleUnit: 'deg' | 'rad'; // 'deg' for degrees, 'rad' for radians
  lastInputType: 'number' | 'operator' | 'function' | 'parenthesis' | 'equals' | 'constant' | null;
  theme: 'light' | 'dark'; // Added theme
  memoryValue: number; // Added memory value
  previousExpression: string; // To store the expression before equals was pressed
}

type CalculatorAction =
  | { type: 'NUMBER_PRESS'; payload: string }
  | { type: 'OPERATOR_PRESS'; payload: string }
  | { type: 'FUNCTION_PRESS'; payload: string } // For sin, cos, tan, log, sqrt, exp
  | { type: 'CONSTANT_PRESS'; payload: string } // For pi, e
  | { type: 'CLEAR' }
  | { type: 'DELETE' }
  | { type: 'EQUALS' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'TOGGLE_ANGLE_UNIT' }
  | { type: 'ADD_PARENTHESIS'; payload: '(' | ')' }
  | { type: 'FACTORIAL_PRESS' } // For '!'
  | { type: 'TOGGLE_THEME' } // New action for theme
  | { type: 'SET_ANGLE_UNIT'; payload: 'deg' | 'rad' } // New action for angle unit
  | { type: 'CLEAR_ALL' } // New action to clear all (history, expression, result)
  | { type: 'MEMORY_CLEAR' } // New action for memory clear
  | { type: 'MEMORY_ADD'; payload: number } // New action for memory add
  | { type: 'MEMORY_SUBTRACT'; payload: number } // New action for memory subtract
  | { type: 'MEMORY_RECALL' }; // New action for memory recall

const initialState: CalculatorState = {
  expression: '',
  result: '0',
  history: [],
  error: null,
  angleUnit: 'deg', // Default to degrees
  lastInputType: null,
  theme: 'light', // Default theme
  memoryValue: 0, // Initial memory value
  previousExpression: '', // Initial previous expression
};

// Helper function to check if a character is an operator
const isOperator = (char: string) => ['+', '-', '*', '/', '%', '^'].includes(char);

// Helper function to check if a character is a function (for parenthesis logic)
const isFunction = (char: string) => ['sin', 'cos', 'tan', 'log10', 'log', 'sqrt', 'exp'].includes(char);

const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  console.log('CalculatorReducer: Received action:', action);
  switch (action.type) {
    case 'NUMBER_PRESS':
      // Prevent multiple leading zeros unless it's a decimal
      if (state.expression === '0' && action.payload !== '.') {
        return { ...state, expression: action.payload, lastInputType: 'number', error: null };
      }
      // Prevent multiple decimals in a single number
      if (action.payload === '.') {
        const lastNumberMatch = state.expression.match(/(\d+\.?\d*)$/);
        if (lastNumberMatch && lastNumberMatch[1].includes('.')) {
          return state; // Already has a decimal
        }
      }
      return {
        ...state,
        expression: state.expression + action.payload,
        lastInputType: 'number',
        error: null,
      };

    case 'OPERATOR_PRESS':
      // Prevent adding an operator if the expression is empty and the operator is not '-'
      if (state.expression === '' && action.payload !== '-') {
        return state;
      }

      // If the last input was an operator, replace it with the new one (unless it's a double negative)
      if (state.lastInputType === 'operator') {
        const lastChar = state.expression.slice(-1);
        if (isOperator(lastChar) && !(action.payload === '-' && lastChar === '-')) {
          return {
            ...state,
            expression: state.expression.slice(0, -1) + action.payload,
            lastInputType: 'operator',
            error: null,
          };
        }
      }

      // Prevent adding an operator right after an opening parenthesis
      if (state.expression.endsWith('(') && isOperator(action.payload) && action.payload !== '-') {
        return state;
      }

      return {
        ...state,
        expression: state.expression + action.payload,
        lastInputType: 'operator',
        error: null,
      };

    case 'FUNCTION_PRESS':
      // Append the function name followed by an opening parenthesis
      return {
        ...state,
        expression: state.expression + action.payload + '(',
        lastInputType: 'function',
        error: null,
      };

    case 'CONSTANT_PRESS':
      // Append the constant name
      return {
        ...state,
        expression: state.expression + action.payload,
        lastInputType: 'constant',
        error: null,
      };

    case 'FACTORIAL_PRESS':
      // Append '!' for factorial
      return {
        ...state,
        expression: state.expression + '!',
        lastInputType: 'operator', // Treat as an operator for input type tracking
        error: null,
      };

    case 'ADD_PARENTHESIS':
      const lastChar = state.expression.slice(-1);
      const openParenthesesCount = (state.expression.match(/\(/g) || []).length;
      const closeParenthesesCount = (state.expression.match(/\)/g) || []).length;

      if (action.payload === '(') {
        // Allow opening parenthesis after operators, other opening parentheses, or at the start
        if (state.expression === '' || isOperator(lastChar) || lastChar === '(' || isFunction(lastChar)) {
          return { ...state, expression: state.expression + '(', lastInputType: 'parenthesis', error: null };
        }
        // Allow opening parenthesis after a number or closing parenthesis if the next operation is multiplication (implied)
        if (/\d/.test(lastChar) || lastChar === ')') {
          return { ...state, expression: state.expression + '* (', lastInputType: 'parenthesis', error: null };
        }
      } else { // action.payload === ')'
        // Only allow closing parenthesis if there's an open one to close
        // and the last character is not an operator or another opening parenthesis
        if (openParenthesesCount > closeParenthesesCount && !isOperator(lastChar) && lastChar !== '(') {
          return { ...state, expression: state.expression + ')', lastInputType: 'parenthesis', error: null };
        }
      }
      return state; // Do nothing if the parenthesis placement is invalid

    case 'CLEAR':
      // Preserve theme, angleUnit, and memoryValue when clearing the calculator
      return {
        ...initialState,
        theme: state.theme,
        angleUnit: state.angleUnit,
        memoryValue: state.memoryValue,
      };

    case 'DELETE':
      return {
        ...state,
        expression: state.expression.slice(0, -1),
        result: '0', // Reset result when deleting expression
        error: null,
        lastInputType: state.expression.length > 1 ? (isOperator(state.expression.slice(-2, -1)) ? 'operator' : 'number') : null, // Simple heuristic
      };

    case 'TOGGLE_SIGN':
      // Find the last number or expression segment to toggle its sign
      const expression = state.expression;
      const lastNumberMatch = expression.match(/(\d+\.?\d*)$/); // Matches last number
      if (lastNumberMatch) {
        const lastNumber = lastNumberMatch[1];
        const startIndex = lastNumberMatch.index!;
        const before = expression.substring(0, startIndex);
        const toggledNumber = parseFloat(lastNumber) * -1;
        return {
          ...state,
          expression: before + toggledNumber.toString(),
          error: null,
        };
      } else if (expression === '') {
        return { ...state, expression: '-', lastInputType: 'operator', error: null };
      } else if (expression === '-') {
        return { ...state, expression: '', lastInputType: null, error: null };
      }
      return state; // If no number to toggle, do nothing

    case 'TOGGLE_ANGLE_UNIT':
      return {
        ...state,
        angleUnit: state.angleUnit === 'deg' ? 'rad' : 'deg',
        error: null,
      };

    case 'SET_ANGLE_UNIT':
      return {
        ...state,
        angleUnit: action.payload,
        error: null,
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
        error: null,
      };

    case 'CLEAR_ALL':
      return {
        ...initialState,
        theme: state.theme, // Preserve current theme
        angleUnit: state.angleUnit, // Preserve current angle unit
        memoryValue: state.memoryValue, // Preserve memory value
      };

    case 'MEMORY_CLEAR':
      return {
        ...state,
        memoryValue: 0,
        error: null,
      };

    case 'MEMORY_ADD':
      try {
        const valueToAdd = parseFloat(state.result);
        if (isNaN(valueToAdd)) throw new Error('Invalid number for memory operation');
        return {
          ...state,
          memoryValue: state.memoryValue + valueToAdd,
          error: null,
        };
      } catch (e: any) {
        return { ...state, error: 'Memory Error: ' + e.message };
      }

    case 'MEMORY_SUBTRACT':
      try {
        const valueToSubtract = parseFloat(state.result);
        if (isNaN(valueToSubtract)) throw new Error('Invalid number for memory operation');
        return {
          ...state,
          memoryValue: state.memoryValue - valueToSubtract,
          error: null,
        };
      } catch (e: any) {
        return { ...state, error: 'Memory Error: ' + e.message };
      }

    case 'MEMORY_RECALL':
      return {
        ...state,
        expression: state.memoryValue.toString(),
        lastInputType: 'number',
        error: null,
      };

    case 'EQUALS':
      try {
        if (!state.expression) return state;

        const originalExpression = state.expression; // Capture original expression

        // Ensure angleUnit is a string before comparison
        const angleUnitStr = typeof state.angleUnit === 'string' ? state.angleUnit.toLowerCase().trim() : '';

        // Create a math.js instance and configure it with the current angle unit
        const math = create(all);
        math.config({
          angle: angleUnitStr === 'deg' ? 'deg' : 'rad', //Explicitly set to 'deg' or 'rad'
          number: 'BigNumber',
          precision: 14,
        });

        // Log the math.js angle configuration right before evaluation
        console.log('Math.js config angle before evaluation:', math.config().angle);

        let finalExpression = state.expression;

        // Check if in degree mode and transform the expression
        if (angleUnitStr === 'deg') {
          // This regex finds common trig functions and wraps their numeric arguments in the unit() function
          const trigFunctions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'csc', 'sec', 'cot'];
          trigFunctions.forEach(func => {
            // Creates a regex like: /sin\(([\d.]+)\)/g
            const regex = new RegExp(`${func}\\(([\\d.]+)\\)`, 'g');
            // Replaces sin(90) with sin(unit(90, "deg"))
            finalExpression = finalExpression.replace(regex, `${func}(unit($1, "deg"))`);
          });
        }

        const result = math.evaluate(finalExpression);
        const formattedResult = math.format(result, { precision: 14 });

        const newHistory = [
          ...state.history.slice(-9),
          { expression: state.expression, result: formattedResult }
        ];

        return {
          ...state,
          result: formattedResult,
          history: newHistory,
          error: null,
          lastInputType: 'equals',
          expression: formattedResult, // Set expression to result for chaining operations
          previousExpression: originalExpression, // Store the original expression
        };
      } catch (error) {
        console.error('Math evaluation error:', error);
        return {
          ...state,
          error: 'Math Error',
          result: 'Error',
          expression: '', // Clear expression on error
        };
      }

    default:
      return state;
  }
};

interface CalculatorContextType {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

interface CalculatorProviderProps {
  children: ReactNode;
}

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
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

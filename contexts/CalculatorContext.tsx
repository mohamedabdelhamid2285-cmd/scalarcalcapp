import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { create, all } from 'mathjs';

export interface CalculatorState {
  expression: string;
  display: string;
  result: string;
  angleUnit: 'deg' | 'rad' | 'grad';
  memoryValue: number;
  history: Array<{ expression: string; result: string }>;
  theme: 'light' | 'dark';
  error: string | null;
}

export type CalculatorAction =
  | { type: 'DIGIT_PRESS'; payload: string }
  | { type: 'OPERATOR_PRESS'; payload: string }
  | { type: 'FUNCTION_PRESS'; payload: string }
  | { type: 'DECIMAL_PRESS' }
  | { type: 'BACKSPACE' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ALL' }
  | { type: 'EQUALS' }
  | { type: 'TOGGLE_ANGLE_UNIT' }
  | { type: 'SET_ANGLE_UNIT'; payload: 'deg' | 'rad' | 'grad' }
  | { type: 'MEMORY_STORE' }
  | { type: 'MEMORY_RECALL' }
  | { type: 'MEMORY_CLEAR' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: CalculatorState = {
  expression: '',
  display: '0',
  result: '',
  angleUnit: 'deg',
  memoryValue: 0,
  history: [],
  theme: 'dark',
  error: null,
};

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'DIGIT_PRESS':
      const newExpression = state.display === '0' ? action.payload : state.expression + action.payload;
      return {
        ...state,
        expression: newExpression,
        display: formatDisplay(newExpression),
        error: null,
      };

    case 'OPERATOR_PRESS':
      const internalOperators = ['+', '-', '*', '/'];
      const currentExpression = state.expression;
      const newOperator = action.payload;

      if (currentExpression.length === 0 && (newOperator === '*' || newOperator === '/')) {
        return state;
      }

      if (currentExpression.length > 0) {
        const lastChar = currentExpression.slice(-1);

        if (internalOperators.includes(lastChar)) {
          const updatedExpression = currentExpression.slice(0, -1) + newOperator;
          return {
            ...state,
            expression: updatedExpression,
            display: formatDisplay(updatedExpression),
            error: null,
          };
        }
      }

      return {
        ...state,
        expression: currentExpression + newOperator,
        display: formatDisplay(currentExpression + newOperator),
        error: null,
      };

    case 'FUNCTION_PRESS':
      const funcExpression = state.expression + action.payload;
      return {
        ...state,
        expression: funcExpression,
        display: formatDisplay(funcExpression),
        error: null,
      };

    case 'DECIMAL_PRESS':
      const lastNumberMatch = state.expression.match(/(\d+\.?\d*)$/);
      if (lastNumberMatch && lastNumberMatch[0].includes('.')) {
        return state;
      }
      if (state.expression === '' || state.expression.match(/[\+\-\*\/]$/)) {
        const decimalExpression = state.expression + '0.';
        return {
          ...state,
          expression: decimalExpression,
          display: formatDisplay(decimalExpression),
          error: null,
        };
      }
      const decimalExpression = state.expression + '.';
      return {
        ...state,
        expression: decimalExpression,
        display: formatDisplay(decimalExpression),
        error: null,
      };

    case 'BACKSPACE':
      if (state.expression.length > 0) {
        const backspaceExpression = state.expression.slice(0, -1);
        return {
          ...state,
          expression: backspaceExpression,
          display: backspaceExpression || '0',
          error: null,
        };
      }
      return state;

    case 'CLEAR':
      return {
        ...state,
        expression: '',
        display: '0',
        result: '',
        error: null,
      };

    case 'CLEAR_ALL':
      return {
        ...initialState,
        theme: state.theme,
        angleUnit: state.angleUnit,
        memoryValue: state.memoryValue,
      };

    case 'EQUALS':
      try {
        if (!state.expression) return state;

        // LOG #1: Check if the correct angle unit is reaching the reducer
        console.log(`Reducer received: expression='${state.expression}', angleUnit='${state.angleUnit}'`);

        // Create a math.js instance and configure it with the current angle unit
        const math = create(all);
        math.config({
          angle: state.angleUnit,
          number: 'BigNumber',
          precision: 14,
        });

        // LOG #2: Verify math.js configuration (optional, but good for deep dives)
        console.log('Math.js angle config:', math.config().angle);

        const result = math.evaluate(state.expression); // Evaluate the original expression
        const formattedResult = math.format(result, { precision: 14 }); // Use math.format

        // LOG #3: Check the result before storing
        console.log('Evaluated result:', formattedResult);

        const newHistory = [
          ...state.history.slice(-9),
          { expression: state.expression, result: formattedResult }
        ];

        return {
          ...state,
          result: formattedResult,
          history: newHistory,
          error: null,
        };
      } catch (error) {
        console.error('Math evaluation error:', error); // Log the actual error
        return {
          ...state,
          error: 'Math Error',
          result: 'Error',
        };
      }

    case 'TOGGLE_ANGLE_UNIT':
      const angleUnits: Array<'deg' | 'rad' | 'grad'> = ['deg', 'rad', 'grad'];
      const currentIndex = angleUnits.indexOf(state.angleUnit);
      const nextIndex = (currentIndex + 1) % angleUnits.length;
      return {
        ...state,
        angleUnit: angleUnits[nextIndex],
      };

    case 'SET_ANGLE_UNIT':
      return {
        ...state,
        angleUnit: action.payload,
      };

    case 'MEMORY_STORE':
      try {
        const value = state.result ? parseFloat(state.result) : 0;
        return {
          ...state,
          memoryValue: value,
        };
      } catch {
        return state;
      }

    case 'MEMORY_RECALL':
      return {
        ...state,
        expression: state.expression + state.memoryValue.toString(),
        display: formatDisplay(state.expression + state.memoryValue.toString()),
      };

    case 'MEMORY_CLEAR':
      return {
        ...state,
        memoryValue: 0,
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };

    case 'TOGGLE_SIGN':
      if (state.expression === '' || state.expression === '0') {
        return state;
      }

      const lastNumberRegex = /(-?\d+\.?\d*)$/;
      const match = state.expression.match(lastNumberRegex);

      if (match) {
        const lastNumberStr = match[1];
        const prefix = state.expression.substring(0, match.index);

        if (lastNumberStr.startsWith('-')) {
          const newExpression = prefix + lastNumberStr.substring(1);
          return {
            ...state,
            expression: newExpression,
            display: formatDisplay(newExpression),
            error: null,
          };
        } else {
          const charBefore = prefix.slice(-1);
          if (charBefore === '+' || charBefore === '-' || charBefore === '*' || charBefore === '/' || charBefore === '(' || prefix === '') {
            const newExpression = prefix + '-' + lastNumberStr;
            return {
              ...state,
              expression: newExpression,
              display: formatDisplay(newExpression),
              error: null,
            };
          } else {
            const newExpression = prefix + '(-' + lastNumberStr + ')';
            return {
              ...state,
              expression: newExpression,
              display: formatDisplay(newExpression),
              error: null,
            };
          }
        }
      } else {
        const newExpression = state.expression + '-';
        return {
          ...state,
          expression: newExpression,
          display: formatDisplay(newExpression),
          error: null,
        };
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

function formatDisplay(expression: string): string {
  return expression
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/sqrt\(/g, '√(')
    .replace(/\^/g, '^');
}

const CalculatorContext = createContext<{
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
} | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}

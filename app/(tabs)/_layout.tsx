import { Tabs } from 'expo-router';
import { CalculatorProvider } from '@/contexts/CalculatorContext';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

// Define custom colors for advanced function tabs
const CUSTOM_COLORS = {
  matrix: '#06B6D4', // Cyan
  vector: '#8B5CF6', // Violet
  statistics: '#F59E0B', // Amber
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Default colors for Calculator and Settings tabs
  const defaultTintColor = isDark ? '#FFFFFF' : '#1F2937';
  const inactiveTintColor = isDark ? '#A0A0A0' : '#6B7280';
  const tabBarBackground = isDark ? '#1E1E1E' : '#FFFFFF';

  return (
    <CalculatorProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: inactiveTintColor,
          tabBarStyle: {
            backgroundColor: tabBarBackground,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Calculator',
            tabBarActiveTintColor: defaultTintColor, // Use default theme color
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calculator-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="matrix"
          options={{
            title: 'Matrix',
            tabBarActiveTintColor: CUSTOM_COLORS.matrix, // Custom color
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="vector"
          options={{
            title: 'Vector',
            tabBarActiveTintColor: CUSTOM_COLORS.vector, // Custom color
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="navigate-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: 'Statistics',
            tabBarActiveTintColor: CUSTOM_COLORS.statistics, // Custom color
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarActiveTintColor: defaultTintColor, // Use default theme color
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </CalculatorProvider>
  );
}

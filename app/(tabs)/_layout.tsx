import { Tabs } from 'expo-router';
import { CalculatorProvider } from '@/contexts/CalculatorContext';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { useAds } from '@/contexts/AdContext';

export default function TabLayout() {
  const { isPremium, adFreeTrial } = useAds();
  const { isPremium, adFreeTrial } = useAds();
  const colorScheme = useColorScheme(); // Use system color scheme for initial tab bar styling
  const isDark = colorScheme === 'dark';
  const tintColor = isDark ? '#FFFFFF' : '#1F2937';
  const inactiveTintColor = isDark ? '#A0A0A0' : '#6B7280';
  const tabBarBackground = isDark ? '#1E1E1E' : '#FFFFFF';

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: tintColor,
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
          tabBarBadge: (!isPremium && !adFreeTrial) ? '🔓' : undefined,
          tabBarBadge: (!isPremium && !adFreeTrial) ? 'PRO' : undefined,
          tabBarBadge: (!isPremium && !adFreeTrial) ? 'PRO' : undefined,
          tabBarBadge: (!isPremium && !adFreeTrial) ? 'PRO' : undefined,
          tabBarBadge: (!isPremium && !adFreeTrial) ? '🔓' : undefined,
          tabBarBadge: (!isPremium && !adFreeTrial) ? 'PRO' : undefined,
          tabBarBadge: (!isPremium && !adFreeTrial) ? 'PRO' : undefined,
          tabBarBadge: (!isPremium && !adFreeTrial) ? 'PRO' : undefined,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Calculator',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calculator-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="matrix"
          options={{
            title: 'Matrix',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="vector"
          options={{
            title: 'Vector',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="navigate-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: 'Statistics',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
  );
}

}
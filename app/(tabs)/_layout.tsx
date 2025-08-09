import { Tabs } from 'expo-router';
import { Calculator, ChartBar as BarChart3, Grid3x3, Navigation, Settings } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const tabBarOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderTopColor: isDark ? '#333333' : '#E0E0E0',
      height: 60,
      paddingBottom: 8,
      paddingTop: 8,
    },
    tabBarActiveTintColor: '#3B82F6',
    tabBarInactiveTintColor: isDark ? '#888888' : '#666666',
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
    },
  };

  return (
    <Tabs screenOptions={tabBarOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ size, color }) => (
            <Calculator size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="matrix"
        options={{
          title: 'Matrix',
          tabBarIcon: ({ size, color }) => (
            <Grid3x3 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vector"
        options={{
          title: 'Vector',
          tabBarIcon: ({ size, color }) => (
            <Navigation size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

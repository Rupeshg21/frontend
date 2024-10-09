import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'; // Ensure this component is correctly implemented
import Settings from './Settings'; // Ensure proper casing and implementation
import Media from './Media'; // Ensure this component is correctly implemented
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function Tablayout() {
  const { theme } = useTheme();

  // Define tab bar style based on the theme
  const tabBarStyle = {
    backgroundColor: theme === 'dark' ? '#000' : '#fff',
    borderTopColor: theme === 'dark' ? '#444' : '#ccc',
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle, // Apply dynamic styles to the tab bar
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Media'
        component={Media}
        options={{
          title: "Media",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list-alt" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

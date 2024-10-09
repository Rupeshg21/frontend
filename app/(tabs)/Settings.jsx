import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Switch } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext'; // Import your useTheme hook

export default function Settings() {
  const { theme, toggleTheme } = useTheme(); // Get theme and toggleTheme from context

  // Function to handle sending an email
  const sendEmail = () => {
    const email = 'rupesh10148@gmail.com'; // Updated support email
    const subject = 'App Support';
    const body = 'Hello, I need help with...';
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`).catch(err => console.error('Email error', err));
  };

  // Determine icon color based on theme
  const iconColor = theme === 'dark' ? '#fff' : '#000'; 

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.headerText, theme === 'dark' && styles.darkHeaderText]}>Settings</Text>

      {/* App Support Email */}
      <TouchableOpacity style={styles.settingsItem} onPress={sendEmail}>
        <Ionicons name="mail" size={24} color={iconColor} />
        <Text style={[styles.settingsText, theme === 'dark' && styles.darkSettingsText]}>Contact Support</Text>
      </TouchableOpacity>

      {/* Dark Mode Toggle */}
      <View style={styles.settingsItem}>
        <Ionicons name="moon" size={24} color={iconColor} />
        <Text style={[styles.settingsText, theme === 'dark' && styles.darkSettingsText]}>Dark Mode</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme} // Call toggleTheme when the switch is changed
          thumbColor={theme === 'dark' ? "#fff" : "#000"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
    margin: 0,
     // Default light background
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  darkHeaderText: {
    color: '#fff',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingsText: {
    fontSize: 18,
    color: '#000',
  },
  darkSettingsText: {
    color: '#fff',
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTheme } from '../context/ThemeContext'; // Import your useTheme hook

export default function Media() {
  const { theme } = useTheme(); // Get the current theme from context

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.headerText, theme === 'dark' && styles.darkHeaderText]}>
        Follow Us on Social Media
      </Text>

      {/* WhatsApp Button */}
      <TouchableOpacity
        style={[styles.button, theme === 'dark' && styles.darkButton]}
        onPress={() => openLink('https://www.whatsapp.com/channel/0029Va9CVDr9Gv7Z5qTJzc1p')}
      >
        <Ionicons name="logo-whatsapp" size={40} color="#25D366" />
        <Text style={[styles.buttonText, theme === 'dark' && styles.darkButtonText]}>WhatsApp</Text>
      </TouchableOpacity>

      {/* Facebook Button */}
      <TouchableOpacity
        style={[styles.button, theme === 'dark' && styles.darkButton]}
        onPress={() => openLink('https://www.facebook.com/groups/2834992916624490/?ref=share')}
      >
        <Ionicons name="logo-facebook" size={40} color="#3b5998" />
        <Text style={[styles.buttonText, theme === 'dark' && styles.darkButtonText]}>Facebook</Text>
      </TouchableOpacity>

      {/* Instagram Button */}
      <TouchableOpacity
        style={[styles.button, theme === 'dark' && styles.darkButton]}
        onPress={() => openLink('https://www.instagram.com/ttd_updates')}
      >
        <Ionicons name="logo-instagram" size={40} color="#C13584" />
        <Text style={[styles.buttonText, theme === 'dark' && styles.darkButtonText]}>Instagram</Text>
      </TouchableOpacity>

      {/* X (Twitter) Button */}
      <TouchableOpacity
        style={[styles.button, theme === 'dark' && styles.darkButton]}
        onPress={() => openLink('https://twitter.com/ttd_updates?s=09')}
      >
        <FontAwesome6 name="x-twitter" size={40} color="Black" />
        <Text style={[styles.buttonText, theme === 'dark' && styles.darkButtonText]}>X (Twitter)</Text>
      </TouchableOpacity>

      {/* Telegram Button */}
      <TouchableOpacity
        style={[styles.button, theme === 'dark' && styles.darkButton]}
        onPress={() => openLink('https://t.me/ttd_updates')}
      >
        <Ionicons name="paper-plane" size={40} color="#0088cc" />
        <Text style={[styles.buttonText, theme === 'dark' && styles.darkButtonText]}>Telegram</Text>
      </TouchableOpacity>

      {/* YouTube Button */}
      <TouchableOpacity
        style={[styles.button, theme === 'dark' && styles.darkButton]}
        onPress={() => openLink('https://youtube.com/c/TTDUPDATES')}
      >
        <Ionicons name="logo-youtube" size={40} color="#FF0000" />
        <Text style={[styles.buttonText, theme === 'dark' && styles.darkButtonText]}>YouTube</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000', // Dark background color
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  darkHeaderText: {
    color: '#fff', // Dark header text color
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    width: '80%',
    justifyContent: 'center',
  },
  darkButton: {
    backgroundColor: '#444', // Dark button background
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
    color: '#333', // Default text color
  },
  darkButtonText: {
    color: '#fff', // Dark button text color
  },
});

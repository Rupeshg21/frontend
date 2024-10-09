import React, { useEffect, useState, useRef } from "react";
import { Text, View, Image, Animated, BackHandler } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Animation value for text opacity
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in the text over 0.5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // 0.5 seconds
      useNativeDriver: true, // Enable native driver for better performance
    }).start();

    // Set a timeout to navigate to the Home screen after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide the logo
      router.replace("/Home"); // Directly navigate to the Home screen without going back
    }, 2000);

    // Handle the back button press for tab screens
    const backAction = () => {
      if (router.pathname === "/Home") {
        BackHandler.exitApp(); // Exit the app directly when on the Home screen
        return true; // Prevent default back action
      }
      return false; // Allow default action in other cases
    };

    // Add back button listener
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Cleanup the timeout and back button listener on unmount
    return () => {
      clearTimeout(timer);
      backHandler.remove();
    };
  }, [router, fadeAnim]);

  // Render splash screen if isLoading is true
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "dark", // Customize your background color here
        }}
      >
        {/* App Logo */}
        <Image
          source={require("../assets/images/logo.png")} // Replace with your logo path
          style={{ width: 150, height: 150, borderRadius: 140 }}
        />
        {/* Animated Text */}
        <Animated.Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            opacity: fadeAnim, // Bind opacity to animated value
            marginTop: 20,
          }}
        >
          TTD Updates
        </Animated.Text>
      </View>
    );
  }

  // Don't render anything after the splash screen; navigate directly to the Home screen
  return null;
}

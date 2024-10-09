// app/RootLayout.js
import { Stack } from "expo-router";
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} // Hides the header for the index screen
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} // Hides the header for the index screen
        />
      </Stack>
    </ThemeProvider>
  );
}

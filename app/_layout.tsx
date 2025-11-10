import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "./global.css";

import { useColorScheme } from '@/hooks/use-color-scheme';
import { FavoritesProvider } from '@/contexts/favorites-context';

export const unstable_settings = {
  // anchor: '(tabs)',
  initialRouteName: 'onboarding',
};

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
    <FavoritesProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="recipes" options={{ headerShown: false }} />
          <Stack.Screen name="recipe-detail" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </FavoritesProvider>
    </SafeAreaProvider>
  );
}
export default RootLayout;
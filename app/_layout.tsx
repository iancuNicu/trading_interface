import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from "react-redux";
import store from '../store'
import { Stack, Slot } from 'expo-router';

import { createTamagui,TamaguiProvider } from 'tamagui'
import { useColorScheme } from 'react-native';
import { defaultConfig } from '@tamagui/config/v4'


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const config = createTamagui(defaultConfig)

export default function RootLayout() {
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Slot />;
  }

  return (
      <Provider store={store}>
        <StatusBar style="auto" />
          <App />
      </Provider>
  );
}

function App() {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} redirect />
            <Stack.Screen name='(app)' options={{headerShown: false}} />
            <Stack.Screen name="(auth)" options={{headerShown: false}} />
          </Stack>
        </ThemeProvider>
    </TamaguiProvider>  
  )
}
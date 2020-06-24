import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

// CUSTOM IMPORTS
import Routes from './src/routes';

export default function App() {
  // useFonts will dowload all fonts
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  })

  // Display a loading until fonts are loaded
  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar 
      barStyle="dark-content"
      backgroundColor="transparent"
      translucent
      />
      <Routes />
    </>
  );
}


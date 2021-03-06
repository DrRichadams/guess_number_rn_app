import React, { useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as Font from "expo-font"
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf")
  })
}

export default function App() {
  const [ userNumber, setUserNumber ] = useState()
  const [ guessRounds, setGuessRounds ] = useState(0)
  const [ dataLoaded, setDataLoaded ] = useState(false)

  if(!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={console.warn} /> 
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }
  const startGameHandler = (selectedNumber) => {
      setUserNumber(selectedNumber)
  }
  const gameOveHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />
  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOveHandler} />
  } else if(userNumber && guessRounds > 0){
    content = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onRestart={configureNewGameHandler} />
  }
  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />
      <Header title="Guess a number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

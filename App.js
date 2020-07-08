import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import Header from './components/Header';
import Home from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import GameOver from './components/GameOver';

const fetchFonts = () =>{
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return <AppLoading 
    startAsync={fetchFonts} 
    onFinish={() => setDataLoaded(true)}
    onError={(err) => console.log(err)} />
  }

  const  startGameHandler = (number) =>{
      setUserNumber(number);
      setGuessRounds(0);
  }

  const gameOverHandler = (rounds) =>{
    setGuessRounds(rounds);
  }
  const configureNewGame = () =>{
      setGuessRounds(0);
      setUserNumber(null);
  }
  let content = <Home title="Start a new game!" startGame={startGameHandler} /> ;

  if(userNumber && guessRounds <= 0){
    content = <GameScreen userChoise={userNumber} gameOver={gameOverHandler} />
  }else if(guessRounds >0){
    content = <GameOver rounds={guessRounds} userChoise={userNumber} newGame={configureNewGame}/>
  }

  return (
    <SafeAreaView  style={styles.screen}>
        <Header title="Guess a number !" />
          {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1
  }
});

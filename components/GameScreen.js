import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert,ScrollView, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

import NumberContainer from './NumberContainer';
import Card from './Card';
import MainButton from './MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const number = Math.floor(Math.random()* (max-min)) + min;

    if(number === exclude){
        generateRandomBetween(min,max, exclude);
    }
    else{
        return number;
    }
}

const GameScreen = (props) => {
    const {userChoise, gameOver} = props;
    const number = generateRandomBetween(1, 100, props.userChoise);
    const [currentGuess, setCurrentGuess] = useState(number);
    const [rounds, setRounds] = useState([number]);

    const currentLow = useRef(1);
    const currentHight = useRef(100);

    const nextGuesshandle = (direction) =>{
        if(direction ==='lower' && currentGuess < props.userChoise || 
        (direction ==='greater' && currentGuess > props.userChoise)){
            Alert.alert('Dont lie', 'You know that is wrong', [{
                text: 'sorry',
                style: 'cancel'
            }])
            return;
        }
        if(direction === 'lower'){
            currentHight.current = currentGuess;
        }
        if(direction === 'greater'){
            currentLow.current = currentGuess + 1 ;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(currentRounds => currentRounds + 1);
        setRounds(current => [nextNumber, ...current]);
    }
     
    useEffect(() =>{
        if(currentGuess === props.userChoise){
            props.gameOver(rounds.length);
        }
    }, [currentGuess, userChoise, gameOver]);
    
    return (
        <ScrollView style={styles.screen} contentContainerStyle={{alignItems:"center"}}>
            <Text>Oppenents guess : </Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card styles={styles.buttonContainer}>
            <MainButton click={nextGuesshandle.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white"/></MainButton>
            <MainButton click={nextGuesshandle.bind(this, 'greater')}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </Card>
            <ScrollView>
                {rounds.map((guess, index) => 
                    <View key={guess} style={styles.list}>
                    <Text>Guess number : {rounds.length - index}  </Text>
                    <Text>{guess}</Text>
                    </View>)}
            </ScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20: 10,
        width: 300,
        maxWidth: '90%'
    },
    list: {
        borderColor: 'black',
        borderWidth: 2,
        padding : 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
export default GameScreen;
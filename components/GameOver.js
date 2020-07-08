import React from 'react'
import {View, Text, StyleSheet, Button, Image, Dimensions} from 'react-native'
import MainButton from './MainButton'

const GameOver = (props) =>{
    return (
        <View style={styles.gameOver}>
            <Text>Game over </Text>
            <Image 
            style={styles.image} 
            //source={require('../assets/success.png')} 
            source={{uri:'https://www.yourdictionary.com/images/definitions/lg/12337.summit.jpg'}}
            resizeMode="contain" />
            <Text>Number of rounds : {props.rounds}</Text>
            <Text>User Number was : {props.userChoise}</Text>
            <MainButton click={props.newGame}>New Game!</MainButton>
        </View>
        );
}

const styles = StyleSheet.create({
    gameOver:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    image: {
        width: '80%',
        height:300,
        borderRadius: 20
    }
});

export default GameOver;
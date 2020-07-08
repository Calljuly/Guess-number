import React, {useState, useEffect} from 'react'
import {ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, KeyboardAvoidingView} from 'react-native'

import Card from './Card'
import Input from './Input'
import NumberContainer from './NumberContainer'
import MainButton  from './MainButton'

const HomeScreen = (props) => {
    const [enteredValue, setValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setNumber] = useState();
    const [buttonStyle, setButtonStyle] = useState(Dimensions.get('window').width / 5);

    
    const handler = (input) => {
        setValue(input.replace(/[^0-9]/g,''));
   }
   const resetInputHandler = () =>{
       setValue('');
       setConfirmed(false);
   }
   const confirmInputHandler = () =>{
       const number = parseInt(enteredValue);
       if(number === NaN || number <= 0 ||number > 99||number === ''){
           Alert.alert('Invalid number!',
            'Number has to be a number between 1 and 99',
             [{text:'Okay', style:'destructive', onPress:resetInputHandler}]);
        return;
       }
        setConfirmed(true);
        setNumber(number);
        setValue('');
        Keyboard.dismiss();
   }

   let confirmedInput;
   if(confirmed){
        confirmedInput = <Card styles={styles.summary}>
        <Text>You selected :</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton click={() => props.startGame(selectedNumber)}><Text>StartGame !</Text></MainButton>
        
        </Card>;
   }

   useEffect(() =>{
    const buttonStyleHandler = () =>{
        setButtonStyle(Dimensions.get('window').width / 5);
    }
    Dimensions.addEventListener('change', buttonStyleHandler);
    
       return ()=>{
        Dimensions.removeEventListener('change', buttonStyleHandler);
       }
   });

    return (
        
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();
        }}>
        
        <ScrollView style={styles.screen} contentContainerStyle={{alignItems:'center'}}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
            <Text style={styles.title}>{props.title}</Text>
            <Card styles={styles.inputContainer}>
                <Text style={{textAlign:'center'}}>Select a number : </Text>
                <Input styles={styles.input} 
                autoCorrect={false} 
                keyboardType='number-pad' 
                maxLength={2}
                change={handler}
                value={enteredValue} />
                <View style={styles.buttonContainer}>
                   <View style={{width: buttonStyle}}>
                        <Button title="Reset" 
                        color='#c717fc' 
                        onPress={resetInputHandler}/></View>
                   <View style={{width: buttonStyle}}>
                        <Button title="Confirm" 
                        color='#F7287b' 
                        onPress={confirmInputHandler} /></View>
                </View>
                {confirmedInput}
            </Card>
            </KeyboardAvoidingView>
        </ScrollView>
        
        </TouchableWithoutFeedback>
       
    );
}
const styles = StyleSheet.create({
    screen:{ 
        flex:1,
        padding:10
    },
    input:{
        textAlign:'center',
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        paddingHorizontal:15
    },
    title:{
        fontSize: 20,
        marginVertical: 10,
        fontFamily :'open-sans-bold',
        textAlign: 'center'
    },
    inputContainer:{
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignContent: 'center',
    },
    summary :{
        marginTop: 20,
        alignItems: 'center'
    }
});

export default HomeScreen;


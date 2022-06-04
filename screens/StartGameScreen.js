import React, { useState, useEffect } from "react"
import { View, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert, 
    Dimensions, 
    ScrollView,
    KeyboardAvoidingView
 } from "react-native"

import Card from "../components/Card"
import Input from "../components/Input"
import NumberContainer from "../components/NumberContainer"
import Colors from "../constants/colors"
import BodyText from "../components/BodyText"
import TitleText from "../components/TitleText"
import MainButton from "../components/MainButton"

const StartGameScreen = props => {
    const [ enteredValue, setEnteredValue ] = useState('')
     const [ confirmed, setConfirmed ]=  useState(false)
     const [ selectedNumber, setSelectedNumber ] = useState()
     const [ buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width / 3.5)

     useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 3.5)
        }
   
        Dimensions.addEventListener("change", updateLayout)

        return () => {
            Dimensions.removeEventListener("change", updateLayout)
        }
     })

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }
    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }
    const confirmInputHandler = () => {
        const chooseNumber = parseInt(enteredValue)
        if(isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
            Alert.alert("Invalid number!", "Number has to be between 1 and 99", [{text: "Okay", style:"destructive", onPress: resetInputHandler}])
            return
        }
        Keyboard.dismiss()
        setConfirmed(true)
        setSelectedNumber(chooseNumber)
        setEnteredValue('')
    }

    let confirmedOutput

    if(confirmed) confirmedOutput = 
    <Card style={styles.summeryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
    </Card>
    return(
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a new game</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a number</BodyText>
                            <Input 
                                style={styles.input} 
                                blurOnSubmit 
                                autoCapitalize="none" 
                                autoCorrect={false} 
                                keyboardType="number-pad" 
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue} />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}><Button title="Reset" onPress={() => {resetInputHandler()}} color={Colors.accent} /></View>
                                <View style={{width: buttonWidth}}><Button title="Confirm" onPress={() => {confirmInputHandler()}} color={Colors.primary} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "open-sans-bold"
    },
    inputContainer: {
        width: "85%",
        minWidth: 300,
        maxWidth: "95%",
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    // button: {
    //     // width: "45%",
    //     width: Dimensions.get('window').width / 3.5
    // },
    input: {
        width: 50,
        textAlign: "center"
    },
    summeryContainer: {
        marginTop: 20,
        alignItems: "center"
    }
})

export default StartGameScreen
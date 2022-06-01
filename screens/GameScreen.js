import React, { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from "react-native"

import { Ionicons } from "@expo/vector-icons"

import Card from "../components/Card"

import NumberContainer from "../components/NumberContainer"
import BodyText from "../components/BodyText"
import DefaultStyles from "../constants/default-styles"
import MainButton from "../components/MainButton"

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText># {listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [ currentGuess, setCurrentGuess ] = useState(initialGuess)
    const [ pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess ,userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if((direction === "lower" && currentGuess < props.userChoice) || (direction === "greater" && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie!", "You know this is wrong...", [{text: "Sorry", style:"cancel"}])
            return
        }
        if(direction === "lower") {
            currentHigh.current = currentGuess + 1
        } else {
            currentLow.current = currentGuess
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        // setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...pastGuesses])
    }
    return(
        <View style={styles.screen}> 
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24}/></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24}/></MainButton>
            </Card>
            <View style={styles.list}>
                {/* <ScrollView>
                    { pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index)) }
                </ScrollView> */}
                <FlatList 
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: 400,
        maxWidth: "90%"
    },list: {
        flex: 1,
        width: "80%",
    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default GameScreen
import React from "react"
import { View, Text, StyleSheet, Button, Image } from "react-native"
import BodyText from "../components/BodyText"
import TitleText from "../components/TitleText"
import MainButton from "../components/MainButton"

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>Game is over</TitleText>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/success.png")} style={styles.image} resizeMode="cover" fadeDuration={1000} />
            </View>
            <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: 30
    },
    image: {
        width: "100%",
        height: "100%",
        // borderRadius: 6,
    }
})

export default GameOverScreen
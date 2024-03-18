import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

// 기름류
const OilItemComponent = ({ food, onButtonClicked }) => {
    const ClickButtonHandler = () => {
        // console.log("클릭시 이벤트 발생");
        // const names = `${food.DESC_KOR} ${food.NUTR_CONT1}Kcal`;
        if (onButtonClicked) {
            onButtonClicked(food);
        }
        // console.log(food);
        // console.log(names);
    };

    // 기름류 버튼
    return (
        <TouchableOpacity onPress={ClickButtonHandler} style={sytles.TouchableBorder}>
            <Text>{food.DESC_KOR}</Text>
            <Text>{food.NUTR_CONT1}Kcal</Text>
        </TouchableOpacity>
    );
}

export default OilItemComponent;

const sytles = StyleSheet.create({
    TouchableBorder: {
        borderWidth: 1,
        marginBottom: 5,
        marginTop: 5,
        width:100
    }
})

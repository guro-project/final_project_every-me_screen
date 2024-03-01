import { Text, TouchableOpacity } from "react-native";
import { useState } from "react";

const FoodItemComponent = ({ food, onButtonClicked }) => {
    const ClickButtonHandler = () => {
        console.log("클릭시 이벤트 발생");
        const names = `이름: ${food.DESC_KOR}, 칼로리: ${food.NUTR_CONT1}`;
        if (onButtonClicked) {
            onButtonClicked(names);
        }
        console.log(names);
    };

    return (
        <TouchableOpacity onPress={ClickButtonHandler}>
            <Text>이름 : {food.DESC_KOR}</Text>
            <Text>칼로리 : {food.NUTR_CONT1}</Text>
        </TouchableOpacity>
    );
}

export default FoodItemComponent;

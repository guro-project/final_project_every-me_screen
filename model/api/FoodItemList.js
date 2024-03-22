import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

// 추천재료
const FoodItemComponent = ({ food, onButtonClicked }) => {
    const ClickButtonHandler = () => {
        // console.log("클릭시 이벤트 발생");
        // const names = `${food.DESC_KOR} ${food.NUTR_CONT1}Kcal`;
        if (onButtonClicked) {
            onButtonClicked(food);
        }
        // console.log(food);
        // console.log(names);
    };

    // 추천재료 버튼
    return (
        <View style={styles.recommList}>
            <TouchableOpacity onPress={ClickButtonHandler} style={styles.TouchableBorder}>
                <Text style={{color: 'white', padding: 3}}>{food.DESC_KOR}</Text>
                <Text style={{color: 'white', padding: 3}}>{food.NUTR_CONT1}Kcal</Text>
            </TouchableOpacity>
        </View>
        
    );
}

export default FoodItemComponent;

const styles = StyleSheet.create({
    recommList: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },  
    TouchableBorder: {
        color: 'white',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        width:100,
        alignItems: 'center'
    }
})

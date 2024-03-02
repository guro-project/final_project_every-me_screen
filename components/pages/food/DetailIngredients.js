import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";

const DetailIngredients = () => {
    const route = useRoute();
    const { selectedIngredients } = route.params;

    // 선택한 재료들의 수량을 관리하는 상태
    const [ingredientQuantities, setIngredientQuantities] = useState(
        selectedIngredients.map(ingredient => ({ name: ingredient, quantity: 1 }))
    );

    // 수량을 조절하는 함수
    const plus = (index, factor) => {
        setIngredientQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            newQuantities[index].quantity += factor;
            return newQuantities;
        });
    };
    
    const minus = (index, factor) => {
        setIngredientQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            newQuantities[index].quantity -= factor;
            return newQuantities;
        });
    };

    // 총 영양성분을 계산하는 함수
    const calculateTotalNutrients = () => {
        // 선택한 재료들의 총 영양성분 계산 로직 추가
    };

    return (
        <View>
            <Text>선택한 재료들:</Text>
            {ingredientQuantities.map((ingredient, index) => (
                <View key={index}>
                    <Text>{ingredient.name} (수량: {ingredient.quantity})</Text>
                    <TouchableOpacity onPress={() => plus(index, 0.5)}>
                        <Text>+0.5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => minus(index, 0.5)}>
                        <Text>-0.5</Text>
                    </TouchableOpacity>
                    {/* 수량 조절 버튼 */}
                </View>
            ))}
            <Text>총 영양성분:</Text>
            {calculateTotalNutrients()}
            {/* 총 영양성분 표시 */}
        </View>
    );
}

export default DetailIngredients;

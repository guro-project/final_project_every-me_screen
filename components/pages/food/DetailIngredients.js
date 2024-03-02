import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";


const DetailIngredients = () => {
    const route = useRoute();
    const { selectedIngredients } = route.params;

    // DetailIngredients 페이지에서 선택한 재료들을 사용하여 로직 수행

    return (
        <View>
            <Text>선택한 재료들:</Text>
            {selectedIngredients.map((ingredient, index) => (
                <Text key={index}>{ingredient}</Text>
            ))}
            {/* 나머지 UI 및 기능 */}
        </View>
    );
}

export default DetailIngredients;
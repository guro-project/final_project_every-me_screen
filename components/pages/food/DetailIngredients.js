import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";

const DetailIngredients = ({navigation}) => {
    const route = useRoute();
    const { selectedIngredients } = route.params;
    const names = selectedIngredients.map(item => {
        const parts = item.split(","); // 여기서 공백을 제거하여 분리
        const namePart = parts[1].trim(); // "칼로리" 부분 추출 후 양쪽 공백 제거
        return namePart.split(": ")[1].trim(); // "칼로리"의 값만 반환 후 양쪽 공백 제거
    });
    const initialNumbers = names.map(ingredient => parseFloat(ingredient));
    const [numbers, setNumbers] = useState(initialNumbers);
    const [finalKacl,setFinalKal] = useState('');
    const [dietName,setDietName] = useState('');

    console.log("가져온건 무슨 값?")
    console.log(selectedIngredients);
    console.log("분리한 값?")
    console.log(names)
    console.log("상수형")
    console.log(numbers)

    // 숫자를 곱하는 함수
    const multiply = (index, factor) => {
        const newNumbers = [...numbers];
        newNumbers[index] *= factor;
        setNumbers(newNumbers);
    };

    // 숫자를 나누는 함수
    const divide = (index, divisor) => {
        const newNumbers = [...numbers];
        newNumbers[index] /= divisor;
        setNumbers(newNumbers);
    };

    // 총합 칼로리 계산
    const totalCalories = numbers.reduce((acc, curr) => acc + curr, 0);

    const page = () => {
        navigation.navigate("FoodFirst", { dietName: dietName, finalKacl : totalCalories.toFixed(2)});
        console.log("돌아갔음?")
        console.log(totalCalories.toFixed(2))
        console.log(dietName)
    }

    // 각 재료의 영양성분 값을 가져와서 출력
    return (
        <View>
            <Text>선택한 재료들의 칼로리:</Text>
            {numbers.map((ingredient, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>칼로리 : {ingredient.toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => multiply(index, 1.5)}>
                        <Text style={{ marginLeft: 10 }}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => divide(index, 1.5)}>
                        <Text style={{ marginLeft: 10 }}>-</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TextInput placeholder="식단 이름을 정해주세요" value={dietName} onChangeText={(text) => setDietName(text)}/>
            <Text>총합 칼로리 : {totalCalories.toFixed(2)}</Text>
            <TouchableOpacity onPress={page}>
                <Text>최종 등록</Text>
            </TouchableOpacity>
        </View>
    );
}

export default DetailIngredients;
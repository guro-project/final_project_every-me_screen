import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FoodFirst = ({ navigation }) => {
    const page = () => {
        navigation.navigate("IngredientsSearch");
        console.log("클릭시 반응함?")
    }
    const route = useRoute();
    const finalKacl = route.params ? route.params.finalKacl : null;
    const dietName = route.params ? route.params.dietName : null;
    const selectedMethod = route.params ? route.params.selectedMethod : null;
    // const category = route.params ? route.params.category : null;
    // 식단에 등록된 결과가 나오는 부분인데 첫 화면과 같이 있어서 들어갈시 데이터가 없으므로 없을때 조건을 걸어줌

    console.log("시작")
    console.log("카테고리 최종적으로 받았니?")
    console.log(selectedMethod)
    console.log("식단이름 최종적으로 받았나?")
    console.log(dietName)
    console.log("끼니 최종적으로 받았나?")
    console.log(selectedMethod)
    console.log("총 칼로리 최종적으로 받았나?")
    console.log(finalKacl)

    return (
        <View>
            {/* <Text>첫 화면</Text>
            {/* <TouchableOpacity onPress={page}>
                <Text>재료 등록 페이지 이동</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={morningPage}><Text>아침</Text></TouchableOpacity>
            <TouchableOpacity onPress={lunchPage}><Text>점심</Text></TouchableOpacity>
            <TouchableOpacity onPress={dinnerPage}><Text>저녁</Text></TouchableOpacity>
            <TouchableOpacity onPress={etcPage}><Text>기타</Text></TouchableOpacity>
            <Text>내 식단</Text> */}
            {/* {dietName !== null && finalKacl !== null && category !== null &&<Text>{category} 이름 : {dietName} 총 칼로리 : {finalKacl}</Text>} */}
            <Text>주간 달력 출력</Text>
            <Text>하루 총 영양성분 출력</Text>
            <TouchableOpacity onPress={page} style={sytles.touch}><Text>add</Text></TouchableOpacity>
            {dietName !== null && finalKacl !== null && selectedMethod !== null &&
                <Text>{selectedMethod} 이름 : {dietName} 총 칼로리 : {finalKacl}</Text>
            }
        </View>
    )
}

export default FoodFirst;

const sytles = StyleSheet.create({
    touch: {
        borderWidth: 1
    }
})

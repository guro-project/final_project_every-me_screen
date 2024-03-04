import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

const FoodFirst = ({ navigation  }) => {
    const page = () => {
        navigation.navigate("SelectMethod");
        console.log("클릭시 반응함?")
    }
    const route = useRoute();
    const finalKacl = route.params ? route.params.finalKacl : null;
    const dietName = route.params ? route.params.dietName : null;
    const category = route.params ? route.params.category : null;
    // const category = route.params ? route.params.category : null;
    // 식단에 등록된 결과가 나오는 부분인데 첫 화면과 같이 있어서 들어갈시 데이터가 없으므로 없을때 조건을 걸어줌


    // 해당하는 식사의 카테고리를 눌렀을 때 그에 해당하는 데이터를 담아 보낸다

    const morningPage = () => {
        navigation.navigate("SelectMethod", "아침");
        console.log("클릭시 반응함?")
    }
    
    const lunchPage = () => {
        navigation.navigate("SelectMethod", "점심");
        console.log("클릭시 반응함?")
    }
    
    const dinnerPage = () => {
        navigation.navigate("SelectMethod", "저녁");
        console.log("클릭시 반응함?")
    }
    
    const etcPage = () => {
        navigation.navigate("SelectMethod", "기타");
        console.log("클릭시 반응함?")
    }

    console.log("시작")
    console.log("카테고리 최종적으로 받았니?")
    console.log(category)

    return(
        <View>
            <Text>첫 화면</Text>
            {/* <TouchableOpacity onPress={page}>
                <Text>재료 등록 페이지 이동</Text>
            </TouchableOpacity> */} 
            <TouchableOpacity onPress={morningPage}><Text>아침</Text></TouchableOpacity>
            <TouchableOpacity onPress={lunchPage}><Text>점심</Text></TouchableOpacity>
            <TouchableOpacity onPress={dinnerPage}><Text>저녁</Text></TouchableOpacity>
            <TouchableOpacity onPress={etcPage}><Text>기타</Text></TouchableOpacity>
            <Text>내 식단</Text>
            {dietName !== null && finalKacl !== null && category !== null &&<Text>{category} 이름 : {dietName} 총 칼로리 : {finalKacl}</Text>}
        </View>
    )
}

export default FoodFirst;
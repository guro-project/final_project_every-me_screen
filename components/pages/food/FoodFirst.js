import { useRoute } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, View } from "react-native";

const FoodFirst = ({ navigation  }) => {
    const page = () => {
        navigation.navigate("IngredientsSearch");
        console.log("클릭시 반응함?")
    }
    const route = useRoute();
    const finalKacl = route.params ? route.params.finalKacl : null;
    const dietName = route.params ? route.params.dietName : null;

    return(
        <View>
            <Text>첫 화면</Text>
            <TouchableOpacity onPress={page}>
                <Text>재료 등록 페이지 이동</Text>
            </TouchableOpacity>
            <Text>내 식단</Text>
            {dietName !== null && finalKacl !== null && <Text>이름 : {dietName} 총 칼로리 : {finalKacl}</Text>}
        </View>
    )
}

export default FoodFirst;
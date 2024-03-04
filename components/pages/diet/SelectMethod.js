import { useRoute } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native";

// 카테고리 고르고 나서 음식인지 재료인지 고르는 페이지
const SelectMethod = ({navigation}) => {
    const route = useRoute();
    const category = route.params

    const clickFoodHandler = () => {
        navigation.navigate("FoodSearch", category)
        console.log("카테고리 데이터 받았나 확인")
        console.log(category)
    }

    const clickIngreHandler = () => {
        navigation.navigate("IngredientsSearch", category)
        console.log("카테고리 데이터 받았나 확인")
        console.log(category)
    }

    return(
        <View>
            <TouchableOpacity onPress={clickFoodHandler}>
                <Text>음식 검색 페이지</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clickIngreHandler}>
                <Text>재료 검색 페이지</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectMethod;
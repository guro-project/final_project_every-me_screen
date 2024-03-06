import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DetailFood = ({navigation}) => {

    //데이터 받아왔나 확인
    const route = useRoute()
    const clickedNames = route.params
    console.log("음식 받아왔나?")
    console.log(clickedNames);

    const page = () => {
        navigation.navigate("RegistFood", {clickedNames : clickedNames})
        console.log("데이터 전달 확인")
        console.log(clickedNames)
    }

    return(
        <View>
            <Text>수량 등록 추가할것</Text>
            <TouchableOpacity onPress={page} style={styles.touch}>
                <Text>다음</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetailFood;

const styles = StyleSheet.create({
    touch : {
        borderWidth:1
    }
})
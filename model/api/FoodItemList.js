import { Text, TouchableOpacity } from "react-native"

const FoodItemComponent = ({food}) => {
    console.log("=========")
    return(
        <TouchableOpacity to={`/menu/${food.NUM}`}>
            <Text>이름 : {food.DESC_KOR}</Text>
            <Text>칼로리 : {food.NUTR_CONT1}</Text>
        </TouchableOpacity>
    )
}

export default FoodItemComponent;
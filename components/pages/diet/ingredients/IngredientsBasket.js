import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

//재료박스 페이지
const IngredientsBasket = ({ clickedNames, setClickedNames, recommendedNames, setRecommendedNames }) => {

    // 검색으로 담은 데이터 삭제 이름으로 구별해서 삭제함
    const removeItem = (nameToRemove) => {
        setClickedNames(prevClickedNames => prevClickedNames.filter(name => name !== nameToRemove));
    }
    // 버튼으로 담은 데이터 삭제
    const removeButton = (buttonToRemove) => {
        setRecommendedNames(prevClickedNames => prevClickedNames.filter(name => name !== buttonToRemove));
    }

    // clickedNames와 recommendedNames를 합친 배열
    const allNames = [...clickedNames, ...recommendedNames];

    return (
        <View>
            <Text>재료 박스 :</Text>
            {/* 검색으로 담은건지 버튼으로 담은건지 구별하고 맞는거에 따라 삭제함수 실행함 */}
            {clickedNames.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => {
                    if (clickedNames.includes(item)) {
                        removeItem(item);
                    } else if (recommendedNames.includes(item)) {
                        removeButton(item);
                    }
                }}>
                    <Text style={styles.listMargin}>{item.DESC_KOR} {item.NUTR_CONT1}Kcal 삭제</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default IngredientsBasket;

const styles = StyleSheet.create({
    listMargin : {
        marginTop:2,
        marginBottom:2
    }
})
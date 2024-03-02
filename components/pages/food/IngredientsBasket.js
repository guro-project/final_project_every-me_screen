import React, { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

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
            {/* 재료박스에 들어간 목록들 중에서 리스트로 들어온건지 버튼으로 들어온건지 구분해서 삭제버튼을 눌렀을 시 해당하는 데이터를 삭제함 */}
            <FlatList
                data={allNames}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item}</Text>
                        <TouchableOpacity onPress={() => {
                            if (clickedNames.includes(item)) {
                                removeItem(item);
                            } else if (recommendedNames.includes(item)) {
                                removeButton(item);
                            }
                        }}>
                            <Text>삭제</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default IngredientsBasket;
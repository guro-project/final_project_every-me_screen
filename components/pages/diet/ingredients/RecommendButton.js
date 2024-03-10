import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getRecommendMenuList } from '../../../../model/api/RecommendApi';
import FoodItemComponent from '../../../../model/api/FoodItemList';
// 추천 재료 페이지 FoodItemList.js는 추천재료 버튼 만드는곳
const RecommendFood = ({onButtonClicked}) => {
    
    const [foodList, setFoodList] = useState([]);
    
    useEffect(() => {
        const data = getRecommendMenuList();
        setFoodList(data);
    }, []);

    return (
        <View>
        {foodList && foodList.length > 0 && foodList.map(food => (
            <FoodItemComponent 
                key={food.NUM} // food 객체의 NUM 속성 사용
                food={food} 
                onButtonClicked={onButtonClicked}
            />
        ))}
    </View>
    )
}

export default RecommendFood;

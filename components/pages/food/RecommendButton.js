import React, { useEffect, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { getRecommendMenuList } from '../../../model/api/RecommendApi';
import FoodItemComponent from '../../../model/api/FoodItemList';


//추천메뉴 버튼 페이지
// const RecommendButton = ({ onButtonClicked }) => {
//     const ClickButtonHandler = () => {
//         const recommendMenuList = getRecommendMenuList();
//         const items = recommendMenuList[0]?.I2790?.row || []; // 데이터가 배열 형태인지 확인 후 추출
//         const names = items.map(item => `이름: ${item.DESC_KOR}, 칼로리: ${item.NUTR_CONT1}`);
//         onButtonClicked(names); // 추출된 데이터를 상위 컴포넌트로 전달
//         console.log(names);
//     };

//     return (
//         <TouchableOpacity onPress={ClickButtonHandler}><Text>닭가슴살</Text></TouchableOpacity>
//     );
// };

const RecommendFood = ({onButtonClicked}) => {
    // const [foodList, setFoodList] = useState([]);
    
    // console.log("qwe")
    // useEffect(
    //     () => {
    //         setFoodList(getRecommendMenuList());
    //         console.log("데이터 뭐 받음 ? : " + getRecommendMenuList())
    //     },[]
    // )

    // return(
    //     <>
    //         <View>
    //             {foodList.map( food => <FoodItemComponent key={food.NUM} food={food} />)}
    //         </View>
    //     </>
    // )
    const [foodList, setFoodList] = useState([]);
    
    useEffect(() => {
        const data = getRecommendMenuList();
        setFoodList(data);
    }, []);

    return (
        <View>
            {foodList.map(food => (
                <FoodItemComponent 
                    key={food.NUM} 
                    food={food} 
                    onButtonClicked={onButtonClicked} 
                />
            ))}
        </View>
    );
}

export default RecommendFood;
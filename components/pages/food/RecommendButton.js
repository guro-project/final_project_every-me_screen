import React, { useState } from 'react';
import { Button } from 'react-native';
import { getRecommendMenuList } from '../../../model/api/recommandApi';


//추천메뉴 버튼 페이지
const RecommendButton = ({ onButtonClicked }) => {
    const ClickButtonHandler = () => {
        const recommendMenuList = getRecommendMenuList();
        const items = recommendMenuList[0]?.I2790?.row || []; // 데이터가 배열 형태인지 확인 후 추출
        const names = items.map(item => `이름: ${item.DESC_KOR}, 칼로리: ${item.NUTR_CONT1}`);
        onButtonClicked(names); // 추출된 데이터를 상위 컴포넌트로 전달
        console.log(names);
    };

    return (
        <Button title="닭가슴살" onPress={ClickButtonHandler}/>
    );
};

export default RecommendButton;
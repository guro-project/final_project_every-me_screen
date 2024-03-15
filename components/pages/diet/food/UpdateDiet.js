import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
// 식단 수정페이지
const UpdateDiet = ({ dietNo }) => {
    const [dietName, setDietName] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalCarbohydrate, setTotalCarbohydrate] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalProvince, setTotalProvince] = useState(0);
    const [totalSalt, setTotalSalt] = useState(0);

    // 수정
    const handleUpdate = () => {
        let updateDietData = {
            'dietName': dietName,
            'dietCategory': selectedMethod, //dietCategory랑 selectedMethod 둘다 끼니
            'totalKcal': totalCalories,
            'totalCarbohydrate': totalCarbohydrate,
            'totalProtein': totalProtein,
            'totalProvince': totalProvince,
            'totalSalt': totalSalt
        };

        axios({
            method: 'PUT',
            url: `http://192.168.0.160:8080/updatediet/${dietNo}`,
            data: updateDietData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJkYXRlIjoxNzEwNDAzMzE4NzUwLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiVVNFUiIsInN1YiI6IkV2ZXJ5TWUgdG9rZW4gOiAxIiwiZXhwIjoxNzEwNDg5NzE4LCJ1c2VySWQiOiJ4eHhAeHh4LmNvbSJ9.89hQ9hdQLo3TMnCwDgE1AywVRopVRhCZZBmInnPGUMg`
            }
        })
            .then(response => {
                console.log("수정완료");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <View>
                <TextInput
                    placeholder="끼니"
                    onChangeText={text => setSelectedMethod(text)} // 끼니 입력값이 변경될 때마다 상태 업데이트
                    value={selectedMethod} // 입력값을 상태와 동기화
                />
                <TextInput
                    placeholder="이름"
                    onChangeText={text => setDietName(text)} // 이름 입력값이 변경될 때마다 상태 업데이트
                    value={dietName} // 입력값을 상태와 동기화
                />
                <TextInput
                    placeholder="칼로리"
                    onChangeText={text => setTotalCalories(text)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                    value={totalCalories} // 입력값을 상태와 동기화
                />
                <TextInput
                    placeholder="탄수화물"
                    onChangeText={text => setTotalCarbohydrate(text)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                    value={totalCarbohydrate} // 입력값을 상태와 동기화
                />
                <TextInput
                    placeholder="단백질"
                    onChangeText={text => setTotalProtein(text)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                    value={totalProtein} // 입력값을 상태와 동기화
                />
                <TextInput
                    placeholder="지방"
                    onChangeText={text => setTotalProvince(text)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                    value={totalProvince} // 입력값을 상태와 동기화
                />
                <TextInput
                    placeholder="나트륨"
                    onChangeText={text => setTotalSalt(text)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                    value={totalSalt} // 입력값을 상태와 동기화
                />

                <TouchableOpacity onPress={handleUpdate}><Text>등록</Text></TouchableOpacity>
            </View>
        </>
    )
}

export default UpdateDiet;

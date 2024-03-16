import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// 식단 수정페이지
const UpdateDiet = ({ dietNo }) => {
    const [dietName, setDietName] = useState('');
    const [currentDietName, setCurrentDietName] = useState('');
    const [dietCategory, setDietCategory] = useState('');
    const [currentDietCategory, setCurrentDietCategory] = useState('');
    const [totalCalories, setTotalCalories] = useState('');
    const [currentTotalCalories, setCurrentTotalCalories] = useState('');
    const [totalCarbohydrate, setTotalCarbohydrate] = useState('');
    const [currentTotalCarbohydrate, setCurrentTotalCarbohydrate] = useState('');
    const [totalProtein, setTotalProtein] = useState('');
    const [currentTotalProtein, setCurrentTotalProtein] = useState('');
    const [totalProvince, setTotalProvince] = useState('');
    const [currentTotalProvince, setCurrentTotalProvince] = useState('');
    const [totalSalt, setTotalSalt] = useState('');
    const [currentTotalSalt, setCurrentTotalSalt] = useState('');

    useEffect(() => {
        const dietInfo = async () => {
            const dietName = await AsyncStorage.getItem('dietName');
            const dietCategory = await AsyncStorage.getItem('dietCategory');
            const totalCalories = await AsyncStorage.setItem('totalCalories', totalCalories.toString());
            const totalCarbohydrate = await AsyncStorage.getItem('totalCarbohydrate', totalCarbohydrate.toString());
            const totalProtein = await AsyncStorage.getItem('totalProtein', totalProtein.toString());
            const totalProvince = await AsyncStorage.getItem('totalProvince',totalProvince.toString());
            const totalSalt = await AsyncStorage.getItem('totalSalt', totalSalt.toString());
            setCurrentDietName(dietName);
            setCurrentDietCategory(dietCategory);
            setCurrentTotalCalories(totalCalories);
            setCurrentTotalCarbohydrate(totalCarbohydrate);
            setCurrentTotalProtein(totalProtein);
            setCurrentTotalProvince(totalProvince);
            setCurrentTotalSalt(totalSalt);
        }
        dietInfo();
    }, [currentDietName, currentDietCategory, currentTotalCalories, currentTotalCarbohydrate, currentTotalProtein, currentTotalProvince, currentTotalSalt])

    // 수정
    const handleUpdate = async () => {
        let updateDietData = {
            'dietName': dietName,
            'dietCategory': dietCategory,
            'totalKcal': totalCalories,
            'totalCarbohydrate': totalCarbohydrate,
            'totalProtein': totalProtein,
            'totalProvince': totalProvince,
            'totalSalt': totalSalt
        };
        const userToken = await AsyncStorage.getItem('userToken');
        axios({
            method: 'PUT',
            url: `http://172.30.1.26:8080/updatediet/${dietNo}`,
            data: updateDietData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(async response => {
                if (response.status === 200) {
                    if (dietName !== currentDietName && dietName !== '') {
                        await AsyncStorage.setItem('dietName', dietName);
                    }
                }
                if (response.status === 200) {
                    if (dietCategory !== currentDietCategory && dietCategory !== '') {
                        await AsyncStorage.setItem('dietCategory', dietCategory);
                    }
                }
                if (response.status === 200) {
                    if (totalCalories !== currentTotalCalories && totalCalories !== '') {
                        await AsyncStorage.setItem('totalCalories', totalCalories);
                    }
                }
                if (response.status === 200) {
                    if (totalCalories !== currentTotalCalories && totalCalories !== '') {
                        await AsyncStorage.setItem('totalCalories', totalCalories);
                    }
                }
                if (response.status === 200) {
                    if (totalCarbohydrate !== currentTotalCarbohydrate && totalCarbohydrate !== '') {
                        await AsyncStorage.setItem('totalCarbohydrate', totalCarbohydrate);
                    }
                }
                if (response.status === 200) {
                    if (totalProtein !== currentTotalProtein && totalProtein !== '') {
                        await AsyncStorage.setItem('totalProtein', totalProtein);
                    }
                }
                if (response.status === 200) {
                    if (totalProvince !== currentTotalProvince && totalProvince !== '') {
                        await AsyncStorage.setItem('totalProvince', totalProvince);
                    }
                }
                if (response.status === 200) {
                    if (totalSalt !== currentTotalSalt && totalSalt !== '') {
                        await AsyncStorage.setItem('totalSalt', totalSalt);
                    }
                }
                console.log("수정완료");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <View>
                <Text>카테고리</Text>
                <TextInput
                    placeholder={currentDietCategory}
                    value={dietCategory} // 입력값을 상태와 동기화
                    onChangeText={dietCategory => setDietCategory(dietCategory)} // 끼니 입력값이 변경될 때마다 상태 업데이트
                />
                <Text>이름</Text>
                <TextInput
                            placeholder={currentDietName}
                            placeholderTextColor='gray'
                            value={dietName}
                            onChangeText={dietName => setDietName(dietName)}
                        />
                <Text>칼로리</Text>
                <TextInput
                            placeholder={currentTotalCalories}
                            placeholderTextColor='gray'
                            value={totalCalories}
                            onChangeText={totalCalories => setTotalCalories(totalCalories)}
                        />
                <Text>탄수화물</Text>
                <TextInput
                    placeholder="탄수화물"
                    onChangeText={text => setTotalCarbohydrate(parseFloat(text))} // 실수형으로 변환하여 상태 업데이트
                    value={totalCarbohydrate.toString()} // 입력값을 문자열로 변환하여 상태와 동기화
                />
                <Text>단백질</Text>
                <TextInput
                    placeholder="단백질"
                    onChangeText={text => setTotalProtein(parseFloat(text))} // 실수형으로 변환하여 상태 업데이트
                    value={totalProtein.toString()} // 입력값을 문자열로 변환하여 상태와 동기화
                />
                <Text>지방</Text>
                <TextInput
                    placeholder="지방"
                    onChangeText={text => setTotalProvince(parseFloat(text))} // 실수형으로 변환하여 상태 업데이트
                    value={totalProvince.toString()} // 입력값을 문자열로 변환하여 상태와 동기화
                />
                <Text>나트륨</Text>
                <TextInput
                    placeholder="나트륨"
                    onChangeText={text => setTotalSalt(parseFloat(text))} // 실수형으로 변환하여 상태 업데이트
                    value={totalSalt.toString()} // 입력값을 문자열로 변환하여 상태와 동기화
                />

                <TouchableOpacity onPress={handleUpdate}><Text>등록</Text></TouchableOpacity>
            </View>
        </>
    )
}

export default UpdateDiet;

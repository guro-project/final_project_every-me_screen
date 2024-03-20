import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AXIOS_URL } from "@env";
// 식단 수정페이지
const UpdateDiet = ({ dietNo }) => {
    const [data, setData] = useState(null);
    const [dietName, setDietName] = useState('');
    const [dietCategory, setDietCategory] = useState('');
    const [totalCalories, setTotalCalories] = useState('');
    const [totalCarbohydrate, setTotalCarbohydrate] = useState('');
    const [totalProtein, setTotalProtein] = useState('');
    const [totalProvince, setTotalProvince] = useState('');
    const [totalSalt, setTotalSalt] = useState('');

    // console.log(dietNo)
    // 수정

    // 수정을 눌렀을때 placeholder에 기존데이터가 출력되고 등록을 누르면 그데이터가 그대로들어감
    // get요청으로 상세정보를 부름

    // console.log("받은거")
    // console.log(dietName)
    useEffect(() => {
        fetchDetailData();
    }, [])

    const fetchDetailData = async () => {

        const userToken = await AsyncStorage.getItem('userToken');
        // console.log(userToken)

        axios({
            method: 'GET',
            url: `${AXIOS_URL}/diet/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                setData(response.data);
                // console.log("asd");
                // console.log(response.data);
            })
            .catch(error => {
                console.error('상세조회 에러 : ' + error);
                // console.log(dietNo)
            });
    }

    const handleUpdate = async () => {
        console.log("zxcv : " + dietNo)
        const userToken = await AsyncStorage.getItem('userToken');
        let updateDietData = {
            'dietName': dietName,
            'dietCategory': dietCategory,
            'totalKcal': totalCalories,
            'totalCarbohydrate': totalCarbohydrate,
            'totalProtein': totalProtein,
            'totalProvince': totalProvince,
            'totalSalt': totalSalt
        };
        axios({
            method: 'PUT',
            url: `${AXIOS_URL}/updatediet/${dietNo}`,
            data: updateDietData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                console.log("수정완료");
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <View>
                {data && (
                    <>
                        <Text>끼니</Text>
                        <TextInput
                            placeholder={data.dietCategory}
                            onChangeText={dietCategory => setDietCategory(dietCategory)} // 끼니 입력값이 변경될 때마다 상태 업데이트
                            value={dietCategory} // 입력값을 상태와 동기화
                        />
                        <Text>이름</Text>
                        <TextInput
                            placeholder={data.dietName}
                            onChangeText={dietName => setDietName(dietName)} // 이름 입력값이 변경될 때마다 상태 업데이트
                            value={dietName} // 입력값을 상태와 동기화
                        />
                        <Text>칼로리</Text>
                        <TextInput
                            placeholder={`${data.totalKcal}kcal`}
                            onChangeText={totalCalories => setTotalCalories(totalCalories)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                            value={totalCalories} // 입력값을 상태와 동기화
                        />
                        <Text>탄수화물</Text>
                        <TextInput
                            placeholder={`${data.totalCarbohydrate}g`}
                            onChangeText={totalCarbohydrate => setTotalCarbohydrate(totalCarbohydrate)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                            value={totalCarbohydrate} // 입력값을 상태와 동기화
                        />
                        <Text>단백질</Text>
                        <TextInput
                            placeholder={`${data.totalProtein}g`}
                            onChangeText={totalProtein => setTotalProtein(totalProtein)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                            value={totalProtein} // 입력값을 상태와 동기화
                        />
                        <Text>지방</Text>
                        <TextInput
                            placeholder={`${data.totalProvince}g`}
                            onChangeText={totalProvince => setTotalProvince(totalProvince)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                            value={totalProvince} // 입력값을 상태와 동기화
                        />
                        <Text>나트륨</Text>
                        <TextInput
                            placeholder={`${data.totalSalt}mg`}
                            onChangeText={totalSalt => setTotalSalt(totalSalt)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                            value={totalSalt} // 입력값을 상태와 동기화
                        />
                    </>
                )}
                <TouchableOpacity onPress={handleUpdate}><Text>등록</Text></TouchableOpacity>
            </View>
        </>
    )
}

export default UpdateDiet;
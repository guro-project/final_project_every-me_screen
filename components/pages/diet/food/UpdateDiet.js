import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {REACT_NATIVE_AXIOS_URL} from "@env";
import { useIsFocused, useNavigation } from "@react-navigation/native";
// 식단 수정페이지
const UpdateDiet = ({ dietNo, onClose }) => {
    const [data, setData] = useState(null);
    const [dietName, setDietName] = useState('');
    const [dietCategory, setDietCategory] = useState('');
    const [totalCalories, setTotalCalories] = useState('');
    const [totalCarbohydrate, setTotalCarbohydrate] = useState('');
    const [totalProtein, setTotalProtein] = useState('');
    const [totalProvince, setTotalProvince] = useState('');
    const [totalSalt, setTotalSalt] = useState('');
    const [dietMemo, setDietMemo] = useState('');
    const navigation = useNavigation();


    // 수정을 눌렀을때 placeholder에 기존데이터가 출력되고 등록을 누르면 그데이터가 그대로들어감
    // get요청으로 상세정보를 부름

    useEffect(() => {
        fetchDetailData();
    }, [])

    const fetchDetailData = async () => {

        const userToken = await AsyncStorage.getItem('userToken');

        axios({
            method: 'GET',
            url: `${ REACT_NATIVE_AXIOS_URL }/diet/${dietNo}`,
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
            'totalSalt': totalSalt,
            'dietMemo': dietMemo
        };
        axios({
            method: 'PUT',
            url: `${REACT_NATIVE_AXIOS_URL}/updatediet/${dietNo}`,
            data: updateDietData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                console.log("수정완료");
                // console.log(response.data)
                // setModalVisible(!modalVisible)
                onClose();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    return (
        <>
            <View>
                {data && (
                    <View style={styles.updateView}>
                        <Text style={styles.updateText}>끼니</Text>
                        <TextInput
                            placeholder={data.dietCategory}
                            placeholderTextColor={'gray'}
                            onChangeText={dietCategory => setDietCategory(dietCategory)} // 끼니 입력값이 변경될 때마다 상태 업데이트
                            value={dietCategory} // 입력값을 상태와 동기화
                            style={styles.inputBox}
                        />
                        <Text style={styles.updateText}>이름</Text>
                        <TextInput
                            placeholder={data.dietName}
                            placeholderTextColor={'gray'}
                            onChangeText={dietName => setDietName(dietName)} // 이름 입력값이 변경될 때마다 상태 업데이트
                            value={dietName} // 입력값을 상태와 동기화
                            style={styles.inputBox}
                        />
                        <Text style={styles.updateText}>칼로리</Text>
                        <TextInput
                            placeholder={`${data.totalKcal}kcal`}
                            placeholderTextColor={'gray'}
                            onChangeText={totalCalories => setTotalCalories(totalCalories)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                            value={totalCalories} // 입력값을 상태와 동기화
                            style={styles.inputBox}
                        />
                        <Text style={styles.updateText}>탄수화물</Text>
                        <TextInput
                            placeholder={`${data.totalCarbohydrate}g`}
                            placeholderTextColor={'gray'}
                            onChangeText={totalCarbohydrate => setTotalCarbohydrate(totalCarbohydrate)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                            value={totalCarbohydrate} // 입력값을 상태와 동기화
                            style={styles.inputBox}
                        />
                        <Text style={styles.updateText}>단백질</Text>
                        <TextInput
                            placeholder={`${data.totalProtein}g`}
                            placeholderTextColor={'gray'}
                            onChangeText={totalProtein => setTotalProtein(totalProtein)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                            value={totalProtein} // 입력값을 상태와 동기화
                            style={styles.inputBox}
                        />
                        <Text style={styles.updateText}>지방</Text>
                        <TextInput
                            placeholder={`${data.totalProvince}g`}
                            placeholderTextColor={'gray'}
                            onChangeText={totalProvince => setTotalProvince(totalProvince)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                            value={totalProvince} // 입력값을 상태와 동기화
                            style={styles.inputBox}
                        />
                        <Text style={styles.updateText}>나트륨</Text>
                        <TextInput
                            placeholder={`${data.totalSalt}mg`}
                            placeholderTextColor={'gray'}
                            onChangeText={totalSalt => setTotalSalt(totalSalt)} // 칼로리 입력값이 변경될 때마다 상태 업데이트
                            value={totalSalt} // 입력값을 상태와 동기화
                            style={styles.inputBox}
                        />
                        <Text style={styles.updateText}>메모</Text>
                        <TextInput
                            placeholder={data.dietMemo}
                            placeholderTextColor={'gray'}
                            onChangeText={dietMemo => setDietMemo(dietMemo)} // 이름 입력값이 변경될 때마다 상태 업데이트
                            value={dietMemo} // 입력값을 상태와 동기화
                            multiline={true}
                            style={styles.inputBox}
                        />
                    </View>
                )}
                <TouchableOpacity onPress={handleUpdate}><View style={{alignItems: 'center'}}><Text style={{color: '#03C75A', fontSize: 18, marginTop: 20}}>등록</Text></View></TouchableOpacity>
            </View>
        </>
    )
}

export default UpdateDiet;

const styles = StyleSheet.create({
    updateView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%',
    },
    updateText: {
        color: 'white',
        fontSize: Platform.OS === 'android' ? 15 : 18,
        fontWeight: 'bold',
        marginBottom: 3
    },
    inputBox: {
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        width: '100%',
        marginBottom: Platform.OS === 'android' ? 10 : 20
    }

})
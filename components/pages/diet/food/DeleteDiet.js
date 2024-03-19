import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
// 식단 번호에 맞게 삭제하는 페이지
const DeleteDiet = ({dietNo}) => {

    // 삭제
    const handleDelete = async () => {
    
        const userToken = await AsyncStorage.getItem('userToken')

        axios({
            method: 'DELETE',
            url: `http://192.168.0.160:8080/deletediet/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                // 토큰 유효기간 지나면 적용안됨
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            console.log("삭제성공");
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <TouchableOpacity onPress={handleDelete}>
            <Text style={{color:'red'}}>삭제</Text>
        </TouchableOpacity>
    );
}

export default DeleteDiet;
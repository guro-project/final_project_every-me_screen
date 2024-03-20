import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { AXIOS_URL } from "@env";
// 식단 번호에 맞게 삭제하는 페이지
const DeleteDiet = ({dietNo}) => {

    // 삭제
    const handleDelete = async() => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios({
            method: 'DELETE',
            url: `${AXIOS_URL}/deletediet/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
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
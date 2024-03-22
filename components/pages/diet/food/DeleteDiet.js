import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import {REACT_NATIVE_AXIOS_URL} from "@env";
// 식단 번호에 맞게 삭제하는 페이지
const DeleteDiet = ({dietNo}) => {

    // 삭제
    const handleDelete = async() => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios({
            method: 'DELETE',
            url: `${REACT_NATIVE_AXIOS_URL}/deletediet/${dietNo}`,
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
        <TouchableOpacity
            onPress={handleDelete}
            style={{position: 'absolute', bottom: '-2000%', right: 50}}
        >
            <Text style={{color:'red', fontSize: 20}}>삭제</Text>
        </TouchableOpacity>
    );
}

export default DeleteDiet;
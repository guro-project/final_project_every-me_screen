import axios from "axios";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
// 식단 번호에 맞게 삭제하는 페이지
const DeleteDiet = ({dietNo}) => {

    // 삭제
    const handleDelete = () => {
        
        axios({
            method: 'DELETE',
            url: `http://192.168.0.160:8080/deletediet/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                // 토큰 유효기간 지나면 적용안됨
                'Authorization': `Bearer eyJkYXRlIjoxNzEwNDAzMzE4NzUwLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiVVNFUiIsInN1YiI6IkV2ZXJ5TWUgdG9rZW4gOiAxIiwiZXhwIjoxNzEwNDg5NzE4LCJ1c2VySWQiOiJ4eHhAeHh4LmNvbSJ9.89hQ9hdQLo3TMnCwDgE1AywVRopVRhCZZBmInnPGUMg`
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
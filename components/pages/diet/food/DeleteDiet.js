import axios from "axios";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
// 식단 번호에 맞게 삭제하는 페이지
const DeleteDiet = ({dietNo}) => {

    // 삭제
    const handleDelete = () => {
        
        axios({
            method: 'DELETE',
            url: `http://172.30.1.19:8080/deletediet/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                // 토큰 유효기간 지나면 적용안됨
                'Authorization': `Bearer eyJkYXRlIjoxNzEwMjU1NjIwOTg0LCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiVVNFUiIsInN1YiI6IkV2ZXJ5TWUgdG9rZW4gOiA1IiwiZXhwIjoxNzEwMzQyMDIwLCJ1c2VySWQiOiJ1c2VyNEB1c2VyNC5jb20ifQ.1PBqnS8iSGS6td2KSuZsZs52YGfAyz_Yi-AkKjQ99aM`
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
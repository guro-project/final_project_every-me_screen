// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { useState } from "react";
// import { Text, TouchableOpacity } from "react-native";
// // 식단 번호에 맞게 삭제하는 페이지
// const DeleteDiet = ({dietNo, onClose}) => {

//     // 삭제
//     const handleDelete = async() => {
//         const userToken = await AsyncStorage.getItem('userToken');
//         axios({
//             method: 'DELETE',
//             url: `http://172.30.1.96:8080/deletediet/${dietNo}`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${userToken}`
//             }
//         })
//         .then(response => {
//             console.log("삭제성공");
//             onClose();
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     }

//     return (
//         <TouchableOpacity onPress={handleDelete}>
//             <Text style={{color:'red'}}>삭제</Text>
//         </TouchableOpacity>
//     );
// }

// export default DeleteDiet;
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

// 식단 번호에 맞게 삭제하는 페이지
const DeleteDiet = ({dietNo, onClose}) => {
    // 삭제
    const handleDelete = async() => {
        Alert.alert(
            "삭제 확인",
            "정말로 삭제하시겠습니까?",
            [
                { text: "예", onPress: () => confirmDelete(onClose) },
                { text: "아니오", onPress: () => console.log("삭제 취소"), style: "cancel" }
            ],
            { cancelable: false }
        );
    }

    // 삭제 확인
    const confirmDelete = async (onClose) => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios({
            method: 'DELETE',
            url: `http://172.30.1.96:8080/deletediet/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            console.log("삭제 성공");
            onClose(); // onClose 함수 호출하여 모달 닫기
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

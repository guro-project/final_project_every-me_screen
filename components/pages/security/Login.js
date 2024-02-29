import { Button, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import SignUp from "./SignUp";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const Login = () => {
    // 로그인 화면, 계정이 없으면 아래에 회원가입 버튼으로 이동

    const navigation = useNavigation();

    // 아이디, 비밀번호 State
    const [userId, setUserId] = useState('');
    const [userPass, setUserPass] = useState('');

    // 키보드 상태 관리를 위한 useRef
    const idKeyBoardRef = useRef(null);
    const passKeyBoardRef = useRef(null);

    // 스크린 터치 이벤트 (키보드 내리기)
    const screenTouchHandler = () => {
        if (idKeyBoardRef.current) {
            idKeyBoardRef.current.blur();
        }
        if (passKeyBoardRef.current) {
            passKeyBoardRef.current.blur();
        }
    }

    // 아이디, 비밀번호 입력칸 핸들러
    const onChangeIdHandler = (text) => {
        setUserId(text);
    }
    const onChangePassHandler = (text) => {
        setUserPass(text);
    }

    const onLoginHandler = async () => {
        console.log(userId, userPass);
        // 입력값 검증
        if (!userId || !userPass) {
            alert('아이디와 비밀번호를 입력해주세요')
            return;
        }

        let loginData = JSON.stringify({
            'id': userId,
            'pass': userPass
        })

        console.log(loginData);

        axios({
            method: 'POST',
            url: 'http://192.168.0.12:8080/login',
            data: loginData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            if (response.data.userInfo) {
                navigation.navigate('MainPage');
            } else {
                alert('아이디와 비밀번호를 확인해주세요');
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <TouchableWithoutFeedback onPress={screenTouchHandler}>
            <View style={styles.container}>
                <Text>Login</Text>
                <TextInput ref={idKeyBoardRef} blurOnSubmit={true} placeholder="아이디 입력" onChangeText={onChangeIdHandler} keyboardType="default" value={userId} style={styles.textBox}/>
                <TextInput ref={passKeyBoardRef} blurOnSubmit={true} placeholder="비밀번호 입력" onChangeText={onChangePassHandler} keyboardType="default" value={userPass} style={styles.textBox}/>
                <Button 
                    title='Login'
                    onPress={onLoginHandler}
                />
                <Button
                    title='SignUp'
                    onPress={() => navigation.navigate('SignUp')}
                />
            </View>
        </TouchableWithoutFeedback>
        
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBox: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    }
});
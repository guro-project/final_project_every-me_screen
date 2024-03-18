import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { removeWhitespace, validateEmail } from "../../../util/Validation";


const EmailSignUp = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [emailCheckResult, setEmailCheckResult] = useState('');   
    const [passCheckResult, setPassCheckResult] = useState('');

    const emailChangeHandler = (email) => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setEmailCheckResult(
            changedEmail === ''? '' : validateEmail(changedEmail)? '' : 'Please valid email address'
        )
    }

    const passChangeHandler = (password) => {
        const changedPass = removeWhitespace(password);
        setPassword(changedPass);
        setPassCheckResult(
            changedPass === ''? '' : password.length < 4? 'Password must be at least 4 characters long' : ''
        )
    }
    const passCheckChangeHandler = (passwordCheck) => {
        const changedPassCheck = removeWhitespace(passwordCheck);
        setPasswordCheck(changedPassCheck);
        setPassCheckResult(
            changedPassCheck === ''? '' : password !== passwordCheck? 'Password must match' : ''
        )
    }


    const submitBtnHandler = () => {

        console.log(email, password)

        const signupData = JSON.stringify({
            'userId': email,
            'userPass': password
        })
        console.log(signupData);

        axios({
            method: 'POST',
            // url: 'http://192.168.0.176:8080/signup', // 집
            // url: 'http://192.168.31.92:8080/signup', // 오릴리
            // url: 'http://172.30.4.51:8080/signup', // 스벅
            // url: 'http://172.30.1.49:8080/signup', // 투썸
            url: 'http://192.168.0.12:8080/signup', // 학원
            data: signupData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            if (response.status === 200) {
                navigation.navigate('Login');
            } else {
                alert('아이디와 비밀번호를 확인해주세요');
            }
        }).catch(error => {
            console.log(error);
            alert('아이디가 이미 존재합니다')
        })
        
    }

    
    return (
        <View style={styles.container}>
            <Text>emailSignUp</Text>
            <TextInput onChangeText={emailChangeHandler} blurOnSubmit={true} placeholder="아이디 입력" keyboardType="default" value={email} style={styles.textBox}/>
            
            <TextInput onChangeText={passChangeHandler} blurOnSubmit={true} placeholder="비밀번호 입력" keyboardType="default" value={password} style={styles.textBox}/>
            <TextInput onChangeText={passCheckChangeHandler} blurOnSubmit={true} placeholder="비밀번호 확인" keyboardType="default" value={passwordCheck} style={styles.textBox}/>
            <Text style={(emailCheckResult.length === 0 ? styles.errorMsg : styles.showErrorMsg)}>{emailCheckResult}</Text>
            <Text style={(passCheckResult.length === 0 ? styles.errorMsg : styles.showErrorMsg)}>{passCheckResult}</Text>
            
            <Button
                title='Submit'
                onPress={submitBtnHandler}
                disabled={(email.length === 0 || password.length === 0 || passwordCheck.length === 0) ? true : !(emailCheckResult.length === 0 && passCheckResult.length === 0) ? true : false}
            />
        </View>
    )
}

export default EmailSignUp;

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
    },
    errorMsg: {
        color:'red',
        display: 'none'
    },
    showErrorMsg: {
        color:'red'
    }
})
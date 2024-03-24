import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { removeWhitespace, validateEmail } from "../../../util/Validation";
import {REACT_NATIVE_AXIOS_URL} from "@env";


const EmailSignUp = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [emailCheckResult, setEmailCheckResult] = useState('');   
    const [passCheckResult, setPassCheckResult] = useState('');

    const keyBoardRef = useRef(null);
    const screenTouchHandler = () => {
        if (keyBoardRef.current) {
            keyBoardRef.current.blur();
        }
    }

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
        changedPass === '' ? '' :
        password.length < 7 ? 'Password must be at least 7 characters long' :
        !/[a-zA-Z]/.test(password) ? 'Password must contain at least one alphabet' :
        ''
    );
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
            url: `${REACT_NATIVE_AXIOS_URL}/signup`,
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
            alert('아이디가 이미 존재합니다!')
        })
        
    }

    
    return (
        <TouchableWithoutFeedback onPress={screenTouchHandler}>
            <View style={styles.container}>
                <View style={styles.signUpText}>
                    <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>{'< emailSignUp >'}</Text>
                </View>
                
                <TextInput ref={keyBoardRef} onChangeText={emailChangeHandler} blurOnSubmit={true} placeholder="아이디 입력" placeholderTextColor={'gray'} keyboardType="default" value={email} style={styles.textBox}/>
                
                <TextInput ref={keyBoardRef} onChangeText={passChangeHandler} blurOnSubmit={true} placeholder="비밀번호 입력" placeholderTextColor={'gray'} keyboardType="default" value={password} secureTextEntry={true} style={styles.textBox}/>
                <TextInput ref={keyBoardRef} onChangeText={passCheckChangeHandler} blurOnSubmit={true} placeholder="비밀번호 확인" placeholderTextColor={'gray'} keyboardType="default" value={passwordCheck} secureTextEntry={true} style={styles.textBox}/>
                <Text style={(emailCheckResult.length === 0 ? styles.errorMsg : styles.showErrorMsg)}>{emailCheckResult}</Text>
                <Text style={(passCheckResult.length === 0 ? styles.errorMsg : styles.showErrorMsg)}>{passCheckResult}</Text>
                
                <TouchableOpacity
                    disabled={(email.length === 0 || password.length === 0 || passwordCheck.length === 0) ? true : !(emailCheckResult.length === 0 && passCheckResult.length === 0) ? true : false}
                    onPress={submitBtnHandler}
                    style={{borderColor: 'white', borderWidth: 1, borderRadius: 10, marginTop: 10, padding: 7}}
                >
                    <Text style={{color: 'white', fontSize: 18}}>Submit</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
        
    )
}

export default EmailSignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202124',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpText: {
        position: 'absolute',
        top: '25%'
    },
    textBox: {
        color: 'white',
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
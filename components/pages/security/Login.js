import { Image, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {REACT_NATIVE_AXIOS_URL} from "@env";


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

    let loginCounter = 0;

    const onLoginHandler = async () => {
        // 입력값 검증
        if (!userId || !userPass) {
            alert('아이디와 비밀번호를 입력해주세요')
            return;
        }

        await AsyncStorage.setItem('userId', userId);

        let loginData = JSON.stringify({
            'id': userId,
            'pass': userPass
        });

        try {
            const response = await axios({
                method: 'POST',
                url: `${REACT_NATIVE_AXIOS_URL}/login`,
                data: loginData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            loginCounter++;

            console.log(response.data.userInfo.userToken);

            try {
                await AsyncStorage.setItem('userToken', response.data.userInfo.userToken);
            } catch (error) {
                console.log('AsyncStorage 저장 오류:', error);
            }

            if (loginCounter === 2) {
                if (response.data.userInfo.firstLogin == 'Y') {
                    navigation.navigate('FirstLogin');
                } else {
                    navigation.navigate('TabNavigation');
                }
                return; // 함수 종료
            }

            onLoginHandler(); // 재귀 호출
        } catch (error) {
            console.log(error);        }
    }
    

    return (
        <>
            <TouchableWithoutFeedback onPress={screenTouchHandler}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <Text style={styles.textTitle1}>EVERY</Text>
                        <Text style={styles.textTitle2}>ME</Text>
                        <TextInput ref={idKeyBoardRef} blurOnSubmit={true} placeholder="아이디 입력" placeholderTextColor={'gray'} onChangeText={onChangeIdHandler} keyboardType="default" value={userId} style={styles.textBox}/>
                        <TextInput ref={passKeyBoardRef} blurOnSubmit={true} placeholder="비밀번호 입력" placeholderTextColor={'gray'} onChangeText={onChangePassHandler} keyboardType="default" value={userPass} secureTextEntry={true} style={styles.textBox}/>
                        <TouchableOpacity style={styles.loginBtn} onPress={onLoginHandler}>{/*() => navigation.navigate('FirstLogin')*/}
                            <Text style={{fontWeight: 'bold'}}>로그인</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.secContainer}>
                        <TouchableOpacity style={(styles.signUpBtn)} onPress={() => navigation.navigate('EmailSignUp')}>
                            <Text style={{fontWeight: 'bold'}}>이메일로 가입하기</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={[styles.signUpBtn, {backgroundColor: '#FEE500'}]} onPress={() => navigation.navigate('KaKaoLogin')}>
                            <Image
                                source={require('../../../images/Kakao.png')}
                                style={{width: 270 , height: 30}}
                            />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

export default Login;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#202124',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 3,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        top: '5%',
    },
    secContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '10%',
    },
    textBox: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    textTitle1: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: -20,
        color: 'white'
    },
    textTitle2: {
        fontSize: 88,
        fontWeight: 'bold',
        marginRight: 3,
        color: 'white'
    },
    loginBtn: {
        width: 80,
        height: 40,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpBtn: {
        width: 300,
        height: 40,
        marginVertical: 10,
        backgroundColor: '#03C75A',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    kakaoIcon: {
        fontSize: 22,
        position: 'absolute',
        left: -50,
        color: '#000000',
    }
});
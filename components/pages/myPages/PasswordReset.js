import { Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {REACT_NATIVE_AXIOS_URL} from "@env";

const PasswordReset = () => {
    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const logOut = async () => {
        try {
            // AsyncStorage에서 토큰을 지웁니다.
            await AsyncStorage.clear();
            console.log('삭제중..')
            // 앱을 완전히 초기화하여 초기화면으로 이동합니다.
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.log('로그아웃 중 오류가 발생했습니다.', error);
        }
    }

    const pwdChangeHandler = async () => {

        const userToken = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');

        const userInfo = JSON.stringify({
            'userId': userId,
            'userPass': password
        })

        axios({
            method: 'POST',
            url: `${REACT_NATIVE_AXIOS_URL}/changePassword`,
            data: userInfo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        }).then((response) => {
            if(response.status === 200) {
                console.log('변경 완료!')
                setModalVisible(true);
            } else {
                alert('입력하신 정보를 확인해주세요.');
            }
        }).catch(error => {
            console.log(error);
            alert('에러 : 입력하신 정보를 확인해주세요.');
        })

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.myPageTitle}>
                    <Ionicons name="information-circle-outline" style={styles.titleLogo}/>
                    <Text style={styles.titleText}>비밀번호 변경</Text>
                </View>

                <View style={styles.PwdResetBox}>
                    <View style={styles.pwdSec}>
                        <Text style={styles.pwdText}>새 비밀번호</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='새로운 비밀번호'
                            placeholderTextColor='gray'
                            value={password}
                            onChangeText={password => setPassword(password)}
                        />
                    </View>
                    <View style={styles.pwdSec}>
                        <Text style={styles.pwdText}>새 비밀번호 확인</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='새로운 비밀번호 확인'
                            placeholderTextColor='gray'
                            value={passwordConf}
                            onChangeText={passwordConf => setPasswordConf(passwordConf)}
                        />
                    </View>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 40, borderRadius: 20 }}>
                            <Text style={{fontSize: 20, marginBottom: 15, fontWeight: 'bold'}}>다시 로그인해주세요</Text>
                            <View style={styles.modalBox}>
                                <TouchableOpacity onPress={() => { setModalVisible(false); logOut(); }}>
                                    <Text style={styles.modalText}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.submitBtnContainer}>
                    <TouchableOpacity style={styles.submitBtn} onPress={pwdChangeHandler}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>변경하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default PasswordReset;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    myPageTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '10%'
    },
    titleLogo: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 15
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    PwdResetBox: {
        width: '80%',
        height: '40%',
        justifyContent: 'center',
    },
    pwdSec: {
        marginVertical: 20,
    },
    pwdText: {
        color: 'white',
        fontSize: 15,
        marginBottom: 15,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: 'white',
    },
    submitBtnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '25%',
        width: '70%',
        height: 50,
    },
    submitBtn: {
        backgroundColor: '#03C75A',
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        marginTop: 10,
    },
    modalButton: {
        backgroundColor: '#03C75A',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
})
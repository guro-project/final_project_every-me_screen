import { Keyboard, KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


const PersonalInfo = () => {

    const navigation = useNavigation();

    const [nickName, setNickName] = useState("");
    const [currentNickName, setCurrentNickName] = useState('');
    const [gender, setGender] = useState("남자");
    const [birthday, setBirthday] = useState("");
    const [currentBirthday, setCurrentBirthday] = useState('');
    const [height, setHeight] = useState("");
    const [currentHeight, setCurrentHeight] = useState('');
    const [weight, setWeight] = useState("");
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState("");
    const [currentGoalWeight, setCurrentGoalWeight] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const checkCurrentValue = async () => {
            const nickname = await AsyncStorage.getItem('userNickName');
            // console.log(nickName)
            const gender = await AsyncStorage.getItem('userGender');
            const birthday = await AsyncStorage.getItem('userBirthday');
            const height = await AsyncStorage.getItem('userHeight');
            const weight = await AsyncStorage.getItem('userWeight');
            const goalWeight = await AsyncStorage.getItem('userWeightGoal');
            setCurrentNickName(nickname);
            setGender(gender);
            setCurrentBirthday(birthday);
            setCurrentHeight(height);
            setCurrentWeight(weight);
            setCurrentGoalWeight(goalWeight);
        }
        checkCurrentValue();
    }, [currentNickName, currentBirthday, currentHeight, currentWeight, currentGoalWeight])


    const handleSelectGender = (gender) => {
        setGender(gender);
    };

    const birthDayHandler = (text) => {
        // 사용자가 입력한 생년월일을 정규식을 사용하여 형식에 맞게 변환 (백스페이스로 전부 지울 수 있도록 수정)
        let formattedBirthday = text.replace(/\D/g, ''); // 숫자 이외의 문자 제거

        if (formattedBirthday.length > 4) {
          formattedBirthday = formattedBirthday.replace(/(\d{4})(\d{0,2})/, '$1-$2'); // YYYY/MM 형식으로 변환
        }
        if (formattedBirthday.length > 7) {
          formattedBirthday = formattedBirthday.replace(/(\d{4}\-\d{2})(\d{0,2})/, '$1-$2'); // YYYY/MM/DD 형식으로 변환
        }
        setBirthday(formattedBirthday);
    };

    const submitBtnHandler = async () => {

        const userToken = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');

        const userInfo = JSON.stringify({
            'userId': userId,
            'userNickname': nickName,
            'userGender': gender,
            'userBirth': birthday,
            'userHeight': height,
            'userWeight': weight,
            'userWeightGoal': goalWeight
        })

        

        axios({
            method: 'POST',
            // url: 'http://192.168.0.176:8080/editUserInfo', // 집
            // url: 'http://192.168.31.92:8080/editUserInfo', // 오릴리
            // url: 'http://172.30.4.51:8080/editUserInfo', // 스벅
            // url: 'http://172.30.1.49:8080/editUserInfo', // 투썸
            url: 'http://192.168.0.12:8080/editUserInfo', // 학원
            data: userInfo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        }).then(async response => {
            if(response.status === 200) {
                if(nickName!== currentNickName && nickName!== '') {
                    await AsyncStorage.setItem('userNickName', nickName);
                }
                if(gender!== '') {
                    await AsyncStorage.setItem('userGender', gender);
                }
                if(birthday!== currentBirthday && birthday!== '') {
                    await AsyncStorage.setItem('userBirthday', birthday);
                }
                if(height!== currentHeight && height!== '') {
                    await AsyncStorage.setItem('userHeight', height);
                }
                if(weight!== currentWeight && weight!== '') {
                    await AsyncStorage.setItem('userWeight', weight);
                }
                if(goalWeight!== currentGoalWeight && goalWeight!== '') {
                    await AsyncStorage.setItem('userGoalWeight', goalWeight);
                }
                setModalVisible(true)
            } else {
                alert('입력하신 정보를 확인해주세요.');
            }
        }).catch(error => {
            console.log(error);
            alert('에러 : 입력하신 정보를 확인해주세요.');
        })
        
    }

    // 키보드 상태를 저장하는 state
    const [isKeyboardActive, setIsKeyboardActive] = useState(false);

    useEffect(() => {
        // 키보드 이벤트 리스너 추가
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardActive(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardActive(false);
        });

        // 언마운트될 때 이벤트 리스너 제거
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.myPageTitle}>
                    <Ionicons name="information-circle-outline" style={styles.titleLogo}/>
                    <Text style={styles.titleText}>개인정보 변경</Text>
                </View>

                <View style={styles.InfoInputBox}>
                    <View style={styles.InfoInput}>
                        <Text style={styles.infoTitle}>닉네임</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={currentNickName}
                            placeholderTextColor='gray'
                            value={nickName}
                            onChangeText={nickName => setNickName(nickName)}
                        />
                    </View>
                    <View style={styles.InfoInput}>
                        <Text style={styles.infoTitle}>성별</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, gender === '남자' && styles.selectedButton]}
                                onPress={() => handleSelectGender('남자')}
                            >
                                <Text style={[styles.buttonText, gender === '남자' && styles.selectedButtonText]}>남자</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, gender === '여자' && styles.selectedButton]}
                                onPress={() => handleSelectGender('여자')}
                            >
                                <Text style={[styles.buttonText, gender === '여자' && styles.selectedButtonText]}>여자</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.InfoInput}>
                        <Text style={styles.infoTitle}>생년월일</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={currentBirthday}
                            placeholderTextColor="gray"
                            value={birthday}
                            onChangeText={birthDayHandler}
                            maxLength={10}
                        />
                    </View>
                    <View style={styles.InfoInput}>
                        <Text style={styles.infoTitle}>신장</Text>
                        <Text style={{color:"white"}}>{currentHeight}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={`${currentHeight} cm`}
                            placeholderTextColor="gray"
                            value={height}
                            onChangeText={height => setHeight(height)}
                            maxLength={10}
                        />
                    </View>
                    <View style={styles.weightInput}>

                        <View style={styles.weightSec}>
                            <Text style={styles.weightTitle}>체중</Text>
                            <TextInput
                                style={styles.input2}
                                placeholder={`${currentWeight} kg`}
                                placeholderTextColor="gray"
                                value={weight}
                                onChangeText={weight => setWeight(weight)}
                                maxLength={10}
                            />
                        </View>
                        
                        <View style={styles.weightSec}>
                            <Text style={styles.weightTitle}>목표 체중</Text>
                            <TextInput
                                style={styles.input2}
                                placeholder={`${currentGoalWeight} kg`}
                                placeholderTextColor="gray"
                                value={goalWeight}
                                onChangeText={goalWeight => setGoalWeight(goalWeight)}
                                maxLength={10}
                            />
                        </View>
                        
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
                            <Text style={{fontSize: 20, marginBottom: 15, fontWeight: 'bold'}}>변경사항은 로그아웃 이후에 적용됩니다.</Text>
                            <View style={styles.modalBox}>
                                <TouchableOpacity onPress={() => { setModalVisible(false); logOut(); }}>
                                    <Text style={styles.modalText}>로그아웃</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('MyPages') }}>
                                    <Text style={styles.modalText}>로그인 유지</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {!isKeyboardActive && (
                    <View style={styles.submitBtnContainer}>
                        <TouchableOpacity style={styles.submitBtn} onPress={submitBtnHandler}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>변경하기</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        </TouchableWithoutFeedback>
    )
}

export default PersonalInfo;

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
    InfoInputBox: {
        position: 'absolute',
        top: '25%',
        width: '90%',
        height: '57%',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
    },
    infoTitle: {
        color: 'white',
        marginBottom: 15,
    },
    weightSec: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    weightTitle: {
        color: 'white',
        marginBottom: 15,
    },
    weightTitle2: {
        color: 'white',
        marginBottom: 15,
        marginTop: -3,
    },
    InfoInput: {
        width: '90%'
    },
    weightInput: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        height: 40,
        width: '95%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: 'white',
    },
    input2:{
        height: 40,
        width: '90%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: 'white',
    },
    inputSec: {
        height: 40,
        width: '50%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: 'lightgray',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: '#03C75A',
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
    selectedButtonText: {
        color: 'white',
    },
    submitBtnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '5%',
        width: '70%',
        height: 50,
    },
    submitBtn: {
        backgroundColor: '#03C75A',
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 5,
    },
    modalBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        color: 'black',
        fontSize: 20,
        padding: 10,
        marginHorizontal: 10
    }
})
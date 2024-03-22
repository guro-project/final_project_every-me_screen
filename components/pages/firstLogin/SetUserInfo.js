
import { Picker } from "@react-native-picker/picker";
import { useRef } from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const SetUserInfo = () => {

    const navigation = useNavigation();

    const [step, setStep] = useState(1);
    const [nickName, setNickName] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [goalWeight, setGoalWeight] = useState("");

    // 키보드 상태 관리를 위한 useRef
    const textInputRef = useRef(null);

    // 스크린 터치 이벤트 (키보드 내리기)
    const screenTouchHandler = () => {
        if (textInputRef.current) {
            textInputRef.current.blur();
        }
    }

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

    const handleSelectGender = (gender) => {
        setGender(gender);
    };

    const prevStep = () => {
        if (step === 1) {
            return;
        }
        setStep(step - 1);
    }
    const nextStep = () => {
        if (step === 4) {
            submitBtnHandler();
            return;
        }
        setStep(step + 1);
    }

    // const checkToken = () => {
    //     const userToken = AsyncStorage.getItem('userToken');
    //     console.log(userToken);
    // }

    const submitBtnHandler = async () => {

        const userToken = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');
        const role = await AsyncStorage.getItem('role');
        console.log(userId)
        console.log(role)
        console.log(nickName);
        await AsyncStorage.setItem('userNickname', nickName);
        await AsyncStorage.setItem('userGender', gender);
        await AsyncStorage.setItem('userBirthday', birthday);
        await AsyncStorage.setItem('userHeight', height);
        await AsyncStorage.setItem('userWeight', weight);
        await AsyncStorage.setItem('userGoalWeight', goalWeight);
        

        const userInfo = JSON.stringify({
            'userId': userId,
            'userNickname': nickName,
            'userGender': gender,
            'userBirth': birthday,
            'userHeight': height,
            'userWeight': weight,
            'userWeightGoal': goalWeight
        })

        console.log(userInfo);

        axios({
            method: 'POST',
            // url: 'http://192.168.0.176:8080/setUserInfo', // 집
            // url: 'http://192.168.31.92:8080/setUserInfo', // 오릴리
            // url: 'http://172.30.4.51:8080/setUserInfo', // 스벅
            // url: 'http://172.30.1.49:8080/setUserInfo', // 투썸
            url: 'http://192.168.0.64:8080/setUserInfo', // 학원
            data: userInfo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        }).then(response => {
            console.log(response.data);
            if (response.status === 200) {
                navigation.navigate('TabNavigation');
            } else {
                alert('입력하신 정보를 확인해주세요');
            }
        }).catch(error => {
            console.log(error);
            alert('에러 : 입력하신 정보를 확인해주세요');
        })
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={screenTouchHandler}>
                <View style={styles.container}>
                    {step === 1 && (
                        <>
                            <Text style={styles.text}>닉네임을 입력해주세요</Text>
                            <TextInput
                                ref={textInputRef}
                                style={styles.input}
                                placeholder="nickName"
                                value={nickName}
                                onChangeText={nickName => setNickName(nickName)}
                            />
                        </>
                    )}
                    
                    {step === 2 && (
                        <>
                            <Text style={styles.text}>성별을 입력해주세요</Text>
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
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <Text style={styles.text}>생년월일을 입력해주세요</Text>
                            <TextInput
                                ref={textInputRef}
                                style={styles.input}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="gray"
                                value={birthday}
                                onChangeText={birthDayHandler}
                                maxLength={10}
                            />
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <Text style={styles.text}>신체 치수를 입력해주세요</Text>
                            <TextInput
                                ref={textInputRef}
                                style={styles.input}
                                placeholder="키"
                                placeholderTextColor="gray"
                                value={height}
                                onChangeText={height => setHeight(height)}
                                maxLength={10}
                            />
                            <TextInput
                                ref={textInputRef}
                                style={styles.input}
                                placeholder="체중"
                                placeholderTextColor="gray"
                                value={weight}
                                onChangeText={weight => setWeight(weight)}
                                maxLength={10}
                            />
                            <TextInput
                                ref={textInputRef}
                                style={styles.input}
                                placeholder="목표 체중"
                                placeholderTextColor="gray"
                                value={goalWeight}
                                onChangeText={goalWeight => setGoalWeight(goalWeight)}
                                maxLength={10}
                            />
                        </>
                    )}


                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={prevStep}>
                            <View style={styles.btnBox}>
                                <Text style={styles.btnText}>Prev</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={nextStep}>
                            <View style={styles.btnBox}>
                                <Text style={styles.btnText}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

export default SetUserInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '50%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'white',
    },
    btnContainer: {
        width: '50%',
        height: '10%',
        paddingTop: 40,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: '35%',
        left: 50,
        transform: [{ translateX: 50 }, { translateY: 50 }]
    },
    btnBox: {
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 20
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: 'lightgray',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: 'green',
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
    selectedButtonText: {
        color: 'white',
    },
})
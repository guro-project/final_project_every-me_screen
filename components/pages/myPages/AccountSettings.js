import { StyleSheet, Text, TouchableOpacity, View, Alert, Button, Modal, Image, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";

import * as ImagePicker from 'expo-image-picker';
import axios from "axios";


const AccountSettings = () => {

    const navigation = useNavigation();
    const [userNickname, setUserNickName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loadImg, setLoadImg] = useState(null);

    useEffect(()=> {
        const loadUserInfo = async () => {
            const profileImg = await AsyncStorage.getItem('userProfileImg');
            const userNickName = await AsyncStorage.getItem('userNickName');
            setLoadImg(profileImg);
            setUserNickName(userNickName);
        };
        loadUserInfo();
    },[]);
    

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status!== 'granted') {
                    alert('카메라 접근 권한이 필요합니다.');
                }
            }
        })();
    },[]);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        })    

        if(!result.canceled) {

            const updatedImg = result.assets[0].uri;
            await AsyncStorage.setItem('profileUri', updatedImg);

            const userToken = await AsyncStorage.getItem('userToken');
            const userId = await AsyncStorage.getItem('userId');


            // const userInfo = JSON.stringify({
            //     'userId': userId,
            //     'profileUri': updatedImg
            // })

            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('profileUri', {
                name: 'userProfileImg.jpg',
                type: 'image/jpeg',
                uri: updatedImg
            });

            axios({
                method: 'POST',
                // url: 'http://192.168.0.176:8080/editProfileImg', // 집
                // url: 'http://192.168.31.92:8080/editProfileImg', // 오릴리
                // url: 'http://172.30.4.51:8080/editProfileImg', // 스벅
                // url: 'http://172.30.1.49:8080/editProfileImg', // 투썸
                url: 'http://172.30.1.96:8080/editProfileImg', // 학원
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userToken}`
                }
            }).then(async response => {
                if(response.status === 200) {
                    setModalVisible(true)
                } else {
                    alert('입력하신 정보를 확인해주세요.');
                }
            }).catch(error => {
                console.log(error);
                alert('에러 : 입력하신 정보를 확인해주세요.');
            })
        }
    
    }

    const pickImage2 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if(!result.canceled) {

            const updatedImg = result.assets[0].uri;

            console.log(updatedImg.replace('file://', ''));

            const userToken = await AsyncStorage.getItem('userToken');
            const userId = await AsyncStorage.getItem('userId');

            const image = {
                name: '_userProfileImg.jpg',
                type: 'image/jpeg',
                uri: Platform.OS === 'ios' ? updatedImg.replace('file://', '') : updatedImg
            }

            const formData = new FormData();
            formData.append('profileUri', image);

            axios({
                method: 'POST',
                // url: `http://192.168.0.176:8080/editProfileImg?userId=${userId}`, // 집
                // url: 'http://192.168.31.92:8080/editProfileImg', // 오릴리
                // url: 'http://172.30.4.51:8080/editProfileImg', // 스벅
                // url: 'http://172.30.1.49:8080/editProfileImg', // 투썸
                url: `http://172.30.1.96:8080/editProfileImg?userId=${userId}`, // 학원
                data: formData,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userToken}`
                },
                transformRequest: data => data,
            }).then(response => {
                console.log(response);
                if(response.status === 200) {
                    console.log('Success ', response.data);
                } else {
                    alert('입력하신 정보를 확인해주세요.');
                }
            }).catch(error => {
                console.log(error);
                alert('에러 : 입력하신 정보를 확인해주세요. please');
            })
        }
    
    }


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

    const pressTest = () => {
        console.log('btn')
    }

    return (
        <View style={styles.container}>
            <View style={styles.myPageContents}>
                <Text style={styles.titleText}>계정 설정</Text>
                {/* 프로필 이미지 */}
                <View style={styles.profileBox}>
                    {loadImg !== null && loadImg.length > 22 ? (
                        <Image source={{ uri: loadImg }} style={styles.profileImg} />
                    ) : (
                        <Ionicons name="person-circle-outline" style={styles.profileIcon} />
                    )}
                    <Ionicons name="image-outline" style={styles.profileChange} onPress={pickImage} />
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
                                    <TouchableOpacity onPress={() => { setModalVisible(false); }}>
                                        <Text style={styles.modalText}>로그인 유지</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                
                {/* 닉네임 */}
                <View style={styles.nickNameBox}>
                    <Text style={styles.nickNameText}>{userNickname} 님</Text>
                </View>
                
                {/* 구분선 */}
                <View style={styles.oneBorderLine}></View>

                <View style={styles.myPageBtns}>
                    <TouchableOpacity onPress={()=> navigation.navigate('PersonalInfo')}>
                        <View style={styles.btnBox}>
                            <Ionicons name="information-circle-outline" style={styles.btnContents}/>
                            <Text style={styles.btnText}>개인정보 변경</Text>
                            <Ionicons name="chevron-forward-outline" style={styles.btnContents}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={pickImage2}>
                        <View style={styles.btnBox}>
                            <Ionicons name="body-outline" style={styles.btnContents}/>
                            <Text style={styles.btnText}>신체정보 변경</Text>
                            <Ionicons name="chevron-forward-outline" style={styles.btnContents}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigation.navigate('PasswordReset')}>
                        <View style={styles.btnBox}>
                            <Ionicons name="key-outline" style={styles.btnContents}/>
                            <Text style={styles.btnText}>비밀번호 변경</Text>
                            <Ionicons name="chevron-forward-outline" style={styles.btnContents}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AccountSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    myPageContents: {
        width: '90%',
        height: '90%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    myPageBtns: {
        backgroundColor: 'black',
        width: '90%',
        height: '30%',
        position: 'absolute',
        top: '48%',
        justifyContent: 'space-between',
        display: 'flex',
    },
    titleText: {
        position: 'absolute',
        top: '3%',
        left: '1%',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    settingBtn: {
        position: 'absolute',
        top: '3%',
        right: '2%',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    profileBox: {
        position: 'absolute',
        top: '10%'
    },
    profileImg: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    profileIcon: {
        color: 'white',
        opacity: 0.7,
        fontSize: 150
    },
    profileChange: {
        fontSize: 40,
        color: '#03C75A',
        position: 'absolute',
        bottom: '10%',
        right: '10%'
    },
    nickNameBox: {
        position: 'absolute',
        top: '33%'
    },
    nickNameText: {
        color: 'white',
        fontSize: 30,
    },
    oneBorderLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        opacity: 0.5,
        width: '100%',
        height: 1,
        position: 'absolute',
        top: '42%'
    },
    btnBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    btnContents: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
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
});

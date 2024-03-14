import { StyleSheet, Text, TouchableOpacity, View, Alert, Button, Modal, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";

import * as ImagePicker from 'expo-image-picker';

// import * as MediaLibrary from "expo-media-library";
// import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker';
// import { Camera } from "expo-camera";


const AccountSettings = () => {

    const navigation = useNavigation();
    const [userNickname, setUserNickName] = useState('');

    // const [pickedImage, setPickedImage] = useState(null);

    // const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    // const verifyPermissions = async() => {
    //     if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
    //         const permissionResponse = await requestPermission();
    //         return permissionResponse.granted;
    //     }

    //     if(cameraPermissionInformation.status === PermissionStatus.DENIED) {
    //         Alert.alert('주의', '앱을 사용하기 위해 권한이 필요합니다.');
    //         return false;
    //     }

    //     return true;
    // }

    // const takeImageHandler = async () => {
    //     const hasPermission = await verifyPermissions();

    //     if (!hasPermission) {
    //         return;
    //     }

    //     const image = await launchCameraAsync( // 찍고 나서 확정까지 기다려주는 라이브러리
    //         {
    //             allowsEditing: true,
    //             aspect: [16,9],
    //             quality: 0.5
    //         }
    //     );

    //     if(!image.canceled) {
    //         try {
    //             if(Platform.OS === 'ios') {
    //                 await MediaLibrary.saveToLibraryAsync(image.uri);
    //             } else {
    //                 const {status} = await MediaLibrary.requestPermissionsAsync();
    //                 if (status === 'granted') {
    //                     await MediaLibrary.saveToLibraryAsync(image.uri);
    //                 }
    //             }
    //             setPickedImage(image.uri);
    //             Alert.alert('성공', '갤러리에 이미지가 저장되었습니다')
    //         } catch (error) {
    //             console.error('Failed to save picture : ', error);
    //             Alert.alert('실패', '사진을 저장하는 과정에서 오류가 발생했습니다')
    //         }
    //     }
    // }

    // let imagePreview = <Text>이미지가 없습니다</Text>

    // if(pickedImage) {
    //     imagePreview = <Image source={{uri: pickedImage}} style={styles.image}/>
    // }
    const [selectedImage, setSelectedImage] = useState(null);

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
            quality: 1,
        })

        if(!result.cancelled) {
            setSelectedImage(result.assets[0].uri);
        }
        
        await AsyncStorage.setItem('userImage', result.assets[0].uri);
    }
    useEffect(() => {
        const checkImage = async () => {
            const userProfileImg = await AsyncStorage.getItem('userImage');
            setSelectedImage(userProfileImg);
        }
        checkImage();
    },[])



    useEffect(() => {
        const checkNickname = async () => {
            const nickname = await AsyncStorage.getItem('userNickname');
            setUserNickName(nickname);
        }
        checkNickname();
    }, [])

    const pressTest = () => {
        console.log('btn')
    }

    return (
        <View style={styles.container}>
            <View style={styles.myPageContents}>
                <Text style={styles.titleText}>계정 설정</Text>
                {/* 프로필 이미지 */}
                <View style={styles.profileBox}>
                    {selectedImage !== null ? (
                        <Image source={{ uri: selectedImage }} style={styles.profileImg} />
                    ) : (
                        <Ionicons name="person-circle-outline" style={styles.profileIcon} />
                    )}
                    <Ionicons name="image-outline" style={styles.profileChange} onPress={pickImage} />
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

                    <TouchableOpacity onPress={pressTest}>
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
    }
});

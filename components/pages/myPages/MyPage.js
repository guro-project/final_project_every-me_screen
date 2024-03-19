import { StyleSheet, Text, TouchableOpacity, View, Alert, Button, Modal, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import axios from "axios";

const MyPage = () => {
    const navigation = useNavigation();

    const [userNickname, setUserNickName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loadImg, setLoadImg] = useState(null);


    useEffect(()=> {
        const loadUserInfo = async () => {
            const profileImg = await AsyncStorage.getItem('userProfileImg');
            const userNickName = await AsyncStorage.getItem('userNickName');
            setLoadImg(profileImg);
            console.log('loadImg  ', loadImg)
            setUserNickName(userNickName);
        };
        loadUserInfo();
    },[]);

    const confirmLogout = () => {
        setModalVisible(true);
    };


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
                <Text style={styles.titleText}>마이 페이지</Text>
                {/* 톱니버튼 */}
                <Ionicons name="settings-outline" style={styles.settingBtn} onPress={logOut}/>
                {/* 프로필 이미지 */}
                <View style={styles.profileBox}>
                    {loadImg !== null && loadImg.length > 22 ? (
                        <Image source={{ uri: loadImg }} style={styles.profileImg} />
                    ) : (
                        <Ionicons name="person-circle-outline" style={styles.profileIcon} />
                    )}
                </View>
                {/* 닉네임 */}
                <Text style={styles.nickNameText}>{userNickname} 님</Text>
                {/* 구분선 */}
                <View style={styles.oneBorderLine}></View>

                <View style={styles.myPageBtns}>
                    <TouchableOpacity onPress={()=> navigation.navigate('AccountSettings')}>
                        <View style={styles.btnBox}>
                            <Ionicons name="document-text-outline" style={styles.btnContents}/>
                            <Text style={styles.btnText}>계정 설정</Text>
                            <Ionicons name="chevron-forward-outline" style={styles.btnContents}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={pressTest}>
                        <View style={styles.btnBox}>
                            <Ionicons name="fast-food-outline" style={styles.btnContents}/>
                            <Text style={styles.btnText}>식단 관리</Text>
                            <Ionicons name="chevron-forward-outline" style={styles.btnContents}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={pressTest}>
                        <View style={styles.btnBox}>
                            <Ionicons name="file-tray-full-outline" style={styles.btnContents}/>
                            <Text style={styles.btnText}>ToDo 관리</Text>
                            <Ionicons name="chevron-forward-outline" style={styles.btnContents}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={pressTest}>
                        <View style={styles.btnBox}>
                            <Ionicons name="bookmarks-outline" style={styles.btnContents}/>
                            <Text style={styles.btnText}>북마크 관리</Text>
                            <Ionicons name="chevron-forward-outline" style={styles.btnContents}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={confirmLogout}>
                        <View style={styles.btnBox}>
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
                                    <Text style={{fontSize: 20, marginBottom: 15, fontWeight: 'bold'}}>로그아웃 하시겠습니까?</Text>
                                    <View style={styles.modalBox}>
                                        <TouchableOpacity onPress={() => { setModalVisible(false); logOut(); }}>
                                            <Text style={styles.modalText}>확인</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setModalVisible(false); }}>
                                            <Text style={styles.modalText}>취소</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                            <Ionicons name="log-out-outline" style={styles.btnContents}/>
                            <Text style={styles.btnText}>로그아웃</Text>
                            <Ionicons name="chevron-forward-outline" style={styles.btnContents}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default MyPage;

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
        height: '50%',
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
    nickNameText: {
        color: 'white',
        fontSize: 30,
        position: 'absolute',
        top: '33%'
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        color: 'black',
        fontSize: 22,
        padding: 10,
        marginHorizontal: 10
    }
});

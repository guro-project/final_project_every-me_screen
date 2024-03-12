import { StyleSheet, Text, TouchableOpacity, View, Alert, Button, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";

const MyPage = () => {
    const navigation = useNavigation();
    const [userNickname, setUserNickName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const confirmLogout = () => {
        setModalVisible(true);
    };

    const logOut = () => {
        try {
            // AsyncStorage에서 토큰을 지웁니다.
            AsyncStorage.removeItem('userToken');
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

    useEffect(() => {

        const checkNickname = async () => {
            const nickname = await AsyncStorage.getItem('userNickname');
            setUserNickName(nickname);
        }

        checkNickname();
    }, [userNickname])

    const pressTest = () => {
        console.log('btn')
    }

    return (
        <View style={styles.container}>
            <View style={styles.myPageContents}>
                <Text style={styles.titleText}>마이 페이지</Text>
                <Ionicons name="settings-outline" style={styles.settingBtn} onPress={logOut}/>
                <Ionicons name="person-circle-outline" style={styles.profileImg}/>
                <Text style={styles.nickNameText}>{userNickname} 님</Text>
                <View style={styles.oneBorderLine}></View>

                <View style={styles.myPageBtns}>
                    <TouchableOpacity onPress={pressTest}>
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
                                    <Text style={{fontSize: 20, marginBottom: 10}}>로그아웃 하시겠습니까?</Text>

                                    <Button title="확인" onPress={() => { setModalVisible(false); logOut(); }} />
                                    <Button title="취소" onPress={() => setModalVisible(false)} />
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
        right: '1%',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    profileImg: {
        color: 'white',
        opacity: 0.7,
        fontSize: 150,
        position: 'absolute',
        top: '10%'
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
        fontSize: 22,
        fontWeight: 'bold'
    },
    btnContents: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    }
});

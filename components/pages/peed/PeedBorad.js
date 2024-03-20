import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Modal, ScrollView } from "react-native"
import axios from 'axios';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';

const PeedBoard = () => {

    const [peed, setPeed] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const dietPeed = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        try {
            const response = await axios({
                method: 'GET',
                // url: 'http://192.168.0.176:8080/dietPeed', // 집
                // url: 'http://192.168.31.92:8080/dietPeed', // 오릴리
                // url: 'http://172.30.4.51:8080/dietPeed', // 스벅
                // url: 'http://172.30.1.49:8080/dietPeed', // 투썸
                url: 'http://192.168.0.160:8080/dietPeed', // 학원
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })

            try {
                if (response.status === 200) {
                    setPeed(response.data); // 받은 데이터 출력 또는 활용 dietImg, dietName, ingredientName, totalKcal
                }
            } catch (error) {
                console.log(response);
                alert('입력하신 정보를 확인해주세요.');
            }
        } catch(error) {
            console.log(error);
            alert('에러 : 입력하신 정보를 확인해주세요.');
        }
    }
    useEffect(() => {
        dietPeed();
    }, [])

    const getRefreshData = async () => {
        setRefreshing(true);
        await dietPeed();
        setRefreshing(false);
    }
    
    const onRefresh = () => {
        if(!refreshing) {
            getRefreshData();
        }
    }

    const modalCheck = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    }


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => modalCheck(item)}>
            <View style={styles.peedBox}>
                <Image
                    source={{ uri: `data:image/png;base64,${item.dietImg}`}}
                    style={styles.image}
                    resizeMode="cover" // 이미지를 화면에 맞게 잘라내어 표시
                />
                <Text style={{color: 'white'}}>{item.dietNo}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={peed}
                renderItem={renderItem}
                keyExtractor={(item) => item.dietNo.toString()}
                numColumns={3} // 3개의 열로 배치
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    {selectedItem && (
                        <>
                            <View style={styles.itemInfo}>
                                <View style={styles.imgBox}>
                                    <Image
                                        source={{ uri: `data:image/png;base64,${selectedItem.dietImg}`}}
                                        style={styles.modalImg}
                                        resizeMode="cover"
                                    />
                                </View>
                                <ScrollView style={styles.infoBox}>
                                    <Text style={styles.infoTitle}>{selectedItem.dietName}</Text>
                                    <Text style={styles.infoSub}>{selectedItem.dietCategory}</Text>
                                    <Text style={styles.infoText}>총 칼로리: {selectedItem.totalKcal}</Text>
                                    <Text style={styles.infoText}>총 단백질: {selectedItem.totalProtein}</Text>
                                    <Text style={styles.infoText}>총 나트륨: {selectedItem.totalSalt}</Text>
                                    <Text style={styles.infoText}>총 지방: {selectedItem.totalProvince}</Text>
                                </ScrollView>
                                {/* 필요한 다른 정보들도 여기에 추가할 수 있습니다. */}
                                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                                    <Ionicons name="close" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </>
                        
                    )}
                </View>
            </Modal>

        </View>
    );
}

export default PeedBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 70,
    },
    peedBox: {
        width: Dimensions.get('window').width / 3, // 화면의 가로 길이를 3등분하여 각 아이템의 크기를 조절
        aspectRatio: 1, // 가로 세로 비율을 유지하여 정사각형 모양으로 설정
    },
    image: {
        width: '100%',
        height: '100%', // 부모 컨테이너의 크기에 맞춰지지 않도록 설정
        borderWidth: 0.5,
    },
    contentsText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        width: '90%',
        height: '60%',
        position: 'absolute',
        top: '20%',
        left: '5%',
        borderWidth: 1,
        borderRadius: 10,
    },
    itemInfo: {
        width: '100%',
        height: '100%',
    },
    imgBox: {
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '65%',
    },
    modalImg: {
        width: '80%',
        height: '90%',
    },
    infoBox: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 20,
        marginBottom: 5
    },
    infoSub: {
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 20
    },
    infoText: {
        fontSize: 20,
        marginVertical: 5,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        bottom: '20%',
        right: '50%',
        transform: [{ translateX: 20 }, { translateY: 100 }],
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    }
});
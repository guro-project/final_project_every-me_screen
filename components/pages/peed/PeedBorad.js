import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Modal, ScrollView } from "react-native"
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import {REACT_NATIVE_AXIOS_URL} from "@env";

const PeedBoard = () => {

    const [peed, setPeed] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [dietCategory, setDietCategory] = useState('');

    const dietPeed = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        try {
            const response = await axios({
                method: 'GET',
                url: `${REACT_NATIVE_AXIOS_URL}/dietPeed`, 
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })

            try {
                if (response.status === 200) {
                    setPeed(response.data);
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
        setDietCategory(item.dietCategory);
        setSelectedItem(item);
        setIsModalVisible(true);
    }


    const renderItem = ({ item }) => {

        return (
            // item.dietImg가 존재하는 경우에만 렌더링
            item.dietImg ? (
                <TouchableOpacity onPress={() => modalCheck(item)}>
                    <View style={styles.peedBox}>
                        <Image
                            source={{ uri: `data:image/png;base64,${item.dietImg}` }}
                            style={styles.image}
                            resizeMode="cover" // 이미지를 화면에 맞게 잘라내어 표시
                        />
                    </View>
                </TouchableOpacity>
            ) : null // item.dietImg가 없는 경우 렌더링하지 않음
        )
    }

    const getColor = (dietCategory) => {
        switch (dietCategory) {
            case '아침':
                return '#7ED957'; 
            case '점심':
                return '#FFA500'; 
            case '저녁':
                return '#A9A9A9'; 
            case '기타':
                return '#FFD700'; 
            default:
                return '#000000'; // 기본값: 검정
        }
    };

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
                                <View style={styles.infoBox}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'white'}}>
                                        <Text style={styles.infoTitle}>{selectedItem.dietName}</Text>
                                        <Text style={[styles.infoSub, {color: getColor(dietCategory)}]}>{dietCategory}</Text>
                                    </View>
                                    
                                    <ScrollView>
                                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                                            <View>
                                                <Text style={{color: 'white', fontSize:22, marginBottom: 5}}>메모</Text>
                                                <Text style={{color: 'white', fontSize:18}}>{selectedItem.dietMemo}</Text>
                                            </View>
                                            <View style={{borderLeftColor:'white', borderLeftWidth: 1, paddingLeft: 10}}>
                                                <Text style={{color: 'white', fontSize: 18, marginBottom: '3%'}}>칼로리 : {selectedItem.totalKcal}Kcal</Text>
                                                <Text style={{color: 'white', fontSize: 18, marginBottom: '3%'}}>탄수화물 : {selectedItem.totalCarbohydrate}g</Text>
                                                <Text style={{color: 'white', fontSize: 18, marginBottom: '3%'}}>단백질 : {selectedItem.totalProtein}g</Text>
                                                <Text style={{color: 'white', fontSize: 18, marginBottom: '3%'}}>지방 : {selectedItem.totalProvince}g</Text>
                                                <Text style={{color: 'white', fontSize: 18, marginBottom: '3%'}}>나트륨 : {selectedItem.totalSalt}mg</Text>
                                            </View>
                                        </View>
                                    </ScrollView>

                                    {/* <ScrollView>
                                        <Text style={styles.infoText}>총 칼로리: {selectedItem.totalKcal}</Text>
                                        <Text style={styles.infoText}>총 탄수화물: {selectedItem.totalCarbohydrate}</Text>
                                        <Text style={styles.infoText}>총 단백질: {selectedItem.totalProtein}</Text>
                                        <Text style={styles.infoText}>총 나트륨: {selectedItem.totalSalt}</Text>
                                        <Text style={styles.infoText}>총 지방: {selectedItem.totalProvince}</Text>
                                        <Text style={styles.infoText}>총 지방: {selectedItem.totalProvince}</Text>
                                        <Text style={styles.infoText}>총 지방: {selectedItem.totalProvince}</Text>
                                        <Text style={styles.infoText}>총 지방: {selectedItem.totalProvince}</Text>
                                    </ScrollView> */}
                                </View>
                                {/* 필요한 다른 정보들도 여기에 추가할 수 있습니다. */}
                                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                                    <Ionicons name="close" size={30} color="white" />
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
        marginTop: Platform.OS === 'android' ? '5%' : '17%',
        backgroundColor: '#202124',
        width: '100%',
        height: Platform.OS === 'android' ? '91.5%' : '82.9%',
    },
    itemInfo: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    imgBox: {
        flex: 1.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '65%',
    },
    modalImg: {
        width: '90%',
        height: '90%',
        borderRadius: 10
    },
    infoBox: {
        flex: 1,
        width: '90%'
    },
    infoTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5,
        color: 'white',
        marginBottom: '5%'
    },
    infoSub: {
        fontSize: 25,
        color: 'white',
        marginBottom: '5%'
    },
    infoText: {
        fontSize: 20,
        marginVertical: 5,
        textAlign: 'center',
    },
    closeButton: {
        color: 'white',                                                                                                                                                                                                                                                          
        position: 'absolute',
        bottom: '17%',
        right: '50%',
        transform: [{ translateX: 20 }, { translateY: 100 }],
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    }
});

import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DietDetailPage from "./food/DietDetailPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {REACT_NATIVE_AXIOS_URL} from "@env";
import { Ionicons } from '@expo/vector-icons';
// 식단의 메인화면
const FoodFirst = () => {
    
    const navigation = useNavigation();

    const page = () => {
        navigation.navigate("IngredientsSearch");
        // console.log("클릭시 반응함?")
    }


    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [dietNo, setDietNo] = useState(null);
    const [selectedDietNo, setSelectedDietNo] = useState(null);
    const [userNo, setUserNo] = useState('');
    const route = useRoute();

    // 식단에 등록된 결과가 나오는 부분인데 첫 화면과 같이 있어서 들어갈시 데이터가 없으므로 없을때 조건을 걸어줌
    // 조건을 걸지않으면 첫화면부터 없는 데이터가 나와서 에러 발생함
    const dietName = route.params ? route.params.dietName : null;
    const selectedMethod = route.params ? route.params.selectedMethod : null;
    const totalCalories = route.params ? route.params.totalCalories : null;
    const totalCarbohydrate = route.params ? route.params.totalCarbohydrate : null;
    const totalProvince = route.params ? route.params.totalProvince : null;
    const totalProtein = route.params ? route.params.totalProtein : null;
    const totalSalt = route.params ? route.params.totalSalt : null;


    // console.log("시작")
    // console.log("식단이름 최종적으로 받았나?")
    // console.log(dietName)
    // console.log("끼니 최종적으로 받았나?")
    // console.log(selectedMethod)
    // console.log("총 칼로리 최종적으로 받았나?")
    // console.log(totalCalories)

    // 등록된 식단 클릭시 페이지가 나와서 영양상세정보가 나옴 가능하면 재료명도

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserNo = async () => {
            try {
                const userNo = await AsyncStorage.getItem('userNo');
                if (userNo !== null && userNo !== undefined) {
                    setUserNo(userNo);
                    if (data === null) {
                        fetchData(userNo);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserNo();
    }, []); // data state 변화 감지

    useEffect(() => {
        const fetchDataPeriodically = async () => {
            try {
                const userNo = await AsyncStorage.getItem('userNo');
                if (userNo !== null && userNo !== undefined) {
                    setUserNo(userNo);
                    getDietList(userNo);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchDataPeriodically();
        console.log('userNo 4343: ' , userNo)
    
        // const intervalId = setInterval(fetchDataPeriodically, 20000); // 5초마다 데이터 폴링 1000당 1초
    
        // return () => clearInterval(intervalId); // 컴포넌트가 언마운트되면 interval 정리
    }, []); 


    // 전체조회
    const fetchData = async (userNo) => {
        const userToken = await AsyncStorage.getItem('userToken');
        const today = await AsyncStorage.getItem('today');
        console.log("today : " , today)
        console.log("유저번호");
        console.log("userNo : " , userNo);
        if (userNo !== undefined) {
            axios({
                method: 'GET',
                url: `${REACT_NATIVE_AXIOS_URL}/diet?userNo=${userNo}&date=${today}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            })
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('전체조회에러 : ' + error);
                });
        }
    };

    const getDietList = async (userNo) => {
        const userToken = await AsyncStorage.getItem('userToken');
        const today = await AsyncStorage.getItem('today');
        console.log("today123 : " , today)
        try {
            const response = await axios({
                method: 'GET',
                url: `${REACT_NATIVE_AXIOS_URL}/diet?userNo=${userNo}&date=${today}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });
            setData(response.data);
            // console.log(response.data)
        } catch (error) { //해당유저의 db에 값이 없으면 404에러가남
            console.log("조회에러 : " , error);
        }
    };

    // 데이터가 객체로 되있어서 출력도 객체형식으로 나와서 데이터형식을 바꾼것
    const renderData = () => {
        if (!data) return;

        const results = [];
        for (const item of data) {
            const { dietNo, dietName, totalKcal, dietCategory } = item;

            results.push(
                <View style={styles.dietItems}>
                    <TouchableOpacity
                        key={dietNo}
                        onPress={() => {
                            setSelectedDietNo(dietNo);
                            setModalVisible(true);
                        }}
                    >
                        {/* 시작화면에 나오는 식단 출력 부분 */}
                        <View style={styles.dietItem}>
                            <Text style={styles.itemText}>{dietCategory}</Text>
                            <Text style={styles.itemText}>{dietName}</Text>
                            <Text style={styles.itemText}>{totalKcal}Kcal</Text>
                        </View>
                            
                            
                        
                    </TouchableOpacity>
                </View>
                
            );
        }

        return results;
    };


    return (
        <View style={styles.container}>
            {/* add 누를시 검색화면으로 넘어감 */}
            <TouchableOpacity onPress={page} style={styles.touch}><Ionicons name="add-circle-outline"  size={40} color='#03C75A'/></TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View>
                    <View style={styles.modalView}>
                        {/* 상세정보 모달 */}
                        <DietDetailPage dietNo={selectedDietNo} />
                        <Pressable onPress={() => setModalVisible(!modalVisible)} style={{position: 'absolute', bottom: '25%'}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>닫기</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ScrollView style={styles.dietList}>
                <Pressable onPress={() => setModalVisible(true)}>
                    {renderData()}
                </Pressable>
            </ScrollView>
        </View>
    )
}

export default FoodFirst;

const styles = StyleSheet.create({
    touch: {
        zIndex: 999,
        position: 'absolute',
        bottom: 0,
        right: 50,
        transform: [{ translateX: 0 }, { translateY: 0 }],
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        marginTop: '41%',
        backgroundColor: '#202124',
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '90%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dietList: {
        width: '80%',
        height: Platform.OS === 'android' ? 500 : 450,
        flexDirection: 'column',
        marginTop: 100,
    },
    dietItems: {
        width: '100%',
    },
    dietItem: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    itemText: {
        fontSize: 18,
    }
})
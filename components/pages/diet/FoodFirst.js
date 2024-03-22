import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DietDetailPage from "./food/DietDetailPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {REACT_NATIVE_AXIOS_URL} from "@env";
import { Ionicons } from '@expo/vector-icons';
// 식단의 메인화면
const FoodFirst = () => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const page = () => {
        navigation.navigate("IngredientsSearch");
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [selectedDietNo, setSelectedDietNo] = useState(null);
    const [userNo, setUserNo] = useState('');
    const route = useRoute();

    const dietName = route.params ? route.params.dietName : null;
    const selectedMethod = route.params ? route.params.selectedMethod : null;
    const totalCaloriesProp = route.params ? route.params.totalCalories : null;
    const totalCarbohydrate = route.params ? route.params.totalCarbohydrate : null;
    const totalProvince = route.params ? route.params.totalProvince : null;
    const totalProtein = route.params ? route.params.totalProtein : null;
    const totalSalt = route.params ? route.params.totalSalt : null;

    const [totalCalories, setTotalCalories] = useState(0); // totalCalories를 state로 변경

    useEffect(() => {
        getDietList();
    }, [isFocused])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userNo = await AsyncStorage.getItem('userNo');
                if (userNo !== null) {
                    setUserNo(userNo);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // const getDietList = async () => {
    //     const userToken = await AsyncStorage.getItem('userToken');
    //     const today = await AsyncStorage.getItem('today');
    //     console.log("today : " , today)
    //     console.log("유저번호");
    //     console.log("userNo : " , userNo);
    //     if (userNo !== undefined) {
    //         axios({
    //             method: 'GET',
    //             url: `${REACT_NATIVE_AXIOS_URL}/diet?userNo=${userNo}&date=${today}`,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${userToken}`
    //             }
    //         })
    //             .then(response => {
    //                 setData(response.data);
    //             })
    //             .catch(error => {
    //                 console.error('전체조회에러 : ' + error);
    //             });
    //     }
    // };

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

            // 데이터를 받아온 후에 전체 칼로리를 누적하여 업데이트
            let total = 0;
            response.data.forEach(item => {
                total += parseFloat(item.totalKcal);
            });
            setTotalCalories(total);

        } catch(error) {
            console.log(userNo)
            console.log(today)
        }
    }

    const renderData = () => {
        if (!data) return null;

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

    const closeModal = () => {
        setModalVisible(false);
        getDietList();
    }

        const morning = () => {
        if (!data) return null;
    
        // 아침 카테고리에 해당하는 식단 필터링
        const morningDiet = data.filter(item => item.dietCategory === "아침");
    
        return (
            <View>
                {morningDiet.map(item => (
                    <TouchableOpacity
                        key={item.dietNo}
                        onPress={() => {
                            setSelectedDietNo(item.dietNo);
                            setModalVisible(true);
                        }}
                    >
                        {/* 아침 식단 출력 */}
                        <Text> {item.dietName} {item.totalKcal}Kcal{'\n'}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };
    
    const lunch = () => {
        if (!data) return null;
    
        const morningDiet = data.filter(item => item.dietCategory === "점심");
    
        return (
            <View>
                {morningDiet.map(item => (
                    <TouchableOpacity
                        key={item.dietNo}
                        onPress={() => {
                            setSelectedDietNo(item.dietNo);
                            setModalVisible(true);
                        }}
                    >
                        <Text>{item.dietName} {item.totalKcal}Kcal{'\n'}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const dinner = () => {
        if (!data) return null;
    
        const morningDiet = data.filter(item => item.dietCategory === "저녁");
    
        return (
            <View>
                {morningDiet.map(item => (
                    <TouchableOpacity
                        key={item.dietNo}
                        onPress={() => {
                            setSelectedDietNo(item.dietNo);
                            setModalVisible(true);
                        }}
                    >
                        <Text>{item.dietName} {item.totalKcal}Kcal{'\n'}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const other = () => {
        if (!data) return null;
    
        const morningDiet = data.filter(item => item.dietCategory === "기타");
    
        return (
            <View>
                {morningDiet.map(item => (
                    <TouchableOpacity
                        key={item.dietNo}
                        onPress={() => {
                            setSelectedDietNo(item.dietNo);
                            setModalVisible(true);
                        }}
                    >
                        <Text>{item.dietName} {item.totalKcal}Kcal{'\n'}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
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
            {/* 하루 칼로리 출력 */}
            <Text>오늘 칼로리: {totalCalories.toFixed(2)} Kcal / 3000 Kcal</Text>
            {/* 각 카테고리별 식단 출력 */}
            <View>
                <Text>아침</Text>
                {morning()}
                <Text style={{fontSize:18}}>점심</Text>
                {lunch()}
                <Text>저녁</Text>
                {dinner()}
                <Text>기타</Text>
                {other()}
            </View>
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

import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DietDetailPage from "./food/DietDetailPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {REACT_NATIVE_AXIOS_URL} from "@env";
import { Ionicons } from '@expo/vector-icons';
// 식단의 메인화면
const FoodFirst = () => {
    const { width, height } = Dimensions.get('window');
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
    const [avgKcal, setAvgKcal] = useState(0);

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
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userNo = await AsyncStorage.getItem('userNo');
                const getAvgKcal = await AsyncStorage.getItem('avgKcal');
                setAvgKcal(getAvgKcal);
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

    const getDietList = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const today = await AsyncStorage.getItem('today');
        const userNo = await AsyncStorage.getItem('userNo');
        console.log("userNo : ", userNo)
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
            console.log('response.data : ', response.data)
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

    // const renderData = () => {
    //     if (!data) return null;

    //     const results = [];
    //     for (const item of data) {
    //         const { dietNo, dietName, totalKcal, dietCategory } = item;

    //         results.push(
    //             <View style={styles.dietItems}>
    //                 <TouchableOpacity
    //                     key={dietNo}
    //                     onPress={() => {
    //                         setSelectedDietNo(dietNo);
    //                         setModalVisible(true);
    //                     }}
    //                 >
    //                     {/* 시작화면에 나오는 식단 출력 부분 */}
    //                     <View style={styles.dietItem}>
    //                         <Text style={styles.itemText}>{dietCategory}</Text>
    //                         <Text style={styles.itemText}>{dietName}</Text>
    //                         <Text style={styles.itemText}>{totalKcal}Kcal</Text>
    //                     </View>
                            
                            
                        
    //                 </TouchableOpacity>
    //             </View>
                
    //         );
    //     }

    //     return results;
    // };

    const closeModal = () => {
        setModalVisible(false);
        getDietList();
    }

    const morning = () => {
        if (!data) return null;

        console.log('morning : ', data)
    
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
                        <View style={styles.mealList}>
                            <Text style={styles.foodText}> {item.dietName} {item.totalKcal}Kcal{'\n'}</Text>
                        </View>
                        
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
                        <View style={styles.mealList}>
                            <Text style={styles.foodText}>{item.dietName} {item.totalKcal}Kcal{'\n'}</Text>
                        </View>
                        
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
                        <View style={styles.mealList}>
                            <Text style={styles.foodText}>{item.dietName} {item.totalKcal}Kcal{'\n'}</Text>
                        </View>
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
                        <View style={styles.mealList}>
                            <Text style={styles.foodText}>{item.dietName} {item.totalKcal}Kcal{'\n'}</Text>
                        </View>
                        
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <>
            <View style={{width: width}}>
                {/* add 누를시 검색화면으로 넘어감 */}
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
                            <Pressable onPress={() => setModalVisible(!modalVisible)} style={{position: 'absolute', bottom: Platform.OS === 'android' ? '10%' : '25%'}}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>닫기</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={styles.resultContainer}>
                    <View style={styles.kcalContainer}>
                        <Ionicons name="flame-outline" size={25} color='red' style={{marginVertical: 5}}/>
                        <Text style={styles.kcalText}>{totalCalories.toFixed(2)} Kcal / {avgKcal} Kcal</Text>
                    </View>
                    
                    {/* 각 카테고리별 식단 출력 */}
                    <View style={[styles.dietList, {height: Platform.OS === 'android' ? 490 : 450}]}>
                        <Text style={styles.mealText}><Ionicons name="restaurant-outline" size={20} color='#7ED957'/>  아침</Text>
                        <View style={styles.oneBorderLine}></View>
                            {morning()}
                        <Text style={styles.mealText}><Ionicons name="restaurant-outline" size={20} color='#FFA500'/>  점심</Text>
                        <View style={styles.oneBorderLine}></View>
                            {lunch()}
                        
                        <Text style={styles.mealText}><Ionicons name="restaurant-outline" size={20} color='#A9A9A9'/>  저녁</Text>
                        <View style={styles.oneBorderLine}></View>
                            {dinner()}
                        <Text style={styles.mealText}><Ionicons name="restaurant-outline" size={20} color='#FFD700'/>  기타</Text>
                        <View style={styles.oneBorderLine}></View>
                            {other()}
                    </View>
                </View>

            </View>
                {/* <TouchableOpacity onPress={page} style={styles.touch}><Ionicons name="add-circle-outline"  size={40} color='#03C75A'/></TouchableOpacity> */}

        </>
        
    )
}

export default FoodFirst;

const styles = StyleSheet.create({
    touch: {
        alignItems: 'flex-end',
        zIndex: 999,
    },
    resultContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    kcalContainer: {
        backgroundColor: '#005000',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 10
    },
    kcalText: {
        fontSize: 18,
        paddingBottom: 20,
        color: 'white'
    },
    mealList: {
        width: '90%',
        marginLeft: 20
    },
    mealText: {
        fontSize: 24,
        color: 'white'
    },
    foodText: {
        fontSize: 20,
        color: 'white'
    },
    dietList: {
        width: '90%',
        flexDirection: 'column',
        marginTop: 30,
    },
    // centeredView: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginTop: 22,
    // },
    oneBorderLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        opacity: 0.5,
        width: '100%',
        height: 1,
        marginVertical: 10
    },
    modalView: {
        marginTop: Platform.OS === 'android' ? '27%' : '41%',
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
    // button: {
    //     borderRadius: 20,
    //     padding: 10,
    //     elevation: 2,
    // },
    // buttonOpen: {
    //     backgroundColor: '#F194FF',
    // },
    // buttonClose: {
    //     backgroundColor: '#2196F3',
    // },
    // textStyle: {
    //     color: 'white',
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    // },
    
    // dietItems: {
    //     width: '100%',
    // },
    // dietItem: {
    //     width: '100%',
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     marginBottom: 15
    // },
    // itemText: {
    //     fontSize: 18,
    // },
    // resultContainer: {
    // },
    // dietList: {
    // }
})

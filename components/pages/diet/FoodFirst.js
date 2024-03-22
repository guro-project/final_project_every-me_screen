import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DietDetailPage from "./food/DietDetailPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// 식단의 메인화면
const FoodFirst = () => {
    const isFocused = useIsFocused();
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

    useEffect(() => {
        getDietList();
    }, [isFocused])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userNo = await AsyncStorage.getItem('userNo');
                if (userNo !== null) {
                    // console.log("userNo : " + userNo)
                    setUserNo(userNo);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    const getDietList = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const today = await AsyncStorage.getItem('today');
        const userNo = await AsyncStorage.getItem('userNo');
        // console.log("유저번호 : " + userNo)
        // console.log("날짜 : " + today)

        axios({
            method: 'GET',
            url: `http://192.168.0.64:8080/diet?userNo=${userNo}&date=${today}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        }).then(response => {
            setData(response.data)
            // console.log("데이터값")
            // console.log(response.data.dietCategory)
            // console.log(response.data)
        }).catch(error => {
            // console.error("조회 에러 : " + error)
            console.log(userNo)
            console.log(today)
        })
    }

    // 데이터가 객체로 되있어서 출력도 객체형식으로 나와서 데이터형식을 바꾼것
    const renderData = () => {
        if (!data) return;

        const results = [];
        for (const item of data) {
            const { dietNo, dietName, totalKcal, dietCategory } = item;

            results.push(
                <TouchableOpacity
                    key={dietNo}
                    onPress={() => {
                        setSelectedDietNo(dietNo);
                        setModalVisible(true);
                    }}
                >
                    {/* 시작화면에 나오는 식단 출력 부분 */}
                    <Text>{dietCategory} {dietName} {totalKcal}Kcal{'\n'}</Text>
                </TouchableOpacity>
            );
        }

        return results;
    };

    const closeModal = () => {
        setModalVisible(false);
        // navigation.navigate("CalendarView")
        getDietList();
    }


    return (
        <View>
            <Text>주간 달력 출력</Text>
            <Text>하루 총 영양성분 출력</Text>
            {/* add 누를시 검색화면으로 넘어감 */}
            <TouchableOpacity onPress={page} style={sytles.touch}><Text>add</Text></TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View>
                    <View style={sytles.modalView}>
                        {/* 상세정보 모달 */}
                        <DietDetailPage dietNo={selectedDietNo} onClose={closeModal}/>
                        <Pressable onPress={() => closeModal()}>
                            <Text>닫기</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
                {renderData()}
            </Pressable>
        </View>
    )
}

export default FoodFirst;

const sytles = StyleSheet.create({
    touch: {
        borderWidth: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        marginTop: '30%',
        backgroundColor: 'white',
        borderRadius: 20,
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
    }
})
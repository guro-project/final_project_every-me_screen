import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DietDetailPage from "./food/DietDetailPage";

const FoodFirst = ({ navigation }) => {
    const page = () => {
        navigation.navigate("IngredientsSearch");
        // console.log("클릭시 반응함?")
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState(null);
    const [dietNo, setDietNo] = useState(null);
    const [selectedDietNo, setSelectedDietNo] = useState(null);
    const route = useRoute();
    const dietName = route.params ? route.params.dietName : null;
    const selectedMethod = route.params ? route.params.selectedMethod : null;
    const totalCalories = route.params ? route.params.totalCalories : null;
    const totalCarbohydrate = route.params ? route.params.totalCarbohydrate : null;
    const totalProvince = route.params ? route.params.totalProvince : null;
    const totalProtein = route.params ? route.params.totalProtein : null;
    const totalSalt = route.params ? route.params.totalSalt : null;
    // const category = route.params ? route.params.category : null;
    // 식단에 등록된 결과가 나오는 부분인데 첫 화면과 같이 있어서 들어갈시 데이터가 없으므로 없을때 조건을 걸어줌

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

    const fetchData = () => {
        axios({
            method: 'GET',
            url: 'http://172.30.1.96:8080/diet',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJkYXRlIjoxNzEwMDUxMjU5NDg1LCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiVVNFUiIsInN1YiI6IkV2ZXJ5TWUgdG9rZW4gOiAzIiwiZXhwIjoxNzEwMTM3NjU5LCJ1c2VySWQiOiJ1c2VyMkB1c2VyMi5jb20ifQ.V5pbRLREWJLa14_z0HP8jJCvSmNlVLDYOA3IzT8KDEE`
            }
        })
            .then(response => {
                setData(response.data)
                // console.log("qwe")
                // console.log(response.data)
            })
            .catch(error => {
                console.error('Error data : ' + error);
            });
    }

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
                    <Text>{dietCategory} {dietName} {totalKcal}Kcal{'\n'}</Text>
                </TouchableOpacity>
            );
        }

        return results;
    };


    return (
        <View>
            <Text>주간 달력 출력</Text>
            <Text>하루 총 영양성분 출력</Text>
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
                        <DietDetailPage dietNo={selectedDietNo} />
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <Text>닫기</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
                {/* {dietName !== null && totalCalories !== null && selectedMethod !== null &&
                    <Text>{selectedMethod} 이름 : {dietName} 총 칼로리 : {totalCalories}Kcal</Text>} */}
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
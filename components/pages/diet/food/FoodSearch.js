import { useState } from "react";
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import IngredientsBasket from "../ingredients/IngredientsBasket";


// 완제품 검색페이지
const FoodSearch = () => {
    const [name, setName] = useState('');
    const [groupNames, setGroupNames] = useState([]); //여러 데이터를 담기위해 배열로 만듬
    const [clickedNames, setClickedNames] = useState([]);
    const [recommendedNames, setRecommendedNames] = useState([]);
    const [food, setFood] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [oneLetterModal, setOneLetterModal] = useState(false);
    const navigation = useNavigation();

    const FindGroupName = () => {
        if (name.trim() === "") {
            setOneLetterModal(true)
        }
        const apiUrl = `http://openapi.foodsafetykorea.go.kr/api/0e28c65abe314f1c9981/I2790/json/1/3/DESC_KOR=${name}`

        fetch(apiUrl) // api에 요청보냄
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data && data.I2790 && data.I2790.row && data.I2790.row.length > 0) { // 검색한 데이터가 존재할시
                    const sortedRows = data.I2790.row.sort((a, b) => a.DESC_KOR.length - b.DESC_KOR.length); // 나온 리스트들의 이름을 길이순으로 비교해서 짧은 순부터 나열
                    const names = sortedRows.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1} ${item.NUTR_CONT2} ${item.NUTR_CONT3} ${item.NUTR_CONT4} ${item.NUTR_CONT6}`); // 리스트 뽑는 곳                     
                    setGroupNames(sortedRows);

                } else { // 검색한 data가 존재하지 않을시
                    setIsModalVisible(true);
                }
            });
    }

    // 요청 보내는 곳
    const OnChangeHandler = (text) => {
        setName(text);
    };

    // 나온 리스트 클릭시 데이터 재료박스에 전달해줌
    const ListClickHandler = (clickedItem) => {
        console.log("전달 한 값 확인")
        console.log(clickedItem);

        if (!clickedNames.some(item => item.DESC_KOR === clickedItem.DESC_KOR)) {
            // 중복된 항목이 없을 때만 추가
            setClickedNames(prevClickedNames => [...prevClickedNames, clickedItem]);
        }
    };

    // RegistFood 페이지로 clickedNames 데이터 들고감
    const handleRegistration = () => {
        navigation.navigate("RegistFood", { selectedIngredients: clickedNames });
        // console.log("clickedNames : ", clickedNames);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <View style={{ borderBottomWidth: 2, borderBlockColor: "blue" }}>
                <IngredientsBasket clickedNames={clickedNames} setClickedNames={setClickedNames} recommendedNames={recommendedNames} setRecommendedNames={setRecommendedNames} />
                {/* 재료박스에 담는 곳 */}
            </View>
            <View >
                <TextInput onChangeText={OnChangeHandler} placeholder="재료 입력"
                    keyboardType="default" value={name} />
                <TouchableOpacity onPress={FindGroupName} style={sytles.TouchableBorder}><Text>검색</Text></TouchableOpacity>
                {/* <Text>{name}</Text> */}
                {/* groupNames의 길이가 0보다 클때 실행
                    keyExtractor : 각각의 키를 만들어줘서 react-natvie가 FlatList를 관리하기 쉽게 해줌
                */}
                {groupNames.length > 0 ? (
                    <FlatList
                        data={groupNames}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => ListClickHandler(item)}>
                                <Text style={sytles.listMargin}>{item.DESC_KOR} {item.NUTR_CONT1}Kcal</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : null}
                <View style={{ borderTopWidth: 2, borderBlockColor: "blue" }}>
                    <TouchableOpacity onPress={handleRegistration} style={sytles.TouchableBorder}>
                        <Text>다음</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* 검색 결과가 없을 때 모달 */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible || oneLetterModal}
                onRequestClose={() => {
                    setIsModalVisible(false);
                    setOneLetterModal(false);
                }}>
                <View style={sytles.modalView}>
                    {oneLetterModal ? (
                        <Text>한글자 이상을 검색해주세요</Text>
                    ) : (
                        <Text>검색결과 없음</Text>
                    )}
                    <Pressable
                        onPress={() => {
                            setIsModalVisible(false);
                            setOneLetterModal(false);
                        }}>
                        <Text>닫기</Text>
                    </Pressable>
                </View>
            </Modal>
        </>
    )
};

export default FoodSearch;

const sytles = StyleSheet.create({
    TouchableBorder: {
        borderWidth: 1,
        marginBottom: 5,
        marginTop: 5,
        width: 30
    },
    listMargin: {
        marginTop: 2,
        marginBottom: 2
    },
    modalView: {
        marginTop: '30%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000', // 그림자 색깔
        shadowOffset: { // 그림자 위치
            width: 0, // 가로 0
            height: 2, // 세로 2
        },
        shadowOpacity: 0.25, // 그림자 불투명도 클수록 진해짐
        shadowRadius: 4, // 그림자 반경 클수록 퍼져서 흐릿해짐
        elevation: 5, // 안드로이드에서만 적용됨 그림자의 높이
        width: '100%',
        height: '90%',
    }
})
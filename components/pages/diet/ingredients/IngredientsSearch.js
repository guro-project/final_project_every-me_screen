import { useState } from "react";
import { Alert, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import IngredientsBasket from "./IngredientsBasket";
import RecommendFood from "./RecommendButton";
import FoodItemComponent from "../../../../model/api/FoodItemList";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';


// 검색페이지
const IngredientsSearch = () => {
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
        let apiUrl = `http://openapi.foodsafetykorea.go.kr/api/0e28c65abe314f1c9981/I2790/json/1/3/DESC_KOR=${name}`;
        if (name.trim() !== "") {
            apiUrl += ",";
        }

        fetch(apiUrl) // api에 요청보냄
            .then(response => response.json())
            .then(data => {
                if (data && data.I2790 && data.I2790.row && data.I2790.row.length > 0) { // 검색한 데이터가 존재할시
                    const sortedRows = data.I2790.row.sort((a, b) => a.DESC_KOR.length - b.DESC_KOR.length); // 나온 리스트들의 이름을 길이순으로 비교해서 짧은 순부터 나열
                    const names = sortedRows.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1} ${item.NUTR_CONT2} ${item.NUTR_CONT3} ${item.NUTR_CONT4} ${item.NUTR_CONT6}`); // 리스트 뽑는 곳                     
                    setGroupNames(sortedRows);

                } else { // 검색한 data가 존재하지 않을시
                    const updatedName = apiUrl.slice(0, -1); // 맨끝자리를 빼고 재요청
                    // 기존에는 전송할때 ,를 붙이는 방식이였는데 맨끝자리를 빼면 입력한 값에서 끝자리를 뺀거라 정확하게 요청이 안들어가서 url을 하나의 변수로 만듬
                    console.log(updatedName)
                    console.log("재검색")
                    fetch(updatedName)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            if (data && data.I2790 && data.I2790.row && data.I2790.row.length > 0) {
                                const sortedRows = data.I2790.row.sort((a, b) => a.DESC_KOR.length - b.DESC_KOR.length);
                                const names = sortedRows.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1} ${item.NUTR_CONT2} ${item.NUTR_CONT3} ${item.NUTR_CONT4} ${item.NUTR_CONT6}`);
                                setGroupNames(sortedRows);
                            } else {
                                setIsModalVisible(true);
                            }
                        });
                }
            });
    }

    // console.log("@@@@@@@@@@@@@@@@@@@")
    // console.log(groupNames)

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


    // TouchableOpacity 클릭시 재료박스에 담는 곳
    const handleRecommendations = (recommendedName) => {
        console.log("버튼 전달 값")
        if (!clickedNames.includes(recommendedName)) {
            setClickedNames(prevClickedNames => [...prevClickedNames, recommendedName]);
            console.log(recommendedName)
        }
    };

    // RegistFood 페이지로 clickedNames 데이터 들고감
    const handleRegistration = () => {
        navigation.navigate("RegistFood", { selectedIngredients: clickedNames });
        // console.log("clickedNames : ", clickedNames);
    };

    // 카테고리 데이터 받아왔나 확인
    // const route = useRoute()
    // const category = route.params
    // console.log("카테고리 받아왔나?")
    // console.log(category);

    // 스킵버튼
    // const skipIngre = () => {
    //     navigation.navigate("RegistFood")
    // }

    // 검색 시 리스트가 출력되고 리스트 된 것들을 누르면 바구니에 담긴다
    // 바구니에 담긴 데이터를 수량 조절 페이지로 보냄
    // 이때 전달되는 데이터는 ("이름 " + item.DESC_KOR + " 칼로리 : " + item.NUTR_CONT1)의 문자열인 배열형태
    // 이렇게 전달되면 문제점 : 원하는것을 꺼낼려면 문자열을 잘라서 써야되는데 변수가 많이생김
    // 화면상의 출력은 이름과 칼로리만 출력하되 출력하는건 모든 데이터가 다 담긴 객체형태로 보내기

    return (
        <SafeAreaView style={styles.safeArea}>
            <View >
                <IngredientsBasket clickedNames={clickedNames} setClickedNames={setClickedNames} recommendedNames={recommendedNames} setRecommendedNames={setRecommendedNames} />
                {/* 재료박스에 담는 곳 */}
            </View>
            <View >
                <Text style={{color: 'white', marginTop: 10, marginLeft: 10, fontSize: 17}}>추천 재료</Text>
                <RecommendFood food={food} onButtonClicked={handleRecommendations} />
                {/* 추천버튼 눌렀을 시 */}
            </View>
            <View style={styles.oneBorderLine}></View>
            <View >
                <View style={{display:'flex', flexDirection: 'row'}}>
                    <TextInput onChangeText={OnChangeHandler} placeholder="재료 입력" placeholderTextColor='gray' style={styles.textInput}
                        keyboardType="default" value={name} />
                    <TouchableOpacity onPress={FindGroupName} style={styles.TouchableBorder}><Ionicons name="search-circle-outline" size={35} color='white'/></TouchableOpacity>
                </View>
                
                {/* <Text>{name}</Text> */}
                {/* groupNames의 길이가 0보다 클때 실행
                    keyExtractor : 각각의 키를 만들어줘서 react-natvie가 FlatList를 관리하기 쉽게 해줌
                */}
                {groupNames.length > 0 ? (
                    <FlatList
                        data={groupNames}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => ListClickHandler(item)}>
                                <Text style={styles.listMargin}>{item.DESC_KOR}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : null}
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <TouchableOpacity onPress={handleRegistration} style={styles.TouchableBorder1}>
                        <Text style={{color:'white'}}>다음</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible || oneLetterModal}
                    onRequestClose={() => {
                        setIsModalVisible(false);
                        setOneLetterModal(false);
                    }}>
                    <View style={styles.modalView}>
                        {oneLetterModal ? (
                            <Text style={{fontSize: 15, marginTop: 50}}>한글자 이상을 검색해주세요</Text>
                        ) : (
                            <Text style={{fontSize: 15, marginTop: 50}}>검색결과 없음</Text>
                        )}
                        <Pressable
                            onPress={() => {
                                setIsModalVisible(false);
                                setOneLetterModal(false);
                            }}>
                            <Text style={{position:'absolute', bottom:-60, left: -10}}>닫기</Text>
                        </Pressable>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
};

export default IngredientsSearch;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
        paddingTop: Platform.OS === 'android' ? 50 : 0,
    },
    TouchableBorder: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 18,
        height: 60,
    },
    TouchableBorder1: {
        borderColor: 'white',
        borderWidth: 1,
        height: 40,
        width: '20%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listMargin: {
        marginTop: 5,
        marginBottom: 7,
        marginLeft: 15,
        fontSize: 18,
        color: 'white',
    },
    modalView: {
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
        width: '60%',
        height: '20%',
        position: 'absolute',
        left: '20%',
        top: '35%',
    },
    oneBorderLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        opacity: 0.5,
        width: '100%',
        height: 1,
    },
    textInput: {
        width: '80%',
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        fontSize: 15,
        marginTop: 30,
        marginLeft: 15,
        color: 'white',
    }
})
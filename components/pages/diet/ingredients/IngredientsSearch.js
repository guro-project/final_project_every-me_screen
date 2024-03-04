import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import IngredientsBasket from "./IngredientsBasket";
import RecommendFood from "./RecommendButton";
import FoodItemComponent from "../../../../model/api/FoodItemList";
import { useNavigation, useRoute } from "@react-navigation/native";


// 검색페이지
const IngredientsSearch = () => {
    const [name, setName] = useState('');
    const [groupNames, setGroupNames] = useState([]); //여러 데이터를 담기위해 배열로 만듬
    const [clickedNames, setClickedNames] = useState([]);
    const [onButtonClicked, setOnButtonClicked] = useState();
    const [recommendedNames, setRecommendedNames] = useState([]);
    const [food,setFood] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [customIngreName,setCustomIngreName] = useState('');
    const [customIngreKcal,setCustomIngreKcal] = useState('');
    const navigation = useNavigation();

    const FindGroupName = () => {
        const apiUrl = `http://openapi.foodsafetykorea.go.kr/api/0e28c65abe314f1c9981/I2790/json/1/20/DESC_KOR=${name},`
        //사용하는 오픈 api가 ,를 붙여야 재료가 그나마 우선순위로 나와서 붙임

        fetch(apiUrl) // api에 요청보냄
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data && data.I2790 && data.I2790.row && data.I2790.row.length > 0) { // 검색한 데이터가 존재할시
                    const sortedRows = data.I2790.row.sort((a, b) => a.DESC_KOR.length - b.DESC_KOR.length); // 나온 리스트들의 이름을 길이순으로 비교해서 짧은 순부터 나열
                    const names = sortedRows.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1} ${item.NUTR_CONT2} ${item.NUTR_CONT3} ${item.NUTR_CONT4} ${item.NUTR_CONT6}`); // 리스트 뽑는 곳                     
                    console.log("======================================================================")
                    console.log("순서바뀐 목록");
                    console.log(names)
                    console.log("======================================================================")
                    setGroupNames(names);
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
                                // const items = data.I2790.row;
                                // const names = items.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1} ${"탄수화물 : " + item.NUTR_CONT2} ${"단백질 : " + item.NUTR_CONT3} ${"지방 : " + item.NUTR_CONT4} ${"나트륨 : " + item.NUTR_CONT6}`);

                                // console.log(names)
                                // setGroupNames(names);
                                const sortedRows = data.I2790.row.sort((a, b) => a.DESC_KOR.length - b.DESC_KOR.length);
                                const names = sortedRows.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1} ${item.NUTR_CONT2} ${item.NUTR_CONT3} ${item.NUTR_CONT4} ${item.NUTR_CONT6}`);
                                console.log("======================================================================")
                                console.log("순서바뀐 목록");
                                console.log(names)
                                console.log("======================================================================")
                                setGroupNames(names);
                            }
                        });
                }
            });
    }

    // 요청 보내는 곳
    const OnChangeHandler = (text) => {
        setName(text);
    };

    // 리스트 클릭시 재료박스에 담는 곳
    const ListClickHandler = (clickedName) => {
        console.log(clickedName);
        if (!clickedNames.includes(clickedName)) {
            // includes : 중복체크
            // 만약 클릭한 clikedName이 존재하지 않으면 재료박스에 넣어주고 존재하면 넣지 않아서 같은 데이터가 중복으로 들어가는걸 막아줌
        setClickedNames(prevClickedNames => [...prevClickedNames, clickedName]);
    }
    };

    // TouchableOpacity 클릭시 재료박스에 담는 곳
    const handleRecommendations = (recommendedName) => {
        console.log("데이터 전송 성공")
        if (!clickedNames.includes(recommendedName)) {
            setClickedNames(prevClickedNames => [...prevClickedNames, recommendedName]);
        }
    };

    const handleRegistration = () => {
        // 등록 버튼을 눌렀을 때 실행되는 로직
        // 선택한 재료들을 가지고 DetailIngredients 페이지로 이동
        navigation.navigate("DetailIngredients", { selectedIngredients: clickedNames, category : category });
    };

    // 카테고리 데이터 받아왔나 확인
    const route = useRoute()
    const category = route.params
    console.log("카테고리 받아왔나?")
    console.log(category);

    // 직접입력 칸
    const handlerCustomIngre = () => {
        if (customIngreName.trim() !== '' && customIngreKcal.trim() !== '') {
            const newIngredient = `이름 : ${customIngreName} 칼로리 : ${customIngreKcal}`;
    
            // 클릭된 재료 목록에 새로운 재료가 포함되어 있는지 확인
            if (!clickedNames.includes(newIngredient)) {
                // 포함되어 있지 않다면 새로운 재료를 클릭된 재료 목록에 추가
                setClickedNames(prevClickedNames => [...prevClickedNames, newIngredient]);
            }
    
            // 입력값 초기화
            setCustomIngreName('');
            setCustomIngreKcal('');
            console.log("직접입력 : " + newIngredient);
        }
    }

    return (
        <>
            <View>
                <IngredientsBasket clickedNames={clickedNames} setClickedNames={setClickedNames} recommendedNames={recommendedNames} setRecommendedNames={setRecommendedNames}/>
                {/* 재료박스에 담는 곳 */}
            </View>
            <View>
                <Text>추천 재료</Text>
                <RecommendFood food={food} onButtonClicked={handleRecommendations} />
                {/* 추천버튼 눌렀을 시 */}
            </View>
            <View>
                <Text>직접 입력</Text>
                <TextInput placeholder="재료 이름" value={customIngreName} onChangeText={text => setCustomIngreName(text)}/>
                <TextInput placeholder="재료 칼로리" value={customIngreKcal} onChangeText={text => setCustomIngreKcal(text)}/>
                <TouchableOpacity onPress={handlerCustomIngre}><Text>커스텀재료 등록</Text></TouchableOpacity>
            </View>
            <View>
                <Text>재료 검색</Text>
                <TextInput onChangeText={OnChangeHandler} placeholder="재료 입력"
                    keyboardType="default" value={name} />
                <TouchableOpacity onPress={FindGroupName}><Text>검색</Text></TouchableOpacity>
                <Text>{name}</Text>
                {/* groupNames의 길이가 0보다 클때 실행
                    keyExtractor : 각각의 키를 만들어줘서 react-natvie가 FlatList를 관리하기 쉽게 해줌
                */}
                {groupNames.length > 0 ? (
                    <FlatList
                        data={groupNames}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => ListClickHandler(item)}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : null}
                <TouchableOpacity onPress={handleRegistration}>
                    <Text>등록</Text>
                </TouchableOpacity>
            </View>
        </>
    )
};

export default IngredientsSearch;
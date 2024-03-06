import { useRoute } from "@react-navigation/native"
import { useState } from "react"
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
// 완제품 검색방법 검색시 나온 데이터중 GROUP_NAME이 빈칸인 데이터를 우선으로 보여준다 버블티 검색시 완제품이지만 빙과류인 애들도 나옴
const FoodSearch = ({navigation}) => {
    const route = useRoute()
    const category = route.params
    const [name, setName] = useState('');
    const [groupNames, setGroupNames] = useState([]);

    console.log("카테고리 받아왔나?")
    console.log(category)

    const FindGroupName = () => {
        const apiUrl = `http://openapi.foodsafetykorea.go.kr/api/0e28c65abe314f1c9981/I2790/json/1/20/DESC_KOR=${name}`
        //사용하는 오픈 api가 ,를 붙여야 재료가 그나마 우선순위로 나와서 붙임

        fetch(apiUrl) // api에 요청보냄
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data && data.I2790 && data.I2790.row && data.I2790.row.length > 0) { // 검색한 데이터가 존재할시
                    const sortedRows = data.I2790.row.sort((a, b) => a.DESC_KOR.length - b.DESC_KOR.length); // 나온 리스트들의 이름을 길이순으로 비교해서 짧은 순부터 나열
                    const names = sortedRows.map(item => `${"이름 : " + item.DESC_KOR} ${"칼로리 : " + item.NUTR_CONT1} ${"그룹네임 : " + item.GROUP_NAME}`); // 리스트 뽑는 곳                     
                    console.log("======================================================================")
                    console.log(names)
                    console.log("======================================================================")
                    setGroupNames(names);
                }
            });
    }

    // 요청 보내는 곳
    const OnChangeHandler = (text) => {
        setName(text);
    };

    const page = () => {
        navigation.navigate("DetailFood", category)
    }

    return(
        <View>
            <Text>음식 검색</Text>
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
            <TouchableOpacity onPress={page}>
                <Text>이동</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FoodSearch;
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

//검색란 검색결과창 선택한음식 다음페이지로전송
const FoodSearch = ({navigation}) => {
    const [name,setName] = useState('');
    const [foodName,setFoodName] = useState([]);
    const [clickedNames,setClickedNames] = useState([]);
    const [remove,setRemove] = useState('');
    
    // 검색창을 만든다
    // 검색한 이름 요청을 보낸다
    // api에서 요청한 데이터를 부른다
    // api에서 검색한 검색결과를 리스트로 출력한다
    // 리스트를 클릭할 시 화면에 출력한다 중복안됨 
    // 선택한 리스트에는 삭제버튼을 붙인다
    // 다음을 누르면 선택한 데이터를 담아서 보낸다


    // api 불러오기
    const findFoodName = () => {
        fetch(`http://openapi.foodsafetykorea.go.kr/api/0e28c65abe314f1c9981/I2790/json/1/3/DESC_KOR=${name}`)
        .then(response => response.json())
            .then(data => {
                console.log(data)
                const sortedRows = data.I2790.row.sort((a, b) => a.DESC_KOR.length - b.DESC_KOR.length);
                const listNames = sortedRows.map(item => (`${"이름 : " + item.DESC_KOR} + ${"칼로리 : " + item.NUTR_CONT1}`))
                setFoodName(sortedRows);
                console.log(sortedRows);
                console.log(listNames)
        })
    }

    // 요청 보내기
    const onChangeHandler = (text) => {
        setName(text)
    }

    // 출력한 리스트 선택하기
    const ListClickHandler = (clickedName) => {
        console.log("전달 한 값 확인")
        console.log(clickedName);
        if (!clickedNames.includes(clickedName)) {
            setClickedNames(prevClickedNames => [...prevClickedNames, clickedName]);
        }
    };

    // 클릭한 항목 삭제하기
    const removeItem = (itemName) => {
        setClickedNames(prevClickedNames => prevClickedNames.filter(item => item !== itemName));
    };

    // 데이터 보내기
    const page = () => {
        navigation.navigate("DetailFood", {clickedNames : clickedNames})
        console.log("데이터 확인")
        console.log(clickedNames)
    }

    return(
        <View>
            <Text>음식 검색</Text>
            <FlatList
                data={clickedNames}
                renderItem={({ item }) => (
                    <View style={styles.clickedItem}>
                        <Text>{item}</Text>
                        <TouchableOpacity onPress={() => removeItem(item)}>
                            <Text>삭제</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TextInput placeholder="음식 이름 입력" onChangeText={onChangeHandler} value={name}/>
                {foodName.length > 0 ? (
                    <FlatList
                        data={foodName}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => ListClickHandler("이름 " + item.DESC_KOR + " 칼로리 : " + item.NUTR_CONT1)}>
                                <Text>이름 : {item.DESC_KOR} 칼로리 : {item.NUTR_CONT1}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : null}
            <TouchableOpacity onPress={findFoodName} style={styles.touch}>
                <Text>검색</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={page} style={styles.touch}>
                <Text>다음</Text>
            </TouchableOpacity>
        </View>
    )

}
export default FoodSearch;

const styles = StyleSheet.create({
    touch:{
        borderWidth:1
    }
})
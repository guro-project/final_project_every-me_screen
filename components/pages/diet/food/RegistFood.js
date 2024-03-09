import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const RegistFood = ({ navigation }) => {
    const [dietName, setDietName] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [ingredients, setIngredients] = useState([]);
    const methods = ["아침", "점심", "저녁", "기타"];
    const [quantities, setQuantities] = useState([]);
    const [userId,setUserId] = useState('');

    const route = useRoute();
    const selectedIngredients = route.params;

    const selectedFood = selectedIngredients.selectedIngredients[0]; // 첫 번째 요소 선택
    const foodName = selectedFood ? selectedFood.DESC_KOR : ''; // 이름 가져오기

    // NUTR_CONT1 값 상수화 및 출력
    const parsedNUTR_CONT1 = selectedFood ? parseFloat(selectedFood.NUTR_CONT1) : 0;
    const parsedNUTR_CONT2 = selectedFood ? parseFloat(selectedFood.NUTR_CONT2) : 0;
    const parsedNUTR_CONT3 = selectedFood ? parseFloat(selectedFood.NUTR_CONT3) : 0;
    const parsedNUTR_CONT4 = selectedFood ? parseFloat(selectedFood.NUTR_CONT4) : 0;
    const parsedNUTR_CONT6 = selectedFood ? parseFloat(selectedFood.NUTR_CONT6) : 0;

    useEffect(() => {
        if (selectedIngredients && selectedIngredients.selectedIngredients) {
            // 선택된 재료가 존재할 때만 수량 배열 초기화
            setQuantities(selectedIngredients.selectedIngredients.map(() => 1));
        }
    }, [selectedIngredients]);

    // + 버튼을 누를 때 수량 증가
    const increaseQuantity = (index) => {
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] += 0.5; // 해당 인덱스의 수량을 0.5 증가
            return newQuantities;
        });
    };

    // - 버튼을 누를 때 수량 감소 (최소 수량은 0.5)
    const decreaseQuantity = (index) => {
        if (quantities[index] > 0.5) { // 0.5 이상일 때만 감소하도록 조건 추가
            setQuantities(prevQuantities => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] -= 0.5; // 해당 인덱스의 수량을 0.5 감소
                return newQuantities;
            });
        }
    };

    // 총합 칼로리 계산
    const totalCalories = selectedIngredients.selectedIngredients.reduce((total, ingredient, index) => {
        const calorie = parseFloat(ingredient.NUTR_CONT1) * quantities[index];
        return total + calorie;
    }, 0);

    // console.log(totalCalories)

    const totalCarbohydrate = selectedIngredients.selectedIngredients.reduce((total, ingredient, index) => {
        const carbohydrate = parseFloat(ingredient.NUTR_CONT2) * quantities[index];
        return total + carbohydrate;
    }, 0);

    // console.log(totalCarbohydrate)

    const totalProtein = selectedIngredients.selectedIngredients.reduce((total, ingredient, index) => {
        const protein = parseFloat(ingredient.NUTR_CONT3) * quantities[index];
        return total + protein;
    }, 0);

    const totalProvince = selectedIngredients.selectedIngredients.reduce((total, ingredient, index) => {
        const province = parseFloat(ingredient.NUTR_CONT4) * quantities[index];
        return total + province;
    }, 0);

    const totalSalt = selectedIngredients.selectedIngredients.reduce((total, ingredient, index) => {
        const salt = parseFloat(ingredient.NUTR_CONT6) * quantities[index];
        return total + salt;
    }, 0);

    const searchPage = () => {
        navigation.navigate("FoodSearch")
    }

    const firstPage = () => {
        // 식단이름과 칼로리 스테이트
        let dietData = JSON.stringify({
            'dietName': dietName,
            'totalKcal': totalCalories,
            'userId' : userId
        });

        console.log("뭐받음?")
        console.log(dietName)
        console.log(totalCalories)
        console.log(userId)
    
        axios({
            method: 'POST',
            url: 'http://172.30.1.96:8080/registdiet',
            data: dietData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJkYXRlIjoxNzA5OTYzODc4NjkyLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiVVNFUiIsInN1YiI6IkV2ZXJ5TWUgdG9rZW4gOiAyIiwiZXhwIjoxNzEwMDUwMjc4LCJ1c2VySWQiOiJ1c2VyMUB1c2VyMS5jb20ifQ.7PXDcn43NUP4hqCeLf0Fajx4s2uSAquhSD2hpnGieH0`
            }
        }).then(response => {
            console.log("요청 성공")
            console.log(response)
            if (response.status === 200) {
                navigation.navigate('FoodFirst');
                console.log(response.data)
            } else {
                alert('값 확인');
            }
        }).catch(error => {
            console.log("에러")
            console.log(error);
            alert('에러발생')
        });
    }

    // 받아온 데이터에서 이름 분리해서 왼쪽에넣고 오른쪽엔 칼로리와 수량 + - 버튼 출력
    // + - 를 누르면 수량이랑 칼 탄 단 지 나가 0.5배씩 증가 또는 감소한다
    // 탄 단 지 나는 화면상에는 출력되지 않지만 데이터는 계산되어야한다
    // 밑에는 계산된 최종칼로리가 나옴

    // 내가 하려는 것
    // 재료 혹은 음식 검색을 하고 담은 후에



    return (
        <>
            <View>
                <TextInput placeholder="식단 이름을 정해주세요" value={dietName} onChangeText={(text) => setDietName(text)} />
                <View style={styles.receiptMethods}>
                    {methods.map((method, index) => {
                        return (
                            <View key={index} style={styles.receiptMethod}>
                                <BouncyCheckbox
                                    key={method}
                                    unfillColor="#FFFFFF" //선택되지 않은 선택박스의 색
                                    fillColor="#020715" // 선택된 선택 박스의 색
                                    iconStyle={{ // 체크박스 아이콘에 적용되는 스타일
                                        width: 50,
                                        height: 50,
                                        borderRadius: 20,
                                        borderColor: "black",
                                    }}
                                    disableBuiltInState={true} //true로 사용시 체크박스 내부 상태 변화 애니메이션을 사용하지 않고 외부에서 상태관리를 할 수 있음
                                    // 여기선 isSelected로 사용중이라 ture로 설정되었음
                                    isChecked={method === selectedMethod} // 선택된 끼니에 대해 체크 여부 설정
                                    onPress={() => setSelectedMethod(method)} // 체크박스를 누를 때 선택된 끼니 업데이트
                                />
                                <Text>
                                    {method === "아침" ? "아침" : null}
                                    {method === "점심" ? "점심" : null}
                                    {method === "저녁" ? "저녁" : null}
                                    {method === "기타" ? "기타" : null}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                <Text>이미지 등록</Text>

                <TouchableOpacity onPress={firstPage} style={styles.touch}>
                    <Text>식단 업로드</Text>
                </TouchableOpacity>
                <Text>=============================</Text>
                <TouchableOpacity onPress={searchPage} style={styles.touch}>
                    <Text>음식 검색페이지로 이동</Text>
                </TouchableOpacity>

                <Text>=============================</Text>
                {selectedIngredients.selectedIngredients.map((ingredient, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>
                            {`${ingredient.DESC_KOR} ${(parseFloat(ingredient.NUTR_CONT1) * quantities[index]).toFixed(2)}Kcal`}
                            <Text style={{ color: 'white', fontSize: 4 }}>
                                {`${(parseFloat(ingredient.NUTR_CONT2) * quantities[index]).toFixed(2)} ${(parseFloat(ingredient.NUTR_CONT3) * quantities[index]).toFixed(2)} ${(parseFloat(ingredient.NUTR_CONT4) * quantities[index]).toFixed(2)} ${(parseFloat(ingredient.NUTR_CONT6) * quantities[index]).toFixed(2)}`}</Text>
                        </Text>
                        <Text style={{ marginLeft: 10, marginRight: 10 }} >{quantities[index]}개</Text>
                        <TouchableOpacity onPress={() => increaseQuantity(index)} style={{ marginLeft: 10, marginRight: 10, borderWidth: 1 }}><Text style={{ fontSize: 20 }}>+</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => decreaseQuantity(index)} style={{ marginLeft: 10, marginRight: 10, borderWidth: 1 }}><Text style={{ fontSize: 20 }}>-</Text></TouchableOpacity>
                    </View>
                ))}
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>총합 칼로리: {totalCalories.toFixed(2)} Kcal</Text>
                <Text style={{ color: 'white', fontSize: 4 }}>{totalCarbohydrate.toFixed(2)} {totalProtein.toFixed(2)} {totalProvince.toFixed(2)} {totalSalt.toFixed(2)}</Text>
            </View>
        </>
    );
};

export default RegistFood;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    receiptMethods: {
        flexDirection: 'row', // 체크박스를 가로로 나열하기 위해 설정
        alignItems: 'center', // 세로 가운데 정렬
        justifyContent: 'space-around', // 가로 여백을 균일하게 배분
    },
    receiptMethod: {
        flexDirection: 'row', // 아이콘과 텍스트를 가로로 나열
        alignItems: 'center', // 가운데 정렬
        marginRight: 20, // 우측 여백
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 8,
    },
    touch: {
        borderWidth: 1
    }
});
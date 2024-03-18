import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from 'expo-image-picker';

// 식단 등록하는 페이지
const RegistFood = ({ navigation }) => {
    const [dietName, setDietName] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [ingredients, setIngredients] = useState([]);
    const methods = ["아침", "점심", "저녁", "기타"];
    const [quantities, setQuantities] = useState([]); // 수량
    const [userNo, setUserNo] = useState('');
    const [dietNo,setDietNo] = useState('');

    const [totalCalories, setTotalCalories] = useState(0);
    const [totalCarbohydrate, setTotalCarbohydrate] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalProvince, setTotalProvince] = useState(0);
    const [totalSalt, setTotalSalt] = useState(0);
    // const [ingredientName,setIngredientName] = useState([]); // 재료이름들

    const route = useRoute();
    const selectedIngredients = route.params;

    const selectedFood = selectedIngredients.selectedIngredients[0]; // 첫 번째 요소 선택
    const foodName = selectedFood ? selectedFood.DESC_KOR : ''; // 이름 가져오기

    // NUTR_CONT1,2,3,4,6 값 상수화 및 출력
    // 원래 타입이 String 형식이라서 계산이 불가능해서 실수형으로 바꿔줌
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

    useEffect(() => {
        const fetchUserNo = async () => {
            try {
                const userNo = await AsyncStorage.getItem('userNo');
                if (userNo !== null) {
                    setUserNo(userNo);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserNo();
    }, []);

    // +를 누르면 기본값의 0.5배의 값이 증가하고 -를 누르면 기본값의 0.5 배의 값이 감소한다

    // + 버튼을 누를 때 수량 증가
    const increaseQuantity = (index) => {
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] += 0.5;

            // 실시간 계산인데 값이 이상하게 나와서 주석처리 하고 계산하기 버튼 눌렀을시 계산 되는식으로 일단 바꿨음

            // // 총합 칼로리를 갱신하는 데 사용될 임시 변수 초기화
            // let tempTotalCalories = 0;

            // // 각 항목의 칼로리 계산 및 총합 칼로리 갱신
            // selectedIngredients.selectedIngredients.forEach((ingredient, i) => {
            //     const calorie = parseFloat(ingredient.NUTR_CONT1) * newQuantities[i];
            //     tempTotalCalories += calorie;
            // });

            // // 총합 칼로리 업데이트
            // setTotalCalories(parseFloat(tempTotalCalories.toFixed(2)));

            // 탄수화물, 단백질, 지방, 나트륨 계산
            // 탄 단 지 나 는 화면에 출력은 안되지만 + -버튼을 누르면 계산해줌
            const ingredient = selectedIngredients.selectedIngredients[index];
            const carbohydrate = parseFloat((ingredient.NUTR_CONT2) * newQuantities[index].toFixed(2));
            const protein = parseFloat((ingredient.NUTR_CONT3) * newQuantities[index].toFixed(2));
            const province = parseFloat((ingredient.NUTR_CONT4) * newQuantities[index].toFixed(2));
            const salt = parseFloat((ingredient.NUTR_CONT6) * newQuantities[index].toFixed(2));

            // 각 상태 변수 업데이트 얘도 실시간 계산인데 이상해서 주석처리 해놨음
            // setTotalCarbohydrate(prev => prev + carbohydrate);
            // setTotalProtein(prev => prev + protein);
            // setTotalProvince(prev => prev + province);
            // setTotalSalt(prev => prev + salt);

            // console.log("+")
            // console.log(ingredient)
            // console.log(carbohydrate)
            // console.log(protein)
            // console.log(province)
            // console.log(salt)

            // `NaN` 체크 및 0으로 변경
            if (isNaN(carbohydrate)) {
                setTotalCarbohydrate(prev => prev);
            } else {
                setTotalCarbohydrate(prev => prev + carbohydrate);
            }

            if (isNaN(protein)) {
                setTotalProtein(prev => prev);
            } else {
                setTotalProtein(prev => prev + protein);
            }

            if (isNaN(province)) {
                setTotalProvince(prev => prev);
            } else {
                setTotalProvince(prev => prev + province);
            }

            if (isNaN(salt)) {
                setTotalSalt(prev => prev);
            } else {
                setTotalSalt(prev => prev + salt);
            }

            return newQuantities;
        });
    };

    // - 버튼을 누를 때 수량 감소 (최소 수량은 0.5)
    const decreaseQuantity = (index) => {
        if (quantities[index] > 0.5) {
            setQuantities(prevQuantities => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] -= 0.5;

                // let tempTotalCalories = 0;

                // selectedIngredients.selectedIngredients.forEach((ingredient, i) => {
                //     const calorie = parseFloat(ingredient.NUTR_CONT1) * newQuantities[i];
                //     tempTotalCalories += calorie;
                // });

                // 해당 재료의 영양소 값을 감소시키는 부분
                const ingredient = selectedIngredients.selectedIngredients[index];
                const carbohydrate = parseFloat(ingredient.NUTR_CONT2) * 0.5;
                const protein = parseFloat(ingredient.NUTR_CONT3) * 0.5;
                const province = parseFloat(ingredient.NUTR_CONT4) * 0.5;
                const salt = parseFloat(ingredient.NUTR_CONT6) * 0.5;

                // 각 상태 변수 업데이트
                // setTotalCalories(parseFloat(tempTotalCalories.toFixed(2)) - parseFloat(ingredient.NUTR_CONT1) * 0.5);
                // setTotalCarbohydrate(prev => Math.max(prev - carbohydrate, 0)); // 음수가 되지 않도록 최소값 0으로 설정
                // setTotalProtein(prev => Math.max(prev - protein, 0)); // 음수가 되지 않도록 최소값 0으로 설정
                // setTotalProvince(prev => Math.max(prev - province, 0)); // 음수가 되지 않도록 최소값 0으로 설정
                // setTotalSalt(prev => Math.max(prev - salt, 0)); // 음수가 되지 않도록 최소값 0으로 설정

                // console.log("-")
                // console.log(ingredient)
                // console.log(carbohydrate)
                // console.log(protein)
                // console.log(province)
                // console.log(salt)

                // `NaN` 체크 및 0으로 변경
                if (isNaN(carbohydrate)) {
                    setTotalCarbohydrate(prev => prev);
                } else {
                    setTotalCarbohydrate(prev => prev - carbohydrate);
                }

                if (isNaN(protein)) {
                    setTotalProtein(prev => prev);
                } else {
                    setTotalProtein(prev => prev - protein);
                }

                if (isNaN(province)) {
                    setTotalProvince(prev => prev);
                } else {
                    setTotalProvince(prev => prev - province);
                }

                if (isNaN(salt)) {
                    setTotalSalt(prev => prev);
                } else {
                    setTotalSalt(prev => prev - salt);
                }

                return newQuantities;
            });
        }
    };

    // 계산기
    const calculateTotals = () => {
        // 0으로 초기화
        let tempTotalCalories = 0;
        let tempTotalCarbohydrate = 0;
        let tempTotalProtein = 0;
        let tempTotalProvince = 0;
        let tempTotalSalt = 0;

        selectedIngredients.selectedIngredients.forEach((ingredient, i) => {
            const calorie = parseFloat(ingredient.NUTR_CONT1) * quantities[i];
            const carbohydrate = parseFloat(ingredient.NUTR_CONT2) * quantities[i];
            const protein = parseFloat(ingredient.NUTR_CONT3) * quantities[i];
            const province = parseFloat(ingredient.NUTR_CONT4) * quantities[i];
            const salt = parseFloat(ingredient.NUTR_CONT6) * quantities[i];

            // `NaN` 체크 및 0으로 변경
            if (!isNaN(calorie)) {
                tempTotalCalories += calorie;
            }

            if (!isNaN(carbohydrate)) {
                tempTotalCarbohydrate += carbohydrate;
            }

            if (!isNaN(protein)) {
                tempTotalProtein += protein;
            }

            if (!isNaN(province)) {
                tempTotalProvince += province;
            }

            if (!isNaN(salt)) {
                tempTotalSalt += salt;
            }
        });

        setTotalCalories(parseFloat(tempTotalCalories.toFixed(2)));
        setTotalCarbohydrate(parseFloat(tempTotalCarbohydrate.toFixed(2)));
        setTotalProtein(parseFloat(tempTotalProtein.toFixed(2)));
        setTotalProvince(parseFloat(tempTotalProvince.toFixed(2)));
        setTotalSalt(parseFloat(tempTotalSalt.toFixed(2)));

        // console.log("계산")
        // console.log(tempTotalCalories);
        // console.log(tempTotalCarbohydrate)
        // console.log(tempTotalProtein)
        // console.log(tempTotalProvince)
        // console.log(tempTotalSalt)
    };


    const searchPage = () => {
        navigation.navigate("FoodSearch")
    }

    // const userNo = await AsyncStorage.getItem('userNo')
    // console.log(userNo)

    // 식단 등록
    const firstPage = async () => {
        // 식단 데이터 등록하기위한 json화
        let dietData = JSON.stringify({
            'dietName': dietName,
            'totalKcal': totalCalories.toFixed(2),
            'userNo': userNo,
            "dietCategory": selectedMethod,
            'totalCarbohydrate': totalCarbohydrate.toFixed(2),
            'totalProtein': totalProtein.toFixed(2),
            'totalProvince': totalProvince.toFixed(2),
            'totalSalt': totalSalt.toFixed(2),
            // 'ingredientName' : ingredientName
        });

        // console.log("뭐받음?")
        // console.log(dietName)
        // console.log(totalCalories)
        // console.log(userId)
        const userToken = await AsyncStorage.getItem('userToken');
        axios({
            method: 'POST',
            url: 'http:/192.168.0.64:8080/registdiet',
            data: dietData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`

            }
        }).then(response => {
            console.log("요청 성공")
            // 성공시 첫번째 페이지로 돌아감
            // console.log(response)
            if (response.status === 200) {
                navigation.navigate('FoodFirst');
                // console.log(response.data)
            } else {
                alert('값 확인');
            }
        }).catch(error => {
            console.log("에러")
            console.log(error);
            alert('에러발생')
        });
    }

    //이미지 등록
    const pickImage2 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if(!result.canceled) {

            const updatedImg = result.assets[0].uri;

            console.log(updatedImg.replace('file://', ''));

            const userToken = await AsyncStorage.getItem('userToken');

            const image = {
                name: '_DietImg.jpg',
                type: 'image/jpeg',
                uri: Platform.OS === 'ios' ? updatedImg.replace('file://', '') : updatedImg
            }

            const formData = new FormData();
            formData.append('dietUri', image);

            axios({
                method: 'POST',
                // url: `http://192.168.0.176:8080/editProfileImg?userId=${userId}`, // 집
                // url: 'http://192.168.31.92:8080/editProfileImg', // 오릴리
                // url: 'http://172.30.4.51:8080/editProfileImg', // 스벅
                // url: 'http://172.30.1.49:8080/editProfileImg', // 투썸
                url: `http://192.168.0.64:8080/editDietImg`, // 학원
                data: formData,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userToken}`
                },
                transformRequest: data => data,
            }).then(response => {
                console.log(response);
                if(response.status === 200) {
                    console.log('Success ', response.data);
                } else {
                    alert('입력하신 정보를 확인해주세요.');
                }
            }).catch(error => {
                console.log(error);
                alert('에러 : 입력하신 정보를 확인해주세요. please');
            })
        }
    
    }

    return (
        <>
            <View style={{paddingTop:20}}>
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

                {/* 미구현 */}
                <TouchableOpacity onPress={pickImage2}>
                    <Text>이미지 업로드</Text>
                </TouchableOpacity>

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
                        </Text>
                        <Text style={{ marginLeft: 10, marginRight: 10 }} >{quantities[index]}개</Text>
                        <TouchableOpacity onPress={() => increaseQuantity(index)} style={{ marginLeft: 10, marginRight: 10, borderWidth: 1 }}><Text style={{ fontSize: 20 }}>+</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => decreaseQuantity(index)} style={{ marginLeft: 10, marginRight: 10, borderWidth: 1 }}><Text style={{ fontSize: 20 }}>-</Text></TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity onPress={calculateTotals} style={styles.touch}>
                    <Text>계산하기</Text>
                </TouchableOpacity>
                {/* 계산하기 누르면 계산된 정보가 나옴 확인차용으로 다 출력함 */}
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>총합 칼로리: {totalCalories.toFixed(2)} Kcal</Text>
                {/* <Text style={{ fontWeight: 'bold', fontSize: 16 }}>총 탄수화물: {totalCarbohydrate.toFixed(2)} g</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>총 단백질: {totalProtein.toFixed(2)} g</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>총 지방: {totalProvince.toFixed(2)} g</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>총 나트륨: {totalSalt.toFixed(2)} mg</Text> */}
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
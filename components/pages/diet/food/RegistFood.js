import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, ScrollView, TouchableWithoutFeedback } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from 'expo-image-picker';
import {REACT_NATIVE_AXIOS_URL} from "@env";
import { Ionicons } from '@expo/vector-icons';

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
    const [image, setImage] = useState(null);
    const [dietMemo,setDietMemo] = useState('');

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

    // 키보드 상태 관리를 위한 useRef
    const textInputRef = useRef(null);

    // 스크린 터치 이벤트 (키보드 내리기)
    const screenTouchHandler = () => {
        if (textInputRef.current) {
            textInputRef.current.blur();
        }
    }

    // NUTR_CONT1,2,3,4,6 값 상수화 및 출력
    // 원래 타입이 String 형식이라서 계산이 불가능해서 실수형으로 바꿔줌
    // const parsedNUTR_CONT1 = selectedFood ? parseFloat(selectedFood.NUTR_CONT1) : 0;
    // const parsedNUTR_CONT2 = selectedFood ? parseFloat(selectedFood.NUTR_CONT2) : 0;
    // const parsedNUTR_CONT3 = selectedFood ? parseFloat(selectedFood.NUTR_CONT3) : 0;
    // const parsedNUTR_CONT4 = selectedFood ? parseFloat(selectedFood.NUTR_CONT4) : 0;
    // const parsedNUTR_CONT6 = selectedFood ? parseFloat(selectedFood.NUTR_CONT6) : 0;

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
    }, [image]);

    // +를 누르면 기본값의 0.5배의 값이 증가하고 -를 누르면 기본값의 0.5 배의 값이 감소한다

    // + 버튼을 누를 때 수량 증가
    const increaseQuantity = (index) => {
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] += 0.5;


            // 탄수화물, 단백질, 지방, 나트륨 계산
            // 탄 단 지 나 는 화면에 출력은 안되지만 + -버튼을 누르면 계산해줌
            const ingredient = selectedIngredients.selectedIngredients[index];
            const carbohydrate = parseFloat((ingredient.NUTR_CONT2) * newQuantities[index].toFixed(2));
            const protein = parseFloat((ingredient.NUTR_CONT3) * newQuantities[index].toFixed(2));
            const province = parseFloat((ingredient.NUTR_CONT4) * newQuantities[index].toFixed(2));
            const salt = parseFloat((ingredient.NUTR_CONT6) * newQuantities[index].toFixed(2));


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


                // 해당 재료의 영양소 값을 감소시키는 부분
                const ingredient = selectedIngredients.selectedIngredients[index];
                const carbohydrate = parseFloat(ingredient.NUTR_CONT2) * 0.5;
                const protein = parseFloat(ingredient.NUTR_CONT3) * 0.5;
                const province = parseFloat(ingredient.NUTR_CONT4) * 0.5;
                const salt = parseFloat(ingredient.NUTR_CONT6) * 0.5;


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

    };


    const searchPage = () => {
        navigation.navigate("FoodSearch")
    }


    // 식단 등록
    const firstPage = async () => {

        const today = await AsyncStorage.getItem('today')
        console.log('today : ' , today)
        console.log('userNo : ', userNo)

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
            'dietCalendarDate' : today,
            // 'ingredientName' : ingredientName
            "dietMemo" : dietMemo
        });

        console.log('image : ' , image)

        const formData = new FormData();
        formData.append('dietData', dietData);
        if (image) {
            const imageform = {
                name: '_DietImg.jpg',
                type: 'image/jpeg',
                uri: Platform.OS === 'ios' ? image.replace('file://', '') : image
            };
            formData.append('dietUri', imageform);
        }

        const userToken = await AsyncStorage.getItem('userToken');
        axios({
            method: 'POST',
            url: `${REACT_NATIVE_AXIOS_URL}/registdiet`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userToken}`
            },
            transformRequest: data => data,
        }).then(response => {
            console.log("요청 성공")
            // 성공시 첫번째 페이지로 돌아감
            if (response.status === 200) {
                navigation.navigate('CalendarView');
            } else {
                alert('값 확인');
            }
        }).catch(error => {
            console.log("에러")
            console.log(error);
            alert('에러발생')
        });
    }

    const openCamera = () => {
        Alert.alert(
            '사진 선택',
            '사진을 어디서 가져오시겠습니까?',
            [
                {
                text: '카메라로 사진 찍기',
                onPress: () => takePicture()
                },
                {
                text: '앨범에서 선택',
                onPress: () => pickImageFromGallery()
                },
                {
                text: '취소',
                style: 'cancel'
                }
            ]
        );
    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.0001,
        })

        if(!result.canceled) {
            setImage(result.assets[0].uri);
        }
    
    }

    //이미지 등록
    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.0001,
        })

        if(!result.canceled) {
            setImage(result.assets[0].uri);
        }

    }

    return (
        
        <TouchableWithoutFeedback onPress={screenTouchHandler}>
            <SafeAreaView style={styles.safeArea}>
                {/* 이미지 업로드 박스 */}
                <View style={styles.imgContainer}>
                    <View style={styles.imageBox}>
                        <View>
                            {image !== null ? (
                                <TouchableOpacity onPress={openCamera}>
                                    <Image source={{ uri: image }} style={styles.image}/>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={openCamera}>
                                    <Ionicons name="add-outline" style={styles.addBtn}/>
                                    <Ionicons name="image-outline" style={styles.imgBtn}/>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
        {/* <>
            <View style={{paddingTop:60}}>
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
                    })} */}
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TextInput ref={textInputRef} style={styles.textInput} placeholder="식단 이름을 정해주세요" placeholderTextColor='gray' value={dietName} onChangeText={(text) => setDietName(text)} />
                </View>
                <View style={styles.oneBorderLine}></View>

                <ScrollView>
                    <View style={styles.receiptMethods}>
                        {methods.map((method, index) => {
                            return (
                                <View key={index} style={styles.receiptMethod}>
                                    <BouncyCheckbox
                                        key={method}
                                        unfillColor="#292929" //선택되지 않은 선택박스의 색
                                        fillColor="green" // 선택된 선택 박스의 색
                                        iconStyle={{ // 체크박스 아이콘에 적용되는 스타일
                                            width: 50,
                                            height: 50,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginLeft: 15,
                                        }}
                                        disableBuiltInState={true} //true로 사용시 체크박스 내부 상태 변화 애니메이션을 사용하지 않고 외부에서 상태관리를 할 수 있음
                                        // 여기선 isSelected로 사용중이라 ture로 설정되었음
                                        isChecked={method === selectedMethod} // 선택된 끼니에 대해 체크 여부 설정
                                        onPress={() => setSelectedMethod(method)} // 체크박스를 누를 때 선택된 끼니 업데이트
                                    />
                                    <Text style={{color: 'white', marginTop: 5}}>
                                        {method === "아침" ? "아침" : null}
                                        {method === "점심" ? "점심" : null}
                                        {method === "저녁" ? "저녁" : null}
                                        {method === "기타" ? "기타" : null}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <TextInput ref={textInputRef} style={styles.textInputMemo} multiline={true} value={dietMemo} onChangeText={(text) => setDietMemo(text)} placeholder="식단 메모들 적어주세요" placeholderTextColor='gray' />
                    </View>

                    <View>
                        {selectedIngredients.selectedIngredients.map((ingredient, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                <Text style={{color: 'white'}}>
                                    {`${ingredient.DESC_KOR} ${(parseFloat(ingredient.NUTR_CONT1) * quantities[index]).toFixed(2)}Kcal`}
                                </Text>
                                <Text style={{ marginLeft: 10, marginRight: 10, color: 'white' }} >{quantities[index]}개</Text>
                                <TouchableOpacity onPress={() => increaseQuantity(index)} style={styles.plusMinus}><Text style={{ fontSize: 20, color: 'white' }}>+</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => decreaseQuantity(index)} style={styles.plusMinus}><Text style={{ fontSize: 20, color: 'white' }}>-</Text></TouchableOpacity>
                            </View>
                        ))}
                        <TouchableOpacity onPress={calculateTotals} style={styles.touchTotal}>
                            <Text style={{color: 'white'}}>계산하기</Text>
                        </TouchableOpacity>
                    </View>
                    

                    <View style={styles.totalBox}>
                        <View style={{width: '60%', justifyContent:'center', alignItems:'center', borderColor: 'white', borderWidth: 1, borderRadius: 10, padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginVertical: 5 }}>총합 칼로리: {totalCalories.toFixed(2)} Kcal</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginVertical: 5 }}>총 탄수화물: {totalCarbohydrate.toFixed(2)} g</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginVertical: 5 }}>총 단백질: {totalProtein.toFixed(2)} g</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginVertical: 5 }}>총 지방: {totalProvince.toFixed(2)} g</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginVertical: 5 }}>총 나트륨: {totalSalt.toFixed(2)} mg</Text>
                        </View>
                    </View>
                    

                    
                    
                </ScrollView>

                <TouchableOpacity onPress={firstPage} style={styles.touch}>
                    <Text style={{color:'green'}}>식단 업로드</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </TouchableWithoutFeedback>

                // {selectedIngredients.selectedIngredients.map((ingredient, index) => (
                //     <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                //         <Text>
                //             {`${ingredient.DESC_KOR} ${(parseFloat(ingredient.NUTR_CONT1) * quantities[index]).toFixed(2)}Kcal`}
                //         </Text>
                //         <Text style={{ marginLeft: 10, marginRight: 10 }} >{quantities[index]}개</Text>
                //         <TouchableOpacity onPress={() => increaseQuantity(index)} style={{ marginLeft: 10, marginRight: 10, borderWidth: 1 }}><Text style={{ fontSize: 20 }}>+</Text></TouchableOpacity>
                //         <TouchableOpacity onPress={() => decreaseQuantity(index)} style={{ marginLeft: 10, marginRight: 10, borderWidth: 1 }}><Text style={{ fontSize: 20 }}>-</Text></TouchableOpacity>
                //     </View>
                // ))}
                // <TouchableOpacity onPress={calculateTotals} style={styles.touch}>
                //     <Text>계산하기</Text>
                // </TouchableOpacity>
                // {/* 계산하기 누르면 계산된 정보가 나옴 확인차용으로 다 출력함 */}
                // <Text style={{ fontWeight: 'bold', fontSize: 16 }}>총합 칼로리: {totalCalories.toFixed(2)} Kcal</Text>
                
                // <View>
                //     {image !== null ? (
                //         <Image source={{ uri: image }} style={{width: 100, height: 100}} />
                //     ) : (
                //         <Text>NO IMAGE</Text>
                //     )}
                // </View>
                // <Text>메모칸</Text>
                // <TextInput placeholder="식단 메모" value={dietMemo} onChangeText={(text) => setDietMemo(text)} />


            
        
    );
};

export default RegistFood;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
        paddingTop: Platform.OS === 'android' ? 50 : 0,
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        height: '30%',
        marginTop: 30
    },
    imageBox: {
        backgroundColor: '#292929',
        width: '55%', 
        height: '100%', 
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtn: {
        fontSize: 50,
        color: 'white',
        opacity: 0.5
    },
    imgBtn: {
        zIndex: 999,
        fontSize: 35,
        color: 'white',
        opacity: 0.5,
        position: 'absolute',
        right: '-130%',
        bottom: '-130%' 
    },
    image: {
        borderRadius: 10,
        width: Platform.OS === 'android' ? 230 : 215,
        height: Platform.OS === 'android' ? 230 : 215,
    },
    textInput: {
        width: '80%',
        height: 50,
        backgroundColor: '#292929',
        borderRadius: 10,
        padding: 10,
        color: 'white',
        marginVertical: 20,
    },
    textInputMemo: {
        width: '80%',
        height: 100,
        backgroundColor: '#292929',
        borderRadius: 10,
        padding: 10,
        color: 'white',
        marginVertical: 20,
        textAlignVertical: 'top',
    },
    oneBorderLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        opacity: 0.5,
        width: '100%',
        height: 1,
        position: 'absolute',
        top: Platform.OS === 'android' ? '53%' : '55%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    receiptMethods: {
        flexDirection: 'row', // 체크박스를 가로로 나열하기 위해 설정
        alignItems: 'center', // 세로 가운데 정렬
        justifyContent: 'space-around', // 가로 여백을 균일하게 배분
        marginTop: 20,
    },
    receiptMethod: {
        flexDirection: 'column', // 아이콘과 텍스트를 가로로 나열
        alignItems: 'center', // 가운데 정렬
        justifyContent: 'center',
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
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10,
        padding: 10,
        width: Platform.OS === 'android' ? '25%' : '20%',
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchTotal: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '20%',
        position: 'absolute',
        bottom: '25%',
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusMinus: {
        padding: 4,
        paddingHorizontal: 10,
    },
    totalBox: {
        justifyContent:'center',
        alignItems: 'flex-start',
        marginTop: 20,
        marginLeft: 40,
    }
});
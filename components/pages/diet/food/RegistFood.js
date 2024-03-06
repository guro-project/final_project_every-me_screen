import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const RegistFood = ({navigation}) => {
    const [dietName, setDietName] = useState('');
    const [isSelected, setIsSelected] = useState(null); // 하나만 선택가능하게
    const [selectedMethod,setSelectedMethod] = useState('');
    const methods = ["아침", "점심", "저녁","기타"];

    const route = useRoute();
    const finalKacl = route.params

    console.log("등록페이지에서 칼로리 받음?")
    console.log(finalKacl)

    const toggleCheckbox = (method) => {
        // 선택된 끼니 업데이트
        setSelectedMethod(method === selectedMethod ? null : method);
        console.log("끼니 업데이트 됨?")
        console.log(method)
    };

    const searchPage = () => {
        navigation.navigate("FoodSearch")
    }

    const firstPage = () => {
        navigation.navigate("FoodFirst",{dietName : dietName, selectedMethod : selectedMethod, finalKacl : finalKacl})
        console.log("이름 받아가나?")
        console.log(dietName)
        console.log("끼니 받아가나?")
        console.log(selectedMethod)
        console.log("총 칼로리 받아가나?")
        console.log(finalKacl)
    }   

    return (
        <>
            <View>
                <Text>총합 칼로리를 받아오고, 여기선 이미지,이름,끼니 입력하는 곳</Text>
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
                                onPress={() => toggleCheckbox(method)} // 체크박스를 누를 때 선택된 끼니 업데이트
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
        borderWidth:1
    }
});

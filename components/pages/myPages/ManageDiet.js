import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import {REACT_NATIVE_AXIOS_URL} from "@env";
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";

const ManageDiet = () => {

    const navigation = useNavigation();

    const [userNo, setUserNo] = useState('');
    const [userToken, setUserToken] = useState('');
    const [dietList, setDietList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDietImg, setSelectedDietImg] = useState(null);
    const [selectedDietInfo, setSelectedDietInfo] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [dietCategory, setDietCategory] = useState('');


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        console.log("A date has been picked: ", localDate);
        // 선택된 날짜를 원하는 형식으로 변환
        const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
        console.log("A date has been picked: ", formattedDate);
        setSelectedDate(formattedDate);
        hideDatePicker();
    };


    const getUser = async () => {
        setUserNo(await AsyncStorage.getItem('userNo'));
        setUserToken(await AsyncStorage.getItem('userToken'));
    }
    useEffect(() => {
        getUser();
        if (userNo!== undefined && userToken!== undefined) {
            userDietList();
        }
    },[userNo, userToken])



    // 전체조회
    const userDietList = () => {
        if (userNo !== undefined) {
            axios({
                method: 'GET',
                url: `${REACT_NATIVE_AXIOS_URL}/dietList?userNo=${userNo}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            }).then(response => {
                if (response.data && response.data.length > 0) {
                    // 날짜 순서대로 정렬
                    const sortedDietList = response.data.sort((a, b) => {
                        return new Date(a.dietCalendarDate) - new Date(b.dietCalendarDate);
                    });
                    console.log(sortedDietList)
                    setDietList(sortedDietList);
                } else {
                    console.log('등록된 식단이 없습니다.');
                }
            }).catch(error => {
                console.error('Error : ' + error);
            });
        }
    };

    const renderItem = ({ item }) => {

        // Unix 타임스탬프를 날짜로 변환
        const updateDate = new Date(item.dietCalendarDate);
        console.log('updateDate : ', updateDate);
        const UpdatedDate = updateDate.toISOString().slice(0, 10);
        console.log('UpdatedDate : ', UpdatedDate);

        const year = updateDate.getYear() % 100; // 2자리 년도

        // const showDate = `${year.toString().padStart(2, '0')}-${(updateDate.getMonth() + 1).toString().padStart(2, '0')}-${updateDate.getDate().toString().padStart(2, '0')}`;
        
        // 날짜 형식 설정 (예: yyyy-mm-dd)
        const formattedDate = `${updateDate.getFullYear()}-${(updateDate.getMonth() + 1).toString().padStart(2, '0')}-${updateDate.getDate().toString().padStart(2, '0')}`;
        console.log('formattedDate : ', formattedDate);

        return (
            <TouchableOpacity onPress={() => dietPeed({item})}>
                <View style={styles.listContents}>
                    {formattedDate === selectedDate && (
                        <>
                            <Text style={styles.listText}>{formattedDate}</Text>
                            <Text style={styles.listText}>{item.dietCategory}</Text>
                            <Text style={styles.listText}>{item.dietName}</Text>
                            <Text style={styles.listText}>{item.totalKcal} Kcal</Text>
                        </>
                    )}
                </View>
            </TouchableOpacity>
        );
        
    };


    const dietPeed = async ({ item }) => {
        
        const selectedDiet = item.dietNo;
        console.log(selectedDiet);

        try {
            const response = await axios({
                method: 'GET',
                url: `${REACT_NATIVE_AXIOS_URL}/dietPeed/${selectedDiet}`,
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })

            try {
                if (response.status === 200) {
                    // console.log(response.data.dietImg);
                    setSelectedDietImg(response.data.dietImg);
                }
            } catch (error) {
                console.log(response);
                alert('입력하신 정보를 확인해주세요.');
            }
        } catch(error) {
            console.log(error);
            alert('에러 : 입력하신 정보를 확인해주세요.');
        }
        console.log(item)
        setSelectedDietInfo(item);
        setDietCategory(item.dietCategory)
        setIsModalVisible(true);
    }

    const getColor = (dietCategory) => {
        switch (dietCategory) {
            case '아침':
                return '#7ED957'; 
            case '점심':
                return '#FFA500'; 
            case '저녁':
                return '#A9A9A9'; 
            case '기타':
                return '#FFD700'; 
            default:
                return '#000000'; // 기본값: 검정
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.myPageContents}>
                <Text style={styles.titleText}>식단 관리</Text>
                
                {/* 구분선 */}
                <View style={styles.oneBorderLine}></View>


                <View style={styles.datePicker}>
                    <TouchableOpacity onPress={showDatePicker} style={styles.dateBtn}><Text style={{color:'white'}}>Show Date Picker</Text></TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        locale="ko"
                    />
                </View>


                <View style={styles.dietList}>
                    <FlatList
                        data={dietList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.dietNo.toString()}
                    />
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        {selectedDietInfo && (
                            <>
                                <View style={styles.itemInfo}>
                                    <View style={styles.imgBox}>
                                        <Image
                                            source={{ uri: `data:image/png;base64,${selectedDietImg}`}}
                                            style={styles.modalImg}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={styles.infoBox}>

                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'white', marginHorizontal: 20}}>
                                            <Text style={styles.infoTitle}>{selectedDietInfo.dietName}</Text>
                                            <Text style={[styles.infoSub, {color: getColor(dietCategory)}]}>{dietCategory}</Text>
                                        </View>
                                        
                                        <ScrollView>
                                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                                                <View style={{alignItems: 'flex-start'}}>
                                                    <Text style={styles.infoMemo}>{selectedDietInfo.dietMemo}</Text>
                                                </View>
                                                
                                                <View style={{borderLeftColor:'white', borderLeftWidth: 1, paddingLeft: 10}}>
                                                    <Text style={styles.infoText}>칼로리: {selectedDietInfo.totalKcal} Kcal</Text>
                                                    <Text style={styles.infoText}>탄수화물: {selectedDietInfo.totalCarbohydrate} g</Text>
                                                    <Text style={styles.infoText}>단백질: {selectedDietInfo.totalProtein} g</Text>
                                                    <Text style={styles.infoText}>지방: {selectedDietInfo.totalProvince} g</Text>
                                                    <Text style={styles.infoText}>나트륨: {selectedDietInfo.totalSalt} mg</Text>
                                                </View>
                                            </View>
                                            
                                        </ScrollView>
                                    </View>
                                    {/* 필요한 다른 정보들도 여기에 추가할 수 있습니다. */}
                                    <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                                        <Ionicons name="close" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </>
                            
                        )}
                    </View>
                </Modal>
                

            </View>
        </View>
    )
}

export default ManageDiet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // '#202124'
        alignItems: 'center',
        justifyContent: 'center',
    },
    myPageContents: {
        width: '90%',
        height: '90%',
        justifyContent: 'center'
    },
    titleText: {
        position: 'absolute',
        top: '4%',
        left: '1%',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    oneBorderLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        opacity: 0.5,
        width: '100%',
        height: 1,
        position: 'absolute',
        top: '12%'
    },
    dateBtn : {
        height: '60%',
        justifyContent:'center',
        backgroundColor: '#202124',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
    },
    datePicker: {
        zIndex: 999,
        width: '100%',
        height: '10%',
        position: 'absolute',
        top: '13%',
        left: '0%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dietList: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '24%',
    },
    dietDate: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContents: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10,
    },
    listText: {
        fontSize: 16,
        color: 'white',
        flex: 1,
        textAlign: 'center',
    },

    modalContainer: {
        marginTop: Platform.OS === 'android' ? '20%' : '30%',
        backgroundColor: '#202124',
        alignItems: 'center',
        width: '100%',
        height: '90%',
    },
    itemInfo: {
        width: '100%',
        height: '100%',
    },
    imgBox: {
        flex: 1.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImg: {
        width: '90%',
        height: '90%',
        borderRadius: 10
    },
    infoBox: {
        flex: 1,
    },
    infoTitle: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5
    },
    infoSub: {
        color: 'white',
        fontSize: 20,
    },
    infoMemo: {
        fontSize: 20,
        marginVertical: 5,
        textAlign: 'center',
        marginLeft: 20,
        color: 'white',
    },
    infoText: {
        fontSize: 20,
        marginVertical: 5,
        textAlign: 'center',
        marginRight: 20,
        color: 'white',
    },
    closeButton: {
        position: 'absolute',
        bottom: '20%',
        right: '50%',
        transform: [{ translateX: 20 }, { translateY: 100 }],
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    }
});

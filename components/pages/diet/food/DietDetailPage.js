import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import UpdateDiet from './UpdateDiet';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_NATIVE_AXIOS_URL} from "@env";

// 식단 상세페이지 보는곳
const DietDetailPage = ({ dietNo, onClose }) => {
    const [data, setData] = useState(null); // 데이터
    const [modalVisible, setModalVisible] = useState(false); // 모달
    const [dietName, setDietName] = useState(''); // 식단이름
    const [totalCalories, setTotalCalories] = useState(''); // 칼로리
    const [selectedMethod, setSelectedMethod] = useState(''); // 끼니
    const [totalCarbohydrate, setTotalCarbohydrate] = useState(0); // 탄수화물
    const [totalProtein, setTotalProtein] = useState(0); // 단백질
    const [totalProvince, setTotalProvince] = useState(0); // 지방
    const [totalSalt, setTotalSalt] = useState(0); // 나트륨
    const [bookmarked, setBookmarked] = useState(false); // 북마크
    const [userNo, setUserNo] = useState('');
    const [dietImg, setDietImg] = useState(null);

    const [dietCategory, setDietCategory] = useState('');
    
    const [dietMemo, setDietMemo] = useState('');

    useEffect(() => {
        fetchDetailData();
        checkBookmarkStatus();
        getImgDietNo();
    }, []);

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

    // 상세조회
    const fetchDetailData = async () => {

        const userToken = await AsyncStorage.getItem('userToken');
        // console.log(userToken)

        axios({
            method: 'GET',
            url: `${REACT_NATIVE_AXIOS_URL}/diet/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                setData(response.data);
                setDietCategory(response.data.dietCategory);

                // console.log("asd");
                // console.log(response.data);
            })
            .catch(error => {
                console.error('상세조회 에러 : ' + error);
                // console.log(dietNo)
            });
    }

    const getImgDietNo = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        axios({
            method: 'GET',
            url: `${REACT_NATIVE_AXIOS_URL}/dietPeed/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                setDietImg(response.data.dietImg);
                // console.log("asd");
                // console.log(response.data);
            })
            .catch(error => {
                console.error('상세조회 에러 : ' + error);
                // console.log(dietNo)
            });
    }

    // 북마크 조회
    const checkBookmarkStatus = async () => {
        // console.log("확인용", dietNo, userNo);
        const userToken = await AsyncStorage.getItem('userToken');
        axios({
            method: 'GET',
            url: `${REACT_NATIVE_AXIOS_URL}/dietbm?dietNo=${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                setBookmarked(true);
            })
            .catch(error => {
                // 404 에러가 발생하면 북마크가 없는 것으로 간주
                if (error.response.status === 404) {
                    // console.log('북마크가 존재하지 않음');
                    setBookmarked(false);
                } else {
                    console.error('북마크 조회 에러:', error);
                }
            });
    }

    //추가
    const selectBookMark = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        // console.log("클릭됨")
        // console.log(userNo)
        if (!bookmarked) {
            let BookmarkData = JSON.stringify({
                'dietNo': dietNo,
                'userNo': userNo
            })
            axios({
                method: 'POST',
                url: `${REACT_NATIVE_AXIOS_URL}/registdietbm`,
                data: BookmarkData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            })
                .then(() => {
                    // console.log("북마크 등록 성공")
                    // console.log(dietNo)
                    // console.log("북마크 상태 : " + !bookmarked)
                    setBookmarked(true);
                })
                .catch(error => {
                    console.log("북마크 추가 에러 : " + error)
                    console.log(dietNo)
                })
        }

        // 삭제
        else {
            let BookmarkData = JSON.stringify({
                'dietNo': dietNo
            })
            const userToken = await AsyncStorage.getItem('userToken');
            axios({
                method: 'DELETE',
                url: `${REACT_NATIVE_AXIOS_URL}/deletedietbm`,
                data: BookmarkData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            })
                .then(() => {
                    // console.log("북마크 삭제 성공");
                    // console.log("북마크 상태 : " + !bookmarked);
                    setBookmarked(false);
                })
                .catch(error => {
                    console.log("북마크 삭제 에러 : " + error);
                });
        }
    }

    // 수정 완료시 수정 모달 닫히고 상세페이지 새로고침함
    const updateCloseModal = () => {
        setModalVisible(false);
        fetchDetailData();
    }

    // 식단 삭제확인 알터창
    const handleDelete = async () => {
        if (bookmarked) {
            Alert.alert(
                "북마크 확인",
                "해당 식단은 북마크되어 있습니다. 그래도 삭제하시겠습니까?",
                [
                { 
                    text: "예", 
                    onPress: () => {
                        selectBookMark();
                        confirmDelete(onClose); // 삭제 함수 호출
                    }
                },
                { text: "아니오", onPress: () => console.log("삭제 취소"), style: "cancel" }
            ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "삭제 확인",
                "정말로 삭제하시겠습니까?",
                [
                    { text: "예", onPress: () => confirmDelete(onClose) },
                    { text: "아니오", onPress: () => console.log("삭제 취소"), style: "cancel" }
                ],
                { cancelable: false }
            );
        }
    }

    // 식단 삭제
    const confirmDelete = async (onClose) => {
        const userToken = await AsyncStorage.getItem('userToken');
        axios({
            method: 'DELETE',
            url: `${REACT_NATIVE_AXIOS_URL}/deletediet/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                console.log("삭제 성공");
                onClose(); // onClose 함수 호출하여 모달 닫기
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
        <>
            <View>
                
                <TouchableOpacity
                    onPress={selectBookMark}
                    style={{position: 'absolute', top: 0, right: 0, zIndex: 1}}
                >
                    <Ionicons name="bookmark" size={25} color={bookmarked ? "#03C75A" : "white"} />
                </TouchableOpacity>

                <View style={{alignItems: 'center', marginTop: '10%'}}>
                    <Image
                        source={{ uri: `data:image/png;base64,${dietImg}`}}
                        style={{width: 350, height: 350, borderRadius: 10}}
                        resizeMode="cover"
                    />
                </View>
                

                {data && (
                    <>
                        {/* 상세정보 출력되는곳 더 출력할거 있으면 여기에 추가하면 됨 */}
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'white'}}>
                            <Text style={styles.foodTitle}>{data.dietName}</Text>
                            <Text style={[styles.foodCategory, {color: getColor(dietCategory)}]}>{dietCategory}</Text>
                        </View>

                        <ScrollView>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                                <View>
                                    <Text style={{color: 'white', fontSize:18}}>{data.dietMemo}</Text>
                                </View>
                                <View style={{borderLeftColor:'white', borderLeftWidth: 1, paddingLeft: 10}}>
                                    <Text style={{color: 'white', fontSize: 15, marginBottom: '3%'}}>칼로리 : {data.totalKcal}Kcal</Text>
                                    <Text style={{color: 'white', fontSize: 15, marginBottom: '3%'}}>탄수화물 : {data.totalCarbohydrate}g</Text>
                                    <Text style={{color: 'white', fontSize: 15, marginBottom: '3%'}}>단백질 : {data.totalProtein}g</Text>
                                    <Text style={{color: 'white', fontSize: 15, marginBottom: '3%'}}>지방 : {data.totalProvince}g</Text>
                                    <Text style={{color: 'white', fontSize: 15, marginBottom: '3%'}}>나트륨 : {data.totalSalt}mg</Text>
                                </View>
                            </View>
                        </ScrollView>
                        
                    </>
                )}
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalView}>
                        <View>
                            {/* 식단 수정하려면 여기에 먼저 추가해야됨 */}
                            <UpdateDiet
                                dietNo={dietNo}
                                dietName={dietName}
                                selectedMethod={selectedMethod}
                                totalCalories={totalCalories}
                                totalCarbohydrate={totalCarbohydrate}
                                totalProtein={totalProtein}
                                totalProvince={totalProvince}
                                totalSalt={totalSalt}
                                dietMemo={dietMemo}
                                onClose={updateCloseModal}
                            />
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <View style={{alignItems: 'center', marginBottom: Platform.OS === 'android' ? 40 : 0}}>
                                    <Text style={{color: 'white', fontSize: 18}}>닫기</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                
            </View>
            <View style={{position: 'absolute', bottom: Platform.OS === 'android' ? '18%' : '30%', display: 'flex', flexDirection: 'row'}}>
                    <Pressable onPress={() => setModalVisible(true)}>
                        {/* Pressable은 modal 여는거 */}
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{ color: '#03C75A', fontSize: 18, marginRight: 40}}>수정</Text>
                        </View>
                    </Pressable>

                    <TouchableOpacity onPress={(handleDelete)}>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{ color: 'red', fontSize: 18, marginLeft: 40 }}>삭제</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        </>
    
    );
};

const styles = StyleSheet.create({
    modalView: {
        marginTop: Platform.OS === 'android' ? '30%' : '41%',
        backgroundColor: '#202124',
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
    },
    foodTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: '3%'
    },
    foodCategory: {
        fontSize: 25,
        color: 'white',
        marginVertical: '3%'
    }
});

export default DietDetailPage;
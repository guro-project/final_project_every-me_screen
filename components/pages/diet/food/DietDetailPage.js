import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import UpdateDiet from './UpdateDiet';
import DeleteDiet from './DeleteDiet';
import { Ionicons } from "@expo/vector-icons";

// 식단 상세페이지 보는곳
const DietDetailPage = ({ dietNo }) => {
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

    useEffect(() => {
        fetchDetailData();
        checkBookmarkStatus();
    }, []);

    // 상세조회
    const fetchDetailData = () => {
        axios({
            method: 'GET',
            url: `http://192.168.0.64:8080/diet/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJkYXRlIjoxNzEwNDY0ODc4NDUzLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiVVNFUiIsInN1YiI6IkV2ZXJ5TWUgdG9rZW4gOiAxNCIsImV4cCI6MTcxMTMyODg3OCwidXNlcklkIjoidXNlcjEzQHVzZXIxMy5jb20ifQ.JYAggxNlmjaxSjiCheKlVQYhkN6K_4TLbWpxVxH9InU`
            }
        })
            .then(response => {
                setData(response.data);
                // console.log("asd");
                // console.log(response.data);
            })
            .catch(error => {
                console.error('상세조회 에러 : ' + error);
                // console.log(dietNo)
            });
    }

    // 북마크 조회
    const checkBookmarkStatus = async() => {
        console.log("확인용")
        console.log(dietNo)
        // 여기서 책갈피 상태를 API를 통해 확인하고, 이미 책갈피가 되어 있는 경우 setBookmarked(true)로 상태 변경

        // const dietNo = dietNo;
        await axios({
            method: 'GET',
            url: `http://192.168.0.64:8080/dietbm?dietNo=${dietNo}`,
            // params: {dietNo},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJkYXRlIjoxNzEwNDY0ODc4NDUzLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiVVNFUiIsInN1YiI6IkV2ZXJ5TWUgdG9rZW4gOiAxNCIsImV4cCI6MTcxMTMyODg3OCwidXNlcklkIjoidXNlcjEzQHVzZXIxMy5jb20ifQ.JYAggxNlmjaxSjiCheKlVQYhkN6K_4TLbWpxVxH9InU`
            }
        })
            .then(data => {
                console.log(data.data)
                setBookmarked(data.data.dietNo)
            })
            .catch(
                error => {
                console.error('북마크 조회 에러 : ' + error);
                console.log(dietNo)
            });
            
    }

    //추가
    const selectBookMark = async () => {
        console.log("클릭됨")
        if (!bookmarked) {
            let BookmarkData = JSON.stringify({
                'dietNo': dietNo
            })
            axios({
                method: 'POST',
                url: `http://192.168.0.64:8080/registdietbm`,
                data: BookmarkData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJkYXRlIjoxNzEwNDY0ODc4NDUzLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiVVNFUiIsInN1YiI6IkV2ZXJ5TWUgdG9rZW4gOiAxNCIsImV4cCI6MTcxMTMyODg3OCwidXNlcklkIjoidXNlcjEzQHVzZXIxMy5jb20ifQ.JYAggxNlmjaxSjiCheKlVQYhkN6K_4TLbWpxVxH9InU`
                }
            })
                .then(() => {
                    console.log("북마크 등록 성공")
                    console.log(dietNo)
                    console.log("북마크 상태 : " + !bookmarked)
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
            axios({
                method: 'DELETE',
                url: `http://192.168.0.64:8080/deletedietbm`,
                data: BookmarkData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJkYXRlIjoxNzEwNDY0ODc4NDUzLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiVVNFUiIsInN1YiI6IkV2ZXJ5TWUgdG9rZW4gOiAxNCIsImV4cCI6MTcxMTMyODg3OCwidXNlcklkIjoidXNlcjEzQHVzZXIxMy5jb20ifQ.JYAggxNlmjaxSjiCheKlVQYhkN6K_4TLbWpxVxH9InU`
                }
            })
                .then(() => {
                    console.log("북마크 삭제 성공");
                    console.log("북마크 상태 : " + !bookmarked);
                    setBookmarked(false);
                })
                .catch(error => {
                    console.log("북마크 삭제 에러 : " + error);
                });
        }
    }



    return (
        <View>
            {data && (
                <>
                    {/* 상세정보 출력되는곳 더 출력할거 있으면 여기에 추가하면 됨 */}
                    <Text>{data.dietCategory} {data.dietName} {data.totalKcal}Kcal {data.totalCarbohydrate}g {data.totalProtein}g {data.totalProvince}g {data.totalSalt}mg</Text>
                </>
            )}
            <TouchableOpacity onPress={selectBookMark}>
                <Text>{bookmarked}</Text>
                <Ionicons name="bookmark" color={bookmarked ? "yellow" : "black"} />
            </TouchableOpacity>
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
                        />

                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text>닫기</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
                {/* Pressable은 modal 여는거 */}
                <Text style={{ color: 'blue' }}>수정</Text>
            </Pressable>
            {/* 삭제 */}
            <DeleteDiet
                dietNo={dietNo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
        marginTop: '30%',
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
        width: '100%',
        height: '90%',
    }
});

export default DietDetailPage;

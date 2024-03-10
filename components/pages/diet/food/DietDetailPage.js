import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import UpdateDiet from './UpdateDiet';
import DeleteDiet from './DeleteDiet';
// 식단 상세페이지 보는곳
const DietDetailPage = ({ dietNo }) => {
    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [dietName, setDietName] = useState('');
    const [totalCalories, setTotalCalories] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [totalCarbohydrate, setTotalCarbohydrate] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalProvince, setTotalProvince] = useState(0);
    const [totalSalt, setTotalSalt] = useState(0);

    useEffect(() => {
        fetchDetailData();
    }, []);

    // 상세조회
    const fetchDetailData = () => {
        axios({
            method: 'GET',
            url: `http://172.30.1.96:8080/diet/${dietNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJkYXRlIjoxNzEwMDUxMjU5NDg1LCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJSb2xlIjoiVVNFUiIsInN1YiI6IkV2ZXJ5TWUgdG9rZW4gOiAzIiwiZXhwIjoxNzEwMTM3NjU5LCJ1c2VySWQiOiJ1c2VyMkB1c2VyMi5jb20ifQ.V5pbRLREWJLa14_z0HP8jJCvSmNlVLDYOA3IzT8KDEE`
            }
        })
            .then(response => {
                setData(response.data);
                console.log("asd");
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error data : ' + error);
                console.log(dietNo)
            });
    }
    
    return (
        <View>
            {data && (
                <>
                    {/* 상세정보 출력되는곳 더 출력할거 있으면 여기에 추가하면 됨 */}
                    <Text>{data.dietCategory} {data.dietName} {data.totalKcal}Kcal {data.totalCarbohydrate}g {data.totalProtein}g {data.totalProvince}g {data.totalSalt}mg</Text>
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
                <Text style={{color:'blue'}}>수정</Text>
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

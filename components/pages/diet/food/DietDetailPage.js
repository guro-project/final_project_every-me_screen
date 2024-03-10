import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import axios from 'axios';

const DietDetailPage = ({ dietNo }) => {
    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchDetailData();
    }, []);

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
            {/* 상세 페이지 내용 렌더링 */}
            {data && (
                <>
                    {/* 상세 페이지에 표시할 데이터를 여기에 넣으세요 */}
                    <Text>{data.dietCategory} {data.dietName} {data.totalKcal}Kcal</Text>
                </>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View>
                    <View>
                        <Text>ddd</Text>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text>닫기</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
                <Text>수정</Text>
            </Pressable>
        </View>
    );
};

export default DietDetailPage;

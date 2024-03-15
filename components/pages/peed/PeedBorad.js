import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from "react-native"
import axios from 'axios';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';

const PeedBoard = () => {

    const [peed, setPeed] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const dietPeed = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        try {
            const response = await axios({
                method: 'GET',
                // url: 'http://192.168.0.176:8080/dietPeed', // 집
                // url: 'http://192.168.31.92:8080/dietPeed', // 오릴리
                // url: 'http://172.30.4.51:8080/dietPeed', // 스벅
                // url: 'http://172.30.1.49:8080/dietPeed', // 투썸
                url: 'http://192.168.0.12:8080/dietPeed', // 학원
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })

            try {
                console.log(response.data); // ��은 데이터 ��력 ���는 �
                if (response.status === 200) {
                    setPeed(response.data); // 받은 데이터 출력 또는 활용 dietImg, dietName, ingredientName, totalKcal
                }
            } catch (error) {
                console.log(response);
                alert('입력하신 정보를 확인해주세요.');
            }
        } catch(error) {
            console.log(error);
            alert('에러 : 입력하신 정보를 확인해주세요.');
        }
    }
    useEffect(() => {
        dietPeed();
    }, [])

    const getRefreshData = async () => {
        setRefreshing(true);
        await dietPeed();
        setRefreshing(false);
    }
    
    const onRefresh = () => {
        if(!refreshing) {
            getRefreshData();
        }
    }


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log('click')}>
            <View style={styles.peedBox}>
                <Image
                    source={{ uri: item.dietImg }}
                    style={styles.image}
                    resizeMode="cover" // 이미지를 화면에 맞게 잘라내어 표시
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={peed}
                renderItem={renderItem}
                keyExtractor={(item) => item.dietNo.toString()}
                numColumns={3} // 3개의 열로 배치
            />
        </View>
    );
}

export default PeedBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 70,
    },
    peedBox: {
        width: Dimensions.get('window').width / 3, // 화면의 가로 길이를 3등분하여 각 아이템의 크기를 조절
        aspectRatio: 1, // 가로 세로 비율을 유지하여 정사각형 모양으로 설정
    },
    image: {
        width: '100%',
        height: '100%', // 부모 컨테이너의 크기에 맞춰지지 않도록 설정
        borderWidth: 0.5,
    },
    contentsText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

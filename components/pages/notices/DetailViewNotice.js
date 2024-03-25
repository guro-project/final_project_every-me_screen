import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {REACT_NATIVE_AXIOS_URL} from "@env";

const DetailViewNotice = () => {
    const [data,setData] = useState('');

    const route = useRoute();
    const noticeNo = route.params;

    useEffect(() => {
        detailData();
    },[noticeNo]); // noticeNo가 변경될 때마다 detailData 함수를 다시 호출

    console.log("넘버")
    console.log(noticeNo);

    const detailData = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        // console.log(userToken)
        axios({
            method: 'GET',
            url: `${REACT_NATIVE_AXIOS_URL}/readnotice/${noticeNo}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                setData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error data : ' + error);
            });
    }

    // 밀리초로 표시된 날짜를 원하는 형식으로 변환하는 함수
    const formatDate = (milliseconds) => {
        const date = new Date(milliseconds) // 밀리초로부터 Date 객체 생성
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    return(
        <>
            <View style={styles.container}>
                <Text style={styles.noticeTitle}>
                    [공지] {data.noticeTitle}
                </Text>

                <Text style={styles.noticeDate}>
                    날짜 : {formatDate(data.noticeRegistDate)}
                </Text>
                
                <Text style={styles.noticeContents}>
                    {data.noticeContent}
                </Text>

            </View>
        </>
    )
}

export default DetailViewNotice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noticeTitle: {
        fontSize: 25,
        color: 'white',
        position: 'absolute',
        top: '25%'
    },
    noticeDate: {
        fontSize: 20,
        color: 'white',
        position: 'absolute',
        top: '30%'
    },
    noticeContents: {
        fontSize: 20,
        color: 'white',
        position: 'absolute',
        top: '35%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        width: '80%',
        height: 300,
    }
})
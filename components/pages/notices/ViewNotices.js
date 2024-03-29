import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import {REACT_NATIVE_AXIOS_URL} from "@env";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const ViewNotices = () => {
    const [noticeNo, setNoticeNo] = useState('');
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');
    const [noticeDate, setNoticeDate] = useState('');
    const [data, setData] = useState('');
    const [selectNoticeNo,setSelectNoticeNo] = useState('');
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchData();
    }, [isFocused]);

    const fetchData = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        // console.log(userToken)
        axios({
            method: 'GET',
            url: `${REACT_NATIVE_AXIOS_URL}/readnotice`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
            .then(response => {
                setData(response.data);
                // console.log(response.data)
            })
            .catch(error => {
                console.error('Error data456 : ' + error);
            });
    }

    const renderData = () => {
        if (!data) return;

        const results = [];
        for (const item of data) {
            const { noticeNo, noticeTitle, noticeRegistDate } = item;

            results.push(
                <TouchableOpacity
                    key={noticeNo}
                    onPress={() => {
                        setSelectNoticeNo(noticeNo);
                        navigation.navigate("DetailViewNotice", noticeNo)
                    }}
                >
                    <View style={{display: 'flex'}}>
                            <Text style={[styles.noticeText, {marginBottom: 5}]}>[공지] {item.noticeTitle}</Text>
                        <Text style={[styles.noticeText, {marginLeft: '60%'}]}>{formatDate(item.noticeRegistDate)}{'\n'}</Text>
                    </View>
                    
                </TouchableOpacity>
            );
        }

        return results;
    };

    // 밀리초로 표시된 날짜를 원하는 형식으로 변환하는 함수
    const formatDate = (milliseconds) => {
        const date = new Date(milliseconds) // 밀리초로부터 Date 객체 생성
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>공지사항</Text>
            </View>
            <View style={styles.noticeContainer}>
                {renderData()}
            </View>
            
        </View>
        
    )

}

export default ViewNotices;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '12%',
        left: 0,
        right: 0,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    noticeContainer: {
        marginLeft: '10%',
        position: 'absolute',
        top: '25%',
        left: 0,
        right: 0,
    },
    noticeText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
})
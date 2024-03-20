import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ViewNotices = () => {
    const [noticeNo, setNoticeNo] = useState('');
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');
    const [noticeDate, setNoticeDate] = useState('');
    const [data, setData] = useState('');
    const [selectNoticeNo,setSelectNoticeNo] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        // console.log(userToken)
        axios({
            method: 'GET',
            url: `http://192.168.0.160:8080/readnotice`,
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
                    <Text>{item.noticeNo} 제목 : {item.noticeTitle} 날짜 : {formatDate(item.noticeRegistDate)}{'\n'}</Text>
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
        <Text>
            {renderData()};
        </Text>
    )

}

export default ViewNotices;
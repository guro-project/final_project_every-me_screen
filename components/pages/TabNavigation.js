import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import HealthPage from "./health/HealthPage";
import AddPage from "./function/AddPage";
import { StatusBar } from "react-native";
import FoodIndexPage from "./diet/FoodIndexPage";
import CalendarView from "./calendar/Calendar";
import MyPageIndex from "./myPages/MyPageIndex";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import axios from "axios";
import PeedIndex from "./peed/PeedIndex";
import RegistFood from "./diet/food/RegistFood";


const Tab = createBottomTabNavigator();

const TabNavigation = () => {

    const loadUserInfo = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');

        try {
            const response = await axios({
                method: 'GET',
                // url: 'http://192.168.0.176:8080/loadUserInfo', // 집
                // url: 'http://192.168.31.92:8080/loadUserInfo', // 오릴리
                // url: 'http://172.30.4.51:8080/loadUserInfo', // 스벅
                // url: 'http://172.30.1.49:8080/loadUserInfo', // 투썸
                url: 'http://172.30.1.26:8080/loadUserInfo', // 학원
                params: { userId },
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })

            const userBirth = new Date(response.data.userBirth); // 예시로 제공된 timestamp
            const formattedDate = `${userBirth.getFullYear()}-${(userBirth.getMonth() + 1).toString().padStart(2, '0')}-${userBirth.getDate().toString().padStart(2, '0')}`;

            try {
                if (response.status === 200) {
                    await AsyncStorage.setItem('userNo', JSON.stringify(response.data.userNo));
                    await AsyncStorage.setItem('userNickName', response.data.userNickname);
                    await AsyncStorage.setItem('userGender', response.data.userGender);
                    await AsyncStorage.setItem('userBirthday', formattedDate);
                    await AsyncStorage.setItem('userHeight', JSON.stringify(response.data.userHeight));
                    await AsyncStorage.setItem('userWeight', JSON.stringify(response.data.userWeight));
                    await AsyncStorage.setItem('userWeightGoal', JSON.stringify(response.data.userWeightGoal));
                    console.log("userNo")
                    console.log(await AsyncStorage.getItem('userNo'))
                }
            } catch (error) {
                console.log(response);
                alert('입력하신 정보를 확인해주세요.');
            }
        } catch (error) {
            console.log(error);
            alert('에러 : 입력하신 정보를 확인해주세요.');
            console.log(userNo)
        }
        console.log('이미지 요청...')
        // try {
        // fetch(`http://192.168.0.12:8080/getProfileImg?userId=${userId}`)
        // .then(response => response.blob())
        // .then(async blob => {
        //     console.log(URL.createObjectURL(blob));
        //     await AsyncStorage.setItem('userProfileImg', URL.createObjectURL(blob));
        // })
        // .catch(error => {
        //     console.log(error);
        //     alert('에러 : 입력하신 정보를 확인해주세요.');
        // })

        //     const response = await axios({
        //         method: 'GET',
        //         // url: 'http://192.168.0.176:8080/getProfileImg', // 집
        //         // url: 'http://192.168.31.92:8080/getProfileImg', // 오릴리
        //         // url: 'http://172.30.4.51:8080/getProfileImg', // 스벅
        //         // url: 'http://172.30.1.49:8080/getProfileImg', // 투썸
        //         url: `http://192.168.0.12:8080/getProfileImg`, // 학원
        //         params: {userId},
        //         responseType: 'arraybuffer',
        //         headers: {
        //             'Authorization': `Bearer ${userToken}`
        //         }
        //     })

        //     try {
        //         if (response.status === 200) {
        //             console.log(response);
        //             console.log(response.data);
        //             const imageBlob = new Blob([response.data], {type: 'image/jpeg'});
        //             console.log(imageBlob)
        //             const imageUrl = URL.createObjectURL(imageBlob);
        //             console.log(imageUrl);
        //             // const blob = await response.data;
        //             // const imageUrl = URL.createObjectURL(blob);
        //             // console.log(imageUrl);
        //             // await AsyncStorage.setItem('userProfileImg', imageUrl);
        //             // console.log(await AsyncStorage.getItem('userProfileImg'));
        //         }
        //     } catch (error) {
        //         alert('입력하신 정보를 확인해주세요.');
        //     }
        // } catch(error) {
        //     console.log(error);
        //     alert('에러2 : 입력하신 정보를 확인해주세요.');
        // }
    }
    useEffect(() => {
        loadUserInfo();
    }, [])

    return (
        <>
            <StatusBar barStyle="light-content" />
            <Tab.Navigator
                screenOptions={{ tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0.2 } }}
                initialRouteName='Home'
            >
                <Tab.Screen
                    name="Calendar"
                    component={FoodIndexPage}
                    options={{
                        tabBarIcon: ({ focused }) => focused ? (<Ionicons name="calendar-outline" size={30} color='#03C75A' />) : (<Ionicons name="calendar-outline" size={30} color='#C1C1C1' />),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Health"
                    component={HealthPage}
                    options={{
                        tabBarIcon: ({ focused }) => focused ? (<Ionicons name="barbell-outline" size={30} color='#03C75A' />) : (<Ionicons name="barbell-outline" size={30} color='#C1C1C1' />),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Add"
                    component={AddPage}
                    options={{
                        tabBarIcon: ({ focused }) => focused ? (<Ionicons name="add-outline" size={30} color='#03C75A' />) : (<Ionicons name="add-outline" style={{}} size={30} color='#C1C1C1' />),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Community"
                    component={PeedIndex}
                    options={{
                        tabBarIcon: ({ focused }) => focused ? (<Ionicons name="clipboard-outline" size={30} color='#03C75A' />) : (<Ionicons name="clipboard-outline" size={30} color='#C1C1C1' />),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="MyPage"
                    component={MyPageIndex}
                    options={{
                        tabBarIcon: ({ focused }) => focused ? (<Ionicons name="person-circle-outline" size={30} color='#03C75A' />) : (<Ionicons name="person-circle-outline" size={30} color='#C1C1C1' />),
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

export default TabNavigation;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import HealthPage from "./health/HealthPage";
import AddPage from "./function/AddPage";
import { StatusBar } from "react-native";
import FoodIndexPage from "./diet/FoodIndexPage";
import CalendarView from "./calendar/Calendar";
import MyPageIndex from "./myPages/MyPageIndex";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import PeedIndex from "./peed/PeedIndex";
import {REACT_NATIVE_AXIOS_URL} from "@env";
import RegistFood from "./diet/food/RegistFood";
import CalendarIndexPage from "./calendar/CalendarIndex";


const Tab = createBottomTabNavigator();

const TabNavigation = () => {

    const [bmr, setBmr] = useState(0);

    const loadUserInfo = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');

        try {
            const response = await axios({
                method: 'GET',
                url: `${REACT_NATIVE_AXIOS_URL}/loadUserInfo`,
                params: { userId },
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })

            const userBirth = new Date(response.data.userBirth); // 예시로 제공된 timestamp
            const formattedDate = `${userBirth.getFullYear()}-${(userBirth.getMonth() + 1).toString().padStart(2, '0')}-${userBirth.getDate().toString().padStart(2, '0')}`;

            try {
                console.log(response.status)
                if (response.status === 200) {
                    await AsyncStorage.setItem('userNo', JSON.stringify(response.data.userNo));
                    await AsyncStorage.setItem('userNickName', response.data.userNickname);
                    await AsyncStorage.setItem('userGender', response.data.userGender);
                    await AsyncStorage.setItem('userBirthday', formattedDate);
                    await AsyncStorage.setItem('userHeight', JSON.stringify(response.data.userHeight));
                    await AsyncStorage.setItem('userWeight', JSON.stringify(response.data.userWeight));
                    await AsyncStorage.setItem('userWeightGoal', JSON.stringify(response.data.userWeightGoal));
                }
                dailyKcalories();
            } catch (error) {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
            alert('에러 : 입력하신 정보를 확인해주세요.');
            console.log(userNo)
        }
        console.log('이미지 요청...')

        try {
            const response = await axios({
                method: 'GET',
                url: `${REACT_NATIVE_AXIOS_URL}/getProfileImg`,
                params: {userId},
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });

            if(response.status !== 200) {
                console.log('프로필 이미지가 존재하지 않습니다.')
            } else if (response.status === 200) {
                const Base64Img = response.data;
                const imgUri = `data:image/png;base64,${Base64Img}`;
                await AsyncStorage.setItem('userProfileImg', imgUri);
            }

        } catch (error) {
            console.log('프로필 이미지가 존재하지 않습니다.');
        }

    }

    const dailyKcalories = async () => {
        const gender = await AsyncStorage.getItem('userGender');
        const height = await AsyncStorage.getItem('userHeight');
        const weight = await AsyncStorage.getItem('userWeight');
        const birthday = await AsyncStorage.getItem('userBirthday');
        const birthDate = new Date(birthday);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        console.log('gender : ', gender);
        console.log('height : ', height);
        console.log('weight : ', weight);
        console.log('age : ', age);


        if(gender === '남자') {
            setBmr((10 * weight) + (6.25 * height) - (5 * age) + 5)
        } else {
            setBmr((10 * weight) + (6.25 * height) - (5 * age) - 161)
        }

        const avgKcal = 1.55 * bmr

        console.log(avgKcal.toFixed(2));

        await AsyncStorage.setItem('avgKcal', avgKcal.toFixed(2));
    }

    useEffect(() => {
        loadUserInfo();
    }, [bmr])

    return (
        <>
            <StatusBar barStyle="light-content" />
            <Tab.Navigator
                screenOptions={{ tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0.2 } }}
                initialRouteName='Home'
            >
                <Tab.Screen
                    name="Home"
                    component={CalendarIndexPage}
                    options={{
                        tabBarIcon: ({focused}) => focused ? (<Ionicons name="calendar-outline" size={30} color='#03C75A'/>) : (<Ionicons name="calendar-outline" size={30} color='#C1C1C1'/>),
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

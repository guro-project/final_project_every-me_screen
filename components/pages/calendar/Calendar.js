import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Agenda, Calendar } from "react-native-calendars";
import ToggleButton from "./ToggleButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CalendarView = () => {

  


  // 초기 날짜 상태 설정
  const [items, setItems] = useState({});

  // 날짜를 클릭할 때 호출되는 함수
  const onDayPress = async (day) => {
    // 클릭된 날짜의 item을 가져옴
    const currentItem = items[day.dateString];
    console.log('currentItem : ', currentItem)

    await AsyncStorage.setItem('today', day.dateString);
    console.log('current today : ', await AsyncStorage.getItem('today'))
  
    // 새로운 item 생성
    const newItem = { [day.dateString]: currentItem ? [...currentItem, { type: 'toggleButton' }] : [{ type: 'toggleButton' }] };
    // const newItem = { [day.dateString]:  [{ type: 'toggleButton' }]};

    console.log('newItem : ' , newItem)
  
 
    setItems(newItem);
  };

  return (
      <Agenda
        items={items} // 변경된 items를 사용
        renderItem={(item, firstItemInDay) => {
          if (item.type === 'toggleButton') {
            return (
              <View style={{ marginTop: 20, marginLeft: 10 }}>
                
                <ToggleButton/>
              </View>
            );
          }
        }}
        // 날짜 클릭 시 호출될 함수 설정
        onDayPress={onDayPress}
      />
  );
}

export default CalendarView;

const sytles = StyleSheet.create({
  touch: {
    borderWidth: 1
  },
})
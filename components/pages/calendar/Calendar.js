import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Agenda, Calendar } from "react-native-calendars";
import ToggleButton from "./ToggleButton";

const CalendarView = () => {


  // 초기 날짜 상태 설정
  const [items, setItems] = useState({});

  // 날짜를 클릭할 때 호출되는 함수
  const onDayPress = (day) => {
    // 클릭된 날짜를 key로 하는 새로운 item 생성
    const newItem = {
      [day.dateString]: [{ type: 'toggleButton' }]
    };
    // 기존 items와 새로운 item을 병합하여 업데이트
    setItems((prevItems) => ({ ...prevItems, ...newItem }));
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
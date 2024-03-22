import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  
    // 새로운 item 생성
    const newItem = {
      [day.dateString]: currentItem ? currentItem : [{ type: 'toggleButton' }]
    };
    // const newItem = { [day.dateString]:  [{ type: 'toggleButton' }]};

    console.log('newItem : ' , newItem)
  

    setItems(newItem);
  };

  const theme = {
    calendarBackground: 'black', // 캘린더 배경
    monthTextColor: 'white',
    textDayFontWeight: 'bold' , // 날짜 서체
    dayTextColor: 'white', // 캘린더 날짜 색상
    textDayFontSize: 14, // 캘린더 날짜 글씨 크기
    textSectionTitleColor: 'white', // 요일 날짜 글씨 크기
    todayTextColor: 'green',
    // agendaDayTextColor: variables.text_3, // 날짜 글씨 색상
    // agendaDayNumColor: variables.text_4, // 요일 글씨 색상
    // agendaTodayColor: variables.main, // 당일 글씨 색상
    agendaKnobColor: 'white', // Knob => 문고리 / 캘린더 접었다폈다 하는 아이콘 색상
    indicatorColor: 'green',
    selectedDayBackgroundColor: 'white',
    selectedDayTextColor: 'green',
    'stylesheet.calendar.header': {
      week: {paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between'},
    },
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Agenda
        theme={theme}
        pagingEnabled={false}
        showClosingKnob={true}
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

    </SafeAreaView>
  );
}

export default CalendarView;

const styles = StyleSheet.create({
  theme: {
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  }
})
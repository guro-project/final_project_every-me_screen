import React, { useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Agenda, Calendar } from "react-native-calendars";
import ToggleButton from "./ToggleButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CalendarView = () => {

  const { width, height } = Dimensions.get('window');

  const [currentDate, setCurrentDate] = useState(new Date());
  const [items, setItems] = useState({});

  useEffect(() => {
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = (dateNow.getMonth() + 1).toString().padStart(2, '0');
    const day = dateNow.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    setCurrentDate(dateString);
    setItems({ [dateString]: [{ "type": "toggleButton" }] });
  }, []);

  // 날짜를 클릭할 때 호출되는 함수
  const onDayPress = async (day) => {
    console.log('???????????/')
    // 클릭된 날짜의 item을 가져옴
    const currentItem = items[day.dateString];

    await AsyncStorage.setItem('today', day.dateString);
  
    // 새로운 item 생성
    // const newItem = {[day.dateString]: currentItem ? currentItem : [{ type: 'toggleButton' }]};

    setItems({[day.dateString]: currentItem ? currentItem : [{ type: 'toggleButton' }]});
    console.log('items : ',items);
  };

  const theme = {
    agendaDayNumColor: 'transparent', // 날짜 숫자 색상
    agendaDayTextColor: 'transparent', // 날짜 텍스트 색상
    agendaKnobColor: 'transparent', // 날짜 스크롤링 표시기 색상
    calendarBackground: 'black', // 캘린더 배경
    monthTextColor: 'white', // 월 텍스트 색상
    textDayFontWeight: 'bold', // 날짜 폰트 두께
    dayTextColor: 'white', // 날짜 텍스트 색상
    textDayFontSize: 14, // 날짜 폰트 크기
    textSectionTitleColor: 'white', // 요일 텍스트 색상
    todayTextColor: 'green', // 오늘 날짜 텍스트 색상
    agendaKnobColor: 'white', // Agenda 컴포넌트의 날짜 스크롤링 표시기 색상
    indicatorColor: 'green', // 선택된 날짜 표시기 색상
    selectedDayBackgroundColor: 'white', // 선택된 날짜 배경색
    selectedDayTextColor: 'green', // 선택된 날짜 텍스트 색상
    'stylesheet.calendar.header': {
        week: {paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between'},
    },
}

  const renderEmptyDate = () => {
    // 빈 날짜를 렌더링하는 함수
    return <></>; // 아무것도 렌더링하지 않음
  };

  // ToggleButton을 렌더링하는 함수
  const renderToggleButton = () => {
    return (
      <ToggleButton/>
    );
  };

  // renderItem 함수
  const renderItem = (item) => {
    if (item.type === 'toggleButton') {
      return renderToggleButton();
    }
  };

  // renderDay 함수
  const renderDay = (day, item) => {
    return (
      <View style={[styles.dayContainer, { width: width }]}>
        {item && renderItem(item)}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Agenda
        selected={currentDate}
        theme={theme}
        pagingEnabled={false}
        showClosingKnob={true}
        items={items} // 변경된 items를 사용
        renderEmptyDate={renderEmptyDate}
        renderDay={renderDay}
        // 날짜 클릭 시 호출될 함수 설정
        onDayPress={onDayPress}
      />

    </SafeAreaView>
  );
}

export default CalendarView;

const styles = StyleSheet.create({
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderTopColor: 'white',
    borderWidth: 0.2,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  }
})
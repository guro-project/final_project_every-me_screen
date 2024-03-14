import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import axios from 'axios';

function TodoRegist() {
  const [items, setItems] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [todoContent, setTodoContent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 86400000);

    return () => clearInterval(interval);
  }, []);


  const addTodo = () =>{
      setShowAddForm(true);
  };

  const submitTodo = () =>{
      const newTodo = {
          contents : todoContent,
          registDate: selectedDate,
          isCompleted: false
      };
      axios.post('http://192.168.0.160:8080/api/todos', newTodo)
        .then(response => {
          console.log('Todo added:', response.data);
          loadItems({ dateString: selectedDate }); // 현재 선택된 날짜로 데이터를 다시 불러옴
          setShowAddForm(false);
          setTodoContent('');
        })
        .catch(error => {
          console.error('Error adding todo:', error);
        });
    };

  const renderItem = (item) => (
    <View style={{ padding: 20 }}>
      <Text>{item.name}</Text>
    </View>
  );

  const renderEmptyDate = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>등록된 계획이 없습니다</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={addTodo}>
        <Text>계획 등록하기</Text>
      </TouchableOpacity>
      {showAddForm && (
        <View>
            <TextInput
              value={todoContent}
              onChangeText={text => setTodoContent(text)}
              placeholder="Enter Todo Content"
            />
            <Button title="Submit" onPress={submitTodo} />
        </View>
      )}
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />
    </View>
  );
}

export default TodoRegist;

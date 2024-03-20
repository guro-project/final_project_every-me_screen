import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_AXIOS_URL } from "@env";

function Todo() {
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

  const loadItems = async (day) => {
    const dateString = day.dateString;

    const userToken = await AsyncStorage.getItem('userToken')

    axios({
      method: 'GET',
      url: `${REACT_NATIVE_AXIOS_URL}/api/todos?date=${dateString}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => {
        const todos = response.data;
        if (todos && Array.isArray(todos)) {
          const newItems = {
            [dateString]: todos.map(todo => ({
              name: todo.contents
            })),
          };
          setItems(newItems);
        } else {
          // 만약 todos가 undefined이거나 배열이 아닌 경우, 빈 객체를 설정합니다.
          setItems({});
        }
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };


  const addTodo = () => {
    setShowAddForm(true);
  }

  const submitTodo = async () => {

    const userToken = await AsyncStorage.getItem('userToken')

    const newTodo = {
      contents: todoContent,
      registDate: selectedDate,
      isCompleted: false
    }
    axios({
      method: 'POST',
      url: `${REACT_NATIVE_AXIOS_URL}/api/todos`,
      data: newTodo,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => {
        console.log('Todo added:', response.data);
        loadItems({ dateString: selectedDate });
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
    <View style={{ flex: 1, paddingTop: 40 }}>
      <Button
        onPress={addTodo}
        title="계획 등록"
        style={styles.addButtonContainer}
      />
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

export default Todo;

const styles = StyleSheet.create({
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
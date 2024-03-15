import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TodoRegistered() {
  const [todoList, setTodoList] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [todoContent, setTodoContent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // 이 부분은 필요에 따라 유지하거나 수정할 수 있습니다.
    // Todo 항목을 초기에 로드하거나 다른 이벤트를 수신하는 데 사용될 수 있습니다.
    // 예: 초기 로드, 날짜 선택 시 등
    loadTodoList();
  }, []);

  const loadTodoList = async () => {
    try {
      // Todo 목록을 가져오는 로직을 구현합니다.
      // 이 예시에서는 AsyncStorage를 사용하여 Todo 목록을 가져오도록 하겠습니다.
      const todoListFromStorage = await AsyncStorage.getItem('todoList');
      if (todoListFromStorage !== null) {
        setTodoList(JSON.parse(todoListFromStorage));
      }
    } catch (error) {
      console.error('Error loading todo list:', error);
    }
  };

  const addTodo = () => {
    setShowAddForm(true);
  };

  const submitTodo = async () => {
    try {
      // Todo를 추가하는 로직을 구현합니다.
      // 이 예시에서는 AsyncStorage를 사용하여 Todo 목록을 저장하도록 하겠습니다.
      const newTodo = {
        id: Date.now(), // 임의의 고유 ID를 생성합니다.
        contents: todoContent,
        registDate: selectedDate,
        isCompleted: false
      };

      setTodoList(prevTodoList => [...prevTodoList, newTodo]);
      await AsyncStorage.setItem('todoList', JSON.stringify([...todoList, newTodo]));

      // 필요에 따라 다른 작업을 수행할 수 있습니다.
      setShowAddForm(false);
      setTodoContent('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const renderTodoItem = (todoItem) => (
    <View key={todoItem.id} style={styles.todoItem}>
      <Text>{todoItem.contents}</Text>
    </View>
  );

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
      <View style={styles.todoListContainer}>
        {todoList.map(todoItem => renderTodoItem(todoItem))}
      </View>
    </View>
  );
}

export default TodoRegistered;

const styles = StyleSheet.create({
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  todoListContainer: {
    marginTop: 20,
  },
  todoItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

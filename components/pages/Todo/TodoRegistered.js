import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TodoRegistered() {
  const [todos, setTodos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [todoContent, setTodoContent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [userNo, setUserNo] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (userNo) {
      loadTodos();
    }
  }, [userNo]);


    


  



  const loadTodos = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const today = await AsyncStorage.getItem('today');
    console.log('ioioioioioioioio : ', today)
    const userNo = await AsyncStorage.getItem('userNo');
    setUserNo(userNo);
    console.log("userNo : " , userNo);


    axios({
      method: 'GET',
      url: `http://192.168.0.160:8080/api/todos?date=${today}&userNo=${userNo}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => {
        console.log("데이터" , response.data)
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };

  const addTodo = () => {
    setShowAddForm(!showAddForm);
  };

  const submitTodo = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    const today = await AsyncStorage.getItem('today');
    console.log('totototo : ', today)

    let newTodo = JSON.stringify({
      'userNo': userNo,
      'contents': todoContent,
      'registDate': today
    });

    axios({
      method: 'POST',
      url: 'http://192.168.0.160:8080/api/todos',
      data: newTodo,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => {
        console.log('Todo added:', response.data);
        setShowAddForm(false);
        setTodoContent('');
        loadTodos(today);
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
    // await AsyncStorage.removeItem('today')
    console.log('removed? : ', await AsyncStorage.getItem('today'))
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.contents}</Text>
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
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No todos available</Text>}
      />
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
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

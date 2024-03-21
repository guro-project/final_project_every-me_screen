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
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoContent, setEditTodoContent] = useState('');
  const [editTodoRegistDate, setEditTodoRegistDate] = useState(''); // 수정할 todo의 등록일
  const [editTodoUserNo, setEditTodoUserNo] = useState(''); 

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



  const handleTodoUpdate = (id, content, registDate, userNo) => {
    setEditTodoId(id);
    setEditTodoContent(content);
    setEditTodoRegistDate(registDate); // 수정할 todo의 등록일 설정
    setEditTodoUserNo(userNo); // 수정할 todo의 사용자 번호 설정
    setShowAddForm(true);
  };

  const updateTodo = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const updatedTodo = {
      id: editTodoId,
      contents: todoContent,
      registDate: editTodoRegistDate, // 수정할 todo의 등록일 사용
      userNo: editTodoUserNo, // 수정할 todo의 사용자 번호 사용
    };

    axios({
      method: 'PUT',
      url: `http://192.168.0.160:8080/api/todos/${editTodoId}`,
      data: updatedTodo,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
    .then(response => {
      console.log('Todo updated:', response.data);
      setShowAddForm(false);
      setTodoContent('');
      loadTodos();
    })
    .catch(error => {
      console.error('Error updating todo:', error);
    });
  };



  const deleteTodo = async (id) => {
    const userToken = await AsyncStorage.getItem('userToken')

    axios({
      method: 'DELETE',
      url: `http://192.168.0.160:8080/api/todos/${id}`,
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${userToken}`
      }
    })
    .then(response =>{
        console.log('Todo 삭제')
        loadTodos();
    })
    .catch(error => {
        console.log('Todo 삭제 실패 : ' , error)
    });
  };

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleTodoDelete = async (id) => {
    await deleteTodo(id)
  }

  const removeTodo = (id) => {

      // 삭제 확인 모달 등을 표시할 수 있음
      handleTodoDelete(id);
  }


  const toggleTodoCompletion = async (id, isCompleted) => {
    const userToken = await AsyncStorage.getItem('userToken');

    axios({
        method: 'PUT',
        url: `http://192.168.0.160:8080/api/todos/${id}/complete`,
        data: !isCompleted, // 반대 값으로 변경
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        }
    })
    .then(response => {
        console.log('체크리스트 완료:', response.data);
        loadTodos();
    })
    .catch(error => {
        console.error('체크리스트 실패:', error);
    });
};



  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleTodoCompletion(item.id, item.isCompleted)}>
        <Text style={[item.isCompleted && styles.completedText]}>
          {item.isCompleted ? '✓' : '○'} {item.contents}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTodoUpdate(item.id, item.contents, item.registDate, item.userNo)}>
        <Text>수정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeTodo(item.id)}>
        <Text>삭제</Text>
      </TouchableOpacity>
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
          <Button title="Submit" onPress={editTodoId ? updateTodo : submitTodo} />
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
  completedText: {
    color: 'red', // 완료된 항목의 텍스트 색상 변경
    textDecorationLine: 'line-through', // 취소선 추가
    opacity: 0.5, // 완료된 항목은 투명도를 줘서 구분
  }
});

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, FlatList, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_NATIVE_AXIOS_URL} from "@env";
import { MaterialIcons } from '@expo/vector-icons'; // 드롭다운 아이콘
import { Ionicons } from '@expo/vector-icons';

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
  const [editMode, setEditMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const { width, height } = Dimensions.get('window');

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
    const todayDate = await AsyncStorage.getItem('today');
    console.log('ioioioioioioioio : ', today)
    const userNo = await AsyncStorage.getItem('userNo');
    setUserNo(userNo);
    console.log("userNo : ", userNo);

    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = (dateNow.getMonth() + 1).toString().padStart(2, '0');
    const day = dateNow.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    const today = todayDate ? todayDate : dateString


    axios({
      method: 'GET',
      url: `${REACT_NATIVE_AXIOS_URL}/api/todos?date=${today}&userNo=${userNo}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => {
        console.log("데이터", response.data)
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  };

  const addTodo = () => {
    console.log(" addTodo : ")
    setShowAddForm(!showAddForm);
  };

  const submitTodo = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    console.log("submit Todo : ")

    const today = await AsyncStorage.getItem('today');
    console.log('totototo : ', today)

    let newTodo = JSON.stringify({
      'userNo': userNo,
      'contents': todoContent,
      'registDate': today
    });

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
        setShowAddForm(false);
        setTodoContent('');
        loadTodos(today);
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };



  const handleTodoUpdate = (id, content, registDate, userNo) => {
    setEditTodoId(id);
    setEditTodoContent(content);
    setEditTodoRegistDate(registDate); // 수정할 todo의 등록일 설정
    setEditTodoUserNo(userNo); // 수정할 todo의 사용자 번호 설정
    setEditMode(true);
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
      url: `${REACT_NATIVE_AXIOS_URL}/api/todos/${editTodoId}`,
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
        setEditMode(false); // 수정 모드 종료
        setEditTodoId(null); // 수정 완료 후 editTodoId 초기화
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
      url: `${REACT_NATIVE_AXIOS_URL}/api/todos/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => {
        console.log('Todo 삭제')
        loadTodos();
      })
      .catch(error => {
        console.log('Todo 삭제 실패 : ', error)
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
        url: `${REACT_NATIVE_AXIOS_URL}/api/todos/${id}/complete`,
        data: !isCompleted, // 반대 값으로 변경
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        }
    })
      .then(response => {
        // todos state를 변경하여 변경 사항을 반영한다
        const updatedTodos = todos.map(todo => {
          if (todo.id === id) { // 만약 선택한 todo id가 매개변수 id랑 일치하면
            return { ...todo, isCompleted: !isCompleted }; // isCompleted 값을 반전시킨다
          }
          return todo;
        });
        setTodos(updatedTodos); // 업데이트 된 todos 를 updatedTodos에 할당
      })
      .catch(error => {
        console.error('체크리스트 실패:', error);
      });
  };

  const renderOptions = (id) => {
    setSelectedItemId(id); // 선택된 아이템 ID 설정
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, {width: width*0.8}]}>
      {editMode && editTodoId === item.id ? (
        <TextInput
          value={todoContent}
          onChangeText={text => setTodoContent(text)}
          placeholder={editTodoContent}
          placeholderTextColor={'white'}
          style={[styles.textInput, {width: width*0.5}]}
        />
      ) : (
        <TouchableOpacity onPress={() => toggleTodoCompletion(item.id, item.isCompleted)}>
          <Text style={[item.isCompleted ? styles.completedText : styles.inCompletedText]}>
            {item.isCompleted ? '✓' : '○'} {item.contents}
          </Text>
        </TouchableOpacity>
      )}
      {/* 드롭다운 버튼 추가 */}
      <View>
      {selectedItemId !== item.id && ( // 선택된 아이템 ID와 현재 아이템의 ID가 같지 않은 경우에만 렌더링
    <TouchableOpacity onPress={() => renderOptions(item.id)} >
      <Ionicons name="ellipsis-vertical-outline" size={24} color="white"/>
    </TouchableOpacity>
  )}
      </View>
      {/* 드롭다운 메뉴 */}
      {selectedItemId === item.id && (
        <View style={styles.optionsPopup}>
          <TouchableOpacity onPress={() => editMode ? updateTodo() : handleTodoUpdate(item.id, item.contents, item.registDate, item.userNo)}>
            <Text style={styles.optionText}>{editMode ? '완료' : '수정'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeTodo(item.id)}>
            <Text style={[styles.optionText, {color: 'red'}]}>삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedItemId(null)}>
            <Text style={styles.optionText}>닫기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={{ height: Platform.OS === 'android' ? 585 : 540, alignItems: 'center' }}>
      <TouchableOpacity onPress={addTodo}>
        <Text style={{color: '#03C75A', fontSize: 20, marginBottom: 20}}>계획 등록</Text>
      </TouchableOpacity>
      {showAddForm && (
        <View style={{alignItems: 'center'}}>
          <TextInput
            value={todoContent}
            onChangeText={text => setTodoContent(text)}
            placeholder="Enter Todo Content"
            placeholderTextColor={'gray'}
            style={[styles.textInput, {width: width*0.5}]}
          />
          <TouchableOpacity onPress={submitTodo} style={styles.submitBtn}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={todos} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={{color:'white', marginTop: 20}}>등록된 계획이 없습니다</Text>}
      />
    </View>
  );
}

export default TodoRegistered;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row', // 아이템을 가로로 나열
    justifyContent:'space-between',
    alignItems: 'center',
  },
  completedText: {
    color: 'red', // 완료된 항목의 텍스트 색상 변경
    textDecorationLine: 'line-through', // 취소선 추가
    opacity: 0.5, // 완료된 항목은 투명도를 줘서 구분
  },
  inCompletedText: {
    color: 'white'
  },
  submitBtn: {
    borderColor:'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20
  },
  textInput: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10
  },
  optionsPopup: {
    color: 'white'
  },
  optionText: {
    color: 'white',
    fontSize: 15,
    marginVertical: 3,
  }
});

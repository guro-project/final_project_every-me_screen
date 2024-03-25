import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import {REACT_NATIVE_AXIOS_URL} from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Collapse, CollapseBody, CollapseHeader } from "accordion-collapse-react-native";


const ViewFaq = () => {
  const isFocused = useIsFocused();
  const [data,setData] = useState('');

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const fetchData = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // console.log(userToken)
    axios({
      method: 'GET',
      url: `${REACT_NATIVE_AXIOS_URL}/readqna`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(response => {
        setData(response.data);
        // console.log(response.data)
      })
      .catch(error => {
        console.error('질문 조회 에러 : ' + error);
      });
  }

  const renderData = () => {
    if (!data) return;

    const results = [];
    for (const item of data) {
        const { qnaNo, qnaTitle } = item;

        results.push(
            <Collapse key={qnaNo}>

                  <CollapseHeader>
                    <View style={styles.titleContainer}>
                      <Text style={styles.qnaTitle}>{item.qnaTitle}{'\n'}</Text>
                    </View>
                  </CollapseHeader>
                
                
                  <CollapseBody>
                    <View style={styles.contentsContainer}>
                      <Text style={styles.qnaContent}>{item.qnaContent}</Text>
                    </View>
                  </CollapseBody>
                
            </Collapse>
        );
    }

    return results;
};

  return (
    <View style={styles.container}>

      {renderData()}

    </View>
  )
}

export default ViewFaq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qnaTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  qnaContent: {
    fontSize: 20,
    color: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    width: '100%',
  },
  contentsContainer: {
    width: '90%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginLeft: 20,
    marginBottom: 20
  }
})
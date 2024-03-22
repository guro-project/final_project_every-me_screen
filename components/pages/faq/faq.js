import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Collapse, CollapseBody, CollapseHeader } from "accordion-collapse-react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

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
      url: `http://192.168.0.64:8080/readqna`,
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
                    <Text>{item.qnaTitle}{'\n'}</Text>
                </CollapseHeader>
                <CollapseBody>
                    <Text>{item.qnaContent}</Text>
                </CollapseBody>
            </Collapse>
        );
    }

    return results;
};

  return (
    <View style={{marginTop:100}}>

      {renderData()}

    </View>
  )
}

export default ViewFaq;
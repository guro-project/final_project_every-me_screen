import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {REACT_NATIVE_AXIOS_URL} from "@env";

const FAQScreen = ({ navigation }) => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${REACT_NATIVE_AXIOS_URL}/api/faqs`);
        console.log(response.data); // 데이터 확인
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
  
    fetchFAQs();
  }, []);

  return (
    <View>
      <FlatList
        data={faqs}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('FAQDetail', { faq: item })}>
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.question}</Text>
              <Text>{item.answer}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default FAQScreen;

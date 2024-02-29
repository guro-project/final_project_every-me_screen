import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';

const REST_API_KEY = '753e409c2ec186f8044583d60d55014e';
const REDIRECT_URI = 'http://192.168.0.12:19006/Home';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KaKaoLogin = () => {

  const navigation = useNavigation();

  const [authCode, setAuthCode] = useState('');

  function KakaoLoginWebView (data) {
    const exp = "code=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log(authorize_code);
      setAuthCode(authorize_code);
      requestToken(authCode);
    };
  }

  const requestToken = async (authCode) => {
    let AccessToken = 'none';

    await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authCode
      }
    }).then((response) => {
      console.log(response)
      AccessToken = response.data.access_token;
      console.log(AccessToken);
    }).catch (function(error) {
      console.log(error);
    })
  }

  // const requestToken = async (authCode) => {
  //   await axios({
  //     method: 'POST',
  //     url: 'https://kauth.kakao.com/oauth/token',
  //     data: {
  //       grant_type: 'authorization_code',
  //       client_id: REST_API_KEY,
  //       redirect_uri: REDIRECT_URI,
  //       code: authCode
  //     },
  //     headers: {
  //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  //     }
  //   }).then (response => {
  //     const AccessToken = response.data.access_token;
  //     console.log(AccessToken);
  //     navigation.navigate('SignUp');
  //   }).catch (error => {
  //     console.log(error);
  //   })
  // }

  return (
    <View style={Styles.container}>      
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => { KakaoLoginWebView(event.nativeEvent["url"]); }}
      />
    </View>
  )
}

export default KaKaoLogin;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },    
});

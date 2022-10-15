/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Image, Dimensions, Text, TextInput, TouchableOpacity, StyleSheet, Alert, useColorScheme } from 'react-native';
import { WATERMELON, DARKTHREE, SLATEGREY } from '../utils/Colors';
import { CommonActions } from '@react-navigation/native';

import { URL_CHANGE } from '../utils/Constant';

var backgroundColor: string;
var componentColor: string;

export function FBLoginScreen({ navigation }: any) {
  const isDarkMode = useColorScheme() === 'dark';

  if (isDarkMode) {
    backgroundColor = DARKTHREE;
    componentColor = 'white';
  } else {
    backgroundColor = 'white';
    componentColor = DARKTHREE;
  }

  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
      }}>
      <Text style={{ color: componentColor, fontSize: 20, fontWeight: 'bold' }}>
        Bạn chưa có tài khoản?
      </Text>
      <Text style={{ color: componentColor, fontSize: 16, textAlign: 'center' }}>
        Vui lòng đăng nhập.
      </Text>
      <Image
        style={{ width: 250, height: 40, marginTop: 50, marginBottom: 50 }}
        source={require('../assets/btn_login_social_fb_2x.png')}
      />
      <Text style={{ color: componentColor, fontSize: 16 }}>Bạn đã có tài khoản?</Text>
      <Text
        style={{
          color: WATERMELON,
          fontSize: 16,
          marginTop: 10,
          fontWeight: 'bold',
        }}
        onPress={() => {
          navigation.navigate('PhoneLoginScreen');
        }}>
        Đăng nhập ngay
      </Text>
    </View>
  );
}

export function PhoneLoginScreen({ navigation }: any) {
  const isDarkMode = useColorScheme() === 'dark';

  if (isDarkMode) {
    backgroundColor = DARKTHREE;
    componentColor = 'white';
  } else {
    backgroundColor = 'white';
    componentColor = DARKTHREE;
  }

  const styles = StyleSheet.create({
    input: {
      height: 45,
      marginHorizontal: 20,
      marginTop: 15,
      padding: 10,
      borderRadius: 100,
      paddingVertical: 10,
      backgroundColor: backgroundColor,
      width: Dimensions.get('window').width - 40,
      color: componentColor,
      borderColor: componentColor,
      borderWidth: 1,
    },
  });

  var phoneNumber: string;
  var password: string;
  const postLoginRequest = async () => {
    try {
      const loginResponse = await fetch(URL_CHANGE + '/scp/login', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          phone: phoneNumber,
          password: password,
        }),
      });
      const jsonLoginRequest = await loginResponse.json();

      if (String(jsonLoginRequest.success) === 'true') {
        navigation.dispatch(
          CommonActions.reset({
            routes: [
              { name: 'MainScreen' },
            ],
          })
        );
      } else {
        Alert.alert(jsonLoginRequest.message);
      }
    } catch (loginRequestError) {
      console.error(loginRequestError);
    }
  };

  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        height: Dimensions.get('window').height,
      }}>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          marginTop: 30,
          marginStart: 20,
          backgroundColor: SLATEGREY,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}
        activeOpacity={0.8}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          style={{ width: 17, height: 14 }}
          source={require('../assets/backButton.png')}
        />
      </TouchableOpacity>

      <Text
        style={{
          color: componentColor,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 40,
          textAlign: 'center',
          marginTop: 100,
        }}>
        Đăng nhập
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={(value) => {
          phoneNumber = value;
        }}
        placeholder="Nhập số điện thoại"
        keyboardType="numeric"
        placeholderTextColor="#ccccdc"
      />

      <TextInput
        style={styles.input}
        onChangeText={(value) => {
          password = value;
        }}
        placeholder="Nhập mật khẩu"
        secureTextEntry={true}
        placeholderTextColor="#ccccdc"
      />

      <Text
        style={{
          color: componentColor,
          fontSize: 13,
          textAlign: 'right',
          marginTop: 10,
          marginEnd: 20,
        }}
        onPress={() => {
          Alert.alert('Quên thì chịu');
        }}>
        Quên mật khẩu?
      </Text>

      <TouchableOpacity
        style={{
          width: Dimensions.get('window').width - 40,
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}
        activeOpacity={0.8}
        onPress={() => {
          postLoginRequest();
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            backgroundColor: WATERMELON,
            textAlign: 'center',
            width: Dimensions.get('window').width - 40,
            borderRadius: 100,
            paddingVertical: 10,
          }}>
          ĐĂNG NHẬP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* eslint-disable react-native/no-inline-styles */
import React, {memo, useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, ScrollView, Text} from 'react-native';

import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import {Seprator} from 'components/Seprator/Seprator';
// import Appbar from './Appbar';
import useFetch from 'utils/useFetch';
import {useAuth} from 'utils/authContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MainColor} from 'constants/variables';

import ProfileSVG from 'assets/icons/users-cog.svg';
import {api} from 'utils/api';

export const EditProfile = memo((props: any) => {
  const navigation = useNavigation();
  // const [auth, setAuth] = useAuth();

  // const [me, getMe, abortMe] = useFetch();

  const [me, setMe] = useState<any>();
  const [name, setName] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [phone, setPhone] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      api
        .get('/me')
        .then((resp) => {
          if (resp.ok) {
            setMe(resp.data);
          } else {
            throw resp.problem;
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    });
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   setRetry((r) => r + 1);
  // }, [auth]);

  // useEffect(() => {
  //   // const asyncAction = async () => {
  //   //   const me = await getMe(`/customers/${auth?.id}`);
  //   //   if (me.error) return;
  //   //   setName(me?.data?.first_name);
  //   //   setUsername(me?.data?.username);
  //   //   setEmail(me?.data?.email);
  //   //   setPhone(me?.data?.billing?.phone);
  //   // };
  //   // asyncAction();
  //   // return () => {
  //   //   abortMe();
  //   //   abortPostEditProfile();
  //   // };
  // }, [auth, getMe, abortMe, abortPostEditProfile, retry]);

  const handleDone = async () => {
    // const editProfile = await postEditProfile(`/customers/${auth.id}`, {
    //   method: 'PUT',
    //   body: {
    //     name,
    //     username,
    //     email,
    //     phone,
    //     password,
    //   },
    // });

    const editProfile: any = '';

    if (editProfile.error) {
      Snackbar.show({
        text: 'خطایی رخ داده است',
        backgroundColor: '#e52a3f',
      });
    } else {
      // setAuth({...auth});
    }
  };

  return (
    <KeyboardAvoidingView
      style={{display: 'flex', flex: 1, flexDirection: 'column'}}
      behavior="height">
      <View
        style={{
          width: '100%',
          height: 45,
          backgroundColor: MainColor,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <Icon
          name="chevron-right"
          color="#fff"
          size={13}
          style={{position: 'absolute', left: 10, padding: 10}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ProfileSVG stroke="#fff" />
          <Text
            style={{
              fontSize: 18,
              lineHeight: 27,
              color: '#fff',
              marginHorizontal: 10,
            }}>
            ویرایش پروفایل
          </Text>
        </View>
      </View>
      <ScrollView
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <TextInput
          label={'نام و نام خانوادگی'}
          keyboardType="default"
          mode="outlined"
          style={{
            width: '100%',
          }}
          theme={{colors: {primary: MainColor}}}
          value={name}
          onChangeText={(text) => setName(text)}
          selectionColor={MainColor}
        />
        <Seprator />
        <TextInput
          label={'نام کاربری'}
          keyboardType="default"
          mode="outlined"
          style={{
            width: '100%',
          }}
          theme={{colors: {primary: MainColor}}}
          value={username}
          onChangeText={(text) => setUsername(text)}
          selectionColor={MainColor}
        />
        <Seprator />
        <TextInput
          label={'ایمیل'}
          keyboardType="email-address"
          mode="outlined"
          style={{
            width: '100%',
          }}
          theme={{colors: {primary: MainColor}}}
          value={email}
          onChangeText={(text) => setEmail(text)}
          selectionColor={MainColor}
        />
        <Seprator />
        <TextInput
          label={'شماره همراه'}
          keyboardType="number-pad"
          mode="outlined"
          style={{
            width: '100%',
          }}
          theme={{colors: {primary: MainColor}}}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          selectionColor={MainColor}
        />
        <Seprator />
        <TextInput
          label={'رمز عبور'}
          keyboardType="default"
          textContentType="password"
          mode="outlined"
          style={{
            width: '100%',
          }}
          theme={{colors: {primary: MainColor}}}
          value={password}
          onChangeText={(text) => setPassword(text)}
          selectionColor={MainColor}
        />
        <Seprator />
        <Button
          style={{backgroundColor: MainColor, width: '100%'}}
          labelStyle={{fontSize: 20, lineHeight: 25}}
          onPress={handleDone}
          mode="contained">
          تایید
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

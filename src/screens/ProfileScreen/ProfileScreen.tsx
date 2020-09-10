/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, memo} from 'react';
import {ScrollView, View, Text, Switch, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';

import {version} from '../../../package.json';

import ProfileSVG from 'assets/icons/users-cog.svg';
import {MainColor} from 'constants/variables';
import {Seprator} from 'components/Seprator/Seprator';
import LogoImage from 'assets/images/logo.png';
import {useNavigation} from '@react-navigation/native';
import EditProfile from 'components/EditProfile';

const Stack = createStackNavigator();

interface IProps {}

export const ProfileScreen: React.FC<IProps> = (props) => {
  const isEnabled = false;
  const navigation = useNavigation();

  const toggleSwitch = () => {};

  const items = useMemo(
    () => [
      //   {
      //     icon: 'moon',
      //     text: 'حالت شب',
      //     component: (
      //       <Switch
      //         trackColor={{false: '#707070', true: '#f4f3f4'}}
      //         thumbColor={isEnabled ? MainColor : '#fefefe'}
      //         ios_backgroundColor="#3e3e3e"
      //         onValueChange={toggleSwitch}
      //         value={isEnabled}
      //         style={{marginHorizontal: 5}}
      //       />
      //     ),
      //   },
      //   {
      //     icon: 'fingerprint',
      //     text: 'اثر انگشت',
      //     component: (
      //       <Switch
      //         trackColor={{false: '#707070', true: '#f4f3f4'}}
      //         thumbColor={isEnabled ? MainColor : '#fefefe'}
      //         ios_backgroundColor="#3e3e3e"
      //         onValueChange={toggleSwitch}
      //         value={isEnabled}
      //       />
      //     ),
      //   },
      {
        icon: 'bookmark',
        text: 'نشان شده ها',
        component: 'chevron-left',
        onPress: () => {
          console.log('tada');
        },
      },
      {
        icon: 'folder',
        text: 'آگهی های من',
        component: 'chevron-left',
        onPress: () => {
          console.log('tada');
        },
      },
      {
        icon: 'lock',
        text: 'تغییر رمز عبور',
        component: 'chevron-left',
        onPress: () => {
          console.log('tada');
        },
      },
      {
        icon: 'user',
        text: 'اطلاعات من',
        component: 'chevron-left',
        onPress: () => {
          navigation.navigate('EditProfile');
        },
      },
      {
        icon: 'headset',
        text: 'قوانین و پشتیبانی',
        component: 'chevron-left',
        onPress: () => {
          console.log('tada');
        },
      },
      {
        icon: 'info-circle',
        text: `درباره ملکوپین نسخه ${version}`,
        component: 'chevron-left',
        onPress: () => {
          console.log('tada');
        },
      },
    ],
    [navigation],
  );

  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
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
            پروفایل
          </Text>
        </View>
      </View>
      <ScrollView style={{width: '100%'}}>
        {items.map((v) => (
          <Pressable onPress={v.onPress}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
              }}>
              <Icon
                name={v.icon}
                color="#707070"
                size={15}
                selectable={true}
                style={{marginHorizontal: 15}}
              />
              <Text style={{flex: 1}}>{v.text}</Text>
              {typeof v.component === 'string' ? (
                <Icon
                  name={v.component}
                  color="#707070"
                  size={15}
                  style={{marginHorizontal: 15}}
                />
              ) : (
                v.component
              )}
            </View>
            <Seprator />
          </Pressable>
        ))}
        <View
          style={{
            width: '100%',
            height: 200,
            alignItems: 'center',
          }}>
          <FastImage
            style={{width: 150, height: 150}}
            source={LogoImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(() => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
});

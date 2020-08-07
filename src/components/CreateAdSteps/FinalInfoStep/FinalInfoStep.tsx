/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
} from 'react-native';

import WarningSVG from 'assets/icons/warning.svg';
import {Seprator} from 'components/Seprator/Seprator';
import InputWrapper from 'components/InputWrapper';
import {StrokeColor, borderShadowStyle, MainColor} from 'constants/variables';
import {IAds} from 'models/GeneralModels';
import {useNavigation} from '@react-navigation/native';

interface IProps {
  state: any;
  nextStep: (v: IAds) => void;
  addToState: (key: string, value: any) => void;
  removeToState: (key: string) => void;
}

export const FinalInfoStep: React.FC<IProps> = (props) => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.textWrapper}>
              <WarningSVG />
              <Text
                style={[
                  styles.text,
                  {marginHorizontal: 6, fontSize: 12, lineHeight: 20},
                ]}>
                اطلاعات نهایی خود را با دقت وارد کنید
              </Text>
              <WarningSVG />
            </View>
          </View>
          <Seprator />
          <InputWrapper
            title="شماره همراه"
            subTitle="(ثبت شده در پروفایل)"
            required={true}
            childStyle={{
              ...borderShadowStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TextInput
              style={{
                backgroundColor: '#fff',
                width: '100%',
                textAlign: 'right',
                paddingHorizontal: 14,
              }}
              placeholder="09*********"
            />
          </InputWrapper>
          <InputWrapper
            title="شماره همراه یا ثابت"
            subTitle="(اختیاری)"
            required={true}
            childStyle={{
              ...borderShadowStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TextInput
              style={{
                backgroundColor: '#fff',
                width: '100%',
                textAlign: 'right',
                paddingHorizontal: 14,
              }}
              placeholder="051********"
            />
          </InputWrapper>
          <Seprator />
          <InputWrapper
            title="زمان مناسب برای بازدید"
            subTitle="(اختیاری)"
            required={true}
            childStyle={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginVertical: 12,
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}>
              <Text style={{width: '100%', textAlign: 'center'}}>
                زمان قبل از ظهر
              </Text>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <TextInput style={styles.clockTextinput} />
                <Text>تا</Text>
                <TextInput style={styles.clockTextinput} />
              </View>
            </View>
            <View
              style={{
                height: '80%',
                width: 1,
                backgroundColor: StrokeColor,
              }}
            />
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}>
              <Text style={{width: '100%', textAlign: 'center'}}>
                زمان بعد از ظهر
              </Text>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <TextInput style={styles.clockTextinput} />
                <Text>تا</Text>
                <TextInput style={styles.clockTextinput} />
              </View>
            </View>
          </InputWrapper>
          <Seprator />
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                fontSize: 9,
                lineHeight: 18,
                textAlign: 'center',
                marginBottom: 11,
              }}>
              ثبت آگهی در این نرم افزار به منزله قبول کردن شرایط و قوانین می
              باشد{' '}
            </Text>
            <Pressable>
              <Text
                style={{
                  fontSize: 11,
                  lineHeight: 25,
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationColor: MainColor,
                  color: MainColor,
                }}>
                شرایط و قوانین
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitWrapper}>
        <Pressable
          style={styles.submitBtn}
          onPress={() => {
            props.nextStep({} as IAds);
            navigation.navigate('Feed');
          }}>
          <Text style={styles.submitText}>ادامه</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,

    position: 'relative',
  },
  textContainer: {
    marginVertical: 20,
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {lineHeight: 15, fontSize: 9, color: StrokeColor},
  clockTextinput: {
    ...borderShadowStyle,
    backgroundColor: '#fff',
    width: 53,
    height: 36,
    textAlign: 'center',
    margin: 16,
  },
  submitWrapper: {
    position: 'absolute',
    width: '100%',

    bottom: 10,

    paddingVertical: 14,
    paddingHorizontal: 14,
    zIndex: 100,
  },
  submitBtn: {
    height: 36,
    backgroundColor: MainColor,
    borderRadius: 5,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
  },
});

/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Seprator} from 'components/Seprator/Seprator';
import {MainColor, StrokeColor} from 'constants/variables';
import {OnboardingScreens} from './OnboardingScreens';

import MelkopinImage from 'assets/images/melkopin.png';
import {useNavigation} from '@react-navigation/native';

interface IProps {}

export const LoginScreen: React.FC<IProps> = (props) => {
  const navigation = useNavigation();

  const [step, setStep] = useState(1);
  const [activeCodeBTN, setActiveCodeBTN] = useState(false);
  const [phone, setPhone] = useState<string | undefined>();
  const [code, setCode] = useState<string | undefined>();
  const codeInputRefs = useRef(Array(6).fill(React.createRef()));
  const [timer, setTimer] = useState<Date | undefined>();
  const [timerString, setTimerString] = useState<string | undefined>();

  const nextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  useEffect(() => {
    setActiveCodeBTN(!!phone);
  }, [phone]);

  useEffect(() => {
    if (code?.length === 6) {
      console.log('done');
      navigation.navigate('Main');
    }
  }, [code, navigation]);

  const setTimerValue = useCallback(() => {
    setTimer(new Date(new Date().getTime() + 2 * 60 * 1000));
  }, []);

  useEffect(() => {
    if (!timer) {
      return;
    }
    var x = setInterval(() => {
      var now = new Date().getTime();

      var distance = timer?.getTime() - now;

      if (distance < 0) {
        clearInterval(x);
        setTimerString(undefined);
        return;
      }

      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimerString((minutes ? minutes + ':' : '') + seconds);
    }, 1000);
    return () => {
      setTimer(undefined);
      setTimerString(undefined);
      clearInterval(x);
    };
  }, [timer]);

  useEffect(() => {
    if (step === 4) {
      setTimerValue();
    }
  }, [setTimerValue, step]);

  const setCodeChar = useCallback(
    (index, text) => {
      let tempCode = '';
      for (let i = 0; i < 6; i++) {
        i === index ? (tempCode += text) : (tempCode += code?.[i] || '');
      }
      setCode(tempCode);
    },
    [code],
  );

  const codeInputs = useMemo(
    () =>
      Array.from({length: 6}, (_, index) => (
        <TextInput
          style={{
            borderColor: MainColor,
            borderWidth: 1,
            borderRadius: 5,
            borderBottomWidth: 4,
            marginHorizontal: 7.5,
            flex: 1,
            textAlign: 'center',
          }}
          value={code?.charAt(index).trim()}
          onChangeText={(text) => setCodeChar(index, !!text ? text : ' ')}
          key={index}
          ref={codeInputRefs.current[index]}
        />
      )).reverse(),
    [code, setCodeChar],
  );

  const renderedContent = useMemo(() => {
    switch (step) {
      case 1:
        return <OnboardingScreens nextStep={nextStep} />;
      case 2:
        return (
          <View style={styles.container}>
            <View style={{width: '100%', height: '50%'}}>
              <FastImage
                style={{width: '100%', height: '100%'}}
                source={MelkopinImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <Seprator />
            <View style={{width: '100%', paddingHorizontal: 21}}>
              <Text style={{fontSize: 21, lineHeight: 46, textAlign: 'left'}}>
                به
                <Text style={{color: MainColor}}> ملکوپین </Text>
                خوش آمدید
              </Text>
            </View>
            <View style={{width: '100%', paddingHorizontal: 21}}>
              <Text style={{fontSize: 13, lineHeight: 33, textAlign: 'left'}}>
                لطفا شماره تلفن همراه تان را وارد کنید تا کد فعال سازی برای شما
                ارسال شود
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                paddingHorizontal: 21,
                marginVertical: 50,
              }}>
              <Text style={{fontSize: 14, lineHeight: 31, textAlign: 'left'}}>
                شماره تلفن همراه
              </Text>
              <TextInput
                placeholder="مثال 09150000000"
                style={{
                  borderBottomColor: StrokeColor,
                  borderBottomWidth: 1,
                  width: '100%',
                }}
                onFocus={() => {
                  nextStep();
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 21,
              }}>
              <Text style={{fontSize: 13, lineHeight: 33, textAlign: 'center'}}>
                با ثبت نام در ملکوپین
                <Text style={{color: MainColor}}> شرایط وقوانین </Text>
                را پذیرفته ام
              </Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={[styles.container, {justifyContent: 'space-evenly'}]}>
            <View
              style={{
                width: '100%',
                height: 110,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 25,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Icon name="x" size={40} color="#707070" />
                <Text style={{fontSize: 21, lineHeight: 46, textAlign: 'left'}}>
                  به
                  <Text style={{color: MainColor}}> ملکوپین </Text>
                  خوش آمدید
                </Text>
              </View>
              <View style={{height: '100%', width: 55}}>
                <FastImage
                  style={{width: '100%', height: '100%'}}
                  source={MelkopinImage}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <Text style={{fontSize: 13, lineHeight: 33, textAlign: 'left'}}>
                لطفا شماره تلفن همراه تان را وارد کنید تا کد فعال سازی برای شما
                ارسال شود
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 21,
                marginVertical: 50,
              }}>
              <Text style={{fontSize: 14, lineHeight: 31, textAlign: 'left'}}>
                شماره تلفن همراه
              </Text>
              <TextInput
                placeholder="مثال 09150000000"
                style={{
                  borderBottomColor: StrokeColor,
                  borderBottomWidth: 1,
                  width: '100%',
                }}
                autoFocus={true}
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <Pressable
              disabled={!activeCodeBTN}
              style={[
                {
                  width: 140,
                  height: 45,
                  borderRadius: 5,
                  marginHorizontal: 20,
                  alignSelf: 'flex-end',
                },
                activeCodeBTN
                  ? {backgroundColor: MainColor}
                  : {backgroundColor: '#ababab'},
              ]}
              onPress={() => {
                nextStep();
              }}>
              <Text
                style={[
                  {
                    fontSize: 20,
                    lineHeight: 44,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  },
                  activeCodeBTN ? {color: '#fff'} : {color: '#e2e2e2'},
                ]}>
                دریافت کد
              </Text>
            </Pressable>
          </View>
        );
      case 4:
        return (
          <View style={[styles.container, {justifyContent: 'space-evenly'}]}>
            <View
              style={{
                width: '100%',
                height: 110,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 25,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Icon name="x" size={40} color="#707070" />
                <Text style={{fontSize: 21, lineHeight: 46, textAlign: 'left'}}>
                  <Text style={{color: MainColor}}> کد دریافتی </Text>
                  را وارد کنید
                </Text>
              </View>
              <View style={{height: '100%', width: 55}}>
                <FastImage
                  style={{width: '100%', height: '100%'}}
                  source={MelkopinImage}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <Text style={{fontSize: 13, lineHeight: 33, textAlign: 'left'}}>
                `کد 6 رقمی به شماره {phone} ارسال شد. کد را در قسمت پایین وارد
                کنید `
              </Text>
            </View>
            <View>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 21,
                  marginVertical: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {codeInputs}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {timerString ? (
                  <>
                    <Text
                      style={{
                        fontSize: 13,
                        lineHeight: 33,
                        color: '#000',
                        marginHorizontal: 3.5,
                      }}>
                      {timerString}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        lineHeight: 33,
                        color: StrokeColor,
                        marginHorizontal: 3.5,
                      }}>
                      ثانیه
                    </Text>
                  </>
                ) : (
                  <Pressable
                    onPress={() => {
                      setTimerValue();
                    }}>
                    <Text
                      style={{
                        fontSize: 11,
                        lineHeight: 33,
                        color: MainColor,
                        marginHorizontal: 3.5,
                      }}>
                      ارسال مجدد کد
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>

            <Pressable
              style={{
                width: '100%',
                marginHorizontal: 20,
              }}
              onPress={() => {
                setStep(3);
              }}>
              <Text
                style={{
                  fontSize: 13,
                  lineHeight: 33,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: MainColor,
                }}>
                تغییر شماره برای دریافت کد
              </Text>
            </Pressable>
          </View>
        );
      default:
        return null;
    }
  }, [step, nextStep, activeCodeBTN, phone, codeInputs, timerString]);

  return <>{renderedContent}</>;
};

const styles = StyleSheet.create({
  container: {
    // width: Dimensions.get('screen').width,
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

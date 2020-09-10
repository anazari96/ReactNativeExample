/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';

import {Seprator} from 'components/Seprator/Seprator';
import InputWrapper from 'components/InputWrapper';

import WarningSVG from 'assets/icons/warning.svg';
import CameraSVG from 'assets/icons/camera.svg';
import {MainColor, borderShadowStyle, StrokeColor} from 'constants/variables';
import {IAds} from 'models/GeneralModels';
import {api} from 'utils/api';

interface IProps {
  state: any;
  nextStep: (v: IAds) => void;
  addToState: (key: string, value: any) => void;
  removeToState: (key: string) => void;
}

export const AccountInfoStep: React.FC<IProps> = (props) => {
  const {addToState, state} = props;
  const [pictures, setPictures] = useState<any>({});

  const openPicturePicker = useCallback(
    (i) => {
      ImagePicker.showImagePicker(
        {
          title: 'انتخاب تصویر',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = {uri: response.uri};

            const data = new FormData();
            data.append('file', response.data);

            api
              .post('/uploadfile/', data)
              .then((res) => {
                console.log('res', res);
                if (res.ok) {
                  setPictures({...pictures, [i]: {source, id: res.data}});
                } else {
                  throw res.problem;
                }
              })
              .catch((err) => {
                console.log('err', err);
              });

            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          }
        },
      );
    },
    [pictures],
  );

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
                اطلاعات ملک خود را با دقت وارد کنید
              </Text>
              <WarningSVG />
            </View>
          </View>
          <Seprator />
          <InputWrapper title="افزودن عکس" required={true} childStyle={{}}>
            <View style={styles.pictureWrapper}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <View style={{margin: 10}}>
                  <Pressable
                    onPress={() => openPicturePicker(1)}
                    style={[
                      styles.pictureSmall,
                      styles.borderShadowStyle,
                      pictures[1]
                        ? {padding: 0, paddingHorizontal: 0, paddingVertical: 0}
                        : null,
                    ]}>
                    {pictures[1] ? (
                      <Image
                        source={pictures[1].source}
                        style={{
                          width: '100%',
                          aspectRatio: 1,
                        }}
                        resizeMethod="auto"
                      />
                    ) : (
                      <CameraSVG />
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => openPicturePicker(2)}
                    style={[
                      styles.pictureSmall,
                      styles.borderShadowStyle,
                      pictures[2]
                        ? {padding: 0, paddingHorizontal: 0, paddingVertical: 0}
                        : null,
                    ]}>
                    {pictures[2] ? (
                      <Image
                        source={pictures[2].source}
                        style={{
                          width: '100%',
                          aspectRatio: 1,
                        }}
                        resizeMethod="auto"
                      />
                    ) : (
                      <CameraSVG />
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => openPicturePicker(3)}
                    style={[
                      styles.pictureSmall,
                      styles.borderShadowStyle,
                      pictures[3]
                        ? {padding: 0, paddingHorizontal: 0, paddingVertical: 0}
                        : null,
                    ]}>
                    {pictures[3] ? (
                      <Image
                        source={pictures[3].source}
                        style={{
                          width: '100%',
                          aspectRatio: 1,
                        }}
                        resizeMethod="auto"
                      />
                    ) : (
                      <CameraSVG />
                    )}
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => openPicturePicker(4)}
                  style={[
                    styles.pictureLarge,
                    styles.borderShadowStyle,
                    pictures[4]
                      ? {padding: 0, paddingHorizontal: 0, paddingVertical: 0}
                      : null,
                  ]}>
                  {pictures[4] ? (
                    <Image
                      source={pictures[4].source}
                      style={{
                        width: '100%',
                        aspectRatio: 1,
                      }}
                      resizeMethod="auto"
                    />
                  ) : (
                    <CameraSVG />
                  )}
                </Pressable>
                <View style={{margin: 10}}>
                  <Pressable
                    onPress={() => openPicturePicker(5)}
                    style={[
                      styles.pictureSmall,
                      styles.borderShadowStyle,
                      pictures[5]
                        ? {padding: 0, paddingHorizontal: 0, paddingVertical: 0}
                        : null,
                    ]}>
                    {pictures[5] ? (
                      <Image
                        source={pictures[5].source}
                        style={{
                          width: '100%',
                          aspectRatio: 1,
                        }}
                        resizeMethod="auto"
                      />
                    ) : (
                      <CameraSVG />
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => openPicturePicker(6)}
                    style={[
                      styles.pictureSmall,
                      styles.borderShadowStyle,
                      pictures[6]
                        ? {padding: 0, paddingHorizontal: 0, paddingVertical: 0}
                        : null,
                    ]}>
                    {pictures[6] ? (
                      <Image
                        source={pictures[6].source}
                        style={{
                          width: '100%',
                          aspectRatio: 1,
                        }}
                        resizeMethod="auto"
                      />
                    ) : (
                      <CameraSVG />
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => openPicturePicker(7)}
                    style={[
                      styles.pictureSmall,
                      styles.borderShadowStyle,
                      pictures[7]
                        ? {padding: 0, paddingHorizontal: 0, paddingVertical: 0}
                        : null,
                    ]}>
                    {pictures[7] ? (
                      <Image
                        source={pictures[7].source}
                        style={{
                          width: '100%',
                          aspectRatio: 1,
                        }}
                        resizeMethod="auto"
                      />
                    ) : (
                      <CameraSVG />
                    )}
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Pressable
                  onPress={() => openPicturePicker(8)}
                  style={[
                    styles.pictureSmall,
                    styles.borderShadowStyle,
                    pictures[8]
                      ? {padding: 0, paddingHorizontal: 0, paddingVertical: 0}
                      : null,
                  ]}>
                  {pictures[8] ? (
                    <Image
                      source={pictures[8].source}
                      style={{
                        width: '100%',
                        aspectRatio: 1,
                      }}
                      resizeMethod="auto"
                    />
                  ) : (
                    <CameraSVG />
                  )}
                </Pressable>
                <Pressable
                  onPress={() => openPicturePicker(9)}
                  style={[
                    styles.pictureSmall,
                    styles.borderShadowStyle,
                    pictures[9]
                      ? {padding: 0, paddingHorizontal: 0, paddingVertical: 0}
                      : null,
                  ]}>
                  {pictures[9] ? (
                    <Image
                      source={pictures[9].source}
                      style={{
                        width: '100%',
                        aspectRatio: 1,
                      }}
                      resizeMethod="auto"
                    />
                  ) : (
                    <CameraSVG />
                  )}
                </Pressable>
                <Pressable
                  onPress={() => openPicturePicker(10)}
                  style={[
                    styles.pictureSmall,
                    styles.borderShadowStyle,
                    pictures[10]
                      ? {padding: 0, paddingHorizontal: 0, paddingVertical: 0}
                      : null,
                  ]}>
                  {pictures[10] ? (
                    <Image
                      source={pictures[10].source}
                      style={{
                        width: '100%',
                        aspectRatio: 1,
                      }}
                      resizeMethod="auto"
                    />
                  ) : (
                    <CameraSVG />
                  )}
                </Pressable>
              </View>
            </View>
          </InputWrapper>
          <Seprator />
          <InputWrapper
            title="نوع کاربری"
            required={true}
            childStyle={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Pressable
              style={styles.button}
              onPress={() => {
                addToState('account_type', 'RESIDENTAL');
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      state.account_type === 'RESIDENTAL'
                        ? MainColor
                        : StrokeColor,
                  },
                ]}>
                مسکونی
              </Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                addToState('account_type', 'COMMERCIAL');
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      state.account_type === 'COMMERCIAL'
                        ? MainColor
                        : StrokeColor,
                  },
                ]}>
                تجاری
              </Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                addToState('account_type', 'OFFICIAL');
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      state.account_type === 'OFFICIAL'
                        ? MainColor
                        : StrokeColor,
                  },
                ]}>
                اداری
              </Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                addToState('account_type', 'INDUSTRIAL');
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      state.account_type === 'INDUSTRIAL'
                        ? MainColor
                        : StrokeColor,
                  },
                ]}>
                صنعتی
              </Text>
            </Pressable>
          </InputWrapper>
          <Seprator />
          <InputWrapper
            title="نوع ملک"
            required={true}
            childStyle={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Pressable
              style={styles.button}
              onPress={() => {
                addToState('property_type', 'APARTMENT');
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      state.property_type === 'APARTMENT'
                        ? MainColor
                        : StrokeColor,
                  },
                ]}>
                آپارتمان
              </Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                addToState('property_type', 'HOUSE');
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      state.property_type === 'HOUSE' ? MainColor : StrokeColor,
                  },
                ]}>
                ویلایی
              </Text>
            </Pressable>
            {/* 
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>زمین/کلنگی</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>پنت هاوس</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>برج</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>سوییت</Text>
            </Pressable> */}
          </InputWrapper>
          <Seprator />
          <InputWrapper
            title="تعداد اتاق"
            required={true}
            childStyle={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Pressable
              style={[
                styles.roomButton,
                {
                  borderColor:
                    state.rooms === 0 ? MainColor : 'rgba(112, 112, 112, 0.5)',
                },
              ]}
              onPress={() => {
                addToState('rooms', 0);
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {color: state.rooms === 0 ? MainColor : StrokeColor},
                ]}>
                ۰
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.roomButton,
                {
                  borderColor:
                    state.rooms === 1 ? MainColor : 'rgba(112, 112, 112, 0.5)',
                },
              ]}
              onPress={() => {
                addToState('rooms', 1);
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {color: state.rooms === 1 ? MainColor : StrokeColor},
                ]}>
                1
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.roomButton,
                {
                  borderColor:
                    state.rooms === 2 ? MainColor : 'rgba(112, 112, 112, 0.5)',
                },
              ]}
              onPress={() => {
                addToState('rooms', 2);
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {color: state.rooms === 2 ? MainColor : StrokeColor},
                ]}>
                2
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.roomButton,
                {
                  borderColor:
                    state.rooms === 3 ? MainColor : 'rgba(112, 112, 112, 0.5)',
                },
              ]}
              onPress={() => {
                addToState('rooms', 3);
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {color: state.rooms === 3 ? MainColor : StrokeColor},
                ]}>
                3
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.roomButton,
                {
                  borderColor:
                    state.rooms === 4 ? MainColor : 'rgba(112, 112, 112, 0.5)',
                },
              ]}
              onPress={() => {
                addToState('rooms', 4);
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {color: state.rooms === 4 ? MainColor : StrokeColor},
                ]}>
                4
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.roomButton,
                {
                  borderColor:
                    state.rooms === 5 ? MainColor : 'rgba(112, 112, 112, 0.5)',
                },
              ]}
              onPress={() => {
                addToState('rooms', 5);
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {color: state.rooms === 5 ? MainColor : StrokeColor},
                ]}>
                +5
              </Text>
            </Pressable>
          </InputWrapper>
          <Seprator />
          <InputWrapper
            title="عنوان آگهی را وارد کنید (به نکات مهم و اصلی اشاره کنید)"
            required={true}>
            <TextInput
              placeholder=" اجاره ویلایی 2 خوابه"
              style={{backgroundColor: '#fff', paddingHorizontal: 22}}
              onChangeText={(text) => addToState('name', text)}
              value={state?.name}
            />
          </InputWrapper>
          <Seprator />
          <InputWrapper title="توضیحات خود را وارد کنید" required={true}>
            <TextInput
              style={{
                height: 100,
                backgroundColor: '#fff',
                paddingHorizontal: 14,
                // paddingVertical: 13,
                textAlign: 'right',
              }}
              multiline={true}
              numberOfLines={4}
              placeholder="در این بخش کاربر می تواند  تمامی توضیحات تکمیلی را وارد نمایید"
              onChangeText={(text) => addToState('desc', text)}
              value={state?.desc}
            />
          </InputWrapper>
          <Seprator />
          <View style={styles.optionalSecContainer}>
            <View style={styles.optionalSecWrapper}>
              <View style={styles.optionalSecTextWrapper1}>
                <Text style={[styles.optionalSecText, {color: MainColor}]}>
                  *
                </Text>
                <Text style={[styles.optionalSecText, {color: '#707070'}]}>
                  اطلاعات اختیاری
                </Text>
                <Text style={[styles.optionalSecText, {color: MainColor}]}>
                  *
                </Text>
              </View>
              <View style={styles.optionalSecTextWrapper2}>
                <Text style={[styles.optionalSecText, {color: MainColor}]}>
                  *
                </Text>
                <Text style={[styles.optionalSecText, {color: MainColor}]}>
                  برای گرفتن ستاره کامل ثبت آگهی می توانید تکمیل کنید
                </Text>
                <Text style={[styles.optionalSecText, {color: MainColor}]}>
                  *
                </Text>
              </View>
            </View>
            <View style={styles.optionsWrapper}>
              <Picker style={styles.optionsPicker}>
                <Picker.Item value="" label="امکانات" />
              </Picker>
            </View>
            <View style={styles.conditionsWrapper}>
              <Picker style={styles.conditionsPicker}></Picker>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitWrapper}>
        <Pressable
          style={styles.submitBtn}
          onPress={() => {
            props.nextStep({} as IAds);
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
    marginVertical: 8,
  },
  text: {lineHeight: 15, fontSize: 9},
  pictureWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  pictureSmall: {
    width: 60,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    margin: 1,

    marginHorizontal: 10,

    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  pictureLarge: {
    width: 154,
    height: 154,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    margin: 1,
    paddingVertical: 47,
    paddingHorizontal: 44,
  },
  borderShadowStyle: {
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.5)',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    shadowOpacity: 0.16,
    // elevation: 1,
  },
  button: {
    ...borderShadowStyle,
    width: 100,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 5,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    marginHorizontal: 5.5,
    marginVertical: 5.5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    color: '#707070',
  },
  roomButton: {
    ...borderShadowStyle,
    width: 50,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 5,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: 5.5,
  },
  optionalSecText: {
    fontSize: 9,
    lineHeight: 18,
    textAlign: 'center',
    marginHorizontal: 2,
  },
  optionalSecWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  optionalSecTextWrapper1: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  optionalSecTextWrapper2: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  optionsWrapper: {
    ...borderShadowStyle,
    width: '100%',

    marginVertical: 15,
  },
  optionsPicker: {
    width: '100%',
    height: 36,
    backgroundColor: '#fff',
  },
  conditionsWrapper: {
    ...borderShadowStyle,
    width: '100%',
  },
  conditionsPicker: {
    height: 36,
    width: '100%',
    backgroundColor: '#fff',
  },
  optionalSecContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    paddingHorizontal: 10,
    marginBottom: 100,
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

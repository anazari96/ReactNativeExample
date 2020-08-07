/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {LatLng} from 'react-native-maps';
import usePromise from 'react-promise';
import {ApiResponse} from 'apisauce';

import StarSVG from 'assets/icons/star.svg';
import WarningSVG from 'assets/icons/warning.svg';

import InputWrapper from 'components/InputWrapper';
import MapView from 'components/MapView';
import {Seprator} from 'components/Seprator/Seprator';
import {MainColor} from 'constants/variables';
import {api} from 'utils/api';

import {SelectMapStep} from './SelectMapStep';
import {add} from 'react-native-reanimated';

interface IProps {
  state: any;
  nextStep: () => void;
  addToState: (key: string, value: any) => void;
  removeToState: (key: string) => void;
  removeListToState: (keys: string[]) => void;
}

export const HouseInfoStep: React.FC<IProps> = (props) => {
  const {addToState, removeListToState, state} = props;

  const [steps, setSteps] = useState<1 | 2 | 'map'>(1);
  const [neighboursOptions, setNeighboursOptions] = useState<
    any[] | undefined
  >();

  useEffect(() => {
    api
      .get('/neighbours')
      .then((resp) => {
        if (resp.ok) {
          setNeighboursOptions(resp.data as any);
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const setLocation = useCallback(
    (v: LatLng) => {
      if (v) {
        console.log('v', v);

        addToState('map', v);
      }
      setSteps(1);
    },
    [addToState],
  );

  const renderedStep = useMemo(() => {
    switch (steps) {
      case 1:
        return (
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.textColoredWrapper}>
                <Text style={styles.textColored}>
                  کاربر گرامی هرچه ملک خود را با دقت و جزئیات بیشتر ثبت کنید ملک
                  شما ستاره بیشتری از نگاه کاربران دریافت خواهد کرد که در نتیجه
                  باعث بازدید بیشتر مشاوران و سریع تر انجام شدن معامله می شود
                </Text>
              </View>
              <View style={styles.textContainer}>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>
                    نکات مهم در دریافت ستاره کامل برای آگهی
                  </Text>
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.starText}>*</Text>
                  <Text style={styles.text}>تعداد عکس مناسب و با کیفیت</Text>
                  <Text style={styles.starText}>*</Text>
                </View>

                <View style={styles.textWrapper}>
                  <Text style={styles.starText}>*</Text>
                  <Text style={styles.text}>ثبت دقیق آدرس و شماره تماس</Text>
                  <Text style={styles.starText}>*</Text>
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.starText}>*</Text>
                  <Text style={styles.text}>ثبت کامل امکانات ملک</Text>
                  <Text style={styles.starText}>*</Text>
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.starText}>*</Text>
                  <Text style={styles.text}>توضیحات تکمیلی کامل</Text>
                  <Text style={styles.starText}>*</Text>
                </View>
                <View style={styles.starWrapper}>
                  <StarSVG fill="#01babc" />
                  <StarSVG fill="#01babc" />
                  <StarSVG fill="#01babc" />
                  <StarSVG fill="#01babc" />
                  <StarSVG fill="#01babc" />
                </View>
                <View style={styles.textWrapper}>
                  <Text style={styles.text}>با تشکر از همکاری شما</Text>
                </View>
              </View>
              <View style={styles.mainWrapper}>
                <InputWrapper title="شهر" required={true}>
                  <Picker enabled={false} style={styles.picker}>
                    <Picker.Item label="مشهد" value="Mashhad" />
                  </Picker>
                </InputWrapper>
                <InputWrapper title="انتخاب منطقه و محله" required={true}>
                  <Picker
                    enabled={!neighboursOptions}
                    style={styles.picker}
                    selectedValue={state.distinct}
                    onValueChange={(text) => addToState('distinct', text)}>
                    {neighboursOptions?.map((v) => (
                      <Picker.Item label={v.title} value={v.key} />
                    ))}
                  </Picker>
                </InputWrapper>
                <View style={styles.mapWrapper}>
                  <Pressable
                    onPress={() => {
                      setSteps('map');
                    }}>
                    <MapView
                      showUserLocation={false}
                      markers={
                        state?.map ? [{cord: state?.map, id: 0}] : undefined
                      }
                    />
                  </Pressable>
                </View>
                <InputWrapper
                  title="آدرس دقیق خود را وارد کنید"
                  required={true}>
                  <TextInput
                    onChangeText={(text) => addToState('address', text)}
                    value={state.address}
                    style={{backgroundColor: '#fff', textAlign: 'right'}}
                  />
                </InputWrapper>
              </View>
            </View>
          </ScrollView>
        );
      case 2:
        return (
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
              <View style={styles.mainWrapper}>
                <View style={styles.modeWrapper}>
                  <Pressable
                    style={[
                      styles.typeButton,
                      {
                        backgroundColor:
                          state.post_type === 'SELL' ? MainColor : '#fff',
                      },
                    ]}
                    onPress={() => {
                      addToState('post_type', 'SELL');
                      removeListToState(['price', 'price2']);
                    }}>
                    <Text style={styles.buttonText}>فروش</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.typeButton,
                      state.post_type === 'RENT'
                        ? {backgroundColor: MainColor}
                        : {backgroundColor: '#fff'},
                    ]}
                    onPress={() => {
                      addToState('post_type', 'RENT');
                      removeListToState(['price', 'price2']);
                    }}>
                    <Text style={styles.buttonText}>رهن و اجاره</Text>
                  </Pressable>
                </View>
                <Seprator />

                <View style={styles.costWrapper}>
                  {state.post_type === 'SELL' ? (
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <InputWrapper
                        title="مبلغ ملک را وارد کنید (تومان)"
                        required={true}
                        childStyle={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <TextInput
                          style={[styles.textInput, styles.borderShadowStyle]}
                          placeholder="۸۰۰/۰۰۰/۰۰۰"
                          value={state?.price}
                          onChangeText={(text) => addToState('price', text)}
                        />
                        <Pressable
                          style={[
                            {
                              height: 36,
                              width: 100,
                              backgroundColor:
                                state.price === 0 ? MainColor : '#fff',
                            },
                            styles.borderShadowStyle,
                          ]}
                          onPress={() => {
                            addToState('price', 0);
                          }}>
                          <Text style={styles.buttonText}>توافقی</Text>
                        </Pressable>
                      </InputWrapper>
                    </View>
                  ) : (
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}>
                      <InputWrapper
                        title="مبلغ رهن را وارد کنید (تومان)"
                        required={true}
                        childStyle={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <TextInput
                          style={[styles.textInput, styles.borderShadowStyle]}
                          placeholder="۸۰۰/۰۰۰/۰۰۰"
                          value={state?.price}
                          onChangeText={(text) => addToState('price', text)}
                        />
                        <Pressable
                          style={[
                            {
                              height: 36,
                              width: 100,
                              backgroundColor:
                                state.price === 0 ? MainColor : '#fff',
                            },
                            styles.borderShadowStyle,
                          ]}
                          onPress={() => {
                            addToState('price', 0);
                          }}>
                          <Text style={styles.buttonText}>توافقی</Text>
                        </Pressable>
                      </InputWrapper>
                      <InputWrapper
                        title="مبلغ اجاره را وارد کنید (تومان)"
                        required={true}
                        childStyle={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <TextInput
                          style={[styles.textInput, styles.borderShadowStyle]}
                          placeholder="۱/۰۰۰/۰۰۰"
                          value={state?.price2}
                          onChangeText={(text) => addToState('price2', text)}
                        />
                        <Pressable
                          style={[
                            {
                              height: 36,
                              width: 100,
                              backgroundColor:
                                state.price2 === 0 ? MainColor : '#fff',
                            },
                            styles.borderShadowStyle,
                          ]}
                          onPress={() => {
                            addToState('price2', 0);
                          }}>
                          <Text style={styles.buttonText}>رهن کامل</Text>
                        </Pressable>
                      </InputWrapper>
                    </View>
                  )}
                </View>
                <Seprator />
                <View style={styles.areaWrapper}>
                  <InputWrapper
                    title="متراژ ملک خود را وارد کنید (متر مربع)"
                    required={true}
                    childStyle={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <TextInput
                      style={[styles.textInput, styles.borderShadowStyle]}
                      placeholder="۱۵۰"
                      value={state?.area}
                      onChangeText={(text) => addToState('area', text)}
                    />
                  </InputWrapper>
                </View>
                <Seprator />

                <View style={styles.ageWrapper}>
                  <InputWrapper
                    title="سال ساخت (مثال 5 سال)"
                    required={true}
                    childStyle={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      style={[styles.textInput, styles.borderShadowStyle]}
                      placeholder="۱۰"
                      value={state?.age}
                      onChangeText={(text) => addToState('age', text)}
                    />
                    <Pressable
                      style={[
                        {
                          height: 36,
                          width: 100,
                          backgroundColor: state.age === 0 ? MainColor : '#fff',
                        },
                        styles.borderShadowStyle,
                      ]}
                      onPress={() => {
                        addToState('age', 0);
                      }}>
                      <Text style={styles.buttonText}>نوساز</Text>
                    </Pressable>
                  </InputWrapper>
                </View>
              </View>
            </View>
          </ScrollView>
        );
      case 'map': {
        return (
          <View style={{width: '100%'}}>
            <SelectMapStep setLocation={setLocation} />
          </View>
        );
      }
      default:
        return null;
    }
  }, [
    steps,
    neighboursOptions,
    setLocation,
    addToState,
    state,
    removeListToState,
  ]);

  return (
    <>
      {renderedStep}
      {steps !== 'map' ? (
        <View style={styles.submitWrapper}>
          <Pressable
            style={styles.submitBtn}
            onPress={() => {
              if (steps === 1) {
                setSteps(2);
              } else {
                props.nextStep();
              }
            }}>
            <Text style={styles.submitText}>ادامه</Text>
          </Pressable>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,

    position: 'relative',
  },
  textColored: {
    width: '100%',
    color: MainColor,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 20,
    fontSize: 11,
  },
  textColoredWrapper: {
    width: '100%',

    marginTop: 36,
    paddingHorizontal: 30,
  },
  starWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  text: {
    lineHeight: 15,
    fontSize: 9,
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  textContainer: {
    marginVertical: 20,
  },
  starText: {
    color: MainColor,
    marginHorizontal: 6,
  },
  mainWrapper: {
    width: '100%',
  },
  picker: {
    backgroundColor: '#ffffff',
    width: '100%',
  },
  mapWrapper: {
    height: 237,

    marginVertical: 15,
    marginHorizontal: 5,

    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.5)',
    overflow: 'hidden',
  },
  modeWrapper: {
    marginHorizontal: 30,
    marginVertical: 10,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.5)',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    shadowOpacity: 0.16,
    elevation: 1,
  },
  buttonText: {
    fontSize: 13,
    lineHeight: 34,
    textAlign: 'center',
  },
  typeButton: {
    backgroundColor: '#fff',
    height: 36,
    width: '50%',
  },
  costWrapper: {
    width: '100%',
    paddingVertical: 25,
  },
  textInput: {
    backgroundColor: '#fff',
    height: 36,
    width: 168,
    paddingVertical: 8,
    paddingHorizontal: 13,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'right',
  },
  areaWrapper: {
    width: '100%',
    paddingVertical: 15,
  },
  ageWrapper: {
    width: '100%',
    paddingVertical: 20,
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
    elevation: 1,
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

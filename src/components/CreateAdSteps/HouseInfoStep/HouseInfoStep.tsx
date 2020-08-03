/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useMemo} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {Picker} from '@react-native-community/picker';
import usePromise from 'react-promise';
import {ApiResponse} from 'apisauce';

import StarSVG from '../../../assets/icons/star.svg';
import WarningSVG from '../../../assets/icons/warning.svg';

import InputWrapper from '../../InputWrapper';
import {MainColor} from '../../../constants/variables';
import {api} from '../../../utils/api';
import {MapView} from '../../MapView/MapView';
import {Seprator} from '../../../components/Seprator/Seprator';
import {IAds} from 'models/GeneralModels';
import {useFormContext, Controller} from 'react-hook-form';
import {SelectMapStep} from './SelectMapStep';

interface IProps {
  ad: any;
  nextStep: (v: IAds) => void;
}

export const HouseInfoStep: React.FC<IProps> = (props) => {
  const [tmpAd, setTmpAd] = useState(props.ad);
  const [steps, setSteps] = useState<1 | 2 | 'map'>('map');
  const [type, setType] = useState<'sell' | 'rent'>('rent');
  const [selectedNeighbor, setSelectedNeighbor] = useState<
    string | undefined
  >();

  const {control, handleSubmit, errors} = useFormContext();

  const {value: neighborsValue, loading: neighborsLoading} = usePromise<
    ApiResponse<any, any>
  >(api.get('/neighbors'));

  const NeighborhoodsOptions = useMemo(() => {
    if (neighborsValue?.ok) {
      return neighborsValue?.data;
    }
    return null;
  }, [neighborsValue]);

  useEffect(() => {
    setTmpAd(props.ad);
  }, [props.ad]);

  // useEffect(() => {
  //   if (steps === 3) {
  //     props.setStep(2);
  //   }
  // }, [steps, props]);

  const renderedStep = useMemo(() => {
    switch (steps) {
      case 1:
        return (
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
                <Controller
                  name="distinct"
                  render={({onChange, value}) => (
                    <Picker
                      enabled={!neighborsLoading}
                      style={styles.picker}
                      selectedValue={value}
                      onValueChange={onChange}>
                      {NeighborhoodsOptions?.map((v) => (
                        <Picker.Item label={v.title} value={v.key} />
                      ))}
                    </Picker>
                  )}
                  control={control}
                />
              </InputWrapper>
              <View style={styles.mapWrapper}>
                <MapView showUserLocation={false} />
              </View>
              <InputWrapper title="آدرس دقیق خود را وارد کنید" required={true}>
                <TextInput
                  style={{backgroundColor: '#fff', textAlign: 'right'}}
                />
              </InputWrapper>
            </View>
          </View>
        );
      case 2:
        return (
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
                    {backgroundColor: type === 'sell' ? MainColor : '#fff'},
                  ]}
                  onPress={() => {
                    setType('sell');
                  }}>
                  <Text style={styles.buttonText}>فروش</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.typeButton,
                    type === 'rent'
                      ? {backgroundColor: MainColor}
                      : {backgroundColor: '#fff'},
                  ]}
                  onPress={() => {
                    setType('rent');
                  }}>
                  <Text style={styles.buttonText}>رهن و اجاره</Text>
                </Pressable>
              </View>
              <Seprator />

              <View style={styles.costWrapper}>
                {type === 'sell' ? (
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
                      />
                      <Pressable
                        style={[
                          {
                            height: 36,
                            width: 100,
                            backgroundColor: '#fff',
                          },
                          styles.borderShadowStyle,
                        ]}>
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
                      />
                      <Pressable
                        style={[
                          {
                            height: 36,
                            width: 100,
                            backgroundColor: '#fff',
                          },
                          styles.borderShadowStyle,
                        ]}>
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
                      />
                      <Pressable
                        style={[
                          {
                            height: 36,
                            width: 100,
                            backgroundColor: '#fff',
                          },
                          styles.borderShadowStyle,
                        ]}>
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
                  />
                  <Pressable
                    style={[
                      {
                        height: 36,
                        width: 100,
                        backgroundColor: '#fff',
                      },
                      styles.borderShadowStyle,
                    ]}>
                    <Text style={styles.buttonText}>نوساز</Text>
                  </Pressable>
                </InputWrapper>
              </View>

              {/* <View style={styles.submitWrapper}>
                <Pressable
                  style={styles.submitBtn}
                  onPress={() => {
                    setSteps(steps + 1);
                  }}>
                  <Text style={styles.submitText}>ادامه</Text>
                </Pressable>
              </View> */}
            </View>
          </View>
        );
      case 'map':
        return (
          <View style={{width: '100%', height: '100%'}}>
            <SelectMapStep />;
          </View>
        );
    }
  }, [steps, NeighborhoodsOptions, neighborsLoading, type]);

  return (
    <>
      <ScrollView>{renderedStep}</ScrollView>

      {steps !== 'map' ? (
        <View style={styles.submitWrapper}>
          <Pressable
            style={styles.submitBtn}
            // onPress={() => {
            //   setSteps(steps + 1);
            // }}
          >
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

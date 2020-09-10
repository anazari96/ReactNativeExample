/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import StarRating from 'react-native-star-rating';

import {MainColor} from 'constants/variables';
import Animated, {
  useValue,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from 'components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {RadioButton} from 'react-native-paper';

interface IProps {
  setFilter: Function;
}

interface IOption {
  selectedOption: undefined | string;
  isOpen: boolean;
  toggleSelectedDropDown: (v: string) => void;
  name: string;
  title: string;
}

const config = {
  duration: 500,
  easing: Easing.bezier(0.5, 0.01, 0, 1),
};

const KIND_OF_AD = {
  sell: 'فروشی',
  rent: 'رهن و اجاره',
  d: 'نوع آگهی',
};

const COST = {
  0: 'توافقی',
  d: 'قیمت',
};

const KIND = {
  ALL: 'همه',
  RESIDENTAL: 'مسکونی',
  COMMERCIAL: 'تجاری',
  OFFICIAL: 'اداری',
  INDUSTRIAL: 'صنعتی',
  d: 'نوع ملک',
};

const OPTIONS = {
  ELEVATOR: 'آسانسور',
  PARKING: 'پارکینگ',
  WAREHOUSE: 'انباری',
  BALCON: 'بالکن',
  GAURD: 'نگهبان',
  REMOTE_DOOR: 'درب ریموت',
  LOBBY: 'لابی',
  POOL: 'استخر',
  RADIATOR: 'شوفاژ',
  GAS_COOLER: 'کولر گازی',
  SAUNA: 'سونا',
  JACUZZI: 'جکوزی',
  CENTRAL_ANTENNA: 'آنتن مرکزی',
  AIR_CONDITIONING: 'تهویه مطبوع',
  ROOF_GARDEN: 'روف گاردن',
  GYM: 'سالن ورزشی',
  CONFRENCE_HALL: 'سالن اجتماعات',
};

const CONDITION = {
  NEW: 'نوساز',
  CONDEMNED: 'کلنگی',
  EXCHANGE: 'معاوضه',
  PARTICIPATORY: 'مشارکتی',
  CONVERTABLE: 'قابل تبدیل',
  OFFICE_POSITION: 'موقعیت اداری',
  LOAN: 'وام دار',
  PERSELL: 'پیش فروش',
  SHARE_VALUE: 'قدرالسهم',
  BETWEEN_HEIRS: 'بین وراث',
  MALL: 'پاساژ',
};

const FilterOption: React.FC<IOption> = (props) => {
  const {selectedOption, isOpen, toggleSelectedDropDown, name, title} = props;
  return (
    <View
      style={[
        styles.pickerWrapper,
        selectedOption ? {backgroundColor: MainColor} : undefined,
      ]}>
      <TouchableOpacity
        style={[styles.picker]}
        onPress={() => toggleSelectedDropDown(name)}>
        <Text
          style={{
            fontSize: 15,
            color: selectedOption ? '#fff' : '#000',
            textAlign: 'center',
            marginHorizontal: 5,
          }}>
          {title}
        </Text>
        <Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          color={selectedOption ? '#fff' : '#000'}
          size={10}
        />
      </TouchableOpacity>
    </View>
  );
};

export const FilterComponent: React.FC<IProps> = ({setFilter}) => {
  const [kindOfAd, setKindOfAd] = useState<'sell' | 'rent' | undefined>();
  const [cost, setCost] = useState<any>();
  const [kind, setKind] = useState<any>();
  const [area, setArea] = useState<any>();
  const [more, setMore] = useState<any>();
  const [q, setQ] = useState();

  const [selectedDropDown, setSelectedDropDown] = useState<any>();

  // const v = useValue(0);

  // const style = useAnimatedStyle(() => {
  //   return {
  //     width: withTiming(randomWidth.value, config),
  //   };
  // });

  // const start = () => {
  //   Animated.timing(showDropDown, {
  //     toValue: 1,
  //     duration: 1000,
  //   }).start();
  // };

  const toggleSelectedDropDown = (value) => {
    setSelectedDropDown(selectedDropDown !== value ? value : undefined);
  };

  const dropDownContent = useMemo(() => {
    switch (selectedDropDown) {
      case 'kindOfAd': {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Button
              title="فروشی"
              onPress={() =>
                setKindOfAd(kindOfAd !== 'sell' ? 'sell' : undefined)
              }
            />
            <Button title="رهن و اجاره" onPress={() => setKindOfAd('rent')} />
          </View>
        );
      }
      case 'cost': {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>حداقل قیمت</Text>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      flex: 1,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#999',
                      color: MainColor,
                    }}
                    keyboardType="number-pad"
                    value={cost?.min}
                    onChangeText={(v) => {
                      setCost({...cost, min: v});
                    }}
                  />
                  <Text style={{marginHorizontal: 5}}>تومان</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>حداکثر قیمت</Text>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      flex: 1,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#999',
                      color: MainColor,
                    }}
                    keyboardType="number-pad"
                    value={cost?.max}
                    onChangeText={(v) => {
                      setCost({...cost, max: v});
                    }}
                  />
                  <Text style={{marginHorizontal: 5}}>تومان</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                alignSelf: 'flex-start',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CheckBox
                tintColors={{true: MainColor, false: '#000'}}
                onValueChange={(v) => {
                  setCost({...cost, t: v});
                }}
                value={cost?.t}
              />
              <Text>توافقی</Text>
            </View>
          </View>
        );
      }
      case 'kind': {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            {Object.keys(KIND)?.map((k) => {
              return k !== 'd' ? (
                <View
                  style={{
                    alignSelf: 'flex-start',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                  }}>
                  <CheckBox
                    tintColors={{true: MainColor, false: '#000'}}
                    onValueChange={(v) => {
                      setKind({...kind, [k]: v});
                    }}
                    value={kind?.[k]}
                  />
                  <Text>{KIND[k]}</Text>
                </View>
              ) : null;
            })}
          </View>
        );
      }
      case 'area': {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Text>حداقل متراژ</Text>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      flex: 1,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#999',
                      color: MainColor,
                      height: 35,
                    }}
                    keyboardType="number-pad"
                    value={area?.min}
                    onChangeText={(v) => {
                      setArea({...area, min: v});
                    }}
                  />
                  <Text style={{marginHorizontal: 5}}>متر</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Text>حداکثر متراژ</Text>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      flex: 1,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#999',
                      color: MainColor,
                      height: 35,
                    }}
                    keyboardType="number-pad"
                    value={area?.max}
                    onChangeText={(v) => {
                      setArea({...area, max: v});
                    }}
                  />
                  <Text style={{marginHorizontal: 5}}>متر</Text>
                </View>
              </View>
            </View>
          </View>
        );
      }
      case 'more': {
        return (
          <View
            style={{
              width: '100%',

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',

              paddingVertical: 10,
            }}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{alignSelf: 'flex-start'}}>تعدا اتاق</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {Array.from(Array(6)).map((v, i) => {
                  return (
                    <Pressable
                      style={{
                        flex: 1,
                        margin: 5,
                        backgroundColor: more?.rooms === i ? MainColor : '#fff',
                        paddingHorizontal: 5,
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor: '#999',
                        elevation: 10,
                      }}
                      onPress={() => {
                        setMore({...more, rooms: i});
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: more?.rooms === i ? '#fff' : '#000',
                        }}>
                        {i === 0 ? 'همه' : i === 5 ? '+5' : i}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{alignSelf: 'flex-start'}}>امکانات ملک</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                }}>
                {Object.keys(OPTIONS)?.map((v) => {
                  return (
                    <View
                      style={{
                        minWidth: Dimensions.get('window').width / 3 - 10,
                      }}>
                      <Pressable
                        style={{
                          margin: 5,
                          backgroundColor: '#fff',
                          paddingHorizontal: 5,
                          borderRadius: 10,
                          borderWidth: more?.options?.[v] ? 1 : 0.5,
                          borderColor: more?.options?.[v] ? MainColor : '#999',
                          elevation: 10,
                        }}
                        onPress={() => {
                          setMore({
                            ...more,
                            options: {
                              ...more?.options,
                              [v]: !more?.options?.[v],
                            },
                          });
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: more?.options?.[v] ? MainColor : '#000',
                          }}>
                          {OPTIONS[v]}
                        </Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{alignSelf: 'flex-start'}}>شرایط ملک</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                }}>
                {Object.keys(CONDITION)?.map((v) => {
                  return (
                    <View
                      style={{
                        minWidth: Dimensions.get('window').width / 3 - 10,
                      }}>
                      <Pressable
                        style={{
                          margin: 5,
                          backgroundColor: '#fff',
                          paddingHorizontal: 5,
                          borderRadius: 10,
                          borderWidth: more?.condition?.[v] ? 1 : 0.5,
                          borderColor: more?.condition?.[v]
                            ? MainColor
                            : '#999',
                          elevation: 10,
                        }}
                        onPress={() => {
                          setMore({
                            ...more,
                            condition: {
                              ...more?.condition,
                              [v]: !more?.condition?.[v],
                            },
                          });
                        }}>
                        <Text
                          style={{
                            overflow: 'hidden',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: more?.condition?.[v] ? MainColor : '#000',
                          }}>
                          {CONDITION[v]}
                        </Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Text>وضعیت آگهی</Text>
                <CheckBox
                  tintColors={{true: MainColor, false: '#999'}}
                  value={more?.pic}
                  onValueChange={(v) => {
                    setMore({...more, pic: v});
                  }}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Text>امتیاز آگهی</Text>
                <StarRating
                  // containerStyle={{width: '100%'}}
                  starSize={25}
                  disabled={false}
                  maxStars={5}
                  rating={more?.rating}
                  fullStarColor={MainColor}
                  emptyStarColor={MainColor}
                  selectedStar={(rating) => setMore({...more, rating})}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Pressable
                style={{
                  width: '70%',
                  height: 40,
                  backgroundColor: MainColor,
                  borderRadius: 10,
                }}
                onPress={() => {
                  setSelectedDropDown(undefined);
                }}>
                <Text
                  style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: '#fff',
                  }}>
                  تایید
                </Text>
              </Pressable>
            </View>
          </View>
        );
      }
      default:
        return null;
    }
  }, [selectedDropDown, kindOfAd, cost, kind, area, more]);

  console.log('more', more);

  return (
    <View
      style={{
        width: '100%',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 6,
      }}>
      {/* first row of filters */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 28,
          marginBottom: 5,
          // position: 'relative',
          zIndex: 2,
        }}>
        {/* kind of ad: sell or rent */}
        <FilterOption
          selectedOption={kindOfAd}
          isOpen={selectedDropDown === 'kindOfAd'}
          toggleSelectedDropDown={toggleSelectedDropDown}
          name="kindOfAd"
          title={KIND_OF_AD[kindOfAd || 'd']}
        />
        {/* Search */}
        <TextInput
          placeholder="جستجو"
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            color: '#707070',
            borderRadius: 5,
            textAlignVertical: 'center',
            fontSize: 15,
            padding: 0,
            paddingHorizontal: 5,
            elevation: 5,
          }}
          value={q}
          onChangeText={(v) => setQ(v)}
        />
        <Pressable
          style={[
            styles.pickerWrapper,
            {flex: undefined, paddingHorizontal: 10},
          ]}>
          <Text style={{fontSize: 12, lineHeight: 22}}>نقشه</Text>
        </Pressable>
      </View>
      <View
        style={{
          height: 28,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 2,
        }}>
        {/* Price */}
        <FilterOption
          selectedOption={cost}
          isOpen={selectedDropDown === 'cost'}
          toggleSelectedDropDown={toggleSelectedDropDown}
          name="cost"
          title={'قیمت'}
        />
        {/* kind of house */}
        <FilterOption
          selectedOption={Object.values(kind || {})?.find((v) => v) as any}
          isOpen={selectedDropDown === 'kind'}
          toggleSelectedDropDown={toggleSelectedDropDown}
          name="kind"
          title={KIND['d']}
        />
        {/* area */}
        <FilterOption
          selectedOption={Object.values(area || {})?.find((v) => v) as any}
          isOpen={selectedDropDown === 'area'}
          toggleSelectedDropDown={toggleSelectedDropDown}
          name="area"
          title={'متراژ'}
        />
        {/* more */}
        <FilterOption
          selectedOption={Object.values(more || {})?.find((v) => v) as any}
          isOpen={selectedDropDown === 'more'}
          toggleSelectedDropDown={toggleSelectedDropDown}
          name="more"
          title={'بیشتر'}
        />
      </View>
      <Animated.ScrollView
        style={{
          width: Dimensions.get('window').width,
          maxHeight: selectedDropDown
            ? Dimensions.get('window').height - 150
            : 0,
          opacity: selectedDropDown ? 1 : 0,
          paddingTop: 5,
          paddingBottom: 10,
          paddingHorizontal: 10,
          position: 'absolute',
          top: 70,
          left: 0,
          zIndex: 1,
          backgroundColor: '#f6f6f6',
          overflow: 'scroll',
        }}>
        {dropDownContent}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {
    height: '100%',
    // flex: 1,

    backgroundColor: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,

    borderRadius: 5,
    elevation: 5,
  },
  picker: {
    padding: 0,
    margin: 0,
    fontSize: 12,
    zIndex: 1,

    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  firstPicker: {},
});

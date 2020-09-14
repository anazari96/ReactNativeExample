/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Pressable, Text, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';

import {IAds} from 'models/GeneralModels';
import {StrokeColor, borderShadowStyle, MainColor} from 'constants/variables';
import {Seprator} from 'components/Seprator/Seprator';
import {api} from 'utils/api';
import {persianDate} from 'utils/persianDate';
import {persianNumber} from 'utils/persianNumber';

import BookmarkSVG from 'assets/icons/bookmark.svg';
import StarSVG from 'assets/icons/star.svg';
import ShareSVG from 'assets/icons/share.svg';
import ArchitectureSVG from 'assets/icons/architecture.svg';
import HomeSVG from 'assets/icons/home.svg';

interface IProps {
  id: string;
}

export const AdDetail: React.FC<IProps> = (props) => {
  const [ad, setAd] = useState<IAds | undefined>({
    id: '2231',
    area: 200,
    code: '213',
    created: new Date(),
    isBookmarked: true,
    isStared: true,
    stars: 0,
    name: 'فروش یک آپارتمان ۲۰۰ متری',
    neighbourhood: 'sadasdas',
    options: null,
    post_type: 'RENT',
    price: 100000000,
    price2: 0,
    property_type: 'APARTMENT',
    rooms: 4,
    type: 'Card',
    user: {
      first_name: 'Amir',
      id: 'sd515',
      last_name: 'Nazari',
      phone: '09012895868',
    },
    visit_time: {
      start: {
        from: 9,
        to: 1,
      },
      end: {
        from: 4,
        to: 8,
      },
    },

    desc: 'توضیحاااات ',
    images: [
      'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
      'https://unsplash.com/photos/VuatLT0MkQE/download?force=true&w=640',
      'https://unsplash.com/photos/FytRPOMijMA/download?force=true&w=640',
    ],
    distinct: 'هاشمیه',
  });

  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    // api
    //   .get(`/posts/${props.id}`)
    //   .then((v) => {
    //     if (v.ok) {
    //       console.log('v', v.data);
    //       setAd(v.data as IAds);
    //     } else {
    //       throw v.problem;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //   });
  }, [props.id]);

  const translateKindOfHouse = useCallback((t?: 'APARTMENT' | 'HOUSE') => {
    switch (t) {
      case 'APARTMENT':
        return 'آپارتمان';
      case 'HOUSE':
        return 'خانه';
    }
    return '';
  }, []);

  return ad ? (
    <>
      <View style={{flex: 1}}></View>
      <View
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#f6f6f6',
          paddingTop: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageWrapper}>
              <Swiper
                // style={styles.swiperWrapper}
                showsButtons={false}
                directionalLockEnabled={true}
                disableScrollViewPanResponder={true}
                dotColor="#8b8b8b"
                activeDotColor="#ffffff"
                loop={true}
                onScroll={() => {
                  // console.log('kjknkjbbhjgc');
                }}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}>
                {ad.images?.map((v: string, i: number) =>
                  v ? (
                    <View style={styles.imageItemWrapper} key={v + i}>
                      <View style={styles.starStyle}>
                        <StarSVG fill="#ffff00" />
                      </View>
                      <FastImage style={styles.imageStyle} source={{uri: v}} />
                    </View>
                  ) : null,
                ) || <></>}
              </Swiper>
            </View>
            <Seprator margin={0} />
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>
                <Text>{ad.name || ''}</Text>
              </Text>
            </View>
            <Seprator margin={0} />
            <View style={styles.shortInfoWrapper}>
              <View style={styles.shortInfoCode}>
                <Text
                  style={{fontSize: 13, lineHeight: 23, textAlign: 'center'}}>
                  {ad.code || ''}کد ملک:{' '}
                </Text>
              </View>
              <View style={styles.shortInfoCreated}>
                <Text
                  style={{fontSize: 13, lineHeight: 23, textAlign: 'center'}}>
                  {persianDate(new Date(ad.created)?.getTime())}
                </Text>
              </View>
              <View style={styles.shortInfoSocial}>
                <View style={{marginHorizontal: 7.5}}>
                  <ShareSVG
                    onPress={() => {
                      Share.open(options)
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => {
                          err && console.log(err);
                        });
                    }}
                  />
                </View>
                <View style={{marginHorizontal: 7.5}}>
                  <BookmarkSVG
                    fill={bookmarked ? MainColor : '#fff'}
                    stroke={bookmarked ? MainColor : '#707070'}
                    onPress={() => {
                      setBookmarked(!bookmarked);
                    }}
                  />
                </View>
              </View>
            </View>
            <Seprator margin={0} />
            <View style={styles.visitWrapper}>
              <View style={{width: '100%', paddingVertical: 2}}>
                <Text
                  style={{
                    fontSize: 10,
                    lineHeight: 18,
                    textAlign: 'center',
                    color: '#01babc',
                  }}>
                  زمان مناسب برای بازدید
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingVertical: 7.5,
                }}>
                <View
                  style={{
                    width: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      fontSize: 9,
                      lineHeight: 18,
                    }}>
                    زمان قبل از ظهر
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.clockTextinput}>
                      {persianNumber(ad.visit_time?.start?.from)}
                    </Text>
                    <Text>تا</Text>
                    <Text style={styles.clockTextinput}>
                      {persianNumber(ad.visit_time?.start?.to)}
                    </Text>
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
                    width: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      fontSize: 9,
                      lineHeight: 18,
                    }}>
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
                    <Text style={styles.clockTextinput}>
                      {persianNumber(ad.visit_time?.end?.from)}
                    </Text>
                    <Text>تا</Text>
                    <Text style={styles.clockTextinput}>
                      {persianNumber(ad.visit_time?.end?.to)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Seprator margin={0} />
            <View style={styles.costWrapper}>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 15,
                    lineHeight: 25,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  قیمت:
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    lineHeight: 25,
                    textAlign: 'right',
                    textAlignVertical: 'center',
                    color: MainColor,
                  }}>
                  {ad.price}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 15,
                    lineHeight: 25,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  متر مربع:
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    lineHeight: 25,
                    textAlign: 'right',
                    textAlignVertical: 'center',
                    color: MainColor,
                  }}>
                  {ad.price}
                </Text>
              </View>
            </View>
            <Seprator margin={0} />
            <View style={styles.detailWrapper}>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <ArchitectureSVG />
                <Text
                  style={{
                    marginHorizontal: 10,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 13,
                    lineHeight: 25,
                  }}>
                  {translateKindOfHouse(ad.property_type)}
                </Text>
              </View>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <HomeSVG />
                <Text
                  style={{
                    marginHorizontal: 10,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 13,
                    lineHeight: 25,
                  }}>
                  {ad.distinct}
                </Text>
              </View>
            </View>
            <Seprator margin={0} />
            <View style={styles.descWrapper}>
              <Text
                style={{fontSize: 13, lineHeight: 25, textAlign: 'left'}}
                numberOfLines={4}>
                {ad.desc}
              </Text>
              <Pressable
                style={{
                  position: 'absolute',
                  right: 30,
                  bottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 21,
                    textAlign: 'left',
                    color: '#01babc',
                    textDecorationLine: 'underline',
                  }}>
                  گزارش خطا
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <View style={styles.CTOWrapper}>
          <Pressable
            style={{
              width: '50%',
              height: 40,
              backgroundColor: '#707070',
              borderTopLeftRadius: 15,
            }}>
            <Text
              style={{
                width: '100%',
                height: '100%',
                fontSize: 13,
                lineHeight: 20,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: '#fff',
              }}>
              اطلاعات و آدرس
            </Text>
          </Pressable>
          <Pressable
            style={{
              width: '50%',
              height: 40,
              backgroundColor: MainColor,
              borderTopRightRadius: 15,
            }}
            onPress={() => {}}>
            <Text
              style={{
                width: '100%',
                height: '100%',
                fontSize: 13,
                lineHeight: 20,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: '#fff',
              }}>
              تماس
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

    paddingHorizontal: 9,
    paddingTop: 5,
    backgroundColor: '#f6f6f6',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imageWrapper: {
    width: '100%',
    height: 160,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageItemWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    // paddingRight: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: '#8b8b8b',
    width: 21,
    height: 3,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: -45,
  },
  activeDot: {
    backgroundColor: '#ffffff',
    width: 21,
    height: 3,
    marginLeft: 2,
    marginRight: 2,
    marginBottom: -45,
  },
  starStyle: {
    position: 'absolute',
    top: 5,
    zIndex: 100,
    right: 20,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignSelf: 'center',
  },
  titleWrapper: {
    width: '100%',
    backgroundColor: '#fff',

    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  title: {
    fontSize: 13,
    lineHeight: 25,
    textAlign: 'center',
  },
  shortInfoWrapper: {
    width: '100%',
    backgroundColor: '#fff',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',

    paddingVertical: 13,
  },
  shortInfoCode: {},
  shortInfoCreated: {
    borderColor: 'rgba(0, 0, 0, 0.16)',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingHorizontal: 25,
  },
  shortInfoSocial: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  visitWrapper: {
    width: '100%',
    backgroundColor: '#fff',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  costWrapper: {
    width: '100%',
    backgroundColor: '#fff',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  detailWrapper: {
    width: '100%',
    backgroundColor: '#fff',

    paddingVertical: 11,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  descWrapper: {
    width: '100%',
    height: 160,
    backgroundColor: '#fff',

    paddingHorizontal: 22,
    paddingVertical: 10,

    position: 'relative',
  },
  clockTextinput: {
    ...borderShadowStyle,
    backgroundColor: '#fff',
    width: 24,
    height: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'rgba(112, 112, 112, 0.5)',
    borderRadius: 5,
    marginHorizontal: 28,
    fontSize: 13,
    lineHeight: 20,
  },
  CTOWrapper: {
    width: '90%',
    height: 40,
    position: 'absolute',
    bottom: 0,

    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

    marginHorizontal: '5%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

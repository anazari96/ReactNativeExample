/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import StarRating from 'react-native-star-rating';

import {IAds} from 'models/GeneralModels';
import {MainColor} from 'constants/variables';
import {persianNumber} from 'utils/persianNumber';
import {formatMoney} from 'utils/formatMoney';

import BookmarkSVG from 'assets/icons/bookmark.svg';
import StarSVG from 'assets/icons/star.svg';

export const AdCard: React.FC<
  IAds & {
    contentOffset?: number;
    setScrollEnabled?: Function;
    scrollEnabled?: boolean;
  }
> = (props) => {
  // const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(true);
  const navigation = useNavigation();
  const translateKindOfTransfer = useCallback((t?: 'SELL' | 'RENT') => {
    switch (t) {
      case 'SELL':
        return 'فروشی';
      case 'RENT':
        return 'رهن و اجاره';
    }
    return '';
  }, []);

  const translateKindOfHouse = useCallback((t?: 'APARTMENT' | 'HOUSE') => {
    switch (t) {
      case 'APARTMENT':
        return 'آپارتمان';
      case 'HOUSE':
        return 'خانه';
    }
    return '';
  }, []);

  const styles = useMemo(() => stylesFunc(props.type), [props.type]);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('MyModal', {id: props.id});
      }}>
      <View style={styles.container}>
        <View
          style={styles.imageWrapper}
          onStartShouldSetResponder={() => {
            props.setScrollEnabled?.(false);
            if (props.scrollEnabled === false) {
              props?.setScrollEnabled?.(true);
            }
            return true;
          }}>
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
            dot={
              <View
                style={{
                  backgroundColor: '#8b8b8b',
                  width: 21,
                  height: 3,
                  marginLeft: 2,
                  marginRight: 2,
                  marginBottom: -45,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#ffffff',
                  width: 21,
                  height: 3,
                  marginLeft: 2,
                  marginRight: 2,
                  marginBottom: -45,
                }}
              />
            }>
            {props.images?.map((v: string, i: number) =>
              v ? (
                <View
                  style={{position: 'relative', paddingRight: 6}}
                  key={v + i}>
                  <View style={styles.bookmarkStyle}>
                    <TouchableOpacity onPress={() => console.log('touch')}>
                      <BookmarkSVG fill="rgba(0, 0, 0, 0.2)" stroke="#fff" />
                    </TouchableOpacity>
                  </View>
                  {props.type === 'Card' ? (
                    <View style={styles.starStyle}>
                      <StarSVG fill="#ffff00" />
                    </View>
                  ) : (
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        left: 10,
                        zIndex: 100,
                      }}>
                      <StarRating
                        containerStyle={{width: '35%'}}
                        starSize={10}
                        disabled={true}
                        maxStars={5}
                        rating={props.stars}
                        fullStarColor={MainColor}
                        emptyStarColor={'transparent'}
                      />
                    </View>
                  )}
                  <FastImage
                    style={styles.imageStyle}
                    source={{uri: v}}
                    key={i}
                  />
                </View>
              ) : null,
            ) || <></>}
          </Swiper>
        </View>

        <View style={styles.descWrapper}>
          <View
            style={{
              height: 26,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              backgroundColor: '#fafafa',
            }}>
            <Text style={{width: '33%', height: '100%', textAlign: 'center'}}>
              {translateKindOfTransfer(props.post_type)}
            </Text>
            <Text
              style={{
                width: '33%',
                height: '100%',
                textAlign: 'center',
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5,
                borderColor: 'rgba(87, 87, 87, 0.2)',
              }}>
              {translateKindOfHouse(props.property_type)}
            </Text>
            <Text style={{width: '33%', height: '100%', textAlign: 'center'}}>
              {persianNumber(props.area)} متر
            </Text>
          </View>
          <View
            style={{
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderStyle: 'solid',
              borderColor: '#e8e8e8',
              borderWidth: 0.5,
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <Text style={{}}>{props.desc}</Text>
          </View>
          <View
            style={{
              height: 41,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row-reverse',
              borderStyle: 'solid',
              borderColor: '#e8e8e8',
              borderWidth: 0.5,
            }}>
            <Text style={{color: MainColor, fontSize: 13}}>قیمت:</Text>
            <Text style={{color: MainColor, fontSize: 13}}>
              {persianNumber(formatMoney(props.price, 0, '.', '/'))}
            </Text>
            <Text style={{color: MainColor, fontSize: 13}}>تومان</Text>
          </View>
          <View
            style={{
              height: 25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              backgroundColor: '#fafafa',
              borderBottomRightRadius: 7,
              borderBottomLeftRadius: 7,
            }}>
            <Text style={{width: '33%', height: '100%', textAlign: 'center'}}>
              {/* {persianDate?.(props.created?.getTime())} */}
            </Text>
            <Text
              style={{
                width: '33%',
                height: '100%',
                textAlign: 'center',
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5,
                borderColor: 'rgba(87, 87, 87, 0.2)',
              }}>
              {props.distinct}
            </Text>
            <Text style={{width: '33%', height: '100%', textAlign: 'center'}}>
              {persianNumber(props.rooms)} خوابه
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const stylesFunc = (mode: 'Card' | 'Land') =>
  StyleSheet.create({
    container:
      mode === 'Card'
        ? {
            elevation: 10,
            backgroundColor: '#fff',
            width: 237,
            height: 280,
            display: 'flex',
            backfaceVisibility: 'hidden',
            padding: 0,
            borderRadius: 7,
          }
        : {
            elevation: 10,
            backgroundColor: '#fff',
            width: '100%',
            height: 140,
            display: 'flex',
            flexDirection: 'row-reverse',
            backfaceVisibility: 'hidden',
            padding: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            marginVertical: 4.5,
          },
    imageWrapper:
      mode === 'Card'
        ? {height: '50%', width: '100%'}
        : {height: '100%', flex: 1, paddingVertical: 9, paddingHorizontal: 6},
    imageStyle:
      mode === 'Card'
        ? {
            height: 140,
            width: '100%',
            borderTopRightRadius: 7,
            borderTopLeftRadius: 7,
          }
        : {
            height: '100%',
            width: '100%',
            borderRadius: 7,
          },
    descWrapper: {
      ...(mode === 'Card' ? {height: '50%'} : {height: '100%', width: '63.8%'}),
      // display: 'flex',
      // flexDirection: 'row-reverse',
    },
    bookmarkStyle:
      mode === 'Land'
        ? {position: 'absolute', top: 0, right: 18, zIndex: 100}
        : {position: 'absolute', top: 0, left: 18, zIndex: 100},
    starStyle:
      mode === 'Land'
        ? {position: 'absolute', top: 0, left: 18, zIndex: 100}
        : {position: 'absolute', top: 0, right: 18, zIndex: 100},
  });

AdCard.defaultProps = {
  type: 'Card',
};

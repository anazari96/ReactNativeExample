/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {FastImage} from 'react-native-fast-image';
import {persianDate} from '../../utils/persianDate';
import {MainColor} from '../../constants/variables';
import {persianNumber} from '../../utils/persianNumber';

interface IProps {
  type: 'Card' | 'Land';
  images: string[];
  kindOfTransfer: 'sell' | 'rent';
  kindOfHouse: 'villa' | 'apartment' | 'land';
  area: number;
  desc: string;
  price: number;
  date: Date;
  location: string;
  numberOfRoom: number;
  isBookmarked: boolean;
  isStared: boolean;
}

export const AdCard: React.FC<IProps> = (props) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: 237,
        height: 280,
        display: 'flex',
        backfaceVisibility: 'hidden',
        padding: 0,
        borderRadius: 7,
      }}>
      <View style={{height: 140}}>
        <FlatList
          data={props.images}
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderTopRightRadius: 7,
            borderTopLeftRadius: 7,
          }}
          renderItem={({item}) => (
            <View>
              <Image
                style={{
                  height: 140,
                  width: 237,
                  borderTopRightRadius: 7,
                  borderTopLeftRadius: 7,
                }}
                source={require('../../assets/images/test.jpg')}
              />
            </View>
          )}
        />
      </View>

      <View style={{height: 140}}>
        <View
          style={{
            height: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row-reverse',
            backgroundColor: '#fafafa',
          }}>
          <Text style={{width: '33%', height: '100%', textAlign: 'center'}}>
            {props.kindOfTransfer}
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
            {props.kindOfHouse}
          </Text>
          <Text style={{width: '33%', height: '100%', textAlign: 'center'}}>
            {props.area} متر
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
            {persianNumber(props.price)}
          </Text>
          <Text style={{color: MainColor, fontSize: 13}}>تومان</Text>
        </View>
        <View
          style={{
            height: 25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row-reverse',
            backgroundColor: '#fafafa',
            borderBottomRightRadius: 7,
            borderBottomLeftRadius: 7,
          }}>
          <Text style={{width: '33%', height: '100%', textAlign: 'center'}}>
            {persianDate(props.date.getTime())}
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
            {props.location}
          </Text>
          <Text style={{width: '33%', height: '100%', textAlign: 'center'}}>
            {props.numberOfRoom} خوابه
          </Text>
        </View>
      </View>
    </View>
  );
};

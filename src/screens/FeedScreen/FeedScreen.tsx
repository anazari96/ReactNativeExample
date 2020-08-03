/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';

import {FeedAds} from 'containers/FeedAds/FeedAds';
import {getFeedAction} from 'redux/actions/feedAction';

interface IProps {}

export const FeedScreen: React.FC<IProps> = (props) => {
  const [kindOfAd, setKindOfAd] = useState<'sell' | 'rent' | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedAction());
  }, [dispatch]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
      }}>
      <View
        style={{
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingHorizontal: 6,
        }}>
        {/* first row of filters */}
        <View style={{flexDirection: 'row', height: 28, marginBottom: 5}}>
          {/* kind of ad: sell or rent */}
          <Picker
            selectedValue={kindOfAd}
            style={[styles.picker, styles.firstPicker]}
            onValueChange={(itemValue) => setKindOfAd(itemValue as 'sell')}>
            <Picker.Item label="فروش" value="sell" />
            <Picker.Item label="اجاره و رهن" value="rent" />
          </Picker>
          {/* Search */}
          <TextInput
            placeholder="جستجو"
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#fff',
              color: '#707070',
              borderRadius: 5,
              // textAlign: 'center',
              textAlignVertical: 'center',
              fontSize: 15,
              padding: 0,
              paddingLeft: 5,
            }}
          />
        </View>
        <View style={{flexDirection: 'row-reverse', height: 28}}>
          {/* Price */}
          <Picker
            selectedValue={kindOfAd}
            style={[styles.picker]}
            onValueChange={(itemValue) => setKindOfAd(itemValue as 'sell')}>
            <Picker.Item label="فروش" value="sell" />
            <Picker.Item label="اجاره و رهن" value="rent" />
          </Picker>
          {/* kind of house */}
          <Picker
            selectedValue={kindOfAd}
            style={[styles.picker]}
            onValueChange={(itemValue) => setKindOfAd(itemValue as 'sell')}>
            <Picker.Item label="فروش" value="sell" />
            <Picker.Item label="اجاره و رهن" value="rent" />
          </Picker>
          {/* area */}
          <Picker
            selectedValue={kindOfAd}
            style={[styles.picker]}
            onValueChange={(itemValue) => setKindOfAd(itemValue as 'sell')}>
            <Picker.Item label="فروش" value="sell" />
            <Picker.Item label="اجاره و رهن" value="rent" />
          </Picker>
          {/* more */}
          <Picker
            selectedValue={kindOfAd}
            style={[styles.picker]}
            onValueChange={(itemValue) => setKindOfAd(itemValue as 'sell')}
            itemStyle={{
              alignItems: 'center',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              fontSize: 50,
              fontWeight: '700',
            }}>
            <Picker.Item label="rrrrrr" value="sell" />
            <Picker.Item label="tttttttttt" value="rent" />
          </Picker>
        </View>
      </View>

      <ScrollView style={{width: '100%'}}>
        <FeedAds mode="Card" />
        <FeedAds mode="Land" />
        {/* {v.map((item: any) => {
          return <AdCard {...item} type={'Land'} key={item.id} />;
        })} */}
      </ScrollView>
      {/* <AdCard
        area={200}
        date={new Date(1594219253000)}
        desc="فروش منزل ویلایی واقع در هاشیمه مشهد
        موقعیت عالی"
        images={[
          'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
          'https://unsplash.com/photos/VuatLT0MkQE/download?force=true&w=640',
          'https://unsplash.com/photos/FytRPOMijMA/download?force=true&w=640',
        ]}
        isBookmarked={false}
        isStared={false}
        kindOfHouse={'apartment'}
        kindOfTransfer={'rent'}
        location="هاشمیه"
        numberOfRoom={3}
        price={1000000}
        type="Card"
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: '100%',
    backgroundColor: '#01babc',
    // marginRight: 6,
    marginLeft: 5,
    flex: 1,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 2,
    shadowRadius: 0,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: 'rgba(112, 112, 112, 0.2)',
    padding: 0,
    margin: 0,
    fontSize: 12,
  },
  firstPicker: {
    width: 108,
    flex: undefined,
  },
});

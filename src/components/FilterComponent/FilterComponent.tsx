/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Pressable, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {MainColor} from 'constants/variables';

interface IProps {
  setFilter: Function;
}

export const FilterComponent: React.FC<IProps> = ({setFilter}) => {
  const [kindOfAd, setKindOfAd] = useState<'sell' | 'rent' | undefined>();
  const [cost, setCost] = useState();
  const [kind, setKind] = useState();
  const [area, setArea] = useState();
  const [more, setMore] = useState();

  return (
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
        <View
          style={[
            styles.pickerWrapper,
            {flex: undefined},
            kindOfAd ? {backgroundColor: MainColor} : undefined,
          ]}>
          <Picker
            selectedValue={kindOfAd}
            style={[styles.picker, styles.firstPicker]}
            onValueChange={(itemValue) => setKindOfAd(itemValue as 'sell')}>
            <Picker.Item label="فروش" value="sell" />
            <Picker.Item label="اجاره و رهن" value="rent" />
          </Picker>
        </View>
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
            paddingLeft: 5,
            elevation: 5,
          }}
        />
        <Pressable
          style={[
            styles.pickerWrapper,
            {flex: undefined, paddingHorizontal: 10},
          ]}>
          <Text style={{fontSize: 12, lineHeight: 22}}>نقشه</Text>
        </Pressable>
      </View>
      <View style={{flexDirection: 'row-reverse', height: 28}}>
        {/* Price */}
        <View
          style={[
            styles.pickerWrapper,
            cost ? {backgroundColor: MainColor} : undefined,
          ]}>
          <Picker
            selectedValue={cost}
            style={[styles.picker]}
            onValueChange={(itemValue) => setCost(itemValue)}>
            <Picker.Item label="قیمت" value="sell" />
            <Picker.Item label="" value="rent" />
          </Picker>
        </View>

        {/* kind of house */}
        <View
          style={[
            styles.pickerWrapper,
            kind ? {backgroundColor: MainColor} : undefined,
          ]}>
          <Picker
            selectedValue={kind}
            style={[styles.picker]}
            onValueChange={(itemValue) => setKind(itemValue)}>
            <Picker.Item label="نوع" value={''} />
            <Picker.Item label="" value="rent" />
          </Picker>
        </View>
        {/* area */}
        <View
          style={[
            styles.pickerWrapper,
            area ? {backgroundColor: MainColor} : undefined,
          ]}>
          <Picker
            selectedValue={area}
            style={[styles.picker]}
            onValueChange={(itemValue) => setArea(itemValue)}>
            <Picker.Item label="متراژ" value="" />
            <Picker.Item label="" value="rent" />
          </Picker>
        </View>
        {/* more */}
        <View
          style={[
            styles.pickerWrapper,
            more ? {backgroundColor: MainColor} : undefined,
          ]}>
          <Picker
            selectedValue={more}
            style={[styles.picker]}
            onValueChange={(itemValue) => setMore(itemValue)}
            itemStyle={{
              alignItems: 'center',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              fontSize: 50,
              fontWeight: '700',
            }}>
            <Picker.Item label="بیشتر" value="" />
            <Picker.Item label="" value="rent" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {
    height: '100%',
    flex: 1,

    backgroundColor: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,

    borderRadius: 5,
    elevation: 5,
  },
  picker: {
    width: '100%',
    // width: '100%',
    // marginRight: 6,
    // marginLeft: 5,
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

/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {MapView} from 'components/MapView/MapView';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {MainColor} from 'constants/variables';
import {Region} from 'react-native-maps';

interface IProps {
  setLocation: Function;
}

export const SelectMapStep: React.FC<IProps> = (props) => {
  const [location, setLocation] = useState<
    {latitude: number; longitude: number} | undefined
  >();

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>موقیت مکانی ملک خود را مشخص کنید...؟</Text>
      </View>
      <View style={styles.mapWrapper}>
        <MapView
          markers={location ? [{cord: location as Region, id: 0}] : undefined}
          selectLocationEnabled={true}
          selectLocation={setLocation}
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <Pressable
          onPress={() => {
            props.setLocation();
          }}
          style={{
            width: 127,
            height: 36,
            borderRadius: 5,
            backgroundColor: '#fefefe',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 18,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            الان نه
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log('location', location);

            props.setLocation(location);
          }}
          style={{
            width: 127,
            height: 36,
            borderRadius: 5,
            backgroundColor: '#01babc',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 18,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            ثبت
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',

    backgroundColor: '#f6f6f6',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  titleWrapper: {
    width: '100%',
    height: 26,
    marginVertical: 5,
  },
  title: {
    width: '100%',
    fontSize: 16,
    lineHeight: 27,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: MainColor,
  },
  mapWrapper: {
    width: '100%',
    height: '78%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsWrapper: {
    width: '100%',
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingVertical: 8,
  },
});

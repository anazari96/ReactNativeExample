import React from 'react';
import {MapView} from 'components/MapView/MapView';
import {Pressable, Text, View, StyleSheet, Dimensions} from 'react-native';
import {MainColor} from 'constants/variables';

interface IProps {}

export const SelectMapStep: React.FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>موقیت مکانی ملک خود را مشخص کنید...؟</Text>
      </View>
      <View style={styles.mapWrapper}>
        <MapView />
      </View>
      <View style={styles.buttonsWrapper}>
        <Pressable style={{width: 127, height: 36, borderRadius: 5}}>
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
          style={{
            width: 127,
            height: 36,
            borderRadius: 5,
            backgroundColor: '#01babc',
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
    justifyContent: 'center',
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
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsWrapper: {
    width: '100%',
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
});

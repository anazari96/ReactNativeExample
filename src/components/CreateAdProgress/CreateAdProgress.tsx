/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Dimensions, Pressable} from 'react-native';
import {persianNumber} from '../../utils/persianNumber';

interface IProps {
  step: number;
  setStep: Function;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

    backgroundColor: '#707070',
    paddingHorizontal: 30,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  ball: {
    width: 16,
    height: 16,
    borderRadius: 50,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: (Dimensions.get('window').width - 108) / 2,
    backgroundColor: '#fff',
    height: 2,
  },
  ballText: {
    fontSize: 12,
    lineHeight: 20,
  },
  descText: {
    width: 70,

    fontSize: 10,
    lineHeight: 18,
    textAlign: 'justify',
  },
  ballWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',

    marginBottom: 9,
  },
  descWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export const CreateAdProgress: React.FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.ballWrapper}>
        <View style={[styles.ball, {backgroundColor: '#01babc'}]}>
          <Pressable
            onPress={() => {
              props.setStep(1);
            }}>
            <Text style={styles.ballText}>{persianNumber('1')}</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.line,
            {backgroundColor: props.step >= 2 ? '#01babc' : '#fff'},
          ]}
        />
        <View
          style={[
            styles.ball,
            {backgroundColor: props.step >= 2 ? '#01babc' : '#fff'},
          ]}>
          <Pressable
            onPress={() => {
              props.setStep(2);
            }}>
            <Text style={styles.ballText}>{persianNumber('2')}</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.line,
            {backgroundColor: props.step >= 3 ? '#01babc' : '#fff'},
          ]}
        />
        <View
          style={[
            styles.ball,
            {backgroundColor: props.step >= 3 ? '#01babc' : '#fff'},
          ]}>
          <Pressable
            onPress={() => {
              props.setStep(3);
            }}>
            <Text style={styles.ballText}>{persianNumber('3')}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.descWrapper}>
        <Pressable
          onPress={() => {
            props.setStep(1);
          }}>
          <Text
            style={[
              styles.descText,
              {
                color: '#01babc',
                textShadowColor: '#01babc',
                textShadowOffset: {
                  width: 0,
                  height: 3,
                },
                textShadowRadius: 6,
              },
            ]}>
            اطلاعات ملک
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            props.setStep(2);
          }}>
          <Text
            style={[
              styles.descText,
              props.step >= 2
                ? {
                    color: '#01babc',
                    textShadowColor: '#01babc',
                    textShadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    textShadowRadius: 6,
                  }
                : {
                    color: '#fff',
                  },
            ]}>
            اطلاعات کاربری
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            props.setStep(3);
          }}>
          <Text
            style={[
              styles.descText,
              props.step >= 3
                ? {
                    color: '#01babc',
                    textShadowColor: '#01babc',
                    textShadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    textShadowRadius: 6,
                  }
                : {
                    color: '#fff',
                  },
              ,
            ]}>
            اطلاعات نهایی
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

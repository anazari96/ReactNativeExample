import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {MainColor, StrokeColor} from '../../constants/variables';

interface IProps {
  title: string;
  subTitle?: string;
  required: boolean;
  childStyle?: any;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 14,
    zIndex: 10,
  },
  titleWrapper: {
    width: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',

    marginVertical: 4,
    paddingHorizontal: 5,
  },
  title: {
    marginHorizontal: 5,

    fontSize: 9,
    lineHeight: 18,
    color: StrokeColor,
  },
  required: {
    fontSize: 9,
    lineHeight: 18,
    color: MainColor,
  },
  childrenWrapper: {
    width: '100%',

    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.5)',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
});

export const InputWrapper: React.FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{props.title}</Text>
        {props.required ? <Text style={styles.required}>*</Text> : null}
        {props.subTitle ? (
          <Text style={styles.title}>{props.subTitle}</Text>
        ) : null}
      </View>
      <View style={props.childStyle || styles.childrenWrapper}>
        {props.children}
      </View>
    </View>
  );
};

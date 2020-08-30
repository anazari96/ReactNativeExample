import React from 'react';
import {View, Text} from 'react-native';
import {MainColor} from 'constants/variables';

export const CommingSoon = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 30,
          lineHeight: 40,
          color: MainColor,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}>
        این قسمت هنوز آماده نشده است
      </Text>
    </View>
  );
};

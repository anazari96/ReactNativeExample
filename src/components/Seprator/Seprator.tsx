import React from 'react';
import {View} from 'react-native';

export const Seprator: React.FC<any> = (props) => {
  return (
    <View
      style={{
        width: '100%',
        height: 0.5,
        backgroundColor: '#000',
        marginVertical: props.margin || props.margin === 0 ? 0 : 11,
      }}></View>
  );
};

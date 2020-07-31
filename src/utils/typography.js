import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {StrokeColor} from '../constants/variables';

export const typography = () => {
  const oldTextRender = Text.render;
  Text.render = function (...args) {
    const origin = oldTextRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    });
  };
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'IRANSans',
    color: StrokeColor,
  },
});

import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import SaleSVG from '../../assets/icons/sale.svg';
import ForkSVG from '../../assets/icons/fork.svg';

var {width} = Dimensions.get('window');

interface IProps {
  title: string;
  color: string;
  isOff: boolean;
}

const styles = StyleSheet.create({
  container: {
    width: 74,
    height: 98,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  iconWrapper: {
    width: 74,
    height: 65.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'relative',
  },
  textWrapper: {
    marginTop: 11.4,
    width: '100%',
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saleWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 500,
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Category: React.FC<IProps> = (props) => {
  return (
    <View style={[styles.container, {width: `${100 / parseInt(width / 99)}%`}]}>
      <View style={[styles.iconWrapper, {backgroundColor: props.color}]}>
        {props.isOff && (
          <View style={[styles.saleWrapper, {backgroundColor: props.color}]}>
            <SaleSVG />
          </View>
        )}
        <TouchableOpacity>
          {/* <FastImage source={{uri: }} /> */}
          <ForkSVG />
        </TouchableOpacity>
      </View>
      <View style={styles.textWrapper}>
        <Text>{props.title}</Text>
      </View>
    </View>
  );
};

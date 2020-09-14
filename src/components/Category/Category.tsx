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
import {useNavigation} from '@react-navigation/native';
import {MainColor, StrokeColor} from 'constants/variables';

var {width} = Dimensions.get('window');

interface IProps {
  title: string;
  color: string;
  isOff?: boolean;
  onPress?: Function;
}

const styles = StyleSheet.create({
  container: {
    width: 98,
    height: 92,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 9,
    elevation: 10,
    borderRadius: 38,
  },
  iconWrapper: {
    width: 50,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  textWrapper: {
    marginTop: 17.4,
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
  const navigation = useNavigation();
  return (
    <View style={[styles.container]}>
      <View style={[styles.iconWrapper]}>
        {/* {props.isOff && (
          <View style={[styles.saleWrapper]}>
            <SaleSVG fill={MainColor} color={MainColor} />
          </View>
        )} */}
        <TouchableOpacity
          onPress={() => {
            if (props.onPress) {
              props.onPress();
            } else {
              navigation.navigate('ExploreItemScreen', {props: 'job'});
            }
          }}>
          {/* <FastImage source={{uri: }} /> */}
          <ForkSVG fill={props.color} />
        </TouchableOpacity>
      </View>
      <View style={styles.textWrapper}>
        <Text style={{fontSize: 10, lineHeight: 20, color: StrokeColor}}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {MainColor} from 'constants/variables';

interface IProps {
  title: string;
  onPress: Function;
  isActive?: boolean;
}

export const Button: React.FC<IProps> = (props) => {
  const {title, onPress, isActive} = props;

  return (
    <View style={styles.submitWrapper}>
      <Pressable
        style={[
          styles.submitBtn,
          {backgroundColor: isActive ? MainColor : '#fff'},
        ]}
        onPress={() => {
          onPress();
        }}>
        <Text style={[styles.submitText, {color: isActive ? '#fff' : '#000'}]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  submitWrapper: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginHorizontal: 10,
  },
  submitBtn: {
    height: 36,
    backgroundColor: MainColor,
    borderRadius: 5,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
  },
});

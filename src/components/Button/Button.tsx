import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {MainColor} from 'constants/variables';

interface IProps {
  title: string;
  onPress: Function;
}

export const Button: React.FC<IProps> = (props) => {
  const {title, onPress} = props;

  return (
    <View style={styles.submitWrapper}>
      <Pressable
        style={styles.submitBtn}
        onPress={() => {
          onPress();
        }}>
        <Text style={styles.submitText}>{title}</Text>
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
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
  },
});

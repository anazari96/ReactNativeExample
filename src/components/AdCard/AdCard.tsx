import React from 'react';
import {ImageBackground, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  type: 'Card' | 'Land';
}

export const AdCard: React.FC<IProps> = (props) => {
  return (
    <TouchableOpacity>
      <ImageBackground />
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
      <View>
        <Text></Text>
      </View>
      <View>
        <Text></Text>
      </View>
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
    </TouchableOpacity>
  );
};

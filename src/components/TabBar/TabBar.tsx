import React, {useState, useEffect} from 'react';
import {View, Pressable, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {SecondaryMainColor} from 'constants/variables';

interface IProps {
  defaultTab: string;
  setFilter: Function;
}

export const TabBar: React.FC<IProps> = (props) => {
  const [q, setQ] = useState<string | undefined>();
  const [tab, setTab] = useState<string>();
  const navigation = useNavigation();

  useEffect(() => {
    setTab(props.defaultTab);
  }, [props.defaultTab]);

  return (
    <View
      style={{
        width: '100%',
        height: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 6,
      }}>
      {/* first row of filters */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: 33,
          marginBottom: 7,
          // position: 'relative',
          zIndex: 2,
        }}>
        <Icon
          name="long-arrow-right"
          size={20}
          style={{marginHorizontal: 5}}
          color="#707070"
          onPress={() => {
            navigation.goBack();
          }}
        />
        {/* Search */}
        <TextInput
          placeholder="جستجو"
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            color: '#707070',
            borderRadius: 5,
            textAlignVertical: 'center',
            fontSize: 15,
            padding: 0,
            paddingHorizontal: 5,
            elevation: 5,
          }}
          value={q}
          onChangeText={(v) => setQ(v)}
        />
      </View>
      <View
        style={{
          height: 28,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 2,
        }}>
        <View style={{flex: 1}}>
          <Pressable
            style={{
              height: 33,
              backgroundColor: tab === 'job' ? SecondaryMainColor : '#fff',
              borderColor: SecondaryMainColor,
              borderWidth: 1,
              borderStyle: 'solid',
              elevation: 8,
              borderRadius: 5,
              marginHorizontal: 5,
              paddingHorizontal: 5,
            }}
            onPress={() => {
              props.setFilter({tab: 'job'});
              //   setTab('job');
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                color: tab === 'job' ? '#fff' : SecondaryMainColor,
                fontSize: 13,
                lineHeight: 33,
              }}>
              مشاغل و کسب و کارها
            </Text>
          </Pressable>
        </View>
        <View style={{flex: 1}}>
          <Pressable
            style={{
              height: 33,
              backgroundColor: tab === 'public' ? SecondaryMainColor : '#fff',
              borderColor: SecondaryMainColor,
              borderWidth: 1,
              borderStyle: 'solid',
              elevation: 8,
              borderRadius: 5,
              marginHorizontal: 5,
              paddingHorizontal: 5,
            }}
            onPress={() => {
              props.setFilter({tab: 'public'});
            }}>
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                color: tab === 'public' ? '#fff' : SecondaryMainColor,
                fontSize: 13,
                lineHeight: 33,
              }}>
              مراکز دولتی و عمومی
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

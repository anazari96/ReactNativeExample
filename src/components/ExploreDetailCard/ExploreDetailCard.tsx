import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import BookmarkSVG from 'assets/icons/bookmark.svg';
import ShareSVG from 'assets/icons/share.svg';
import MapView from 'components/MapView';

interface IProps {}

type ModalStackParam = {
  MyModal: {item: any};
};
type ModalScreenNavigationProp = StackNavigationProp<
  ModalStackParam,
  'MyModal'
>;

export const ExploreDetailCard: React.FC<
  IProps & {navigation: ModalScreenNavigationProp; route: any}
> = (props) => {
  const [tab, setTab] = useState<'info' | 'vitrin'>('info');
  const {item} = props.route.params;

  return (
    <View>
      <View>
        <FastImage
          source={{uri: item.pic}}
          style={{
            width: '100%',
            height: '100%',
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            alignSelf: 'center',
          }}
        />
        <View>
          <Text>{item.title}</Text>
        </View>
      </View>
      <View>
        <View>
          <Text>{item.title}</Text>
          <View>
            <Text>{item.percentage}</Text>
            <Text>تخفیف</Text>
          </View>
        </View>
        <View>
          <Text>{item.description}</Text>
        </View>
      </View>
      <View>
        <View>
          <Icon name="location" />
          <Text>{item.location}</Text>
        </View>
        <View>
          <Icon name="eye" />
          <Text>{item.views}</Text>
        </View>
        <ShareSVG />
        <BookmarkSVG />
      </View>
      <View>
        <View>
          <Pressable>
            <Icon name="info-circle" />
            <Text></Text>
          </Pressable>
          <Pressable>
            <Icon name="image" />
            <Text></Text>
          </Pressable>
        </View>
        {tab === 'info' ? (
          <View>
            <Text>{item.address}</Text>
          </View>
        ) : null}
      </View>
      {tab === 'info' ? (
        <>
          <View>
            <Icon name="phone" />
            <Text>{item.phone}</Text>
          </View>
          <View>
            <Icon name="clock" />
            <Text>{item.phone}</Text>
          </View>
          <View>
            <Text></Text>
            <MapView />
          </View>
        </>
      ) : (
        <View></View>
      )}
    </View>
  );
};

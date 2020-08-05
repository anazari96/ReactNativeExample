import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {OrderedMap} from 'immutable';

import AdCard from 'components/AdCard';
import {IAds} from 'models/GeneralModels';

interface IProps {
  mode: 'Card' | 'Land';
}

export const FeedAds: React.FC<IProps> = (props) => {
  const ads: OrderedMap<string, IAds> = useSelector((state: any) =>
    state.get('feedReducer'),
  );
  const refFlatList = useRef<any>();
  const styles = useMemo(() => stylesFunc(props.mode), [props.mode]);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const v = [
    {
      area: 150,
      created: new Date(),
      desc: 'توضیحاااات ',
      id: '123',
      images: [
        'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
        'https://unsplash.com/photos/VuatLT0MkQE/download?force=true&w=640',
        'https://unsplash.com/photos/FytRPOMijMA/download?force=true&w=640',
      ],
      isBookmarked: true,
      isStared: false,
      property_type: 'HOUSE',
      post_type: 'SELL',
      distinct: 'هاشمیه',
      rooms: 5,
      price: 10000000,
    },
    {
      area: 250,
      created: new Date(),
      desc: '123546546توضیحاااات ',
      id: '12358',
      images: [
        'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
        'https://unsplash.com/photos/VuatLT0MkQE/download?force=true&w=640',
        'https://unsplash.com/photos/FytRPOMijMA/download?force=true&w=640',
      ],
      isBookmarked: true,
      isStared: true,
      property_type: 'HOUSE',
      post_type: 'RENT',
      distinct: 'هاشمیه 22',
      rooms: 3,
      price: 10705100,
    },
    {
      area: 150,
      created: new Date(),
      desc: 'توضیحاااات ',
      id: '12443',
      images: [
        'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
        'https://unsplash.com/photos/VuatLT0MkQE/download?force=true&w=640',
        'https://unsplash.com/photos/FytRPOMijMA/download?force=true&w=640',
      ],
      isBookmarked: true,
      isStared: false,
      property_type: 'APARTMENT',
      post_type: 'SELL',
      distinct: 'هاشمیه',
      rooms: 5,
      price: 10000000,
    },
    {
      area: 250,
      created: new Date(),
      desc: '123546546توضیحاااات ',
      id: '1235558',
      images: [
        'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
        'https://unsplash.com/photos/VuatLT0MkQE/download?force=true&w=640',
        'https://unsplash.com/photos/FytRPOMijMA/download?force=true&w=640',
      ],
      isBookmarked: true,
      isStared: true,
      property_type: 'HOUSE',
      post_type: 'RENT',
      distinct: 'هاشمیه 22',
      rooms: 3,
      price: 10705100,
    },
    {
      area: 150,
      created: new Date(),
      desc: 'توضیحاااات ',
      id: '1221233',
      images: [
        'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
        'https://unsplash.com/photos/VuatLT0MkQE/download?force=true&w=640',
        'https://unsplash.com/photos/FytRPOMijMA/download?force=true&w=640',
      ],
      isBookmarked: true,
      isStared: false,
      property_type: 'APARTMENT',
      post_type: 'SELL',
      distinct: 'هاشمیه',
      rooms: 5,
      price: 10000000,
    },
    {
      area: 250,
      created: new Date(),
      desc: '123546546توضیحاااات ',
      id: '124343358',
      images: [
        'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
        'https://unsplash.com/photos/VuatLT0MkQE/download?force=true&w=640',
        'https://unsplash.com/photos/FytRPOMijMA/download?force=true&w=640',
      ],
      isBookmarked: true,
      isStared: true,
      property_type: 'HOUSE',
      post_type: 'RENT',
      distinct: 'هاشمیه 22',
      rooms: 3,
      price: 10705100,
    },
    {
      area: 150,
      created: new Date(),
      desc: 'توضیحاااات ',
      id: '129093',
      images: [
        'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
        'https://unsplash.com/photos/VuatLT0MkQE/download?force=true&w=640',
        'https://unsplash.com/photos/FytRPOMijMA/download?force=true&w=640',
      ],
      isBookmarked: true,
      isStared: false,
      property_type: 'APARTMENT',
      post_type: 'SELL',
      distinct: 'هاشمیه',
      rooms: 5,
      price: 10000000,
    },
    {
      area: 250,
      created: new Date(),
      desc: '123546546توضیحاااات ',
      id: '12312358',
      images: [
        'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
        'https://unsplash.com/photos/VuatLT0MkQE/download?force=true&w=640',
        'https://unsplash.com/photos/FytRPOMijMA/download?force=true&w=640',
      ],
      isBookmarked: true,
      isStared: true,
      property_type: 'HOUSE',
      post_type: 'RENT',
      distinct: 'هاشمیه 22',
      rooms: 3,
      price: 10705100,
    },
  ];

  return props.mode === 'Card' ? (
    <View style={styles.container}>
      <FlatList
        style={{display: 'flex'}}
        horizontal={true}
        inverted={false}
        ItemSeparatorComponent={() => <View style={{marginHorizontal: 4.5}} />}
        data={v as IAds[]}
        renderItem={({item}) => (
          <AdCard
            {...item}
            type={props.mode}
            key={item.id}
            contentOffset={refFlatList?.current?.contentOffset}
            setScrollEnabled={setScrollEnabled}
            scrollEnabled={scrollEnabled}
          />
        )}
        keyExtractor={(item) => `${item.id}`}
        ref={refFlatList}
        scrollEnabled={scrollEnabled}
      />
    </View>
  ) : (
    <>
      {v?.map((item) => {
        return <AdCard {...item} type={props.mode} key={item.id} />;
      })}
    </>
  );
};

const stylesFunc = (mode: 'Card' | 'Land') =>
  StyleSheet.create({
    container: {
      display: 'flex',
      marginTop: mode === 'Card' ? 16 : 0,
      marginBottom: 9,
      width: mode === 'Card' ? undefined : '100%',
      height: 289,
      // width: '100%',
      // flexDirection: 'c',
      // alignItems: '',
    },
  });

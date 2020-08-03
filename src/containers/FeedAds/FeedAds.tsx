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

  // console.log('ads', Object.values(ads?.toJS()));

  return props.mode === 'Card' ? (
    <View style={styles.container}>
      <FlatList
        style={{display: 'flex'}}
        horizontal={true}
        inverted={true}
        ItemSeparatorComponent={() => <View style={{marginHorizontal: 4.5}} />}
        data={Object.values(ads?.toJS())}
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
        ref={refFlatList}
        scrollEnabled={scrollEnabled}
      />
    </View>
  ) : (
    <>
      {Object.values(ads?.toJS())?.map((item) => {
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

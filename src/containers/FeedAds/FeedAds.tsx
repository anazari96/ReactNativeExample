import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';

import {AdCard} from '../../components/AdCard/AdCard';
import {IAds} from '../../models/GeneralModels';
import {OrderedMap} from 'immutable';

interface IProps {
  mode: 'Card' | 'Land';
}

export const FeedAds: React.FC<IProps> = (props) => {
  const ads: OrderedMap<string, IAds> = useSelector((state: any) =>
    state.get('adsReducer'),
  );

  const styles = useMemo(() => stylesFunc(props.mode), [props.mode]);

  return props.mode === 'Card' ? (
    <View style={styles.container}>
      <FlatList
        style={{display: 'flex'}}
        horizontal={true}
        inverted={true}
        ItemSeparatorComponent={() => (
          <View style={{marginHorizontal: 4.5}}></View>
        )}
        data={ads?.toArray()?.map((v) => v[1]?.toJS())}
        renderItem={({item}) => (
          <AdCard {...item} type={props.mode} key={item.id} />
        )}
      />
    </View>
  ) : (
    <>
      {ads
        ?.toArray()
        ?.map((v) => v[1]?.toJS())
        .map((item) => {
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

import React, {useCallback, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Region} from 'react-native-maps';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {OrderedMap} from 'immutable';
import {TabView, SceneMap} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import {IAds} from '../../models/GeneralModels';
import {AdCard} from '../../components/AdCard/AdCard';
import {MapView} from '../../components/MapView/MapView';
import {Category} from '../../components/Category/Category';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabsWrapper: {
    width: '100%',
    height: 36,
    marginTop: 16,
    marginBottom: 18,
    paddingHorizontal: 19,
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemsWrapper: {
    flex: 1,
    flexDirection: 'row',

    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    width: '100%',
    height: 36,
    backgroundColor: '#f6f6f6',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: 10,
    width: '100%',
    height: 36,
    marginTop: 16,
    marginBottom: 18,
    paddingHorizontal: 19,
  },
  tabItem: {
    flex: 1,
    width: '100%',
    height: 36,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
});

const EntertainmentRoute = () => (
  <ScrollView>
    <View style={styles.itemsWrapper}>
      <Category title={'رستوران'} color={'#b13232'} isOff={true} />
      <Category title={'کافی شاپ'} color={'#e1b36e'} isOff={false} />
      <Category title={'فست فود'} color={'#ee0061'} isOff={true} />
      <Category title={'شهر بازی'} color={'#07e877'} isOff={true} />
      <Category title={'پارک'} color={'#2854b9'} isOff={false} />
      <Category title={'استخر'} color={'#797d5a'} isOff={true} />
      <Category title={'سینما'} color={'#2854b9'} isOff={false} />
    </View>
  </ScrollView>
);

const ShopRoute = () => (
  <ScrollView>
    <View style={styles.itemsWrapper}>
      <Category title={'رستوران'} color={'#b13232'} isOff={true} />
      <Category title={'کافی شاپ'} color={'#e1b36e'} isOff={false} />
      <Category title={'فست فود'} color={'#ee0061'} isOff={true} />
      <Category title={'شهر بازی'} color={'#07e877'} isOff={true} />
      <Category title={'پارک'} color={'#2854b9'} isOff={false} />
      <Category title={'استخر'} color={'#797d5a'} isOff={true} />
      <Category title={'سینما'} color={'#2854b9'} isOff={false} />
    </View>
  </ScrollView>
);

const ServicesRoute = () => (
  <ScrollView>
    <View style={styles.itemsWrapper}>
      <Category title={'رستوران'} color={'#b13232'} isOff={true} />
      <Category title={'کافی شاپ'} color={'#e1b36e'} isOff={false} />
      <Category title={'فست فود'} color={'#ee0061'} isOff={true} />
      <Category title={'شهر بازی'} color={'#07e877'} isOff={true} />
      <Category title={'پارک'} color={'#2854b9'} isOff={false} />
      <Category title={'استخر'} color={'#797d5a'} isOff={true} />
      <Category title={'سینما'} color={'#2854b9'} isOff={false} />
    </View>
  </ScrollView>
);

const initialLayout = {width: Dimensions.get('window').width};

export const ExploreScreen: React.FC = (props) => {
  const ads: OrderedMap<string, IAds> = useSelector((state: any) =>
    state.get('adsReducer'),
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'entertainment', title: 'تفریحی'},
    {key: 'shop', title: 'فروشگاهی'},
    {key: 'services', title: 'خدماتی'},
  ]);

  const renderScene = SceneMap({
    entertainment: EntertainmentRoute,
    shop: ShopRoute,
    services: ServicesRoute,
  });

  // const [selectedMarker, setSelectedMarker] = useState();
  // const pressOnMarker = useCallback((id: string) => {
  //   setSelectedMarker(id);
  // }, []);

  const markers: {
    id: number;
    cord: Region;
    title: string;
    desc: string;
    ad?: any;
  }[] = [
    {
      id: 123,
      cord: {
        latitude: 36.22,
        longitude: 59.585,
        latitudeDelta: 0.015,
        longitudeDelta: 0.025,
      },
      title: 'fastfood',
      desc: 'This is the best fastfood in this area',
    },
    {
      id: 1237,
      cord: {
        latitude: 36.2,
        longitude: 59.5185,
        latitudeDelta: 0.015,
        longitudeDelta: 0.025,
      },
      title: 'hotel',
      desc: '5 stars hotel',
    },
    {
      id: 13,
      cord: {
        latitude: 36.29,
        longitude: 59.4585,
        latitudeDelta: 0.015,
        longitudeDelta: 0.025,
      },
      title: 'bar',
      desc: 'disco bar',
    },
    {
      id: 12366,
      cord: {
        latitude: 36.32,
        longitude: 59.3585,
        latitudeDelta: 0.015,
        longitudeDelta: 0.025,
      },
      title: 'parking',
      desc: '1200 place parking',
    },
  ];

  // useEffect(() => {
  // const ms = ads.map((v) => {
  //   const t = markers[Math.floor(Math.random() * 4)];
  //   t.ad = v;
  //   return t;
  // });

  //   console.log('ms', ms.toJS());
  // }, [ads, markers]);

  const _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolateNode(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 255 : 0,
                ),
              }),
            ),
            0,
            0,
          );

          console.log('color', color);

          return (
            // <Animated.View style={{color}}>
            <Pressable
              style={[
                styles.tabItem,
                index === i && {backgroundColor: '#01babc'},
              ]}
              onPress={() => setIndex(i)}>
              <Text>{route.title}</Text>
            </Pressable>
            // {/* </Animated.View> */}
            // // <TouchableOpacity
            // //   style={styles.tabItem}
            // //   onPress={() => setIndex(i)}>
            // //   <Animated.Text style={{color}}>{route.title}</Animated.Text>
            // // </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    // <View style={styles.container}>
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
    // </View>
  );
};

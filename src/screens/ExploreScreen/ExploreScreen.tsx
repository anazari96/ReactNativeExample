import React, {useCallback, useState, useEffect, useMemo, memo} from 'react';
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
import {CommingSoon} from 'components/CommingSoon/CommingSoon';
import {SafeAreaView} from 'react-native-safe-area-context';
import FilterComponent from 'components/FilterComponent';
import FilterScreen from 'screens/FilterScreen';
import TabBar from 'components/TabBar';
import {createStackNavigator} from '@react-navigation/stack';
import {ExploreItemContainer} from 'containers/ExploreItemContainer/ExploreItemContainer';
import {ExploreMapContainer} from 'containers/ExploreMapContainer/ExploreMapContainer';
import {MainColor} from 'constants/variables';
import ExploreDetailCard from 'components/ExploreDetailCard';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    // width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    // flex: 1,
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
    justifyContent: 'space-between',
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
    paddingTop: 10,
    // width: 100,
    // width: Dimensions.get('screen').width,
    height: 36,
    // marginTop: 16,
    // marginBottom: 18,
    // paddingHorizontal: 19,
  },
  tabItem: {
    flex: 1,
    width: '100%',
    height: 36,
    // padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
});

const EntertainmentRoute = () => (
  <ScrollView>
    <View style={styles.itemsWrapper}>
      <Category title={'رستوران'} color={MainColor} isOff={true} />
      <Category title={'کافی شاپ'} color={MainColor} isOff={false} />
      <Category title={'فست فود'} color={MainColor} isOff={true} />
      <Category title={'شهر بازی'} color={MainColor} isOff={true} />
      <Category title={'پارک'} color={MainColor} isOff={false} />
      <Category title={'استخر'} color={MainColor} isOff={true} />
      <Category title={'سینما'} color={MainColor} isOff={false} />
    </View>
  </ScrollView>
);

const ShopRoute = () => (
  <ScrollView>
    <View style={styles.itemsWrapper}>
      <Category title={'رستوران'} color={MainColor} isOff={true} />
      <Category title={'کافی شاپ'} color={MainColor} isOff={false} />
      <Category title={'فست فود'} color={MainColor} isOff={true} />
      <Category title={'شهر بازی'} color={MainColor} isOff={true} />
      <Category title={'پارک'} color={MainColor} isOff={false} />
      <Category title={'استخر'} color={MainColor} isOff={true} />
      <Category title={'سینما'} color={MainColor} isOff={false} />
    </View>
  </ScrollView>
);

const ServicesRoute = () => (
  <ScrollView>
    <View style={styles.itemsWrapper}>
      <Category title={'رستوران'} color={MainColor} isOff={true} />
      <Category title={'کافی شاپ'} color={MainColor} isOff={false} />
      <Category title={'فست فود'} color={MainColor} isOff={true} />
      <Category title={'شهر بازی'} color={MainColor} isOff={true} />
      <Category title={'پارک'} color={MainColor} isOff={false} />
      <Category title={'استخر'} color={MainColor} isOff={true} />
      <Category title={'سینما'} color={MainColor} isOff={false} />
    </View>
  </ScrollView>
);

const initialLayout = {width: Dimensions.get('window').width};

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

export const ExploreScreen: React.FC = (props) => {
  // const [index, setIndex] = useState(0);
  // const routes = useMemo(
  //   () => [
  //     {key: 'entertainment', title: 'تفریحی'},
  //     {key: 'shop', title: 'فروشگاهی'},
  //     {key: 'services', title: 'خدماتی'},
  //   ],
  //   [],
  // );

  const [filter, setFilter] = useState<any>({tab: 'job'});

  // const renderScene = SceneMap({
  //   entertainment: EntertainmentRoute,
  //   shop: ShopRoute,
  //   services: ServicesRoute,
  // });

  // // const [selectedMarker, setSelectedMarker] = useState();
  // // const pressOnMarker = useCallback((id: string) => {
  // //   setSelectedMarker(id);
  // // }, []);

  // // useEffect(() => {
  // // const ms = ads.map((v) => {
  // //   const t = markers[Math.floor(Math.random() * 4)];
  // //   t.ad = v;
  // //   return t;
  // // });

  // //   console.log('ms', ms.toJS());
  // // }, [ads, markers]);

  // const renderTabBar = (props) => {
  //   const inputRange = props.navigationState.routes.map((x, i) => i);

  //   console.log('here', props.navigationState.routes);
  //   return (
  //     <View style={styles.tabBar}>
  //       {props.navigationState.routes.map((route, i) => {
  //         const color = Animated.color(
  //           Animated.round(
  //             Animated.interpolateNode(props.position, {
  //               inputRange,
  //               outputRange: inputRange.map((inputIndex) =>
  //                 inputIndex === i ? 255 : 0,
  //               ),
  //             }),
  //           ),
  //           0,
  //           0,
  //         );

  //         return (
  //           // <Animated.View>
  //           //   <Pressable
  //           //     style={[
  //           //       styles.tabItem,
  //           //       index === i && {backgroundColor: '#01babc'},
  //           //     ]}
  //           //     onPress={() => setIndex(i)}>
  //           //     <Text>{route.title}</Text>
  //           //   </Pressable>
  //           // </Animated.View>
  //           <TouchableOpacity
  //             style={styles.tabItem}
  //             onPress={() => setIndex(i)}>
  //             <Animated.Text style={{color}}>{route.title}</Animated.Text>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
  // };

  const content = useMemo(() => {
    switch (filter.tab) {
      case 'job': {
        return <ServicesRoute />;
      }
      case 'public': {
        return <ShopRoute />;
      }
      default:
        return null;
    }
  }, [filter]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
      }}>
      <TabBar defaultTab={filter.tab} setFilter={setFilter} />
      {content}
    </SafeAreaView>
  );
};

export default memo(() => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="ExploreItemScreen" component={ExploreItemContainer} />
      <Stack.Screen name="ExploreMapScreen" component={ExploreMapContainer} />
      <Stack.Screen name="ExploreDetailScreen" component={ExploreDetailCard} />
    </Stack.Navigator>
  );
});

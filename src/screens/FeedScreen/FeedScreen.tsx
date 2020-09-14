/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, memo} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';
import {Region} from 'react-native-maps';

import {getFeedAction} from 'redux/actions/feedAction';
import FilterScreen from 'screens/FilterScreen';
import FilterComponent from 'components/FilterComponent';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SecondaryMainColor} from 'constants/variables';

const Stack = createStackNavigator();

interface IProps {}

export const FeedScreen: React.FC<IProps> = (props) => {
  const [myLoc, setMyLoc] = useState<Region | undefined>();
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<any>();

  useEffect(() => {
    dispatch(getFeedAction());
  }, [dispatch]);

  useEffect(() => {
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ])
      .then((v) => {
        let requests: any[] = [];
        if (v['android.permission.ACCESS_COARSE_LOCATION'] === 'denied') {
          requests.push(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
        }
        if (v['android.permission.ACCESS_FINE_LOCATION'] === 'denied') {
          requests.push(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        if (requests.length > 0) {
          requestMultiple([
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          ])
            .then((statuses) => {
              console.log(
                'ACCESS_FINE_LOCATION',
                statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
              );
              console.log(
                'ACCESS_COARSE_LOCATION',
                statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION],
              );
            })
            .catch((err) => {
              console.log('err request', err);
            });
        }
      })
      .catch((err) => {
        console.log('err check', err);
      })
      .finally(() => {
        Geolocation.getCurrentPosition(
          (position) => {
            setMyLoc({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.025,
              longitudeDelta: 0.0321,
            });
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            forceRequestLocation: true,
          },
        );
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
      }}>
      <FilterComponent setFilter={setFilter} />
      <FilterScreen filter={filter} />
    </SafeAreaView>
  );
};

export default memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <View
            style={{
              width: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 10,
            }}>
            <Icon name="bell" size={25} color={'#fff'} />
            <Icon name="envelope" size={25} color={'#fff'} />
          </View>
        ),
        headerStyle: {
          backgroundColor: SecondaryMainColor,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },

        headerTintColor: '#fff',
        headerTitleStyle: {color: '#FFF'},
        headerTitle: (props) => <Text style={{color: '#fff'}}>خانه</Text>,
      }}>
      <Stack.Screen name="FeedScreen" component={FeedScreen} />
    </Stack.Navigator>
  );
});

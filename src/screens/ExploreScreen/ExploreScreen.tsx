import React, {useCallback, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Region} from 'react-native-maps';
import {View} from 'react-native';
import {OrderedMap} from 'immutable';
import {IAds} from '../../models/GeneralModels';
import {AdCard} from '../../components/AdCard/AdCard';
import {MapView} from '../../components/MapView/MapView';

export const ExploreScreen: React.FC = (props) => {
  const ads: OrderedMap<string, IAds> = useSelector((state: any) =>
    state.get('adsReducer'),
  );

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
        latitude: 37.2,
        longitude: -122.085,
        latitudeDelta: 0.015,
        longitudeDelta: 0.025,
      },
      title: 'fastfood',
      desc: 'This is the best fastfood in this area',
    },
    {
      id: 1237,
      cord: {
        latitude: 37.32,
        longitude: -122.085,
        latitudeDelta: 0.015,
        longitudeDelta: 0.025,
      },
      title: 'hotel',
      desc: '5 stars hotel',
    },
    {
      id: 13,
      cord: {
        latitude: 37.2,
        longitude: -122.055,
        latitudeDelta: 0.015,
        longitudeDelta: 0.025,
      },
      title: 'bar',
      desc: 'disco bar',
    },
    {
      id: 12366,
      cord: {
        latitude: 37.27,
        longitude: -122.045,
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

  return (
    <View>
      <MapView
        markers={ads.toArray().map((v) => {
          const t = markers[Math.floor(Math.random() * 4)];
          t.ad = v;
          return t;
        })}
      />
      {/* <AdCard {} type="Land" /> */}
    </View>
  );
};

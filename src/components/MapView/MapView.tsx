import React, {useState, useEffect} from 'react';
import MV, {PROVIDER_GOOGLE, Region, Marker} from 'react-native-maps';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {AdCard} from 'components/AdCard/AdCard';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

interface IProps {
  markers?: {
    id: number;
    cord: Region;
    title: string;
    desc: string;
    ad?: any;
  }[];
  startRegion?: Region;
  showUserLocation?: boolean;
  zoomEnabled?: boolean;
  selectLocationEnabled?: boolean;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  previewMarkerWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    width: '100%',
  },
});

export const MapView: React.FC<IProps> = (props) => {
  const [myLoc, setMyLoc] = useState<Region | undefined>();
  const [previewMarker, setPreviewMarker] = useState<any>();

  useEffect(() => {
    if (props.startRegion) {
      setMyLoc(props.startRegion);
    } else {
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
    }
  }, [props.startRegion]);

  return (
    <View style={styles.container}>
      <MV
        showsUserLocation={props.showUserLocation || true}
        showsMyLocationButton={false}
        zoomEnabled={props.zoomEnabled || true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={() => {
          if (previewMarker) {
            setPreviewMarker(undefined);
          }
        }}
        onPanDrag={() => {
          if (previewMarker) {
            setPreviewMarker(undefined);
          }
        }}
        onLongPress={(e) => {
          if (props.selectLocationEnabled) {
            console.log('longpress', e);
          }
        }}
        // cacheEnabled={true}
        // region={myLoc}
        initialRegion={myLoc}>
        {props.markers?.map((v) => (
          <Marker
            identifier={`${v.id}`}
            coordinate={v.cord}
            title={v.title}
            description={v.desc}
            onPress={(e) => {
              setPreviewMarker(v.ad?.toJS());
            }}
          />
        ))}
      </MV>

      <View style={styles.previewMarkerWrapper}>
        {previewMarker && <AdCard {...previewMarker} type="Land" />}
      </View>
    </View>
  );
};

import React, {useState, useEffect} from 'react';
import MV, {PROVIDER_GOOGLE, Region, Marker} from 'react-native-maps';
import {View, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

import {AdCard} from 'components/AdCard/AdCard';

interface IProps {
  markers?: {
    id: number;
    cord: Region;
    title?: string;
    desc?: string;
    ad?: any;
  }[];
  startRegion?: Region;
  showUserLocation?: boolean;
  zoomEnabled?: boolean;
  selectLocationEnabled?: boolean;
  selectLocation?: (v: {latitude: number; longitude: number}) => void;
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
        });
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
          if (props.selectLocationEnabled && props.selectLocation) {
            console.log('longpress', e.nativeEvent.coordinate);
            props.selectLocation(e.nativeEvent.coordinate);
          }
        }}
        // cacheEnabled={true}
        // region={myLoc}
        initialRegion={myLoc}>
        {props.markers?.map((v) => (
          <Marker
            identifier={`${v.id}`}
            coordinate={v.cord}
            title={v.title || ''}
            description={v.desc || ''}
            onPress={(e) => {
              setPreviewMarker(v.ad?.toJS());
            }}
            key={v.id}
          />
        ))}
      </MV>

      <View style={styles.previewMarkerWrapper}>
        {previewMarker && <AdCard {...previewMarker} type="Land" />}
      </View>
    </View>
  );
};

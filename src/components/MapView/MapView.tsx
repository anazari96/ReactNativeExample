import React, {useState, useEffect} from 'react';
import MV, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import {View, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

interface IProps {
  markers?: {
    id: number;
    cord: Region;
    title: string;
    desc: string;
    ad?: any;
  }[];
  startRegion?: Region;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export const MapView: React.FC<IProps> = (props) => {
  const [myLoc, setMyLoc] = useState<Region | undefined>();

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
      <MV provider={PROVIDER_GOOGLE} style={styles.map} region={myLoc}>
        {props.markers?.map((v) => (
          <Marker
            identifier={`${v.id}`}
            coordinate={v.cord}
            title={v.title}
            description={v.desc}
            onPress={(e) => {
              console.log('hereee', e);
            }}
          />
        ))}
      </MV>
    </View>
  );
};

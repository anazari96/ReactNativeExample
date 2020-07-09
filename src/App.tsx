import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer, BaseRouter} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Svg, {Use, Image} from 'react-native-svg';
import {store} from './redux/store';

import FeedScreen from './screens/FeedScreen';

import FolderSVG from './assets/icons/folder.svg';
import PinSVG from './assets/icons/pin.svg';
import LocationSVG from './assets/icons/location.svg';
import MenuSVG from './assets/icons/menu.svg';
import UserSVG from './assets/icons/users-cog.svg';
import {MainColor, StrokeColor} from './constants/variables';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              console.log('route', route);

              switch (route.name) {
                case 'Feed':
                  return (
                    <PinSVG
                      height={25}
                      fill={focused ? MainColor : undefined}
                      stroke={focused ? MainColor : StrokeColor}
                    />
                  );
                case 'MyAds':
                  return (
                    <FolderSVG
                      height={25}
                      fill={focused ? MainColor : undefined}
                      stroke={focused ? MainColor : StrokeColor}
                    />
                  );
                case 'CreateAds':
                  return (
                    <MenuSVG
                      height={25}
                      fill={focused ? MainColor : undefined}
                      stroke={focused ? MainColor : StrokeColor}
                    />
                  );
                case 'Explore':
                  return (
                    <LocationSVG
                      height={25}
                      fill={focused ? MainColor : StrokeColor}
                      // stroke={focused ? MainColor : StrokeColor}
                    />
                  );
                case 'Profile':
                  return (
                    <UserSVG
                      height={25}
                      fill={focused ? MainColor : undefined}
                      stroke={focused ? MainColor : StrokeColor}
                    />
                  );
                default:
                  return null;
              }
              // let iconName;

              // if (route.name === 'Feed') {
              //   iconName = focused
              //     ? 'ios-information-circle'
              //     : 'ios-information-circle-outline';
              // } else if (route.name === 'Profile') {
              //   iconName = focused ? 'ios-list-box' : 'ios-list';
              // }

              // You can return any component that you like here!
            },
          })}
          tabBarOptions={{
            activeTintColor: MainColor,
            inactiveTintColor: StrokeColor,
            labelStyle: {
              fontWeight: 'normal',
              lineHeight: 20,
            },
            style: {
              height: 48,
              fontWeight: 100,
              fontSize: 24,
              // display: 'flex',
              // alignItems: 'center',
              // judtifyContent: 'center',
            },
            tabStyle: {padding: 2},
          }}>
          <Tab.Screen
            name="Profile"
            options={{title: 'پروفایل'}}
            component={FeedScreen}
          />
          <Tab.Screen
            name="Explore"
            options={{title: 'معرفی'}}
            component={FeedScreen}
          />
          <Tab.Screen
            name="CreateAds"
            options={{title: 'ثبت آگهی'}}
            component={FeedScreen}
          />
          <Tab.Screen
            name="MyAds"
            options={{title: 'آگهی های من'}}
            component={FeedScreen}
          />
          <Tab.Screen
            name="Feed"
            options={{title: 'مشهد'}}
            component={FeedScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

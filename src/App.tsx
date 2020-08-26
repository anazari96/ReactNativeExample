import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Svg, {Use, Image} from 'react-native-svg';
import {store} from 'redux/store';
import {MainColor, StrokeColor} from 'constants/variables';
import {typography} from 'utils/typography';

import FeedScreen from 'screens/FeedScreen';
import ExploreScreen from 'screens/ExploreScreen';
import MyAdsScreen from 'screens/MyAdsScreen';
import CreateAdsScreen from 'screens/CreateAdsScreen';
import LoginScreen from 'screens/LoginScreen';

import FolderSVG from 'assets/icons/folder.svg';
import PinSVG from 'assets/icons/pin.svg';
import LocationSVG from 'assets/icons/location.svg';
import MenuSVG from 'assets/icons/menu.svg';
import UserSVG from 'assets/icons/users-cog.svg';
import ModalScreen from 'screens/ModalScreen';

typography();

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabScreen() {
  return (
    <Tab.Navigator
      // initialRouteName="CreateAds"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
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
        name="Feed"
        options={{title: 'مشهد'}}
        component={FeedScreen}
      />
      <Tab.Screen
        name="MyAds"
        options={{title: 'آگهی های من'}}
        component={MyAdsScreen}
      />
      <Tab.Screen
        name="CreateAds"
        options={{title: 'ثبت آگهی'}}
        component={CreateAdsScreen}
      />
      <Tab.Screen
        name="Explore"
        options={{title: 'معرفی'}}
        component={ExploreScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{title: 'پروفایل'}}
        component={FeedScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack.Navigator
            mode="modal"
            initialRouteName="Login"
            screenOptions={{
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }}>
            <RootStack.Screen
              name="Main"
              component={MainTabScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="MyModal"
              component={ModalScreen}
              options={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'vertical',
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

import React, {useState, useMemo, useCallback} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import {MainColor, StrokeColor} from 'constants/variables';

import MenuSVG from 'assets/images/menu.svg';
import LocationSVG from 'assets/images/location.svg';
import SurfaceSVG from 'assets/images/surface.svg';
import AsyncStorage from '@react-native-community/async-storage';

const datas = [
  {
    image: <MenuSVG />,
    backgroundColor: '#fff',
    title: 'ثبت رایگان آگهی ملک',
    subtitle:
      'کاربر گرامی شما می توانید به صورت رایگان و تعداد نامحدود ملک های خود را در ملکوپین آگهی کنید',
  },
  {
    image: <LocationSVG />,
    backgroundColor: '#fff',
    title: 'معرفی مشاغل و ویژگی های آنها',
    subtitle:
      'کاربر گرامی شما می توانید با ورود به این بخش تمام مشاغل فعال اطراف خود و سطح شهر را بشناسید و از ویژگی های آن استفاده کنید',
  },
  {
    image: <SurfaceSVG />,
    backgroundColor: '#fff',
    title: 'بخش خدماتی و معرفی افراد با تخصص',
    subtitle:
      'کاربر گرامی شما می توانید با ورود به این بخش با افراد فنی و نیروی های خدماتی آشنا شوید و نیاز خود را بر طرف کنید ',
  },
];

export const OnboardingScreens: React.FC<{nextStep: Function}> = ({
  nextStep,
}) => {
  // const renderedScreen = useMemo(() => {}, [nextStep]);

  const saveOnboardingAndNextStep = useCallback(async () => {
    await AsyncStorage.setItem('@onboarding', 'v1');
    nextStep();
  }, [nextStep]);

  return (
    <>
      <Onboarding
        onDone={saveOnboardingAndNextStep}
        onSkip={saveOnboardingAndNextStep}
        pages={datas}
        skipLabel={'رد کردن'}
        nextLabel={'بعدی'}
        // showDone={false}
        // showSkip={false}
        // showNext={false}
        // showPagination={false}
        // containerStyles={{width: 100, height: '100%'}}
        titleStyles={{
          fontSize: 21,
          lineHeight: 46,
          color: MainColor,
          textAlign: 'left',
        }}
        subTitleStyles={{
          fontSize: 13,
          lineHeight: 33,
          color: '#000',
          textAlign: 'left',
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

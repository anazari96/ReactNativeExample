import React, {useState, useMemo, useCallback} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';

import {MainColor, StrokeColor} from 'constants/variables';

import MenuSVG from 'assets/images/menu.svg';
import LocationSVG from 'assets/images/location.svg';
import SurfaceSVG from 'assets/images/surface.svg';

const datas = [
  {
    source: MenuSVG,
    index: 1,
    title: 'ثبت رایگان آگهی ملک',
    desc:
      'کاربر گرامی شما می توانید به صورت رایگان و تعداد نامحدود ملک های خود را در ملکوپین آگهی کنید',
  },
  {
    source: LocationSVG,
    index: 2,
    title: 'معرفی مشاغل و ویژگی های آنها',
    desc:
      'کاربر گرامی شما می توانید با ورود به این بخش تمام مشاغل فعال اطراف خود و سطح شهر را بشناسید و از ویژگی های آن استفاده کنید',
  },
  {
    source: SurfaceSVG,
    index: 3,
    title: 'بخش خدماتی و معرفی افراد با تخصص',
    desc:
      'کاربر گرامی شما می توانید با ورود به این بخش با افراد فنی و نیروی های خدماتی آشنا شوید و نیاز خود را بر طرف کنید ',
  },
];

export const OnboardingScreens: React.FC<{nextStep: Function}> = ({
  nextStep,
}) => {
  const [step, setStep] = useState(1);

  const sharedComponent = useCallback(
    (v) => {
      return (
        <View style={styles.container}>
          <View
            style={{
              width: '100%',
              height: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}>
            {<v.source />}
          </View>
          <View
            style={{
              paddingHorizontal: 14,
              // marginTop: 28,
              // marginBottom: 45,
              width: '100%',
            }}>
            <Text
              style={{
                width: '100%',
                fontSize: 21,
                lineHeight: 46,
                color: MainColor,
                textAlign: 'left',
              }}>
              <Text style={{color: StrokeColor}}>{`${v.index}_`}</Text>
              {v.title}
            </Text>
          </View>
          <View style={{paddingHorizontal: 14}}>
            <Text
              style={{
                fontSize: 13,
                lineHeight: 33,
                textAlign: 'left',
                color: '#000',
              }}>
              {v.desc}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: 20,
            }}>
            <Pressable
              style={{
                width: 140,
                height: 45,
                backgroundColor: MainColor,
                borderRadius: 5,
              }}
              onPress={() => {
                setStep(step + 1);
              }}>
              <Text
                style={{
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontSize: 20,
                  lineHeight: 44,
                  color: '#fff',
                }}>
                بعدی
              </Text>
            </Pressable>
          </View>
        </View>
      );
    },
    [step],
  );

  const renderedScreen = useMemo(() => {
    if (step <= 3) {
      return sharedComponent(datas[step - 1]);
    }
    nextStep();
  }, [step, sharedComponent, nextStep]);

  return <>{renderedScreen}</>;
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

import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {useForm, Controller, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';

import CreateAdProgress from 'components/CreateAdProgress';
import HouseInfoStep from 'components/CreateAdSteps/HouseInfoStep';
import AccountInfoStep from 'components/CreateAdSteps/AccountInfoStep';
import FinalInfoStep from 'components/CreateAdSteps/FinalInfoStep';
import {MainColor} from 'constants/variables';
import {IAds} from 'models/GeneralModels';

interface IProps {}

interface FormData {
  name: string;
  images: string[];
  post_type: 'SELL' | 'RENT';
  property_type: 'HOUSE' | 'APARTMENT';
  area: number;
  price: number;
  price2: number;
  distinct: string;
  rooms: number;
  neighbourhood: string;
  address: string;
  user: string;
  desc: string;
  visit_time: any;
  map: {
    latitude: number;
    longtitude: number;
  };
}

const schema = yup.object({
  address: yup.string().required(),
  area: yup.number().min(1).required(),
  distinct: yup.string().required(),
  name: yup.string().required(),
  neighbourhood: yup.string().required(),
  post_type: yup.string().required().equals(['SELL', 'RENT']),
  price: yup.number().min(0).required(),
  price2: yup.number().min(0).default(0),
  property_type: yup.string().required().equals(['HOUSE', 'APARTMENT']),
  rooms: yup.number().min(0).required(),
  user: yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
  }),
  map: yup.object({
    latitude: yup.number(),
    longitude: yup.number(),
  }),
});

export const CreateAdsScreen: React.FC<IProps> = (props) => {
  const [step, setStep] = useState<number>(1);
  const [ad, setAd] = useState({});
  const methods = useForm<FormData>({
    defaultValues: {
      address: '',
      area: 0,
      desc: '',
      distinct: '',
      images: undefined,
      name: '',
      neighbourhood: '',
      post_type: 'SELL',
      price: 0,
      price2: 0,
      property_type: 'HOUSE',
      rooms: 0,
      user: undefined,
      visit_time: undefined,
      map: undefined,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log('watch', methods.watch('map'), methods.getValues('map'));
  }, [methods.watch('map'), methods.getValues('map')]);

  const nextStep = useCallback(
    (v: IAds) => {
      setAd(v);
      if (step !== 3) {
        setStep(step + 1);
      } else {
        setStep(1);
      }
    },
    [step],
  );

  const renderSteps = useMemo(() => {
    switch (step) {
      case 1:
        return <HouseInfoStep nextStep={nextStep} ad={ad} />;
      case 2:
        return <AccountInfoStep nextStep={nextStep} ad={ad} />;
      case 3:
        return <FinalInfoStep nextStep={nextStep} ad={ad} />;
      default:
        return null;
    }
  }, [step, ad, nextStep]);

  // useEffect(() => {
  //   console.log('jj', methods.watch('distinct'));
  // }, [methods, methods.watch('distinct')]);

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <View style={styles.progressWrapper}>
          <CreateAdProgress step={step} />
        </View>
        {renderSteps}
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
  },
  progressWrapper: {
    height: 62,
    // marginBottom: 62,
  },
  submitWrapper: {
    position: 'absolute',
    width: '100%',

    bottom: 10,

    paddingVertical: 14,
    paddingHorizontal: 14,
    zIndex: 100,
  },
  submitBtn: {
    height: 36,
    backgroundColor: MainColor,
    borderRadius: 5,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
  },
});

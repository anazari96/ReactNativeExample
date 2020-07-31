import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import CreateAdProgress from '../../components/CreateAdProgress';
import HouseInfoStep from '../../components/CreateAdSteps/HouseInfoStep';
import AccountInfoStep from '../../components/CreateAdSteps/AccountInfoStep';
import FinalInfoStep from '../../components/CreateAdSteps/FinalInfoStep';
import {MainColor} from '../../constants/variables';

interface IProps {}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
  },
  progressWrapper: {
    height: 62,
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

export const CreateAdsScreen: React.FC<IProps> = (props) => {
  const [step, setStep] = useState<number>(3);
  const [ad, setAd] = useState({});

  const renderSteps = useMemo(() => {
    switch (step) {
      case 1:
        return <HouseInfoStep setStep={setStep} ad={ad} setAd={setAd} />;
      case 2:
        return <AccountInfoStep setStep={setStep} ad={ad} setAd={setAd} />;
      case 3:
        return <FinalInfoStep setStep={setStep} ad={ad} setAd={setAd} />;
      default:
        return null;
    }
  }, [step, ad]);

  return (
    <View style={styles.container}>
      <View style={styles.progressWrapper}>
        <CreateAdProgress step={step} />
      </View>
      {renderSteps}
      <View style={styles.submitWrapper}>
        <Pressable
          style={styles.submitBtn}
          // onPress={() => {
          //   setSteps(steps + 1);
          // }}
        >
          <Text style={styles.submitText}>ادامه</Text>
        </Pressable>
      </View>
    </View>
  );
};

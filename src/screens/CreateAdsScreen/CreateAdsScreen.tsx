import React, {
  useMemo,
  useState,
  useCallback,
  useReducer,
  useEffect,
} from 'react';
import {View, StyleSheet} from 'react-native';
import * as yup from 'yup';

import CreateAdProgress from 'components/CreateAdProgress';
import HouseInfoStep from 'components/CreateAdSteps/HouseInfoStep';
import AccountInfoStep from 'components/CreateAdSteps/AccountInfoStep';
import FinalInfoStep from 'components/CreateAdSteps/FinalInfoStep';
import {MainColor} from 'constants/variables';
import {IAds, IAction} from 'models/GeneralModels';
import {sub} from 'react-native-reanimated';

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
  age: yup.number().required(),
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

const initialState = {
  address: '',
  area: 0,
  age: undefined,
  desc: '',
  distinct: '',
  images: undefined,
  name: '',
  neighbourhood: '',
  post_type: 'SELL',
  price: undefined,
  price2: undefined,
  property_type: 'HOUSE',
  rooms: 0,
  user: undefined,
  visit_time: undefined,
  map: undefined,
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'SET':
      return {...state, [action.payload.key]: action.payload.value};
    case 'REMOVE':
      return {...state, [action.payload.key]: undefined};
    case 'REMOVE_LIST':
      const t = action.payload.reduce((p, c, i) => ({...p, ...c}));

      return {...state, ...t};
    default:
      return state;
  }
};

export const CreateAdsScreen: React.FC<IProps> = (props) => {
  const [step, setStep] = useState<number>(1);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('state', state);
  }, [state]);

  // const methods = useForm<FormData>({
  //   defaultValues: {
  //     address: '',
  //     area: 0,
  //     desc: '',
  //     distinct: '',
  //     images: undefined,
  //     name: '',
  //     neighbourhood: '',
  //     post_type: 'SELL',
  //     price: 0,
  //     price2: 0,
  //     property_type: 'HOUSE',
  //     rooms: 0,
  //     user: undefined,
  //     visit_time: undefined,
  //     map: undefined,
  //   },
  //   resolver: yupResolver(schema),
  // });

  // useEffect(() => {
  //   console.log('watch', methods.watch('map'), methods.getValues('map'));
  // }, [methods.watch('map'), methods.getValues('map')]);

  const submit = useCallback(() => {
    schema
      .isValid(state)
      .then((r) => {
        console.log('r', r);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [state]);

  const nextStep = useCallback(() => {
    if (step !== 3) {
      setStep(step + 1);
    } else {
      setStep(1);
      submit();
    }
  }, [step, submit]);

  const addToState = useCallback((key: string, value: any) => {
    dispatch({type: 'SET', payload: {key, value}});
  }, []);

  const removeToState = useCallback((key: string) => {
    dispatch({type: 'REMOVE', payload: {key}});
  }, []);

  const removeListToState = useCallback((keys: string[]) => {
    dispatch({
      type: 'REMOVE_LIST',
      payload: keys.map((v) => ({[v]: undefined})),
    });
  }, []);

  const renderSteps = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <HouseInfoStep
            nextStep={nextStep}
            state={state}
            addToState={addToState}
            removeToState={removeToState}
            removeListToState={removeListToState}
          />
        );
      case 2:
        return (
          <AccountInfoStep
            nextStep={nextStep}
            state={state}
            addToState={addToState}
            removeToState={removeToState}
          />
        );
      case 3:
        return (
          <FinalInfoStep
            nextStep={nextStep}
            state={state}
            addToState={addToState}
            removeToState={removeToState}
          />
        );
      default:
        return null;
    }
  }, [step, nextStep, state, addToState, removeToState, removeListToState]);

  // useEffect(() => {
  //   console.log('jj', methods.watch('distinct'));
  // }, [methods, methods.watch('distinct')]);

  return (
    <View style={styles.container}>
      <View style={styles.progressWrapper}>
        <CreateAdProgress step={step} />
      </View>
      {renderSteps}
    </View>
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

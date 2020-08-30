import {create} from 'apisauce';
import {BASE_URL} from '../constants/variables';
import AsyncStorage from '@react-native-community/async-storage';

const api = create({
  baseURL: BASE_URL,
});

api.addAsyncRequestTransform((request) => async () => {
  const token = await AsyncStorage.getItem('@token');
  if (token) {
    request.headers['Authorization'] = `Token ${token}`;
  }
});

export {api};

import AsyncStorage from '@react-native-community/async-storage';

export const get = async (key) => {
  const value = await AsyncStorage.getItem(key);
  try {
    return JSON.parse(value || '');
  } catch (e) {}
  return value;
};

export const put = async (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  return await AsyncStorage.setItem(key, value);
};

export const del = async (key) => {
  return await AsyncStorage.removeItem(key);
};

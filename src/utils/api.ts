import {create} from 'apisauce';
import {BASE_URL} from '../constants/variables';

export const api = create({
  baseURL: BASE_URL,
  headers: {Authorization: 'Token aa8a1a7329e2381787a42736d2be8904cf5f4a4b'},
});

import {create} from 'apisauce';
import {BASE_URL} from '../constants/variables';

export const api = create({
  baseURL: BASE_URL,
  headers: {Authorization: 'Token 6c4ca7f0cf53d43c9ad6c23cc9afb95035c12772'},
});

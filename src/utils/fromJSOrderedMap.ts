import {isKeyed} from 'immutable';

export default function (key, value) {
  return isKeyed(value) ? value.toOrderedMap() : value.toList();
}

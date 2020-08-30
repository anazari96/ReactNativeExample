import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {FeedAds} from 'containers/FeedAds/FeedAds';
import {api} from 'utils/api';
import {fromJS} from 'immutable';

interface IProps {
  filter: filter[];
}

interface filter {
  key: 'gt' | 'e' | 'lt' | 'option' | 'q' | string;
  value: string | filter[];
}

export const FilterScreen: React.FC<IProps> = (props) => {
  const {filter} = props;
  const [filterState, setFilterState] = useState<string | undefined>();
  const [ads, setAds] = useState();

  useEffect(() => {
    let tt = '';
    for (let i = 0; i < filter?.length; i++) {
      const t = filter?.[i];

      if (t) {
        if (typeof t.value === 'string') {
          tt += `${t.key}=${t.value}`;
        } else {
          for (let j = 0; j < t.value?.length; j++) {
            const t2 = t.value[j];
            if (typeof t2.value === 'string') {
              tt += `${t2.key}=${t2.value}`;
            }
          }
        }
        if (i !== filter?.length - 1) {
          tt += '&';
        }
      }
    }
    setFilterState(tt);
  }, [filter]);

  useEffect(() => {
    api
      .get('/posts' + '?' + filterState)
      .then((resp) => {
        if (resp.ok) {
          setAds(fromJS(resp.data));
        } else {
          throw resp.problem;
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [filterState]);

  return (
    <ScrollView style={{width: '100%'}}>
      <FeedAds mode="Card" />
      <FeedAds mode="Land" ads={ads} />
    </ScrollView>
  );
};

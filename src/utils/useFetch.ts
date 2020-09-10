import {useState, useMemo, useCallback, useRef} from 'react';

import {useAuth} from './authContext';
import {BASE_URL} from 'constants/variables';

const striginfyParams = (params) => {
  return '';
  // return (
  //   '?' +
  //   Object.keys(params)
  //     .map((key) => {
  //       const value = params[key];
  //       if (value) {
  //         if (Array.isArray(value)) {
  //           return value.map((v) => v && key + '=' + v).join('&');
  //         } else if (typeof value === 'object') {
  //           return Object.keys(value)
  //             .map((k) => k && key + '.' + k + '=' + value[k])
  //             .join('&');
  //         } else {
  //           return key + '=' + value;
  //         }
  //       }
  //     })
  //     .join('&')
  // );
};

const fetchWrapper = async (url, query) => {
  try {
    const response = await fetch(url, query);
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    }
    return {error: !response.ok, status: response.status, data};
  } catch (error) {
    // console.log(error)
    return {
      error: true,
      status: 1, // client error status
      data: {
        message: JSON.stringify(error),
      },
    };
  }
};

export default (fallbackResponse?: any) => {
  const [response, setResponse] = useState<{
    loading: boolean | string;
    pending?: boolean;
    error?: string | boolean;
    status?: number;
    data: any;
  }>({
    loading: 'NOT_INITIALIZED',
    pending: true,
    error: undefined,
    status: undefined,
    data: fallbackResponse,
  });

  console.log('here');

  const [auth] = useAuth();

  let aborter = useRef(() => {});

  // REVIEW write a useAsyncEffect to handle the async useEffect scenario where a it takes a function an put it inside another function...
  const request = useCallback(
    async (url, query, onData = undefined) => {
      // eslint-disable-next-line no-undef
      const controller = new AbortController();
      const {signal} = controller;
      aborter.current = controller.abort;

      url = BASE_URL + url;

      query = {signal, ...query};

      if (onData) {
      } else {
        setResponse((_response) => ({
          loading: !onData,
          error: false,
          status: _response.status || undefined,
          data: _response.data || undefined,
        }));
      }

      if (query.params) {
        url += striginfyParams(query.params);
      }

      query.headers = {
        Authorization: 'Token ' + auth.token,
        ...query.headers,
      };

      if (
        query.body &&
        !(query.body instanceof FormData) &&
        typeof query.body === 'object'
      ) {
        query.headers = {
          'Content-Type': 'application/json',
          ...query.headers,
        };
        query.body = JSON.stringify(query.body);
      }

      let __response = await fetchWrapper(url, query);

      if (__response.status === 401) {
        // signOut();
      }

      setResponse((_response) => {
        return {
          loading: false,
          error: __response.error,
          status: __response.status,
          data: __response.error
            ? __response.data
            : onData
            ? _response.data
              ? onData(_response.data, __response.data)
              : __response.data
            : __response.data,
        };
      });

      return __response;
    },
    [auth],
  );

  return useMemo<any>(() => [response, request, aborter.current], [
    response,
    request,
    aborter,
  ]);
};

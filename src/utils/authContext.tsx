import React, {
  memo,
  useMemo,
  useCallback,
  createContext,
  useContext,
  useState,
} from 'react';

import {useAppContext} from './appContext';

const authContext = createContext<any>(null);

export const AuthProvider = memo(({children}) => {
  const [appContext, setAppContext] = useAppContext();

  const [auth, setAuth] = useState({
    ...appContext.auth,
  });

  const setAuthAndStorage = useCallback(
    async (newAuth) => {
      newAuth = {
        id: newAuth.id,
        username: newAuth.username,
        password: newAuth.password,
      };
      setAuth(newAuth);
      await setAppContext({
        auth: newAuth,
      });
    },
    [setAppContext],
  );

  const value = useMemo(() => [auth, setAuthAndStorage], [
    auth,
    setAuthAndStorage,
  ]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
});

export const AuthConsumer = memo(({children}: any) => {
  return <authContext.Consumer>{children}</authContext.Consumer>;
});

export const useAuth = () => {
  return useContext(authContext);
};

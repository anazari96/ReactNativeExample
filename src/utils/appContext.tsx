import React, {
  memo,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import {get, put} from './useStorage';

export const AppContext = createContext<any>(null);

const AppProvider = AppContext.Provider;

export const AppContextProvider: React.FC<any> = memo(({children}) => {
  const [appContextImmutableState, setAppContextImmutableState] = useState<
    any
  >();

  useEffect(() => {
    const asyncAction = async () => {
      const value = await get('context');
      setAppContextImmutableState((e) => {
        return {
          ...(e || {}),
          ...(value || {}),
        };
      });
    };
    asyncAction();
  }, []);

  if (!appContextImmutableState) {
    return null;
  }

  return <AppProvider value={appContextImmutableState}>{children}</AppProvider>;
});

const setAppContext = async (value) => {
  const currentValue = await get('context');
  return await put('context', {...currentValue, ...value});
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return [context, setAppContext];
};

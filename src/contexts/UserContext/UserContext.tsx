import React, {useEffect, useState, useCallback} from 'react';
import {Map} from 'immutable';
import AsyncStorage from '@react-native-community/async-storage';

export interface IState {
  me: Map<any, any> | undefined;
  isAgent: boolean;
  getUserKind: Function;
}
export const UserContext = React.createContext<IState>({
  me: Map<any, any>(),
  isAgent: false,
  getUserKind: () => {},
});

const UserProvider: React.FC = (props) => {
  const [isAgent, setIsAgent] = useState(false);

  const getUserKind = useCallback(() => {
    AsyncStorage.getItem('userKind').then((v) => {
      setIsAgent(Boolean(v));
    });
  }, []);

  useEffect(() => {
    getUserKind();
  }, [getUserKind]);

  return (
    <UserContext.Provider
      value={{
        me: undefined,
        isAgent: isAgent,
        getUserKind: getUserKind,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const UserContextConsumer = UserContext.Consumer;
export default UserProvider;

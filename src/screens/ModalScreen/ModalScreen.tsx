import React from 'react';
import AdDetail from 'components/AdDetail';
import {StackNavigationProp} from '@react-navigation/stack';

interface IProps {}

type ModalStackParam = {
  MyModal: {id: string};
};
type ModalScreenNavigationProp = StackNavigationProp<
  ModalStackParam,
  'MyModal'
>;

export const ModalScreen: React.FC<
  IProps & {navigation: ModalScreenNavigationProp; route: any}
> = (props) => {
  return <AdDetail id={props.route.params?.id} />;
};

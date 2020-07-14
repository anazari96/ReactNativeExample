export interface IAction {
  type: string;
  payload: any;
}

export interface IAds {
  id: string;
  type: 'Card' | 'Land';
  images: string[];
  kindOfTransfer: 'sell' | 'rent';
  kindOfHouse: 'villa' | 'apartment' | 'land';
  area: number;
  desc: string;
  price: number;
  date: Date;
  location: string;
  numberOfRoom: number;
  isBookmarked: boolean;
  isStared: boolean;
}

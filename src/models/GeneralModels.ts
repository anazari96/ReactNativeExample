export interface IAction {
  type: string;
  payload: any;
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface IAds {
  id: string;
  code: string | null;
  type: 'Card' | 'Land';
  name: string;
  images: string[];
  post_type: 'SELL' | 'RENT';
  property_type: 'HOUSE' | 'APARTMENT';
  area: number;
  desc: string;
  price: number;
  price2: number;
  distinct: string;
  rooms: number;
  isBookmarked: boolean;
  isStared: boolean;
  stars: number;
  created: Date;
  neighbourhood: string;
  options: any;
  user: IUser;
  visit_time: any;
}

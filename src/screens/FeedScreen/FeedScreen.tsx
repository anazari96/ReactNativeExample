import React from 'react';
import {AdCard} from '../../components/AdCard/AdCard';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IProps {}

export const FeedScreen: React.FC<IProps> = (props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        padding: 50,
      }}>
      <AdCard
        area={200}
        date={new Date(1594219253000)}
        desc="فروش منزل ویلایی واقع در هاشیمه مشهد
        موقعیت عالی"
        images={['./assets/images/test.jpg']}
        isBookmarked={false}
        isStared={false}
        kindOfHouse={'apartment'}
        kindOfTransfer={'rent'}
        location="هاشمیه"
        numberOfRoom={3}
        price={1000000}
        type="Card"
      />
    </SafeAreaView>
  );
};

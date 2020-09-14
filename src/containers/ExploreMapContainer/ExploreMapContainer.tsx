import React, {useState} from 'react';
import MapView from 'components/MapView';
import {FlatList} from 'react-native-gesture-handler';
import {Category} from 'components/Category/Category';
import {MainColor, SecondaryMainColor} from 'constants/variables';
import {View} from 'react-native';

interface IProps {}

const ListCategories: React.FC = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  return (
    <View style={{display: 'flex', backgroundColor: '#f6f6f6', width: '100%'}}>
      <FlatList
        horizontal={true}
        inverted={false}
        data={[
          {title: 'همه موارد', key: 'all'},
          {title: 'پمپ بنزین', key: 'gas'},
          {title: 'کتابخانه', key: 'library'},
          {title: 'امور مشترکین', key: 'omoor'},
        ]}
        renderItem={({item}) => (
          <Category
            title={item.title}
            color={
              item.key === selectedCategory ? MainColor : SecondaryMainColor
            }
            isOff={false}
            onPress={() => {
              setSelectedCategory(item.key);
            }}
          />
        )}
        style={{display: 'flex', width: '100%'}}
      />
    </View>
  );
};

export const ExploreMapContainer: React.FC<IProps> = (props) => {
  return <MapView component={<ListCategories />} />;
};

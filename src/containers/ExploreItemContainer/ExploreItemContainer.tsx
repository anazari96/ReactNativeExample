/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {View, TextInput, Pressable, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {SecondaryMainColor, MainColor, StrokeColor} from 'constants/variables';
import ExploreCard from 'components/ExploreCard';

interface IProps {}

export const ExploreItemContainer: React.FC<IProps> = (props) => {
  console.log('props', props);
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          width: '100%',
          maxHeight: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          //   paddingHorizontal: 6,
          elevation: 10,
          paddingBottom: 10,
          marginBottom: 10,
          backgroundColor: '#f6f6f6',
          //   borderBottomColor: '#ccc',
        }}>
        {/* first row of filters */}
        <View
          style={{
            width: '100%',
            height: 35,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 7,
            marginTop: 10,
            // position: 'relative',
            zIndex: 2,
            borderBottomWidth: 1,
            paddingBottom: 7,
            borderBottomColor: '#ccc',
          }}>
          <Icon
            name="long-arrow-alt-right"
            size={20}
            style={{marginHorizontal: 5}}
            color="#707070"
            onPress={() => {
              navigation.goBack();
            }}
          />
          {/* Search */}
          <View
            style={{
              width: 70,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="tshirt" size={15} color={MainColor} />
            <Text>پوشاک</Text>
          </View>
          <View>
            <Pressable
              style={{
                height: 33,
                backgroundColor: '#fff',
                elevation: 8,
                borderRadius: 5,
                marginHorizontal: 5,
                paddingHorizontal: 5,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                navigation.navigate('ExploreMapScreen');
                //   setTab('job');
              }}>
              <Icon
                name="compass"
                color={SecondaryMainColor}
                size={15}
                style={{marginRight: 10}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: SecondaryMainColor,
                  fontSize: 13,
                  lineHeight: 33,
                }}>
                اطراف من
              </Text>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            height: 35,
            width: Dimensions.get('window').width,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            // zIndex: 2,
          }}>
          <FlatList
            horizontal={true}
            data={[
              {title: 'پارچه فروشی'},
              {title: 'خشک شویی'},
              {title: 'خیاطی'},
              {title: 'مزون لباس عروس'},
            ]}
            renderItem={({item}) => (
              <View style={{maxWidth: '100%'}}>
                <Pressable
                  style={{
                    height: 35,
                    backgroundColor: '#fff',
                    borderColor: SecondaryMainColor,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    elevation: 8,
                    borderRadius: 5,
                    marginHorizontal: 5,
                    paddingHorizontal: 5,
                  }}
                  onPress={() => {
                    // props.setFilter({tab: 'job'});
                    //   setTab('job');
                  }}>
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      color: SecondaryMainColor,
                      fontSize: 13,
                      lineHeight: 33,
                    }}>
                    {item.title}
                  </Text>
                </Pressable>
              </View>
            )}
            style={{}}
          />
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ExploreCard
            category="فروشگاه پوشاک"
            description="پوشاک بزرگ قیومی ارائه دهنده انواع لباس های ایرانی و خارجی با بالاترین"
            isBookmarked={true}
            location="طبرسی شمالی"
            title="پوشاک بزرگ قیومی"
            views={150}
          />
          <ExploreCard
            category="پارچه فروشی"
            description="پوشاک بزرگ قیومی ارائه دهنده انواع لباس های ایرانی و خارجی با بالاترین"
            isBookmarked={false}
            location="طبرسی شمالی"
            title="پارچه سرای قاسمی"
            views={190}
          />
          <ExploreCard
            category="فروشگاه پوشاک"
            description="پوشاک بزرگ قیومی ارائه دهنده انواع لباس های ایرانی و خارجی با بالاترین"
            isBookmarked={true}
            location="طبرسی شمالی"
            title="پوشاک بزرگ قیومی"
            views={150}
          />
          <ExploreCard
            category="فروشگاه پوشاک"
            description="پوشاک بزرگ قیومی ارائه دهنده انواع لباس های ایرانی و خارجی با بالاترین"
            isBookmarked={false}
            location="طبرسی شمالی"
            title="پوشاک بزرگ قیومی"
            views={150}
          />
        </View>
      </ScrollView>
    </View>
  );
};

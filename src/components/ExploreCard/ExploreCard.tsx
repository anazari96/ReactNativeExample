import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import BookmarkSVG from 'assets/icons/bookmark.svg';
import ShareSVG from 'assets/icons/share.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StrokeColor, SecondaryMainColor} from 'constants/variables';

interface IPorps {
  category: string;
  title: string;
  isBookmarked: boolean;
  description: string;
  location: string;
  views: number;
}

export const ExploreCard: React.FC<IPorps> = (props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        height: 200,
        borderRadius: 10,
        elevation: 8,
        backgroundColor: '#fff',
        margin: 7,
      }}>
      <View
        style={{
          width: '100%',
          height: 130,
          position: 'relative',
        }}>
        <FastImage
          style={{
            height: '100%',
            width: '100%',
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
          }}
          source={{
            uri:
              'https://unsplash.com/photos/4TBSG2Oqu0Q/download?force=true&w=640',
          }}
        />
        <View style={{position: 'absolute', top: 5, left: 10}}>
          <Text style={{color: '#fff'}}>{props.category}</Text>
        </View>
        <View style={{position: 'absolute', top: 50, left: 10}}>
          <Text style={{color: '#ffff00', fontSize: 21, lineHeight: 46}}>
            {props.title}
          </Text>
        </View>
        <View style={styles.bookmarkStyle}>
          <TouchableOpacity onPress={() => console.log('touch')}>
            <BookmarkSVG
              fill={props.isBookmarked ? 'red' : 'rgba(0, 0, 0, 0.2)'}
              stroke="#fff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.starStyle}>
          <ShareSVG fill="rgba(0, 0, 0, 0.2)" stroke="#fff" />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 33,
          borderColor: 'rgba(0, 0, 0, 0.5)',
          borderTopWidth: 1,
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            fontSize: 10,
            lineHeight: 20,
            width: '100%',
            height: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {props.description}
        </Text>
      </View>
      <View
        style={{
          height: 33,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Icon name="location" />
          <Text>{props.location}</Text>
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            elevation: 8,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#15a85e',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 11,
                lineHeight: 20,
                width: '100%',
                textAlign: 'center',
                color: '#fff',
              }}>
              10 تا 20
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 11,
                lineHeight: 20,
                width: '100%',
                textAlign: 'center',
                color: '#15a85e',
              }}>
              {' '}
              % تخفیف
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderRadius: 10,
          }}>
          <Icon name="eye" size={15} color={StrokeColor} />
          <Text
            style={{
              fontSize: 13,
              lineHeight: 46,
              textAlign: 'center',
              textAlignVertical: 'center',
              marginHorizontal: 5,
            }}>
            {props.views}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookmarkStyle: {position: 'absolute', top: 0, right: 18, zIndex: 100},
  starStyle: {position: 'absolute', top: 0, right: 48, zIndex: 100},
});

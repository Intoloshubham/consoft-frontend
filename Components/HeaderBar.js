import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, FONTS, images, icons} from '../constants';

const HeaderBar = ({right}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        flexDirection: 'row',
        paddingVertical: SIZES.padding,
      }}>
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              ...FONTS.body2,
              color: COLORS.black,
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderBar;

import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {images, COLORS, FONTS, SIZES} from '../../constants';

const AuthLayout = ({
  title,
  subtitle,
  image,
  titleContainerStyle,
  children,
}) => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          paddingVertical: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: SIZES.radius,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={image}
              resizeMode="contain"
              style={{
                // marginTop: SIZES.padding,
                height: 100,
                width: 200,
              }}
            />
          </View>
          <View
            style={{
              marginTop: SIZES.base,
              ...titleContainerStyle,
            }}>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.h2,
              }}>
              {title}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.darkGray,
                marginTop: SIZES.base,
                ...FONTS.body3,
              }}>
              {subtitle}
            </Text>
          </View>
          {children}
        </KeyboardAwareScrollView>
      </View>
    </ScrollView>
  );
};

export default AuthLayout;

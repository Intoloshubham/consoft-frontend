import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown-reanimated';
import {FONTS, COLORS, SIZES, icons} from '../constants';

const Dropdown = ({data, defaultButtonText}) => {
  return (
    <View>
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        defaultButtonText={defaultButtonText}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={{
          width: '100%',
          height: 45,
          backgroundColor: COLORS.lightGray1,
          // paddingHorizontal: SIZES.radius*1.7,
          paddingLeft: SIZES.padding,
          paddingRight: SIZES.radius * 1.7,
          marginTop: SIZES.base * 2.5,
          borderRadius: SIZES.radius,
          justifyContent: 'space-between',
        }}
        buttonTextStyle={{
          textAlign: 'left',
          color: COLORS.gray,
          ...FONTS.body3,
        }}
        dropdownStyle={{
          marginTop: 28,
          borderRadius: SIZES.base,
        }}
        renderDropdownIcon={isOpened => {
          return (
            <Image
              source={icons.arr_down}
              style={{
                height: 15,
                width: 16,
                tintColor: COLORS.gray,
              }}
            />
          );
        }}
        dropdownBackgroundColor={COLORS.lightblue_900}
        dropdownOverlayColor={COLORS.transparentBlack1}
        rowTextStyle={{
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          color: COLORS.white,
          textAlign: 'justify',
          ...FONTS.body3,
        }}
        // rowStyle={{height: 45}}
      />
    </View>
  );
};

export default Dropdown;

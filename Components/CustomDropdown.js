import React from 'react';
import {View, Text, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDropdown = ({data, value, onChange, renderItem, placeholder}) => {
  const _renderItem = item => {
    return (
      <View style={{marginHorizontal: SIZES.radius, marginTop: SIZES.base}}>
        <Text style={{...FONTS.body4}}>{item.label}</Text>
        {item.value === value && (
          <AntDesign color={COLORS.blue} name="check" size={20} />
        )}
      </View>
    );
  };

  return (
    <View>
      {/* <Text
        style={{
          color: COLORS.darkGray,
          ...FONTS.body4,

        }}>
        {label}
      </Text> */}
      <Dropdown
        style={{
          marginTop: SIZES.radius + 8,
          width: '100%',
          height: 45,
          backgroundColor: COLORS.gray3,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.base,
        }}
        containerStyle={{}}
        data={data}
        placeholder={placeholder}
        searchPlaceholder="Search"
        labelField="label"
        valueField="value"
        value={value}
        onChange={onChange}
        renderItem={renderItem}
        textError="Error"
      />
    </View>
  );
};

export default CustomDropdown;

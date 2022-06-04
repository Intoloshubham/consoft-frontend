import React from 'react';
import {View, Text, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDropdown = ({data, value, onChange, renderItem}) => {
  // const _renderItem = item => {
  //   return (
  //     <View style={{marginHorizontal: SIZES.radius, marginTop: SIZES.base}}>
  //       <Text style={{...FONTS.body4}}>{item.label}</Text>
  //       {item.value === value && (
  //         <AntDesign color={COLORS.blue} name="check" size={20} />
  //       )}
  //     </View>
  //   );
  // };

  return (
    <View>
      <Dropdown
        style={{
          width: '100%',
          height: 45,
          backgroundColor: COLORS.gray3,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.base,
        }}
        containerStyle={{}}
        data={data}
        searchPlaceholder="Search"
        labelField="label"
        valueField="value"
        label="Dropdown"
        value={value}
        onChange={onChange}
        renderItem={renderItem}
        textError="Error"
      />
    </View>
  );
};

export default CustomDropdown;

import React from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS, FONTS, SIZES} from '../constants';

const Drop = ({
  open,
  setOpen,
  setValue,
  value,
  items,
  setItems,
  placeholder,
  categorySelectable,
  listParentLabelStyle,
  multiple,
}) => {
  //   const [open, setOpen] = React.useState(false);
  //   const [value, setValue] = React.useState([]);
  //   const [items, setItems] = React.useState([
  //     {label: 'Residential', value: '1'},
  //     {label: 'Mid-rise apertment', value: '7', parent: '1'},
  //     {label: 'Hi-rise apertment', value: '6', parent: '1'},
  //     {label: 'Township', value: '5', parent: '1'},
  //     {label: 'House', value: '4', parent: '1'},
  //     {label: 'Apartment', value: '3', parent: '1'},
  //     {label: 'Bungalow', value: '2', parent: '1'},

  //     {label: 'Commercial', value: '8'},
  //     {label: 'Showroom / Office', value: '9', parent: '8'},
  //     {label: 'Mall/Multiplxer', value: '10', parent: '8'},
  //     {label: 'Health Care', value: '11'},
  //     {label: 'Hospitals', value: '12', parent: '11'},
  //     {label: 'Hospitality', value: '13'},
  //     {label: 'Hotel', value: '14', parent: '13'},
  //   ]);
  return (
    <View>
      <DropDownPicker
        style={{
          marginTop: SIZES.padding,
          //   marginBottom: SIZES.base,
          borderWidth: null,
          width: '100%',
          //   height: 45,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.gray3,
          borderRadius: SIZES.base,
        }}
        dropDownContainerStyle={{
          marginTop: SIZES.padding,
          backgroundColor: COLORS.lightblue_800,
          borderWidth: null,
        }}
        textStyle={{
          fontSize: 15,
          color: COLORS.black,
        }}
        categorySelectable={categorySelectable}
        listParentLabelStyle={listParentLabelStyle}
        listChildContainerStyle={{
          paddingLeft: 30,
        }}
        listChildLabelStyle={{
          color: COLORS.white,
          fontSize: 15,
        }}
        placeholder={placeholder}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        // multiple
        theme="LIGHT"
        multiple={multiple}
        mode="BADGE"
        badgeDotColors={[
          '#e76f51',
          '#00b4d8',
          '#e9c46a',
          '#e76f51',
          '#8ac926',
          '#00b4d8',
          '#e9c46a',
        ]}
        tickIconStyle={{
          width: 15,
          height: 15,
          backgroundColor: COLORS.white,
        }}
      />
    </View>
  );
};

export default Drop;

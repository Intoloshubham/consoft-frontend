import React from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS, SIZES} from '../constants';

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
  zIndex,
  zIndexInverse,
  onChangeValue,
}) => {
  return (
    <View>
      <DropDownPicker
        style={{
          flex: 1,
          marginTop: SIZES.radius * 1.4,
          borderWidth: null,
          backgroundColor: COLORS.gray3,
          minHeight: 40,
        }}
        maxHeight={200}
        dropDownContainerStyle={{
          marginTop: SIZES.radius,
          backgroundColor: COLORS.lightblue_800,
          borderWidth: null,
        }}
        textStyle={{
          fontSize: 15,
          color: COLORS.black,
          textTransform: 'capitalize',
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
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        onChangeValue={onChangeValue}
      />
    </View>
  );
};

export default Drop;

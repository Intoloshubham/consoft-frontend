import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../constants';

const AssignedWorks = ({customContainerStyle, history}) => {
  const renderItem = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base,
      }}>
      <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{index + 1}</Text>
      <Text
        style={{
          ...FONTS.h3,
          flex: 1,
          marginLeft: SIZES.base,
          color: COLORS.darkGray,
        }}>
        {item.work_name}
      </Text>
      <Text
        style={{
          ...FONTS.h4,
          color: COLORS.darkGray,
        }}>
        {item.date}
      </Text>
    </View>
  );
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightblue_50,
        ...styles.shadow,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>
          Assigned Works
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
            backgroundColor: COLORS.yellow_400,
            padding: 5,
            // paddingHorizontal: SIZES.base,
            // paddingVertical: SIZES.base - 5,
            borderRadius: SIZES.base,
          }}>
          25
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{marginTop: SIZES.radius}}
        scrollEnabled={false}
        data={history}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLORS.gray2,
                marginVertical: 5,
              }}></View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default AssignedWorks;

import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';

const ProjectWorksIdentifier = ({history}) => {
  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base,
      }}>
      <Text
        style={{
          flex: 1,
          ...FONTS.h3,
          color: COLORS.darkGray,
        }}>
        {item.name}
      </Text>
      <Image
        source={item.img}
        style={{
          height: 20,
          width: 60,
        }}
      />
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
      <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Work Tasks</Text>
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
export default ProjectWorksIdentifier;

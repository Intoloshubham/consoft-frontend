import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
// import FilterModal from '../FilterModal/FilterModal';

const ProjectProgressReview = ({customContainerStyle, history}) => {
  //   const [showProgressFilterModal, setProgressFilterModal] = React.useState(false);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base,
      }}>
      <Image
        source={item.img}
        style={{height: 25, width: 25, tintColor: COLORS.darkGray}}
      />
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.darkGray,
          }}>
          {item.name}
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.darkGray,
          }}>
          {item.data}%
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightblue_50,
        ...customContainerStyle,
        ...styles.shadow,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: SIZES.base,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray, flex: 1}}>
          Progress Review
        </Text>
        <TouchableOpacity
        // onPress={() => setProgressFilterModal(true)}
        >
          <Image
            source={icons.filter}
            style={{height: 20, width: 20, tintColor: COLORS.darkGray}}
          />
        </TouchableOpacity>
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
      {/* {showProgressFilterModal && (
        <FilterModal
          isVisible={showProgressFilterModal}
          onClose={() => setProgressFilterModal(false)}
        />
      )} */}
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
export default ProjectProgressReview;

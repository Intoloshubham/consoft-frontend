import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {HeaderBar, FloatingButton} from '../../../Components';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import AddStockModal from '../Modals/AddStockMatreials';

const StocksAndInventry = () => {
  const [showAddMaterialsModal, setShowAddMaterialsModal] =
    React.useState(false);
  const stockdetails = [
    {id: 1, name: 'Bricks', quantity: 45},
    {id: 2, name: 'Sand', quantity: 88},
    {id: 3, name: 'Iron', quantity: 57},
    {id: 4, name: 'Cement', quantity: 55},
    {id: 5, name: 'Oil', quantity: 95},
  ];
  const [details, setDetails] = React.useState(stockdetails);

  function renderTeamList() {
    const renderItem = ({item}) => (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: SIZES.base,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{item.name}</Text>
        <Text style={{right: 20, ...FONTS.h3, color: COLORS.darkGray}}>
          = {item.quantity}
        </Text>
      </View>
    );
    return (
      <View
        style={{
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        {/* <Text style={{...FONTS.h2, color: COLORS.darkGray}}></Text> */}
        <FlatList
          scrollEnabled={false}
          data={stockdetails}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.lightGray1,
                  marginVertical: 5,
                }}></View>
            );
          }}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: SIZES.radius,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  fontWeight: 'bold',
                  color: COLORS.lightblue_800,
                }}>
                Name
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  fontWeight: 'bold',
                  color: COLORS.lightblue_800,
                }}>
                Quantity
              </Text>
            </View>
          }
        />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightblue_50,
      }}>
      <HeaderBar right={true} title="Stock Inventry" />
      <ScrollView>{renderTeamList()}</ScrollView>
      <FloatingButton
        icon={icons.plus}
        onPress={() => setShowAddMaterialsModal(true)}
      />
      {showAddMaterialsModal && (
        <AddStockModal
          isVisible={showAddMaterialsModal}
          onClose={() => setShowAddMaterialsModal(false)}
        />
      )}
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
export default StocksAndInventry;

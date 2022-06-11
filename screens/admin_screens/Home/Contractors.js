import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {HeaderBar, FloatingButton} from '../../../Components';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import ContractorsModal from '../Modals/ContractorsModal';

const Contractors = () => {
  const [showContractorsModal, setShowContractorsModal] = React.useState(false);
  const contractorsDetails = [
    {
      id: 1,
      name: 'Demo 1',
      email: 'demo1@gmail.com',
      mobile: 9988776655,
    },
    {
      id: 2,
      name: 'Demo 2',
      email: 'demo2@gmail.com',
      mobile: 9988776655,
    },
    {
      id: 3,
      name: 'Demo 3',
      email: 'demo3@gmail.com',
      mobile: 9988776655,
    },
    {
      id: 4,
      name: 'Demo 4',
      email: 'chotu@gmail.com',
      mobile: 9988776655,
    },
    {
      id: 5,
      name: 'Demo 5',
      email: 'demo5@gmail.com',
      mobile: 9988776655,
    },
  ];
  const [contractorsData, setContractorsData] =
    React.useState(contractorsDetails);

  const renderItem = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: SIZES.base,
      }}>
      <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{index + 1}</Text>
      <View style={{flex: 1, marginLeft: SIZES.radius}}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.darkGray,
          }}>
          Mr.{item.name}
        </Text>
        <Text style={{...FONTS.body4}}>Designation - {item.designation}</Text>
      </View>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightblue_50,
      }}>
      <HeaderBar right={true} title="Contractors" />
      <View
        style={{
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <FlatList
          scrollEnabled={false}
          data={contractorsDetails}
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
        />
      </View>
      <FloatingButton
        icon={icons.plus}
        onPress={() => setShowContractorsModal(true)}
      />
      {showContractorsModal && (
        <ContractorsModal
          isVisible={showContractorsModal}
          onClose={() => setShowContractorsModal(false)}
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

export default Contractors;

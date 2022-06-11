import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {HeaderBar} from '../../../Components';
import {COLORS, FONTS} from '../../../constants';
import {TextButton} from '../../../Components';
import {SIZES} from '../../../constants';
import ToolsAndMachineryModal from '../Modals/ToolsAndMachineryModal';

const ToolsAndMachinery = () => {
  const ToolsAndMachinery = [
    {id: 1, name: 'Mixer', qty: 25},
    {id: 2, name: 'Roller', qty: 55},
    {id: 3, name: 'Water tank', qty: 41},
    {id: 4, name: 'Pipe', qty: 10},
  ];
  const [tools, setTools] = React.useState(ToolsAndMachinery);
  const [showModal, setShowModal] = React.useState(false);

  function renderToolsAndMachinery() {
    const renderItem = ({item, index}) => (
      <View
        style={{
          // marginHorizontal: SIZES.base,
          marginVertical: SIZES.radius - 4,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS.gray,
          }}>
          {index + 1}
        </Text>
        <View
          style={{
            marginLeft: SIZES.radius,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.darkGray}}>
            {item.name}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.darkGray,
              fontWeight: 'bold',
            }}>
            {item.qty}
          </Text>
        </View>
      </View>
    );
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          padding: 20,
          ...styles.shadow,
        }}>
        <FlatList
          data={tools}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.gray3,
                }}></View>
            );
          }}
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
      <HeaderBar right={true} title="Tools & Machinery" />
      <TextButton
        label="Add New"
        buttonContainerStyle={{
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_700,
          ...styles.shadow,
        }}
        onPress={() => setShowModal(true)}
      />
      {showModal && (
        <ToolsAndMachineryModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
      {renderToolsAndMachinery()}
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
export default ToolsAndMachinery;

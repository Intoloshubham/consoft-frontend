import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import {
  HeaderBar,
  FormInput,
  IconButton,
  TextButton,
} from '../../../Components';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';

const ToolsAndMachine = [
  {id: 1, name: 'Mixer', qty: 25},
  {id: 2, name: 'Roller', qty: 55},
  {id: 3, name: 'Water tank', qty: 41},
  {id: 5, name: 'Pipe', qty: 10},
  {id: 6, name: 'Mixer', qty: 25},
  {id: 7, name: 'Roller', qty: 55},
  {id: 8, name: 'Water tank', qty: 41},
  {id: 9, name: 'Pipe', qty: 10},
  {id: 10, name: 'Mixer', qty: 25},
  {id: 12, name: 'Roller', qty: 55},
  {id: 13, name: 'Water tank', qty: 41},
  {id: 14, name: 'Pipe', qty: 10},
  {id: 15, name: 'Mixer', qty: 25},
  {id: 16, name: 'Roller', qty: 55},
  {id: 17, name: 'Water tank', qty: 41},
  {id: 18, name: 'Pipe', qty: 10},
];

const ToolsAndMachinery = () => {
  const [tools, setTools] = React.useState(ToolsAndMachine);
  const [showTAndMModal, setShowTAndMModal] = React.useState(false);
  //Form data
  const [toolsName, setToolsName] = React.useState('');
  const [toolsQty, setToolsQty] = React.useState('');

  function renderToolsAndMachinery() {
    const renderItem = ({item, index}) => (
      <View
        style={{
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
              right: 40,
            }}>
            {item.qty}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              alert('edit name');
            }}>
            <Image
              source={icons.edit}
              style={{
                width: 18,
                height: 18,
                right: 15,
                tintColor: COLORS.lightblue_900,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              alert('delete name');
            }}>
            <Image
              source={icons.delete_icon}
              style={{
                width: 18,
                height: 18,
                tintColor: COLORS.red,
              }}
            />
          </TouchableOpacity>
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
          scrollEnabled={true}
          maxHeight={510}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.gray3,
                  marginVertical: 5,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  function renderAddToolsAndMachineModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={showTAndMModal}>
        <TouchableWithoutFeedback onPress={() => setShowTAndMModal(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                position: 'absolute',
                left: SIZES.padding,
                width: '90%',
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
              }}>
              <View style={{}}>
                {/* header */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{flex: 1, fontSize: 20, color: COLORS.darkGray}}>
                    Tools & Machine
                  </Text>
                  <IconButton
                    containerStyle={{
                      boborderWidth: 2,
                      borderRadius: 10,
                      borderColor: COLORS.gray2,
                    }}
                    icon={icons.cross}
                    iconStyle={{
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setShowTAndMModal(false)}
                  />
                </View>
                <ScrollView>
                  <FormInput
                    label="Item name"
                    keyboardType="default"
                    autoCompleteType="username"
                    onChange={value => {
                      setToolsName(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            toolsName == '' || toolsName != ''
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              toolsName == ''
                                ? COLORS.gray
                                : toolsName != ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <FormInput
                    label="Quantity"
                    keyboardType="numeric"
                    onChange={value => {
                      setToolsQty(value);
                    }}
                    appendComponent={
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={
                            toolsQty == '' || toolsQty != ''
                              ? icons.correct
                              : icons.cancel
                          }
                          style={{
                            height: 20,
                            width: 20,
                            tintColor:
                              toolsQty == ''
                                ? COLORS.gray
                                : toolsQty != ''
                                ? COLORS.green
                                : COLORS.red,
                          }}
                        />
                      </View>
                    }
                  />
                  <TextButton
                    label="Submit"
                    buttonContainerStyle={{
                      height: 45,
                      marginTop: SIZES.padding * 1.5,
                      alignItems: 'center',
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.lightblue_700,
                    }}
                    onPress={() => alert('Okay...')}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
        onPress={() => setShowTAndMModal(true)}
      />
      {renderToolsAndMachinery()}
      {renderAddToolsAndMachineModal()}
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

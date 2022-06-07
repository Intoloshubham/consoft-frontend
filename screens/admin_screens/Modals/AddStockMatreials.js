import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {IconButton, Drop, FormInput, TextButton} from '../../../Components';

const AddStockModal = ({isVisible, onClose}) => {
  // company team states
  const [quantity, setQuantity] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [vehicleNo, setVehicleNo] = React.useState('');

  //drop
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([
    {label: 'Sand', value: '1'},
    {label: 'iron', value: '2'},
    {label: 'Oil', value: '3'},
    {label: 'Cement', value: '4'},
    {label: 'Bricks', value: '5'},
  ]);

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showCompanyTeamModal, setShowCompanyTeamModal] =
    React.useState(isVisible);

  React.useEffect(() => {
    if (showCompanyTeamModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showCompanyTeamModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 650],
  });
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: COLORS.transparentBlack7}}>
        {/* transparent background */}
        <TouchableWithoutFeedback
          onPress={() => setShowCompanyTeamModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            left: SIZES.padding,
            top: modalY,
            width: '90%',
            // height: '50%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          {/* header */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1, ...FONTS.h2, color: COLORS.darkGray}}>
              Add Material
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
              onPress={() => setShowCompanyTeamModal(false)}
            />
          </View>
          {/* <WorkAssign /> */}
          <View>
            <Drop
              placeholder="Select Item"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              categorySelectable={true}
              listParentLabelStyle={{
                color: COLORS.white,
              }}
            />
            <FormInput
              label="Quantity"
              keyboardType="numeric"
              onChange={value => {
                setQuantity(value);
              }}
              appendComponent={
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={
                      quantity == '' || quantity != ''
                        ? icons.correct
                        : icons.cancel
                    }
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        quantity == ''
                          ? COLORS.gray
                          : quantity != ''
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            <FormInput
              label="Location"
              keyboardType="default"
              onChange={value => {
                setLocation(value);
              }}
              appendComponent={
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={
                      location == '' || location != ''
                        ? icons.correct
                        : icons.cancel
                    }
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        location == ''
                          ? COLORS.gray
                          : location != ''
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            <FormInput
              label="Vehicle No"
              keyboardType="default"
              onChange={value => {
                setVehicleNo(value);
              }}
              appendComponent={
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={
                      vehicleNo == '' || vehicleNo != ''
                        ? icons.correct
                        : icons.cancel
                    }
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        vehicleNo == ''
                          ? COLORS.gray
                          : vehicleNo != ''
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
                height: 55,
                alignItems: 'center',
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
              }}
              // onPress={OnSubmit}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AddStockModal;

import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { COLORS, SIZES, FONTS, icons } from '../../../constants';
import { IconButton } from '../../../Components';
// import AddProjectTeam from './AddProjectTeam';
const team_var = [
  {
    id: 1,
    name: "Manager",
    Number_of_man: [
      'Man_1', 'Man_2', 'Man_3'
    ]
  },
  {
    id: 2,
    name: "Supervisor",
    Number_of_Sup: [
      'Sup_1', 'Sup_2', 'Sup_3'
    ]
  },
  {
    id: 3,
    name: "Contractor",
    Number_of_Con: [
      'Con_1', 'Con_2', 'Con_3'
    ]
  },
  {
    id: 4,
    name: "Technical_team",
    Number: [
      'Tech_1', 'Tech_2', 'Tech_3'
    ]
  },
]
const AddProjectTeamModal = ({ isVisible, onClose }) => {

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showCreateProjectModal, setCreateProjectModal] =
    React.useState(isVisible);
  const [team_var_state, setteamvar] = React.useState(team_var)


  React.useEffect(() => {
    if (showCreateProjectModal) {
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
  }, [showCreateProjectModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 720],
  });


  const Team_category_list = () => {
    return team_var_state.map((element) => {
      console.log(element.Number);
      return (
        <View key={element.id} style={{margin: 10}}>
          <Text>{element.name}</Text>
          <Text>{element.Number_of_man}</Text>
        </View>
      );
    });
  };
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} >
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
        {/* transparent background */}
        <TouchableWithoutFeedback onPress={() => setCreateProjectModal(false)}>
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
            height: '50%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          {/* header */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1, ...FONTS.h2, color: COLORS.darkGray }}>
              Add new team
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
              onPress={() => setCreateProjectModal(false)}
            />
          </View>
          <View>
          {Team_category_list()}
          </View>


          {/* <AddProjectTeam /> */}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AddProjectTeamModal;

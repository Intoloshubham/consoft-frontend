import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Button,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {IconButton, TextButton} from '../../../Components';
// import {useRoute} from '@react-navigation/native';

const ProjectsOperationModal = ({isVisible, onClose}) => {
  // const route = useRoute();
  // const {id} = route.params;

  const url = 'http://192.168.1.99:8000/api/projects';

  const OnSubmit = () => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showCreateProjectModal, setCreateProjectModal] =
    React.useState(isVisible);

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
    outputRange: [SIZES.height, SIZES.height - 650],
  });
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: COLORS.transparentBlack7}}>
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
            // height: '50%',
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          {/* header */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1, ...FONTS.h2, color: COLORS.darkGray}}>
              Project Opearations
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
          {/* here  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.base,
              marginTop: SIZES.radius,
            }}>
            <TextButton
              label="Update"
              disabled={false}
              buttonContainerStyle={{
                alignItems: 'center',
                paddingHorizontal: SIZES.radius,
                paddingVertical: SIZES.radius,
                borderRadius: 8,
                backgroundColor: COLORS.success_400,
                marginVertical: SIZES.padding,
              }}
              labelStyle={{
                color: COLORS.black,
                ...FONTS.h3,
              }}
              onPress={() => alert('Update details of project')}
            />
            <TextButton
              label="Remove"
              disabled={false}
              buttonContainerStyle={{
                alignItems: 'center',
                paddingHorizontal: SIZES.radius,
                paddingVertical: SIZES.radius,
                borderRadius: 8,
                backgroundColor: COLORS.yellow_400,
                marginVertical: SIZES.padding,
              }}
              labelStyle={{
                color: COLORS.black,
                ...FONTS.h3,
              }}
              onPress={() => alert('Remove from  list add to database')}
            />
            <TextButton
              label="Delete"
              disabled={false}
              buttonContainerStyle={{
                alignItems: 'center',
                paddingHorizontal: SIZES.radius,
                paddingVertical: SIZES.radius,
                borderRadius: 8,
                backgroundColor: COLORS.red,
                marginVertical: SIZES.padding,
              }}
              labelStyle={{
                color: COLORS.white,
                ...FONTS.h3,
              }}
              onPress={
                OnSubmit
                // () => alert('delete')
              }
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ProjectsOperationModal;

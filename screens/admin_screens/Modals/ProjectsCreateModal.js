import React from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../../../constants';
import {IconButton} from '../../../Components';
import CreateProjects from './CreateProjects';

const ProjectsCreateModal = ({isVisible, onClose}) => {
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
    outputRange: [SIZES.height, SIZES.height - 680],
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
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
          {/* header */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1, ...FONTS.h2}}>Create New Project</Text>
            <IconButton
              containerStyle={{
                boborderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
              onPress={() => setCreateProjectModal(false)}
            />
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}>
            <CreateProjects />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ProjectsCreateModal;

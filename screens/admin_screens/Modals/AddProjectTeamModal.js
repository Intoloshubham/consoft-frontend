import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { COLORS, SIZES, FONTS, icons } from '../../../constants';
import { IconButton } from '../../../Components';
import { AccordionList } from 'accordion-collapse-react-native';
import dummyData from '../../../constants/dummyData'
const url = 'http://192.168.1.99:8000/api/role';

// import AddProjectTeam from './AddProjectTeam';

const AddProjectTeamModal = ({ isVisible, onClose }) => {

  const [role_var_state, setroleteamvar] = React.useState([])
  const [dummy_state, set_dummy_state] = React.useState(dummyData.reports)
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

  //fetching user's role

  React.useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        setroleteamvar(data);
        console.log(role_var_state);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])





  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 700],
  });




  // const Team_category_list = () => {
  //   return role_var_state.map((element) => {
  //     console.log(element.user_role);
  //     return (
  //       <View key={element._id}
  //         style={{
  //           backgroundColor: "green",
  //           paddingHorizontal: "-5%"

  //         }}>
  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: COLORS.lightGray1,
  //             padding: SIZES.h2,
  //             // marginHorizontal: 30,
  //             margin: SIZES.base,
  //             borderWidth: 1,
  //             height: 20


  //           }}>
  //           <Text> {element.user_role}</Text>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   });
  // };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View
          style={{
            backgroundColor: COLORS.transparent,
            // paddingHorizontal: 3,
            marginHorizontal: 2,      
            marginBottom: 10,
            marginVertical: SIZES.base,
            position: "relative",
            paddingTop: 110,
            paddingHorizontal: SIZES.width * 0.135,
            backgroundColor: COLORS.transparent,
            borderRadius: SIZES.base * 0.7,
          }} key={item._id}>
   
            <TouchableOpacity
              style=
              {{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#26D1B2",
                padding: SIZES.padding,
                borderRadius: SIZES.base * 0.7,
                height:75,
                elevation:15
              }}
            >
              {/* <Image
                        resizeMode='contain'
                        style={{ width: 50, height: 50 }}
                        source={item.icon} /> */}
              <View style={{ top:-SIZES.largeTitle*0.5,alignSelf:"center",marginHorizontal:-SIZES.base*0.6 }}>
                <Text style={{ color: COLORS.transparentBlack7, textAlign: "center" }}>{item.user_role}</Text>
              </View>
            </TouchableOpacity>
          </View>   
      </>
    )
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}  >
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7}}>
        {/* transparent background */}
        <TouchableWithoutFeedback onPress={() => setCreateProjectModal(false)}>
          <View
            style={{
              position: 'relative',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,              
              paddingVertical:SIZES.height              
            }}></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            left: SIZES.h4*2,            
            top: modalY,
            width: '85%',
            height: '60%',
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

          {/* {Team_category_list()} */}
          <View
            style={{
              marginTop: SIZES.padding,
              backgroundColor:COLORS.transparent,
              left: -23,
              marginRight: -47,
              flexDirection:"row",
              justifyContent:"space-between"
            }}>
            <FlatList
              data={role_var_state}
              showsHorizontalScrollIndicator={false}
              renderItem={(item, index) => renderItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
              // extraData={selectedId}
              horizontal
            />
          </View>

        </Animated.View>
      </View>
    </Modal>
  );
};

export default AddProjectTeamModal;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

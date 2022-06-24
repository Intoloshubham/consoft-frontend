import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {IconButton, Drop, TextButton} from '../../../Components';
import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import Config from '../../../config';
import {Colors} from 'react-native-paper';

const AssignedWorks = () => {
  const [data, setData] = React.useState([]);
  const [filterRoleModal, setFilterRoleModal] = React.useState(false);

  //
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [role, setRole] = React.useState([]);

  React.useEffect(() => {
    fetch(`${Config.API_URL}/assign-works`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.log(error.message));
  }, []);

  React.useEffect(() => {
    fetch(`${Config.API_URL}/role`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        let rolesFromApi = data.map(team => {
          return {label: team.user_role, value: team._id};
        });
        setRole(rolesFromApi);
      })
      .catch(error => console.log(error.message));
  }, []);

  function renderRoleFilterModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={filterRoleModal}>
        <TouchableWithoutFeedback onPress={() => setFilterRoleModal(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack2,
            }}>
            <View
              style={{
                position: 'absolute',
                top: 200,
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
                    Filter
                  </Text>
                  <IconButton
                    containerStyle={{
                      boborderWidth: 2,
                      borderRadius: 10,
                      borderColor: COLORS.gray2,
                    }}
                    icon={icons.cross}
                    iconStyle={{
                      height: 25,
                      width: 25,
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setFilterRoleModal(false)}
                  />
                </View>
                <ScrollView>
                  <Drop
                    placeholder="Select Role"
                    open={open}
                    setOpen={setOpen}
                    value={value}
                    setValue={setValue}
                    role={role}
                    setRole={setRole}
                    categorySelectable={true}
                    listParentLabelStyle={{
                      color: COLORS.white,
                    }}
                  />
                  <TextButton
                    label="Submit"
                    buttonContainerStyle={{
                      height: 55,
                      alignItems: 'center',
                      marginTop: SIZES.padding,
                      borderRadius: SIZES.radius,
                    }}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  // function removeMyCartHandler(id) {
  //   let newMyCartList = [...data];
  //   const index = newMyCartList.findIndex(cart => cart.id === id);
  //   newMyCartList.splice(index, 1);
  //   setData(newMyCartList);
  // }

  function renderSwipeList() {
    const renderItem = ({item, index}) => {
      return (
        <View
          style={{
            height: 70,
            backgroundColor: COLORS.lightblue_100,
            ...styles.cartItemContainer,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
              }}>
              {index + 1} -
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
                marginLeft: 5,
              }}>
              {item.assign_user_id}
            </Text>
          </View>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.darkGray,
              marginLeft: 22,
            }}>
            {item.work}
          </Text>
        </View>
      );
    };
    const renderHiddenItem = ({item}) => {
      return (
        <View
          style={{
            // flex: 1,
            height: 70,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: COLORS.lightblue_800,
            ...styles.cartItemContainer,
          }}>
          <IconButton
            containerStyle={{justifyContent: 'flex-end'}}
            icon={icons.edit}
            iconStyle={{
              height: 20,
              width: 20,
              right: 5,
            }}
            onPress={() => alert('Edit')}
          />
          <IconButton
            containerStyle={{justifyContent: 'flex-end'}}
            icon={icons.delete_icon}
            iconStyle={{
              height: 20,
              width: 20,
            }}
            onPress={() => alert('delete')}
          />
        </View>
      );
    };
    return (
      <SwipeListView
        data={data}
        keyExtractor={item => `${item._id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding,
        }}
        disableRightSwipe={true}
        rightOpenValue={-70}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
      />
    );
  }
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        // paddingHorizontal: SIZES.padding,
        // paddingVertical: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightblue_50,
        ...styles.shadow,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
          // paddingVertical: SIZES.padding,
          paddingTop: SIZES.padding,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
          }}>
          Assigned Works
        </Text>
        <Image
          source={icons.filter}
          style={{
            height: 15,
            width: 15,
            tintColor: COLORS.gray,
          }}
        />
      </View>
      {renderSwipeList()}
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
  cartItemContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    paddingVertical: SIZES.base,
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});

export default AssignedWorks;

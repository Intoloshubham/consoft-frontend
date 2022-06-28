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
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {CustomDropdown, IconButton, TextButton} from '../../../Components';
import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import Config from '../../../config';
import WorkAssignModal from '../Modals/WorkAssignModal';

const AssignedWorks = () => {
  const [assignWorkData, setAssignWorkData] = React.useState([]);
  const [filterRoleModal, setFilterRoleModal] = React.useState(false);
  const [showWorkModal, setWorkModal] = React.useState(false);

  // dropdown
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([]);

  // Get All Assign Works
  React.useEffect(() => {
    fetch(`${Config.API_URL}assign-works`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAssignWorkData(data);
      })
      .catch(error => console.log(error.message));
  }, []);

  React.useEffect(() => {
    fetch(`${Config.API_URL}role`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        let roleDataFromApi = data.map(one => {
          return {label: one.user_role, value: one._id};
        });
        setItems(roleDataFromApi);
      })
      .catch(error => console.log(error.message));
  }, []);

  // Edit Assign Works
  const OnEdit = id => {
    setWorkModal(true);
    fetch(`${Config.API_URL}assign-works/` + `${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
  };

  // Delete Assign Works
  const OnDeleteAssignWork = id => {
    alert(id);
    fetch(`${Config.API_URL}assign-works/` + `${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  function OnChangeValueHandler(id) {
    console.log(id);
  }

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
                height: 150,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                padding: 20,
              }}>
              <View style={{}}>
                {/* header */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{flex: 1, fontSize: 20, color: COLORS.darkGray}}>
                    Filter Data
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
                {/* <ScrollView scrollEnabled={true}> */}
                <View>
                  <CustomDropdown
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
                    onChangeValue={value => {
                      OnChangeValueHandler(value);
                    }}
                  />
                </View>
                {/* </ScrollView> */}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  function renderSwipeList() {
    const renderItem = ({item, index}) => {
      return (
        <View
          style={{
            // height: 70,
            backgroundColor: COLORS.lightblue_50,
            ...styles.cartItemContainer,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.black,
              }}>
              U{index + 1} -
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.black,
                marginLeft: 5,
              }}>
              {item.user_name}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: COLORS.gray,
              marginTop: 1,
            }}></View>
          <View>
            {item.assign_works.map((ele, i) => {
              return (
                <View style={{flexDirection: 'row'}} key={i}>
                  <Text
                    style={{
                      ...FONTS.h5,
                      color: COLORS.black,
                    }}>
                    w{i + 1}
                    {' - '}
                  </Text>
                  <Text
                    key={i}
                    style={{
                      ...FONTS.body5,
                      color: COLORS.darkGray,
                      textTransform: 'capitalize',
                    }}>
                    {ele.work}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      );
    };
    const renderHiddenItem = ({item}) => {
      return (
        <View
          style={{
            // flex: 1,
            // height: 70,
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
              right: 10,
            }}
            onPress={() => OnEdit(item._id)}
          />
          <IconButton
            containerStyle={{justifyContent: 'flex-end'}}
            icon={icons.delete_icon}
            iconStyle={{
              height: 20,
              width: 20,
            }}
            onPress={() => OnDeleteAssignWork(item._id)}
          />
        </View>
      );
    };
    return (
      <SwipeListView
        data={assignWorkData}
        keyExtractor={item => `${item._id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingBottom: SIZES.padding * 2,
          marginBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        maxHeight={300}
        showsVerticalScrollIndicator={false}
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
        // padding: 20,
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
          paddingTop: SIZES.radius,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Assign Works</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setFilterRoleModal(true)}>
            <Image
              source={icons.filter}
              style={{
                height: 15,
                width: 15,
                tintColor: COLORS.gray,
                right: 8,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.lightblue_50,
              backgroundColor: COLORS.lightblue_900,
              paddingHorizontal: SIZES.base,
              paddingVertical: 2,
              borderRadius: SIZES.base,
            }}>
            {/* {sum} */}25
          </Text>
        </View>
      </View>
      {renderSwipeList()}
      {renderRoleFilterModal()}
      {showWorkModal && (
        <WorkAssignModal
          isVisible={showWorkModal}
          onClose={() => setWorkModal(false)}
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
  cartItemContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    paddingVertical: SIZES.base,
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,

    // borderRadius: SIZES.base,
  },
});

export default AssignedWorks;

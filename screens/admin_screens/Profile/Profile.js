import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import CheckBox from '@react-native-community/checkbox';
import CalendarPicker from 'react-native-calendar-picker';
import {
  getUserLeaves,
  postUserLeaves,
} from '../../../controller/LeavesController';
import {CustomToast} from '../../../Components';
import {getUsers} from '../../../controller/UserRoleController';
import {useSelector} from 'react-redux';

const Profile = () => {
  const companyData = useSelector(state => state.company);
  const company_id = companyData._id;

  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);
  const [leaves, setLeaves] = React.useState([]);
  const [checked, setChecked] = React.useState({});
  const [data, setData] = React.useState('');
  const arr = {leavedates: data};

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);

  const [filterModal, setFilterModal] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  // ====================================

  const checkBoxHandler = leave_date_id => {
    let d = [...data, leave_date_id];
    setData(d);
  };

  const onDateChange = (date, type) => {
    setSelectedStartDate(date);
  };

  // ========================== Apis ==========================

  const userLeaves = async () => {
    let response = await getUserLeaves();
    if (response.status === 200) {
      setLeaves(response.data);
    }
  };

  const postLeaves = async id => {
    let response = await postUserLeaves(id, arr);
    if (response.status === 200) {
      setSubmitToast(true);
      userLeaves();
    }
    setTimeout(() => {
      setSubmitToast(false);
    }, 1500);
  };

  const getusers = async () => {
    let response = await getUsers(company_id);
    if (response.status === 200) {
      setUsers(response.data);
    }
  };

  const [userId, setUserId] = React.useState('');
  const OnUserSelecter = user_id => {
    setUserId(user_id);
    setFilterModal(false);
  };

  React.useEffect(() => {
    userLeaves();
  }, []);

  function renderUserLeavesList() {
    const renderItem = ({item}) => (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 3,
          }}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.lightblue_700,
              textTransform: 'capitalize',
            }}>
            {item.user_name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                right: 12,
                backgroundColor: COLORS.green,
                paddingHorizontal: 3,
                paddingVertical: 0.5,
                borderRadius: 1,
              }}
              onPress={() => postLeaves(item._id)}>
              <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
                Approve
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.rose_600,
                paddingHorizontal: 3,
                paddingVertical: 0.5,
                borderRadius: 1,
              }}
              onPress={() => alert('Approved')}>
              <Text style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {item.leavedates.map((el, index) => {
          return (
            <View key={index} style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={{...FONTS.h5, color: COLORS.darkGray}}>
                    {index + 1}.{' '}
                  </Text>
                  <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                    Leave date -{' '}
                  </Text>
                  <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                    {el.leave_date}
                  </Text>
                </View>
                <CheckBox
                  disabled={false}
                  value={checked[el._id]}
                  onValueChange={newValue => {
                    setChecked({...checked, [el._id]: newValue});
                  }}
                  onChange={() => checkBoxHandler({leave_date_id: el._id})}
                  style={{height: 20}}
                />
              </View>
            </View>
          );
        })}
      </View>
    );

    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor: COLORS.white,
          borderRadius: 3,
          ...styles.shadow,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Leaves List</Text>

        <View style={{marginTop: SIZES.base}}>
          <FlatList
            data={leaves}
            keyExtractor={item => `${item._id}`}
            renderItem={renderItem}
            maxHeight={310}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: COLORS.lightGray1,
                    marginVertical: 10,
                  }}></View>
              );
            }}
          />
        </View>
      </View>
    );
  }

  function renderCalender() {
    return (
      <View
        style={
          {
            // marginBottom: 60,
            // marginTop: 30,
            // marginHorizontal: SIZES.radius,
            // padding: 10,
            // borderRadius: 5,
            // backgroundColor: COLORS.white,
            // ...styles.shadow,
          }
        }>
        <CalendarPicker
          width={320}
          height={320}
          showDayStragglers={true}
          startFromMonday={true}
          minDate={new Date(2000, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          months={[
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          onDateChange={onDateChange}
          monthTitleStyle={{
            backgroundColor: COLORS.rose_600,
            paddingHorizontal: 5,
            paddingVertical: 2,
            color: 'white',
            fontSize: 18,
          }}
          yearTitleStyle={{
            backgroundColor: COLORS.yellow_400,
            paddingHorizontal: 5,
            paddingVertical: 2,
            color: 'black',
            fontSize: 18,
          }}
          todayBackgroundColor={COLORS.rose_600}
          todayTextStyle={{color: 'white'}}
          previousTitle={'<'}
          nextTitle={'>'}
          previousTitleStyle={{fontSize: 25}}
          nextTitleStyle={{fontSize: 25}}
          selectedDayColor={'#16a34a'}
          selectedDayTextColor={'white'}
          selectedDayTextStyle={{fontSize: 18}}
          textStyle={{fontSize: 15}}
          selectMonthTitle={'Select Month '}
          selectYearTitle={'Select Year'}
        />
      </View>
    );
  }

  function renderCustomCalenderWithDetails() {
    return (
      <View
        style={{
          padding: 10,
        }}>
        <Text>renderCustomCalenderWithDetails</Text>
      </View>
    );
  }

  function renderfilterModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={filterModal}>
        <TouchableWithoutFeedback onPress={() => setFilterModal(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                width: '60%',
                maxHeight: 300,
                padding: SIZES.padding,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.white,
              }}>
              <ScrollView showsVerticalScrollIndicator={true}>
                {users.map((ele, i) => {
                  return (
                    <View key={i}>
                      <TouchableOpacity
                        key={i}
                        onPress={() => OnUserSelecter(ele._id)}
                        style={{alignItems: 'flex-start'}}>
                        <Text
                          style={{
                            ...FONTS.h3,
                            color: COLORS.darkGray,
                            textTransform: 'capitalize',
                          }}>
                          {ele.name}
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: COLORS.gray2,
                          marginVertical: 12,
                        }}></View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  function renderShowUserDetails() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.padding,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text></Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setUserId('')} style={{right: 10}}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.rose_600,
                  borderRadius: 2,
                  padding: 2,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 10,
                  }}>
                  Clear
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilterModal(true), getusers();
              }}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.darkGray,
                  padding: 3,
                  borderRadius: 2,
                }}>
                <Image
                  source={icons.filter}
                  style={{height: 12, width: 12, tintColor: COLORS.white}}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          {userId == '' ? renderCalender() : renderCustomCalenderWithDetails()}
        </View>
      </View>
    );
  }

  return (
    <View>
      {renderUserLeavesList()}
      {renderShowUserDetails()}
      {renderfilterModal()}
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={COLORS.green}
        title="Approved"
        message="Approved Successfully..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
export default Profile;

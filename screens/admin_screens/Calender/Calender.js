import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../../constants';
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
  const companyDetail = useSelector(state => state.company);
  const userData = useSelector(state => state.user);

  var companyData;
  if (companyDetail._id) {
    companyData = companyDetail;
  } else {
    companyData = userData;
  }
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
    let response = await getUserLeaves(company_id);
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
            marginBottom: 10,
          }}>
          <Text
            style={{
              ...FONTS.h3,
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
                right: 15,
                backgroundColor: COLORS.green,
                paddingHorizontal: 3,
                paddingVertical: 1,
                borderRadius: 2,
              }}
              onPress={() => postLeaves(item._id)}>
              <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                Approve
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.rose_600,
                paddingHorizontal: 3,
                paddingVertical: 1,
                borderRadius: 2,
              }}
              onPress={() => alert('Reject')}>
              <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
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
                  <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                    {index + 1}.{' '}
                  </Text>
                  <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                    Leave date -{' '}
                  </Text>
                  <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
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
                  style={{height: 25}}
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
          padding: 15,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Leaves List</Text>

        <FlatList
          data={leaves}
          contentContainerStyle={{marginTop: SIZES.radius}}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          maxHeight={200}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.gray2,
                  marginVertical: 12,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  function renderCalender() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          padding: 15,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <CalendarPicker
          width={350}
          height={350}
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
            backgroundColor: COLORS.darkGray,
            paddingHorizontal: 5,
            paddingVertical: 2,
            color: 'white',
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

  return (
    <View
      style={{marginVertical: SIZES.padding, marginHorizontal: SIZES.radius}}>
      {leaves && renderUserLeavesList()}
      {renderCalender()}
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
  addbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  item: {
    backgroundColor: COLORS.darkGray,
    flex: 1,
    borderRadius: 5,
    padding: 15,
    marginRight: 10,
    marginTop: 25,
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  timing: {
    color: COLORS.white,
  },
  type: {
    color: '#03A9F4',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  modalContent: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
});
export default Profile;

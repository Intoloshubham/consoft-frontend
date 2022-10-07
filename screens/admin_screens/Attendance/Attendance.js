import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { COLORS, SIZES, FONTS, icons } from '../../../constants';
import CheckBox from '@react-native-community/checkbox';
import {
  getUserLeaves,
  postUserLeaves,
} from '../../../controller/LeavesController';
import { getUserAttendance } from '../../../controller/UserAttendanceController';
import { CustomToast } from '../../../Components';
import { useSelector } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import DropDownPicker from 'react-native-dropdown-picker';
import {getUsers} from '../../../controller/UserRoleController';

const Attendance = () => {
  const companyDetail = useSelector(state => state.company);
  const userData = useSelector(state => state.user);
  var companyData;
  if (companyDetail._id) {
    companyData = companyDetail;
  } else {
    companyData = userData;
  }
  const company_id = companyData._id;
  console.log("🚀 ~ file: Attendance.js ~ line 16 ~ Attendance ~ companyDetail", companyData)

  const [leaves, setLeaves] = React.useState([]);
  const [checked, setChecked] = React.useState({});
  const [data, setData] = React.useState('');
  const arr = { leavedates: data };

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);

  //
  const checkBoxHandler = leave_date_id => {
    let d = [...data, leave_date_id];
    setData(d);
  };

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

  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsed1, setCollapsed1] = React.useState(true);
  const [attendance, setAttendance] = React.useState('');

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
    setCollapsed1(true);
  };
  const toggleExpanded1 = () => {
    setCollapsed1(!collapsed1);
    userAttendance();
    setCollapsed(true);
  };

  //
  const [openMonths, setOpenMonths] = React.useState(false);
  const [monthsValue, setMonthsValue] = React.useState('');
  const [months, setMonths] = React.useState([
    {label: 'Jan', value: '01'},
    {label: 'Feb', value: '02'},
    {label: 'Mar', value: '03'},
    {label: 'Apr', value: '04'},
    {label: 'May', value: '05'},
    {label: 'Jun', value: '06'},
    {label: 'Jul', value: '07'},
    {label: 'Aug', value: '08'},
    {label: 'Sept', value: '09'},
    {label: 'Oct', value: '10'},
    {label: 'Nov', value: '11'},
    {label: 'Dec', value: '12'},
  ]);

  const currentYear = new Date().getFullYear();

  const [openYears, setOpenYears] = React.useState(false);
  const [yearsValue, setYearsValue] = React.useState('');
  const [years, setYears] = React.useState([
    {label: currentYear, value: currentYear},
    {label: currentYear - 1, value: currentYear - 1},
    {label: currentYear - 2, value: currentYear - 2},
  ]);

  const [openUsers, setOpenUsers] = React.useState(false);
  const [usersValue, setUsersValue] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    let response = await getUsers(company_id);
    if (response.status === 200) {
      let roleDataFromApi = response.data.map((one, i) => {
        return {label: one.name, value: one._id};
      });
      setUsers(roleDataFromApi);
    }
  };

  const onYearOpen = () => {
    setOpenMonths(false);
    setOpenUsers(false);
  };

  const onMonthOpen = () => {
    setOpenYears(false);
    setOpenUsers(false);
  };

  const onUserOpen = () => {
    setOpenMonths(false);
    setOpenYears(false);
  };

  const user_id = usersValue == '' ? '' : usersValue;
  const [date, setDate] = React.useState(new Date());
  const year = yearsValue == '' ? date.getFullYear() : yearsValue;
  const month =
    monthsValue == '' ? ('0' + (date.getMonth() + 1)).slice(-2) : monthsValue;

  const userAttendance = async () => {
    let response = await getUserAttendance(company_id, year, month, user_id);
    setAttendance(response.data);
  };

  React.useEffect(() => {
    userLeaves();
    userAttendance();
    fetchUsers();
  }, []);

  function renderUserLeavesList() {
    const renderItem = ({ item }) => (
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
              fontSize: 18,
              color: COLORS.lightblue_800,
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
                // right: 15,
                backgroundColor: COLORS.green,
                paddingHorizontal: 3,
                paddingVertical: 1,
                borderRadius: 2,
              }}
              onPress={() => postLeaves(item._id)}>
              <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>
                Approve
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
        </View>
        {item.leavedates.map((el, index) => {
          return (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 5,
                  }}>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkGray }}>
                    {index + 1}.{' '}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkGray }}>
                    Leave date -{' '}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkGray }}>
                    {el.leave_date}
                  </Text>
                </View>
                <CheckBox
                  disabled={false}
                  value={checked[el._id]}
                  onValueChange={newValue => {
                    setChecked({ ...checked, [el._id]: newValue });
                  }}
                  onChange={() => checkBoxHandler({ leave_date_id: el._id })}
                  style={{ height: 25 }}
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
          margin: 15,
          backgroundColor: COLORS.white,
          padding: 15,
          elevation: 5,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={toggleExpanded}>
          <Text style={{ ...FONTS.h2, color: COLORS.darkGray }}>Leaves</Text>
          <Image
            source={icons.down_arrow}
            style={{ height: 20, width: 20, tintColor: 'black' }}
          />
        </TouchableOpacity>
        <Collapsible collapsed={collapsed}>
          <FlatList
            data={leaves}
            contentContainerStyle={{
              marginTop: SIZES.base,
            }}
            keyExtractor={item => `${item._id}`}
            renderItem={renderItem}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 1,
                    backgroundColor: COLORS.darkGray,
                    marginVertical: 12,
                  }}></View>
              );
            }}
          />
        </Collapsible>
      </View>
    );
  }

  function renderUserAttendance() {
    const renderItem = ({ item }) => (
      <View>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.darkGray,
            textTransform: 'capitalize',
          }}>
          {item.user_name}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            // justifyContent:'space-evenly',
          }}>
          {item.presentdates.map((ele, i) => (
            <View
              key={i}
              style={{
                marginTop: 5,
                flexBasis: '20%',
              }}>
              <View
                style={{
                  backgroundColor: COLORS.success_700,
                  padding: 5,
                  alignItems: 'center',
                  borderLeftWidth: i != 0 && i % 5 ? 5 : null,
                  borderColor: 'white',
                }}>
                <Text style={{ fontSize: 9, color: COLORS.white }}>
                  {ele.present_date}
                </Text>
                <Text style={{ fontSize: 8, color: COLORS.white }}>
                  In - {ele.in_time}
                </Text>
                <Text style={{ fontSize: 8, color: COLORS.white }}>
                  Out - {ele.out_time}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );

    return (
      <View
        style={{
          margin: 15,
          padding: 15,
          backgroundColor: COLORS.white,
          elevation: 5,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={toggleExpanded1}>
          <Text style={{ ...FONTS.h2, color: COLORS.darkGray }}>Attendance</Text>
          <Image
            source={icons.down_arrow}
            style={{ height: 20, width: 20, tintColor: 'black' }}
          />
        </TouchableOpacity>
        <Collapsible collapsed={collapsed1}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 60,
            }}>
            <View style={{width: '25%'}}>
              <DropDownPicker
                style={{
                  borderWidth: null,
                  borderRadius: null,
                  backgroundColor: COLORS.gray3,
                  minHeight: 30,
                }}
                dropDownContainerStyle={{
                  borderWidth: null,
                  borderRadius: null,
                  backgroundColor: COLORS.gray3,
                }}
                placeholder="Year"
                open={openYears}
                value={yearsValue}
                items={years}
                setOpen={setOpenYears}
                setValue={setYearsValue}
                setItems={setYears}
                onChangeValue={userAttendance}
                maxHeight={80}
                onOpen={onYearOpen}
              />
            </View>
            <View style={{width: '28%'}}>
              <DropDownPicker
                style={{
                  borderWidth: null,
                  borderRadius: null,
                  backgroundColor: COLORS.gray3,
                  minHeight: 30,
                }}
                dropDownContainerStyle={{
                  borderWidth: null,
                  borderRadius: null,
                  backgroundColor: COLORS.gray3,
                }}
                placeholder="Month"
                open={openMonths}
                value={monthsValue}
                items={months}
                setOpen={setOpenMonths}
                setValue={setMonthsValue}
                setItems={setMonths}
                maxHeight={80}
                onChangeValue={userAttendance}
                onOpen={onMonthOpen}
              />
            </View>

            <View style={{width: '42%'}}>
              <DropDownPicker
                style={{
                  borderWidth: null,
                  borderRadius: null,
                  backgroundColor: COLORS.gray3,
                  minHeight: 30,
                }}
                dropDownContainerStyle={{
                  borderWidth: null,
                  borderRadius: null,
                  backgroundColor: COLORS.gray3,
                }}
                placeholder="Users"
                open={openUsers}
                value={usersValue}
                items={users}
                setOpen={setOpenUsers}
                setValue={setUsersValue}
                setItems={setUsers}
                maxHeight={80}
                onOpen={onUserOpen}
                onChangeValue={userAttendance}
              />
            </View>
          </View>
          <FlatList
            data={attendance}
            contentContainerStyle={{
              marginTop: SIZES.radius,
              paddingBottom: 20,
            }}
            keyExtractor={item => `${item._id}`}
            renderItem={renderItem}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            maxHeight={200}
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
        </Collapsible>
      </View>
    );
  }

  return (
    <View>
      {renderUserLeavesList()}
      {renderUserAttendance()}
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

export default Attendance;

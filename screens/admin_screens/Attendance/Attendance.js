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

  const userAttendance = async () => {
    let response = await getUserAttendance(company_id);
    setAttendance(response.data);
  };

  React.useEffect(() => {
    userLeaves();
    userAttendance();
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
            justifyContent: 'space-between',
          }}>
          {item.presentdates.map((ele, i) => (
            <View
              key={i}
              style={{
                marginTop: 7,
                flexBasis: '18%',
              }}>
              <View
                style={{
                  backgroundColor: COLORS.success_700,
                  padding: 2,
                  alignItems: 'center',
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
          <FlatList
            data={attendance}
            contentContainerStyle={{
              marginTop: SIZES.radius,
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

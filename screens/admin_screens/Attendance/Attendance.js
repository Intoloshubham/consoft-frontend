import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../../constants';
import CheckBox from '@react-native-community/checkbox';
import {
  getUserLeaves,
  postUserLeaves,
} from '../../../controller/LeavesController';
import {CustomToast} from '../../../Components';
import {useSelector} from 'react-redux';

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

  const [leaves, setLeaves] = React.useState([]);
  const [checked, setChecked] = React.useState({});
  const [data, setData] = React.useState('');
  const arr = {leavedates: data};

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);

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
              <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
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
        }}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Leaves List</Text>
        <FlatList
          data={leaves}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingBottom: 50,
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
      </View>
    );
  }

  return (
    <View>
      {renderUserLeavesList()}
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

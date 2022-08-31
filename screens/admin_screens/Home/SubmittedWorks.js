import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
  LogBox,
} from 'react-native';
import {useSelector} from 'react-redux';
import {FormInput, ProgressBar} from '../../../Components';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {getSubmitWorks} from '../../../controller/AssignWorkController';
import {verifySubmitWorks} from '../../../controller/VerifyController';
import {revertSubmitWorks} from '../../../controller/RevertController';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const SubmittedWorks = ({data, Submitfunction}) => {
  //COMPANY DATA
  const companyData = useSelector(state => state.company);
  const company_id = companyData._id;
  const [submitWork, setSubmitWork] = React.useState([]);
  const [revertModal, setRevertModal] = React.useState(false);
  const [revertMsg, setRevertMsg] = React.useState('');
  const [revertId, setRevertId] = React.useState('');

  //=========================== Apis ==========================================

  // const fetchSubmitWork = async () => {
  //   const response = await getSubmitWorks(company_id);
  //   if (response.status === 200) {
  //     setSubmitWork(response.data);
  //   }
  // };

  // date & time
  const [date, setDate] = React.useState(new Date());
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  const formatedTime = strTime;
  const formatedDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      locale: 'en-IN',
      display: 'spinner',
    });
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };

  // verify works
  const verifyHandler = async work_Id => {
    let data = await verifySubmitWorks(work_Id);
    if (data.status === 200) {
      // fetchSubmitWork();
      Submitfunction();
    }
  };

  const getRevertWorkId = id => {
    setRevertId(id);
  };

  const OnSubmit = async () => {
    const formData = {
      // revert_msg: revertMsg,
      exp_completion_date: formatedDate,
      exp_completion_time: formatedTime,
    };
    let data = await revertSubmitWorks(revertId, formData);
    if (data.status === 200) {
      // fetchSubmitWork();
      Submitfunction();
      setTimeout(() => {
        setRevertModal(false);
      }, 500);
    }
  };

  // React.useEffect(() => {
  //   fetchSubmitWork();
  //   LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  // }, []);

  // React.useMemo(() => {
  //   fetchSubmitWork();
  //   // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  // }, []);

  function renderStartDate() {
    return (
      <View style={{marginTop: 10}}>
        {/* <Text style={{...FONTS.h3, color: 'black'}}>New Date & Time</Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{}}>
            <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
              Date - {formatedDate}
            </Text>
            <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
              Time - {formatedTime}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={showDatepicker}
              style={{
                borderWidth: 1,
                padding: 6,
                borderRadius: 2,
                right: 15,
              }}>
              <Image
                source={icons.date}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: COLORS.black,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showTimepicker}
              style={{borderWidth: 1, padding: 6, borderRadius: 2}}>
              <Image
                source={icons.time}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: COLORS.black,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderRevertModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={revertModal}>
        <TouchableWithoutFeedback onPress={() => setRevertModal(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: COLORS.white,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
                width: '90%',
                top: '30%',
                borderRadius: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={{fontSize: 20, color: COLORS.darkGray}}>
                  New targeted date & time
                </Text>
                <ImageBackground
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 2,
                    elevation: 20,
                  }}>
                  <TouchableOpacity onPress={() => setRevertModal(false)}>
                    <Image
                      source={icons.cross}
                      style={{
                        height: 25,
                        width: 25,
                        tintColor: COLORS.rose_600,
                      }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>

              {renderStartDate()}

              {/* <FormInput
                label={'Comment'}
                placeholder=""
                multiline={true}
                numberOfLines={3}
                onChange={value => {
                  setRevertMsg(value);
                }}
              /> */}
              {/* <View
                style={{
                  marginTop: SIZES.base,
                  paddingHorizontal: SIZES.base,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.gray,
                }}>
                <TextInput
                  placeholder="Write your message here.."
                  
                  multiline={true}
                  numberOfLines={3}
                  onChange={value => {
                    setRevertMsg(value);
                  }}
                />
              </View> */}

              <TouchableOpacity
                style={{
                  marginTop: SIZES.padding,
                  alignItems: 'center',
                }}
                onPress={() => OnSubmit()}>
                <Text
                  style={{
                    ...FONTS.h3,
                    backgroundColor:
                      revertMsg != null
                        ? COLORS.lightblue_800
                        : COLORS.darkGray,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                    borderRadius: 3,
                    color: COLORS.white,
                  }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  function renderSubmitWork() {
    const renderItem = ({item}) => {
      return (
        <View style={{}}>
          {/* username  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.black,
                  textTransform: 'capitalize',
                }}>
                {item.user_name}
              </Text>
              <Text
                style={{
                  left: 5,
                  backgroundColor: COLORS.yellow_400,
                  paddingHorizontal: 5,
                  fontSize: 10,
                  color: COLORS.black,
                }}>
                {item.work_code}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', right: 10}}>
                <Image
                  source={icons.date}
                  style={{
                    height: 12,
                    width: 12,
                    tintColor: COLORS.darkGray,
                    right: 3,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.darkGray,
                  }}>
                  {item.submit_work_date}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.time}
                  style={{
                    height: 12,
                    width: 12,
                    tintColor: COLORS.darkGray,
                    right: 3,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.darkGray,
                  }}>
                  {item.submit_work_time}
                </Text>
              </View>
            </View>
          </View>
          {/* work  */}
          <View
            style={{
              marginTop: 3,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                ...FONTS.h3,
                color: COLORS.darkGray,
              }}>
              Work
              <Text style={{color: COLORS.darkGray, ...FONTS.h3}}>
                - {item.work}
              </Text>
            </Text>
            <TouchableOpacity onPress={() => verifyHandler(item._id)}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.green,
                  paddingHorizontal: 10,
                  borderRadius: 2,
                }}>
                <Text style={{fontSize: 14, color: COLORS.white}}>Verify</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        contentContainerStyle={{}}
        data={data}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        maxHeight={300}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.gray,
                marginVertical: 12,
              }}></View>
          );
        }}
      />
    );
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.radius,
        marginTop: SIZES.padding,
        borderRadius: 5,
        padding: 15,
        ...styles.shadow,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.darkGray,
            marginBottom: SIZES.radius,
          }}>
          Submitted Works
        </Text>
        {/* <TouchableOpacity onPress={() => console.log('fdjhg')}>
          <Image
            source={icons.filter}
            resizeMode="contain"
            style={{height: 18, width: 18, tintColor: COLORS.darkGray}}
          />
        </TouchableOpacity> */}
      </View>
      {renderSubmitWork()}
      {renderRevertModal()}
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
});
export default SubmittedWorks;

import React, {useEffect, useState} from 'react';
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

const SubmittedWorks = () => {
  //COMPANY DATA
  const companyData = useSelector(state => state.company);
  const company_id = companyData._id;
  const [submitWork, setSubmitWork] = React.useState([]);
  const [revertModal, setRevertModal] = React.useState(false);
  const [revertMsg, setRevertMsg] = React.useState('');
  const [revertId, setRevertId] = React.useState('');

  //=========================== Apis ==========================================

  const fetchSubmitWork = async () => {
    const response = await getSubmitWorks(company_id);
    setSubmitWork(response);
  };

  // verify works
  const verifyHandler = async work_Id => {
    let data = await verifySubmitWorks(work_Id);
    if (data.status === 200) {
      fetchSubmitWork();
    }
  };

  const getRevertWorkId = id => {
    setRevertId(id);
  };

  const OnSubmit = async () => {
    const formData = {revert_msg: revertMsg};
    let data = await revertSubmitWorks(revertId, formData);
    if (data.status === 200) {
      fetchSubmitWork();
      setTimeout(() => {
        setRevertModal(false);
      }, 500);
    }
  };

  // React.useEffect(() => {
  //   fetchSubmitWork();
  //   LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  // }, []);

  React.useMemo(() => {
    fetchSubmitWork();
    // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);


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
                width: '80%',
                top: '30%',
                borderRadius: SIZES.base,
              }}>
              <View>
                <Text style={{flex: 1, fontSize: 20, color: COLORS.darkGray}}>
                  Comment
                </Text>
              </View>
              <FormInput
                placeholder=""
                multiline={true}
                numberOfLines={3}
                onChange={value => {
                  setRevertMsg(value);
                }}
              />
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
                  marginTop: SIZES.radius,
                  alignItems: 'flex-end',
                }}
                onPress={() => OnSubmit()}>
                <Text
                  style={{
                    ...FONTS.h3,
                    backgroundColor:
                      revertMsg != null
                        ? COLORS.lightblue_600
                        : COLORS.darkGray,
                    paddingHorizontal: SIZES.base,
                    paddingVertical: 3,
                    borderRadius: 2,
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
                  ...FONTS.h4,
                  color: COLORS.darkGray,
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                }}>
                {item.user_name}
              </Text>
              <Text
                style={{
                  fontSize: 8,
                  left: 3,
                  paddingHorizontal: 3,
                  backgroundColor: COLORS.yellow_400,
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
                    height: 10,
                    width: 10,
                    tintColor: COLORS.darkGray,
                    right: 3,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: COLORS.darkGray,
                  }}>
                  {item.submit_work_date}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.time}
                  style={{
                    height: 10,
                    width: 10,
                    tintColor: COLORS.darkGray,
                    right: 3,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                ...FONTS.h4,
                color: COLORS.black,
              }}>
              Work
              <Text style={{color: COLORS.darkGray}}> - {item.work}</Text>
            </Text>
            <TouchableOpacity onPress={() => verifyHandler(item._id)}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.green,
                  paddingHorizontal: 5,
                  borderRadius: 2,
                }}>
                <Text style={{fontSize: 10, color: COLORS.white}}>Verify</Text>
                {/* <Image
                  source={verifyResponse == 200 ? icons.verify : icons.cancel}
                  resizeMode="contain"
                  style={{
                    height: 10,
                    width: 10,
                    tintColor: COLORS.lightblue_900,
                  }}
                /> */}
              </ImageBackground>
            </TouchableOpacity>
          </View>
          {/* message  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                ...FONTS.h4,
                color: COLORS.black,
              }}>
              Msg
              <Text style={{color: COLORS.darkGray}}>
                - {item.submit_work_text}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                getRevertWorkId(item._id), setRevertModal(true);
              }}
              style={{alignItems: 'flex-end'}}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.rose_600,
                  paddingHorizontal: 5,
                  borderRadius: 2,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: COLORS.white,
                  }}>
                  Revert
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                flex: 1,
                ...FONTS.h5,
                color: COLORS.black,
              }}>
              Submit Date & Time :
              <Text style={{color: COLORS.darkGray}}>
                {' '}
                {item.submit_work_date}
                {'  '} {item.submit_work_time}
              </Text>
            </Text>
          </View> */}
          {/* <View style={{marginTop: SIZES.base}}>
            <ProgressBar progress={item.persentage} />
          </View> */}
        </View>
      );
    };

    return (
      <FlatList
        contentContainerStyle={{}}
        data={submitWork}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        maxHeight={250}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: COLORS.gray2,
                marginVertical: SIZES.radius,
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
        marginHorizontal: SIZES.padding,
        marginTop: SIZES.padding,
        borderRadius: 5,
        padding: 20,
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
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.gray2,
          marginVertical: SIZES.base,
        }}></View>
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

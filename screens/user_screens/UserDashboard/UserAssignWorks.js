import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl, ScrollView
} from 'react-native';
import { SIZES, COLORS, FONTS, icons, images } from '../../../constants';
import { AccordionList } from 'accordion-collapse-react-native';
import { TextInput } from 'react-native-paper';
import { Divider } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import Config from '../../../config';
import {
  getAssignWorks,
  submitWork,
} from '../../../controller/UserAssignWorkController';

const UserAssignWorks = () => {
  const dispatch = useDispatch();
  const [assignWorksData, setAssignWorksData] = React.useState([]);
  const [assignWorks, setAssignWorks] = React.useState([]);
  const [textMsg, setTextMsg] = React.useState('');
  const [userDataId, setUserDataId] = useState('')


  const userData = useSelector(state => state.user);
  // console.log(userData._id)
  const fetchAssignWorks = useCallback(async () => {
    setUserDataId(userData._id)
    const data = await getAssignWorks(userData._id);
    // console.log("assign works data")
    // console.log(data)
    if (data) {
      data.map(ele => {
        setAssignWorks(ele.assign_works);
      });
    }
  }, []);

  useEffect(() => {
    fetchAssignWorks();
  }, []);

  // submit comment
  const submitComment = async work_id => {
    const submit_data = {
      submit_work_text: textMsg,
    };

    const data = await submitWork(submit_data, work_id);
    if (data.status === 200) {
      setTextMsg('');
      fetchAssignWorks();
    }
  };

  const WorkDetails = ({ item, message, color, index }) => {
    return (
      <View
        style={{
          marginTop: index == 0 ? null : SIZES.base,
          paddingHorizontal: SIZES.base,
          paddingVertical: 5,
          backgroundColor: COLORS.darkGray,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                paddingHorizontal: 5,
                backgroundColor: COLORS.white,
                color: COLORS.black,
                borderRadius: 1,
              }}>
              {item.work_code}
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.white,
                left: 10,
              }}>
              {item.work}
            </Text>
          </View>
          <Image
            source={icons.down_arrow}
            style={{ height: 15, width: 15, tintColor: COLORS.white }}
          />
        </View>
        <Text style={{ color: color, marginTop: 3 }}>{message}</Text>
      </View>
    );
  };

  const renderHeader = (item, index) => {
    return (
      <View>
        {item.work_status == true &&
          item.verify == false &&
          item.revert_status == false ? (
          <WorkDetails
            item={item}
            message={'Pending from the admin side'}
            color={COLORS.yellow_400}
          />
        ) : item.work_status == false &&
          item.verify == false &&
          item.revert_status == true ? (
          <WorkDetails item={item} message={'Revert'} color={COLORS.rose_600} />
        ) : item.work_status == false &&
          item.verify == false &&
          item.revert_status == false ? (
          <WorkDetails item={item} message={''} color={COLORS.black} />
        ) : null}
      </View>
    );
  };

  const renderBody = item => {
    return (
      <View
        style={{
          backgroundColor: COLORS.darkGray,
          padding: SIZES.radius,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
        key={item.key}>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={{ ...FONTS.h5, color: COLORS.white }}>
              Date: {item.exp_completion_date}
            </Text>
            <Text style={{ ...FONTS.h5, color: COLORS.white, left: 10 }}>
              Time: {item.exp_completion_time}
            </Text>
          </View>
          <Divider
            style={{
              backgroundColor: COLORS.lightGray1,
              marginVertical: SIZES.base,
            }}
          />
          <View style={{ flexdirection: 'row' }}>
            <View style={{ backgroundColor: COLORS.white, borderRadius: 5 }}>
              <TextInput
                style={{
                  paddingHorizontal: SIZES.radius,
                  backgroundColor: COLORS.white,
                }}
                multiline={true}
                placeholder="Comment section..."
                placeholderTextColor={COLORS.gray}
                onChangeText={text => setTextMsg(text)}
                value={textMsg}
              />
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginTop: SIZES.base,
              }}
              onPress={() => submitComment(item._id)}>
              {item.work_status == false || item.revert_status == true ? (
                <Text
                  style={{
                    color: COLORS.white,
                    backgroundColor: COLORS.lightblue_500,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 3,
                  }}>
                  Send
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        marginHorizontal: SIZES.radius,
        marginVertical: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        paddingTop: SIZES.base,
        paddingBottom: SIZES.radius,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        ...styles.shadow,
      }}>
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.darkGray,
          marginBottom: SIZES.base,
        }}>
        Assigned Works
      </Text>

      {/* {
      assignWorks.map((ele)=>{
        return(
          <View key ={ele._id}>
            <Text>{ele.assign_works}</Text>
          </View>
        )
      })
     } */}
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ width: '100%', height: '100%' }}>
        <AccordionList
          list={assignWorks}
          header={renderHeader}
          body={renderBody}
          isExpanded={false}
          keyExtractor={item => `${item._id}`}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          maxHeight={300}
        />
      </ScrollView>
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
export default UserAssignWorks;

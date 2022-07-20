import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SIZES, COLORS, FONTS, icons, images} from '../../../constants';
import {AccordionList} from 'accordion-collapse-react-native';
import {TextInput} from 'react-native-paper';
import {Divider} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import Config from '../../../config';

const UserAssignWorks = () => {
  const [assignWorksData, setAssignWorksData] = React.useState([]);
  const [assignWorks, setAssignWorks] = React.useState([]);
  const [textMsg, setTextMsg] = React.useState('');
  const userData = useSelector(state => state.user);

  // get data of user assign work from api
  React.useEffect(() => {
    fetch(`${Config.API_URL}user-assign-works/` + `${userData._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // setAssignWorksData(data);
        data.map(ele => {
          setAssignWorks(ele.assign_works);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // submit comment
  const submitComment = work_id => {
    const data = {
      submit_work_text: textMsg,
    };

    fetch(`${Config.API_URL}user-submit-work/${work_id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setTextMsg('');
        }
      });
  };

  const WorkDetails = ({item, index, message, color}) => {
    return (
      <View
        style={{
          marginTop: index == 0 ? null : SIZES.base,
          paddingHorizontal: SIZES.base,
          backgroundColor: COLORS.darkGray,
          padding: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 12,
                paddingHorizontal: 5,
                backgroundColor: COLORS.success_100,
                color: COLORS.black,
                borderRadius: 2,
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
            style={{height: 15, width: 15, tintColor: COLORS.white}}
          />
        </View>
        <Text style={{color: color, marginTop: 3}}>{message}</Text>
      </View>
    );
  };

  const renderHeader = item => {
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
            <Text style={{color: COLORS.white, fontSize: SIZES.h4}}>
              Date: {item.exp_completion_date}
            </Text>
            <Text style={{color: COLORS.white, left: 10}}>
              Time: {item.exp_completion_time}
            </Text>
          </View>
          <Divider
            style={{
              backgroundColor: COLORS.lightGray1,
              marginVertical: SIZES.base,
            }}
          />
          <View style={{flexdirection: 'row'}}>
            <View style={{backgroundColor: COLORS.white, borderRadius: 5}}>
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
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.padding,
        paddingHorizontal: SIZES.radius,
        paddingVertical: SIZES.radius,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        ...styles.shadow,
      }}>
      {/* <Text
        style={{
          ...FONTS.h3,
          color: COLORS.darkGray,
        }}>
        User Assign Works
      </Text> */}
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

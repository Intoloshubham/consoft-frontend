import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import {AccordionList} from 'accordion-collapse-react-native';
import {Divider} from '@ui-kitten/components';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import Config from '../../../config';

const UserAssignWorks = ({user_id}) => {
  const [assignWorksData, setAssignWorksData] = React.useState([]);
  const [assignWorks, setAssignWorks] = React.useState([]);
  const [textMsg, setTextMsg] = React.useState('');
  // console.log(assignWorksData);
  // console.log(assignWorks);

  // React.useEffect(() => {
    fetch(`${Config.API_URL}user-assign-works/` + `${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAssignWorksData(data);
        data.map(ele => {
          setAssignWorks(ele.assign_works);
        });
      })
      .catch(error => {
        console.log(error);
      });
  // }, [assignWorksData,assignWorks]);

  // const OnSubmit = work_id => {
  //   const data = {
  //     comment: textMsg,
  //   };
  //   fetch(`${Config.API_URL}user-work-comment/` + `${work_id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log(data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // };

  const headerRender = (item, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: index == 0 ? null : SIZES.radius,
          paddingHorizontal: SIZES.base,
          backgroundColor: COLORS.darkGray,
          padding: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}>
        <Text style={{...FONTS.h4, color: COLORS.white}}>
          {item.work_code}
          {' - '}
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
            }}>
            {item.work}
          </Text>
        </Text>
        <Image
          source={icons.down_arrow}
          style={{height: 15, width: 15, tintColor: COLORS.white}}
        />
      </View>
    );
  };

  const bodyRender = item => {
    return (
      <View
        style={{
          backgroundColor: COLORS.darkGray2,
          padding: SIZES.radius,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          ...styles.shadow,
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
            <View style={{backgroundColor: COLORS.white, borderRadius: 3}}>
              {/* <TextInput
                style={{paddingHorizontal: SIZES.radius}}
                placeholder="Write message here.."
                placeholderTextColor={COLORS.darkGray}
                onChange={value => {
                  console.log(value);
                  setTextMsg(value);
                }}
              /> */}
              <TextInput
                style={{flex: 1, color: COLORS.black}}
                placeholder="write"
                placeholderTextColor={COLORS.darkGray}
                keyboardType="default"
                onChangeText={value => setTextMsg(value)}
                value={textMsg}
                multiline={true}
                numberOfLines={3}
              />
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginTop: SIZES.base,
              }}
              onPress={() => OnSubmit(item._id)}>
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
          <Divider
            style={{
              backgroundColor: COLORS.lightGray1,
              marginVertical: SIZES.base,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              admin revert message
            </Text>
            <TouchableOpacity onPress={() => alert('ok..')}>
              <Text
                style={{
                  color: COLORS.white,
                  backgroundColor: COLORS.lightblue_500,
                  paddingHorizontal: 10,
                  paddingVertical: 1,
                  borderRadius: 3,
                }}>
                ok
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
        // paddingVertical: SIZES.radius,
        paddingBottom: SIZES.radius,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        ...styles.shadow,
      }}>
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.black,
          marginVertical: SIZES.radius,
        }}>
        Tasks
      </Text>
      <AccordionList
        list={assignWorks}
        header={headerRender}
        isExpanded={false}
        body={bodyRender}
        keyExtractor={item => `${item._id}`}
      />
    </View>
  );
};

export default UserAssignWorks;
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

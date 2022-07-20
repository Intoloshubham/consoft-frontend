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

  React.useEffect(() => {
    fetch(`${Config.API_URL}user-assign-works/` + `${userData.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAssignWorksData(data);
        data.map(ele => {
          setAssignWorks(ele.assign_works);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const renderHeader = (item, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   alignItems: 'center',
          marginTop: index == 0 ? null : SIZES.radius,
          paddingHorizontal: SIZES.base,
          backgroundColor: COLORS.lightGray1,
          padding: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}>
        <Text style={{...FONTS.h4, color: COLORS.darkGray, flex: 1}}>
          {item.work_code}
          {' - '}
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.darkGray,
            }}>
            {item.work}
          </Text>
        </Text>
        <Image
          source={icons.down_arrow}
          style={{height: 15, width: 15, tintColor: COLORS.darkGray}}
        />
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
                style={{paddingHorizontal: SIZES.radius}}
                multiline={true}
                placeholder="Comment section"
                placeholderTextColor={COLORS.darkGray}
                onChangeText={text => setCommentInput(text)}
                value={commentInput}
              />
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginTop: SIZES.base,
              }}
              onPress={() => alert('Send...')}>
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
        paddingVertical: SIZES.radius,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        ...styles.shadow,
      }}>
      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.darkGray,
          marginBottom: SIZES.radius,
        }}>
        UserAssignWorks
      </Text>
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

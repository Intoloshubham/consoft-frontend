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
import {useSelector} from 'react-redux';
import {FormInput} from '../../../Components';

const Todo = () => {
  const [assignWorksData, setAssignWorksData] = React.useState([]);
  const [textMsg, setTextMsg] = React.useState('');

  // const userData = useSelector(state => state.user);
  // console.log(userData);

  React.useEffect(() => {
    const abortCont = new AbortController();
    fetch(
      'http://192.168.1.99:8000/api/user-assign-works/62c827689c1d4cb814ead866',
      {signal: abortCont.signal},
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let assignWorks = data.map(ele => {
          setAssignWorksData(ele.assign_works);
        });
        // console.log(data);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log(err);
        }
      });
    return () => abortCont.abort();
  }, []);

  const OnSubmit = id => {
    const FormData = {
      comment: textMsg,
    };
    fetch(`${Config.API_URL}user-work-comment` + `${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FormData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const headerRender = (item, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: index == 0 ? null : SIZES.radius,
          paddingHorizontal: SIZES.base,
          backgroundColor: COLORS.lightGray1,
          padding: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}>
        <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
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

  const bodyRender = item => {
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
              <TextInput
                style={{paddingHorizontal: SIZES.radius}}
                placeholder="Write message here.."
                placeholderTextColor={COLORS.darkGray}
                onChange={value => {
                  console.log(value);
                  setTextMsg(value);
                }}
              />
              {/* <FormInput
                placeholder="dskfhds"
                multiline={true}
                numberOfLines={3}
                onChange={value => {
                  setTextMsg(value);
                }}
              /> */}
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
                  paddingVertical: 1,
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
              {item.revert_msg}
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
                Submit
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
      <AccordionList
        list={assignWorksData}
        header={headerRender}
        isExpanded={false}
        body={bodyRender}
        keyExtractor={item => `${item._id}`}
      />
    </View>
  );
};

export default Todo;
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

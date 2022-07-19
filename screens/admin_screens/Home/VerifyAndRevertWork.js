import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import Config from '../../../config';
import {useSelector} from 'react-redux';

const VerifyAndRevertWork = ({company_id}) => {
  const [verifyRevertWorks, setVerifyRevertWorks] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'verify', title: 'Verify'},
    {key: 'revert', title: 'Revert'},
  ]);

  // call api for getting verified and reveted works
  // React.useEffect(() => {
  //   const abortCont = new AbortController();
  //   fetch(
  //     `${Config.API_URL}verify-revert-works/` + `${company_id}`,
  //     {signal: abortCont.signal},
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     },
  //   )
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       setVerifyRevertWorks(data);
  //       // console.log(data);
  //     })
  //     .catch(err => {
  //       if (err.name === 'AbortError') {
  //         console.log('fetch aborted');
  //       } else {
  //         console.log(err);
  //       }
  //     });
  //   return () => abortCont.abort();
  // }, [verifyRevertWorks]);

  const VerifyWorksRoute = () => (
    <View style={{padding: 5, marginTop: SIZES.base}}>
      {verifyRevertWorks.map((ele, i) => {
        if (ele.verify == true) {
          return (
            <View key={ele._id}>
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
                    {ele.user_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      left: 3,
                      paddingHorizontal: 3,
                      backgroundColor: COLORS.green,
                      color: COLORS.white,
                      borderRadius: 2,
                    }}>
                    {ele.work_code}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      right: 10,
                    }}>
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
                      {ele.verify_date}
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
                      {ele.verify_time}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                <Text style={{...FONTS.h4, color: COLORS.black}}>
                  Work{' - '}
                </Text>
                {ele.work}
              </Text>
              <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                <Text style={{...FONTS.h4, color: COLORS.black}}>
                  Msg{' - '}
                </Text>
                {ele.submit_work_text}
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.gray,
                  marginVertical: SIZES.base,
                }}
              />
            </View>
          );
        }
      })}
    </View>
  );

  const RevertWorksRoute = () => (
    <View style={{padding: 10}}>
      {verifyRevertWorks.map((ele, i) => {
        if (ele.revert_status == true) {
          return (
            <View key={ele._id}>
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
                    {ele.user_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      left: 3,
                      paddingHorizontal: 3,
                      backgroundColor: COLORS.rose_600,
                      color: COLORS.white,
                      borderRadius: 2,
                    }}>
                    {ele.work_code}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      right: 10,
                    }}>
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
                      {ele.verify_date}
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
                      {ele.verify_time}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                <Text style={{...FONTS.h4, color: COLORS.black}}>
                  Work{' - '}
                </Text>
                {ele.work}
              </Text>
              <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                <Text style={{...FONTS.h4, color: COLORS.black}}>
                  Msg{' - '}
                </Text>
                {ele.submit_work_text}
              </Text>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.gray,
                  marginVertical: SIZES.base,
                }}
              />
            </View>
          );
        }
      })}
    </View>
  );

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({focused, route}) => {
          return (
            <Text
              style={{
                color: focused ? COLORS.black : COLORS.darkGray,
              }}>
              {route.title}
            </Text>
          );
        }}
        indicatorStyle={{
          backgroundColor: COLORS.rose_600,
          padding: 1.5,
          marginBottom: -2,
        }}
        style={{
          backgroundColor: COLORS.white,
          borderBottomWidth: 0.5,
          borderColor: COLORS.darkGray,
        }}
      />
    );
  };

  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        ...styles.shadow,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.base,
          // marginBottom: SIZES.base,
          marginTop: SIZES.base,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>
          All Work Tasks
        </Text>
        <TouchableOpacity onPress={() => alert('filter')}>
          <Image
            source={icons.filter}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.darkGray,
            }}
          />
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          verify: VerifyWorksRoute,
          revert: RevertWorksRoute,
        })}
        onIndexChange={setIndex}
        style={{height: 350, maxHeight: 300}}
        renderTabBar={renderTabBar}
        showPageIndicator={true}
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
export default VerifyAndRevertWork;

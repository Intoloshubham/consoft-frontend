import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {getVerifyAndRevertWorks} from '../../../controller/AssignWorkController';

const VerifyAndRevertWork = ({company_id}) => {
  const [verifyRevertWorks, setVerifyRevertWorks] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'verify', title: 'Verify'},
    {key: 'revert', title: 'Revert'},
  ]);

  // call api for getting verified and reveted works
  const fetchVerifyAndRevertWork = async () => {
    const response = await getVerifyAndRevertWorks(company_id);
    setVerifyRevertWorks(response);
  };

  // filter verify & revert works
  const [verify, setVerify] = React.useState([]);
  const [revert, setRevert] = React.useState([]);

  const filterDataBasedOnCondition = () => {
    var filterVerifyData = verifyRevertWorks.filter(function (item) {
      return item.verify == true;
    });
    setVerify(filterVerifyData);

    var filterRevertData = verifyRevertWorks.filter(function (item) {
      return item.revert_status == true;
    });
    setRevert(filterRevertData);
  };

  React.useEffect(() => {
    fetchVerifyAndRevertWork();
    filterDataBasedOnCondition();
  }, []);

  const VerifyWorksRoute = () => {
    const renderItem = ({item}) => (
      <View>
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
                fontSize: 9,
                left: 3,
                paddingHorizontal: 3,
                backgroundColor: COLORS.green,
                color: COLORS.white,
                borderRadius: 2,
              }}>
              {item.work_code}
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
                {item.verify_date}
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
                {item.verify_time}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
          <Text style={{...FONTS.h4, color: COLORS.black}}>Work{' - '}</Text>
          {item.work}
        </Text>
        <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
          <Text style={{...FONTS.h4, color: COLORS.black}}>Msg{' - '}</Text>
          {item.submit_work_text}
        </Text>
      </View>
    );

    return (
      <SafeAreaView
        style={{
          padding: 5,
          marginTop: SIZES.base,
        }}>
        <FlatList
          data={verify}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.gray,
                  marginVertical: 10,
                }}></View>
            );
          }}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  };

  const RevertWorksRoute = () => {
    const renderItem = ({item}) => (
      <View>
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
                fontSize: 9,
                left: 3,
                paddingHorizontal: 3,
                backgroundColor: COLORS.rose_600,
                color: COLORS.white,
                borderRadius: 2,
              }}>
              {item.work_code}
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
                {item.verify_date}
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
                {item.verify_time}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
          <Text style={{...FONTS.h4, color: COLORS.black}}>Work{' - '}</Text>
          {item.work}
        </Text>
        <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
          <Text style={{...FONTS.h4, color: COLORS.black}}>Msg{' - '}</Text>
          {item.submit_work_text}
        </Text>
      </View>
    );
    return (
      <SafeAreaView style={{padding: 5, marginTop: SIZES.base}}>
        <FlatList
          data={revert}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.gray,
                  marginVertical: 10,
                }}></View>
            );
          }}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  };

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
        borderRadius: 5,
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
        style={{height: 350}}
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

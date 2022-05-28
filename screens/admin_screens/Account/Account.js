import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LogBox,
  FlatList,
} from 'react-native';
import {
  IconButton,
  TextButton,
  LineDivider,
  ProgressBar,
  ProfileValue,
} from '../../../Components';
import {SIZES, COLORS, FONTS, icons, images} from '../../../constants';
import Collapsible from 'react-native-collapsible';

const Account = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const AccountList = [
    {id: 1, name: 'Users', img: icons.profile},
    {id: 2, name: 'Stocks', img: icons.account},
    {id: 3, name: 'Contractors', img: icons.dashboard},
    {id: 4, name: 'FAQ', img: icons.report},
    // {id: 5, name: 'LogOut', img: icons.logout},
  ];

  const list = [
    {id: 1, name: 'See Users'},
    {id: 2, name: 'Update Users Details'},
    {id: 3, name: 'Delete Users'},
  ];

  const [collapsed, setCollapsed] = React.useState(true);
  const [accList, setAccList] = React.useState(AccountList);
  const [collList, setCollList] = React.useState(list);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          // marginTop: 30,
          paddingHorizontal: SIZES.padding,
          justifyContent: 'space-between',
        }}>
        <Text style={{...FONTS.h1, fontWeight: 'bold', color: COLORS.black}}>
          Profile
        </Text>
        <IconButton
          icon={icons.sun}
          iconStyle={{
            tintColor: COLORS.black,
          }}
        />
      </View>
    );
  }

  function renderProfileCard() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_800,
        }}>
        {/* profile image  */}
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
          }}>
          <Image
            source={images.Profile7}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 40,
              borderWidth: 2,
              borderColor: COLORS.white,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: COLORS.success_300,
              }}>
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        {/* Details  */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.padding,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}>
            Anurag Shrikhande
          </Text>
          <Text style={{color: COLORS.white, ...FONTS.body4}}>
            Administrator
          </Text>
          {/* progress  */}
          <ProgressBar
            progress="40%"
            containerStyle={{
              marginTop: SIZES.radius,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.body4,
              }}>
              Overall Progress
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body4,
              }}>
              40%
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderProfileSection1() {
    return (
      <View
        style={{
          ...styles.profileSectionContainer,
        }}>
        <ProfileValue icon={icons.profile} value="Create New Project" />
        <LineDivider />
        <ProfileValue icon={icons.contr} value="Contractors" />
        <ProfileValue icon={icons.p_team} value="Project Team" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* Header  */}
      {/* {renderHeader()} */}

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}>
        {/* profile card  */}
        {renderProfileCard()}

        {/* profile section 1  */}
        {renderProfileSection1()}
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
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray2,
  },
});
export default Account;

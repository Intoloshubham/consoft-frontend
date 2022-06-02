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
  UploadImage,
} from '../../../Components';
import {SIZES, COLORS, FONTS, icons, images} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';

//auth
import {AuthContext} from '../../Authentication/Context';

const Account = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const [collapsed, setCollapsed] = React.useState(true);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  // auth
  const {signOut} = React.useContext(AuthContext);
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
        {/* <IconButton
          icon={icons.sun}
          iconStyle={{
            tintColor: COLORS.black,
          }}
        /> */}
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
          }}
          onPress={() => {
            return <UploadImage />;
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
            Admin Demo
          </Text>
          <Text style={{color: COLORS.white, ...FONTS.body4}}>
            Administrator
          </Text>
          {/* progress  */}
          {/* <ProgressBar
            progress="40%"
            containerStyle={{
              marginTop: SIZES.radius,
            }}
          /> */}
          {/* <View
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
          </View> */}
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
        <ProfileValue
          icon={icons.profile}
          value="Create New Project"
          image={icons.right_arr}
        />
        <LineDivider />
        <ProfileValue
          icon={icons.stock_manage}
          value="Stock Mangement"
          image={icons.down_arrow}
          onPress={toggleExpanded}
        />
        <Collapsible collapsed={collapsed} duration={300}>
          <View style={{marginLeft: SIZES.padding * 1.8}}>
            {/* <Text
              style={{
                ...FONTS.h3,
                fontSize: 18,
                color: COLORS.darkGray,
                marginVertical: SIZES.base,
              }}>
              Items
            </Text> */}
            {/* <Text style={{...FONTS.h3, fontSize: 18, color: COLORS.darkGray}}>
              Unit
            </Text> */}
            <ProfileValue
              icon={icons.stock_manage}
              value="Items"
              image={icons.right_arr}
              onPress={() => navigation.navigate('Items')}
            />
            <LineDivider />
            <ProfileValue
              icon={icons.stock_manage}
              value="Unit"
              image={icons.right_arr}
              onPress={() => navigation.navigate('Unit')}
            />
          </View>
        </Collapsible>
        <ProfileValue
          icon={icons.p_team}
          value="Create Company Team"
          image={icons.right_arr}
          onPress={() => navigation.navigate('CompanyTeam')}
        />
        <ProfileValue
          icon={icons.contr}
          value="Contractors"
          image={icons.right_arr}
        />
        <ProfileValue
          icon={icons.camera}
          value="Project Team"
          image={icons.right_arr}
        />
      </View>
    );
  }

  function renderProfileSection2() {
    return (
      <View
        style={{
          ...styles.profileSectionContainer1,
        }}>
        <ProfileValue
          icon={icons.logout}
          value="LogOut"
          onPress={() => {
            signOut();
          }}
        />
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
        {/* section 2  */}
        {renderProfileSection2()}
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
    paddingHorizontal: SIZES.radius,
    borderWidth: 1,
    borderRadius: SIZES.base,
    borderColor: COLORS.gray2,
  },
  profileSectionContainer1: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderWidth: 1,
    borderRadius: SIZES.base,
    borderColor: COLORS.gray2,
  },
});
export default Account;

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LogBox,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {SIZES, COLORS, FONTS, icons, images} from '../../../constants';
import {LineDivider, ProfileValue} from '../../../Components';

const Account = () => {
  const navigation = useNavigation();
  const [collapsed, setCollapsed] = React.useState(true);

  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

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
            width: 60,
            height: 60,
          }}
          onPress={() => alert('Upload Image')}>
          <Image
            source={images.Profile7}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 30,
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
          icon={icons.p_team}
          value="Project Categories & Types"
          image={icons.right_arr}
          onPress={() => navigation.navigate('CategoryandType')}
        />
        <LineDivider />
        <ProfileValue
          icon={icons.p_team}
          value="Add Company Team"
          image={icons.right_arr}
          onPress={() => navigation.navigate('CompanyTeam')}
        />
        <LineDivider />
        <ProfileValue
          icon={icons.stock_manage}
          value="Stock Management"
          image={icons.down_arrow}
          onPress={toggleExpanded}
        />
        <Collapsible collapsed={collapsed} duration={300}>
          <View style={{marginLeft: SIZES.padding * 1.8}}>
            <ProfileValue
              icon={icons.items}
              value="Items"
              image={icons.right_arr}
              onPress={() => navigation.navigate('Items')}
            />
            <LineDivider />
            <ProfileValue
              icon={icons.unit}
              value="Unit"
              image={icons.right_arr}
              onPress={() => navigation.navigate('Unit')}
            />
            <LineDivider />
            <ProfileValue
              icon={icons.stock_manage}
              value="Manage Stock"
              image={icons.right_arr}
              onPress={() => navigation.navigate('ManageStock')}
            />
          </View>
        </Collapsible>
        <LineDivider />
        <ProfileValue
          icon={icons.Suppliers}
          value="Suppliers"
          image={icons.right_arr}
          onPress={() => navigation.navigate('Suppliers')}
        />
        <LineDivider />
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
          onPress={() => navigation.navigate('Dahsboard')}
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
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}>
        {renderProfileCard()}
        {renderProfileSection1()}
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

import React, {useEffect, useState} from 'react';
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
import {
  removeCompanyId,
  removeToken,
} from '../../../services/asyncStorageService';
import {useSelector} from 'react-redux';
import {unSetCompanyInfo} from '../../../features/CompanySlice';
import {unsetCompanyToken} from '../../../features/CompanyAuthSlice';
import {SIZES, COLORS, FONTS, icons, images} from '../../../constants';
import {ProfileValue, LineDivider} from '../../../Components';

const Account = () => {
  const navigation = useNavigation();
  const [collapsed, setCollapsed] = useState(true);

  const logout = async () => {
    unSetCompanyInfo({_id: '', company_name: '', email: '', mobile: ''});
    unsetCompanyToken({token: null});
    await removeToken('token');
    await removeCompanyId('company_id');
    navigation.navigate('Dashboard');
  };

  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  //getting company data from redux store    company -> name is reducer
  const companyData = useSelector(state => state.company);
  // console.log(companyData);

  // const companyToken = useSelector(state => state.companyAuth)
  // console.log(companyToken);

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
          paddingHorizontal: SIZES.padding,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_800,
          alignItems: 'center',
        }}>
        {/* profile image  */}
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
          }}
          onPress={() => alert('Upload Image')}>
          <Image
            source={images.civil_eng}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 15,
              borderWidth: 3,
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
              textTransform: 'capitalize',
            }}>
            {companyData.company_name}
          </Text>
          <Text style={{color: COLORS.white, ...FONTS.body4}}>
            {companyData.email}
          </Text>
          <Text style={{color: COLORS.white, ...FONTS.body4}}>
            +91{companyData.mobile}
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
          icon={icons.project_type}
          value="Project Categories & Types"
          image={icons.right_arr}
          onPress={() => navigation.navigate('CategoryandType')}
        />
        <LineDivider />
        <ProfileValue
          icon={icons.company_team}
          value="Add Company Team"
          image={icons.right_arr}
          onPress={() => navigation.navigate('CompanyTeam')}
        />
        <LineDivider />
        <ProfileValue
          icon={icons.stock_management}
          value="Stock Management"
          image={icons.down_arro}
          onPress={toggleExpanded}
        />
        <Collapsible collapsed={collapsed} duration={300}>
          <View style={{marginLeft: SIZES.padding * 1.8}}>
            <ProfileValue
              icon={icons.itemss}
              value="Items"
              image={icons.right_arr}
              onPress={() => navigation.navigate('Items')}
            />
            <LineDivider />
            <ProfileValue
              icon={icons.units}
              value="Unit"
              image={icons.right_arr}
              onPress={() => navigation.navigate('Unit')}
            />
            <LineDivider />
            <ProfileValue
              icon={icons.manage_stock}
              value="Manage Stock"
              image={icons.right_arr}
              onPress={() => navigation.navigate('ManageStock')}
            />
          </View>
        </Collapsible>
        <LineDivider />
        <Collapsible collapsed={collapsed} duration={300}>
          <View style={{marginLeft: SIZES.padding * 1.8}}>
            <ProfileValue
              icon={icons.itemss}
              value="Checklist"
              image={icons.right_arr}
              onPress={() => navigation.navigate('CheckList')}
            />
            <LineDivider />
            <ProfileValue
              icon={icons.units}
              value="Optiontype"
              image={icons.right_arr}
              onPress={() => navigation.navigate('Optiontype')}
            />
             <LineDivider />
            <ProfileValue
              icon={icons.units}
              value="ToolsAndMachinery1"
              image={icons.right_arr}
              onPress={() => navigation.navigate('ToolsAndMachinery1')}
            />
          </View>
        </Collapsible>
        <LineDivider />
        <ProfileValue
          icon={icons.supplier}
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
        <ProfileValue icon={icons.logout} value="LogOut" onPress={logout} />
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

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {SIZES, COLORS, FONTS, icons, images} from '../../../constants';
import {
  ProfileValue,
  LineDivider,
  LogoutConfirmation,
} from '../../../Components';
import {useSelector, useDispatch} from 'react-redux';
import {companyLogout} from '../../../services/companyAuthApi';
import {userLogout} from '../../../services/userAuthApi';
import {
  postCompanyLogout,
  postUserLogout,
} from '../../../controller/LogoutController';

const Account = () => {
  const companyDetail = useSelector(state => state.company);
  const userData = useSelector(state => state.user);

  var companyData;
  if (companyDetail._id) {
    companyData = companyDetail;
  } else {
    companyData = userData;
  }

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = React.useState(true);
  const [reportCollapsed, setReportCollapsed] = React.useState(true);

  // logout confirmation
  const [LogoutConfirm, setLogoutConfirm] = React.useState(false);

  //
  const LogoutCompany = async () => {
    const formData = {
      refresh_token: companyData.refresh_token,
    };
    const res = await postCompanyLogout(formData);
    if (res.status == 200) {
      setLogoutConfirm(false);
      dispatch(companyLogout());
      navigation.navigate('Login');
    }
  };

  const LogoutUser = async () => {
    const formData = {
      user_id: companyData.user_id,
      refresh_token: companyData.refresh_token,
    };
    const res = await postUserLogout(formData);
    if (res.status == 200) {
      setLogoutConfirm(false);
      dispatch(userLogout());
      navigation.navigate('Login');
    }
  };

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const toggleReport = () => {
    setReportCollapsed(!reportCollapsed);
  };

  function renderProfileCard() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          padding: 15,
          borderRadius: SIZES.base,
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
                marginBottom: -10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: COLORS.success_300,
              }}>
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
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
            {companyData.name}
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
          icon={icons.project_cate_type}
          value="Project Categories & Types"
          image={icons.right_arrow}
          onPress={() => navigation.navigate('CategoryandType')}
        />
        <LineDivider />
        <ProfileValue
          icon={icons.user_role}
          value="Create User Role"
          image={icons.right_arrow}
          onPress={() => navigation.navigate('UserRole')}
        />
        <LineDivider />
        <ProfileValue
          icon={icons.company_team}
          value="Company Team"
          image={icons.right_arrow}
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
          <View style={{marginLeft: SIZES.padding * 1.5}}>
            <ProfileValue
              icon={icons.itemss}
              value="Items"
              image={icons.right_arrow}
              onPress={() => navigation.navigate('Items')}
            />
            {/* <LineDivider /> */}
            {/* <ProfileValue
              icon={icons.units}
              value="Unit"
              image={icons.right_arr}
              onPress={() => navigation.navigate('Unit')}
            /> */}
            <LineDivider />
            <ProfileValue
              icon={icons.manage_stock}
              value="Manage Stock"
              image={icons.right_arrow}
              onPress={() => navigation.navigate('ManageStock')}
            />
            {/* <LineDivider /> */}
            {/* <ProfileValue
              icon={icons.units}
              value="Option Type"
              image={icons.right_arrow}
              onPress={() => navigation.navigate('Optiontype')}
            /> */}
            {/* <LineDivider />
            <ProfileValue
              icon={icons.units}
              value="Tools & Machinery"
              image={icons.right_arrow}
              onPress={() => navigation.navigate('ToolsAndMachinery1')}
            /> */}
          </View>
        </Collapsible>
        <LineDivider />
        <ProfileValue
          icon={icons.supplier}
          value="Suppliers"
          image={icons.right_arrow}
          onPress={() => navigation.navigate('Suppliers')}
        />
        <LineDivider />
        {/*<ProfileValue
          icon={icons.report}
          value="Report"
          image={icons.down_arro}
          onPress={toggleReport}
        />
         <Collapsible collapsed={reportCollapsed} duration={300}>
          <View style={{marginLeft: SIZES.padding * 1.5}}>
            <ProfileValue
              icon={icons.itemss}
              value="BOQ View/Edit"
              image={icons.right_arr}
              onPress={() => navigation.navigate('BoqViewAndEdit')}
            />
          </View>
        </Collapsible>
        <ProfileValue
          icon={icons.itemss}
          value="Checklist"
          image={icons.right_arrow}
          onPress={() => navigation.navigate('CheckList')}
        /> */}
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
          onPress={() => setLogoutConfirm(true)}
        />
      </View>
    );
  }

  function renderVersionDetails() {
    return (
      <View style={{marginTop: 30, alignItems: 'center'}}>
        <Text style={{fontSize: 25, color: COLORS.darkGray}}>
          Powered by Intenics
        </Text>
        <Text style={{fontSize: 12, color: COLORS.darkGray2}}>
          Version - 1.0.0
        </Text>
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
          paddingHorizontal: SIZES.radius,
          paddingBottom: 50,
        }}>
        {renderProfileCard()}
        {renderProfileSection1()}
        {renderProfileSection2()}
        {renderVersionDetails()}
      </ScrollView>
      <LogoutConfirmation
        isVisible={LogoutConfirm}
        onClose={() => setLogoutConfirm(false)}
        onClickLogout={() => {
          companyData.user_id ? LogoutUser() : LogoutCompany();
        }}
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
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.radius,
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

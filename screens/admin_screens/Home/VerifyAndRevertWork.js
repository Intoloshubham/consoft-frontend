import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {getVerifyAndRevertWorks} from '../../../controller/AssignWorkController';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import VerifyWorks from '../VerifyAndRevertWork.js/VerifyWorks';
import RevertWorks from '../VerifyAndRevertWork.js/RevertWorks';

const Tab = createMaterialTopTabNavigator();

const VerifyAndRevertWork = ({company_id}) => {
  const [verifyAndRevert, setVerifyAndRevert] = React.useState([]);
  const [verify, setVerify] = React.useState([]);
  const [revert, setRevert] = React.useState([]);

  // ============================== Apis ==============================
  const fetchVerifyAndRevertWork = async () => {
    const response = await getVerifyAndRevertWorks(company_id);
    setVerifyAndRevert(response.data);

    //filter revert & verify
    const verify_data = response.data.filter(el => el.verify === true);
    setVerify(verify_data);
    const revert_data = response.data.filter(el => el.revert_status === true);
    setRevert(revert_data);
  };

  // const filterData = () => {
  //   const verify_data = verifyAndRevert.filter(el => el.verify === true);
  //   setVerify(verify_data);
  //   const revert_data = verifyAndRevert.filter(el => el.revert_status === true);
  //   console.log(revert_data);
  //   setRevert(revert_data);
  // };

  // React.useEffect(() => {
  //   fetchVerifyAndRevertWork();
  // }, []);

  React.useMemo(() => {
    fetchVerifyAndRevertWork();
  }, []);

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
      <Tab.Navigator style={{height: 350}} initialRouteName="Verify">
        <Tab.Screen
          name="Verify"
          children={() => <VerifyWorks VerifyData={verify} />}
        />
        <Tab.Screen
          name="Revert"
          children={() => <RevertWorks RevertData={revert} />}
        />
      </Tab.Navigator>
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

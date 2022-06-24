import React from 'react';
import {View} from 'react-native';
import {HeaderBar, TextButton} from '../../Components';
import {COLORS, SIZES} from '../../constants';

const CompanyPayment = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <HeaderBar right={true} title="Payment" />
      <View
        style={{
          marginHorizontal: SIZES.padding,
        }}>
        <TextButton
          buttonContainerStyle={{
            height: 45,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.base,
          }}
          label="Navigate to Product key Screen"
          onPress={() => navigation.navigate('VerifyProductKey')}
        />
      </View>
    </View>
  );
};

export default CompanyPayment;

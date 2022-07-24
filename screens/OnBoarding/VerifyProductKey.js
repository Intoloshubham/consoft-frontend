import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import AuthLayout from '../Authentication/AuthLayout';
import utils from '../../utils';
import Config from '../../config';
import {FormInput, TextButton, HeaderBar} from '../../Components';
import {COLORS, images, SIZES, icons} from '../../constants';

import { useSelector, useDispatch } from 'react-redux';
import { verifyProductKey } from '../../services/companyAuthApi';

const VerifyProductKey = ({navigation}) => {

  const dispatch = useDispatch()
  const companyData = useSelector(state => state.company);
  // console.log(companyData)

  const [productKey, setProductKey] = React.useState('');
  const [productKeyError, setProductKeyError] = React.useState('');

  const OnSubmit = async () => {
    const productData = {
      company_id: companyData._id,
      product_key: productKey,
    };

    const result = await dispatch(verifyProductKey(productData));

    if (result.payload.status === 200) {
      navigation.navigate('Home');
    }else{
      alert(result.payload.message);
    }

    // console.log(res);
    // console.log(result.error);
    // console.log(result);
    // let result;
    // if (res.data) {
    //   result = res.data;
    // }
    // if (res.error) {
    //   result = res.error;
    // }

    // if (result.status === 200) {
    //   await storeToken(result.access_token);   
    //   navigation.navigate('Home');
    // }

    // if(result.status === 406){
    //   alert(result.data.message);
    // }

  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <HeaderBar right={true} title="Verify Product Key" />
      <AuthLayout
        title="Verify Your Product Key"
        subtitle="Product key has been sent to your email"
        image={images.product_key}>
        <View
          style={{
            marginTop: SIZES.padding * 2,
            marginHorizontal: SIZES.padding,
          }}>
          <FormInput
            // label="Email"
            placeholder="Product key"
            keyboardType="email-address"
            autoCompleteType="email"
            onChange={value => {
              utils.validateText(value, setProductKeyError);
              setProductKey(value);
            }}
            errorMsg={productKeyError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    productKey == '' ||
                    (productKey != '' && productKeyError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      productKey == ''
                        ? COLORS.gray
                        : productKey != '' && productKeyError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          <TextButton
            label="Submit & Continue"
            buttonContainerStyle={{
              height: 45,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.base,
            }}
            onPress={OnSubmit}
          />
        </View>
      </AuthLayout>
    </View>
  );
};

export default VerifyProductKey;

import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import AuthLayout from '../Authentication/AuthLayout';
import utils from '../../utils';
import Config from '../../config';
import {FormInput, TextButton, HeaderBar} from '../../Components';
import {COLORS, images, SIZES, icons} from '../../constants';

//redux
import { getCompanyId, storeToken } from '../../services/asyncStorageService';
import { useVerifyProductKeyMutation } from '../../services/companyAuthApi';

const VerifyProductKey = ({navigation}) => {
  const [productKey, setProductKey] = React.useState('');
  const [productKeyError, setProductKeyError] = React.useState('');

  //redux
  const [companyIdAsync, setCompanyIdAsync ] = React.useState();
  const [ verifyProductKey ] = useVerifyProductKeyMutation();

  useEffect(() => {
    (async () => {
      const company_id = await getCompanyId() 
      setCompanyIdAsync(company_id)          
      
    })();
  })


  const OnSubmit = async () => {
    const productdata = {
      product_key: productKey,
      company_id: companyIdAsync,
    };
    const res = await verifyProductKey(productdata);

    // console.log(res);
    // console.log(result.error);
    // console.log(result);
    let result;
    if (res.data) {
      result = res.data;
    }
    if (res.error) {
      result = res.error;
    }

    if (result.status === 200) {
      await storeToken(result.access_token);   
      navigation.navigate('Home');
    }

    if(result.status === 406){
      alert(result.data.message);
    }



    // {result.data.status === 200 ? navigation.navigate('Home') : result.error.data.message }


    // fetch(`${Config.API_URL}/verify-product-key`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(productdata),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data.status);
    //     if (data.status == 200) {
    //       navigation.navigate('Home');
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
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

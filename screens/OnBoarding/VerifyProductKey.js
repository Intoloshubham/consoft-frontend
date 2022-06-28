import React from 'react';
import {View, Image} from 'react-native';
import AuthLayout from '../Authentication/AuthLayout';
import utils from '../../utils';
import Config from '../../config';
import {FormInput, TextButton, HeaderBar} from '../../Components';
import {COLORS, images, SIZES, icons} from '../../constants';

const VerifyProductKey = ({navigation, route}) => {
  const {company_id} = route.params;
  const [productKey, setProductKey] = React.useState('');
  const [productKeyError, setProductKeyError] = React.useState('');

  const OnSubmit = () => {
    const productdata = {
      product_key: productKey,
      company_id: company_id,
    };
    fetch(`${Config.API_URL}verify-product-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productdata),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.status);
        if (data.status == 200) {
          navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
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

import React from 'react';
import {View, Image} from 'react-native';
import AuthLayout from '../Authentication/AuthLayout';
import utils from '../../utils';
import {FormInput, TextButton, HeaderBar, CustomToast} from '../../Components';
import {COLORS, images, SIZES, icons} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import {verifyProductKey} from '../../services/companyAuthApi';

const VerifyProductKey = ({navigation}) => {
  const dispatch = useDispatch();
  const companyData = useSelector(state => state.company);
  const [productKey, setProductKey] = React.useState('');
  const [productKeyError, setProductKeyError] = React.useState('');

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);

  const OnSubmit = async () => {
    const productData = {
      company_id: companyData._id,
      product_key: productKey,
    };
    const result = await dispatch(verifyProductKey(productData));
    if (result.payload.status === 200) {
      setSubmitToast(true);
      navigation.navigate('Home');
      setProductKey('');
    } else {
      alert(result.payload.message);
    }
    setTimeout(() => {
      setSubmitToast(false);
    }, 1500);
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
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={COLORS.green}
        title="Success"
        message="Verification Successful..."
      />
    </View>
  );
};

export default VerifyProductKey;

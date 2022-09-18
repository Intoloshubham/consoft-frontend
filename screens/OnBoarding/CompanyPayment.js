import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {HeaderBar, TextButton, CustomToast} from '../../Components';
import {COLORS, SIZES, FONTS, icons, images} from '../../constants';
import {payment} from '../../controller/PaymentController';
import {useSelector} from 'react-redux';

const CompanyPayment = ({navigation, route}) => {
  const {company_id} = route.params;

  const companyDetail = useSelector(state => state.company);

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);
  const [amount, setAmount] = React.useState('150000');

  const onPaymentSubmit = async () => {
    const formData = {
      payment: amount,
      company_id: companyDetail._id,
    };
    const response = await payment(formData);
    if (response.status === 200) {
      setSubmitToast(true);
      navigation.navigate('Login');
      setAmount('');
    } else {
      alert(response.message);
    }
    setTimeout(() => {
      setSubmitToast(false);
    }, 2000);
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <HeaderBar right={true} title="Payment" />
      <View style={{marginHorizontal: 20}}>
        <ImageBackground
          source={images.home_banner}
          style={{padding: 30, alignItems: 'center'}}>
          <Text style={{color: 'white', ...FONTS.h3}}>Total amount</Text>
          <Text
            style={{
              ...FONTS.h2,
              color: 'white',
              fontWeight: 'bold',
            }}>
            Rs. 150,000
          </Text>
        </ImageBackground>

        <TextButton
          label="Save & Continue"
          buttonContainerStyle={{
            height: 45,
            alignItems: 'center',
            marginTop: SIZES.padding * 2,
            borderRadius: SIZES.base,
          }}
          onPress={() => onPaymentSubmit()}
        />
      </View>
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={COLORS.green}
        title="Payment"
        message="Payment complete"
      />
    </View>
  );
};

export default CompanyPayment;

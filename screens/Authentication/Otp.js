import React from 'react';
import {View, Text} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AuthLayout from './AuthLayout';
import {TextButton} from '../../Components';
import {FONTS, SIZES, COLORS, icons, images} from '../../constants';

const Otp = ({navigation}) => {
  const [timer, setTimer] = React.useState(60);
  React.useEffect(() => {
    let intervel = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(intervel);
  }, []);
  return (
    <AuthLayout
      title="OTP Authentication"
      subtitle="An authentication code has been sent to demo@gmail.com"
      titleContainerStyle={{
        marginTop: SIZES.padding * 2,
      }}>
      {/* otp input  */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}>
        <OTPInputView
          pinCount={6}
          style={{
            width: '100%',
            height: 50,
          }}
          codeInputFieldStyle={{
            width: 50,
            height: 50,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray1,
            color: COLORS.black,
            ...FONTS.h3,
          }}
          onCodeFilled={code => {
            console.log(code);
          }}
        />
        {/* countdown timer  */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: SIZES.padding,
          }}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}>
            Didn't receive code?
          </Text>
          <TextButton
            label={`Resend (${timer}s)`}
            disabled={timer == 0 ? false : true}
            buttonContainerStyle={{
              marginLeft: SIZES.base,
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
              fontWeight: 'bold',
            }}
            onPress={() => setTimer(60)}
          />
        </View>
      </View>
      {/* footer  */}
      <View
        style={{
          marginTop: SIZES.padding * 8.6,
        }}>
        <TextButton
          label="Continue"
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightblue_700,
          }}
          onPress={() => navigation.replace('Home')}
        />
        <View
          style={{
            marginTop: SIZES.padding,
            alignItems: 'center',
            // marginBottom: SIZES.padding*2,
          }}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}>
            By signing up, you agree to our
          </Text>
          <TextButton
            label="Terms & Conditions"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.body3,
            }}
            onPress={() => console.log('terms and conditions')}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default Otp;

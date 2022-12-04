import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS, SIZES, images, FONTS} from '../../../constants';
import {send_otp_verification} from '../UserReports/ReportApi.js';
import {useSelector} from 'react-redux';
import {CustomToast} from '../../../Components';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [Otp, setOtp] = useState('');
  const [verifyStatus, setverifyStatus] = useState(false);

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const userData = useSelector(state => state.user);

  const sendVerificationCode = async () => {
    const body = {
      email: email,
    };
    const temp = await send_otp_verification(body);

    const resp = await temp.json();

    if (resp.success) {
      setSubmitToast(true);
      setverifyStatus(true);
      setEmail('');
      setTimeout(() => {
        setSubmitToast(false);
      }, 2000);
    }
  };

const verifyOtp = async ()=>{
  console.log('email--',email)
const body={    
    email:email,
    otp:Otp  

};
// const temp=await verify_password_otp();

};



  return (
    <LinearGradient
      colors={[COLORS.lightblue_50, COLORS.green_200]}
      style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          backgroundColor: COLORS.lightblue_500,
          padding: SIZES.base * 0.25,
        }}></View>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View
              style={[
                {
                  marginTop: SIZES.height * 0.18,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 30,
                },
                styles.shadow,
              ]}>
              <Image
                source={images.mail_image}
                resizeMode="contain"
                style={{
                  width: 230,
                }}
              />
            </View>
            <View style={{justifyContent: 'space-around'}}>
              <View>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.black,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Verification code on your email
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.darkGray,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                  }}>
                  We will send Verification code on {'\n'} your email id
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              {verifyStatus ? (
                <TextInput
                  style={{
                    color: COLORS.black,
                    borderBottomWidth: 1,
                    width: '95%',
                    borderBottomColor: COLORS.lightblue_300,
                  }}
                  value={Otp}
                  placeholder={'Enter Otp'}
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={text => {
                    setOtp(text);
                  }}
                  multiline={true}
                  numberOfLines={2}
                />
              ) : (
                <TextInput
                  style={{
                    color: COLORS.black,
                    borderBottomWidth: 1,
                    width: '95%',
                    borderBottomColor: COLORS.lightblue_300,
                  }}
                  value={email}
                  placeholder={'Enter your registered email id'}
                  placeholderTextColor={COLORS.darkGray}
                  onChangeText={text => {
                    setEmail(text);
                  }}
                  // value={value}
                  multiline={true}
                  numberOfLines={2}
                />
              )}
            </View>
            <View style={{alignItems: 'center', marginBottom: SIZES.base}}>
              {verifyStatus ? (
                <TouchableOpacity
                  style={{
                    borderRadius: SIZES.base * 0.5,
                    width: '95%',
                    borderColor: COLORS.transparentBlack2,
                    backgroundColor: COLORS.lightblue_500,
                    borderWidth: 1,
                    padding: SIZES.base,
                  }}
                  onPress={verifyOtp}>
                  <Text style={{color: COLORS.white, textAlign: 'center'}}>
                    Verfiy Send Otp
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    borderRadius: SIZES.base * 0.5,
                    width: '95%',
                    borderColor: COLORS.transparentBlack2,
                    backgroundColor: COLORS.lightblue_500,
                    borderWidth: 1,
                    padding: SIZES.base,
                  }}
                  onPress={sendVerificationCode}>
                  <Text style={{color: COLORS.white, textAlign: 'center'}}>
                    Send verification code
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={COLORS.lightblue_400}
        title="Submit"
        message="Otp has been sent to your email........."
      />
    </LinearGradient>
  );
};

export default ForgetPassword;

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

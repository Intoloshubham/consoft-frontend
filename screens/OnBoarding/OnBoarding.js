import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {FONTS, COLORS, SIZES, icons, images, constants} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {FormInput, TextButton} from '../../Components';
import {useNavigation} from '@react-navigation/native';

const btn = [
  {id: 1, btnName: 'User Login', uName: 'User Login'},
  {id: 2, btnName: 'Company Login', uName: 'Company Login'},
];

const OnBoarding = () => {
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mobileNoError, setMobileNoError] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  function isEnableSignIn() {
    return mobileNo != '' && mobileNoError == '';
  }

  function renderHeaderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.consoft_PNG}
          resizeMode="contain"
          style={{
            // width: SIZES.width * 0.5,
            height: 100,
          }}
        />
      </View>
    );
  }
  function renderHeaderImage() {
    return (
      <View
        style={{
          marginTop: SIZES.base,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.build_f}
          resizeMode="contain"
          style={{
            width: '40%',
          }}
        />
      </View>
    );
  }
  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 2,
          marginHorizontal: SIZES.radius * 3,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.black,
            }}>
            User Login
          </Text>
        </View>
        <View>
          <FormInput
            placeholder="Mobile No."
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChange={value => {
              //validate email
              utils.validateNumber(value, setMobileNoError);
              setMobileNo(value);
            }}
            errorMsg={mobileNoError}
            appendComponent={
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={
                    mobileNo == '' || (mobileNo != '' && mobileNoError == '')
                      ? icons.correct
                      : icons.cancel
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor:
                      mobileNo == ''
                        ? COLORS.gray
                        : mobileNo != '' && mobileNoError == ''
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          <FormInput
            placeholder="Password"
            secureTextEntry={!showPass}
            keyboardType="default"
            autoCompleteType="password"
            // containerStyle={{marginTop: SIZES.base}}
            onChange={value => setPassword(value)}
            appendComponent={
              <TouchableOpacity
                style={{
                  width: 40,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
                onPress={() => setShowPass(!showPass)}>
                <Image
                  source={showPass ? icons.eye_close : icons.eye}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.gray,
                  }}
                />
              </TouchableOpacity>
            }
          />
          <TextButton
            label="Sign In"
            // disabled={isEnableSignIn() ? false : true}
            buttonContainerStyle={{
              height: 55,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.base,
              // backgroundColor: isEnableSignIn()
              //   ? COLORS.lightblue_900
              //   : COLORS.transparentPrimary,
            }}
            // onPress={onSubmit}
          />
        </View>
      </View>
    );
  }
  function renderButton() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            // flexDirection: 'row',
            paddingHorizontal: SIZES.padding * 2,
          }}
          onPress={() => {
            item.id == 1 ? navigation.navigate('SignIn') : null;
          }}>
          <View
            style={{
              marginTop: SIZES.base,
              backgroundColor: COLORS.green,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: SIZES.base,
              borderRadius: SIZES.base,
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {item.btnName}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    const renderFooterComp = () => <View>{renderForm()}</View>;
    const renderFooter1Comp = () => {
      return (
        <View>
          <Text>Second</Text>
        </View>
      );
    };
    return (
      <View
        style={{
          marginTop: SIZES.padding * 2,
          // marginHorizontal: SIZES.padding * 2,
        }}>
        <FlatList
          data={btn}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          ListFooterComponent={renderFooterComp}
        />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient
        colors={[COLORS.lightblue_50, COLORS.lightblue_300]}
        style={{flex: 1}}>
        <ScrollView>
          {renderHeaderLogo()}
          {renderHeaderImage()}
          {renderButton()}
          {/* {renderForm()} */}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default OnBoarding;

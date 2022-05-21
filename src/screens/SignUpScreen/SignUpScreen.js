import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'

import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import axios from 'axios';

const EMAIL_REGEX =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const SignUpScreen = () => {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const {control, handleSubmit, watch} = useForm();
    const pwd = watch('password');

    const navigation = useNavigation();

    const onRegisterPressed = (data) => {
        //validate user
        // navigation.navigate('Home');
        axios.post('http://localhost:8000/api/register', data)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        // console.log(data);
    };
    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };
    
    const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
    };

    const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
    };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="name"
          control={control}
          placeholder="Username"
          rules={{required:'Username is required',
          minLength:{
            value:3,
            message:'Username should be minimum 3 chareacters long',
          },
          maxLength:{
            value:12,
            message:'Username should be minimum 12 chareacters long',
          }
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{required:'Email is required', pattern: {value: EMAIL_REGEX, message:'Email is invalid'}}}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{required:'Password is required',
          minLength:{
            value:8,
            message:'Password should be minimum 8 chareacters long',
          },
          maxLength:{
            value:10,
            message:'Password should be minimum 10 chareacters long',
          }
          }}
        />
        <CustomInput
          name="repeat_password"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{validate: value => value === pwd || 'Password do not match', }}
        />

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed) }
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    root:{
        alignItems:'center',
        padding:20,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    }
});

export default SignUpScreen
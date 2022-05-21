import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView,TextInput, Alert } from 'react-native';
import Logo from '../../../assets/images/enterprise.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useForm, Controller} from 'react-hook-form';

const SignInScreen = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const {control, handleSubmit, formState:{errors},} = useForm();
    // console.log(errors);
    const onSignInPressed = (data) => {
        //validate user
        console.log(data);
        navigation.navigate('Home');
    };
    const onForgotPasswordPressed = () => {
        // navigation.navigate('Home');
    };
    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                source={Logo}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode="contain"
                />

                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{required:'Username is required'}}
                />

                <CustomInput
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    control={control}
                    rules={{required:'Password is required',
                    minLength:{
                        value:3,
                        message:'Password should be minimum 3 chareacters long',
                    }
                    }}
                />

                <CustomButton
                text='SignIn'
                onPress={handleSubmit(onSignInPressed)}
                />

                <CustomButton
                text="Forgot password?"
                onPress={onForgotPasswordPressed}
                type="TERTIARY"
                />

                {/* <SocialSignInButtons /> */}

                <CustomButton
                text="Don't have an account? Create one"
                onPress={onSignUpPress}
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
    logo:{
        width:'70%',
        maxWidth:300,
        maxHeight:200,
    }
});

export default SignInScreen
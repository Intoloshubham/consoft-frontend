import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {FONTS, icons, SIZES, COLORS} from '../../../constants';
import {getToken, getUserId} from '../../../services/asyncStorageService';
import {useGetLoggedUserQuery} from '../../../services/userAuthApi';
import {setUserInfo} from '../../../features/UserSlice';
import {setUserToken} from '../../../features/UserAuthSlice';
import {useDispatch, useSelector} from 'react-redux';

// saurabh
import UserAssignWorks from './UserAssignWorks';

const UserDashboard = () => {
  const [userId, setUserId] = useState('');
  
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    (async () => {
      const token = await getToken();
      setAccessToken(token);
      dispatch(setUserToken({token: token}));
    })();
  },[]);
  
  // console.log(accessToken);
  
  
  const {data, isSuccess} = useGetLoggedUserQuery(accessToken);
  const dispatch = useDispatch();
console.log(data)
  //store data in redux store
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUserInfo({
          _id: data._id,
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          role: data.role,
          role_id: data.role_id,
        }),
      );
    }
  });

  const userData = useSelector(state => state.user);
  console.log(userData)



  // const Get_token_Data = async () => {
  //   const tokens = await getToken();
  //   const userId = await getUserId();
  //   setUserId(userId);
  //   setAccessToken(tokens);
  //   dispatch(setUserToken({token: tokens}));
  // };

  

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(
  //       setUserInfo({
  //         _id: data._id,
  //         name: data.name,
  //         email: data.email,
  //         mobile: data.mobile,
  //         role: data.role,
  //         role_id: data.role_id,
  //       }),
  //     );
  //   }
  // }, []);

  return (
    <View>
      <UserAssignWorks user_id={userId} />
      
    </View>
  );
};

export default UserDashboard;

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
  
<<<<<<< HEAD
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
=======
  // React.useEffect(() => {
  //   Get_token_Data()
  // }, [])


  const Get_token_Data =async () => {
    const tokens = await getToken();
    const userId = await getUserId();
    setUserId(userId);   
    setAccessToken(tokens)
    dispatch(setUserToken({ token: tokens })) 
  }


  //setting token
  React.useMemo(() => {
    (async () => await Get_token_Data())();
  }, [])

  const [taskModal, settaskModal] = useState(false)
  const [inProgressModal, setinProgressModal] = useState(false)
  const [doneModal, setdoneModal] = useState(false)
  const [taskModalnum, settaskModalNum] = useState(false)
  const [inProgressModalnum, setinProgressModalNum] = useState(false)
  const [doneModalnum, setdoneModalNum] = useState(false)

  const handleTask = async () => {
    const new_task=await fetch(`${Config.API_URL}user-assign-works/${userId}`)
    const res=await new_task.json(new_task)

    setNewTaskRes(res)
    settaskModalNum(true);
    settaskModal(true);
  }
  const handleInProgressTask = () => {
    setinProgressModalNum(true)
    setinProgressModal(true);
  }
  const handleDoneTask = () => {
    setdoneModalNum(true);
    setdoneModal(true);
  }
  const { data, isSuccess } = useGetLoggedUserQuery(accessToken)
  

>>>>>>> f73e7b96e24bfcbc22b30c6e4b706ac876ceec64
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

<<<<<<< HEAD
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
=======
  // const userData = useSelector(state => state.user);
  // const userToken = useSelector(state => state.userAuth);
  // console.log(userData);
  // console.log(userToken);
>>>>>>> f73e7b96e24bfcbc22b30c6e4b706ac876ceec64

  return (
    <View>
      <UserAssignWorks user_id={userId} />
      
    </View>
  );
};

export default UserDashboard;

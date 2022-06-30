import { View, Text, StyleSheet, Image, ScrollView, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FONTS, icons, SIZES, COLORS } from '../../../constants'
import LinearGradient from 'react-native-linear-gradient'
import { dummyData } from '../../../constants'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Todo, InProgressModal, DoneModal } from '../TaskModal'
import styles from './css/UserDashboardStyle'
import Reports from '../UserReports/UserReports'

//redux
import { getToken } from '../../../services/asyncStorageService';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
import { setUserInfo } from '../../../features/UserSlice';
import { setUserToken } from '../../../features/UserAuthSlice';
import { useDispatch, useSelector } from 'react-redux';


const UserDashboard = ({navigation}) => {

  const [accessToken, setAccessToken] = useState('');

  const [taskModal, settaskModal] = useState(false)
  const [inProgressModal, setinProgressModal] = useState(false)
  const [doneModal, setdoneModal] = useState(false)
  const [taskModalnum, settaskModalNum] = useState(false)
  const [inProgressModalnum, setinProgressModalNum] = useState(false)
  const [doneModalnum, setdoneModalNum] = useState(false)

  const handleTask = () => {
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

  const dispatch = useDispatch()
  useEffect( () => {
    (async() => {
        const token = await getToken();
        setAccessToken(token)
        dispatch(setUserToken({ token:token }))
      })();
    },[accessToken])

  const { data, isSuccess } = useGetLoggedUserQuery(accessToken)

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ _id:data._id, name:data.name, email: data.email, mobile: data.mobile, role: data.role, role_id: data.role_id  }))
    }
  },[])

  const userData = useSelector(state => state.user);
  const userToken = useSelector(state => state.userAuth);
  // console.log(userToken);

  return (
    <>
      {/* <LinearGradient colors={[COLORS.lightGray2, COLORS.lightGray2, COLORS.lightGray2]} style={styles.container}> */}

        <View style={styles.tasks}>
          {/* <Text>{accessToken}</Text> */}
          <TouchableOpacity style={styles.Intask} onPress={() => handleTask()}>
            <View>
              <Image

                style={styles.icon1}
                source={icons.todo}
              />
            </View>
            <View style={{ justifyContent: 'space-between' }}>
              <Text style={[styles.num_task, { left: -22 }]}>New Task</Text>
            </View>
            <View style={{ alignContent: "space-between" }}>
              <Text style={[styles.tag, { color: "red" }]} >5</Text>
            </View>
          </TouchableOpacity>
          {taskModalnum ? (<Todo taskModal={taskModal} settaskModal={settaskModal} />) : null}

          <TouchableOpacity style={styles.Intask} onPress={() => handleInProgressTask()}>
            <View>
              <Image
                style={styles.icon1}
                source={icons.inprogress}
              />
            </View>
            <View>
              <Text style={styles.num_task}>Task In Progress</Text>
            </View>
            <View>
              <Text style={[styles.tag, { color: "blue" }]}>2</Text>
            </View>
          </TouchableOpacity>
          {inProgressModalnum ? (<InProgressModal inProgressModal={inProgressModal} setinProgressModal={setinProgressModal} />) : null}
          <TouchableOpacity style={styles.Intask} onPress={() => handleDoneTask()}>
            <View>
              <Image
                style={styles.icon1}
                source={icons.done}
              />
            </View>
            <View>
              <Text style={[styles.num_task, { left: -22 }]}>  Completed </Text>
            </View>
            <View style={{ justifyContent: "space-between" }}>
              <Text style={[styles.tag, { color: "green" }]}>3</Text>
            </View>
          </TouchableOpacity>
          {doneModalnum ? (<DoneModal doneModal={doneModal} setdoneModal={setdoneModal} />) : null}
        </View>
        <View style={styles.report_section_title}>
          <Text style={styles.avai_text}>Reports</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.create_new_report_btn}
            onPress={() => { 
              navigation.navigate('Reports');
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Create New Report</Text>
          </TouchableOpacity>
        </View>
      {/* </LinearGradient> */}

    </>
  )
}


export default UserDashboard

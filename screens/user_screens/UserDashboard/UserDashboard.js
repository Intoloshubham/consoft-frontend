import React, { useState, useEffect, useRef,useMemo } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, LayoutAnimation, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'
import { FONTS, icons, SIZES, COLORS } from '../../../constants'
import { Todo, InProgressModal, DoneModal } from '../TaskModal'
import styles from './css/UserDashboardStyle'
import Config from '../../../config'

//redux
import { getToken, getUserId } from '../../../services/asyncStorageService';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
import { setUserInfo } from '../../../features/UserSlice';
import { setUserToken } from '../../../features/UserAuthSlice';
import { useDispatch, useSelector } from 'react-redux';


 
const UserDashboard =({ navigation }) => {


  //modal states
  const [taskModal, settaskModal] = useState(false)
  const [inProgressModal, setinProgressModal] = useState(false)
  const [doneModal, setdoneModal] = useState(false)
  const [taskModalnum, settaskModalNum] = useState(false)
  const [inProgressModalnum, setinProgressModalNum] = useState(false)
  const [doneModalnum, setdoneModalNum] = useState(false)


  //getting login state through params
  // const { name_login_params } = route.params;

  //for saving token
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState(null)
  const [fetchError, setFetchError] = useState(null);
  
  const accessref = useRef('')

  //for getting new task data

  const [newTaskRes, setNewTaskRes] = useState([])


  const dispatch = useDispatch()
  
  const Get_token_Data =async () => {
    const tokens = await getToken();
    const userId = await getUserId();
    // console.log(userId)
    setUserId(userId);
    setAccessToken(tokens)
    dispatch(setUserToken({ token: tokens }))
  }
  //setting token
  React.useEffect(() => {
    (async () => await Get_token_Data())();

  }, [])
  
  const { data, isSuccess } = useGetLoggedUserQuery(accessToken);

  // console.log(data); 




  
  //setting data
  React.useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ _id: data._id, name: data.name, email: data.email, mobile: data.mobile, role: data.role, role_id: data.role_id }))
    }
  }, [])

  // const userData = useSelector(state => state.user);


  const handleTask = async () => {
    const new_task = await fetch(`${Config.API_URL}user-assign-works/${userId}`)
    const res = await new_task.json()
    // console.log(res)
    setNewTaskRes(res);
    settaskModalNum(true);
    settaskModal(true);
  }
  
  // console.log(newTaskRes)
  
  const handleInProgressTask = () => {
    setinProgressModalNum(true)
    setinProgressModal(true);
  }
  const handleDoneTask = () => {
    setdoneModalNum(true);
    setdoneModal(true);
  }
  


  // React.useEffect(() => {

  //   const sendUserId = () => {
  //     fetch(`${Config.API_URL}user-by-projects/${userId}`)
  //       .then((response) => response.json())
  //       .then(data => {
  //         // console.log(data)
  //         setSelectedIdProjects(data);
  //       })
  //   }

  //   // (async () => await sendUserId())();
  //   sendUserId();

  // }, [userId])

  // console.log(selectedIdProjects)  
  // const userData = useSelector(state => state.user);
  // const userToken = useSelector(state => state.userAuth);

  const { data, isSuccess } = useGetLoggedUserQuery(accessToken)

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ _id:data._id, name:data.name, email: data.email, mobile: data.mobile, role: data.role, role_id: data.role_id  }))
    }
  },[isSuccess])

  // console.log(data);

  const userData = useSelector(state => state.user);
  const userToken = useSelector(state => state.userAuth);

  // console.log(userData);

  return (
    <>
      <View style={styles.tasks}>
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
        {taskModalnum ? (<Todo taskModal={taskModal} settaskModal={settaskModal} newTaskRes={newTaskRes} />) : null}

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
            navigation.navigate('Report');
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Create New Report</Text>
        </TouchableOpacity>
      </View>
    </> )
}


export default UserDashboard

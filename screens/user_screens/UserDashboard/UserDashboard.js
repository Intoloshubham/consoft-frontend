import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {FONTS, icons, SIZES, COLORS} from '../../../constants';
import {Todo, InProgressModal, DoneModal} from '../TaskModal';
import styles from './css/UserDashboardStyle';
import Config from '../../../config';
//redux
import {getToken, getUserId} from '../../../services/asyncStorageService';
import {useGetLoggedUserQuery} from '../../../services/userAuthApi';
import {setUserInfo} from '../../../features/UserSlice';
import {setUserToken} from '../../../features/UserAuthSlice';
import {useDispatch, useSelector} from 'react-redux';

const UserDashboard = () => {
  const [accessToken, setAccessToken] = useState('');
  const accessref = useRef('');

  //for getting new task data
  const [NewTaskRes, setNewTaskRes] = useState([]);

  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

  const Get_token_Data = async () => {
    const tokens = await getToken();
    const userId = await getUserId();
    setUserId(userId);
    setAccessToken(tokens);
    dispatch(setUserToken({token: tokens}));
  };

  React.useMemo(() => {
    (async () => await Get_token_Data())();
  }, []);

  const [taskModal, settaskModal] = useState(false);
  const [inProgressModal, setinProgressModal] = useState(false);
  const [doneModal, setdoneModal] = useState(false);
  const [taskModalnum, settaskModalNum] = useState(false);
  const [inProgressModalnum, setinProgressModalNum] = useState(false);
  const [doneModalnum, setdoneModalNum] = useState(false);

  const handleTask = async () => {
    const new_task = await fetch(
      `${Config.API_URL}user-assign-works/` + `${userId}`,
    );
    const res = await new_task.json(new_task);
    setNewTaskRes(res);
    settaskModalNum(true);
    settaskModal(true);
  };
  const handleInProgressTask = () => {
    setinProgressModalNum(true);
    setinProgressModal(true);
  };
  const handleDoneTask = () => {
    setdoneModalNum(true);
    setdoneModal(true);
  };

  const {data, isSuccess} = useGetLoggedUserQuery(accessToken);

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
  }, []);

  const userData = useSelector(state => state.user);
  const userToken = useSelector(state => state.userAuth);

  return (
    <View>
      <Todo user_id={userId} />
      <View style={styles.tasks}>
        <TouchableOpacity style={styles.Intask} onPress={() => handleTask()}>
          <View>
            <Image style={styles.icon1} source={icons.todo} />
          </View>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={[styles.num_task, {left: -22}]}>New Task</Text>
          </View>
          <View style={{alignContent: 'space-between'}}>
            <Text style={[styles.tag, {color: 'red'}]}>5</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Intask}
          onPress={() => handleInProgressTask()}>
          <View>
            <Image style={styles.icon1} source={icons.inprogress} />
          </View>
          <View>
            <Text style={styles.num_task}>Task In Progress</Text>
          </View>
          <View>
            <Text style={[styles.tag, {color: 'blue'}]}>2</Text>
          </View>
        </TouchableOpacity>
        {inProgressModalnum ? (
          <InProgressModal
            inProgressModal={inProgressModal}
            setinProgressModal={setinProgressModal}
          />
        ) : null}
        <TouchableOpacity
          style={styles.Intask}
          onPress={() => handleDoneTask()}>
          <View>
            <Image style={styles.icon1} source={icons.done} />
          </View>
          <View>
            <Text style={[styles.num_task, {left: -22}]}> Completed </Text>
          </View>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={[styles.tag, {color: 'green'}]}>3</Text>
          </View>
        </TouchableOpacity>
        {doneModalnum ? (
          <DoneModal doneModal={doneModal} setdoneModal={setdoneModal} />
        ) : null}
      </View>
    </View>
  );
};

export default UserDashboard;

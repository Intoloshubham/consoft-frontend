import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  View,
  Text, FlatList,
  StyleSheet, Image,
  ScrollView, Modal,
  Pressable, TextInput,
  TouchableOpacity, LogBox
} from 'react-native'
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../constants'
import { FormInput, Drop, IconButton, CustomDropdown, TextButton } from '../../../Components';
import { Divider } from '@ui-kitten/components';
import CheckBox from '@react-native-community/checkbox';

import DropDownPicker from 'react-native-dropdown-picker';
import styles from './ReportStyle.js'
import { EditDeletebuttons, ReportDateTimeHeader, Manpower, Stock, Quantity, Quality, TAndP } from '../index.js'
import { Dropdown } from 'react-native-element-dropdown';
import { Get_Project_Team_Data } from '../UserReports/ReportApi.js'
import { getToken, getUserId } from '../../../services/asyncStorageService';
import Config from '../../../config'
import { useDispatch, useSelector } from 'react-redux';
const UserReports = ({ route }) => {

  LogBox.ignoreLogs(["EventEmitter.removeListener"]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);


  const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view, Project_list_drop } = styles

  //project list setting 
  const [ProList, setProList] = useState([])
  const [proListIsFocus, setProListIsFocus] = useState(false)
  const [projectTeamList, setProjectTeamList] = useState([])

  //Projects in dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  //for saving projects
  const [selectedIdProjects, setSelectedIdProjects] = useState([])


  const [userid, setUserid] = useState(null)
  const userData = useSelector(state => state.user);

  // const Get_UserId_Data = async () => {
  //   const userid = await getUserId();
  //   const new_userid = userid;
  //   setUserid(new_userid);
  // }
  //getting user id state
  // useMemo(() => {
  //   Get_UserId_Data();

  //   // console.log("seconde.....................")

 
  // }, [getUserId])

  useMemo(() => {
    console.log("first...........")
    console.log(userData._id)
    if (userData._id) {
      const sendUserId =async () => {
       let data= await fetch(`${process.env.API_URL}user-by-projects/${userData._id}`)
       console.log(`${process.env.API_URL}user-by-projects/${userData._id}`)
       let resp=await data.json();
       console.log("🚀 ~ file: UserReports.js ~ line 71 ~ sendUserId ~ resp", resp)

          // .then((response) => {
          //   console.log("🚀 ~ file: UserReports.js ~ line 71 ~ .then ~ response", response.json())
          //   response.json()
          // })
          // .then(resp => {
          //   console.log("🚀 ~ file: UserReports.js ~ line 69 ~ all projects ~ data", resp)
          //   // console.log("data........")
          //   // console.log(data)
          //   setSelectedIdProjects(data);
          // })
      }
      sendUserId();
    }
  }, [])
  // console.log("selectedIdProjects..........584")
  // console.log(selectedIdProjects)

  // const prevValue = useridRef.current; 
  //  console.log(prevValue)
  // const Get_userId = () => {
  //   getUserId().then((res) => setUserId(res));
  //   // console.log(userId)
  // }
  // useEffect(() => { 
  //   (async () => {
  //     const userid = await ge tUserId();
  //     setUserId(userid);
  //     console.log(userId)
  //   })();
  // }, []);
  // console.log(userId)



  //getting and setting data in label value pair
  useMemo(() => {
    if (selectedIdProjects) {
      let ProData = selectedIdProjects.map(ele => {
        return { label: ele.project_name, value: ele.project_id };
      })

      setProList(ProData)

    }
  }, [selectedIdProjects])

  // console.log("ProList..........121")
  // console.log(ProList) 
  // console.log(value)

  useMemo(() => {
    if (value) {
      const data = Get_Project_Team_Data(value)
      data.then(res => res.json())
        .then(result => {
          // console.log("result")
          // console.log(result)
          setProjectTeamList(result)
        })
    } else {
      return
    }
  }, [value])
  // console.log(projectTeamList)




  return (
    <View
      source={images.Graph_paper}
      style={{ flex: 1, margin: SIZES.base, position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}
    >
      <Dropdown
        style={[
          Project_list_drop,
          proListIsFocus && {
            borderColor: COLORS.lightblue_600,
          },
        ]}
        placeholderStyle={{ ...FONTS.h3, color: COLORS.black, textTransform: 'capitalize' }
        }
        selectedTextStyle={{ color: COLORS.black, ...FONTS.h4, textTransform: "capitalize", }
        }
        containerStyle={{}}
        inputSearchStyle={{ color: COLORS.darkGray, height: 30, borderRadius: 5, padding: 5, ...FONTS.h4 }}
        iconStyle={{
          height: 28
          // fontSize: 16, 
        }}

        data={ProList}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={'Select Project'}
        searchPlaceholder="Search..."

        value={value}
        onFocus={() =>
          setProListIsFocus(true)
        }
        onBlur={() =>
          setProListIsFocus(false)
        }
        onChange={item => {
          // console.log(item)
          setValue(item.value);
          setProListIsFocus(false);
        }}

      />
      <ScrollView contentContainerStyle={{ height: SIZES.height }} horizontal={false}>
        <View
          style={{
            flex: 1,
            borderColor: COLORS.lightblue_400,
            borderWidth: 1,
            padding: SIZES.base,
            // top: 10  
          }}>
          <ReportDateTimeHeader />
          <Divider style={{ backgroundColor: COLORS.lightGray1, width: SIZES.width * 0.90, marginHorizontal: 2, top: 5 }} />
          {value ? <View >
            <View style={{ marginVertical: 5 }}>
              <Manpower projectTeamList={projectTeamList} ProList={ProList} Main_drp_pro_value={value} />
            </View>
            <View style={{ marginVertical: 5 }}>
              {/* Stock component */}
              <Stock project_id={value} Main_drp_pro_value={value} />
            </View>
            <View style={{ marginVertical: 5 }} Main_drp_pro_value={value}>
              {/* Quantity */}
              <Quantity project_id={value} Main_drp_pro_value={value} />
            </View>
            {/* <View style={{ marginVertical: 5 }}>
              <Quality />
            </View> */}
            <View style={{ marginVertical: 5 }}>
              {/* Quality */}
              <TAndP />
            </View>
          </View> : null}
        </View>
      </ScrollView>
    </View>
  )
}

export default UserReports


import { View, Text, StyleSheet, Image, ScrollView, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FONTS, icons, SIZES } from '../../../constants'
import LinearGradient from 'react-native-linear-gradient'
import { dummyData } from '../../../constants'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Todo, InProgressModal, DoneModal } from '../TaskModal'
import { COLORS } from '../../../constants'


// Icons.loadFont();
// console.log(icons.todo);
// console.log(dummyData.reports);


const Tasks = () => {

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


  return (
    <LinearGradient colors={[COLORS.lightGray2, COLORS.lightGray2, COLORS.lightGray2]} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avai_task}>
          <Text style={styles.avai_text}>Available Tasks</Text>
        </View>
        <View>
          <Image

            style={styles.icon1}
            source={icons.task}
          />
        </View>
      </View>
      <View style={styles.tasks}>
        <TouchableOpacity style={styles.Intask} onPress={() => handleTask()}>
          <Image

            style={styles.icon1}
            source={icons.todo}
          />
          <Text style={styles.num_task}>To do</Text>
        </TouchableOpacity>
        {taskModalnum ? (<Todo taskModal={taskModal} settaskModal={settaskModal} />) : null}

        <View><Text style={styles.tag} >5 tasks </Text></View>
        <TouchableOpacity style={styles.Intask} onPress={() => handleInProgressTask()}>
          <Image
            style={styles.icon1}
            source={icons.inprogress}
          />
          <Text style={styles.num_task}>In Progress</Text>
        </TouchableOpacity>
        {inProgressModalnum ? (<InProgressModal inProgressModal={inProgressModal} setinProgressModal={setinProgressModal} />) : null}
        <Text  style={styles.tag}>2 tasks in Progress</Text>
        <TouchableOpacity style={styles.Intask} onPress={() => handleDoneTask()}>
          <Image
            style={styles.icon1}
            source={icons.done}
          />
          <Text style={styles.num_task}>Done</Text>
        </TouchableOpacity>
        {doneModalnum ? (<DoneModal doneModal={doneModal} setdoneModal={setdoneModal} />) : null}
        <Text style={styles.tag}>3 tasks  Done</Text>
      </View>
      <View style={styles.report_section_title}>
        <Text style={styles.avai_text}>Available Reports</Text>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.report_section}>
          {dummyData.reports.map((item, index) => (
            <TouchableOpacity style={styles.eng} key={index}>
              <Text style={{ textAlign: "center",color:COLORS.black,fontWeight:"bold",letterSpacing:1 }} >{item.name}</Text>
              <View style={styles.circular_progress}>
                <AnimatedCircularProgress
                  padding={2}
                  size={55}
                  width={6}
                  fill={35}
                  tintColor="red"
                  backgroundColor="#3d5875" >
                  {
                    (fill) => (
                      <Text style={{color:COLORS.blue}} >
                        10%
                      </Text>
                    )
                  }
                </AnimatedCircularProgress>
                <Text style={{color:COLORS.blue}}>8 hours </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}


const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  avai_task: {

    margin: 10,
    padding: 4,
    width: 300,
    borderColor: "transparent",
    elevation: 0.1,
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 20,
    backgroundColor: "transparent"
  },
  avai_text: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
    marginTop: 4,
    padding: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    color:COLORS.black

  },
  icon1: {
    width: 30,
    borderRadius: 1,
    borderWidth: 2,
    padding: 5,
    marginLeft: 1,
    height: 30,
    marginTop: 7,
    marginHorizontal: 5
  },
  tasks: {
    // flex:,
    borderColor: "whitesmoke",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#E4E9F2",
    justifyContent: "center",
    elevation: 3
  },
  Intask: {
    backgroundColor: COLORS.gray3,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 7,
    borderRadius: 5,
    elevation: 4
  },
  num_task: {
    fontWeight: "bold",
    alignSelf: "center",
    marginHorizontal: 50,
    fontSize: 15,
    color:COLORS.black
  },
  report_section_title: {
    margin: SIZES.h5,
    padding: 5,
    width: 350,
    marginTop: SIZES.body3,
    marginBottom: -SIZES.h5,
    marginLeft: SIZES.h2,
  },
  report_section: {
    backgroundColor: "#E4E9F2", 
    elevation: 1,
    flexWrap: "wrap",
    margin: 10,
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    borderTopLeftRadius:SIZES.h5,
    borderTopRightRadius:SIZES.h5,
    borderBottomLeftRadius:SIZES.h5,
    padding: SIZES.h5,    
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  eng: {
    width: 150,
    height: 150,
    borderWidth: 1,
    backgroundColor: COLORS.gray3,
    margin: 5,
    marginLeft: 5,
    marginRight: 2,
    borderColor: "whitesmoke",
    padding: 20,
    borderRadius: 15,
  },
  circular_progress: {
    textAlign: "center",
    alignItems: "center",
    marginVertical: 30
  },
  scroll: {
    borderRadius: 15,
    marginTop:10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  tag:{
    ...FONTS.h5,
    fontWeight:"bold",
    color:COLORS.blue
  }

})

export default Tasks

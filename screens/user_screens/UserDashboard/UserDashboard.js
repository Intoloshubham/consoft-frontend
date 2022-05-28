import { View, Text, StyleSheet, Image, ScrollView, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FONTS, icons, SIZES, COLORS } from '../../../constants'
import LinearGradient from 'react-native-linear-gradient'
import { dummyData } from '../../../constants'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Todo, InProgressModal, DoneModal } from '../TaskModal'
import styles from './css/UserDashboardStyle'
import Reports from '../Reports/Reports'


// Icons.loadFont();

const UserDashboard = () => {

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
    <>
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
            <View>
              <Text style={styles.tag} >5</Text>
            </View>
          </TouchableOpacity>
          {taskModalnum ? (<Todo taskModal={taskModal} settaskModal={settaskModal} />) : null}

          <TouchableOpacity style={styles.Intask} onPress={() => handleInProgressTask()}>
            <Image
              style={styles.icon1}
              source={icons.inprogress}
            />
            <Text style={styles.num_task}>In Progress</Text>
            <View>
              <Text style={styles.tag}>2</Text>
            </View>
          </TouchableOpacity>
          {inProgressModalnum ? (<InProgressModal inProgressModal={inProgressModal} setinProgressModal={setinProgressModal} />) : null}
          <TouchableOpacity style={styles.Intask} onPress={() => handleDoneTask()}>
            <Image
              style={styles.icon1}
              source={icons.done}
            />
            <Text style={styles.num_task}>Done</Text>
            <View>
              <Text style={styles.tag}>3</Text>
            </View>
          </TouchableOpacity>
          {doneModalnum ? (<DoneModal doneModal={doneModal} setdoneModal={setdoneModal} />) : null}
        </View>
        <View style={styles.report_section_title}>
          <Text style={styles.avai_text}>Available Reports</Text>
        </View>

        <ScrollView style={styles.scroll}>
          <View style={styles.report_section}>
            {dummyData.reports.map((item, index) => (
              <TouchableOpacity style={styles.eng} key={index}>
                <Text style={{ textAlign: "center", color: COLORS.black, fontWeight: "bold", letterSpacing: 1 }} >{item.name}</Text>
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
                        <Text style={{ color: COLORS.blue }} >
                          10%
                        </Text>
                      )
                    }
                  </AnimatedCircularProgress>
                  <Text style={{ color: COLORS.blue }}>8 hours </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>

    </>
  )
}


export default UserDashboard

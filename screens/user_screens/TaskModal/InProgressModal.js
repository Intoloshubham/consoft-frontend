import {
    View,
    Text,
    Modal,
    TouchableOpacity, 
    Alert,
    Pressable,
    StyleSheet,
    ScrollView,
    FlatList,
    Image
} from 'react-native'
import React from 'react'
import { icons, COLORS, SIZES, FONTS, dummyData } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import PieChart from 'react-native-pie-chart';
import styles from './css/InProgressModalStyle'


Entypo.loadFont()


function InProgressModal({ inProgressModal, setinProgressModal }) {

    const [SelectedActiveItem, setSelectedActiveItem] = React.useState(null)
    const [SelectedData, setSelectedData] = React.useState(dummyData.Active_tasks)

    const widthAndHeight = 130
    const series = [100, 150, 120]
    const sliceColor = ["#4caf50", '#2196F3', '#FFEB3B']

    const OnSelectedActiveItem = (activeItem) => {

        console.log(activeItem);
        setSelectedActiveItem(activeItem)
    }


    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: COLORS.transparent, paddingHorizontal: 10, paddingTop: 10, bottom: 5, marginBottom: 10 }}>
            <View >
                <TouchableOpacity
                    onPress={() => OnSelectedActiveItem(item)}
                    style={[styles.active_task_view,
                    { backgroundColor: (SelectedActiveItem?.id == item.id) ? "#26D1B2" : COLORS.gray3 }
                    ]}
                >
                    <Image
                        resizeMode='contain'
                        style={{ width: 50, height: 50 }}
                        source={item.icon} />
                    <View style={{ marginBottom: -12 }}>
                        <Text style={[styles.active_task_title, { color: (SelectedActiveItem?.id == item.id) ? COLORS.red : COLORS.transparentBlack7 }]}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );


    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={inProgressModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setinProgressModal(!inProgressModal);
                }}>
                <View style={styles.modal_container}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white2, marginTop: 20 }}>
                        <View style={{ backgroundColor: COLORS.white, marginLeft: 5 }}>
                            <Pressable style={{ alignSelf: "flex-end", marginLeft: 320, marginTop: 9, left: -8, top: -12 }} onPress={() => setinProgressModal(!inProgressModal)}><Entypo name="cross" color={"#106853"} size={25} /></Pressable>
                        </View>
                        <View style={styles.act_tsk_stat_view}>
                            <Text style={[styles.act_tsk_stat, { color: COLORS.black,fontWeight:"bold" }]}>Active Task Statistic</Text>
                        </View>
                        <View style={{ flexDirection: "row", backgroundColor: COLORS.transparentBlack1, borderRadius: 10, marginTop: 10, padding: 10 }}>
                            <View style={{ marginLeft: 15 }}>
                                <PieChart
                                    widthAndHeight={widthAndHeight}
                                    series={series}
                                    sliceColor={sliceColor}
                                    doughnut={true}
                                    coverRadius={0}
                                    coverFill={'#FFF'}
                                    style={{ paddingBottom: 10, paddingHorizontal: 21 }}
                                />
                            </View>
                            <View style={{ marginHorizontal: 70, marginTop: 30,marginVertical:30,justifyContent:"space-evenly" }}>
                                <View style={{ flexDirection: "row", alignItems: "center",marginBottom:-5 }}>
                                    <View style={[styles.circle, { backgroundColor: "yellow" }]}></View>
                                    <Text style={styles.pie_tag}>No. of Task</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center",marginBottom:-5 }}>
                                    <View style={[styles.circle, { backgroundColor:"#2196F3"  }]}>
                                    </View>
                                    <Text style={styles.pie_tag}>In Progress !</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center",marginBottom:-5 }}>
                                    <View style={[styles.circle, { backgroundColor: "#4caf50" }]}>
                                    </View>
                                    <Text style={styles.pie_tag}>Done !</Text>
                                </View>     
                            </View>
                        </View>
                        <View style={[styles.act_tsk_list_view, styles.act_tsk_stat_view]}>
                            <Text style={[FONTS.h2, { color: COLORS.black, fontWeight:"bold",textAlign:"center" }]}>List of Active Task</Text>
                        </View>

                        <View style={{ marginTop: 12, marginLeft: -15 }} >
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={dummyData.Active_tasks}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View>

                    </View>
                </View>
            </Modal>
        </>
    )
}
export default InProgressModal


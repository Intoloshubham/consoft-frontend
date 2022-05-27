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
import { icons, COLORS, SIZES, FONTS, dummyData } from '../../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import PieChart from 'react-native-pie-chart';



Entypo.loadFont()


function InProgressModal({ inProgressModal, setinProgressModal }) {

    const [SelectedActiveItem, setSelectedActiveItem] = React.useState(null)
    const [SelectedData, setSelectedData] = React.useState(dummyData.Active_tasks)

    const widthAndHeight = 130
    const series = [123, 321, 123, 789, 537, 125]
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800', "#5b45"]

    const OnSelectedActiveItem = (activeItem) => {

        console.log(activeItem);
        setSelectedActiveItem(activeItem)
    }


    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: "#B7EEE1", paddingHorizontal: 10, paddingTop: 10, bottom: 5, marginBottom: 10 }}>
            <View >
                <TouchableOpacity
                    onPress={() => OnSelectedActiveItem(item)}
                    style={[styles.active_task_view,
                    { backgroundColor: (SelectedActiveItem?.id == item.id) ? "#26D1B2" : COLORS.white }
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
                    <View style={{ flex: 1, backgroundColor: "#B7EEE1", marginTop: 20 }}>
                        <View style={{ backgroundColor: "#B7EEE1", marginLeft: 5 }}>
                            <Pressable style={{ alignSelf: "flex-end", marginLeft: 320, marginTop: 9, left: -8, top: -12 }} onPress={() => setinProgressModal(!inProgressModal)}><Entypo name="cross" color={"#106853"} size={25} /></Pressable>
                        </View>
                        <View style={styles.act_tsk_stat_view}>
                            <Text style={[styles.act_tsk_stat, { color: COLORS.transparentBlack7 }]}>Active Task Statistic:</Text>
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
                            <View style={{ marginHorizontal: 80, marginTop: 20 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={[styles.circle, { backgroundColor: "yellow" }]}></View>
                                    <Text style={{ marginLeft: 10 }}>Task 1</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={[styles.circle, { backgroundColor: "green" }]}>
                                    </View>
                                    <Text style={{ marginLeft: 10 }}>Task 2</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={[styles.circle, { backgroundColor: "#F44336" }]}>
                                    </View>
                                    <Text style={{ marginLeft: 10 }}>Task 3</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={[styles.circle, { backgroundColor: "#2196F3" }]}>
                                    </View>
                                    <Text style={{ marginLeft: 10 }}>Task 4</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={[styles.circle, { backgroundColor: "#FF9800" }]}>
                                    </View>
                                    <Text style={{ marginLeft: 10 }}>Task 4</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.act_tsk_list_view, styles.act_tsk_stat_view]}>
                            <Text style={[FONTS.h2, { color: COLORS.transparentBlack7, }]}>List of Active Task:</Text>
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
const styles = StyleSheet.create({
    modal_container: {
        paddingHorizontal: SIZES.padding,
        flex: 1,
        flexDirection: "row",
        borderColor: "#B7EEE1",
        backgroundColor: "#B7EEE1",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 77,
        borderTopLeftRadius: 77,
        shadowColor: "#470000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginTop: 200
    },
    circle: {
        height: 10,
        width: 10,
        marginVertical: 4,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1
    },
    active_task_view: {
        margin: 1,
        // backgroundColor: "#26D1B2",

        paddingVertical: 40,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: "#000",
        shadowOpacity: 1.2,
        bottom: -10
    },
    active_task_title: {
        elevation: 2,
        fontSize: SIZES.h4,
        fontWeight: "bold",
        // color:COLORS.transparentBlack7,
        paddingHorizontal: 12,
        textAlign: "center",
        bottom: -15
    },
    act_tsk_stat: {
        padding: 5,
        paddingHorizontal: 10,
    },
    act_tsk_stat_view: {
        backgroundColor: "#0000",
        borderColor: "transparent",
        borderWidth: 1,
        margin: 5,
        borderRadius: 3,
        elevation: 2
    },
    act_tsk_list_view: {
        marginTop: 10,
        padding: SIZES.base,

    }

})

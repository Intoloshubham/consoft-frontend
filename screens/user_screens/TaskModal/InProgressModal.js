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
import { BarChart } from "react-native-gifted-charts";
import styles from './css/InProgressModalStyle'
import { color } from 'react-native-reanimated';


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

    const barData = [
        {
            value: 50, label: 'T1', topLabelComponent: () => (
                <Text style={{ color: 'blue', fontSize: 18, marginBottom: 6 }}>50</Text>
            ),
        },
        { value: 40, label: 'T2', frontColor: '#177AD5', labelTextStyle: { color: 'red' } },
        { value: 50, label: 'T3', frontColor: '#177AD5' },
        { value: 80, label: 'T4' },
        { value: 60, label: 'T5', frontColor: '#177AD5' },
        { value: 10, label: 'T6', frontColor: '#177AD5' },
        { value: 50, label: 'T7', frontColor: '#177AD5' },
        { value: 16, label: 'T8', frontColor: '#177AD5' },
        { value: 60, label: 'T9', frontColor: '#177AD5' },
        { value: 10, label: 'T10', frontColor: '#177AD5' },
        { value: 60, label: 'T11', frontColor: '#177AD5' },
        { value: 20, label: 'T12', frontColor: '#177AD5' },
        { value: 15, label: 'T13', frontColor: '#177AD5' },
    ];

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
                <Pressable style={{ position: "relative", backgroundColor: "transparent", paddingTop: SIZES.width * 0.7, bottom: 5 }} onPress={() => setinProgressModal(!inProgressModal)}>

                </Pressable>
                <View style={styles.modal_container}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white2, marginTop: 20 }}>
                        <View style={{ backgroundColor: COLORS.white, marginLeft: 5 }}>
                            <Pressable style={{ alignSelf: "flex-end", marginLeft: 320, marginTop: 9, left: -8, top: -12 }} onPress={() => setinProgressModal(!inProgressModal)}><Entypo name="cross" color={"#106853"} size={25} /></Pressable>
                            <View style={styles.act_tsk_stat_view}>
                                <Text style={[styles.act_tsk_stat, { color: COLORS.black, ...FONTS.body2, textAlign: "center" }]}>Active Task Statistic</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", backgroundColor: COLORS.white2,alignContent:"space-between",alignItems:"baseline",left:-12,top:32 }}>
                            <View style={{flex:2,  backgroundColor: COLORS.white2 }}>
                                <BarChart
                                    barWidth={20}
                                    noOfSections={3}
                                    barBorderRadius={40}
                                    frontColor="#177AD5"
                                    data={barData}
                                    width={450}
                                    height={120}
                                    cappedBars={true}
                                    capColor={COLORS.blue}
                                    roundedTop={true}
                                    roundedBottom={true}
                                    showGradient={true}
                                    activeOpacity={0.8}
                                    isAnimated={true}
                                    animationDuration={600}
                                    animationEasing={'Easing.ease'}
                                    sideColor={COLORS.blue}
                                    topColor={COLORS.transparentBlack7}
                                    isThreeD={true}
                                    // onPress={() => alert("i am task")}
                                    spacing={20}
                                    sideWidth={15}
                                    initialSpacing={40}
                                    // renderTooltip={() => alert("tool tip")}
                                    horizontal={true}
                                    labelWidth={20}
                                    yAxisThickness={0}
                                    hideYAxisText={true}
                                    yAxisLabelSuffix={" %"}
                                    yAxisTextStyle={{ color: 'blue', fontWeight: "bold" }}
                                    xAxisLabelTextStyle={{ color: 'blue', fontWeight: "bold" }}
                                    // showScrollIndicator={true}
                                    // indicatorColor={'black'}
                                    // scrollToEnd={true}
                                    scrollAnimation={true}
                                    yAxisAtTop={false}
                                    // yAxisLabelContainerStyle={{color:COLORS.red}}
                                    xAxisThickness={0}
                                />
                            </View>
                            <View style={{ flexDirection: "column", alignItems: "baseline", justifyContent: "space-around", backgroundColor: "transparent", height: 72, top: -45, right: 0 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={[styles.circle, { backgroundColor: "yellow" }]}></View>
                                    <Text style={styles.pie_tag}>No. of Task</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={[styles.circle, { backgroundColor: "#2196F3" }]}>
                                    </View>
                                    <Text style={styles.pie_tag}>In Progress !</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={[styles.circle, { backgroundColor: "#4caf50" }]}>
                                    </View>
                                    <Text style={styles.pie_tag}>Done !</Text>
                                </View>
                            </View>
                        </View>
                        {/* <View style={[styles.act_tsk_list_view, styles.act_tsk_stat_view,{bottom:0}]}>
                            <Text style={[FONTS.body2, { color: COLORS.black,  textAlign: "center" }]}>List of Active Task</Text>
                        </View> */}

                        {/* <View style={{ marginTop: 10, marginLeft: -15 }} >
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={dummyData.Active_tasks}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View> */}

                    </View>
                </View>
            </Modal>
        </>
    )
}
export default InProgressModal


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
    Image,
    TextInput
} from 'react-native'
import React from 'react'
import { icons, COLORS, SIZES, FONTS, dummyData } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import { BarChart } from "react-native-gifted-charts";
import styles from './css/InProgressModalStyle'
import { color } from 'react-native-reanimated';
import { FalsyFC } from '@ui-kitten/components/devsupport';


Entypo.loadFont()


function InProgressModal({ inProgressModal, setinProgressModal }) {


    const [SelectedData, setSelectedData] = React.useState(dummyData.Active_tasks)
    const [count, setCount] = React.useState(0)
    const [Num, setNum] = React.useState(0)
    const [tempNum, settempNum] = React.useState(null)

    const increase = () => {
        // setCount(count => count + 1);

        if (tempNum) {
            let sum = parseInt(count) + parseInt(tempNum);
            if (sum >= 1 && sum <= 99) {
                setCount({ count: sum, tempNum: null });
            } else {
                console.log("Number should be between 1 and 99");
                setCount({ error: "Number should be between 1 and 99" })
            }

        }
        else {
            if (count < 100) {
                setCount(count => count + 5);
            }
        }
    };

    // decrease counter
    const decrease = () => {
        if (count > 0) {
            setCount(count => count - 5);
        } else {
            settempNum(null)
            setCount(0)
            setNum(0)
        }
    };











    // const OnSelectedActiveItem = (activeItem) => {

    //     console.log(activeItem);
    //     setSelectedActiveItem(activeItem)
    // }

    {/* <View style={{ marginVertical: 2, backgroundColor: "yellow" }}>
        <Text style={{ color: COLORS.black, letterSpacing: 1 }}>Working Percent:</Text>
    </View> */}
    function bar_percent() {
        return (
            <View style={{ alignSelf: "flex-start", position: "absolute", left: 82 }}>
                <View style={{ flexDirection: "row", height: 25, backgroundColor: COLORS.white2, alignItems: "center" }}>
                    <TouchableOpacity style={styles.minus_btn} color={COLORS.black} onPress={decrease} >
                        <Text style={{ color: COLORS.black, fontSize: 35, marginTop: -15 }}>-</Text>
                    </TouchableOpacity>
                    <Text placeholder="%" style={styles.plus_minus_text} >{count} %</Text>
                    <TouchableOpacity style={styles.plus_btn} onPress={increase} >
                        <Text style={{ color: COLORS.black, fontSize: 20, marginTop: -3 }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        
        )
    }

    const barData = [
        {
            value: 40, label: 'T1', frontColor: "#177AD5", topLabelComponent: () => (
                bar_percent()
            ),
            topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 40, label: 'T2', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 100, marginTop: 0 }
        },
        {
            value: 50, label: 'T3', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 80, label: 'T4', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 60, label: 'T5', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 10, label: 'T6', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: -SIZES.width * 0.4 }
        },
        {
            value: 50, label: 'T7', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: -SIZES.width * 0.4 }
        },
        {
            value: 16, label: 'T8', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 100, label: 'T9', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 100, marginTop: -SIZES.base }
        },
        {
            value: 10, label: 'T10', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 60, label: 'T11', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 20, label: 'T12', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 15, label: 'T14', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 15, label: 'T15', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 15, label: 'T16', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
        {
            value: 12, label: 'T17', frontColor: '#177AD5', topLabelComponent: () => (
                bar_percent()
            ), topLabelContainerStyle: { width: 110, marginTop: 0 }
        },
    ];

    // const renderItem = ({ item }) => (
    //     <View style={{ backgroundColor: COLORS.transparent, paddingHorizontal: 10, paddingTop: 10, bottom: 5, marginBottom: 10 }}>
    //         <View >
    //             <TouchableOpacity
    //                 onPress={() => OnSelectedActiveItem(item)}
    //                 style={[styles.active_task_view,
    //                 { backgroundColor: (SelectedActiveItem?.id == item.id) ? "#26D1B2" : COLORS.gray3 }
    //                 ]}
    //             >
    //                 <Image
    //                     resizeMode='contain'
    //                     style={{ width: 50, height: 50 }}
    //                     source={item.icon} />
    //                 <View style={{ marginBottom: -12 }}>
    //                     <Text style={[styles.active_task_title, { color: (SelectedActiveItem?.id == item.id) ? COLORS.red : COLORS.transparentBlack7 }]}>{item.name}</Text>
    //                 </View>
    //             </TouchableOpacity>
    //         </View>
    //     </View>
    // );


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
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            backgroundColor: COLORS.white,
                            marginTop: -15,
                            marginRight: -22,
                            height: "100%",
                            marginLeft: -54,
                            position: "relative"
                        }}>
                            <View style={{
                                flex: 1,
                                backgroundColor: COLORS.white,
                                height: 800,
                                width: "100%",
                                position: "absolute",
                                top: 0,
                                paddingTop: 55,
                                paddingLeft: -60,
                                marginLeft: -25,
                                paddingBottom: 100,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                // marginRight:-22
                            }}>

                                <BarChart
                                    barWidth={20}
                                    noOfSections={4}
                                    barBorderRadius={2}
                                    frontColor="#177AD5"
                                    data={barData}
                                    width={500}
                                    autoShiftLabels={true}
                                    height={200}
                                    showGradient={false}
                                    activeOpacity={0.8}
                                    // roundedTop={0.2}
                                    // roundedBottom={5}
                                    maxValue={100}
                                    stepValue={5}
                                    stepHeight={5}
                                    backgroundColor={COLORS.white}
                                    isAnimated={true}
                                    animationDuration={600}
                                    animationEasing={'Easing.ease'}
                                    // onPress={() => alert("i am task")}
                                    spacing={30}
                                    initialSpacing={15}
                                    // renderTooltip={() => alert("tool tip")}
                                    horizontal={true}
                                    labelWidth={15}
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

                            {/* <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-around", backgroundColor: "red", height: 72, top: -45, right: 0 }}>                         
                               
                                    <View style={{ marginVertical: 2,backgroundColor:"yellow" }}>
                                        <Text style={{ color: COLORS.black, letterSpacing: 1 }}>Working Percent:</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", height: 25,backgroundColor:"gray" , marginLeft: 5, marginTop: 16, alignItems: "center" }}>
                                        <TouchableOpacity style={styles.minus_btn} color={COLORS.black} onPress={decrease} >
                                            <Text style={{ color: COLORS.black, fontSize: 35, marginTop: -15 }}>-</Text>
                                        </TouchableOpacity>
                                        <Text placeholder="%" style={styles.plus_minus_text} >{count} %</Text>
                                        <TouchableOpacity style={styles.plus_btn} onPress={increase} >
                                            <Text style={{ color: COLORS.black, fontSize: 20, marginTop: -3 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                              
                            </View> */}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
export default InProgressModal


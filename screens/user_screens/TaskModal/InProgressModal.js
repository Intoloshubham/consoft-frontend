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
import { icons, COLORS, SIZES, FONTS, dummyData, images } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import { BarChart } from "react-native-gifted-charts";
import styles from './css/InProgressModalStyle'




Entypo.loadFont()





function InProgressModal({ inProgressModal, setinProgressModal }) {


    const [SelectedData, setSelectedData] = React.useState(dummyData.Active_tasks)
    const [count, setCount] = React.useState(0)
    const [Num, setNum] = React.useState(0)
    const [tempNum, settempNum] = React.useState(null)

    const [dumybardata, setdumybardata] = React.useState(dummyData.barData)


    const barData = dumybardata.map((element) =>  {
        return  {
        value: element.value,
        label: '1',
        frontColor: "#177AD5",
        topLabelComponent: () => (
            <View style={{ flexDirection: "row", justifyContent: "flex-start", backgroundColor: COLORS.white, }}>
                <View style={{ backgroundColor: COLORS.white, left: -146, top: -5, position: "absolute" }}>
                    <Text style={{ color: 'blue', fontFamily: 'Poppins-Bold', fontSize: 15, fontWeight: "bold" }}>{element.code}</Text>
                </View>
                {/* {console.log(dumybardata)} */}
                <View style={{ backgroundColor: COLORS.white, left: -50, top: -7 }}>
                    <Text style={{ color: 'blue', fontFamily: 'Poppins-Bold', fontSize: 15, fontWeight: "bold" }}>{element.date}</Text>
                </View>
            </View>
        ),
        topLabelContainerStyle: { width: 100, height: 60, top: -40, paddingTop: -40, marginLeft: -17 }

    }}
    )//map close

    const [bardatastate, setbardata] = React.useState(barData)



    console.log(bardatastate);

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
                <Pressable style={{ position: "relative", backgroundColor: COLORS.transparentBlack7, paddingTop: SIZES.width * 0.7, bottom: 5 }} onPress={() => setinProgressModal(!inProgressModal)}>

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
                            height: "100%",
                            justifyContent: "space-around",
                            left: -35,
                            marginBottom: 0,
                            marginTop: -20,
                            marginRight: -55,
                            paddingTop: -22,
                            paddingBottom: -10
                        }}>
                            <View style={{
                                // flex: 1,
                                backgroundColor: COLORS.white,
                                height: 560,
                                width: "70%",
                                paddingLeft: 60,
                                marginBottom: -12,
                                paddingTop: -5,
                                marginTop: -30,
                                top: 34,
                                left: -30

                            }}>
                                <BarChart
                                    barWidth={4}
                                    noOfSections={-1}
                                    barBorderRadius={2}
                                    frontColor="#177AD5"
                                    // isAnimated={true}
                                    data={bardatastate}
                                    width={390}
                                    // autoShiftLabels={true}
                                    height={150}
                                    showGradient={true}
                                    // activeOpacity={0.8}
                                    // roundedTop={0.2}
                                    gradientColor={COLORS.green}
                                    // roundedBottom={5}
                                    maxValue={100}
                                    stepValue={5}
                                    stepHeight={5}
                                    // backgroundColor={COLORS.white}
                                    barMarginBottom={-15}


                                    animationDuration={800}
                                    // animationEasing={'Easing.cubic'}
                                    // onPress={() => alert("i am task")}
                                    spacing={45}
                                    initialSpacing={45}
                                    // renderTooltip={() => alert("tool tip")}
                                    horizontal={true}
                                    labelWidth={12}

                                    yAxisThickness={0}
                                    hideYAxisText={true}
                                    // yAxisLabelSuffix={" %"}
                                    yAxisTextStyle={{ color: 'black' }}
                                    xAxisLabelTextStyle={{ color: 'black', marginTop: -10, bottom: 0 }}
                                    // showScrollIndicator={true}
                                    // indicatorColor={'black'}
                                    // scrollToEnd={true}
                                    scrollAnimation={true}
                                // yAxisAtTop={true}


                                // xAxisThickness={0}
                                />
                            </View>
                            <View >
                                <Text>sdfsdfsdf</Text>
                            </View>

                            <View style={{ alignItems: "center", backgroundColor: COLORS.white, marginTop: 2, marginLeft: -100, marginRight: -6 }}>
                                <View style={{ flexDirection: "row", height: 25, backgroundColor: COLORS.white, marginTop: 55, alignItems: "center" }}>
                                    <TouchableOpacity style={styles.minus_btn} color={COLORS.black} onPress={decrease} >
                                        <Text style={{ color: COLORS.black, fontSize: 35, marginTop: -16, textAlign: "right" }}>-</Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "column", alignSelf: "center", marginLeft: -5 }}>
                                        <Text placeholder="%" style={styles.plus_minus_text} >{count} %</Text>
                                    </View>
                                    <TouchableOpacity style={styles.plus_btn} onPress={increase} >
                                        <Text style={{ color: COLORS.black, fontSize: 20, marginTop: -3 }}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image
                                            resizeMode='contain'
                                            style={{ height: 14, width: 14, marginTop: 3 }}
                                            source={icons.forward_arrow}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
export default InProgressModal


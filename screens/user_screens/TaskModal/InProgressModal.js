import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Alert,
    StyleSheet,
    FlatList,
    Image,
    Animated,
    TextInput
} from 'react-native'
import React from 'react'
import { icons, COLORS, SIZES, FONTS, dummyData, images } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import styles from './css/InProgressModalStyle'



Entypo.loadFont()





function InProgressModal({ inProgressModal, setinProgressModal }) {


    const [count, setCount] = React.useState(0)
    const [Num, setNum] = React.useState(0)
    const [dumybardata, setdumybardata] = React.useState(dummyData.barData)
    const [SelectedActiveItem, setSelectedActiveItem] = React.useState(null)








    const increase = () => {
        if (count < 100) {
            setCount(count => count + 5);
        }
    };

    const decrease = (e,activeItem) => {
        alert(activeItem)
        setSelectedActiveItem(e.currentTarget._internalFiberInstanceHandleDEV.index)
        // console.log(SelectedActiveItem);
        console.log(e.currentTarget._internalFiberInstanceHandleDEV.index);
            // (SelectedActiveItem == 0) && (count > 100) ? : alert("null")
            // (SelectedActiveItem == activeItem) && (count > 0) ? alert("true") : alert("null")
        // console.log(activeItem.currentTarget._internalFiberInstanceHandleDEV.index);
        // if (count > 0) {
        //     setCount(count => count - 5);
        // }
    };

    // const counter = React.useRef(new Animated.Value(0)).current;
    // const countInterval = React.useRef(null);
    // const [dis, setDis] = React.useState(5); 

    // React.useEffect(() => {
    //   countInterval.current = setInterval(() => setDis((old) => old + 1), 600);
    //   return () => {
    //     clearInterval(countInterval);
    //   };
    // }, []);

    // React.useEffect(() => {

    //   load(dis)
    //   if (dis >= 100) {
    //     setDis(52);
    //     clearInterval(countInterval);
    //   }
    // }, [dis]);

    // const load = (dis) => {
    //   Animated.timing(counter, {
    //     toValue: dis,
    //     duration: 500,
    //     useNativeDriver: false,
    //   }).start();
    // };

    //     const width = counter.interpolate({
    //     inputRange: [0, 100],
    //     outputRange: ["0%", "100%"],
    //     extrapolate: "clamp"
    //   })

    // onChangeText = ( item, text ) => {
    //     let dumybardata = [...dumybardata]
    //     let index = dumybardata.findIndex(obj => obj.label == item.label)
    //     dumybardata[index].label = text;
    //     setdumy(dumybardata)
    // }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.white, flexDirection: "row", justifyContent: "space-around", top: 5 }}>
                <View style={{}}>
                    <Text style={{ color: COLORS.black }}>{item.label}</Text>
                </View>
                <View style={{ width: "55%", height: "35%" }}>
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: 20,
                            top: 0,
                            left: -15,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            flex: 1,
                            alignSelf: "flex-end",
                            alignItems: "center",
                            backgroundColor: COLORS.white
                        }}
                        key={index}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                left: 0,
                                height: '100%',
                                width: `${item.value}%`,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                justifyContent: "center",
                                alignItems: "flex-start",
                                backgroundColor: COLORS.success_300,
                            }}>
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", right: 2 }}>
                            <View style={{}}>
                                <Text style={{}}>{item.date}</Text>
                            </View>
                            <View>
                                <Text style={{}}>{item.code}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* //COUNTER */}
                <View style={{ backgroundColor: COLORS.white, left: -8, height: 35, flexDirection: "row", alignContent: "flex-start", marginRight: 5 }}>
                    <View style={{ flexDirection: "row", height: 25, backgroundColor: COLORS.white, alignItems: "center" }}>
                        <TouchableOpacity style={styles.minus_btn} color={COLORS.black}
                            onPress={(e) => decrease(e,index)
                                //  (SelectedActiveItem?.index == 0) && (count>100) ? setCount(count => count - 5) :alert("null")
                            }
                        >
                            <Text style={{ color: COLORS.black, fontSize: 35, marginTop: -16, textAlign: "right" }}>-</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "column", alignSelf: "center", marginLeft: -5 }}>
                            <TextInput placeholder="%" style={{ width: 60, height: 40, fontSize: 15, top: 5, color: COLORS.black }}
                                // onChange={(target) => setCount(target.value)}
                                onChangeText={(text) => onChangeText(item, text)}
                                // onChange={(target)=>handle_setCount(target.value)}
                                editable={false}
                                value={String(`${count}%`)}  ></TextInput>
                        </View>
                        <TouchableOpacity style={styles.plus_btn} onPress={increase} >
                            <Text style={{ color: COLORS.black, fontSize: 20, marginTop: -3 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: COLORS.white, height: 25, marginRight: -2, alignContent: "center" }}>
                        <TouchableOpacity >
                            <Image
                                resizeMode='contain'
                                style={{ height: 14, width: 20, marginTop: 7 }}
                                source={icons.forward_arrow}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={inProgressModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setinProgressModal(!inProgressModal);
                    clearInterval(countInterval);
                }}>
                <View style={styles.modal_container}>
                    <View style={{ backgroundColor: COLORS.gray3 }}>
                        <TouchableOpacity style={{ alignSelf: "flex-end", marginLeft: 320, left: -5, marginTop: 5, padding: 5 }} onPress={() => setinProgressModal(!inProgressModal)}>
                            <Entypo name="cross" color={"#106853"} size={25} />
                        </TouchableOpacity>
                        <View style={styles.act_tsk_stat_view}>
                            <Text style={[styles.act_tsk_stat, { color: COLORS.black, ...FONTS.body2, textAlign: "center" }]}>Active Task Statistic</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", backgroundColor: COLORS.white }}>
                        <View style={{ flex: 2, backgroundColor: COLORS.white }}>
                            <FlatList
                                data={dumybardata}
                                contentContainerStyle={{ flexGrow: 1 }}
                                pagingEnabled={true}
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={true}
                                legacyImplementation={false}
                                renderItem={(item, index) => renderItem(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                            />

                            <View>
                                <Text>dsf</Text>
                            </View>
                        </View>
                        {/* <View style={{ flex: 1, flexDirection: "row", backgroundColor: COLORS.green, justifyContent: "space-evenly", alignItems: "flex-start", }}>
                            <View style={{ flexDirection: "row", height: 25, backgroundColor: COLORS.white, alignItems: "center", marginTop: 18 }}>
                                <TouchableOpacity style={styles.minus_btn} color={COLORS.black} onPress={decrease} >
                                    <Text style={{ color: COLORS.black, fontSize: 35, marginTop: -16, textAlign: "right" }}>-</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "column", alignSelf: "center", marginLeft: -5 }}>
                                    <Text placeholder="%" style={styles.plus_minus_text} >{count} %</Text>
                                </View>
                                <TouchableOpacity style={styles.plus_btn} onPress={increase} >
                                    <Text style={{ color: COLORS.black, fontSize: 20, marginTop: -3 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: 25, top: 18, alignContent: "center" }}>
                                <TouchableOpacity >
                                    <Image
                                        resizeMode='contain'
                                        style={{ height: 14, width: 14, marginTop: 7 }}
                                        source={icons.forward_arrow}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View> */}
                        {/* <View>
                                {
                                    dumybardata.map((element) => {
                                        console.log(element)
                                        return (
                                            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", backgroundColor: "powderblue" }}>
                                                <View style={{ left: -190 }}>
                                                    <Progress.Bar progress={0.3} width={200} style={{ left: -20, top: 70 }} />
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View> */}

                        {/* <View style={{ alignItems: "center", backgroundColor: COLORS.white, marginTop: 2, marginLeft: -100, marginRight: -6 }}>
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
                            </View> */}
                    </View>
                </View>
            </Modal>
        </>
    )
}
export default InProgressModal


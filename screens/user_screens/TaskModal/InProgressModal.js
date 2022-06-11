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
import React, { useState } from 'react'
import { icons, COLORS, SIZES, FONTS, dummyData, images } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import styles from './css/InProgressModalStyle'
import { log } from 'react-native-reanimated';



Entypo.loadFont()





function InProgressModal({ inProgressModal, setinProgressModal }) {


    const [count, setCount] = React.useState(0)
    const [Num, setNum] = React.useState(0)
    const [dumybardata, setdumybardata] = React.useState(dummyData.barData)
    const [ShowCounterbutton, setShowCounterbutton] = useState(false)
    const [ShowCounterid, setShowCounterid] = useState(0)
    const ShowCounteridRef=React.useRef()
    const [Data, setData] = useState(null)
    const GetPercentIdRef = React.useRef()



    const __handle_increase_counter = (item, id,index) => {
        // console.log(id);
        ShowCounteridRef.current=id
        setShowCounterid(id)
        console.log('showcounterref='+ShowCounteridRef.current+''+'Showcounterid='+ShowCounterid);
        if (index ==  ShowCounterid) {
            if (count < 100) {
                setCount(count => count + 5);
            }
        } else {
            setCount(0);
        }
    }



    const __handle_decrease_counter = (item, id) => {
        setShowCounterid(id+1)
        if (id == ShowCounterid) {
            if (count > 0) {
                setCount(count => count - 5);
            }
        } else {
            setCount(0);
        }

    }

    const __handleonchange = (e, target) => {

        setTextid(text_id)
    }

    const Text_Counter = (item, id) => {
        return (

            <TextInput placeholder="%" style={{ width: 60, height: 40, fontSize: 15, top: 5, color: COLORS.black }}
                editable={false}
                value={String(`${count}%`)}

            // onChange={(e) => __handleonchange(e)} 
            >
            </TextInput>
        )
    }
    const Text_Counter2 = (item, id) => {
        return (

            <TextInput placeholder=" " style={{ width: 60, height: 40, fontSize: 15, top: 5, color: COLORS.black }}
                editable={false}
                value={String(`${0}%`)}
            >
            </TextInput>
        )
    }

    const __getPercent = (item, id) => {
        const new_data = dumybardata.findIndex((i) => i.label === item.label)
        GetPercentIdRef.current = new_data
        // GetPercentIdRef
        // console.log(new_data);
        // console.log(GetPercentIdRef.current);
        if (GetPercentIdRef.current == id) {
            console.log(count);
            setCount(0)
        } else {
            return null
        }
    }

    const Handle_counter_buttons = ({ item, id,index }) => {
        // console.log('ShowCounteridRef= '+ShowCounteridRef.current+'ShowCounterid= '+ShowCounterid+'id= '+id);
        return (
            <>
                <View style={{ flexDirection: "row", height: 25, backgroundColor: COLORS.white, alignItems: "center" }}>
                    <TouchableOpacity style={styles.minus_btn} key={item.label} color={COLORS.black}
                        onPress={() => {
                            __handle_decrease_counter(item, id)
                        }} >
                        <Text style={{ color: COLORS.black, fontSize: 35, marginTop: -16, textAlign: "right" }}>-</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "column", alignSelf: "center", marginLeft: -5 }}>
                        {/* {( ShowCounteridRef.current == id ? Text_Counter(item, id) : Text_Counter2(item, id))} */}
                        {(ShowCounterid == id ? Text_Counter(item, id) : Text_Counter2(item, id))}
                    </View>
                    <TouchableOpacity style={styles.plus_btn}
                        onPress={() => {
                            __handle_increase_counter(item, id,index)
                        }} >
                        <Text style={{ color: COLORS.black, fontSize: 20, marginTop: -3 }}>+</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: COLORS.white, height: 25, marginRight: -2, alignContent: "center" }}>
                        <TouchableOpacity
                            onPress={() => {
                                __getPercent(item, id)
                            }}
                        >
                            <Image
                                resizeMode='contain'
                                style={{ height: 14, width: 20, marginTop: 7 }}
                                source={icons.forward_arrow}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }



    const CountingComponent = ({ item, id }) => {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.gray, flexDirection: "row", justifyContent: "space-around", top: 5 }}>
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
                        key={id}

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
                <View style={{ backgroundColor: COLORS.gray2, left: -8, height: 35, flexDirection: "row", alignContent: "flex-start", marginRight: 5 }}>
                    <Handle_counter_buttons item={item} id={id} index={index}/>
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

                                renderItem={({ item, index }) => (
                                    <CountingComponent item={item} id={item.label} />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={count}
                            />

                            <View style={{ backgroundColor: "red" }}>
                                <Text>dsf</Text>
                            </View>
                        </View>



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


import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Alert,
    Pressable,
    StyleSheet,
    Button,
    Image,LayoutAnimation
} from 'react-native';
import React from 'react'
import { AccordionList } from 'accordion-collapse-react-native';
import { TextInput } from 'react-native-paper';
import { icons, COLORS, SIZES, FONTS } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import DatePicker from 'react-native-neat-date-picker'
import { Divider } from '@ui-kitten/components';
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

Entypo.loadFont()
EvilIcons.loadFont()

const data =
{
    list: [
        {
            id: 1,
            title: 'Task 1',
            body: 'AccordionListBody'
        },
        {
            id: 2,
            title: 'Task 2',
            body: 'AccordionListBody'
        }
    ]
}

function Todo({ taskModal, settaskModal, newTaskRes }) {


    const [ExpCalendar, setExpCalendar] = React.useState(false)
    const [Exp_date, setExp_date] = React.useState('YYYY-MM-DD')
    const [list, setlist] = React.useState(data.list)
    const [assign_works, setAssign_works] = React.useState([])






    function Test({ item }) {
        // console.log(item2)
        return (
            <View style={styles.header}>
                <View style={{flexDirection:"row"}}>
                    <View >
                    <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "left" }]}>{item.work_code}: </Text>
                    </View>
                    <View>
                        <Text style={[FONTS.h3, { color: COLORS.black, textAlign: "left" }]}>{item.work}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const _head = (item) => {
        // console.log(item.user_name)
        LayoutAnimation.easeInEaseOut();
        return (
            <View>
                <Test item={item} />
            </View>
        )
    }

    React.useEffect(() => {
        newTaskRes.map(ele => {
            let data_assign = ele.assign_works
            setAssign_works(data_assign)
            console.log(data_assign)
        })
    }, [])

    // console.log(assign_works)




    // const onConfirm = (output) => {

    //     setShowDatePicker(false)
    //     console.log(output.date)
    //     console.log(output.dateString)
    //     setcomp_time(output.dateString)

    // }

    // const onConfirmexp = (output) => {
    //     setExp_date(output.dateString)
    //     setExpCalendar(false)
    // }

    const _body = (item) => {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.body_container} key={item.key}>
                <View style={[styles.form_container, { borderRadius: 10, shadowOffset: { width: 0, height: 1 }, shadowColor: "#99CCC0", shadowOpacity: 1.5 }]}>
                    <View style={{ backgroundColor: COLORS.gray3, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: COLORS.black, fontSize: SIZES.h4 }} >Date: </Text>
                        <Text style={{ color: COLORS.black }}  >Time: </Text>
                    </View>
                    <Divider style={{ backgroundColor: COLORS.gray2, marginTop: 5 }} />
                    {/* <View>
                        <Text style={{ height: 30, marginTop: 12, backgroundColor: COLORS.gray3 }} >Particular</Text>
                    </View> */}
                    {/* <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                        <View>
                            <Text style={{ height: 40, top: 15, ...FONTS.h4, color: COLORS.black, backgroundColor: COLORS.gray3, width: 150 }} >Expected Comp. time</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "baseline", borderTopLeftRadius: 8, borderTopRightRadius: 8, width: 115, justifyContent: "space-around", marginBottom: 5 }}>
                            <View style={{ backgroundColor: COLORS.gray2, borderRadius: 5 }}>
                                <Text style={{ color: "#000", padding: 4 }} >{Exp_date}</Text>
                            </View>
                            <View style={{ width: 30, borderRadius: 5, backgroundColor: COLORS.gray3, top: 12 }}>
                                <Pressable onPress={() => { setExpCalendar(true) }}  >
                                    <EvilIcons name="calendar" color={"#106853"} size={35} />
                                </Pressable>
                            </View>
                        </View>
                        <DatePicker
                            isVisible={ExpCalendar}
                            mode={'single'}
                            onCancel={() => { setExpCalendar(false) }}
                            onConfirm={onConfirmexp}   
                        />
                    </View> */}
                    <View style={{ flexdirection: "row", justifyContent: "space-around" }}>
                        <View style={{ backgroundColor: COLORS.gray3, top: 10 }}>
                            <TextInput placeholder='Comment section' placeholderTextColor={COLORS.gray} style={{ height: 35, top: 5, backgroundColor: COLORS.gray3, letterSpacing: 1, ...FONTS.body4 }}></TextInput>
                        </View>
                        <View style={{ backgroundColor: COLORS.Gray3, marginVertical: 10, marginTop: 20, alignSelf: "center" }}>
                            <TouchableOpacity style={styles.sub_btn} >
                                <Text style={{ fontWeight: "bold", color: COLORS.white, letterSpacing: 1, fontFamily: 'Poppins-SemiBold', fontSize: 11, lineHeight: 20 }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: COLORS.gray2, marginTop: 5 }} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 5 }}>
                        <Text style={{ height: 30, marginTop: 12, backgroundColor: COLORS.gray3 }} >Admin Revert</Text>
                        <TouchableOpacity style={{ backgroundColor: COLORS.blue, padding: 2, borderRadius: 4, width: 30, height: 20 }} >
                            <Text style={{ textAlign: 'center', color: COLORS.white, ...FONTS.h5, bottom: 4, letterSpacing: 1 }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ backgroundColor: COLORS.gray2, marginTop: 5 }} />
                </View>
            </View>
        );
    }

    return (
        <>
        
            <Modal
                animationType="slide"
                transparent={true}
                visible={taskModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closeds.");
                    settaskModal(!taskModal);
                }}>
                <Pressable style={{ position: "relative", backgroundColor: COLORS.transparentBlack7, paddingTop: SIZES.width * 0.7, bottom: 5 }} onPress={() => settaskModal(!taskModal)}>

                </Pressable>
                <View style={styles.modal_container}>
                {LayoutAnimation.easeInEaseOut()}
                    <Pressable style={{ alignSelf: "flex-end", marginLeft: 320, marginTop: 10, left: -8, top: -12 }} onPress={() => settaskModal(!taskModal)}><Entypo name="cross" color={"#106853"} size={25} /></Pressable>

                    <AccordionList
                        list={assign_works}
                        header={_head}
                        isExpanded={false}
                        body={_body}
                        keyExtractor={item => `${item._id}`}
                    />


                </View>
            </Modal>

        </>
    )
}
export default Todo
const styles = StyleSheet.create({
    header: {
        borderWidth: 1,
        borderColor: COLORS.white2,
        padding: 8,
        borderRadius: 5,
        margin: 2,
        shadowOpacity: 0.9,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        shadowColor: '#000000',
        backgroundColor: COLORS.gray3,
        marginTop: 1

    },
    body_container: {
        marginHorizontal: 10,
        backgroundColor: "#eee",
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 10,
        elevation: 2,
    },
    modal_container: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        flex: 1,
        position: "absolute",
        borderColor: "#B7EEE1",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
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
    textinputs: {
        fontSize: 13,
        width: 100,
        marginLeft: 10,
        height: 20,
        paddingBottom: 5,
        elevation: 1,
        marginTop: -5,
    },
    sub_btn: {
        borderWidth: 1,
        borderColor: COLORS.gray2,
        backgroundColor: COLORS.blue,
        borderRadius: 5,
        padding: 3,
        elevation: 1,
        alignItems: "center",
        height: 25,
        width: 50,
        paddingBottom: -11,
        paddingTop: 2
    },
    form_container: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#99CCC0",
        padding: 10,
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: COLORS.gray3,
        flexDirection: "column",
        // height:160,
        // marginVertical:20


    },

})
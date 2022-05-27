import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Alert,
    Pressable,
    StyleSheet,
    Button,
    Image
} from 'react-native';
import React from 'react'
import { AccordionList } from 'accordion-collapse-react-native';
import { TextInput } from 'react-native-paper';
import { icons, COLORS, SIZES, FONTS } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
Entypo.loadFont()
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

function Todo({ taskModal, settaskModal }) {

    const [perticuler, setperticuler] = React.useState('')

    const [list, setlist] = React.useState(data.list)
    const [count, setCount] = React.useState(0)
    const [Num, setNum] = React.useState(0)
    const [tempNum, settempNum] = React.useState(null)


    const _head = (item) => {
        return (
            <View style={styles.header} key={item.key}>
                <View >
                    <Text style={[FONTS.h4, { fontWeight: "bold", color: COLORS.black, textAlign: "center" }]}>{item.title}</Text>
                </View>
            </View>
        );
    }

    //increase counter
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
                setCount(count => count + 1);
            }
        }
    };

    // decrease counter
    const decrease = () => {
        if (count > 0) {
            setCount(count => count - 1);
        } else {
            settempNum(null)
            setCount(0)
            setNum(0)
        }
    };


    const handleOnTextChange = (e) => {

        console.log(e);
        const number = e;
        setNum(number)


        if (number > 0 && number < 100 && number) {

            setCount(parseInt(number))
        } else {
            setCount('')
        }
    }


    const _body = (item) => {
        return (
            <View style={styles.body_container} key={item.key}>
                <View style={[styles.form_container, { borderRadius: 10, shadowOffset: { width: 0, height: 1 }, shadowColor: "#99CCC0", shadowOpacity: 1.5 }]}>
                    <View style={{ backgroundColor: COLORS.gray3, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: "bold", color: COLORS.black, fontSize: SIZES.h4 }} >Date: </Text>
                        <Text style={{ fontWeight: "bold", color: COLORS.black }}  >Time: </Text>
                    </View>
                    <View>
                        <TextInput placeholder="Particular" style={{ height: 30, marginTop: 12, backgroundColor: COLORS.gray3, fontWeight: "bold" }} ></TextInput>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 30 }}>
                        <View >
                            <Text style={{ fontWeight: "bold", color: COLORS.black,letterSpacing:1 }}>Working Percent:</Text>
                        </View>
                        <View style={{ flexDirection: "row", height: 25, marginLeft: 5, marginTop: -6 }}>

                            <TouchableOpacity style={styles.minus_btn} color={COLORS.black} onPress={decrease} ><Text style={{ color: COLORS.black, padding: 3, fontSize: 20, marginTop: -7 }}>-</Text></TouchableOpacity>
                            <TextInput placeholder="%" value={tempNum} onChangeText={handleOnTextChange} style={[styles.plus_minus_text, { backgroundColor: COLORS.gray3 }]} >{count}</TextInput>
                            <TouchableOpacity style={styles.plus_btn} onPress={increase} ><Text style={{ color: COLORS.black, padding: 3, fontSize: 15, marginTop: -3, paddingHorizontal: 4 }}>+</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor: COLORS.gray3, marginTop: 10, alignItems: "center" }}>
                        <TouchableOpacity style={styles.sub_btn} >
                            <Text style={[FONTS.h5, { fontWeight: "bold", color: COLORS.black,letterSpacing:1 }]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
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
                    Alert.alert("Modal has been closed.");
                    settaskModal(!taskModal);
                }}>
                <View style={styles.modal_container}>
                    <Pressable style={{ alignSelf: "flex-end", marginLeft: 320, marginTop: 10, left: -8, top: -12 }} onPress={() => settaskModal(!taskModal)}><Entypo name="cross" color={"#106853"} size={25} /></Pressable>
                    <AccordionList
                        list={list}
                        header={_head}
                        isExpanded={false}
                        body={_body}
                        keyExtractor={item => `${item.id}`}
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
        borderRadius: 25,
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
        borderRadius: 77,
        elevation: 2,


    },
    modal_container: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        flex: 1,
        borderColor: "#B7EEE1",
        backgroundColor: COLORS.white,
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
        backgroundColor: COLORS.white,
        borderRadius: 5,
        padding: 3,
        elevation: 1,
        alignItems: "center",
        height: 28,
        width: 55,
        paddingBottom:5
    },
    form_container: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#99CCC0",
        padding: 10,
        justifyContent: "center",
        borderRadius: 12,
        backgroundColor: COLORS.gray3,
        flexDirection: "column",
        // height:160,
        // marginVertical:20


    },
    plus_btn: {
        backgroundColor: COLORS.white,
        color: "white",
        borderRadius: 10,
        paddingHorizontal: 1,
        borderColor: COLORS.darkBlue,
        justifyContent: "center",
        margin: 2,

    },
    minus_btn: {
        backgroundColor: COLORS.white,
        color: "white",
        borderColor: COLORS.darkBlue,
        paddingHorizontal: 3,
        marginTop: 2,
        borderRadius: 10,
        fontSize: 20,
        alignItems: "center",
        alignSelf: "center",
        margin: 3,
        justifyContent: "center"

    },
    plus_minus_text: {
        height: 25,
        paddingTop: -19,
        textAlign: "center",
        width: 50,
        marginLeft: -2,
        backgroundColor: "#9ab"
    }

})
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
} from 'react-native'
import React from 'react'
import { AccordionList } from 'accordion-collapse-react-native';
import { TextInput } from 'react-native-paper';
import FormInput from '../../../Components/FormInput'
import { icons, COLORS, SIZES } from '../../../constants';

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

function TaskModal({ taskModal, settaskModal }) {

    const [perticuler, setperticuler] = React.useState('')

    const [list, setlist] = React.useState(data.list)
    const [count, setCount] = React.useState(0)
    const [Num, setNum] = React.useState(0)
    const [tempNum, settempNum] = React.useState(null)


    const _head = (item) => {
        return (
            <View style={styles.header} key={item.key}>
                <View >
                    <Text style={{ textAlign: "center" }}>{item.title}</Text>
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
        // console.log(e.target);
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
                <View style={styles.form_container}>
                    <View style={{ backgroundColor: "whitesmoke", flexDirection: "row", justifyContent: "space-between" }}>
                        <Text >Date: </Text>
                        <Text >Time: </Text>
                    </View>
                    <View>
                        {/* <Text>Particular: </Text> */}
                        <FormInput
                            placeholder="Perticuler"
                            onChange={value => {
                                setperticuler(value);
                            }}

                            appendComponent={
                                <View style={{ justifyContent: 'center' }}>
                                    <Image
                                        source={icons.correct}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: COLORS.green
                                        }}
                                    />
                                </View>
                            }
                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 30 }}>
                        <View>
                            <Text style={{fontWeight:"bold"}}>Working in Percent:</Text>
                        </View>
                        <View style={{ flexDirection: "row", height: 25, marginLeft: 5, marginTop: -6 }}>
                 
                            <TouchableOpacity style={styles.minus_btn} color={COLORS.darkBlue}  onPress={decrease} ><Text style={{color:COLORS.white,padding:3}}>-</Text></TouchableOpacity>
                            <TextInput placeholder="%" value={tempNum} onChangeText={handleOnTextChange} style={styles.plus_minus_text} >{count}</TextInput>
                            <TouchableOpacity style={styles.plus_btn} onPress={increase} ><Text style={{color:COLORS.white,padding:3}}>+</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor:COLORS.lightGray1, marginTop: 50, alignItems: "center" }}>
                        <TouchableOpacity style={styles.sub_btn} >
                            <Text style={{color:COLORS.white2,padding:3}}>Submit</Text>
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
                    <TouchableOpacity style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding }} onPress={() => settaskModal(!taskModal)}><Text>hide</Text></TouchableOpacity>
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
export default TaskModal
const styles = StyleSheet.create({
    header: {
        borderWidth: 1,
        borderColor: "transparent",
        padding: 8,
        borderRadius: 2,
        margin: 2,
        // marginTop: 10,
        backgroundColor: "transparent",
        elevation: 1
    },
    body_container: {
        // alignSelf: "flex-start",
        marginHorizontal: 10,
        backgroundColor: COLORS.gray2,
    },
    modal_container: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        flex: 1,
        backgroundColor:COLORS.gray3,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 200
    },
    textinputs: {
        fontSize: 13,
        // fontWeight: "bold",
        width: 100,
        marginLeft: 10,
        // backgroundColor: "transparent",
        height: 20,
        // padding: 2,
        paddingBottom: 5,
        elevation: 1,
        marginTop: -5,
    },
    sub_btn: {
        borderWidth: 1,
        borderColor: COLORS.gray2,
        backgroundColor: COLORS.darkBlue,
        borderRadius: 5,
        padding:3,
        elevation: 1,
        alignItems:"center",  
        width: 60 
    },
    form_container: {
        flex: 1,
        borderWidth: 1,
        borderColor: "transparent",
        padding: 10,
        justifyContent: "center",
        borderRadius: 2,
        // paddingHorizontal: 80,
        backgroundColor: COLORS.lightGray1,
        elevation: 1,
        // alignItems:"center",
        flexDirection: "column",
        // flexWrap: "wrap"
    },
    plus_btn: {
        backgroundColor: COLORS.blue,
        color: "white",
        // padding:1,
        justifyContent: "center",
        margin:2,
    },
    minus_btn: {
        backgroundColor: COLORS.blue,
        color: "white",
        // padding:4,  
        
        margin:2,
        justifyContent: "center"

    },
    plus_minus_text: {
        height: 25,
        paddingTop: -19,
        textAlign: "center",
        width:50
    }

})
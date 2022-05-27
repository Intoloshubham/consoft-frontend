import {
    View, Text, Modal, TouchableOpacity, Alert, Pressable, StyleSheet, ScrollView, FlatList, Image
} from 'react-native'
import React from 'react'
import { icons, COLORS, SIZES, FONTS, dummyData } from '../../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import { CheckBox, Layout, Card } from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign'



function DoneModal({ doneModal, setdoneModal }) {

    const comp_tasks_var = [
        {
            id: 1,
            name: "Task 1",
            icon: require("../../../../assets/icons/completed.png")
        },
        {
            id: 2,
            name: "Task 2",
            icon: require("../../../../assets/icons/completed.png")
        },
        {
            id: 3,
            name: "Task 3",
            icon: require("../../../../assets/icons/completed.png")
        },
        {
            id: 4,
            name: "Task 4",
            icon: require("../../../../assets/icons/completed.png")
        }

    ]



    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: COLORS.gray3, padding: SIZES.base, borderRadius: 10, margin: 5}}>
            <View
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginHorizontal: -50 }}
            >
                <Image
                    resizeMode='contain'
                    style={{ width: 30, height: 30 }}
                    source={item.icon} />
                <View>
                    <Text style={{ fontWeight: "bold", color: COLORS.black }}>{item.name}</Text>
                </View>
                <TouchableOpacity>
                    <AntDesign name="rightcircleo" color={"#106853"} size={25} />
                </TouchableOpacity>
            </View>
        </View>
    );

    function Modalfunction() {
        return (
            <Card style={{ flex: 1, borderColor: "whitesmoke",backgroundColor: COLORS.gray2, marginVertical: SIZES.width *0.55, marginHorizontal: SIZES.base, borderRadius: SIZES.largeTitle }}>
                <View style={{ marginVertical: SIZES.base, marginRight: -250 }}>
                    <Pressable style={{ backgroundColor: COLORS.gray2, borderRadius: SIZES.padding, marginLeft: SIZES.width * 0.8, marginTop: -15 }} onPress={() => setdoneModal(!doneModal)}><Entypo name="cross" color={COLORS.black} size={25} /></Pressable>
                </View>
                <View style={[{ alignItems: "center",marginVertical: -SIZES.h2 }]}>
                    <Text style={[styles.title, { ...FONTS.h2 }]}>Completed Tasks !</Text>
                </View>

                <View style={{ marginTop: SIZES.h1, marginLeft: -15 }} >
                    <FlatList
                        data={comp_tasks_var}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </Card>
        )
    }



    return (
        <>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={doneModal}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setDoneModal(!doneModal);
                    }}>
                    {Modalfunction()}
                </Modal>
   
        </>
    )
}
export default DoneModal

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        color: COLORS.black
    }

})
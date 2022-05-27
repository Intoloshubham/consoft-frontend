import {
    View, Text, Modal, TouchableOpacity, Alert, Pressable, StyleSheet, ScrollView, FlatList, Image
} from 'react-native'
import React from 'react'
import { icons, COLORS, SIZES, FONTS, dummyData } from '../../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import { CheckBox, Layout, Card } from '@ui-kitten/components';

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
        } 
        ,
        {
            id: 3,
            name: "task 3",
            icon: require("../../../../assets/icons/completed.png")
        }
        ,
        {
            id: 4,
            name: "task 4",
            icon: require("../../../../assets/icons/completed.png")
        }
        ,
        {
            id: 5,
            name: "task 5",
            icon: require("../../../../assets/icons/completed.png")
        }
    ]

    

    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: COLORS.transparent }}>    
                <TouchableOpacity                              
                >
                    <Image
                        resizeMode='contain'
                        style={{ width: 50, height: 50 }}
                        source={item.icon} />                
                </TouchableOpacity>           
        </View>
    );
    
    function Modalfunction() {
        return (
            <Card style={{ flex: 1, borderColor: "black", marginVertical: SIZES.width / 2, marginHorizontal: SIZES.base, borderRadius: SIZES.largeTitle }}>
                <View style={{ marginVertical: SIZES.base, marginRight: -250 }}>
                    <Pressable style={{ backgroundColor: COLORS.white2, borderRadius: SIZES.padding, marginLeft: SIZES.width * 0.8,marginTop:-15 }} onPress={() => setdoneModal(!doneModal)}><Entypo name="cross" color={COLORS.black} size={25} /></Pressable>
                </View>
                <View style={[{alignItems:"center"}]}>
                    <Text style={[styles.title,{...FONTS.h2}]}>Completed Tasks</Text>
                </View>
        
                <View style={{ marginTop: 12, marginLeft: -15 }} >
                            <FlatList 
                                data={dummyData.Active_tasks}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View>    
            </Card>
        )
    }



    return (
        <>

            <View style={{ backgroundColor: COLORS.red }}>
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
            </View>
        </>
    )
}
export default DoneModal

const styles = StyleSheet.create({
    title:{
        fontWeight:"bold",
        color:COLORS.blue
    }

})
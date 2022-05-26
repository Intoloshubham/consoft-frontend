import {
    View, Text, Modal, TouchableOpacity, Alert, Pressable, StyleSheet, ScrollView, FlatList, Image
} from 'react-native'
import React from 'react'
import { icons, COLORS, SIZES, FONTS, dummyData } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'

function DoneModal({ doneModal, setdoneModal }) {



    function Modalfunction() {
        return (
            <View style={{ backgroundColor: COLORS.white, flex: 1, marginVertical: SIZES.width / 2, marginHorizontal: SIZES.base, borderRadius: SIZES.largeTitle }}>
                <View style={{ marginVertical: SIZES.base, marginRight: SIZES.base }}>
                    <Pressable style={{ borderRadius: SIZES.padding, alignItems: "flex-end", marginLeft: 330 }} onPress={() => setdoneModal(!doneModal)}><Entypo name="cross" color={COLORS.transparentBlack7} size={25} /></Pressable>
                </View>
                <View>
                    <View>
                        <Text >Completed Tasks</Text>
                    </View>
                </View>
            </View>
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
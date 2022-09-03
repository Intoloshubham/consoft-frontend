import React, { useState, useEffect, useRef } from 'react'
import {
    View, Animated,
    Easing, Switch,
    Text, FlatList,
    StyleSheet, Image,
    ScrollView, Modal,Button,
    Pressable, TextInput, TouchableWithoutFeedback,
    TouchableOpacity, LogBox, LayoutAnimation, ImageBackground
} from 'react-native'
import styles from '../../ReportStyle.js'
import { Title, Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../../../constants'

const TAndP = () => {
    const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view } = styles
    //T & P collapse
    const [tAndP, setTAndP] = useState(false)
    const [TAndPModal, setTandPModal] = useState(false)


    const add_tAndP_icon_button = () => {
        return (
            <TouchableOpacity
                style={{
                    // backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius * 0.2,
                    justifyContent: "center",
                    flexDirection: "row",
                    paddingHorizontal: 2,
                }}
                onPress={() => {
                    // stockEntry.splice(0, stockEntry.length);
                    setTandPModal(true);
                }}>
                <View style={{
                    alignSelf: "center",
                    alignItems: "center",
                    position: "absolute",
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    backgroundColor: COLORS.lightblue_400,
                    padding: SIZES.base * 0.1,
                    paddingHorizontal: 2,
                    paddingVertical: -2,
                    borderRadius: 5,
                    top: -SIZES.base * 1.2
                }}>
                    <View>
                        <Text style={[FONTS.body5, { color: COLORS.white }]}>Add</Text>
                    </View>
                    <View>
                        <MaterialIcons
                            name='add'
                            size={15}
                            color={COLORS.white}
                        />
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
    const add_TAndP_modal = () => {

        return (

            <Modal visible={TAndPModal} transparent={false} animationType="slide">
                <View
                    style={{ flex: 1, backgroundColor: COLORS.transparentBlack1 }}
                >
                    <View style={{ flex: 1, backgroundColor: '#000000aa', padding: 10 }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: '#fff',
                                marginTop: 50,
                                borderRadius: 20,
                                padding: 22,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    justifyContent: 'space-between',
                                }}>
                                <Title>Add Tools and Machinery</Title>
                                <Pressable onPress={() => {
                                    // inputs.splice(0, inputs.length);
                                    setTandPModal(false);
                                }}>
                                    <AntDesign name="close" size={30} color={COLORS.black} />
                                </Pressable>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 10,
                                }}> 
                                <TouchableOpacity
                                    style={{ borderWidth: 1, borderRadius: 5, borderColor: COLORS.gray, paddingHorizontal: 2, marginVertical: 2 }}
                                    onPress={() => {
                                        // addStockInputHandler();
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingVertical: 1
                                        }}>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkGray }}>Add Existing</Text>
                                        <MaterialIcons
                                            name="add-box"
                                            size={20}
                                            color={COLORS.green}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1, borderRadius: 2, paddingVertical: 1, marginVertical: 3,
                                        paddingHorizontal: 4
                                    }}
                                    onPress={() => {
                                        // setAddNewMaterial(true);
                                    }}>
                                    <Text style={{ ...FONTS.h3, color: COLORS.darkGray }}>Add New Tools/Machine</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                {/* {add_stock_input()} */}
                            </View>
                            <Button
                                title="submit"
                                onPress={() => {
                                    postTAndPDataItems();
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


    return (
        <>
            {/* T & P */}
            <Pressable
                onPress={() => setTAndP(!tAndP)}
                style={{
                    flexDirection: "row",
                    paddingHorizontal: SIZES.base,
                    paddingVertical: 3,
                    width: SIZES.width * 0.53,
                    alignItems: "center",
                    justifyContent: "space-between",
                    top: SIZES.base * 2,
                    borderColor: COLORS.lightblue_200,
                    borderWidth: 1,
                    borderRadius: 1,
                    elevation: 1
                }}>
                <View style={{ alignItems: "center", alignSelf: "center" }}>
                    <Text onPress={() => setTAndP(!tAndP)} style={[FONTS.h3, { color: COLORS.darkGray }]}>T & P</Text>
                </View>
                <View style={{ alignItems: "center", alignSelf: "center" }}>
                    <TouchableOpacity onPress={() => setTAndP(!tAndP)}>
                        <AntDesign name='caretdown' size={12} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>
            </Pressable>
            <View
                style={{
                    alignSelf: "center",
                    flexDirection: "row",
                    right: SIZES.base * 2,
                }}
            >
                {
                    tAndP?
                <View style={{ backgroundColor: "blue",paddingLeft:140 }}>
                    {add_tAndP_icon_button()}
                </View>:null
                }
                {add_TAndP_modal()}
            </View>
        </>
    )
}

export default TAndP
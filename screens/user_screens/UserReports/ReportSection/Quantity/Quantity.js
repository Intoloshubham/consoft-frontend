import React, { useState, useEffect, useRef } from 'react'
import {
    View, Animated,
    Easing, Switch,
    Text, FlatList,
    StyleSheet, Image,
    ScrollView, Modal,
    Pressable, TextInput, TouchableWithoutFeedback,
    TouchableOpacity, LogBox, LayoutAnimation, ImageBackground
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from '../../ReportStyle.js'
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../../../constants'

const Quantity = () => {
    const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view } = styles
    //Quantity collapse
    const [quantity, setQuantity] = useState(false)
    return (
        <>
            {/* Quantity */}
            <Pressable
                onPress={() => setQuantity(!quantity)}
                style={{
                    flexDirection: "row",
                    paddingHorizontal: SIZES.base,
                    width: SIZES.width * 0.35,
                    alignItems: "center",
                    justifyContent: "space-between",
                    top: SIZES.base * 2,
                    borderColor: COLORS.lightblue_200,
                    borderWidth: 1,
                    borderRadius: 1,
                    elevation: 1
                }}>
                <View style={{ alignItems: "center", alignSelf: "center" }}>
                    <Text onPress={() => setQuantity(!quantity)} style={[FONTS.h3, { color: COLORS.darkGray }]}>Quantity</Text>
                </View>
                <View style={{ alignItems: "center", alignSelf: "center" }}>
                    <TouchableOpacity onPress={() => setQuantity(!quantity)}>
                        <AntDesign name='caretdown' size={12} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>
            </Pressable>
        </>
    )
}

export default Quantity
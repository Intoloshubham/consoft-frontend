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
import styles from '../../ReportStyle.js'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../../../constants'

const Stock = () => {
    const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view } = styles
      //Stock collapse
  const [stockCollapse, setStockCollapse] = useState(false)
    return (
        <>
            {/* Stock */}
            <Pressable
                onPress={() => setStockCollapse(!stockCollapse)}
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
                    elevation:1
                }}>
                <View style={{ alignItems: "center", alignSelf: "center" }}>
                    <Text onPress={() => setStockCollapse(!stockCollapse)} style={[FONTS.h3, { color: COLORS.darkGray }]}>Stock</Text>
                </View>
                <View style={{ alignItems: "center", alignSelf: "center" }}>
                    <TouchableOpacity onPress={() => setStockCollapse(!stockCollapse)}>
                        <AntDesign name='caretdown' size={12} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>
            </Pressable>
        </>
    )
}

export default Stock
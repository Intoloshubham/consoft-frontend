import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    View,
    Animated,
    Easing,
    Switch,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
    Pressable,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    LogBox,
    LayoutAnimation,
    ImageBackground,
} from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    dummyData,
    icons,
    images,
} from '../../../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../ReportStyle.js';
import {
    EditDeletebuttons,
    ManPowerProjectTeam,
    ManpowerUserContractors,
} from '../../../index.js';
import { Get_Contractor_Data } from '../../ReportApi.js';



const Manpower = ({ projectTeamList, ProList, Main_drp_pro_value, loading }) => {

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);
    const {
        header,
        con_body,
        input,
        body_del,
        body_edit,
        body_del_btn,
        body_edit_btn,
        body_ed_de_view,
    } = styles;

    // console.log("Manpower")
    // console.log("🚀 ~ file: Manpower.js ~ line 56 ~ Manpower ~ projectTeamList", projectTeamList)
    // console.log("🚀 ~ file: Manpower.js ~ line 58 ~ Manpower ~ ProList", ProList)
    // console.log("🚀 ~ file: Manpower.js ~ line 60 ~ Manpower ~ Main_drp_pro_value", Main_drp_pro_value)
    //Manpower collapse
    const [TabCollapse, setTabCollapse] = useState(false)

    return (
        <>


            <Pressable
                onPress={() => setTabCollapse(!TabCollapse)}
                style={{
                    flexDirection: "row",
                    paddingHorizontal: SIZES.base,
                    paddingVertical: 3,
                    // marginBottom: -SIZES.base,
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
                {/* <Text>
                    <ReactBubblyEffectButton
                        text="Click here"
                        style={[FONTS.h3, { color: COLORS.darkGray }]}
                        color='#fff' bgColor={COLORS.lightblue_300}
                        onClick={() => setTabCollapse(!TabCollapse)} />
                </Text> */}
                    <Text onPress={() => setTabCollapse(!TabCollapse)} style={[FONTS.h3, { color: COLORS.darkGray }]}>Manpower</Text>
                </View>

                <View style={{ alignItems: "center", alignSelf: "center" }}>
                    <TouchableOpacity onPress={() => setTabCollapse(!TabCollapse)}>
                        <AntDesign name='caretdown' size={12} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>

            </Pressable>
            {TabCollapse ? <View style={{ justifyContent: "space-evenly" }}>
                <View>
                    {/* project team start */}
                    <ManPowerProjectTeam projectTeamList={projectTeamList} Main_drp_pro_value={Main_drp_pro_value} loading={loading} />
                    {/* Project Team close */}
                </View>
                <View>
                    {/* Contractors start */}
                    <ManpowerUserContractors ProList={ProList} Main_drp_pro_value={Main_drp_pro_value} loading={loading} />
                    {/* Contractors close */}
                </View>

            </View> : null}
        </>
    )
}

export default Manpower;
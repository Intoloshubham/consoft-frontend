import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
    View, Animated,
    Easing, Switch,
    Text, FlatList,
    StyleSheet, Image,
    ScrollView, Modal, SectionList,
    Pressable, TextInput, TouchableWithoutFeedback, SafeAreaView,
    TouchableOpacity, LogBox, LayoutAnimation, ImageBackground, VirtualizedList
} from 'react-native'
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../../../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Get_Contractor_Data, Get_user_role } from '../../../ReportApi.js'
import styles from '../../../ReportStyle.js'
import { useSelector } from 'react-redux';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);
const ManPowerProjectTeam = ({ projectTeamList }) => {
    // console.log("ManpowerProjectTeam")
    // console.log(projectTeamList)
    //css
    const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view } = styles
    //for projectteam collapse
    const [proTeamTabCollapse, setProTeamTabCollapse] = useState(false)
    //for getting project name
    const [ProjectTeamName, setProjectTeamName] = useState('')
    //getting userrole name
    const [UserRole, setUserRole] = useState('')

    // setting setMergeRolePro
    const [mergeRolePro, setMergeRolePro] = useState('')


    const companydata = useSelector(state => state.user);

    function projectTeamName() {
        if (projectTeamList) {
            projectTeamList.map(ele => {
                let project_teams = ele.project_team
                // console.log("🚀 ~ file: ManPowerProjectTeam.js ~ line 40 ~ useMemo ~ project_teams", project_teams)

                setProjectTeamName(project_teams)
            })
        }
    }

    //getting project team names with designation
    useMemo(() => {
        projectTeamName();
    }, [projectTeamList, companydata.company_id])
    // console.log("🚀 ~ file: ManPowerProjectTeam.js ~ line 38 ~ useMemo ~ setProjectTeamName", ProjectTeamName)

    //getting role 
    // useEffect(() => {
    //     const data = Get_user_role()
    //     data.then(res => res.json())
    //         .then(result => {
    //             setUserRole(result)
    //         })
    // }, [])

    // useMemo(() => {
    //     if (UserRole && ProjectTeamName) {
    //         const MerUseRoleProjeArray = [
    //             UserRole,
    //             ...ProjectTeamName
    //         ]
    //         setMergeRolePro(MerUseRoleProjeArray)
    //     }
    // }, [UserRole, ProjectTeamName])
    // console.log(mergeRolePro)
    //   console.log("array..................")
    //project team list collapse 
    const _project_team = (item, index) => {
        // console.log("🚀 ~ file: ManPowerProjectTeam.js ~ line 70 ~ ManPowerProjectTeam ~ item", item)
        // console.log("item..4.............")
        // console.log(item);
        LayoutAnimation.easeInEaseOut();
        return (
            <>
                <TouchableOpacity
                    style={[header,
                        {
                            width: SIZES.width * 0.7,
                            justifyContent: "center",
                            alignSelf: "center"
                        }]} key={index}>
                    <View
                        style={{
                            justifyContent: "center",
                            alignSelf: "center"
                        }}
                        activeOpacity={1}>
                        <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1, textAlign: "left" }]}>{item.user_name}</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }


    return (
        <View>
            <Pressable
                onPress={() => setProTeamTabCollapse(!proTeamTabCollapse)}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 24,
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderRadius: 4,
                    width: SIZES.width * 0.72,
                    borderColor: COLORS.lightblue_300,
                    alignSelf: "center"
                }}>
                <View style={{}}>
                    <Text onPress={() => setProTeamTabCollapse(!proTeamTabCollapse)} style={[FONTS.body4, { color: COLORS.darkGray }]}>Project Team</Text>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center", marginLeft: SIZES.base * 0.5 }}>
                    <TouchableOpacity onPress={() => setProTeamTabCollapse(!proTeamTabCollapse)}>
                        <AntDesign name='caretdown' size={12} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>
            </Pressable>
            {proTeamTabCollapse &&
                (<ScrollView
                    horizontal={true}
                    contentContainerStyle={{ width: '100%', height: '100%' }}>
                    <FlatList
                        data={ProjectTeamName ? ProjectTeamName : null}
                        horizontal={false}
                        scrollEnabled={true}
                        nestedScrollEnabled={true}
                        maxHeight={100}
                        renderItem={({ item, index }) => _project_team(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>

                )
            }
        </View>
    )
}

export default ManPowerProjectTeam
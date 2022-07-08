import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
    View, Animated,
    Easing, Switch,
    Text, FlatList,
    StyleSheet, Image,
    ScrollView, Modal,
    Pressable, TextInput, TouchableWithoutFeedback,
    TouchableOpacity, LogBox, LayoutAnimation, ImageBackground
} from 'react-native'
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../../../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Get_Contractor_Data, Get_user_role } from '../../../ReportApi.js'
import styles from '../../../ReportStyle.js'

const ManPowerProjectTeam = ({ projectTeamList }) => {
    //css
    const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view } = styles
    //for projectteam collapse
    const [proTeamTabCollapse, setProTeamTabCollapse] = useState(false)
    //for getting project name
    const [ProjectTeamName, setProjectTeamName] = useState([])
    //getting userrole name
    const [UserRole, setUserRole] = useState('')


    //getting project team names with designation
    useMemo(() => {
        if (projectTeamList) {
            projectTeamList.map(ele => {
                let project_teams = ele.project_team

                setProjectTeamName(project_teams)
                // console.log(project_teams)
            })
        }
    }, [projectTeamList])

    //getting role 
    useEffect(() => {
        const data = Get_user_role()
        data.then(res => res.json())
            .then(result => {
                setUserRole(result)
            })
    }, [])


    //project team list collapse
    const _project_team = (item, index) => {
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
                    marginTop: 30,
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
                (
                    <View
                        style={{}}
                    >
                        <FlatList
                            data={ProjectTeamName}
                            horizontal={false}
                            scrollEnabled={true}
                            nestedScrollEnabled={true}
                            maxHeight={100}
                            renderItem={({ item, index }) => _project_team(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <SectionList
                            sections={ProjectTeamName}
                            keyExtractor={(item, index) => item._id}
                            renderItem={({ item }) => <Item title={item} />}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text style={styles.header}>{title}</Text>
                            )}
                        />
                    </View>
                )
            }
        </View>
    )
}

export default ManPowerProjectTeam
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
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    Get_Contractor_Data, Get_user_role,
    Get_user_name_by_role, Insert_project_team_data, Get_Project_Team_Data
} from '../../../ReportApi.js'
import { Dropdown } from 'react-native-element-dropdown';
import styles from '../../../ReportStyle.js'
import { useSelector } from 'react-redux';
import {
    IconButton, TextButton, CustomToast,
    DeleteConfirmationToast,
} from '../../../../../../Components'

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);
const ManPowerProjectTeam = ({ projectTeamList, Main_drp_pro_value }) => {
    // console.log("ManpowerProjectTeam")
    //css
    const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view, cont_Project_list_drop } = styles
    //for projectteam collapse
    const [proTeamTabCollapse, setProTeamTabCollapse] = useState(false)
    //for getting project name
    const [ProjectTeamName, setProjectTeamName] = useState('')
    //getting userrole name
    const [userRole, setUserRole] = useState([])
    const [userNameByRole, setUserNameByRole] = useState([]);
    // setting setMergeRolePro
    const [mergeRolePro, setMergeRolePro] = useState('')
    
    const [addProjectTeamModal, setAddProjectTeamModal] = useState(false);
    const userData = useSelector(state => state.user);
    
    // CUSTOM TOAST OF CRUD OPERATIONS
    const [submitToast, setSubmitToast] = React.useState(false);
    const [updateToast, setUpdateToast] = React.useState(false);
    const [deleteToast, setDeleteToast] = React.useState(false);
    
    const [deleteConfirm, setDeleteConfirm] = React.useState(false);
    

    
    const saveProjectTeamMemberSubmit = async () => {
        // post data
        const teamData = {
            project_id: Main_drp_pro_value,
            user_id: [userData._id],
            company_id: userData.company_id
        };
        const res = await Insert_project_team_data(teamData);
        console.log("🚀 ~ file: ManPowerProjectTeam.js ~ line 61 ~ saveProjectTeamMemberSubmit ~ res", res)
        if (res.status === 200) {
            setAddProjectTeamModal(false);
            setSubmitToast(true);
            fetchProjectTeam();
        } else {
            alert(res.message);
        }
        setTimeout(() => {
            setSubmitToast(false);
        }, 2000);
    }
    
    console.log("🚀 ~ file: ManPowerProjectTeam.js ~ line 76 ~ fetchProjectTeam ~ Main_drp_pro_value", Main_drp_pro_value)
    // fetch project team
    const fetchProjectTeam = async () => {
        const team = await Get_Project_Team_Data(Main_drp_pro_value);
        const temp=await team.json();
        console.log("🚀 ~ file: ManPowerProjectTeam.js ~ line 76 ~ fetchProjectTeam ~ team", temp.data)
        if (temp.status==200) {
            setProjectTeamName(temp.data);     
        }
    };
    
    console.log("🚀 ~ file: ManPowerProjectTeam.js ~ line 35 ~ ManPowerProjectTeam ~ ProjectTeamName", ProjectTeamName)
     
    useEffect(() => {
        fetchProjectTeam();
    }, [Main_drp_pro_value]);



    const addProjectTeam = async () => {
        setAddProjectTeamModal(true);
        const res = await Get_user_role(userData.company_id);
        if (res.status === 200) {
            let roleFromApi = res.data.map(list => {
                return { label: list.user_role, value: list._id };
            });
            setUserRole(roleFromApi);
        }
    };

    const getRolebyUser = async role_id => {
        const res = await Get_user_name_by_role(role_id);
        if (res.status === 200) {
            let usersFromApi = res.data.map(ele => {
                return { label: ele.name, value: ele._id };
            });
            setUserNameByRole(usersFromApi);
        }
    };



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

    //   adding project team button
    const add_project_team = () => {
        return (
            <TouchableOpacity
                style={{
                    borderRadius: SIZES.radius * 0.2,
                    justifyContent: "center",
                    flexDirection: "row",
                    paddingHorizontal: 2,

                }}
                onPress={() => {
                    LayoutAnimation.easeInEaseOut();
                    addProjectTeam();
                }}>
                <View style={{
                    alignSelf: "center"
                }}>
                    <Ionicons
                        name='person-add'
                        size={20}
                        color={COLORS.lightblue_400}
                    />
                </View>
            </TouchableOpacity>
        )
    }


    // adding project team modal
    function renderProjectTeamModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={addProjectTeamModal}>
                <TouchableWithoutFeedback>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.transparentBlack7,
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                left: SIZES.padding,
                                width: '90%',
                                padding: SIZES.padding,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.white,
                            }}>
                            <View style={{}}>
                                {/* header */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ flex: 1, fontSize: 20, color: COLORS.darkGray }}>
                                        Project Team
                                    </Text>
                                    <IconButton
                                        containerStyle={{
                                            boborderWidth: 2,
                                            borderRadius: 10,
                                            borderColor: COLORS.gray2,
                                        }}
                                        icon={icons.cross}
                                        iconStyle={{
                                            tintColor: COLORS.gray,
                                        }}
                                        onPress={() => setAddProjectTeamModal(false)}
                                    />
                                </View>
                                <ScrollView>
                                    <View>
                                        <Dropdown
                                            style={[
                                                cont_Project_list_drop,
                                                {
                                                    borderBottomColor: COLORS.lightGray1,
                                                    borderTopColor: COLORS.lightGray1,
                                                    width: 300,
                                                    justifyContent: "center"
                                                },
                                            ]}
                                            placeholderStyle={{ fontSize: 16, color: COLORS.darkGray, }
                                            }
                                            selectedTextStyle={{ color: COLORS.gray }
                                            }

                                            containerStyle={{ width: 300, borderRadius: 5, justifyContent: "center" }}
                                            inputSearchStyle={{
                                                color: COLORS.gray, height: 40, borderRadius: 5,
                                            }}
                                            iconStyle={{
                                                height: 28
                                            }}
                                            data={userRole ? userRole : null}
                                            search
                                            maxHeight={200}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={'Select role'}
                                            searchPlaceholder="Search..."
                                            value={"value"}
                                            onChange={(text) => {

                                                getRolebyUser(text.value)
                                            }} />
                                    </View>
                                    <View>
                                        <Dropdown
                                            style={[
                                                cont_Project_list_drop,
                                                {
                                                    borderBottomColor: COLORS.lightGray1,
                                                    borderTopColor: COLORS.lightGray1,
                                                    width: 300,
                                                    justifyContent: "center"
                                                },
                                            ]}
                                            placeholderStyle={{ fontSize: 16, color: COLORS.darkGray, }
                                            }
                                            selectedTextStyle={{ color: COLORS.gray }
                                            }

                                            containerStyle={{ width: 300, borderRadius: 5, justifyContent: "center" }}
                                            inputSearchStyle={{
                                                color: COLORS.gray, height: 40, borderRadius: 5,
                                            }}
                                            iconStyle={{
                                                height: 28
                                            }}
                                            data={userNameByRole ? userNameByRole : null}
                                            search
                                            maxHeight={200}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={'Select userName'}
                                            searchPlaceholder="Search..."
                                            value={"value"}
                                            onChange={item => {
                                                // getRolebyUser(item.value)
                                            }} />
                                    </View>
                                    <TextButton
                                        label="Submit"
                                        buttonContainerStyle={{
                                            height: 50,
                                            alignItems: 'center',
                                            marginTop: SIZES.padding * 2,
                                            borderRadius: SIZES.radius,
                                        }}
                                        onPress={saveProjectTeamMemberSubmit}
                                    />
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
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
            <View
                style={{
                    alignSelf: "flex-end",
                    flexDirection: "row",
                    right: SIZES.base,

                    top: -24
                }}
            >
                {/* button section adding contractor */}
                {proTeamTabCollapse ? add_project_team() : null}
            </View>
            {renderProjectTeamModal()}
            {proTeamTabCollapse &&
                (<View style={{ marginTop: -25, paddingVertical: 10, marginBottom: -10 }}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ width: '100%', height: '100%' }}>
                        <FlatList
                            data={ProjectTeamName ? ProjectTeamName : alert('Currently no team members are there!!')}
                            horizontal={false}
                            scrollEnabled={true}
                            nestedScrollEnabled={true}
                            maxHeight={100}
                            renderItem={({ item, index }) => _project_team(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>
                </View>)
            }
            <CustomToast
                isVisible={submitToast}
                onClose={() => setSubmitToast(false)}
                color={COLORS.green}
                title="Add Team"
                message="Addedd Successfully..."
            />
            <CustomToast
                isVisible={updateToast}
                onClose={() => setUpdateToast(false)}
                color={COLORS.yellow_400}
                title="Update"
                message="Updated Successfully..."
            />
            <CustomToast
                isVisible={deleteToast}
                onClose={() => setDeleteToast(false)}
                color={COLORS.rose_600}
                title="Delete"
                message="Deleted Successfully..."
            />

            <DeleteConfirmationToast
                isVisible={deleteConfirm}
                onClose={() => setDeleteConfirm(false)}
                title={'Are You Sure?'}
                message={'Do you really want to delete?'}
                color={COLORS.rose_600}
                icon={icons.delete_withbg}
                onClickYes={() => deleteTeamSubmit()}
            />

        </View>
    )
}



export default ManPowerProjectTeam
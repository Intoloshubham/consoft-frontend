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
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../../constants'
import Toast from 'react-native-toast-message';
import { FormInput, Drop, IconButton, CustomDropdown, TextButton } from '../../../../Components';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../ReportStyle.js'
import { EditDeletebuttons } from '../../index.js'
import { Divider } from '@ui-kitten/components';
import utils from '../../../../utils';
import { Get_Contractor_Data } from '../ReportApi.js'

const Manpower = ({ projectTeamList }) => {
    const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view } = styles
    //collapse item state
    const [active, setactive] = useState(null)

    const [Report_list, setReport_list] = useState('')
    //Manpower collapse
    const [TabCollapse, setTabCollapse] = useState(false)

    //dynamic Tech textbox
    const [techtextValue, setTechTextValue] = useState('');
    //dynamic Masonry textbox
    const [mastextValue, setMasTextValue] = useState('');
    //dynamic Steel binder textbox
    const [steeltextValue, setSteelTextValue] = useState('');
    //dynamic shuttering textbox
    const [shutttextValue, setShuttTextValue] = useState('');

    // all our Tech input fields are tracked with this array
    const refTechInputs = useRef([techtextValue]);

    // all our Mash input fields are tracked with this array
    const refMasonInputs = useRef([mastextValue]);
    // all our Steel input fields are tracked with this array
    const refSteelInputs = useRef([steeltextValue]);
    // all our Shuttering input fields are tracked with this array
    const refShuttInputs = useRef([shutttextValue]);
    const [con_item_id, setcon_item_id] = useState(null)
    //contractor inside report state
    const [Tech_collapse, setTech_collapse] = useState(false)
    const [Masonry_collapse, setMasonry_collapse] = useState(false)
    const [Steel_collapse, setSteel_collapse] = useState(false)
    const [Shelter_collapse, setShelter_collapse] = useState(false)


    const [conTeamTabCollapse, setConTeamTabCollapse] = useState(false)
    const [proTeamTabCollapse, setProTeamTabCollapse] = useState(false)

    const [ProjectTeamName, setProjectTeamName] = useState([])

    //contractor reports section
    const [ConReportModal, setConReportModal] = useState(false);

    // add contractor name
    const [ContractorName, setContractorName] = useState('');
    const [ContError, setContError] = useState('');
    //add contractor phone no
    const [ContractorPhone, setContractorPhone] = useState('');
    const [ContractorPhoneError, setContractorPhoneError] = useState('');



    const [Tech_staff, setTech_staff] = React.useState([
        {
            id: "0",
            name: 'Engineers',
            ischeck: false
        },
        {
            id: "1",
            name: 'Supervisors',
            ischeck: false
        },
        {
            id: "2",
            name: 'third',
            ischeck: false
        }
    ])

    const [steel_bind, setsteel_bind] = React.useState([
        {
            id: "0",
            name: "M"
        },
        {
            id: "1",
            name: "M/c"
        }
    ])

    const [shelter, setshelter] = React.useState([
        {
            id: "0",
            name: "M"
        },
        {
            id: "1",
            name: "M/c"
        }
    ])
    const [Masonry, setMasonry] = React.useState([
        {
            id: "0",
            name: "M"
        },
        {
            id: "1",
            name: "M/c"
        },
        {
            id: "2",
            name: "F/c"
        },
    ])



    

    const showToast = () =>
        Toast.show({
            position: 'top',
            type: 'success',
            text1: 'Contractor added Successfully',
            text2: 'Success',
            visibilityTime: 2000,
        });

    function Insert_Contractor_data() {
        const data = {
            contractor_name: ContractorName,
            phone_no: ContractorPhone
        }
        fetch("http://10.0.2.2:7000/api/user-contractor", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data.status)
                if (data.status == '200') {
                    setContractorName('')
                    setContractorPhone('')
                    Get_Contractor_Data()
                }
                showToast();
            })

    }



    useEffect(() => {
        const data = Get_Contractor_Data()
        data.then(res => res.json())
            .then(result => {
                setReport_list(result)
            })
    }, [])
// console.log("project team list of manpower")
//     console.log(projectTeamList)

    useEffect(() => {
        projectTeamList.map(ele => {
            let project_teams = ele.project_team

            setProjectTeamName(project_teams)
            // console.log(project_teams)
        })
    }, [])
// console.log("first")
// console.log(ProjectTeamName)
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

    //flatlist head render funciton
    //collapse contractor 
    const _head = (item, index) => {
        LayoutAnimation.easeInEaseOut();
        const open = active == index
        return (
            <>
                <TouchableOpacity style={[header, {
                    width: SIZES.width * 0.7,
                    justifyContent: "space-between",
                    alignSelf: "center",


                }]} key={item._id} onPress={() => { toggleExpanded(item, index) }} >
                    <View
                        style={{
                            width: SIZES.width * 0.7,
                            justifyContent: "center",

                            // alignSelf: "center"
                        }}
                        activeOpacity={1}>
                        <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1, textAlign: "left" }]}>
                            {item.contractor_name}
                        </Text>
                    </View>
                    {/* <View style={{ marginLeft: 24 * 2, alignSelf: "center", top: -5 }}>
            {schedular_section(item)}
          </View> */}
                    <View style={{ justifyContent: "center", alignSelf: "center", left: -40 }}>
                        <EditDeletebuttons edit_size={15} del_size={18} />
                    </View>
                </TouchableOpacity>
                <View>
                    {open && item.id == con_item_id ? _body(item, index) : null}
                </View>
            </>
        );
    }

    //contractor collapse button click code
    const toggleExpanded = (item, index) => {

        setcon_item_id(item.id);
        setactive(index == active ? null : index);
        // setactive(!active)

    };

    //flatlist head>body code for rendering contractor
    const _body = (item, index) => {
        return (
            <View style={con_body}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        borderWidth: 1,
                        borderColor: COLORS.lightblue_400,
                        height: SIZES.width * 0.3,
                        width: SIZES.width * 0.7,
                        alignSelf: "center",
                        paddingLeft: SIZES.base,
                        position: "relative",
                        top: 2,
                    }}
                >
                    <ScrollView nestedScrollEnabled={true} maxHeight={100} scrollEnabled={true}>
                        <Divider style={{ backgroundColor: COLORS.lightGray1, width: SIZES.width * 0.85, marginHorizontal: 2, top: 5 }} />
                        <View style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            marginTop: 15,
                            marginLeft: 2,
                            height: SIZES.width * 0.65,
                            width: SIZES.width * 0.85,
                        }}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => setTech_collapse(!Tech_collapse)}
                                >
                                    <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1 }]}>Technical Staff</Text>
                                </TouchableOpacity>
                            </View>
                            {Tech_collapse ? <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 105 }}>
                                {Tech_staff.map((item, i) => {

                                    return (
                                        <View style={{ flex: 1 }} key={i}>

                                            <Pressable
                                                key={i}
                                                // onPress={() => onValueChange(item, index)}
                                                style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                                <View style={{ flexDirection: "row", alignItems: "center", height: 25 }}>
                                                    {/* <View style={{ alignSelf: "center" }}>
                                <CheckBox
                                  value={item.isCheck}
                                  onValueChange={(newValue) => onValueChange(item, index)}
                                  key={item.name}
                                />
                              </View> */}
                                                    <Text style={[FONTS.body5, { color: COLORS.darkGray, letterSpacing: 1 }]}>{item.name}</Text>
                                                    <View
                                                        style={{
                                                            position: "absolute",
                                                            left: 100,
                                                            right: -100,
                                                            top: -12,
                                                            bottom: 0,
                                                            alignSelf: "center",
                                                            margin: -5
                                                        }}>
                                                        <View key={i} style={{ flexDirection: "row", alignItems: "center" }} >
                                                            <Text style={{ top: 18 }}>{i}</Text>
                                                            <View>
                                                                <TextInput
                                                                    style={{ width: 100, borderWidth: 1, height: 20, top: 18, left: 18, padding: 4 }}
                                                                    onChangeText={value => setTechInputValue(i, value)}
                                                                    value={refTechInputs.current[i]}
                                                                    placeholder={"Tech_staff"}
                                                                    keyboardType="numeric"
                                                                />
                                                            </View>
                                                            {/* to remove the inputes */}
                                                            <View>
                                                                <Pressable onPress={() => SubTechInput(i)} style={{ marginLeft: 20, top: 18 }}>
                                                                    <AntDesign name='pluscircleo' size={18} color="red"></AntDesign>
                                                                </Pressable>
                                                            </View>
                                                        </View>

                                                    </View>
                                                </View>
                                            </Pressable>
                                            {/* <TouchableOpacity onPress={()=>getSelectedValue(item)}><Text>getdata</Text></TouchableOpacity> */}
                                        </View>
                                    )
                                })}
                            </ScrollView> : null}
                            <View>
                                <TouchableOpacity
                                    onPress={() => setMasonry_collapse(!Masonry_collapse)}
                                >
                                    <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1 }]}>Masonry</Text>
                                </TouchableOpacity>
                            </View>
                            {Masonry_collapse ? <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 55 }}>
                                {Masonry.map((item, i) => {
                                    return (
                                        <View key={i}>
                                            <View
                                                key={i}
                                                style={{ maxHeight: 25 }}>
                                                <Pressable
                                                    key={i}
                                                    // onPress={() => onMasonryChange(item, index)}
                                                    style={{ flexDirection: "row", alignItems: "center" }}
                                                >
                                                    {/* <CheckBox
                                value={item.isCheck}
                                onValueChange={(newValue) => onMasonryChange(item, index)}
                                key={item.id}
                              /> */}
                                                    <View
                                                        style={{
                                                            position: "absolute",
                                                            left: 70,
                                                            right: -100,
                                                            top: -4,
                                                            bottom: 0,
                                                            alignSelf: "center"
                                                        }}>
                                                        <View key={i} style={{ flexDirection: "row", alignItems: "center" }} >
                                                            <Text style={{ top: 18 }}>{i}</Text>
                                                            <View>
                                                                <TextInput
                                                                    style={{ width: 100, borderWidth: 1, height: 20, top: 18, left: 18, padding: 4 }}
                                                                    onChangeText={value => setMasonInputValue(i, value)}
                                                                    value={refMasonInputs.current[i]}
                                                                    placeholder={"Mason"}
                                                                    keyboardType="numeric"
                                                                />
                                                            </View>
                                                            {/* to remove the inputes */}
                                                            <View>
                                                                <Pressable onPress={() => SubMasonInput(i)} style={{ marginLeft: 20, top: 18 }}>
                                                                    <AntDesign name='pluscircleo' size={18} color="red"></AntDesign>
                                                                </Pressable>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <Text style={[FONTS.body5, { color: COLORS.darkGray, letterSpacing: 1 }]}>{item.name}</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    )
                                })}
                            </ScrollView> : null}
                            <View>
                                <TouchableOpacity
                                    onPress={() => setSteel_collapse(!Steel_collapse)}
                                >
                                    <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1 }]}>Steel Binder</Text>
                                </TouchableOpacity>
                            </View>
                            {Steel_collapse ? <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 50 }}>
                                {steel_bind.map((item, i) => {
                                    return (
                                        <View key={i} style={{ height: 25, paddingVertical: -20 }}>
                                            <Pressable
                                                key={i}
                                                // onPress={() => onSteelChange(item, index)}
                                                style={{ flexDirection: "row", alignItems: "center" }}
                                            >
                                                {/* <CheckBox
                              value={item.isCheck}
                              onValueChange={(newValue) => onSteelChange(item, index)}
                              key={item.id}
                            /> */}
                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        left: 70,
                                                        right: -100,
                                                        top: -4,
                                                        bottom: 0,
                                                        alignSelf: "center"
                                                    }}>
                                                    <View key={i} style={{ flexDirection: "row", alignItems: "center" }} >
                                                        <Text style={{ top: 18 }}>{i}</Text>
                                                        <View>
                                                            <TextInput
                                                                style={{ width: 100, borderWidth: 1, height: 20, top: 18, left: 18, padding: 4 }}
                                                                onChangeText={value => setSteelInputValue(i, value)}
                                                                value={refSteelInputs.current[i]}
                                                                placeholder={"Steel"}
                                                                keyboardType="numeric"
                                                            />
                                                        </View>
                                                        {/* to remove the inputes */}
                                                        <View>
                                                            <Pressable onPress={() => SubSteelInput(i)} style={{ marginLeft: 20, top: 18 }}>
                                                                <AntDesign name='pluscircleo' size={18} color="red"></AntDesign>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text style={[FONTS.body5, { color: COLORS.darkGray, letterSpacing: 1 }]}>{item.name}</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    )
                                })}
                            </ScrollView> : null}
                            <View>
                                <TouchableOpacity
                                    onPress={() => setShelter_collapse(!Shelter_collapse)}
                                >
                                    <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1 }]}>Shuttering</Text>
                                </TouchableOpacity>
                            </View>
                            {Shelter_collapse ? <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 90 }}>
                                {shelter.map((item, i) => {
                                    return (
                                        <View
                                            key={i}
                                        >
                                            <Pressable
                                                key={index}
                                                // onPress={() => onShelterChange(item, index)}
                                                style={{ flexDirection: "row", alignItems: "center" }}
                                            >
                                                {/* <CheckBox
                              value={item.isCheck}
                              onValueChange={(newValue) => onShelterChange(item, index)}
                              key={item.id}
                            /> */}
                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        left: 70,
                                                        right: -100,
                                                        top: -4,
                                                        bottom: 0,
                                                        alignSelf: "center"
                                                    }}>
                                                    <View key={i} style={{ flexDirection: "row", alignItems: "center" }} >
                                                        <Text style={{ top: 18 }}>{i}</Text>
                                                        <View>
                                                            <TextInput
                                                                style={{ width: 100, borderWidth: 1, height: 20, top: 18, left: 18, padding: 4 }}
                                                                onChangeText={value => setShuttInputValue(i, value)}
                                                                value={refShuttInputs.current[i]}
                                                                placeholder={"Shuttering"}
                                                                keyboardType="numeric"
                                                            />
                                                        </View>
                                                        {/* to remove the inputes */}
                                                        <View>
                                                            <Pressable onPress={() => SubShuttInput(i)} style={{ marginLeft: 20, top: 18 }}>
                                                                <AntDesign name='pluscircleo' size={18} color="red"></AntDesign>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                </View>
                                                <Text style={[FONTS.body5, { color: COLORS.darkGray, letterSpacing: 1, fontSize: 14 }]}>{item.name}</Text>
                                            </Pressable>
                                        </View>
                                    )
                                })}
                            </ScrollView> : null}
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }

    //dynamic textinput data
    //for Technical staff
    const setTechInputValue = (index, value) => {
        //first we are storing input value to refinputs array to track them
        const inputs = refTechInputs.current;
        inputs[index] = value;
        //we r also setting text value to input field onchangetext
        setTechTextValue(value)
    }

    //for Masonry 
    const setMasonInputValue = (index, value) => {
        //first we are storing input value to refinputs array to track them
        const inputs = refMasonInputs.current;
        inputs[index] = value;
        //we r also setting text value to input field onchangetext
        setMasTextValue(value)
    }
    //for Steel Binder
    const setSteelInputValue = (index, value) => {
        //first we are storing input value to refinputs array to track them
        const inputs = refSteelInputs.current;
        inputs[index] = value;
        //we r also setting text value to input field onchangetext
        setSteelTextValue(value)
    }
    //for Shuttering
    const setShuttInputValue = (index, value) => {
        //first we are storing input value to refinputs array to track them
        const inputs = refShuttInputs.current;
        inputs[index] = value;
        //we r also setting text value to input field onchangetext
        setShuttTextValue(value)
    }


    //submit tech when button is pressed
    const SubTechInput = (i) => {

        alert(refTechInputs.current[i])

    }

    //submit Mason when button is pressed
    const SubMasonInput = (i) => {

        alert(refMasonInputs.current[i])

    }
    //submit Steel when button is pressed
    const SubSteelInput = (i) => {

        alert(refSteelInputs.current[i])

    }
    //submit Shuttering when button is pressed
    const SubShuttInput = (i) => {

        alert(refShuttInputs.current[i])
        // refInputs.current.splice(i, 1)[0];
        //decrease the number of inputs
        // setNumInputs(value => value - 1)
    }


    //inside contractor item list data
    const render_con_list = (item, index) => {
        return (
            <>

            </>
        )
    }

    function isEnableSubmit() {
        return (
            ContractorName != '' &&
            ContError == '' &&
            ContractorPhone != '' &&
            ContractorPhoneError == ''
        );
    }

    //create contractor model   
    function renderCreateContractorModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={ConReportModal}>

                <TouchableWithoutFeedback onPress={() => setConReportModal(false)}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.transparentBlack7,
                        }}>
                        <Toast config={showToast} />
                        <View
                            style={{
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.white,
                                position: 'absolute',
                                left: 0,
                                top: 100,
                                width: '100%',
                                height: '100%',
                                padding: SIZES.padding,
                                borderTopRightRadius: SIZES.radius,
                                borderTopLeftRadius: SIZES.radius,
                                backgroundColor: COLORS.white,
                            }}>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ flex: 1, ...FONTS.h2, color: COLORS.darkGray }}>
                                        Add New Contractor
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
                                        onPress={() => setConReportModal(false)}
                                    />
                                </View>
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{
                                        paddingBottom: 250,
                                    }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            marginTop: SIZES.padding,
                                            marginHorizontal: SIZES.base,
                                        }}>
                                        <FormInput
                                            placeholder="Contractor Name"
                                            onChange={value => {
                                                //validate email

                                                utils.validateText(value, setContError);
                                                setContractorName(value);
                                            }}
                                            value={ContractorName}
                                            errorMsg={ContError}
                                            appendComponent={
                                                <View style={{ justifyContent: 'center' }}>
                                                    <Image
                                                        source={
                                                            ContractorName == '' || (ContractorName != '' && ContError == '')
                                                                ? icons.correct
                                                                : icons.cancel
                                                        }
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            tintColor:
                                                                ContractorName == ''
                                                                    ? COLORS.gray
                                                                    : ContractorName != '' && ContError == ''
                                                                        ? COLORS.green
                                                                        : COLORS.red,
                                                        }}
                                                    />
                                                </View>
                                            }
                                        />
                                        <FormInput
                                            label="Phone no."
                                            keyboardType="numeric"
                                            autoCompleteType="cc-number"
                                            value={ContractorPhone}
                                            onChange={value => {
                                                utils.validateNumber(value, setContractorPhoneError);
                                                setContractorPhone(value);
                                            }}
                                            errorMsg={ContractorPhoneError}
                                            appendComponent={
                                                <View style={{ justifyContent: "center" }}>
                                                    <Image
                                                        source={ContractorPhone == '' ||
                                                            (ContractorPhone != '' && ContractorPhoneError == '')
                                                            ? icons.correct :
                                                            icons.cancel
                                                        }
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            tintColor: ContractorPhone == '' ? COLORS.gray :
                                                                (ContractorPhone !== '' && ContractorPhoneError == '')
                                                                    ? COLORS.green :
                                                                    COLORS.red
                                                        }}
                                                    />

                                                </View>
                                            }
                                        />

                                        <TextButton
                                            label="Submit"
                                            disabled={isEnableSubmit() ? false : true}
                                            buttonContainerStyle={{
                                                height: 55,
                                                alignItems: 'center',
                                                marginTop: SIZES.padding,
                                                borderRadius: SIZES.radius,
                                                backgroundColor: isEnableSubmit()
                                                    ? COLORS.lightblue_700
                                                    : COLORS.lightblue_100,
                                            }}
                                            onPress={() => {
                                                Insert_Contractor_data()
                                            }
                                            }
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }


    //button add contractor function
    const add_contractor = () => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius * 0.2,
                    justifyContent: "center",
                    flexDirection: "row",
                    paddingHorizontal: 2,

                }}
                onPress={() => {
                    LayoutAnimation.easeInEaseOut();
                    // addInput()
                    setConReportModal(true)
                }}>
                <View style={{
                    alignSelf: "center"
                }}>
                    <Ionicons
                        name='person-add'
                        size={22}
                        color={COLORS.lightblue_400}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <Pressable
                onPress={() => setTabCollapse(!TabCollapse)}
                style={{
                    flexDirection: "row",
                    paddingHorizontal: SIZES.base,
                    paddingVertical: 3,
                    marginBottom: -SIZES.base,
                    width: SIZES.width * 0.35,
                    alignItems: "center",
                    justifyContent: "space-between",
                    top: SIZES.base * 2,
                    borderColor: COLORS.lightblue_200,
                    borderWidth: 1,
                    borderRadius: 2
                }}>
                <View style={{ alignItems: "center", alignSelf: "center" }}>
                    <Text onPress={() => setTabCollapse(!TabCollapse)} style={[FONTS.body3, { color: COLORS.darkGray }]}>Manpower</Text>
                </View>
                <View style={{ alignItems: "center", alignSelf: "center" }}>
                    <TouchableOpacity onPress={() => setTabCollapse(!TabCollapse)}>
                        <AntDesign name='caretdown' size={12} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>
            </Pressable>
            {TabCollapse ? <>
                {/* For project team  */}
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
                        </View>
                    )
                }
                <Pressable
                    onPress={() => setConTeamTabCollapse(!conTeamTabCollapse)}
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                        marginBottom: -24,
                        paddingVertical: 2,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        width: SIZES.width * 0.72,
                        alignSelf: "center",
                        borderRadius: 4,
                        borderColor: COLORS.lightblue_300,
                    }}>
                    <View>
                        <Text onPress={() => setConTeamTabCollapse(!conTeamTabCollapse)} style={[FONTS.body4, { color: COLORS.darkGray }]}>Contractors</Text>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", marginLeft: SIZES.base * 0.5 }}>
                        <TouchableOpacity onPress={() => {
                            setConTeamTabCollapse(!conTeamTabCollapse)
                        }}>
                            <AntDesign name='caretdown' size={12} color={COLORS.gray} />
                        </TouchableOpacity>
                    </View>
                </Pressable>
                <View
                    style={{
                        alignSelf: "flex-end",
                        flexDirection: "row",
                        right: SIZES.base,
                        top: -26
                    }}
                >
                    {/* button section adding contractor */}
                    {conTeamTabCollapse ? add_contractor() : null}
                </View>

                {/* getting data from api and display on screen */}
                {conTeamTabCollapse &&
                    (
                        <ScrollView
                            nestedScrollEnabled={true}
                            contentContainerStyle={{ top: 2, marginBottom: -20 }}
                        >
                            <FlatList
                                data={Report_list}
                                scrollEnabled={true}
                                horizontal={false}
                                nestedScrollEnabled={true}
                                renderItem={({ item, index }) => _head(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </ScrollView>
                    )
                }
            </> : null
            }
            {/* create contractor model */}
            {renderCreateContractorModal()}
        </>
    )
}

export default Manpower
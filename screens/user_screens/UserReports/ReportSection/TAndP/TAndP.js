import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
    View, Animated,
    Easing, Switch,
    Text, FlatList,
    StyleSheet, Image,
    ScrollView, Modal, Button,
    Pressable, TextInput, TouchableWithoutFeedback,
    TouchableOpacity, LogBox, LayoutAnimation, ImageBackground
} from 'react-native'
import styles from '../../ReportStyle.js'
import { Title, Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../../../constants'
import { FormInput, TextButton, CustomToast } from '../../../../../Components'
import { get_equipment_item_name, save_new_equipment_item, insert_TAndP_report } from '../../ReportApi'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const TAndP = ({ project_id, Main_drp_pro_value, loading }) => {
    const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, cont_Project_list_drop,
        body_ed_de_view, container, inputsContainer, inputContainer, inputfromone } = styles
    //T & P collapse
    const [tAndP, setTAndP] = useState(false)
    const [TAndPModal, setTandPModal] = useState(false)
    let calenderKey1;
    //calender
    const [date, setDate] = React.useState(new Date());
    // const [showDate, setShowDate] = useState('')
    const [addNewEquipment, setAddNewEquipment] = useState(false)
    const userCompanyData = useSelector(state => state.user);
    const [calenderKey, setCalenderKey] = useState('')


    const CONST_FIELD = {
        MANPOWER: 'Manpower',
        STOCK: 'Stock',
        QUANTITY: 'Quantity',
        QUALITY: 'Quality',
        TANDP: 'Tandp'
    }
    // CUSTOM TOAST OF CRUD OPERATIONS
    const [submitToast, setSubmitToast] = React.useState(false);
    const [updateToast, setUpdateToast] = React.useState(false);
    const [deleteToast, setDeleteToast] = React.useState(false);

    const [equipItemName, setEquipItemName] = useState('')
    const [getequipItemName, setGetEquipItemName] = useState('');
    const [equipmentField, setEquipmentField] = useState([
        {
            equipment_id: '', qty: '', onDateChange: ''
        }
    ])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        const formatedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1
            }/${currentDate.getDate()}`;
        const _inputs = [...equipmentField];
        _inputs[calenderKey1].onDateChange = formatedDate;
        _inputs[calenderKey1].key = calenderKey1;
        setEquipmentField(_inputs);
        setDate(selectedDate);
    };

    const showMode = currentMode => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            locale: 'en-IN',
            display: 'spinner',
        });
    };


    const showDatepicker = (key) => {
        calenderKey1 = key;
        showMode('date');
    };


    const getEquipmentItems = async () => {
        try {
            const data = await get_equipment_item_name();
            // console.log("🚀 ~ file: Stock.js ~ line 68 ~ getStockDataItems ~ data", data);
            setGetEquipItemName(data);
        } catch (error) {
            console.log(error)
        }
    }

    useMemo(() => {
        getEquipmentItems();
    }, [userCompanyData.company_id, loading])


    const saveNewEquipmentItems = async () => {
        try {
            const data = {
                tools_machinery_name: equipItemName,
                company_id: userCompanyData.company_id
            }

            const resp = await save_new_equipment_item(data);
            const temp = await resp.json();
            if (temp.status == '200') {
                setSubmitToast(true)
                getEquipmentItems();
                setTimeout(() => {
                    setAddNewEquipment(false);
                }, 1500);

            }
        } catch (error) {
            console.log(error)
        }
    }

    const insertTAndPReport = async () => {
        try {

            const data = {
                company_id: userCompanyData.company_id,
                project_id: Main_drp_pro_value,
                user_id: userCompanyData._id,
                equipmentField: equipmentField
            }


            const resp = await insert_TAndP_report(data, CONST_FIELD);
            const temp = await resp.json();

            if (temp.status == '200') {
                setSubmitToast(true)
                // getEquipmentItems();
                setTimeout(() => {
                    setTandPModal(false);
                }, 1500);
                equipmentField.splice(0, equipmentField.length);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const add_tAndP_icon_button = () => {
        return (
            <TouchableOpacity
                style={{

                    borderRadius: SIZES.radius * 0.2,
                    justifyContent: "center",
                    flexDirection: "row",
                    paddingHorizontal: 2,
                }}
                onPress={() => {
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

    const add_new_equipment_modal = () => {
        return (
            <View>
                <Modal transparent={false} visible={addNewEquipment} animationType="slide">
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#000000aa',
                        }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                marginTop: 80,
                                padding: 20,
                                borderRadius: 20,
                                margin: 10,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Text style={{ ...FONTS.h2, color: COLORS.darkGray }}>Add New Equipment</Text>
                                <Pressable onPress={() => setAddNewEquipment(false)}>
                                    <AntDesign name="close" size={30} color={COLORS.black} />
                                </Pressable>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <FormInput
                                    label="Name"
                                    onChange={text => {
                                        setEquipItemName(text)
                                    }}
                                />
                            </View>
                            <View>
                                <TextButton
                                    label="save"
                                    buttonContainerStyle={{
                                        height: 45,
                                        borderRadius: SIZES.radius,
                                        marginTop: SIZES.padding,
                                    }}
                                    onPress={() => {
                                        saveNewEquipmentItems()
                                    }}
                                />
                            </View>
                            {/* <Toast config={showToastItem} /> */}
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }


    const inputEquipQuantity = (text, key) => {
        const _inputs = [...equipmentField];
        _inputs[key].qty = text;
        _inputs[key].key = key;
        setEquipmentField(_inputs);
    };
    const inputEquipItemName = (text, key) => {
        const _inputs = [...equipmentField];
        _inputs[key].equipment_id = text;
        _inputs[key].key = key;
        setEquipmentField(_inputs);
    };
    // const inputEquipOnDateChange = (text, key) => {
    //     const _inputs = [...equipmentField];
    //     _inputs[key].onDateChange = text;
    //     _inputs[key].key = key;
    //     setEquipmentField(_inputs);
    // };


    const deleteEquipHandler = (key) => {
        const _inputs = [...equipmentField]
        _inputs.splice(key, 1);
        setEquipmentField(_inputs);
    }



    const add_equipment_input = () => {
        return (
            <View style={container}>
                <ScrollView style={inputsContainer}>
                    {equipmentField ? equipmentField.map((input, key) => {

                        return (
                            <View style={{ flex: 1, borderWidth: 1, borderRadius: 5, padding: 5, margin: 5 }} key={key}>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        justifyContent: 'center'
                                    }}
                                    key={key}
                                >
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginHorizontal: SIZES.base,
                                        alignItems: "center"
                                    }}>
                                        <Dropdown
                                            style={[
                                                {
                                                    height: 35,
                                                    borderRadius: 5,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.transparentBlack3,
                                                    alignSelf: "center",
                                                    paddingHorizontal: 8,
                                                    marginBottom: SIZES.base,
                                                    width: "60%"
                                                },
                                            ]}
                                            selectedTextStyle={{ color: COLORS.gray, }
                                            }
                                            placeholderStyle={{ fontSize: 14, color: COLORS.gray, left: 5 }}
                                            inputSearchStyle={{ color: COLORS.gray, height: 30, borderRadius: 5, padding: -4 }}
                                            data={getequipItemName}
                                            search
                                            maxHeight={300}
                                            labelField="tools_machinery_name"
                                            valueField="_id"
                                            placeholder={'Select Equipment'}
                                            searchPlaceholder="Search..."
                                            value={input._id}
                                            onChange={text => {
                                                // console.log("🚀 ~ file: TAndP.js ~ line 324 ~ {equipmentField?equipmentField.map ~ text", text)
                                                inputEquipItemName(text._id, key);
                                            }}
                                        />
                                        <View style={{
                                            borderWidth: 1, borderRadius: 2, borderColor: COLORS.gray,
                                            width: "30%",
                                            marginHorizontal: 10,
                                            height: "59%",
                                            padding: 3,
                                            bottom: 4,
                                            alignItems: "center"
                                        }}>

                                            <Text style={{ color: COLORS.black }} >{input.onDateChange}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                alignSelf: "auto",
                                                paddingBottom: 5
                                            }}

                                            onPress={() => {
                                                // setCalenderKey(key);
                                                showDatepicker(key)
                                            }}>

                                            <View>
                                                <Image
                                                    source={icons.date}
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                        tintColor: COLORS.lightblue_900,
                                                        right: 8,
                                                    }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginHorizontal: SIZES.base

                                    }}>
                                    <TextInput
                                        style={[inputfromone, { width: "27%" }]}
                                        placeholder="Qty"
                                        keyboardType="numeric"
                                        placeholderTextColor={COLORS.gray}
                                        value={input.qty}
                                        onChangeText={text => {
                                            inputEquipQuantity(text, key);
                                        }}
                                    />
                                    {/* <TextInput
                                        style={[inputfromone, { width: "28%" }]}
                                        placeholder="Remark"
                                        placeholderTextColor={COLORS.gray}
                                        value={input.remark}
                                        onChangeText={text => {
                                            inputEquipRemark(text, key);
                                        }}
                                    />
                                    <TextInput
                                        style={[inputfromone, { width: "40%" }]}
                                        placeholder="Duration"
                                        placeholderTextColor={COLORS.gray}
                                        value={input.duration}
                                        onChangeText={text => {
                                            setAddNewEquipment(text, key);
                                        }}
                                    /> */}
                                    <TouchableOpacity
                                        style={{

                                        }}
                                        onPress={() => deleteEquipHandler(key)}>
                                        <Image
                                            source={icons.delete_icon}
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: COLORS.red,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }) : null}
                </ScrollView>
            </View>
        )
    }



    const addEquipmentInputHandler = () => {
        setEquipmentField([...equipmentField, { equipment_id: '', qty: '', onDateChange: '' }])
    }




    const add_TAndP_modal = () => {

        return (
            <Modal visible={TAndPModal} transparent={true} animationType="slide">
                <View
                    style={{ flex: 1, backgroundColor: COLORS.transparentBlack1 }}
                >
                    <View style={{ flex: 1, backgroundColor: '#000000aa' }}>
                        <View
                            style={{
                                height: "90%",
                                width: "100%",
                                backgroundColor: '#fff',
                                marginTop: 90,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                padding: 22,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    justifyContent: 'space-between',
                                }}>
                                <Title>Add Equipments</Title>
                                <Pressable onPress={() => {
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
                                        addEquipmentInputHandler();
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
                                        setAddNewEquipment(true)
                                    }}>
                                    <Text style={{ ...FONTS.h3, color: COLORS.darkGray }}>Add Equipments</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                {add_equipment_input()}
                            </View>
                            <Button
                                title="submit"
                                style={{

                                }}
                                onPress={() => {
                                    insertTAndPReport();
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
                    tAndP ?
                        <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }} >
                            <View style={{ backgroundColor: "blue", paddingLeft: 140 }}>
                                {add_tAndP_icon_button()}
                            </View>
                            <View
                                style={{
                                    borderWidth: 1,
                                    borderColor: "skyblue",
                                    width: SIZES.width * 0.92,
                                    alignSelf: "flex-start",
                                    position: "relative",
                                    top: 20,
                                    marginLeft: 17,
                                    maxHeight: 200,
                                    paddingBottom: 6,
                                    elevation: 1
                                }}
                            >

                            </View>
                        </View>
                        : null
                }
                {add_TAndP_modal()}
                {add_new_equipment_modal()}
            </View>
            <CustomToast
                isVisible={submitToast}
                onClose={() => setSubmitToast(false)}
                color={COLORS.green}
                title="Submit"
                message="Submitted Successfully..."
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
        </>
    )
}


export default TAndP
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
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Divider } from '@ui-kitten/components';
import { Dropdown } from 'react-native-element-dropdown';
import Config from '../../../../../../config'
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../../../../constants'
import { FormInput, Drop, IconButton, CustomDropdown, TextButton, CustomToast } from '../../../../../../Components';
import { EditDeletebuttons, ManPowerProjectTeam } from '../../../../index.js'
import { Get_Contractor_Data, insert_new_category, get_new_category, insert_new_sub_category, get_new_sub_category, insert_manpower_report } from '../../../ReportApi.js'
import utils from '../../../../../../utils';
import styles from '../../../ReportStyle.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
const ManpowerUserContractors = ({ ProList, Main_drp_pro_value }) => {

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view, cont_Project_list_drop } = styles
  //getting post data into state
  const [postContData, setPostContData] = useState('')

  //using in dropdown
  const [proListIsFocus, setProListIsFocus] = useState(false)
  const [value, setValue] = useState(null);

  const [active, setactive] = useState(null)
  const [Report_list, setReport_list] = useState('')
  //main contractor collapse
  const [con_item_id, setcon_item_id] = useState(null)
  const [conTeamTabCollapse, setConTeamTabCollapse] = useState(false)






  //create contractor  model section
  const [ConReportModal, setConReportModal] = useState(false);
  const [contractorId, setContractorId] = useState(" ")
  const [addConMemberModal, setAddConMemberReportModal] = useState(false);
  const [addCatetoryModal, setAddCategoryModal] = useState(false)

  const [addSubCategoryModal, setAddSubCatetoryModal] = useState(false)
  const [manpowerCategoryId, setManpowerCategoryId] = useState('')
  const [manpowerMainCategoryId, setManpowerMainCategoryId] = useState('')
  const [categName, setCategName] = useState('')
  const [subCategName, setSubCategName] = useState('')


  const [membername, setMemberName] = useState('')
  const [memberCount, setMemberCount] = useState('')
  const [memberErrorMsg, setMemberErrorMsg] = useState('')
  const [memberCountErrorMsg, setMemberCountErrorMsg] = useState('')

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);

  //for post status
  const [saveNewSubCategoryStatus, setSaveNewSubCategoryStatus] = useState(false)
  const [saveNewCategoryStatus, setSaveNewCategoryStatus] = useState(false)

  // add contractor name
  const [ContractorName, setContractorName] = useState('');
  const [ContError, setContError] = useState('');

  //add contractor phone no
  const [ContractorPhone, setContractorPhone] = useState('');
  const [ContractorPhoneError, setContractorPhoneError] = useState('');

  const [getNewCategory, setGetNewCategory] = useState([])

  const [addFieldInput, setAddFieldInput] = useState('')
  const [getNewSubCategory, setGetNewSubCategory] = useState([])



  //defining functions for all

  const companydata = useSelector(state => state.user);
  //works on button click
  function Insert_Contractor_data() {
    const data = {
      contractor_name: ContractorName,
      phone_no: ContractorPhone,
      project_id: value
    }

    fetch(`${process.env.API_URL}contractor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(data => {
        // console.log("post data..")
        // console.log(data) 
        setPostContData(data)
        if (data.status == '200') {
          setContractorName('')
          setContractorPhone('')
          // Get_Contractor_Data()
        }

      })

  }
  // console.log("first...................")



  //getting contractor data functions
  useMemo(() => {
    if (Main_drp_pro_value || postContData) {
      const data = Get_Contractor_Data(Main_drp_pro_value)
      data.then(res => res.json())
        .then(result => {
          // console.log(Report_list)

          setReport_list(result)
        })
    }
    else {
      alert("Select Project first!")
    }
  }, [postContData, Main_drp_pro_value])

  // for new category
  const SaveNewCategory = async () => {
    const data = {
      company_id: companydata.company_id,
      manpower_category: categName
    }
    const res = await insert_new_category(data);
    if (res.status == '200') {
      setSubmitToast(true)
      setSaveNewCategoryStatus(true);
      setTimeout(() => {
        setAddCategoryModal(false);
      }, 800);

    }
  }
  //for inserting manpower data
  const InsertManpowerReport = async () => {
    let data = {

    }
    let res = await insert_manpower_report();
  }




  //for new sub category
  const SaveNewSubCategory = async () => {
    const data = {
      manpower_sub_category: subCategName,
      manpower_category_id: manpowerCategoryId
    }
    const res = await insert_new_sub_category(data);
    if (res.status = 200) {
      setSubmitToast(true)
      GetNewSubCategories(manpowerCategoryId);
      setSaveNewSubCategoryStatus(true);
      setTimeout(() => {
        setAddSubCatetoryModal(false);

      }, 800);
    }
  }

  const GetNewCategories = async () => {
    const get_data = await get_new_category(companydata.company_id);
    const get_temp = await get_data.json();
    setGetNewCategory(get_temp.data)
  }

  const GetNewSubCategories = async () => {
    const get_data = await get_new_sub_category(manpowerMainCategoryId);
    const get_temp = await get_data.json();
    get_temp.data.map((ele, key) => {
      get_temp.data[key].manpower_member = '';
      //  console.log(get_temp.data)       
    })
    setAddFieldInput(get_temp.data);

  }
  console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 285 ~ GetNewSubCategories ~ addFieldInput", addFieldInput)

  useMemo(() => {
    let isMount = true;
    if (isMount && manpowerMainCategoryId) {
      GetNewSubCategories(manpowerMainCategoryId);
    }
    return () => { isMount = false }
  }, [manpowerMainCategoryId, saveNewSubCategoryStatus])

  useMemo(() => {
    let isMount = true;
    if (isMount) {
      GetNewCategories();
    }
    return () => { isMount = false }
  }, [companydata.company_id, saveNewCategoryStatus])





  //for validation
  function isEnableSubmit() {
    return (
      ContractorName != '' &&
      ContError == '' &&
      ContractorPhone != '' &&
      ContractorPhoneError == ''
    );
  }

  //for validation
  function isEnableMemberSubmit() {
    return (
      membername != '' &&
      memberErrorMsg == '' &&
      memberCount != '' &&
      memberCountErrorMsg == ''
    );
  }

  //create contractor model   
  function renderCreateContractorModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={ConReportModal}>

        <TouchableWithoutFeedback
        // onPress={() => setConReportModal(false)}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>

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
                    <Dropdown
                      style={[
                        cont_Project_list_drop,
                        proListIsFocus && {
                          borderColor: COLORS.lightblue_600,
                        },
                      ]}
                      placeholderStyle={{ fontSize: 16, color: COLORS.darkGray, left: 5 }
                      }
                      selectedTextStyle={{ color: COLORS.gray, }
                      }

                      containerStyle={{ width: 345, borderRadius: 5 }}
                      inputSearchStyle={{ color: COLORS.gray, height: 40, borderRadius: 5, padding: -5 }}
                      iconStyle={{
                        height: 28
                        // fontSize: 16, 
                      }}
                      data={ProList}
                      search
                      maxHeight={200}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Project'}
                      searchPlaceholder="Search..."
                      value={value}
                      onFocus={() =>
                        setProListIsFocus(true)
                      }
                      onBlur={() =>
                        setProListIsFocus(false)
                      }
                      onChange={item => {
                        setValue(item.value);
                        setProListIsFocus(false);
                      }}

                    />
                    <FormInput
                      placeholder="Contractor Name"
                      onChange={value => {

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





  const __memberName = (text, index) => {
    const _memberInputs = [...addFieldInput];
    _memberInputs[index].manpower_sub_category = text;
    _memberInputs[index].key = index;
    setAddFieldInput(_memberInputs);
  }
  const __memberCount = (text, index) => {
    const _memberInputs = [...addFieldInput];
    _memberInputs[index].manpower_member = text;
    _memberInputs[index].key = index;
    setAddFieldInput(_memberInputs);
  }

  const deleteMemberHandler = (index) => {
    const _memberInputs = [...addFieldInput]
    _memberInputs.splice(index, 1);
    setAddFieldInput(_memberInputs);
  }


  function add_category_modal() {
    return (
      <View>
        <Modal transparent={false} visible={addCatetoryModal} animationType="slide">
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
                <Text style={{ ...FONTS.h2, color: COLORS.darkGray }}>Add New Category</Text>
                <Pressable onPress={() => setAddCategoryModal(false)}>
                  <AntDesign name="close" size={30} color={COLORS.black} />
                </Pressable>
              </View>
              <View style={{ marginTop: 20 }}>
                <FormInput
                  label="Name"
                  onChange={text => {
                    setCategName(text);
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
                    SaveNewCategory();
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

  function add_sub_category_modal() {
    return (
      <View>
        <Modal transparent={false} visible={addSubCategoryModal} animationType="slide">
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000aa',
              // justifyContent: 'center',
            }}>
            <View
              style={{
                // flex: 1,
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
                  // borderBottomWidth: 1,
                }}>
                <Text style={{ ...FONTS.h2, color: COLORS.darkGray }}>Add New Sub-Category</Text>
                <Pressable onPress={() => setAddSubCatetoryModal(false)}>
                  <AntDesign name="close" size={30} color={COLORS.black} />
                </Pressable>
              </View>
              <View style={{ marginTop: 20, alignContent: 'space-around', paddingVertical: 15 }}>
                <View>
                  <Dropdown
                    style={[
                      cont_Project_list_drop,
                      // proListIsFocus &&
                      {
                        // borderColor: COLORS.lightblue_600,
                        borderBottomColor: COLORS.lightGray1,
                        borderTopColor: COLORS.lightGray1,
                        width: 355,
                        justifyContent: "center",
                        // marginLeft: -60

                      },
                    ]}
                    placeholderStyle={{ fontSize: 16, color: COLORS.darkGray, }
                    }
                    selectedTextStyle={{ color: COLORS.gray }
                    }

                    containerStyle={{ width: 354, borderRadius: 5, justifyContent: "center" }}
                    inputSearchStyle={{
                      color: COLORS.gray, height: 40, borderRadius: 5,
                      //  padding: -5
                    }}
                    iconStyle={{
                      height: 28
                      // fontSize: 16, 
                    }}
                    data={getNewCategory}
                    // data={memberCategory}
                    search
                    maxHeight={200}
                    labelField="manpower_category"
                    valueField="_id"
                    placeholder={'Select Category'}
                    searchPlaceholder="Search..."
                    value={"_id"}
                    onChange={item => {
                      setManpowerCategoryId(item._id)
                      // setValue(item.name);
                    }}

                  />
                </View>
                <View style={{ paddingTop: 22 }}>
                  <FormInput
                    label="Name"
                    onChange={text => {
                      setSubCategName(text)
                    }}
                  />
                </View>
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
                    // saveItems();
                    SaveNewSubCategory();
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



  //create contractor member modal
  function createContractorMemberModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={addConMemberModal}>

        <TouchableWithoutFeedback
        // onPress={() => setConReportModal(false)}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>

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
                    Add Category and Members
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
                    onPress={() => {
                      setAddConMemberReportModal(false);
                      addFieldInput ? addFieldInput.splice(0, addFieldInput.length) : null;
                    }}
                  />
                </View>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 250,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      marginTop: SIZES.padding,
                      marginHorizontal: 8,
                      paddingVertical: 5

                    }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: 88 }}>
                      <TextButton
                        label="Add Category"
                        buttonContainerStyle={{
                          height: 33,
                          alignItems: 'center',
                          width: 110,
                          paddingHorizontal: 0,
                          marginTop: SIZES.padding,
                          borderRadius: SIZES.radius * 0.5,
                          backgroundColor: COLORS.lightblue_700
                        }}
                        onPress={() => {
                          setAddCategoryModal(true)
                        }
                        }
                      />
                      <TextButton
                        label="Add Sub Category"
                        buttonContainerStyle={{
                          height: 33,
                          alignItems: 'center',
                          width: 140,
                          paddingHorizontal: 5,
                          marginTop: SIZES.padding,
                          borderRadius: SIZES.radius * 0.5,
                          backgroundColor: COLORS.lightblue_700
                        }}
                        onPress={() => {
                          setAddSubCatetoryModal(true)
                        }
                        }
                      />
                    </View>


                    <View style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      alignItems: "center"
                    }}>
                      <Dropdown
                        style={[
                          cont_Project_list_drop,
                          proListIsFocus &&
                          {
                            borderBottomColor: COLORS.lightGray1,
                            borderTopColor: COLORS.lightGray1,
                            width: 355,
                            justifyContent: "center",

                          },
                        ]}
                        placeholderStyle={{ fontSize: 16, color: COLORS.darkGray, }
                        }
                        selectedTextStyle={{ color: COLORS.gray }
                        }

                        containerStyle={{ width: 354, borderRadius: 5, justifyContent: "center" }}
                        inputSearchStyle={{
                          color: COLORS.gray, height: 40, borderRadius: 5,
                        }}
                        iconStyle={{
                          height: 28
                        }}
                        data={getNewCategory}
                        search
                        maxHeight={200}
                        labelField="manpower_category"
                        valueField="_id"
                        placeholder={'Select Category'}
                        searchPlaceholder="Search..."
                        value={"_id"}
                        onChange={item => {
                          setManpowerMainCategoryId(item._id)

                        }}

                      />

                      {add_category_modal()}
                      {add_sub_category_modal()}
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
                    </View>

                    {
                      addFieldInput ? addFieldInput.map((memberInput, index) => {
                        return (manpowerMainCategoryId == memberInput.manpower_category_id ?
                          <ScrollView key={index}>
                            <View key={index} style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                              <FormInput
                                placeholder="Name"
                                containerStyle={{ width: 200, left: 0 }}
                                onChange={text => {
                                  __memberName(text, index);
                                  utils.validateText(text, setMemberErrorMsg);
                                  setMemberName(text);
                                }}
                                value={memberInput.manpower_sub_category}
                                errorMsg={memberErrorMsg}
                                appendComponent={
                                  <View style={{ justifyContent: 'center' }}>
                                    <Image
                                      source={
                                        membername == '' || (membername != '' && memberErrorMsg == '')
                                          ? icons.correct
                                          : icons.cancel
                                      }
                                      style={{
                                        height: 20,
                                        width: 20,
                                        tintColor:
                                          membername == ''
                                            ? COLORS.gray
                                            : membername != '' && memberErrorMsg == ''
                                              ? COLORS.green
                                              : COLORS.red,
                                      }}
                                    />
                                  </View>
                                }
                              />
                              <FormInput
                                placeholder="Count"
                                containerStyle={{ width: 102 }}
                                inputStyle={{ height: 40, width: 30, marginLeft: -12 }}
                                keyboardType="numeric"
                                onChange={text => {
                                  __memberCount(text, index);
                                  utils.validateNumber(text, setMemberCountErrorMsg)
                                  setMemberCount(text);
                                }}
                                value={memberInput.manpower_member}
                                errorMsg={memberCountErrorMsg}
                                appendComponent={
                                  <View style={{ justifyContent: 'center' }}>
                                    <Image
                                      source={
                                        memberCount == '' || (memberCount != '' && memberCountErrorMsg == '')
                                          ? icons.correct
                                          : icons.cancel
                                      }
                                      style={{
                                        height: 20,
                                        width: 20,
                                        tintColor:
                                          memberCount == ''
                                            ? COLORS.gray
                                            : memberCount != '' && memberCountErrorMsg == ''
                                              ? COLORS.green
                                              : COLORS.red,
                                      }}
                                    />
                                  </View>
                                }
                              />
                              <View style={{ paddingTop: 35 }}>
                                <TouchableOpacity
                                  style={{ alignSelf: "center" }}
                                  onPress={() => deleteMemberHandler(index)}>
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
                          </ScrollView> : null
                        )
                      }
                      ) : null
                    }
                    <TextButton
                      label="Submit"
                      disabled={isEnableMemberSubmit() ? false : true}
                      buttonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: isEnableMemberSubmit()
                          ? COLORS.lightblue_700
                          : COLORS.lightblue_100,
                      }}
                      onPress={() => {
                        // Insert_Contractor_data()
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
          borderRadius: SIZES.radius * 0.2,
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: 2,

        }}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
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


  const _test_body = (item1, index) => {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            borderWidth: 1,
            borderColor: COLORS.lightblue_400,
            width: SIZES.width * 0.7,
            maxHeight: 200,
            alignSelf: "center",
            paddingLeft: SIZES.base,
            paddingVertical: 12,
            position: "relative",
            top: 2
          }}
        >
          {/* <View style={{ alignSelf: "flex-end" }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 2,
                borderColor: COLORS.lightblue_400,
                paddingVertical: 0,
                margin: 2,
                top: -10,
                right: 2,
                width: 50,
                alignSelf: "center",
                paddingHorizontal: 10
              }}
              onPress={() => {
                setAddConMemberReportModal(true);
                // setContractorId(index1)
              }}>
              <Text style={{ ...FONTS.h5, color: COLORS.darkGray }}>Add</Text>
            </TouchableOpacity>
          </View> */}

        </View>
      </View>
    )
  }


  //contractor collapse button click code
  const toggleExpanded = (item, index) => {

    setcon_item_id(item.id);
    setactive(index == active ? null : index);
    // setactive(!active)

  };

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
          <View style={{ right: 65 }}>
            <Pressable
              onPress={() => {
                setContractorId(item._id);
                setAddConMemberReportModal(true);
                addFieldInput ? addFieldInput.splice(0, addFieldInput.length) : null;
              }}
            >
              <MaterialIcons
                name="add-box"
                size={18}
                color={COLORS.lightblue_600}
              />
            </Pressable>
          </View>
          <View style={{ justifyContent: "space-between", alignSelf: "center", left: -60 }}>

            <View>
              <EditDeletebuttons edit_size={15} del_size={18} />
            </View>
          </View>
        </TouchableOpacity>
        {/* <View>
          {open && item.id == con_item_id ? _test_body(item, index) : null}
        </View> */}
      </>
    );
  }


  return (
    <View>
      <Pressable
        onPress={() => setConTeamTabCollapse(!conTeamTabCollapse)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: -22,
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
          right: SIZES.base
          // top: 0
        }}
      >
        {/* button section adding contractor */}
        {conTeamTabCollapse ? add_contractor() : null}
      </View>

      {/* getting data from api and display on screen */}
      {conTeamTabCollapse ?
        (
          <View
            // nestedScrollEnabled={true}            
            style={{ marginBottom: -24 }}
          >
            <FlatList
              data={Report_list}
              scrollEnabled={true}
              horizontal={false}
              maxHeight={150}
              nestedScrollEnabled={true}
              renderItem={({ item, index }) => _head(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null
      }
      {/* create contractor model */}
      {renderCreateContractorModal()}
      {/* create add member modal */}
      {createContractorMemberModal()}
    </View>
  )
}

export default ManpowerUserContractors
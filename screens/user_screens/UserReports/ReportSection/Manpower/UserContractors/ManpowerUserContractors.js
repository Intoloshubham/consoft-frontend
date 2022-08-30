import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  View, Animated,
  Easing, Switch,
  Text, FlatList,
  StyleSheet, Image,
  ScrollView, Modal,
  Pressable, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView,
  TouchableOpacity, LogBox, LayoutAnimation, ImageBackground, Keyboard
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Divider } from '@ui-kitten/components';
import { Dropdown } from 'react-native-element-dropdown';
import Config from '../../../../../../config'
import { COLORS, FONTS, SIZES, dummyData, icons, images } from '../../../../../../constants'
import { FormInput, Drop, IconButton, CustomDropdown, TextButton, CustomToast, DeleteConfirmationToast } from '../../../../../../Components';
import { EditDeletebuttons, ManPowerProjectTeam } from '../../../../index.js'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Get_Contractor_Data, insert_new_category, get_new_category, insert_new_sub_category, get_new_sub_category,
  insert_manpower_report, get_manpower_report, delete_manpower_data, filter_new_category_by_cont_Id
} from '../../../ReportApi.js'
import utils from '../../../../../../utils';
import styles from '../../../ReportStyle.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import moment from 'moment';
const ManpowerUserContractors = ({ ProList, Main_drp_pro_value,loading }) => {

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

  const [deleteConStatus, setDeleteConStatus] = useState(false)
  const [manpowerPostStatus, setManpowerPostStatus] = useState('')

  const [manpowerReportData, setManpowerReportData] = useState('')



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

  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  //for post status
  const [saveNewSubCategoryStatus, setSaveNewSubCategoryStatus] = useState(false)
  const [saveNewCategoryStatus, setSaveNewCategoryStatus] = useState(false)

  const [displayConDetails, setDisplayConDetails] = useState(false)
  const [reportShowHide, setReportShowHide] = useState(false)

  // add contractor name
  const [ContractorName, setContractorName] = useState('');
  const [ContError, setContError] = useState('');

  //add contractor phone no
  const [ContractorPhone, setContractorPhone] = useState('');
  const [ContractorPhoneError, setContractorPhoneError] = useState('');

  const [getNewCategory, setGetNewCategory] = useState([])
  const [filterNewCategory, setFilterNewCategory] = useState([])

  const [addFieldInput, setAddFieldInput] = useState('')
  const [getNewSubCategory, setGetNewSubCategory] = useState([])
  const current_dat = moment().format("YYYY%2FMM%2FDD")
  const CONST_FIELD = {
    MANPOWER: 'Manpower',
    STOCK: 'Stock',
    QUANTITY: 'Quantity',
    QUALITY: 'Quality',
    TANDP: 'Tandp'
  }



  //defining functions for all

  const companydata = useSelector(state => state.user);
  //works on button click
  function Insert_Contractor_data() {
    const data = {
      company_id: companydata.company_id,
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

        setPostContData(data)
        if (data.status == '200') {
          setContractorName('');
          setContractorPhone('');
          GetNewSubCategories();
          setSubmitToast(true);
          setTimeout(() => {
            setConReportModal(false);
          }, 500);

          // Get_Contractor_Data()
        }

      })

  }
  // console.log("first...................")


  const deleteContReportButton = async (id) => {
    const res = await delete_manpower_data(id);
    if (res.status == 200) {
      setDeleteConStatus(true);
      setDeleteToast(true);
      getContractorName();
      // setTimeout(() => {
      //   setDeleteConfirm(false);
      // }, 300);
    }
  };


  // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 165 ~ getContractorName ~ Main_drp_pro_value", Main_drp_pro_value)
  function getContractorName() {
    if (Main_drp_pro_value || postContData || deleteConStatus) {
      const data = Get_Contractor_Data(Main_drp_pro_value)
      data.then(res => res.json())
        .then(result => {
          setReport_list(result)
        })
    }
    else {
      alert("Select Project first!")
    }
  }

  //getting contractor data functions
  useMemo(() => {
    getContractorName();
  }, [postContData, Main_drp_pro_value, deleteConStatus,loading])

  // for new category
  const SaveNewCategory = async () => {
    let isMount = true;
    const data = {
      company_id: companydata.company_id,
      project_id: Main_drp_pro_value,
      contractor_id: contractorId,
      manpower_category: categName
    }

    const res = await insert_new_category(data);
    if (isMount == true && res.status == '200') {
      setSubmitToast(true)
      setSaveNewCategoryStatus(res.status);
      filterCategoryByContId(contractorId);
      setTimeout(() => {
        setAddCategoryModal(false);
      }, 800);

    }
    return () => { isMount = false }
  }

  function postData() {
    let manpowerCategories = [];
    let members = [];

    getNewCategory.map((ele, key) => {
      // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 209 ~ getNewCategory.map ~ ele", ele)
      addFieldInput.map((sub_ele) => {
        // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 210 ~ addFieldInput.map ~ sub_ele", sub_ele)

        if (ele._id === sub_ele.manpower_category_id) {
          // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 211 ~ addFieldInput.map ~ sub_ele", sub_ele)
          if (sub_ele.manpower_member > 0) {
            manpowerCategories.push({ manpower_category_id: ele._id, members: [{ manpower_sub_category_id: sub_ele._id, manpower_member: sub_ele.manpower_member }] });
          }
        }
      })
    })
    // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 213 ~ addFieldInput.map ~ manpowerCategories", manpowerCategories)

    let result = manpowerCategories.reduce((acc, ele) => {
      let filtered = acc.filter(el => el.manpower_category_id == ele.manpower_category_id)

      if (filtered.length > 0) {
        filtered[0]["members"].push(...ele.members);
      } else {
        let element = {};
        element["manpower_category_id"] = ele.manpower_category_id;
        element["members"] = []
        element["members"].push(...ele.members);
        acc.push(element);
      }
      return acc;
    }, [])
    return result;
  }

  const emptySubCategoryData = () => {

    // addFieldInput.map((sublist, index) => {
    //   const _memberInputs = [...addFieldInput];
    //   _memberInputs[index].manpower_sub_category='';
    //   _memberInputs[index].manpower_member = ' ';
    //   _memberInputs[index].key = index;
    //   setAddFieldInput(_memberInputs);
    // });

  }


  //for inserting manpower data
  const InsertManpowerReport = async () => {
    const temp_data = postData();
    // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 239 ~ InsertManpowerReport ~ temp_data", temp_data)
    let data = {
      company_id: companydata.company_id,
      project_id: Main_drp_pro_value,
      user_id: companydata._id,
      contractor_id: contractorId,
      manpowerCategories: temp_data

    }
    // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 247 ~ InsertManpowerReport ~ data", data)


    let res = await insert_manpower_report(data, CONST_FIELD);


    if (res.status == 200) {
      setTimeout(() => {
        GetManpowerData();
        setManpowerPostStatus(res);
        setAddConMemberReportModal(false);
        setReportShowHide(false);
        // setDisplayConDetails(false);
        setSubmitToast(true)
      }, 100);

    }
  }




  //for new sub category
  const SaveNewSubCategory = async () => {
    let isMount = true;
    const data = {
      company_id: companydata.company_id,
      manpower_sub_category: subCategName,
      manpower_category_id: manpowerCategoryId
    }
    const res = await insert_new_sub_category(data);
    if (isMount && res.status == 200) {
      GetNewSubCategories();
      GetNewCategories();
      setSubmitToast(true)
      setSaveNewSubCategoryStatus(true);
      setTimeout(() => {
        setAddSubCatetoryModal(false);

      }, 800);
    }
    return () => { isMount = false }
  }


  async function GetManpowerData() {
    if (Main_drp_pro_value || manpowerPostStatus) {
      const data = await get_manpower_report(Main_drp_pro_value, companydata._id, current_dat)
      if (data.status == 200) {
        setManpowerReportData(data.data);
      } else {
        console.log("data not found!")
      }
    }
  }

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      GetManpowerData();
    }
    return () => { isMount = false }
  }, [manpowerPostStatus, Main_drp_pro_value, conTeamTabCollapse,loading])


  const filterCategoryByContId = async (cont_id) => {
    const get_data = await filter_new_category_by_cont_Id(companydata.company_id, Main_drp_pro_value, cont_id);
    const get_temp = await get_data.json();
    // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 313 ~ filterCategoryByContId ~ get_temp", get_temp)

    setFilterNewCategory(get_temp.data)
  }

  const GetNewCategories = async () => {
    const get_data = await get_new_category(companydata.company_id, Main_drp_pro_value);
    const get_temp = await get_data.json();
    setGetNewCategory(get_temp.data)

    // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 221 ~ GetNewCategories ~ get_temp.data", get_temp.data)
  }

  const GetNewSubCategories = async () => {
    const get_data = await get_new_sub_category(companydata.company_id);
    const get_temp = await get_data.json();
    get_temp.data.map((ele, key) => ({
      ...ele, manpower_member: ''
      // get_temp.data[key].manpower_member = '';
    }))
    // get_temp.data.map((ele, key) => {
    //   get_temp.data[key].manpower_member = ''; 
    // })
    // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 230 ~ get_temp.data.map ~  get_temp.subdata", get_temp.data)
    setAddFieldInput(get_temp.data);

  }
  useMemo(() => {
    let isMount = true;
    if (isMount) {
      GetNewSubCategories();
    }
    return () => { isMount = false }
  }, [companydata.company_id, saveNewSubCategoryStatus,loading])

  useMemo(() => {
    let isMount = true;
    if (isMount) {
      GetNewCategories();
    }
    return () => { isMount = false }
  }, [companydata.company_id, saveNewCategoryStatus,loading])




  //for validation
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.transparentBlack7,
          }}>
          <View
            style={{
              width: '90%',
              padding: SIZES.padding,
              borderRadius: SIZES.base,
              backgroundColor: COLORS.white,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 1, fontSize: 20, color: COLORS.darkGray }}>
                Contractors
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
            <ScrollView scrollEnabled={false} nestedScrollEnabled={false}>
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

                containerStyle={{ width: 320, borderRadius: 5 }}
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

            </ScrollView>
            <TextButton
              label="Submit"

              // disabled={isEnableSubmit() ? false : true}
              buttonContainerStyle={{
                height: 55,
                alignItems: 'center',
                marginTop: SIZES.padding * 2,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightblue_700

              }}
              onPress={() => {
                Insert_Contractor_data()
              }}
            />
          </View>
        </KeyboardAvoidingView>
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
                  label="Category Name"
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
                <Text style={{ ...FONTS.h2, color: COLORS.darkGray }}>Add Labours </Text>
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
                    data={filterNewCategory ? filterNewCategory : null}
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
    // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 733 ~ createContractorMemberModal ~ get_manpower_report", manpowerReportData)
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
                right: 0,
                width: '100%',
                height: '100%',
                padding: SIZES.padding,
                borderTopRightRadius: SIZES.radius,
                borderTopLeftRadius: SIZES.radius,
                backgroundColor: COLORS.white,
              }}>
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
                    setDisplayConDetails(false);
                    // addFieldInput ? addFieldInput.splice(0, addFieldInput.length) : null;
                  }}
                />
              </View>

              <KeyboardAvoidingView
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: SIZES.padding,
                  // backgroundC
                  padding: 5,
                }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingRight: 88
                }}>
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
                    label="Add Labours"
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
                      // filterCategoryByContId();
                      setAddSubCatetoryModal(true)
                    }
                    }
                  />
                </View>
                <View style={{ marginBottom: 15, width: "100%" }}>
                  <Dropdown
                    style={[
                      cont_Project_list_drop,
                      proListIsFocus &&
                      {
                        borderBottomColor: COLORS.lightGray1,
                        borderTopColor: COLORS.lightGray1,
                        width: 300,
                        justifyContent: "center",

                      },
                    ]}
                    placeholderStyle={{ fontSize: 12, color: COLORS.darkGray, }
                    }
                    selectedTextStyle={{ color: COLORS.gray, fontSize: 15 }
                    }

                    containerStyle={{ width: 320, borderRadius: 5, justifyContent: "center" }}
                    inputSearchStyle={{
                      color: COLORS.gray, height: 35, padding: -2,
                      borderRadius: 5, fontSize: 13

                    }}
                    iconStyle={{
                      height: 28
                    }}
                    // data={getNewCategory ? getNewCategory : null}
                    data={filterNewCategory ? filterNewCategory : null}
                    search
                    maxHeight={200}
                    labelField="manpower_category"
                    valueField="_id"
                    placeholder={'Select Category'}
                    searchPlaceholder="Search..."
                    value={"_id"}
                    onChange={item => {
                      GetNewSubCategories(item._id);
                      setManpowerMainCategoryId(item._id);
                      setDisplayConDetails(true);
                      setReportShowHide(true);

                    }}

                  />
                </View>
                <View style={{
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}>

                  {add_category_modal()}
                  {add_sub_category_modal()}

                  <ScrollView style={{
                    // backgroundColor: "orange",
                    maxHeight: 370,
                    flexWrap: "wrap",
                    alignSelf: "center",

                  }}>
                    {
                      addFieldInput ? addFieldInput.map((memberInput, index) => {
                        return (manpowerMainCategoryId === memberInput.manpower_category_id && displayConDetails && reportShowHide ?
                          <View
                            style={{
                              flex: 1,
                              alignSelf: "center",
                              justifyContent: "space-between"
                            }}
                            key={index}>

                            {manpowerCategoryId != undefined ?
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
                              </View> : null}
                          </View> : null
                        )
                      }
                      ) : null
                    }
                  </ScrollView>
                  <View style={{ width: "100%", top: 12 }}>
                    {displayConDetails ?
                      <TextButton
                        label="Submit"
                        // disabled={isEnableMemberSubmit() ? false : true}
                        buttonContainerStyle={{
                          height: 55,

                          width: '100%',
                          alignItems: "center",


                          alignItems: 'center',
                          borderRadius: SIZES.radius,
                          backgroundColor: COLORS.lightblue_700

                        }}
                        onPress={() => {
                          InsertManpowerReport()
                        }
                        }
                      /> : null}
                  </View>
                </View>


              </KeyboardAvoidingView>
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



  // const sub_body_section = (item) => {
  //   return (
  //     <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ left: -2, paddingBottom: 15 }}>
  //       {
  //         getNewCategory ? getNewCategory.map((list, key) => {
  //           if (list.contractor_id == item._id) {
  //             return (<View key={key} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: "center", flexWrap: "wrap" }}>
  //               <Divider style={{ backgroundColor: COLORS.lightGray1, width: SIZES.width * 3, marginHorizontal: 2, top: 5 }} />
  //               <View style={{ paddingHorizontal: 2, right: 22 }}>
  //                 <View style={{ backgroundColor: COLORS.lightGray1, width: 1, position: "absolute", left: 20, top: 0, right: 0, bottom: 0 }}>
  //                 </View>
  //                 <View style={{ flexDirection: "row", justifyContent: "space-around", width: 280 }}>
  //                   <View style={{ backgroundColor: COLORS.lightGray1, width: 1, position: "absolute", left: -3, top: 0, right: 0, bottom: 0 }}>
  //                   </View>
  //                   <View style={{ width: 50, paddingLeft: 8 }}>
  //                     <Text style={{ color: COLORS.black, ...FONTS.h5, textAlign: "center" }}>{key + 1}</Text>
  //                   </View>
  //                   <View style={{ backgroundColor: "doderblue", width: 250 }}>
  //                     <Text style={{ color: COLORS.blue, ...FONTS.h5, textAlign: "left" }}>{list.manpower_category}</Text>
  //                   </View>
  //                 </View>
  //                 <Divider style={{ backgroundColor: COLORS.lightGray1, width: SIZES.width * 5, left: -20, top: 0 }} />
  //                 <>
  //                   {
  //                     <>
  //                       {
  //                         addFieldInput ? addFieldInput.map((sublist, index) => {

  //                           return list._id == sublist.manpower_category_id ?

  //                             (<View key={index}>
  //                               <View style={{ flexDirection: "row", position: "relative", alignItems: "center", justifyContent: "space-between" }}>
  //                                 <View style={{ flexDirection: "row", justifyContent: "space-around", left: 35 }}>
  //                                   <View style={{ backgroundColor: COLORS.lightGray1, width: 1, position: "absolute", left: -37, top: 0, right: 0, bottom: 0 }}>
  //                                   </View>
  //                                   <View>
  //                                     <Text style={{ color: COLORS.black, ...FONTS.h5, textAlign: "left" }}>{sublist.manpower_sub_category}</Text>
  //                                   </View>
  //                                   <View style={{ backgroundColor: COLORS.lightGray1, width: 1, position: "absolute", left: 100, top: 0, right: 0, bottom: 0 }}>
  //                                   </View>
  //                                 </View>

  //                                 {/* <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", top: 4 }}> */}
  //                                 <View style={{ position: "absolute", left: 160 }}>
  //                                   <TextInput
  //                                     style={{ width: 50, borderWidth: 1, borderColor: COLORS.gray, height: 16, padding: 0, color: COLORS.black }}
  //                                     onChangeText={text => {
  //                                       __memberCount(text, index);
  //                                       utils.validateNumber(text, setMemberCountErrorMsg)
  //                                       setMemberCount(text);
  //                                     }}
  //                                     value={sublist.manpower_member}
  //                                     placeholder={"Count"}
  //                                     keyboardType="numeric"
  //                                   />
  //                                 </View>
  //                                 {/* </View> */}
  //                               </View>
  //                             </View>)

  //                             : null
  //                         }
  //                         ) : null
  //                       }
  //                     </>
  //                   }
  //                 </>
  //               </View>
  //             </View>)
  //           }
  //         }) : null
  //       }
  //       {/* <View>
  //         <TouchableOpacity
  //           style={{
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             backgroundColor: COLORS.lightblue_700,
  //             height: 24,
  //             width: 85,
  //             alignSelf: "center",
  //             paddingBottom: 5,
  //             marginTop: SIZES.padding,
  //             borderRadius: SIZES.radius,
  //           }}
  //           // disabled={isEnableMemberSubmit() ? false : true}
  //           onPress={() => {
  //             // setTakeStep(true);
  //             InsertManpowerReport(item._id)
  //           }}
  //         >
  //           <Text style={{ color: COLORS.white, ...FONTS.h5 }}>
  //             Submit
  //           </Text>
  //         </TouchableOpacity>
  //       </View> */}
  //     </ScrollView>

  //   )
  // }

  const sub_body_section = (item, index) => {
    // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 1250 ~ ManpowerUserContractors ~ getNewCategory", getNewCategory)
    // console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 1251 ~ ManpowerUserContractors ~ manpowerreprot", manpowerReportData)

    return <View
      style={{
        flex: 1,
        flexDirection: "row",
        width: SIZES.width * 0.7,
        maxHeight: 300,
        alignSelf: "center",
        paddingLeft: SIZES.base,
        position: "relative",
        paddingBottom: 10,
      }}
      key={index}
    >
      {
        (manpowerReportData.length > 0) ?
          <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ left: -2, paddingBottom: 15 }} >
            {
              getNewCategory ? getNewCategory.map((list, index1) => {
                if (list.contractor_id == item._id) {
                  return (<View key={index1}>
                    <View>
                      {
                        manpowerReportData.map((main_list, index2) => {
                          if (item._id === main_list.contractor_id) {
                            return (
                              <View key={index2} style={{}}>
                                {/* <View style={{ flexDirection: "row", justifyContent: "space-around", width: 280 }}>
                                    <View style={{ backgroundColor: COLORS.lightGray1, width: 1, position: "absolute", left: -3, top: 0, right: 0, bottom: 0 }}>
                                    </View>
                                    <View style={{ width: 50, paddingLeft: 8 }}>
                                      <Text style={{ color: COLORS.black, ...FONTS.h5, textAlign: "center" }}>{index1 + 1}</Text>
                                    </View>
                                    <View style={{ width: 250 }}>
                                      <Text style={{ color: COLORS.blue, ...FONTS.h5, textAlign: "left" }}>{list.manpower_category}</Text>
                                    </View>
                                  </View> */}
                                {
                                  main_list.manpowerCategories.map((sub_main_list, index3) => {

                                    return sub_main_list.manpower_category_id.map((sub_main_list1, index4) => {
                                      {/* console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 1204 ~ main_list.manpowerCategories.map ~ sub_main_list", sub_main_list1) */ }
                                      if (sub_main_list1 == list._id) {
                                        {/* console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 1205 ~ main_list.manpowerCategories.map ~ manpower_category", list.manpower_category) */ }
                                        return (
                                          <View key={index4}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-around", width: 280 }}>
                                              <View style={{ backgroundColor: COLORS.lightGray1, width: 1, position: "absolute", left: -3, top: 0, right: 0, bottom: 0 }}>
                                              </View>
                                              <View style={{ width: 50, paddingLeft: 8 }}>
                                                <Text style={{ color: COLORS.black, ...FONTS.h5, textAlign: "center" }}>{index1 + 1}</Text>
                                              </View>
                                              <View style={{ width: 250 }}>
                                                <Text style={{ color: COLORS.blue, ...FONTS.h5, textAlign: "left" }}>{list.manpower_category}</Text>
                                              </View>
                                            </View>
                                            {
                                              addFieldInput ? addFieldInput.map((sub_list, index5) => {
                                                return sub_main_list.members.map((sub_member_list, index6) => {
                                                  {/* console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 1224 ~ returnsub_main_list1.members.map ~ sub_member_list", sub_member_list) */ }
                                                  {/* console.log("🚀 ~ file: ManpowerUserContractors.js ~ line 1227 ~ returnsub_main_list.members.map ~ sub_main_list1.manpower_sub_category_id", sub_main_list1) */ }
                                                  if (sub_main_list1 == sub_member_list.manpower_category_id) {
                                                    if (sub_list._id === sub_member_list.manpower_sub_category_id) {
                                                      return (
                                                        <View key={index6} style={{}}>
                                                          <View>
                                                            <View style={{ flexDirection: "row", position: "relative", alignItems: "center", justifyContent: "space-between" }}>
                                                              <View style={{ flexDirection: "row", justifyContent: "space-around", left: 35 }}>
                                                                <View style={{ backgroundColor: COLORS.lightGray1, width: 1, position: "absolute", left: -37, top: 0, right: 0, bottom: 0 }}>
                                                                </View>
                                                                <View style={{}}>
                                                                  <Text style={{ color: COLORS.black, ...FONTS.h5, textAlign: "left" }}>{sub_list.manpower_sub_category}</Text>
                                                                </View>
                                                                <View style={{ backgroundColor: COLORS.lightGray1, width: 1, position: "absolute", left: 100, top: 0, right: 0, bottom: 0 }}>
                                                                </View>
                                                              </View>

                                                              <View style={{ position: "absolute", left: 160 }}>

                                                                <Text style={{ color: COLORS.black, ...FONTS.h5, textAlign: "left" }}>{sub_member_list.manpower_member}</Text>
                                                              </View>
                                                            </View>
                                                          </View>
                                                        </View>
                                                      )
                                                    }
                                                  }
                                                })
                                              }) : null
                                            }
                                          </View>
                                        )
                                      }
                                    })
                                  })
                                }
                              </View>)
                            {/* } */ }
                          }
                        }
                        )

                      }
                    </View>
                  </View>)
                }
              }
              ) : null //for getnewcategory
            }
          </ScrollView> :
          null
      }
    </View>
  }




  const _body = (item, index) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: SIZES.width * 0.7,
          maxHeight: 310,
          alignSelf: "center",
          paddingLeft: SIZES.base,
          position: "relative",
          paddingBottom: 10,
          backgroundColor: COLORS.lightGray1
        }}
        key={index}
      >

        {
          sub_body_section(item, index)
        }

      </View>
    )
  }


  //contractor collapse button click code
  const toggleExpanded = (item, index) => {

    addFieldInput.map((sublist, index) => {
      const _memberInputs = [...addFieldInput];
      _memberInputs[index].manpower_member = ' ';
      _memberInputs[index].key = index;
      setAddFieldInput(_memberInputs);
    });

    setcon_item_id(item._id);
    setactive(index == active ? null : index);
    // setactive(!active)

  };


  const Editdeletebutton = ({ edit_size, del_size, __id }) => {
    return (
      <>
        <View style={body_ed_de_view}>
          <View style={body_del_btn}>
            <TouchableOpacity
            // onPress={() => editReportBtn(__id)}
            >
              {/* <Foundation name='page-edit' color={item.id == selectedEditId ? "#2aaeff" : null} size={24} /> */}
              <FontAwesome name='edit' color={COLORS.blue} size={edit_size} />
            </TouchableOpacity>
          </View>
          <View style={body_edit_btn}>
            <TouchableOpacity
              onPress={() => deleteContReportButton(__id)}
            >
              <MaterialCommunityIcons name='delete' color={COLORS.red} size={del_size} />
            </TouchableOpacity>
          </View>
        </View>
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
          width: SIZES.width * 0.679,
          justifyContent: "space-between",
          alignSelf: "center"
        }]} key={item._id} onPress={() => {
          toggleExpanded(item, index)
        }} >
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
                filterCategoryByContId(item._id);
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
              <Editdeletebutton edit_size={15} del_size={18} __id={item._id} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ borderBottomWidth: 1, borderColor: COLORS.lightblue_300 }}>
          {open && item._id == con_item_id ? _body(item, index) : null}
        </View>
      </>
    );
  }


  return (
    <View style={{ marginTop: 5}}>
      <Pressable
        onPress={() => setConTeamTabCollapse(!conTeamTabCollapse)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          // marginTop: 10,
          // top:-12,

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
            style={{ marginBottom: -24, height: 270 }}
          >
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ borderWidth: 1, width: '100%', height: '100%' }}>
              <FlatList
                data={Report_list ? Report_list : alert('Currently there are no contractors!!')}
                scrollEnabled={true}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  borderWidth: 1,
                  paddingBottom: 235,
                  borderColor: COLORS.lightblue_300,
                  marginHorizontal: 42
                }}
                maxHeight={268}
                nestedScrollEnabled={true}
                renderItem={({ item, index }) => _head(item, index)}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
          </View>
        ) : null
      }
      {/* create contractor model */}
      {renderCreateContractorModal()}
      {/* create add member modal */}
      {createContractorMemberModal()}
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
      <DeleteConfirmationToast
        isVisible={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        title={'Are You Sure?'}
        message={'Do you really want to delete?'}
        color={COLORS.rose_600}
        icon={icons.delete_withbg}
        onClickYes={() => deleteContReportButton()}
      />

    </View>
  )
}


export default ManpowerUserContractors
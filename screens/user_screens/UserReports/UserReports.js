import React from 'react'
import {
  View, Animated,
  Easing, Switch,
  Text, FlatList,
  StyleSheet, Image,
  ScrollView, Modal,
  Pressable, TextInput, TouchableWithoutFeedback,
  TouchableOpacity, LogBox, LayoutAnimation
} from 'react-native'
import { COLORS, FONTS, SIZES, dummyData, icons } from '../../../constants'
import { FormInput, Drop, IconButton, TextButton } from '../../../Components';
import utils from '../../../utils';
import { Divider } from '@ui-kitten/components';
import Foundation from 'react-native-vector-icons/Foundation'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import { AccordionList } from 'accordion-collapse-react-native';
import DatePicker from 'react-native-neat-date-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const UserReports = () => {

  const [selectedEditId, setSelectedEditId] = React.useState(null)
  const [con_item_id, setcon_item_id] = React.useState(null)
  const [selectedDel, setSelectedDel] = React.useState(null)

  //api data
  const [Report_list, setReport_list] = React.useState('')
  const [selectheaderid, setselectheaderid] = React.useState(Report_list)

  //contractor inside report state
  const [Tech_collapse, setTech_collapse] = React.useState(false)
  const [Masonry_collapse, setMasonry_collapse] = React.useState(false)
  const [Steel_collapse, setSteel_collapse] = React.useState(false)
  const [Shelter_collapse, setShelter_collapse] = React.useState(false)

  //collapse item state
  const [active, setactive] = React.useState(null)
  const [number, onChangeNumber] = React.useState(null);

  //contractor reports section
  const [ConReportModal, setConReportModal] = React.useState(false);

  // add contractor name
  const [ContractorName, setContractorName] = React.useState('');
  const [ContError, setContError] = React.useState('');
  const [subContData, setSubContData] = React.useState('')

  //add contractor phone no
  const [ContractorPhone, setContractorPhone] = React.useState('');
  const [ContractorPhoneError, setContractorPhoneError] = React.useState('');


  //date time section
  const [date, setDate] = React.useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = (item) => {
    showMode('date');
    // setcon_item_id(item.id);
  };

  const showTimepicker = () => {
    showMode('time');
  };



  const showToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'Contractor added Successfully',
      text2: 'Success',
      visibilityTime: 2000,
    });

  function isEnableSubmit() {
    return (
      ContractorName != '' &&
      ContError == '' &&
      ContractorPhone != '' &&
      ContractorPhoneError == ''
    );
  }

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

  async function Get_Contractor_Data() {
    const getData =await fetch('http://10.0.2.2:7000/api/user-contractor')
    const res = await getData.json()
    setReport_list(res)
  }

  React.useEffect(() => {
    Get_Contractor_Data()
  }, [])

  const [list_Contractor, setlist_Contractor] = React.useState([
    {
      id: "0",
      name: "Labours"
    },
    {
      id: "1",
      name: "Contractor 2"
    },
    {
      id: "2",
      name: "Contractor 3"
    },
    {
      id: "3",
      name: "Contractor 4"
    },
  ])

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

  // const [ExpCalendar, setExpCalendar] = React.useState(false)
  // const [Exp_date, setExp_date] = React.useState('YYYY-MM-DD')


  const { header, con_body, input, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view } = styles



  const toggleExpanded = (item, index) => {

    setcon_item_id(item.id);
    setactive(index == active ? null : index);
    // setactive(!active)

  };

  const _head = (item, index) => {

    LayoutAnimation.easeInEaseOut();
    const open = active == index
    return (
      <>
        <TouchableOpacity style={header} key={item.key} onPress={() => { toggleExpanded(item, index) }} >
          <View
            style={{ justifyContent: "center" }}

            activeOpacity={1}>
            <Text style={[FONTS.body3, { color: COLORS.black, letterSpacing: 1, textAlign: "left" }]}>
              {item.contractor_name}
            </Text>
          </View>
          <View style={{ marginLeft: 24 * 2, alignSelf: "center", top: -5 }}>
            {schedular_section(item)}
          </View>
          <View style={{ left: -40, justifyContent: "center", alignItems: "flex-end", left: SIZES.base * 1.5 }}>
            {edit_delet_section(item)}
          </View>
        </TouchableOpacity>
        <View>
          {open && item.id == con_item_id ? _body(item, index) : null}
        </View>
      </>
    );
  }




  // const onConfirmexp = (output) => {
  //   setExp_date(output.dateString)
  //   setExpCalendar(false)
  // }


  const schedular_section = (item) => {
    return (
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 115, alignSelf: "flex-start", marginLeft: -65 }}>
          <View style={{ marginTop: SIZES.radius, justifyContent: 'center', backgroundColor: COLORS.lightblue_200, borderRadius: SIZES.base, borderWidth: 2, borderColor: COLORS.lightGray1, alignSelf: "center", paddingHorizontal: 5 }}>
            <Text style={{
              ...FONTS.h4,
              color: COLORS.black,
            }}
            >
              Date: {date.toLocaleDateString()}
            </Text>
          </View>
          <View
            style={{
              top: SIZES.radius,
              paddingVertical: SIZES.radius,
              width: "31%",
              height: 30,
              borderRadius: SIZES.base,
              backgroundColor: COLORS.lightblue_200,
              justifyContent: 'center',
              paddingLeft: SIZES.font * 0.5,
              alignContent: "center"
            }}>
            <TouchableOpacity onPress={() => showDatepicker(item)}>
              <Image
                source={icons.date}
                style={{
                  width: 21,
                  height: 21,
                  tintColor: COLORS.black,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  const edit_delet_section = (item) => {
    return (
      <View style={body_ed_de_view}>
        <View style={body_del_btn}>
          <Pressable
            style={{}}
            onPress={() => {
              setSelectedEditId(item.id)
            }}
          >
            <Foundation name='page-edit' color={item.id == selectedEditId ? "#2aaeff" : null} size={24} />
          </Pressable>
        </View>
        <View style={body_edit_btn}>
          <Pressable
            onPress={() => {
              setSelectedDel(item.id)

            }}
          >
            <Foundation name='page-delete' color={item.id == selectedDel ? "#d45" : null} size={24} />
          </Pressable>
        </View>
      </View>
    )
  }


  // const onValueChange = (item, index) => {
  //   const newData = [...Tech_staff];
  //   newData[index].isCheck = !item.isCheck;
  //   setTech_staff(newData);
  // }


  // const onMasonryChange = (item, index) => {
  //   const newData = [...Masonry];
  //   newData[index].isCheck = !item.isCheck;
  //   setMasonry(newData);
  // }
  // const onSteelChange = (item, index) => {
  //   const newData = [...steel_bind];
  //   newData[index].isCheck = !item.isCheck;
  //   setsteel_bind(newData);
  // }

  // const onShelterChange = (item, index) => {
  //   const newData = [...shelter];
  //   newData[index].isCheck = !item.isCheck;
  //   setshelter(newData);
  // }





  const getSelectedValue = (item) => {
    var name = Tech_staff.map((t) => t.name)
    var isChecked = Tech_staff.map((t) => t.isCheck)
    let selected = []
    for (let i = 0; i < isChecked.length; i++) {
      if (isChecked[i] == true)
        selected.push(name[i])
    }
  }


  // create project modal
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
                {/* <Toast config={showToast} /> */}
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


                    {/* <FormInput
                      label="Name"
                      keyboardType="default"
                      autoCompleteType="username"
                      value={ContractorName}
                      onChange={value => {
                        utils.validateText(value, setContError);
                        setContractorName(value);
                      }}
                      errorMsg={ContError}
                      appendComponent={
                        <View style={{ justifyContent: 'center' }}>
                          <Image
                            source={ContractorName == '' ||
                              (ContractorName != '' && ContError == '')
                              ? icons.correct
                              : icons.cancel
                            }

                            style={{
                              height: 20,
                              width: 20,
                              tintColor:
                                ContractorName == ''
                                  ? COLORS.gray
                                  : ContractorName == '' && ContError == ''
                                    ? COLORS.green
                                    : COLORS.red,

                            }}
                          />
                        </View>
                      }f
                    /> */}


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

  const render_con_list = (item, index) => {
    // const open = active == index
    return (
      <>
        {/* <TouchableOpacity style={{
          flex: 1,
          flexDirection: "row",
          margin: 2,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: COLORS.lightblue_400,
          width: SIZES.width * 0.9,
          padding: 3,
          paddingRight: 52,
          justifyContent: "space-between"
        }}
          onPress={() => { toggleExpanded(item, index) }
          }
          activeOpacity={1}
        >
          <View>
            <Text style={[FONTS.body4, { color: COLORS.black, letterSpacing: 1, textAlign: "left", fontSize: 16 }]}>{item.name}</Text>
          </View>       
        </TouchableOpacity> */}
        {/* {open && con_item_id == item.id ? */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            borderWidth: 1,
            borderColor: COLORS.lightblue_400,
            alignItems: "flex-start",
            width: SIZES.width * 1,
            height: SIZES.width,
            paddingLeft: SIZES.base,
            marginHorizontal: 2,
            position: "relative",
          }}
        >
          <Divider style={{ backgroundColor: COLORS.lightGray1, width: SIZES.width * 0.85, marginHorizontal: 2, top: 5 }} />
          <View style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: 15,
            marginLeft: 2,
            height: SIZES.width * 0.9,
            width: SIZES.width * 0.85,
          }}>
            <View>
              <TouchableOpacity
                onPress={() => setTech_collapse(!Tech_collapse)}
              >
                <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1, fontSize: 14 }]}>Technical Staff</Text>
              </TouchableOpacity>
            </View>
            {Tech_collapse ? <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 90 }}>
              {Tech_staff.map((item, index) => {
                return (
                  <View style={{ flex: 1 }} key={index}>
                    <View>
                    </View>
                    <TouchableOpacity
                      key={index}
                      // onPress={() => onValueChange(item, index)}
                      style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {/* <View style={{ alignSelf: "center" }}>
                            <CheckBox
                              value={item.isCheck}
                              onValueChange={(newValue) => onValueChange(item, index)}
                              key={item.name}
                            />
                          </View> */}
                        <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1, fontSize: 13 }]}>{item.name}</Text>
                        <View
                          style={{
                            position: "absolute",
                            left: 100,
                            right: -100,
                            top: -4,
                            bottom: 0,
                            alignSelf: "center"
                          }}>
                          <TextInput
                            style={input}
                            onChangeText={onChangeNumber}
                            value={number}
                            placeholder=""
                            keyboardType="numeric"
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=>getSelectedValue(item)}><Text>getdata</Text></TouchableOpacity> */}
                  </View>
                )
              })}
            </ScrollView> : null}
            <View>
              <TouchableOpacity
                onPress={() => setMasonry_collapse(!Masonry_collapse)}
              >
                <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1, fontSize: 14 }]}>Masonry</Text>
              </TouchableOpacity>
            </View>
            {Masonry_collapse ? <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 55 }}>
              {Masonry.map((item, index) => {
                return (
                  <View key={index}>
                    <View
                      key={index}
                      style={{ maxHeight: 25 }}>
                      <TouchableOpacity
                        key={index}
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
                            left: 100,
                            right: -100,
                            top: -4,
                            bottom: 0,
                            alignSelf: "center"
                          }}>
                          <TextInput
                            style={input}
                            onChangeText={onChangeNumber}
                            value={number}
                            placeholder=""
                            keyboardType="numeric"
                          />
                        </View>
                        <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1, fontSize: 13 }]}>{item.name}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })}
            </ScrollView> : null}
            <View>
              <TouchableOpacity
                onPress={() => setSteel_collapse(!Steel_collapse)}
              >
                <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1, fontSize: 14 }]}>Steel Binder</Text>
              </TouchableOpacity>
            </View>
            {Steel_collapse ? <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 60 }}>
              {steel_bind.map((item, index) => {
                return (
                  <View key={index} style={{}}>
                    <TouchableOpacity
                      key={index}
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
                          left: 100,
                          right: -100,
                          top: -4,
                          bottom: 0,
                          alignSelf: "center"
                        }}>
                        <TextInput
                          style={input}
                          onChangeText={onChangeNumber}
                          value={number}
                          placeholder=""
                          keyboardType="numeric"
                        />
                      </View>
                      <View>
                        <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1, fontSize: 13 }]}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              })}
            </ScrollView> : null}
            <View>
              <TouchableOpacity
                onPress={() => setShelter_collapse(!Shelter_collapse)}
              >
                <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1, fontSize: 14 }]}>Shuttering</Text>
              </TouchableOpacity>
            </View>
            {Shelter_collapse ? <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 90 }}>
              {shelter.map((item, index) => {
                return (
                  <View
                    key={index}
                  >
                    <TouchableOpacity
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
                          left: 100,
                          right: -100,
                          top: -4,
                          bottom: 0,
                          alignSelf: "center"
                        }}>
                        <TextInput
                          style={input}
                          onChangeText={onChangeNumber}
                          value={number}
                          placeholder=""
                          keyboardType="numeric"
                        />
                      </View>
                      <Text style={[FONTS.body5, { color: COLORS.black, letterSpacing: 1, fontSize: 14 }]}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )
              })}
            </ScrollView> : null}
          </View>
        </View>
        {/* : null */}
        {/* } */}
      </>
    )
  }


  // const list_of_all_contractors = (item, index) => {
  //   return (
  //     <View style={{}}>

  //     </View>
  //   )
  // }


  const _body = (item, index) => {
    return (
      <View style={con_body}>
        {render_con_list(item, index)}
      </View>
    )
  }



  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightblue_100
      }}>
      <View
        style={{
          alignSelf: "flex-end",
          flexDirection: "row",
          right: SIZES.base,
          top: SIZES.base,

        }}
      >

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.lightblue_700,
            borderRadius: SIZES.radius * 0.2,
            justifyContent: "center",
            flexDirection: "row",
            borderColor: COLORS.lightblue_400,
            paddingHorizontal: 2,
            borderWidth: 1,
          }}
          onPress={() => setConReportModal(true)}>
          <View style={{
            alignSelf: "center"
          }}>
            <Ionicons
              name='add'
              size={23}
              color={COLORS.white}
            />
          </View>
          <View
            style={{
              alignSelf: "center",
              padding: 2,
              paddingHorizontal: 3 * 1.5,
            }}>
            <Text style={{ ...FONTS.body4, color: COLORS.white, letterSpacing: 1, fontWeight: "500" }}>Add</Text>
          </View>
        </TouchableOpacity>
        {/* <View
          style={{
            alignSelf: "center",
            borderColor: COLORS.lightblue_200,
            borderWidth: 1,
            padding: 1 * 0.5
          }}>
          <Text style={{ ...FONTS.body4, color: COLORS.black, letterSpacing: 1 }}>Add Contractors</Text>
        </View> */}
      </View>
      <View
        style={{ top: SIZES.base }}
      >

        <FlatList
          data={Report_list}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => _head(item, index)}
          keyExtractor={(item, index) => index.toString()}
        // extraData={count}
        />
        {/* {_body()} */}
        {/* <AccordionList
          list={Report_list}
          header={_head}
          isExpanded={false}
          body={_body}
          keyExtractor={item => item.id}
        /> */}
      </View>
      {renderCreateContractorModal()}
    </View>
  )
}

export default UserReports

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    backgroundColor: COLORS.lightblue_200,
    borderColor: COLORS.lightblue_200,
    margin: SIZES.base * 0.5,
    padding: SIZES.base,
    borderRadius: 2,
    top: 1,
    elevation: 5
  },

  con_body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.lightblue_100,
    marginHorizontal: 5
  },
  body_del_btn: {
    // backgroundColor: "green",
    paddingHorizontal: 8
  },
  body_edit_btn: {
    // backgroundColor: "gray",
    paddingHorizontal: 8
  },
  body_ed_de_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    // right: -52,
    // backgroundColor: "red",
  },
  group: {
    marginVertical: 4,
  },
  option: {
    marginVertical: 4,
    marginHorizontal: 12,
  },
  input: {
    height: 20,
    margin: 12,
    borderWidth: 1,
    padding: 2,
    width: 38
  },

})

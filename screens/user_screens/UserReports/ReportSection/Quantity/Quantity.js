import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
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
  Button,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  LogBox,
  LayoutAnimation,
  ImageBackground,
} from 'react-native';
import { Card, Title, DataTable, Divider } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../ReportStyle.js';
import config from '../../../../../config';
import { getCompanyId, getToken } from '../../../../../services/asyncStorageService';
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  images,
} from '../../../../../constants';
import { FormInput, TextButton, HeaderBar } from '../../../../../Components';

const Quantity = () => {
  const {
    header,
    con_body,
    input,
    body_del,
    body_edit,
    body_del_btn,
    body_edit_btn,
    body_ed_de_view,
    dropdown,
    dropdown1,
    container,
    inputContainer,
    inputsContainer,
    inputfrom,
    inputfromtwo,
    inputfromone,
    cont_Project_list_drop
  } = styles;

  // state
  const [quantityitem, setquantityitem] = useState('');
  const [value, setvalue] = useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  // modal
  const [additem, setadditem] = useState(false);
  const [reportmodal, setReportmodal] = useState(false);
  const [data, setdata] = useState([]);
  const [reportdata, setReportdata] = useState([]);
  // qtytotal
  // console.log(qtyTotal)

  //Quantity collapse
  const [quant_ity, setQuantity] = useState(false);
  //key states of dynamic inputs
  const [selectKey, setSelectKey] = useState('');
  const [lengthKey, selectLengthkey] = useState('');
  const [widthKey, selectWidthkey] = useState('');
  const [heightKey, selectHeightkey] = useState('');

  //sub key states of dynamic inputs
  const [subLengthKey, setSubLengthkey] = useState('');
  const [subWidthKey, setSubWidthkey] = useState('');
  const [subHeightKey, setSubHeightkey] = useState('');

  const [unitKey, setUnitKey] = useState('');

  const [inputs, setInputs] = useState([
    {
      select: '',
      numlangth: '',
      numwidth: '',
      numheight: '',
      total: '',
      Remark: '',
    },
  ]);

  const [subInputs, setSubInputs] = useState([
    {
      sub_numlangth: '',
      sub_numwidth: '',
      sub_numheight: '',
      sub_total: '',
      sub_remark: ''
    }
  ])

  //get company id
  const [company_id, setCompany_id] = useState('');
  const [accessTokenoptiontype, setAccessTokenoptiontype] = useState('');

  const _companyId = async () => {
    const _id = await getCompanyId();
    setCompany_id(_id);
  };
  //  console.log(company_id);
  //setting token
  React.useEffect(() => {
    (async () => await _companyId())();
  }, []);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setAccessTokenoptiontype(token);
    })();
  });

  const inputkeyRef = useRef(inputs);
  //  inputkey.current.unitname


  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({
      select: '',
      numlangth: '',
      numwidth: '',
      numheight: '',
      total: '',
      Remark: '',
    });
    setInputs(_inputs)
  };




  // console.log(inputs);

  // useEffect(() => {
  //   inputs.map((ele, index) => {
  //     if (ele.key === index) {
  //       setSelectData(ele.select)
  //     }
  //   }) 
  // }, [unitname])

  // const selectunitdata = useCallback(()=>{
  //   inputs.map((ele,index)=>{
  //         if(ele.key===index){
  //           setSelectData(ele.select)
  //         }
  //       })
  // },[selectData])



  const deleteHandler = key => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };


  function filterOnlyNumericValue(value) {
    return value.replace(/[^0-9]/g, '');
  }

  const inputselect = (item, key) => {
    const _inputselcet = [...inputs];
    _inputselcet[key].select = item;
    _inputselcet[key].key = key;
    // console.log("_inputselcet");
    // console.log(_inputselcet);
    // setSelectKey(_inputselcet);

    setInputs(_inputselcet);
  };




  // console.log(selectData);

  const inputunit = (text, key) => {
    const _inputsunit = [...inputs];
    _inputsunit[key].unit = text;
    _inputsunit[key].key = key;
    // console.log(_inputsunit);
    setUnitKey(key);
    // console.log("unitKey");
    // console.log(unitKey);
    setInputs(_inputsunit);
  };
  const inputlangth = (text, key) => {
    const _inputlangth = [...inputs];
    _inputlangth[key].numlangth = filterOnlyNumericValue(text);
    _inputlangth[key].key = key;
    setInputs(_inputlangth);
  };
  const inputwidth = (text, key) => {
    const _inputwidth = [...inputs];
    _inputwidth[key].numwidth = filterOnlyNumericValue(text);
    _inputwidth[key].key = key;
    setInputs(_inputwidth);
  };
  const inputhight = (text, key) => {
    const _inputhight = [...inputs];
    _inputhight[key].numheight = filterOnlyNumericValue(text);
    _inputhight[key].key = key;

    setInputs(_inputhight);
  };
  const inputtotal = (value, key) => {
    const _inputtotal = [...inputs];
    _inputtotal[key].total = value;
    _inputtotal[key].key = key;
    setInputs(_inputtotal);
  };

  const inputRemark = (text, key) => {
    const _inputRemark = [...inputs];
    _inputRemark[key].sub_Remark = text;
    _inputRemark[key].key = key;
    setInputs(_inputRemark);
  };
  //for sub dynamic inputs
  const Subinputlangth = (text, key) => {
    const _subinputlangth = [...subInputs];
    _subinputlangth[key].sub_numlangth = filterOnlyNumericValue(text);
    _subinputlangth[key].key = key;
    setSubInputs(_subinputlangth);
  };
  const Subinputwidth = (text, key) => {
    const _subinputwidth = [...subInputs];
    _subinputwidth[key].sub_numwidth = filterOnlyNumericValue(text);
    _subinputwidth[key].key = key;
    setSubInputs(_subinputwidth);
  };
  const Subinputhight = (text, key) => {
    const _subinputhight = [...subInputs];
    _subinputhight[key].sub_numheight = filterOnlyNumericValue(text);
    _subinputhight[key].key = key;

    setSubInputs(_subinputhight);
  };
  const Subinputtotal = (value, key) => {
    const _subinputtotal = [...subInputs];
    _subinputtotal[key].sub_total = value;
    _subinputtotal[key].key = key;
    setSubInputs(_subinputtotal);
  };

  const SubinputRemark = (text, key) => {
    const _subinputRemark = [...subInputs];
    _subinputRemark[key].Remark = text;
    _subinputRemark[key].key = key;
    setSubInputs(_subinputRemark);
  };

  //close of sub dynamic inputs

  const addsubmit = () => {
    console.log(inputs);
  }


  const fetchData = async () => {
    const resp = await fetch(`${config.API_URL}unit`);
    const data = await resp.json();
    //  console.log(data);
    setdata(data);
  };
  // get data api list

  useEffect(() => {
    fetchData();
  }, []);

  const saveItems = () => {
    const quantityworkitem = {
      item_name: quantityitem,
      unit_id: value,
      company_id: company_id,
    };
    try {
      fetch(`${config.API_URL}quantity-report-item`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quantityworkitem),
      })
        .then(response => response.json())
        .then(data => {
          setvalue('');
          setquantityitem('');
          reportdataitem();
          console.log('Success:', data);
        });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const reportdataitem = async () => {
    try {
      const resp = await fetch(
        `${config.API_URL}quantity-report-item/` + `${company_id}`,
      );
      const quantitydata = await resp.json();
      // console.log(quantitydata);
      setReportdata(quantitydata);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  useEffect(() => {
    reportdataitem();
  }, []);

  // const moreItembox=()=>{
  //  alert('')
  // }

  const add_quantity_icon_button = () => {
    return (
      <TouchableOpacity
        style={{
          // backgroundColor: COLORS.white,
          borderRadius: SIZES.radius * 0.2,
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: 2,

        }}
        onPress={() => {
          // LayoutAnimation.easeInEaseOut();
          // addInput()
          setReportmodal(true);
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
          top: -SIZES.base * 1.2,

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
          {/* <Text style={{color:COLORS.gray}}>Add Quantity item</Text> */}


        </View>
      </TouchableOpacity>
    )
  }

  const add_inside_handler = () => {
    const _sub_inputs = [...subInputs];
    _sub_inputs.push({
      sub_numlangth: '',
      sub_numwidth: '',
      sub_numheight: '',
      sub_total: '',
      sub_Remark: '',
    });
    setSubInputs(_sub_inputs)
  }

  const delete_inside_Handler = key => {
    const _sub_inputs = subInputs.filter((input, index) => index != key);
    setSubInputs(_sub_inputs);
  };


  const add_qty_data_modal = () => {
    return (
      <View>
        <Modal visible={reportmodal} transparent={false} animationType="slide">
          <View style={{ flex: 1, backgroundColor: '#000000aa', padding: 10 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                marginTop: 50,
                borderRadius: 20,
                padding: 22,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  justifyContent: 'space-between',
                }}>
                <Title>Add Quantity Data</Title>
                <Pressable onPress={setReportmodal}>
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
                    addHandler();
                    // selectunitdata();
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 1
                    }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.darkGray }}>Add</Text>
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
                    setadditem(true);
                  }}>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkGray }}>Add ITEM</Text>
                </TouchableOpacity>
              </View>
              <View style={container}>
                <ScrollView style={inputsContainer}>
                  {inputs ? inputs.map((input, key) => {
                    return (
                      <View style={inputContainer} key={key}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            // alignItems: 'center',
                          }}
                          // key={key}
                          key="{(key+1)}"
                        >
                          <Dropdown
                            style={[
                              styles.dropdown,
                              // cont_Project_list_drop,
                              isFocus && { borderColor: 'blue' },
                            ]}
                            selectedTextStyle={{ color: COLORS.gray, }
                            }
                            placeholderStyle={{ fontSize: 16, color: COLORS.darkGray, left: 5 }}
                            inputSearchStyle={{ color: COLORS.gray, height: 40, borderRadius: 5, padding: -5 }}
                            data={reportdata}
                            search
                            maxHeight={300}
                            labelField="item_name"
                            valueField="_id"
                            placeholder={!isFocus ? 'Select' : '...'}
                            searchPlaceholder="Search..."
                            value={input.value}
                            onChange={item => {
                              setSelectKey(input.key);
                              // if(input.key==key)
                              // console.log(input)
                              // console.log(selectKey)
                              inputselect(item, key);
                              // setunitname(item.unitname);



                              // setValue(item._id);
                              // setIsFocus(false);
                            }}
                          />
                          <TextInput
                            style={inputfromtwo}
                            // editable={false}
                            selectTextOnFocus={false}
                            placeholder={'unit'}

                            // value={(input.key === selectData.key) ? "null" : unitname} 
                            // value={(selectData.index <= inputs.key)?unitname:"null"}
                            //  value = {(input.key==selectData.key)? unitname : null}
                            // value={key==selectKey?input.select.unit_name:selectKey==unitKey?input.select.unit_name:null}
                            value={key == selectKey ? input.select.unit_name : input.select.unit_name}
                            onChangeText={text => { inputunit(text, key) }}
                          />



                          <TouchableOpacity
                            key={key}
                            onPress={() => {
                              // moreItembox();
                              add_inside_handler()
                              // alert(key);
                            }}>
                            <MaterialIcons
                              name="add-box"
                              size={25}
                              color={COLORS.darkBlue}
                              style={{ alignItems: 'center' }}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <TextInput
                            style={inputfromone}
                            placeholder="Length"
                            placeholderTextColor={COLORS.gray}
                            value={input.numlangth}
                            keyboardType="numeric"
                            onChangeText={text => {
                              selectLengthkey(input.key)
                              inputlangth(text, key);
                            }}
                          />
                          <TextInput
                            style={inputfromone}
                            placeholder="Width"
                            placeholderTextColor={COLORS.gray}
                            value={input.numwidth}
                            keyboardType="numeric"
                            onChangeText={text => {
                              selectWidthkey(input.key)
                              inputwidth(text, key);
                            }}
                          />
                          <TextInput
                            style={inputfromone}
                            placeholder="Thickness"
                            placeholderTextColor={COLORS.gray}
                            value={input.numheight}
                            keyboardType="numeric"
                            onChangeText={text => {
                              selectHeightkey(input.key)
                              inputhight(text, key);
                            }}
                          />
                          <TextInput
                            style={inputfromtwo}
                            editable={false}
                            selectTextOnFocus={false}
                            placeholderTextColor={COLORS.white}
                            placeholder={'Total'}
                            value={key == lengthKey == widthKey == heightKey ? (input.numlangth * input.numwidth * input.numheight).toString() : (input.numlangth * input.numwidth * input.numheight).toString()}
                            keyboardType="numeric"
                            onChangeText={value => {
                              inputtotal(value, key);
                              console.log(value)
                            }}
                          />

                        </View>
                        <TextInput
                          style={{
                            width: '90%',
                            borderWidth: 1,
                            height: 30,
                            padding: -6,
                            paddingLeft: 5,
                            marginBottom: 5,
                            borderRadius: 5,
                            marginLeft: 5,
                            color: COLORS.gray,
                            borderColor: COLORS.gray,
                            flexWrap: 'wrap',
                          }}
                          placeholder={'Remark'}
                          placeholderTextColor={COLORS.gray}
                          value={input.Remark}
                          onChangeText={text => inputRemark(text, key)}
                        />
                        <TouchableOpacity onPress={() => deleteHandler(key)}>
                          <Image
                            source={key == 0 ? null : icons.delete_icon}
                            style={{
                              width: 20,
                              height: 20,
                              tintColor: COLORS.red,
                            }}
                          />
                        </TouchableOpacity>
                        <View>
                          {subInputs ? subInputs.map((subinputs, key) => {
                            return (
                              <View
                                key={key}
                                style={{ borderWidth: 1, padding: 4, margin: 4 }}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    flexWrap: "nowrap",
                                    justifyContent: "space-between"
                                  }}>

                                  <TextInput
                                    style={inputfromone}
                                    placeholder="SubLength"
                                    placeholderTextColor={COLORS.gray}
                                    value={subinputs.sub_numlangth}
                                    keyboardType="numeric"
                                    onChangeText={text => {
                                      setSubLengthkey(subInputs.key)
                                      Subinputlangth(text, key);
                                    }}
                                  />
                                  <TextInput
                                    style={inputfromone}
                                    placeholder="SubWidth"
                                    placeholderTextColor={COLORS.gray}
                                    value={subinputs.sub_numwidth}
                                    keyboardType="numeric"
                                    onChangeText={text => {
                                      setSubWidthkey(subInputs.key)
                                      Subinputwidth(text, key);
                                    }}
                                  />
                                  <TextInput
                                    style={inputfromone}
                                    placeholder="SubThickness"
                                    placeholderTextColor={COLORS.gray}
                                    value={subinputs.sub_numheight}
                                    keyboardType="numeric"
                                    onChangeText={text => {
                                      setSubHeightkey(subInputs.key)
                                      Subinputhight(text, key);
                                    }}
                                  />
                                  <TextInput
                                    style={inputfromtwo}
                                    editable={false}
                                    selectTextOnFocus={false}
                                    placeholderTextColor={COLORS.white}
                                    placeholder={'Total'}
                                    value={key == subLengthKey == subWidthKey == subHeightKey ? (subinputs.sub_numlangth * subInputs.sub_numwidth * subinputs.sub_numheight).toString() : (subinputs.sub_numlangth * subInputs.sub_numwidth * subinputs.sub_numheight).toString()}
                                    keyboardType="numeric"
                                    onChangeText={value => {
                                      Subinputtotal(value, key);
                                      console.log(value)
                                    }}
                                  />
                                </View>
                                <TextInput
                                  style={{
                                    width: '90%',
                                    borderWidth: 1,
                                    height: 30,
                                    padding: -6,
                                    paddingLeft: 5,
                                    marginBottom: 5,
                                    borderRadius: 5,
                                    marginLeft: 5,
                                    color: COLORS.gray,
                                    borderColor: COLORS.gray,
                                    flexWrap: 'wrap',
                                  }}
                                  placeholder={'Remark'}
                                  placeholderTextColor={COLORS.gray}
                                  value={subInputs.sub_Remark}
                                  onChangeText={text => SubinputRemark(text, key)}
                                />
                                <TouchableOpacity onPress={() => delete_inside_Handler(key)}>
                                  <Image
                                    source={key == 0 ? null : icons.delete_icon}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      tintColor: COLORS.red,
                                    }}
                                  />
                                </TouchableOpacity>

                              </View>
                            )
                          }) : null}
                        </View>
                        {/* <View style={{flexDirection: 'row'}}>
                   {inputsmore.map((input, key) => (
                     <View
                       style={{flexDirection: 'row', flexWrap: 'wrap'}}
                       key={key}>
                       <TextInput
                         style={{
                           // width:"30%",
                           borderWidth: 1,
                           height: 30,
                           padding: -6,
                           paddingLeft: 5,
                           marginBottom: 5,
                           borderRadius: 10,
                           marginLeft: 5,
                           borderColor: COLORS.gray,
                           flexWrap: 'wrap',
                         }}
                         placeholder={'Name'}
                         value={input.value}
                         onChangeText={text => inputHandler(text, key)}
                       />
                       <TouchableOpacity
                         onPress={() => deleteHandlermore(key)}>
                         <Image
                           source={key == 0 ? null : icons.delete_icon}
                           style={{
                             width: 20,
                             height: 20,
                             tintColor: COLORS.red,
                           }}
                         />
                       </TouchableOpacity>
                     </View>
                   ))}
                 </View> */}
                      </View>
                    )
                  }) : null}
                </ScrollView>
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  title="submit"
                  onPress={() => {
                    addsubmit();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  const add_item_modal = () => {
    return (
      <View>
        <Modal transparent={false} visible={additem} animationType="slide">
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
                <Text style={{ ...FONTS.h2, color: COLORS.darkGray }}>Quantity item</Text>
                <Pressable onPress={setadditem}>
                  <AntDesign name="close" size={30} color={COLORS.black} />
                </Pressable>
              </View>
              <View style={{ marginTop: 20 }}>
                <FormInput
                  label="Name"
                  onChange={quantityitem => {
                    setquantityitem(quantityitem);
                  }}
                />
                <Dropdown
                  style={[dropdown1, isFocus && { borderColor: 'blue' }]}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="unit_name"
                  valueField="_id"
                  placeholder={!isFocus ? 'Select' : '...'}
                  placeholderStyle={{ fontSize: 16, color: COLORS.darkGray, left: 5 }}
                  selectedTextStyle={{ color: COLORS.gray, }
                  }
                  inputSearchStyle={{ color: COLORS.gray, height: 40, borderRadius: 5, padding: -5 }}
                  value={value}
                  searchPlaceholder="Search..."
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setvalue(item._id);
                    // setunitname(item.unit_name);
                    setIsFocus(false);
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
                    saveItems();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  return (
    <View>
      {/* Quantity */}
      <Pressable
        onPress={() => setQuantity(!quant_ity)}
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.base,
          paddingVertical: 3,
          width: SIZES.width * 0.35,
          alignItems: 'center',
          justifyContent: 'space-between',
          top: SIZES.base * 2,
          borderColor: COLORS.lightblue_200,
          borderWidth: 1,
          borderRadius: 1,
          elevation: 1,
        }}>
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <Text
            onPress={() => setQuantity(!quant_ity)}
            style={[FONTS.h3, { color: COLORS.darkGray }]}>
            Quantity
          </Text>
        </View>
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => setQuantity(!quant_ity)}>
            <AntDesign name="caretdown" size={12} color={COLORS.gray} />
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
        {/* button section adding contractor */}
        {quant_ity ? add_quantity_icon_button() : null}
      </View>
      {add_qty_data_modal()}
      {add_item_modal()}
    </View>
  );
};

export default Quantity;

import React, {useState, useEffect, useRef, useMemo} from 'react';
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
import {Card, Title, DataTable, Divider, Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../ReportStyle.js';
import config from '../../../../../config';
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  images,
} from '../../../../../constants';
import {FormInput, TextButton, HeaderBar} from '../../../../../Components';

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
  } = styles;
  //all states by rahul sir
  const [value, setvalue] = useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const [value1, setvalue1] = useState(null);
  const [isFocus1, setIsFocus1] = React.useState(false);

  const [quantityitem, setquantityitem] = useState('');
  const [unitname, setunitname] = useState('');
  const [lenght, setlenght] = useState('');
  const [height, setheight] = useState('');
  const [breadth, setbreadth] = useState('');
  const [quantity, setquantity] = useState('');
  const [total, settotal] = useState(0);
  const [particulor, setparticulor] = useState('');

  const [datalist, setdatalist] = useState([]);
  const [quantityitemdata, setquantityitemdata] = useState([]);
  // const [tabalshowdata, settabalshowdata] = useState([]);
  // const [tabalshowdatamore, settabalshowdatamore] = useState([]);

  // const [table, settable] = useState(false);
  const [additem, setadditem] = useState(false);
  const [workmodal, setworkmodal] = useState(false);
  // const [showcardlist, setshowcardlist] = useState(false);

  //Quantity collapse
  const [quant_ity, setQuantity] = useState(false);

  //adding row
  //for s.no counter
  const [counter, setCounter] = useState(0);
  const [counter1, setCounter1] = useState(0);

  // this will be attached with each input onChangeText
  const [particulartextValue, setParticularTextValue] = useState('');
  const [numtextValue, setNumtextValue] = useState('');
  const [lengthtextValue, setlengthtextValue] = useState('');
  const [bredthtextValue, setBredthtextValue] = useState('');
  const [highttextValue, setHighttextValue] = useState('');
  const [rowqtytextValue, setRowqtytextValue] = useState('');
  const [remarktextValue, setRemarktextValue] = useState('');
  const [remarktextValue1, setRemarktextValue1] = useState('');
  const [remarktextValueButton, setRemarktextValueButton] = useState('');

  const [numtextValue1, setNumtextValue1] = useState('');

  // our number of inputs, we can add the length or decrease
  const [numInputs, setNumInputs] = useState(1);
  const [numInputs1, setNumInputs1] = useState(0);
  // all our input fields are tracked with this array
  const refParticularInputs = useRef([particulartextValue]);
  const refNum1 = useRef([remarktextValue1]);
  const refButton = useRef([remarktextValueButton]);

  const refNum = useRef([numtextValue]);
  const refLength = useRef([lengthtextValue]);
  const refBredth = useRef([bredthtextValue]);
  const refHight = useRef([highttextValue]);
  const refRowqty = useRef([rowqtytextValue]);
  const refRemark = useRef([remarktextValue]);

  const refNumone = useRef([numtextValue1]);

  useMemo(() => {
    const quantitytotal = lenght * breadth * height;
    setquantity(quantitytotal);
  }, [lenght, breadth, height]);

  const addsavedailyreport = () => {
    // alert('clicked');
    const repordata = {
      value1: value1,
      numtextValue: numtextValue,
      lengthtextValue: lengthtextValue,
      bredthtextValue: bredthtextValue,
      highttextValue: highttextValue,
      rowqtytextValue: rowqtytextValue,
      remarktextValue: remarktextValue,
    };
    console.log(repordata);
  };

  const savedata = () => {
    const quantitywork = {
      particular: particulor,
      width: breadth,
      length: lenght,
      height: height,
      qty: quantity,
      item_id: value,
    };

    fetch(`${config.API_URL}quantity-report`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quantitywork),
    })
      .then(response => response.json())
      .then(data => {
        setvalue('');
        setunitname('');
        setparticulor('');
        setlenght('');
        setbreadth('');
        setheight('');
        settotal('');
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const saveQuantityitem = () => {
    const quantityworkitem = {
      item_name: quantityitem,
      unit_id: value,
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
          console.log('Success:', data);
        });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // quantity work get api
  const quantityworkdata = async () => {
    const resp = await fetch(`${config.API_URL}quantity-report-item`);
    const quantitydata = await resp.json();
    // console.log(quantitydata);
    setquantityitemdata(quantitydata);
  };
  useEffect(() => {
    quantityworkdata();
  }, []);

  // table data quantitytable api fetch api
  const quantitytable = async () => {
    try {
      const resp = await fetch(`${config.API_URL}quantity-report`);
      const tabledata = await resp.json();
      //  console.log(tabledata);
      const data = tabledata.map(data => {
        return data.quantity;
        // data.quantity.map((ab)=>{
        //   return(console.log(ab.particular))
        // })
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    quantitytable();
  }, []);

  //   unit api
  const listData = async () => {
    const resp = await fetch(`${config.API_URL}unit`);
    const data = await resp.json();
    //  console.log(data);
    setdatalist(data);
  };
  useEffect(() => {
    listData();
  }, []);
  //button add item function
  const add_item = () => {
    return (
      <TouchableOpacity
        style={{
          // backgroundColor: COLORS.white,
          borderRadius: SIZES.radius * 0.2,
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: 2,
        }}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          // addInput()
          setadditem(true);
        }}>
        <View
          style={{
            alignSelf: 'center',
            padding: 2,
            borderWidth: 1,
            borderColor: COLORS.lightblue_200,
            paddingHorizontal: 4,
            borderRadius: 5,
          }}>
          {/* <MaterialIcons
                        name='add-box'
                        size={25}
                        color={COLORS.lightblue_400}
                    /> */}
          <Text style={{...FONTS.h4, color: COLORS.darkGray2}}>Add Item</Text>
        </View>
      </TouchableOpacity>
    );
  };
  //  add item model
  const add_item_modal = () => {
    return (
      <>
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
                <Text style={{...FONTS.body2, color: COLORS.darkGray}}>
                  Quantity item
                </Text>
                <Pressable onPress={setadditem}>
                  <AntDesign name="close" color={COLORS.darkGray} size={30} />
                </Pressable>
              </View>
              <View style={{marginTop: 20}}>
                <FormInput
                  label="Name"
                  onChange={quantityitem => {
                    setquantityitem(quantityitem);
                  }}
                  style={{...FONTS.h4, color: COLORS.black}}
                />
              </View>
              <View>
                <Dropdown
                  style={[styles1.dropdown1, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={{...FONTS.h4, color: COLORS.darkGray}}
                  selectedTextStyle={{...FONTS.h4, color: COLORS.darkGray}}
                  inputSearchStyle={{...FONTS.h4, color: COLORS.darkGray}}
                  iconStyle={styles1.iconStyle}
                  data={datalist}
                  search
                  maxHeight={300}
                  labelField="unit_name"
                  valueField="_id"
                  placeholder={!isFocus ? 'Select' : '...'}
                  value={value}
                  searchPlaceholder="Search..."
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setvalue(item._id);
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
                    saveQuantityitem();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  };

  // add work modal
  const add_list_work_modal = () => {
    return (
      <>
        <Modal transparent={false} visible={workmodal} animationType="slide">
          <View style={{flex: 1, backgroundColor: '#000000aa'}}>
            <View
              style={{
                flex: 1,
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
                  borderBottomWidth: 1,
                }}>
                <Text style={{...FONTS.body2}}></Text>
                <Pressable onPress={setworkmodal}>
                  <AntDesign name="close" size={30} color="black" />
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Dropdown
                  style={[styles1.dropdown, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={styles1.placeholderStyle}
                  selectedTextStyle={styles1.selectedTextStyle}
                  inputSearchStyle={styles1.inputSearchStyle}
                  iconStyle={styles1.iconStyle}
                  data={quantityitemdata}
                  search
                  maxHeight={300}
                  labelField="item_name"
                  valueField="_id"
                  placeholder={!isFocus ? 'Select' : '...'}
                  value={value}
                  searchPlaceholder="Search..."
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setvalue(item._id);
                    setunitname(item.unit_name);
                    setIsFocus(false);
                  }}
                />
                <FormInput
                  containerStyle={{width: '30%'}}
                  editable={false}
                  selectTextOnFocus={false}
                  placeholder={unitname}
                  onChange={unitname => {
                    setunitname(unitname);
                  }}
                />
              </View>
              <ScrollView style={{maxHeight: 250}}>
                <View>
                  <FormInput
                    label="Particular"
                    onChange={particulor => {
                      setparticulor(particulor);
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <FormInput
                    containerStyle={{width: '30%'}}
                    label="L"
                    keyboardType="numeric"
                    onChange={lenght => {
                      setlenght(lenght);
                    }}
                  />
                  <FormInput
                    containerStyle={{width: '30%'}}
                    label="B"
                    keyboardType="numeric"
                    onChange={breadth => {
                      setbreadth(breadth);
                    }}
                  />
                  <FormInput
                    containerStyle={{width: '30%'}}
                    label="H"
                    keyboardType="numeric"
                    onChange={height => {
                      setheight(height);
                    }}
                  />
                </View>
                <View>
                  <FormInput
                    label="Quantity"
                    // editable={false}
                    selectTextOnFocus={false}
                    onChange={text => {
                      settotal(text);
                      // console.log(quantity)
                    }}
                    value={quantity.toString()}
                  />
                </View>
              </ScrollView>
              <View>
                <TextButton
                  label="save"
                  buttonContainerStyle={{
                    height: 45,
                    borderRadius: SIZES.radius,
                    marginTop: SIZES.padding,
                  }}
                  onPress={() => {
                    savedata();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  };

  const addmoreRowfuncation = () => {
    setCounter(prev => prev + 1);
    refNumone.current.push('');

    setNumInputs1(value => value + 1);
  };

  //add Row to table code

  //add field element
  const addRowfunction = () => {
    setCounter(prev => prev + 1);
    //adding new element in our refinput
    refParticularInputs.current.push('');
    refNum1.current.push('');
    refNum.current.push('');
    refLength.current.push('');
    refBredth.current.push('');
    refHight.current.push('');
    refRowqty.current.push('');
    refRemark.current.push('');
    refButton.current.push('');

    //increase the no. of inputs)
    setNumInputs(value => value + 1);
  };
  //remove field elements
  const removeRowfunction = i => {
    //remove element from array by index
    refParticularInputs.current.splice(i, 1)[0];
    refNum1.current.slice(i, 1)[0];
    refNum.current.splice(i, 1)[0];
    refLength.current.splice(i, 1)[0];
    refBredth.current.splice(i, 1)[0];
    refHight.current.splice(i, 1)[0];
    refRowqty.current.splice(i, 1)[0];
    refRemark.current.splice(i, 1)[0];
    refButton.current.splice(i, 1)[0];

    //decrease no. of inputs
    setNumInputs(value => value - 1);
  };

  // add button
  const setbuttonvalue = (index, value) => {
    //first storing input value to refinputs
    const button_value = refButton.current;
    button_value[index] = value;
    //also setting text value to input
    setRemarktextValueButton(value);
  };

  //set value to to field onchange event code
  const setParticularInputValue = (index, value) => {
    //first storing input value to refinputs
    const particular_inputs = refParticularInputs.current;
    particular_inputs[index] = value;
    //also setting text value to input
    setParticularTextValue(value);
  };

  const setNumInputValue1 = (index, value) => {
    //first storing input value to refinputs
    const Num_inputs1 = refNum1.current;
    Num_inputs1[index] = value;
    //also setting text value to input
    setRemarktextValue1(value);
  };
  const setNumInputValue = (index, value) => {
    //first storing input value to refinputs
    const Num_inputs = refNum.current;
    Num_inputs[index] = value;
    //also setting text value to input
    setNumtextValue(value);
  };
  const setLengthInputValue = (index, value) => {
    //first storing input value to refinputs
    const Length_inputs = refLength.current;
    Length_inputs[index] = value;
    //also setting text value to input
    setlengthtextValue(value);
  };
  const setBreadthInputValue = (index, value) => {
    //first storing input value to refinputs
    const breadth_inputs = refBredth.current;
    breadth_inputs[index] = value;
    //also setting text value to input
    setBredthtextValue(value);
  };
  const setHeightInputValue = (index, value) => {
    //first storing input value to refinputs
    const height_inputs = refHight.current;
    height_inputs[index] = value;
    //also setting text value to input
    setHighttextValue(value);
  };
  const setQtyInputValue = (index, value) => {
    //first storing input value to refinputs
    const qty_inputs = refRowqty.current;
    qty_inputs[index] = value;
    //also setting text value to input
    setRowqtytextValue(value);
  };
  const setRemarkInputValue = (index, value) => {
    //first storing input value to refinputs
    const remark_inputs = refRemark.current;
    remark_inputs[index] = value;
    //also setting text value to input
    setRemarktextValue(value);
  };

  const setNumInputValueone = (index, value) => {
    //first storing input value to refinputs
    const Num_inputone = refNumone.current;
    Num_inputone[index] = value;
    //also setting text value to input
    setNumtextValue1(value);
  };
  //generating input fields
  const particular_inputs = [];
  const Num_inputs1 = [];
  const Num_inputs = [];
  const Length_inputs = [];
  const breadth_inputs = [];
  const height_inputs = [];
  const qty_inputs = [];
  const remark_inputs = [];
  const unitrow = [];
  const counter_test = [];
  const button_value = [];

  const Num_inputsone = [];
  // insert row
  for (let i = 0; i < numInputs1; i++) {
    Num_inputsone.push(
      <View key={i} style={{alignItems: 'flex-start', top: 0}}>
        <TextInput
          style={[styles1.common_textInput, {width: 60, borderColor: 'black'}]}
          onChangeText={value => setNumInputValueone(i, value)}
          value={refNumone.current[i]}
          placeholderStyle={{padding: -6, top: 8}}
          placeholderTextColor={COLORS.gray2}
        />
      </View>,
    );
  }

  // function Testinput() {
  for (let i = 0; i < numInputs; i++) {
    particular_inputs.push(
      <View key={i} style={{alignItems: 'flex-start', top: 0}}>
        <TextInput
          style={[styles1.common_textInput, {width: 60}]}
          onChangeText={value => setParticularInputValue(i, value)}
          value={refParticularInputs.current[i]}
          placeholderStyle={{padding: -6, top: 8}}
          placeholder="Particular"
          placeholderTextColor={COLORS.gray2}
        />
        {/* <Pressable onPress={() => removeRowfunction(i)} style={{ marginLeft: 5 }}>
                        <AntDesign
                            name="minuscircleo"
                            size={20}
                            color="red"
                        />
                    </Pressable> */}
      </View>,
    );

    Num_inputs1.push(
      <View
        key={i}
        style={{alignItems: 'flex-start', top: 0, flexDirection: 'row'}}>
        <Dropdown
          style={{
            height: 22,
            borderWidth: 1,
            padding: 5,
            marginBottom: 3,
            width: 80,
            borderRadius: 10,
          }}
          placeholderStyle={{fontSize: 15, width: 50, height: 20}}
          selectedTextStyle={{fontSize: 15}}
          //   inputSearchStyle={styles.inputSearchStyle}
          //   iconStyle={styles.iconStyle}
          data={datalist}
          search
          maxHeight={200}
          labelField="unit_name"
          valueField="_id"
          placeholder={!isFocus ? 'Select' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setNumInputValue1(i, value);
            console.log(item);
            setvalue1(item._id);
            setIsFocus1(false);
          }}
        />
      </View>,
    );

    // add button
    button_value.push(
      <View key={i}>
        <TouchableOpacity
          style={[styles1.common_textInput, {width: 25}]}
          onChangeText={value => setbuttonvalue(i, value)}
          value={refButton.current[i]}
          onPress={() => {
            addmoreRowfuncation();
          }}>
          <MaterialIcons
            name="add-box"
            size={20}
            color={COLORS.lightblue_700}
          />
        </TouchableOpacity>
      </View>,
    );
    Num_inputs.push(
      <View key={i} style={{alignItems: 'flex-start', top: 0}}>
        <TextInput
          style={[styles1.common_textInput, {width: 25}]}
          onChangeText={value => setNumInputValue(i, value)}
          value={refNum.current[i]}
          placeholderStyle={{padding: -6, top: 8}}
          placeholder="Num"
          placeholderTextColor={COLORS.gray2}
        />

        {/* <Pressable onPress={() => removeRowfunction(i)} style={{ marginLeft: 5 }}>
                        <AntDesign
                            name="minuscircleo"
                            size={20}
                            color="red"
                        />
                    </Pressable> */}
      </View>,
    );
    Length_inputs.push(
      <View key={i} style={{alignItems: 'flex-start', top: 0}}>
        <TextInput
          style={[styles1.common_textInput, {width: 25}]}
          onChangeText={value => setLengthInputValue(i, value)}
          value={refLength.current[i]}
          placeholderStyle={{padding: -6, top: 8}}
          placeholder="Length"
          placeholderTextColor={COLORS.gray2}
        />
        {/* <Pressable onPress={() => removeRowfunction(i)} style={{ marginLeft: 5 }}>
                        <AntDesign
                            name="minuscircleo"
                            size={20}
                            color="red"
                        />
                    </Pressable> */}
      </View>,
    );
    breadth_inputs.push(
      <View key={i} style={{alignItems: 'flex-start', top: 0}}>
        <TextInput
          style={[styles1.common_textInput, {width: 25}]}
          onChangeText={value => setBreadthInputValue(i, value)}
          value={refBredth.current[i]}
          placeholderStyle={{padding: -6, top: 8}}
          placeholder="Breadth"
          placeholderTextColor={COLORS.gray2}
        />
        {/* <Pressable onPress={() => removeRowfunction(i)} style={{ marginLeft: 5 }}>
                        <AntDesign
                            name="minuscircleo"
                            size={20}
                            color="red"
                        />
                    </Pressable> */}
      </View>,
    );
    height_inputs.push(
      <View key={i} style={{alignItems: 'flex-start', top: 0}}>
        <TextInput
          style={[styles1.common_textInput, {width: 25}]}
          onChangeText={value => setHeightInputValue(i, value)}
          value={refHight.current[i]}
          placeholderStyle={{padding: -6, top: 8}}
          placeholder="Height"
          placeholderTextColor={COLORS.gray2}
        />
        {/* <Pressable onPress={() => removeRowfunction(i)} style={{ marginLeft: 5 }}>
                        <AntDesign
                            name="minuscircleo"
                            size={20}
                            color="red"
                        />
                    </Pressable> */}
      </View>,
    );
    qty_inputs.push(
      <View key={i} style={{alignItems: 'flex-start', top: 0}}>
        <TextInput
          style={[styles1.common_textInput, {width: 32}]}
          onChangeText={value => setQtyInputValue(i, value)}
          value={refRowqty.current[i]}
          placeholderStyle={{padding: -6, top: 8}}
          placeholder="Qty"
          placeholderTextColor={COLORS.gray2}
        />
        {/* <Pressable onPress={() => removeRowfunction(i)} style={{ marginLeft: 5 }}>
                        <AntDesign
                            name="minuscircleo"
                            size={20}
                            color="red"
                        />
                    </Pressable> */}
      </View>,
    );
    remark_inputs.push(
      <View key={i} style={{alignItems: 'flex-start', top: 0}}>
        <TextInput
          style={[styles1.common_textInput, {width: 48}]}
          onChangeText={value => setRemarkInputValue(i, value)}
          value={refRemark.current[i]}
          placeholderStyle={{padding: -6, top: 8}}
          placeholder="Remark"
          placeholderTextColor={COLORS.gray2}
        />
        {/* <Pressable onPress={() => removeRowfunction(i)} style={{ marginLeft: 5 }}>
                        <AntDesign
                            name="minuscircleo"
                            size={20}
                            color="red"
                        />
                    </Pressable> */}
      </View>,
    );

    unitrow.push(
      <View key={i}>
        <Text style={styles1.data_cell_head}>unit</Text>
      </View>,
    );

    counter_test.push(
      <View key={i}>
        <Text style={styles1.common_textInput}>{counter}</Text>
      </View>,
    );
  }
  // }

  // table view data
  const table_view = () => {
    return (
      <>
        <View
          style={{
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: COLORS.lightblue_100,
            marginTop: 10,
          }}>
          <View>
            <View
              style={{
                overflow: 'scroll',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignContent: 'center',
                paddingHorizontal: -SIZES.body2,
              }}>
              <View>
                <View>
                  <Text style={styles1.data_cell_head}>S.no</Text>
                </View>
                <View style={{flexDirection: 'column', left: 10}}>
                  {Num_inputs.map((key, index) => {
                    return (
                      <View style={{flexDirection: 'column'}} key={index}>
                        <Text style={{...FONTS.body4, color: COLORS.black}}>
                          {index + 1}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={styles1.data_cell_head}>Item</Text>
                  </View>
                  <View>
                    <View style={{paddingLeft: SIZES.base * 0.4}}>
                      <Pressable
                        style={{alignSelf: 'flex-end'}}
                        onPress={() => {
                          // Testinput();
                          addRowfunction();
                        }}>
                        <MaterialIcons
                          name="add-box"
                          size={20}
                          color={COLORS.lightblue_400}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View>{Num_inputs1}</View>
                  <View>{button_value}</View>
                </View>
                <View>
                  <View></View>
                <View style={{flexDirection: 'row'}}>{Num_inputsone}</View>
                </View>
              </View>

              {/* <View style={{ flexDirection: "column" }}>
                                <View>
                                    <Text style={styles1.data_cell_head} >Particular</Text>
                                </View>
                                <View>
                                    {particular_inputs}
                                </View>
                            </View> */}

              <View>
                <View>
                  <Text style={styles1.data_cell_head}>No.</Text>
                </View>
                <View>{Num_inputs}</View>
              </View>

              <View>
                <View>
                  <Text style={styles1.data_cell_head}>L</Text>
                </View>
                <View>{Length_inputs}</View>
              </View>
              <View>
                <View>
                  <Text style={styles1.data_cell_head}>B</Text>
                </View>
                <View>{breadth_inputs}</View>
              </View>
              <View>
                <View>
                  <Text style={styles1.data_cell_head}>H</Text>
                </View>
                <View>{height_inputs}</View>
              </View>
              <View>
                <View>
                  <Text style={styles1.data_cell_head}>Qty</Text>
                </View>
                <View>{qty_inputs}</View>
              </View>
              <View>
                <View>
                  <Text style={styles1.data_cell_head}>Unit</Text>
                </View>
                <View>{unitrow}</View>
              </View>
              <View>
                <View>
                  <Text style={styles1.data_cell_head}>Remark</Text>
                </View>
                <View>{remark_inputs}</View>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  addsavedailyreport();
                }}>
                <Text style={{borderWidth: 1,padding:2}}>add</Text>
              </TouchableOpacity>
            </View>

            {/* <Divider
              style={{
                backgroundColor: COLORS.black,
                width: SIZES.width * 0.9,
                marginHorizontal: 2,
                top: 5,
              }}
            /> */}
            <ScrollView style={styles1.scroll} nestedScrollEnabled={true}>
              <View
                style={{
                  flexDirection: 'column',
                  alignContent: 'flex-start',
                  top: 12,
                  marginBottom: 25,
                }}>
                <ScrollView>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignContent: 'center',
                      paddingHorizontal: 10,
                    }}>
                    {/* <View style={{ flexDirection: "column" }}>
                                            {
                                                Num_inputs.map((key, index) => {
                                                    return (
                                                        <View style={{ flexDirection: "column" }} key={index}>
                                                            <Text style={{ ...FONTS.body4, color: COLORS.black }} >{index + 1}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View> */}
                    {/* <View>
                                            <Text style={{ ...FONTS.body4, color: COLORS.black }} >Drop item</Text>
                                        </View> */}
                    {/* <View>
                                            {particular_inputs}
                                        </View> */}
                    {/* <View>
                                            {Num_inputs}
                                        </View> */}
                    {/* <View>
                                            {Length_inputs}
                                        </View> */}
                    {/* <View>
                                            {breadth_inputs}
                                        </View> */}
                    {/* <View>
                                            {height_inputs}
                                        </View>
                                        <View>
                                            {qty_inputs}
                                        </View>
                                        <View>
                                            {unitrow}
                                        </View>
                                        <View>
                                            {remark_inputs}
                                        </View> */}
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </>
    );
  };

  return (
    <View>
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
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            <Text
              onPress={() => setQuantity(!quant_ity)}
              style={[FONTS.h3, {color: COLORS.darkGray}]}>
              Quantity
            </Text>
          </View>
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            <TouchableOpacity onPress={() => setQuantity(!quant_ity)}>
              <AntDesign name="caretdown" size={12} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>
      {/* <View
                style={{
                    alignSelf: "flex-end",
                    flexDirection: "row",
                }}
            >
                {quant_ity ? add_item() : null}
            </View> */}

      {add_item_modal()}
      <View style={{top: 22}}>
        {quant_ity ? (
          <>
            <View
              style={{
                borderWidth: 1,
                backgroundColor: COLORS.lightGray2,
                borderColor: COLORS.lightblue_200,
              }}>
              <View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                    Daily Quantity Report
                  </Text>
                  <Divider
                    style={{
                      backgroundColor: COLORS.black,
                      width: SIZES.width * 0.9,
                      marginHorizontal: 2,
                      top: 5,
                    }}
                  />

                  {/* <TouchableOpacity
                                        style={{
                                            borderWidth: 1,
                                            width: 70,
                                            alignItems: 'center',
                                            bottom:5,
                                            borderRadius: 2
                                            // marginVertical: 2,
                                            // marginHorizontal:2,
                                            // paddingHorizontal:6
                                        }}
                                        onPress={() => {
                                            setworkmodal(true);
                                        }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                paddingHorizontal:5
                                            }}>
                                            <Title>Add</Title>
                                            <MaterialIcons
                                                name='add-box'
                                                size={25}
                                                color={COLORS.lightblue_400}
                                            />
                                        </View>
                                    </TouchableOpacity> */}
                </View>
                {/* <ScrollView style={styles1.scroll} nestedScrollEnabled={true}> */}
                {/* <TouchableOpacity
                                        onPress={() => {
                                            settable(!table);
                                        }}>
                                        {quantityitemdata.map((ele, key) => {
                                            return (
                                                <View key={key}>
                                                    <Title style={{ textTransform: 'capitalize' }}>
                                                        {ele.item_name}
                                                    </Title>
                                                </View>
                                            );
                                        })}
                                    </TouchableOpacity> */}

                {table_view()}
                <View
                  style={{
                    alignSelf: 'flex-end',
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}>
                  {quant_ity ? add_item() : null}
                </View>
                {/* </ScrollView> */}
              </View>
              {add_list_work_modal()}
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default Quantity;
const styles1 = StyleSheet.create({
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 28,
    width: '65%',
  },
  dropdown1: {
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: 28,
  },

  scroll: {
    maxHeight: 200,
  },
  data_cell_head: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  data_cell_row: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  common_textInput: {
    ...FONTS.h5,
    borderWidth: 1,
    height: 20,
    padding: -6,
    margin: 2,
    color: COLORS.darkGray,
    borderColor: COLORS.lightblue_200,
  },
  dropdown2: {
    height: 30,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 15,
    width: '22%',
  },
  icon: {
    marginRight: 15,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'red',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

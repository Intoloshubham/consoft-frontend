import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Pressable,
  Button,
  TextInput,
  TouchableOpacity

} from 'react-native';
import { Title, Divider } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../ReportStyle.js';
import { Insert_report_data, Get_report_data, edit_report_data, check_quantity_item_exist, update_quantity_data, get_quality_type } from '../../ReportApi.js'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux';
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  images,
} from '../../../../../constants';
import { FormInput, TextButton, HeaderBar, CustomToast } from '../../../../../Components';

const Quantity = ({ project_id, Main_drp_pro_value }) => {
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

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);


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

  //setting Main input data to post
  const [itemData, setItemData] = useState(reportdata.data)
  const [companyIdData, setCompanyIdData] = useState('');
  const [removeAddOnEdit, setRemoveAddOnEdit] = useState(false)
  // const [editReportData, setEditReportData] = useState('')
  const [updateId, setUpdateId] = useState('')
  const [updateStatus, setUpdateStatus] = useState('')


  //setting post qty data  status 
  const [postQtyData, setPostQtyData] = useState('')
  //main get report data
  const [getRepPostData, setGetRepPostData] = useState('')

  const [qualityType, setQualityType] = useState([])


  //sub key states of dynamic inputs
  const [subLengthKey, setSubLengthkey] = useState('');
  const [subWidthKey, setSubWidthkey] = useState('');
  const [subHeightKey, setSubHeightkey] = useState('');



  const [unitKey, setUnitKey] = useState('');

  const [inputs, setInputs] = useState([
    {
      item_id: '', num_length: '', num_width: '', num_height: '', num_total: '', remark: '', unit_name: '', quality_type: ''
      , subquantityitems: [
        // { num_length: '', num_width: '', num_height: '', num_total: '', Remark: '', }
      ]
    }
  ]);






  const addKeyref = useRef(0);


  const userData = useSelector(state => state.user);
  // console.log("🚀 ~ file: Quantity.js ~ line 153 ~ Quantity ~ userData", userData)
  // console.log(userData)

  const current_dat = moment().format("YYYY%2FMM%2FDD")
  // console.log(current_dat)



  const inputkeyRef = useRef(inputs);


  const CONST_FIELD = {
    MANPOWER: 'Manpower',
    STOCK: 'Stock',
    QUANTITY: 'Quantity',
    QUALITY: 'Quality',
    TANDP: 'Tandp'
  }

  //Invoking Report data functions in Report api
  const insertQtyPostData = () => {

    const report_post_data = {
      company_id: companyIdData,
      project_id: project_id,
      user_id: userData._id,
      inputs
    }
    // console.log("🚀 ~ file: Quantity.js ~ line 154 ~ insertQtyPostData ~ report_post_data", report_post_data)
    if (report_post_data) {
      const data = Insert_report_data(report_post_data, CONST_FIELD)
      data.then((res) => res.json())
        .then((resp) => {
          // console.log("resp report data")
          // console.log(resp)

          setPostQtyData(resp)
          if (resp.status == '200') {
            setSubmitToast(true)
            // getRreportData()
            setTimeout(() => {
              setReportmodal(false);
            }, 1500);
            inputs.splice(0, inputs.length);

          }
        })
    } else {
      alert("Not inserted")
    }
  }

  const updateQuantityData = async () => {

    // alert(updateId); 
    const resp = {
      inputs
    }


    const data = await update_quantity_data(updateId, resp)
    setUpdateStatus(data)

    if (data.status == '200') {
      // showToast();
      setUpdateToast(true);
      setTimeout(() => {
        setReportmodal(false);
      }, 1500);
      inputs.splice(0, inputs.length);

    }
  }




  const getQualityType = async () => {
    if (qualityType.length == 0) {
      const data = await get_quality_type();
      qualityType.push(...data.data);
    }

  }

  // console.log("🚀 ~ file: Quantity.js ~ line 153 ~ getQualityType ~ qualityType", qualityType)





  // useMemo(() =>
  //   getQualityType()
  //   , [Main_drp_pro_value])



  useEffect(() => {

    async function getReportData() {
      if (Main_drp_pro_value || postQtyData || updateStatus) {
        // You can await here
        const data = await Get_report_data(Main_drp_pro_value, userData._id,  current_dat)
        console.log("🚀 ~ file: Quantity.js ~ line 229 ~ getReportData ~ data", data)
        if (data.status == 200) {
          setGetRepPostData(data);
        } else {
          console.log("data not found!")
        }
        
      }
    }
    
    getReportData();
    getQualityType();
  }, [postQtyData, Main_drp_pro_value, updateStatus])
  
  // console.log("🚀 ~ file: Quantity.js ~ line 230 ~ getRreportData ~ getRepPostData", getRepPostData)



  const editReportBtn = async (id) => {

    setItemData(reportdata.data);
    inputs.splice(0, inputs.length);
    setRemoveAddOnEdit(true);
    setReportmodal(true);



    if (id) {
      const data = edit_report_data(id)
      setUpdateId(id);
      data.then(res => res.json())
        .then(result => {
          console.log("🚀 ~ file: Quantity.js ~ line 303 ~ editReportBtn ~ result", result.data.quality_type)

          if (result.data.subquantityitems.length == 0) {
            setInputs([...inputs, {
              item_id: result.data.item_id, num_length: result.data.num_length.toString(), num_width: result.data.num_width.toString(), num_height: result.data.num_height.toString(),
              num_total: result.data.num_total.toString(), remark: result.data.remark, unit_name: result.data.unit_name, quality_type: result.data.quality_type,
              subquantityitems: []
            }]);
          } else {
            setInputs([...inputs, {
              item_id: result.data.item_id, num_length: result.data.num_length.toString(), num_width: result.data.num_width.toString(), num_height: result.data.num_height.toString(),
              num_total: result.data.num_total.toString(), remark: result.data.remark, unit_name: result.data.unit_name, quality_type: result.data.quality_type,
              subquantityitems:
                // [
                result.data.subquantityitems.map(ele => {
                  return {
                    sub_height: ele.sub_height.toString(), sub_length: ele.sub_length.toString(), sub_remark: ele.sub_remark, sub_total: ele.sub_total.toString(),
                    sub_width: ele.sub_width.toString(), sub_quality_type: ele.sub_quality_type
                  }
                })
              // ]
            }]);  //setinput close

          }  //else close

        })
    }  //main if close

  }



  // console.log("editReportData")
  // console.log(editReportData.data._id.toString())
  const deleteReportButton = () => {
    // setReportmodal(true);
    alert("delete")
    //  if (mainCompId) {
    //   const data = delete_report_data(mainCompId)
    //   data.then(res => res.json())
    //    .then(result => {
    //       console.log(result)
    //     })
    // }
  }












  const addHandler = async () => {

    // if (Main_drp_pro_value) {
    const result1 = await check_quantity_item_exist(Main_drp_pro_value, userData._id);
    console.log("🚀 ~ file: Quantity.js ~ line 364 ~ addHandler ~ result1", result1)

    if (result1.status != 401) {
      // console.log("🚀 ~ file: Quantity.js ~ line 422 ~ addHandler ~ length", result1.data.length)
      let result = reportdata.data.filter(function ({ _id }) {
        return !this.has(_id);
      }, new Set(result1.data.map(({ item_id }) => item_id)));
      setItemData(result);
    } else {
      setItemData(reportdata.data)
    }


    // }

    setInputs([...inputs, {
      item_id: '', num_length: '', num_width: '', num_height: '', num_total: '', remark: '', unit_name: '', quality_type: '',
      subquantityitems: [
        // { num_length: '', num_width: '', num_height: '', total: '', remark: '' }
      ]
    }]);
  };







 
  const deleteHandler = key => {
    // const _inputs = inputs.filter((input, index) => index != key);
    const _inputs = [...inputs]
    _inputs.splice(key, 1);
    setInputs(_inputs);
  };


  // function filterOnlyNumericValue(value) {
  //   return value.replace(/[^0-9]/g, '');
  // }

  const inputselect = (item, key) => {
    // console.log(item.unit_name)
    // setUnitKey(item.unit_name)
    const _inputselcet = [...inputs];
    _inputselcet[key].item_id = item._id;
    _inputselcet[key].unit_name = item.unit_name;
    _inputselcet[key].key = key;

    // console.log("_inputselcet");
    // console.log(item.unit_name);
    // setSelectKey(_inputselcet);

    setInputs(_inputselcet);
  };




  // console.log(selectData);

  const inputunit = (text, key) => {
    const _inputsunit = [...inputs];
    _inputsunit[key].unit_name = text;
    _inputsunit[key].key = key;
    setUnitKey(key);
    // console.log("unitKey");
    // console.log(unitKey);
    setInputs(_inputsunit);
  };
  const inputlangth = (text, key) => {
    // console.log(text)
    const _inputlangth = [...inputs];
    // _inputlangth[key].num_length = filterOnlyNumericValue([text]);
    _inputlangth[key].num_length = text;
    _inputlangth[key].key = key;
    // console.log(text)
    setInputs(_inputlangth);
  };
  const inputwidth = (text, key) => {
    const _inputwidth = [...inputs];
    _inputwidth[key].num_width = text;
    _inputwidth[key].key = key;
    setInputs(_inputwidth);
  };
  const inputhight = (text, key) => {
    const _inputhight = [...inputs];
    _inputhight[key].num_height = text;
    _inputhight[key].key = key;
    setInputs(_inputhight);
  };
  const inputtotal = (value, key) => {
    const _inputtotal = [...inputs];
    _inputtotal[key].num_total = value;
    _inputtotal[key].key = key;
    // console.log(_inputtotal)
    setInputs(_inputtotal);
  };

  const inputRemark = (text, key) => {
    const _inputRemark = [...inputs];
    _inputRemark[key].remark = text;
    _inputRemark[key].key = key;
    setInputs(_inputRemark);
  };
  //for sub dynamic inputs
  const Subinputlangth = (text, index1, key) => {
    const _subinputlangth = [...inputs];
    _subinputlangth[key].subquantityitems[index1].sub_length = text;
    _subinputlangth[key].subquantityitems[index1].key = key;
    // setSubInputs(_subinputlangth);
    setInputs(_subinputlangth);
  };
  const Subinputwidth = (text, index1, key) => {
    const _subinputwidth = [...inputs];
    _subinputwidth[key].subquantityitems[index1].sub_width = text;
    _subinputwidth[key].subquantityitems[index1].key = key;
    setInputs(_subinputwidth);
  };
  const Subinputhight = (text, index1, key) => {
    const _subinputhight = [...inputs];
    _subinputhight[key].subquantityitems[index1].sub_height = text;
    _subinputhight[key].subquantityitems[index1].key = key;

    setInputs(_subinputhight);
  };
  const Subinputtotal = (value, index1, key) => {
    const _subinputtotal = [...inputs];
    _subinputtotal[key].subquantityitems[index1].sub_total = value;
    _subinputtotal[key].subquantityitems[index1].key = key;
    setInputs(_subinputtotal);
  };

  const SubinputRemark = (text, index1, key) => {
    const _subinputRemark = [...inputs];
    _subinputRemark[key].subquantityitems[index1].sub_remark = text;
    _subinputRemark[key].subquantityitems[index1].key = key;

    setInputs(_subinputRemark);
  };

  //close of sub dynamic inputs 




  const fetchData = async () => {
    const resp = await fetch(`${process.env.API_URL}unit`);
    // console.log("🚀 ~ file: Quantity.js ~ line 513 ~ fetchData ~ resp", resp)
    const data = await resp.json();
    setdata(data);
  };
  // get data api list

  useMemo(() => {
    fetchData();
  }, []);
  //  console.log(companyIdData)
  const saveItems = () => {

    const quantityworkitem = {
      item_name: quantityitem,
      unit_id: value,
      company_id: userData.company_id,
    };
    try {
      fetch(`${process.env.API_URL}quantity-report-item`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quantityworkitem),
      })
        .then(response => response.json()) 
        .then(data => {

          if (data.status == 200) {
            setvalue('');
            setquantityitem('');
            alert(data.message)
            setTimeout(() => {
              setadditem(false);
            }, 1500);
          } else {
            alert(data.message)
          }
          reportdataitem();
        });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const reportdataitem = async () => {
    try {
      const resp = await fetch(
        `${process.env.API_URL}quantity-report-item/` + `${userData.company_id}`,
      );
      const quantitydata = await resp.json();
      console.log("🚀 ~ file: Quantity.js ~ line 638 ~ reportdataitem ~ quantitydata", quantitydata)

      // console.log("quantitydata"); 
      // console.log(quantitydata); 
      setReportdata(quantitydata);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  useMemo(() => {
    reportdataitem();
  }, [userData.company_id]);

  const QualityTypeRadioButton = ({ onPress, selected, children, type, mainKey }) => {

    return (
      <View style={styles_m.radioButtonContainer}>
        <TouchableOpacity onPress={onPress} style={[inputs[mainKey].quality_type == type ? styles_m.radioButton : styles_m.radioButton2]}>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles_m.radioButtonText}>{children}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const SubQualityTypeRadioButton = ({ onPress, selected, children, type, mainKey, subKey }) => {

    return (
      <View style={styles_m.radioButtonContainer}>
        <TouchableOpacity onPress={onPress} style={[inputs[mainKey].subquantityitems[subKey].sub_quality_type == type ? styles_m.radioButton : styles_m.radioButton2]}>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles_m.radioButtonText}>{children}</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
          setRemoveAddOnEdit(false);
          inputs.splice(0, inputs.length);
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

  const add_inside_handler = (key, e) => {
    let takekey = key;
    addKeyref.current = takekey;
    const _inputs = [...inputs];
    _inputs[key].subquantityitems.push({
      sub_length: '',
      sub_width: '',
      sub_height: '',
      sub_total: '',
      sub_remark: '',
      sub_quality_type: ''
    });

    setInputs(_inputs)

  }

  const delete_inside_Handler = (key, index1) => {
    let _sub_inputs = [...inputs];
    // const _sub_inputs = subquantityitems.filter((input, index) => index != key);
    _sub_inputs[key].subquantityitems.splice(index1, 1);
    // setsubquantityitems(_sub_inputs);
    setInputs(_sub_inputs)

  };


  const add_subinput_field = (index1, key, subquantityitems) => {

    return (
      <View
        key={index1}
        style={{ borderWidth: 2, padding: 5, margin: 4, borderColor: "green" }}
      >
        {/* <Text style={{ color: COLORS.black }}>{index1}</Text> */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between"
          }}>

          <TextInput
            style={inputfromone}
            placeholder="L"
            placeholderTextColor={COLORS.lightGray1}
            value={subquantityitems.sub_length}
            keyboardType="numeric"
            onChangeText={text => {
              // console.log(subquantityitems)
              setSubLengthkey(subquantityitems.key)
              // setSubLengthData(text)
              Subinputlangth(text, index1, key);
            }}
          />
          <TextInput
            style={inputfromone}
            placeholder="B"
            placeholderTextColor={COLORS.lightGray1}
            value={subquantityitems.sub_width}
            keyboardType="numeric"
            onChangeText={text => {
              setSubWidthkey(subquantityitems.key)
              // setSubWidthData(text)
              Subinputwidth(text, index1, key);
            }}
          />
          <TextInput
            style={inputfromone}
            placeholder="T"
            placeholderTextColor={COLORS.lightGray1}
            value={subquantityitems.sub_height}
            keyboardType="numeric"
            onChangeText={text => {
              setSubHeightkey(subquantityitems.key)
              // setSubThicknessData(text)
              Subinputhight(text, index1, key);
            }}
          />
          <TextInput
            style={inputfromtwo}
            editable={false}
            selectTextOnFocus={false}
            placeholderTextColor={COLORS.white}
            placeholder={'Total'}
            value={index1 == subLengthKey == subWidthKey == subHeightKey ? (subquantityitems.sub_total = subquantityitems.sub_length * subquantityitems.sub_width * subquantityitems.sub_height).toString() : (subquantityitems.sub_total = subquantityitems.sub_length * subquantityitems.sub_width * subquantityitems.sub_height).toString()}
            keyboardType="numeric"
            onChangeText={value => {
              Subinputtotal(value, index1, key);

              // console.log(value)
            }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <TextInput
              style={{
                width: '450%',
                borderWidth: 1,
                height: 30,
                padding: -6,
                paddingLeft: 5,
                // marginBottom: 5,
                borderRadius: 5,
                marginLeft: 5,
                color: COLORS.black,
                borderColor: COLORS.gray,
                flexWrap: 'wrap',
              }}
              placeholder={'Remark'}
              placeholderTextColor={COLORS.lightGray1}
              value={subquantityitems.sub_remark}
              onChangeText={text => {
                SubinputRemark(text, index1, key)
                // setSubTotalData(subquantityitems.sub_total)
                // setSubRemarkData(text)
              }}
            />
          </View>

        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "left", paddingHorizontal: 10 }]}>Quality Test:</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {qualityType ? qualityType.map((subQualityRadioItem, subQualityIndex) => (
            <SubQualityTypeRadioButton
              onPress={() => onSubQualityRadioBtnClick(subQualityRadioItem, key, index1)}
              selected={subQualityRadioItem.selected}
              key={subQualityRadioItem._id}
              type={subQualityRadioItem.type}
              mainKey={key}
              subKey={index1}
            >
              <Text style={[FONTS.h4, { color: COLORS.black }]}>
                {subQualityRadioItem.type}
              </Text>
            </SubQualityTypeRadioButton>
          )) : null}
          <View>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => delete_inside_Handler(key, index1)}>
              <Image
                source={icons.delete_icon}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.green,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }
  //for main box quality
  const onRadioBtnClick = (radioitem, key) => {
    const _input = [...inputs];
    _input[key].quality_type = radioitem.type;
    _input[key].key = key;

    setInputs(_input);
    let updatedState = qualityType.map((isLikedItem) =>
      isLikedItem._id === radioitem._id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setQualityType(updatedState);
  }

  //for sub box quality
  const onSubQualityRadioBtnClick = (subQualityRadioItem, key, index1) => {
    const _inputs = [...inputs];
    _inputs[key].subquantityitems[index1].sub_quality_type = subQualityRadioItem.type;
    _inputs[key].subquantityitems[index1].key = key;
    setInputs(_inputs);

    let updatedState = qualityType.map((isLikedItem) =>
      isLikedItem._id === subQualityRadioItem._id
        ? { ...isLikedItem, selected: true }
        : { ...isLikedItem, selected: false }
    );
    setQualityType(updatedState);
  }

  const add_input_and_subinput = () => {
    return (<View style={container}>
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
                  placeholderStyle={{ fontSize: 16, color: COLORS.gray, left: 5 }}
                  inputSearchStyle={{ color: COLORS.gray, height: 40, borderRadius: 5, padding: -5 }}
                  // data={reportdata.data}
                  data={itemData}
                  search
                  maxHeight={300}
                  labelField="item_name"
                  valueField="_id"
                  placeholder={!isFocus ? 'Select' : '...'}
                  searchPlaceholder="Search..."
                  value={input.item_id}
                  onChange={item => {
                    setSelectKey(input.key);
                    // setItemData(item._id)
                    setCompanyIdData(item.company_id)
                    // setUnitData(item.unit_name)
                    // console.log(item)
                    inputselect(item, key);
                  }}
                />
                <TextInput
                  style={inputfromtwo}
                  // editable={false}
                  selectTextOnFocus={false}
                  placeholder={'unit'}

                  // value={key==selectKey?input.select.unit_name:selectKey==unitKey?input.select.unit_name:null}
                  value={key == selectKey ? input.unit_name : input.unit_name}
                  onChangeText={text => { inputunit(text, key) }}
                />



                <TouchableOpacity
                  key={key}
                  onPress={(e) => {

                    add_inside_handler(key, e)
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
                  value={input.num_length}
                  keyboardType="numeric"
                  onChangeText={text => {
                    selectLengthkey(input.key)
                    // setLengthData(text)
                    // console.log(text)
                    inputlangth(text, key);
                  }}
                />
                <TextInput
                  style={inputfromone}
                  placeholder="Breadth"
                  placeholderTextColor={COLORS.gray}
                  value={input.num_width}
                  keyboardType="numeric"
                  onChangeText={text => {
                    selectWidthkey(input.key)
                    // setWidthData(text)
                    inputwidth(text, key);
                  }}
                />
                <TextInput
                  style={inputfromone}
                  placeholder="Thickness"
                  placeholderTextColor={COLORS.gray}
                  value={input.num_height}
                  keyboardType="numeric"
                  onChangeText={text => {
                    selectHeightkey(input.key)
                    // setThicknessData(text)
                    // setTotalData()

                    // console.log(tot)
                    inputhight(text, key);
                  }}
                />
                <TextInput
                  style={inputfromtwo}
                  editable={false}
                  selectTextOnFocus={false}
                  placeholderTextColor={COLORS.white}
                  placeholder={'Total'}
                  value={key == lengthKey == widthKey == heightKey ? (input.num_total = input.num_length * input.num_width * input.num_height).toString() : (input.num_total = input.num_length * input.num_width * input.num_height).toString()}
                  keyboardType="numeric"
                  onChangeText={value => {
                    inputtotal(value, key);
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
                value={input.remark}
                onChangeText={text => {
                  // setTotalData(input.num_total)
                  // setRemarkData(text);
                  inputRemark(text, key)
                }}
              />
              {qualityType ? qualityType.map((radioitem) => (
                <QualityTypeRadioButton
                  onPress={() => onRadioBtnClick(radioitem, key)}
                  selected={radioitem.selected}
                  key={radioitem._id}
                  type={radioitem.type}
                  mainKey={key}
                >
                  <Text style={[FONTS.h4, { color: COLORS.black }]}>
                    {radioitem.type}
                  </Text>
                </QualityTypeRadioButton>
              )) : null}

              <View>
                {
                  inputs[key].subquantityitems.map((subquantityitems, index1) => {
                    return (
                      add_subinput_field(index1, key, subquantityitems)
                    )
                  })

                }
                <View style={{ alignSelf: "flex-end" }}>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => deleteHandler(key)}>
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
            </View>
          )
        }) : null}
      </ScrollView>
    </View>)
  }



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
                <Pressable onPress={() => {
                  inputs.splice(0, inputs.length);
                  setReportmodal(false);
                  setRemoveAddOnEdit(false);
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
                {removeAddOnEdit ? null :
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
                      <Text style={{ ...FONTS.h3, color: COLORS.darkGray }}>Add Existing Item</Text>
                      <MaterialIcons
                        name="add-box"
                        size={20}
                        color={COLORS.green}
                      />
                    </View>
                  </TouchableOpacity>}
                <TouchableOpacity
                  style={{
                    borderWidth: 1, borderRadius: 2, paddingVertical: 1, marginVertical: 3,
                    paddingHorizontal: 4
                  }}
                  onPress={() => {
                    setadditem(true);
                  }}>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkGray }}>Add New ITEM</Text>
                </TouchableOpacity>
              </View>
              {/*  */}
              {add_input_and_subinput()}
              {/*  */}
              {/* <Toast config={showToast} /> */}
              {removeAddOnEdit ?
                <View style={{ marginTop: 10 }}>
                  <Button
                    title="Update"
                    onPress={() => {
                      updateQuantityData();
                    }}
                  />
                </View> :
                <View style={{ marginTop: 10 }}>
                  <Button
                    title="submit"
                    onPress={() => {
                      setRemoveAddOnEdit(false);
                      insertQtyPostData();
                    }}
                  />
                </View>}
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
              {/* <Toast config={showToastItem} /> */}
            </View>
          </View>
        </Modal>
      </View>
    )
  }




  const Edit_delete_button = ({ edit_size, del_size, __id }) => {
    return (
      <>
        <View style={body_ed_de_view}>
          <View style={body_del_btn}>
            <TouchableOpacity
              onPress={() => editReportBtn(__id)}
            >
              {/* <Foundation name='page-edit' color={item.id == selectedEditId ? "#2aaeff" : null} size={24} /> */}
              <FontAwesome name='edit' color={COLORS.blue} size={edit_size} />
            </TouchableOpacity>
          </View>
          <View style={body_edit_btn}>
            <TouchableOpacity
              onPress={() => deleteReportButton(__id)}
            >
              <MaterialCommunityIcons name='delete' color={COLORS.red} size={del_size} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }




  return (
    <View>
      <Pressable
        onPress={() => {
          Main_drp_pro_value ? null : alert("Select Project First!")
          setQuantity(!quant_ity)
        }}
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
            onPress={() => {
              Main_drp_pro_value ? null : alert("Select Project First!")
              setQuantity(!quant_ity)
            }}
            style={[FONTS.h3, { color: COLORS.darkGray }]}>
            Quantity
          </Text>
        </View>
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => {
            setQuantity(!quant_ity)

            Main_drp_pro_value ? null : alert("Select Project First!")


          }}>
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
        {quant_ity ?
          <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }} >
            <View style={{ backgroundColor: "blue" }}>
              {add_quantity_icon_button()}
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
                // height: 200,
                maxHeight: 200,
                paddingBottom: 6,
                // flex:2,
                // marginBottom: -20,
                // padding: 5,
                elevation: 1
              }}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, maxHeight: 500, borderWidth: 2 }} >
                <View style={{}}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", top: 5, left: -12, position: "relative" }}>
                    <View
                      style={{
                        paddingHorizontal: 5,
                        marginRight: 2,
                        marginLeft: 16,
                        // borderRightWidth: 2,
                        justifyContent: 'center',
                        width: 45,
                        //  borderColor: COLORS.lightblue_200 
                      }}
                    >
                      <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "center" }]}>S.no</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 8,
                        //  borderRightWidth: 2,
                        justifyContent: 'center',
                        width: 145,
                        //  borderColor: COLORS.lightblue_200, 
                      }}
                    >
                      <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "center" }]}>Item Name</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 8,
                        justifyContent: 'center',
                        width: 50,
                        // borderColor: COLORS.lightblue_200, 
                      }}
                    >
                      <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "center" }]}>Length</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 8,
                        // borderLeftWidth: 2, 
                        paddingLeft: 4,
                        justifyContent: 'center',
                        width: 55,
                        // borderColor: COLORS.lightblue_200, 
                      }}
                    >
                      <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "center" }]}>Breadth</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 15,
                        // borderLeftWidth: 2, 
                        paddingLeft: 4,
                        justifyContent: 'center',
                        width: 70,
                        // borderColor: COLORS.lightblue_200, 
                      }}
                    >
                      <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "center" }]}>Thickness</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 8,
                        //  borderLeftWidth: 2, 
                        justifyContent: 'center',
                        width: 60,
                        // borderColor: COLORS.lightblue_200, 
                      }}
                    >
                      <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "center" }]}>Total</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 15,
                        //  borderLeftWidth: 2,
                        // borderRightWidth: 2, 
                        justifyContent: 'center',
                        //  width: 50, borderColor: COLORS.lightblue_200, 
                      }}
                    >
                      <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "center" }]}>Unit</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 8,
                        justifyContent: 'center',
                        paddingLeft: 25,
                        width: SIZES.width * 0.5,
                        // borderColor: COLORS.lightblue_200, 
                        // borderWidth:1
                      }}
                    >
                      <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "center" }]}>Remark</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 8,
                        justifyContent: 'center',
                        width: 120,
                        // borderColor: COLORS.lightblue_200, 
                        // borderWidth:1
                        // borderColor: COLORS.lightblue_200, 
                      }}
                    >
                      <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "center" }]}>Quality Test</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 8,
                        paddingLeft: 15,
                        // borderLeftWidth: 2, 
                        //  borderRightWidth: 2,
                        justifyContent: 'center',
                        width: 60,
                        //  borderColor: COLORS.lightblue_200, 
                      }}
                    >
                      <Text style={[FONTS.h4, { color: COLORS.black, textAlign: "center" }]}>Action</Text>
                    </View>
                  </View>
                  <ScrollView nestedScrollEnabled={true}
                    contentContainerStyle={{
                      // height: 230,
                      top: 10,
                      paddingBottom: 15
                      // borderWidth: 3,
                      // borderColor: COLORS.lightblue_200,
                    }}>
                    <>
                      {
                        getRepPostData ? getRepPostData.data.map((list, index) => (
                          <View
                            style={{
                              flexDirection: "column",
                              alignContent: "space-between",
                              paddingVertical: 20,
                              top: -20
                            }} key={index}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                top: 10,
                                paddingVertical: 3,
                                left: -26,
                              }} >
                              <View
                                style={{
                                  alignContent: "center",
                                  alignSelf: "center",
                                  width: 45,
                                  position: "absolute",

                                  left: 29,
                                  // right: 10,
                                  //  left:0,
                                  top: 3,
                                  //  bottom:0                             
                                }} >
                                <View>
                                  <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                    {index + 1}
                                  </Text>
                                </View>
                                <View style={{ position: "absolute", width: 1, left: 42, top: -10 }}>
                                  <Divider style={{ backgroundColor: COLORS.lightGray1, height: SIZES.height, top: 5 }} />
                                </View>
                              </View>
                              <View style={{
                                alignContent: "center",
                                alignSelf: "center",
                                width: 145,
                                position: "absolute",
                                left: 85,
                                top: 3,

                                // right: 10,

                              }}>
                                <View>
                                  <Text style={[FONTS.h4, { color: COLORS.darkGray }]}>
                                    {list.quantityWorkItems.item_name}
                                  </Text>
                                </View>
                                <View style={{ position: "absolute", width: 1, left: 145, top: -10 }}>
                                  <Divider style={{ backgroundColor: COLORS.lightGray1, height: SIZES.height, top: 5 }} />
                                </View>
                              </View>
                              <View
                                style={{
                                  alignContent: "center",
                                  alignSelf: "center",
                                  width: 50,
                                  position: "absolute",
                                  left: 239,
                                  top: 3,
                                  // borderWidth: 1,
                                  // borderColor: COLORS.lightblue_200,
                                  // right: 10,
                                }}
                              >
                                <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                  {list.quantityWorkItems.num_length}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignContent: "center",
                                  alignSelf: "center",
                                  width: 55,
                                  position: "absolute",
                                  left: 296,
                                  top: 3,
                                  // borderWidth: 1,
                                  // borderColor: COLORS.lightblue_200,
                                  // right: 10,
                                }}
                              >
                                <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                  {list.quantityWorkItems.num_width}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignContent: "center",
                                  alignSelf: "center",
                                  width: 70,
                                  position: "absolute",
                                  left: 358,
                                  top: 3,
                                  // borderWidth: 1,
                                  // borderColor: COLORS.lightblue_200,
                                  // right: 10,
                                }}
                              >
                                <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                  {list.quantityWorkItems.num_height}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignContent: "center",
                                  alignSelf: "center",
                                  width: 60,
                                  position: "absolute",
                                  left: 437,
                                  top: 3,
                                  // borderWidth: 1,
                                  // borderColor: COLORS.lightblue_200,
                                  // right: 10,
                                }}
                              >
                                <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                  {list.quantityWorkItems.num_total}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignContent: "center",
                                  alignSelf: "center",
                                  width: 50,
                                  position: "absolute",
                                  left: 505,
                                  top: 3,
                                  // borderWidth: 1,
                                  // borderColor: COLORS.lightblue_200,

                                  // right: 10,
                                }}
                              >
                                <View>
                                  <View style={{ position: "absolute", width: 1, left: 50, top: -10 }}>
                                    <Divider style={{ backgroundColor: COLORS.lightGray1, height: SIZES.height, top: 5 }} />
                                  </View>
                                  <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                    {list.quantityWorkItems.unit_name}
                                  </Text>
                                </View>
                                <View style={{ position: "absolute", width: 1, left: -4, top: -10 }}>
                                  <Divider style={{ backgroundColor: COLORS.lightGray1, height: SIZES.height, top: 5 }} />
                                </View>
                              </View>
                              <View
                                style={{
                                  alignContent: "center",
                                  alignSelf: "center",
                                  width: SIZES.width * 0.5,
                                  position: "absolute",
                                  left: 563,
                                  top: 3,
                                  // borderWidth: 1,
                                  // borderColor: COLORS.lightblue_200,
                                  // right: 10,
                                }}
                              >
                                <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                  {list.quantityWorkItems.remark}
                                </Text>
                                <View style={{ position: "absolute", width: 1, left: 210, top: -10 }}>
                                  <Divider style={{ backgroundColor: COLORS.lightGray1, height: SIZES.height, top: 5 }} />
                                </View>
                              </View>
                              <View
                                style={{
                                  alignContent: "center",
                                  alignSelf: "center",
                                  width: SIZES.width * 0.5,
                                  position: "absolute",
                                  left: 720,
                                  top: 3,
                                  // borderWidth: 1,
                                  // borderColor: COLORS.lightblue_200,
                                  // right: 10,
                                }}
                              >
                                <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                  {list.quantityWorkItems.quality_type}
                                </Text>
                                <View style={{ position: "absolute", width: 1, left: 165, top: -10 }}>
                                  <Divider style={{ backgroundColor: COLORS.lightGray1, height: SIZES.height, top: 5 }} />
                                </View>
                              </View>
                              <View
                                style={{
                                  // alignContent: "center",
                                  // alignSelf: "center",
                                  width: 60,
                                  position: "absolute",
                                  left: 905,
                                  top: 3,
                                  // borderWidth: 1,
                                  // borderColor: COLORS.lightblue_200,
                                  // right: 10,
                                }}
                              >
                                <View style={{ justifyContent: "center", alignSelf: "center" }}>
                                  <Edit_delete_button edit_size={18} del_size={22} __id={list.quantityWorkItems._id} />
                                </View>
                              </View>
                            </View>
                            <View style={{ top: 10, position: "relative", left: 170 }}>
                              {
                                getRepPostData ? list.quantityWorkItems.subquantityitems.map((res, index2) =>
                                (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      // borderRightWidth: 2,
                                      // borderWidth: 1,

                                      // borderColor: COLORS.lightblue_200,
                                      alignContent: "center",
                                      position: "relative",
                                      paddingBottom: 12,
                                      top: 35,
                                      marginBottom: 0,
                                    }} key={index2}>

                                    <View
                                      style={{
                                        width: 50,
                                        position: "absolute",
                                        top: 10,
                                        left: 40,
                                        // borderWidth: 1,
                                        // borderColor: COLORS.lightblue_200,

                                      }}
                                    >
                                      <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                        {res.sub_length}
                                      </Text>
                                      <View style={{ position: "absolute", width: 1, left: 60, top: -59 }}>
                                        <Divider style={{ backgroundColor: COLORS.lightGray1, height: SIZES.height, top: 5 }} />
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        width: 50,
                                        position: "absolute",
                                        top: 10,
                                        left: 100,
                                        // borderWidth: 1,
                                        // borderColor: COLORS.lightblue_200,

                                      }}
                                    >
                                      <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                        {res.sub_width}
                                      </Text>
                                      <View style={{ position: "absolute", width: 1, left: 62, top: -59 }}>
                                        <Divider style={{ backgroundColor: COLORS.lightGray1, height: SIZES.height, top: 5 }} />
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        width: 70,
                                        position: "absolute",
                                        top: 10,
                                        left: 160,
                                        // borderWidth: 1,
                                        // borderColor: COLORS.lightblue_200,

                                      }}
                                    >
                                      <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                        {res.sub_height}
                                      </Text>
                                      <View style={{ position: "absolute", width: 1, left: 80, top: -59 }}>
                                        <Divider style={{ backgroundColor: COLORS.lightGray1, height: SIZES.height, top: 5 }} />
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        width: 60,
                                        position: "absolute",
                                        top: 10,
                                        left: 238,
                                        // borderWidth: 1,
                                        // borderColor: COLORS.lightblue_200,

                                      }}
                                    >
                                      <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                        {res.sub_total}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        width: SIZES.width * 0.5,
                                        // position: "absolute",
                                        // backgroundColor:"red",
                                        top: 10,
                                        left: 368,
                                        // borderWidth: 1,
                                        // borderColor: COLORS.lightblue_200,

                                      }}
                                    >
                                      <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                        {res.sub_remark}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        width: 60,
                                        // position: "absolute",
                                        // backgroundColor:"red",
                                        top: 10,
                                        left: 395,
                                        // borderWidth: 1,
                                        // borderColor: COLORS.lightblue_200,

                                      }}
                                    >
                                      {/* <View style={{ justifyContent: "center", alignSelf: "center" }}>
                                        <Edit_delete_button edit_size={18} del_size={22} __id={l.item_id} />
                                      </View> */}
                                      <Text style={[FONTS.h4, { color: COLORS.darkGray, textAlign: "center" }]}>
                                        {res.sub_quality_type}
                                      </Text>
                                    </View>
                                  </View>

                                )) : null
                              }
                            </View>
                            <View style={{ position: "absolute", top: 23 }}>
                              <Divider style={{ backgroundColor: COLORS.lightGray1, width: SIZES.width * 3, marginHorizontal: 2, top: 5 }} />
                            </View>
                          </View>

                        )) : null
                      }

                    </>

                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>
          :null
        }
        {/* <View style={{ top: 22, left: -40, borderWidth: 1, borderColor: COLORS.lightblue_300, paddingHorizontal: 60 }}><Text>Nothing to display!!</Text></View> */}
      </View>
      {add_qty_data_modal()}
      {add_item_modal()}

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
  );
};



export default Quantity;
const styles_m = StyleSheet.create({


  databeBox: {
    margin: 0,
    textAlign: 'center',
    overflow: "visible",
    // flexDirection: "row",
    justifyContent: "space-evenly",

  },
  databeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    margin: 5,
    paddingHorizontal: 5
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  radioButton2: {
    height: 18,
    width: 18,
    backgroundColor: "#E9E9E9",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButton: {
    height: 18,
    width: 18,
    backgroundColor: "green",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.lightGray1,
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "green"
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16
  }
});
import React from 'react'
import {
  View, Animated,
  Easing, Switch,
  Text, FlatList,
  StyleSheet, Image,
  ScrollView, Modal,
  Pressable,
  TouchableOpacity, LogBox, LayoutAnimation
} from 'react-native'
import { COLORS, FONTS, SIZES, dummyData, icons } from '../../../constants'
import { Divider } from '@ui-kitten/components';
import Foundation from 'react-native-vector-icons/Foundation'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import CheckBox from '@react-native-community/checkbox';

import { AccordionList } from 'accordion-collapse-react-native';
import DatePicker from 'react-native-neat-date-picker'

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const UserReports = () => {

  const [selectedEditId, setSelectedEditId] = React.useState(null)
  const [con_item_id, setcon_item_id] = React.useState('')
  const [selectedDel, setSelectedDel] = React.useState(null)
  const [Report_list, setReport_list] = React.useState(dummyData.Reports_part)
  const [selectheaderid, setselectheaderid] = React.useState(Report_list)
  // const [collapsed, setCollapsed] = React.useState(false);
  const [Tech_collapse, setTech_collapse] = React.useState(false)
  const [Masonry_collapse, setMasonry_collapse] = React.useState(false)
  const [Steel_collapse, setSteel_collapse] = React.useState(false)
  const [Shelter_collapse, setShelter_collapse] = React.useState(false)
  const [active, setactive] = React.useState(null)

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

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };



  const [list_Contractor, setlist_Contractor] = React.useState([
    {
      id: "0",
      name: "Contractor 1"
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
      name: 'first',
      ischeck: false
    },
    {
      id: "1",
      name: 'second',
      ischeck: false
    },
    {
      id: "2",
      name: 'third',
      ischeck: false
    },
    {
      id: "3",
      name: 'fourth',
      ischeck: false
    },
    {
      id: "4",
      name: 'fifth',
      ischeck: false
    },
    {
      id: "5",
      name: 'sixth',
      ischeck: false
    },
    {
      id: "6",
      name: 'seventh',
      ischeck: false
    },
    {
      id: "7",
      name: 'eighth',
      ischeck: false
    },

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
  const [pressed, setpressed] = React.useState(false)
  // const [Exp_date, setExp_date] = React.useState('YYYY-MM-DD')


  const { header, con_body, body_del, body_edit, body_del_btn, body_edit_btn, body_ed_de_view } = styles

  const _head = (item) => {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={header} key={item.key}>
          <View        
            >
            <Text style={[FONTS.body3, { color: COLORS.black,letterSpacing:1, textAlign: "left" }]}>
              {item.name}
            </Text>
          </View>
      </View>
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
          <View style={{ marginTop: SIZES.radius, justifyContent: 'center', backgroundColor: COLORS.lightblue_100, borderRadius: SIZES.base, borderWidth: 2, borderColor: COLORS.lightGray1, alignSelf: "center", paddingHorizontal: 5 }}>
            <Text style={{
              ...FONTS.h4,
              color: COLORS.black,
            }} >
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
              backgroundColor: COLORS.lightblue_100,
              justifyContent: 'center',
              paddingLeft: SIZES.font * 0.5,
              alignContent: "center"
            }}>
            <TouchableOpacity onPress={showDatepicker}>
              <Image
                source={icons.date}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: COLORS.green,
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
  const toggleExpanded = (item, index) => {
    LayoutAnimation.easeInEaseOut();
    setactive(index == active ? null : index)
    setcon_item_id(item.id)
    // setCollapsed(!collapsed);
  };

  const onValueChange = (item, index) => {
    const newData = [...Tech_staff];
    newData[index].isCheck = !item.isCheck;
    setTech_staff(newData);
  }


  const onMasonryChange = (item, index) => {
    const newData = [...Masonry];
    newData[index].isCheck = !item.isCheck;
    setMasonry(newData);
  }
  const onSteelChange = (item, index) => {
    const newData = [...steel_bind];
    newData[index].isCheck = !item.isCheck;
    setsteel_bind(newData);
  }

  const onShelterChange = (item, index) => {
    const newData = [...shelter];
    newData[index].isCheck = !item.isCheck;
    setshelter(newData);
  }




  const getSelectedValue = (item) => {
    var name = Tech_staff.map((t) => t.name)
    var isChecked = Tech_staff.map((t) => t.isCheck)
    let selected = []
    for (let i = 0; i < isChecked.length; i++) {
      if (isChecked[i] == true)
        selected.push(name[i])
    }
  }

  const render_con_list = (item, index) => {
    const open = active == index
    return (
      <>
        <TouchableOpacity style={{
          flex: 1,
          flexDirection: "row",
          margin: 2,
          borderWidth: 1,
          borderRadius:5,
          borderColor:COLORS.lightblue_400,
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
            <Text style={[FONTS.body4, { color: COLORS.black,letterSpacing:1, textAlign: "left",fontSize:16 }]}>{item.name}</Text>
          </View>
          <View>
            {edit_delet_section(item)}
          </View>
        </TouchableOpacity>
        {open && con_item_id == item.id ?
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              borderWidth: 1,
              borderColor:COLORS.lightblue_400,
              alignItems: "flex-start",
              width: SIZES.width * 0.9,
              height: SIZES.width,
              paddingLeft: SIZES.base,
              marginHorizontal: 2,
              position: "relative",
            }}
          >
            <View style={{ marginLeft: 24 * 3 }}>
              {schedular_section(item)}
            </View>
            <Divider style={{ backgroundColor:COLORS.lightGray1, width: SIZES.width * 0.85, marginHorizontal: 2, top: 5 }} />
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
                  <Text style={[FONTS.body5, { color: COLORS.black,letterSpacing:1,fontSize:14}]}>Technical Staff</Text>
                </TouchableOpacity>
              </View>
              {Tech_collapse ? <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 90 }}>
                {Tech_staff.map((item, index) => {
                  return (
                    <View style={{ flex: 1 }} key={index}>
                      <TouchableOpacity
                        key={index}
                        onPress={() => onValueChange(item, index)}
                        style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                        <CheckBox
                          value={item.isCheck}
                          onValueChange={(newValue) => onValueChange(item, index)}
                          key={item.name}
                        />
                        <Text style={[FONTS.body5, { color: COLORS.black,letterSpacing:1,fontSize:13}]}>{item.name}</Text>
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
                  <Text style={[FONTS.body5, { color: COLORS.black,letterSpacing:1,fontSize:14}]}>Masonry</Text>
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
                          onPress={() => onMasonryChange(item, index)}
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <CheckBox
                            value={item.isCheck}
                            onValueChange={(newValue) => onMasonryChange(item, index)}
                            key={item.id}
                          />
                          <Text style={[FONTS.body5, { color: COLORS.black,letterSpacing:1,fontSize:13}]}>{item.name}</Text>
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
                  <Text style={[FONTS.body5, { color: COLORS.black,letterSpacing:1,fontSize:14}]}>Steel Binder</Text>
                </TouchableOpacity>
              </View>
              {Steel_collapse ? <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 60 }}>
                {steel_bind.map((item, index) => {
                  return (
                    <View key={index} style={{}}>
                      <TouchableOpacity
                        key={index}
                        onPress={() => onSteelChange(item, index)}
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <CheckBox
                          value={item.isCheck}
                          onValueChange={(newValue) => onSteelChange(item, index)}
                          key={item.id}
                        />
                        <View>
                          <Text style={[FONTS.body5, { color: COLORS.black,letterSpacing:1,fontSize:13}]}>{item.name}</Text>
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
                  <Text style={[FONTS.body5, { color: COLORS.black,letterSpacing:1,fontSize:14}]}>Sheltering</Text>
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
                        onPress={() => onShelterChange(item, index)}
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <CheckBox
                          value={item.isCheck}
                          onValueChange={(newValue) => onShelterChange(item, index)}
                          key={item.id}
                        />
                        <Text style={[FONTS.body5, { color: COLORS.black,letterSpacing:1,fontSize:14}]}>{item.name}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </ScrollView> : null}
            </View>
          </View> : null
        }
      </>
    )
  }


  const list_of_all_contractors = (item, index) => {
    return (
      <View style={{}}>
        <FlatList
          data={list_Contractor}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            render_con_list(item, index)
          )}
          extraData={selectheaderid}
          keyExtractor={(item, index) => `${item.id}`}
        />
      </View>
    )
  }


  const _body = (item, index) => {
    return (
      <View style={con_body}>
        {list_of_all_contractors(item, index)}
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 2,
        backgroundColor: COLORS.lightblue_100
      }}>
      <AccordionList
        list={Report_list}
        header={_head}
        isExpanded={false}
        body={_body}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default UserReports

const styles = StyleSheet.create({
  header: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: COLORS.lightblue_200,
    borderColor: COLORS.lightblue_200,
    margin: SIZES.base * 0.5,
    padding: SIZES.base,
    alignItems: "center",
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
    right: -52,
    // backgroundColor: "red",
  },
  group: {
    marginVertical: 4,
  },
  option: {
    marginVertical: 4,
    marginHorizontal: 12,
  },

})

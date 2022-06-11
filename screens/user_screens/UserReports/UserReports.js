import React from 'react'
import { View, Animated, Easing, Switch, Text, FlatList, StyleSheet, Image, ScrollView, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES, dummyData } from '../../../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { CheckBox, Layout, Card } from '@ui-kitten/components';
import { Divider } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Svg,
  LinearGradient,
  Mask,
  Rect,
  ForeignObject,
} from 'react-native-svg';

MaterialCommunityIcons.loadFont()

const UserReports = () => {

  const [selectedId, setSelectedId] = React.useState(null)
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isEnabledPro, setIsEnabledPro] = React.useState(false);
  const [isEnabledCont, setIsEnabledCont] = React.useState(false);
  const [isEnabledContLab, setIsEnabledContLab] = React.useState(false);
  const [comp_team, setcomp_team] = React.useState(false);
  const [pro_team, setpro_team] = React.useState(false);
  const [contract_team, setcontract_team] = React.useState(false);
  const [contract_lab_team, setcontract_lab_team] = React.useState(false);
  const ref = React.useRef(0)

  let opacity = new Animated.Value(0);

  // const toggleSwitch = (set_state_props) => {
  //   console.log(set_state_props);
  //   set_state_props(previousState => !previousState);

  // };

  const OnSelectedActiveItem = (activeItem, index) => {
    // console.log(activeItem);
    // console.log(index);
    ref.current = activeItem;
    setSelectedId(activeItem)
    if (activeItem.name == 'Company Team') {

      setcomp_team(true)
      animate(Easing.out(Easing.exp));
      setpro_team(false)
      setcontract_team(false)
      setcontract_lab_team(false)
    }
    else if (activeItem.name == 'Project Team') {
      setpro_team(true)
      animate(Easing.out(Easing.exp))
      setcomp_team(false)
      setcontract_team(false)
      setcontract_lab_team(false)
    }
    else if (activeItem.name == 'Contractor Team') {
      setcontract_team(true)
      animate(Easing.out(Easing.exp))
      setcomp_team(false)
      setpro_team(false)
      setcontract_lab_team(false)
    }
    else if (activeItem.name == "Contractor's Labour") {
      setcontract_lab_team(true)
      animate(Easing.out(Easing.exp))
      setcomp_team(false)
      setpro_team(false)
      setcontract_team(false)
    }


  }

  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80]
  });


  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size
    }
  ];


  function Company_view(key) {
    return (
      <View key={key} style={{ flex: 1, flexDirection: "column", position: 'relative', backgroundColor: COLORS.lightGray1 }}>
      <Svg height="50%">
        <Rect
          x="16"
          y="0"
          width="100"
          height="30"
          fill={COLORS.gray2}
        />
      </Svg>
      <View style={{
        backgroundColor: COLORS.gray2,
        top: 10,
        padding: 155,
        alignSelf: "center",
        borderRadius: 5,
        marginHorizontal: -10,
        position: "absolute"
      }}>
        <Text>Company section</Text>
      </View>
    </View>
    )
  }
  function Project_view() {
    return (
      <View style={styles.boxContainer}>
        <Animated.View style={animatedStyles} />
        <Text>Project view function</Text>
      </View>
    )
  }
  function Contract_team_view() {
    return (
      <View style={styles.boxContainer}>
        <Animated.View style={animatedStyles} />
        <Text>Contract_team view function</Text>
      </View>
    )
  }
  function Contract_labour_view() {
    return (
      <View style={styles.boxContainer}>
        <Animated.View style={animatedStyles} />
        <Text>Contract_labour view function</Text>
      </View>
    )
  }

  // function render_selected_report(item) {


  // }

  const switch_btn = (state_props, set_state_props) => {
    console.log(state_props)
    return (
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "gray" }}
          thumbColor={state_props ? "#30a566" : "#f4f3f4"}
          disabled={false}
          onValueChange={() => toggleSwitch(set_state_props)}
          value={state_props}
          activeText={'On'}
          inActiveText={'Off'}
          backgroundActive={'green'}
          backgroundInactive={'gray'}

        />
      </View>
    )
  }

  function Tabs_neck(item,key,x,marginHorizontal) {
    return (
      <View key={key} style={{ flex: 1, flexDirection: "column", position: 'relative', backgroundColor: COLORS.lightGray1 }}>
        <Svg height="50%">
          <Rect
            x={x}
            y="0"
            width="100"
            height="30"
            fill={COLORS.gray2}
          />
        </Svg>
        <View style={{
          backgroundColor: COLORS.gray2,
          top: 10,
          // padding: 168,
          
          paddingHorizontal:115,
          // marginHorizontal:400,
          paddingVertical:200,
          alignSelf: "center",
          borderRadius: 5,
          marginHorizontal:marginHorizontal,
          position: "absolute"
        }}>
        <View style={{backgroundColor:"white",paddingHorizontal:20}}>
          <Text>{item.name}</Text>
        </View>
        </View>
      </View>

    )

  }

  const renderItem = ({ item, index }) => {

    return (
      <View style={{ flex: 1, backgroundColor: COLORS.lightGray1, position: "relative", height: SIZES.width / 5, bottom: -20 }}>
        <View style={{
          paddingHorizontal: 60, backgroundColor: COLORS.gray2, margin: 3, marginHorizontal: 5

        }}>
          <TouchableOpacity
            style={[styles.rend_rep_card, { backgroundColor: (selectedId?.id == item.id) ? "#26D1B2" : COLORS.gray3 }]}
            onPress={
              () => {
                OnSelectedActiveItem(item, index);
              }
            }
          >
            <View style={{ flexDirection: "column", top: 8, margin: -25, alignSelf: "center" }}>
              <Text style={{ ...FONTS.body4, textAlign: "center" }}>{item.name}</Text>
            </View>
            {/* {
                (item.name == 'Company Team') ? (switch_btn(isEnabled, setIsEnabled)) : (item.name == 'Project Team') ? (switch_btn(isEnabledPro, setIsEnabledPro)) :
                  (item.name == 'Contractor Team') ? (switch_btn(isEnabledCont, setIsEnabledCont)) : (item.name == "Contractor's Labour") ? (switch_btn(isEnabledContLab, setIsEnabledContLab)) : null
              } */}

          </TouchableOpacity>


        </View>

        {/* <Divider style={{ backgroundColor: COLORS.transparentPrimary, marginHorizontal: 8 }} />  */}
        {/* <View> */}
        {/* </View> */}
        {/* {(comp_team && isEnabled) ? item.name == 'Company Team' && (Company_view()) : null} */}
        {/* {(pro_team && isEnabledPro) ? item.name == 'Project Team' && (Project_view()) : null} */}
        {/* {(contract_team && isEnabledCont) ? item.name == 'Contractor Team' && (Contract_team_view()) : null} */}
        {/* {(contract_lab_team && isEnabledContLab) ? item.name == "Contractor's Labour" && (Contract_labour_view()) : null} */}

      </View>


    );
  };


  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SIZES.body1 }}>
        <View >
          <Text style={{ ...FONTS.h2, color: COLORS.blue }}>Manpower</Text>
        </View>
        <View style={{ flexDirection: "row", backgroundColor: COLORS.white2, paddingHorizontal: SIZES.base, marginHorizontal: -SIZES.padding * 0.95, top: SIZES.base }}>
          <Pressable style={{ marginRight: 5 }}>
            <FontAwesome5 name='arrow-circle-left' size={SIZES.h2} />
          </Pressable>
          <Pressable>
            <FontAwesome5 name='arrow-circle-right' size={SIZES.h2} />
          </Pressable>
        </View>
      </View>
      <Text
        style={{
          paddingHorizontal: SIZES.h3 * 2,
          paddingVertical: SIZES.base,
          ...FONTS.body5,
          color: COLORS.red
        }}

      >Ongoing 8 Reports</Text>
      <Divider style={{ backgroundColor: COLORS.transparentPrimary, marginHorizontal: 8 }} />
      <View >
        <FlatList
          data={dummyData.Reports_part}
          renderItem={(item, index) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          extraData={selectedId}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "dodgerblue" }}>
        {
          dummyData.Reports_part.map((item, key) => {
            return ref.current.name == item.name && comp_team ? Tabs_neck(item,key,16) 
            :ref.current.name == item.name && pro_team? Tabs_neck(item,key,148,1)
            :ref.current.name == item.name && contract_team? Tabs_neck(item,key,SIZES.width*0.705,2)
            :ref.current.name == item.name && contract_lab_team? Tabs_neck(item,key,SIZES.width*0.705,4):null

          })

        }
      </View>



    </>
  )
}

export default UserReports

const styles = StyleSheet.create({

  rend_rep_card: {
    padding: 25,
    margin: 5,
    marginHorizontal: -2,
    borderRadius: 5,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  boxContainer: {
    height: 160,
    alignItems: "center"
  },

})

import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, ScrollView, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES,dummyData } from '../../../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


// FontAwesome5.loadFont();

const UserReports = () => {

  
// const Item = ({ item, onPress, backgroundColor, textColor }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
//     <Text style={[styles.title, textColor]}>{item.title}</Text>
//   </TouchableOpacity>
// );

  // const renderItem = ({ item }) => {
  //   const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
  //   const color = item.id === selectedId ? 'white' : 'black';

  //   return (
  //     <Item
  //       item={item}
  //       onPress={() => setSelectedId(item.id)}
  //       backgroundColor={{ backgroundColor }}
  //       textColor={{ color }}
  //     />
  //   );
  // };

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SIZES.body1 }}>
        <View >
          <Text style={{ ...FONTS.h2, color: COLORS.blue }}>Manpower</Text>
        </View>
        <View style={{ flexDirection: "row", backgroundColor:"gray",paddingHorizontal:5 }}>
          <View style={{backgroundColor:"green"}}>
            <Pressable>
              <FontAwesome5 name='arrow-circle-left' size={SIZES.h3} />
            </Pressable>
          </View>
          <View style={{backgroundColor:"red"}}>
            <Pressable>
              <FontAwesome5 name='arrow-circle-right' size={SIZES.h3} />
            </Pressable>
          </View>
        </View>
      </View>
      <Text>Total Reports</Text>
      <View>
      {/* <FlatList
        data={dummyData.Reports_part}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      /> */}
      </View>
      <Text>card divider</Text>
      {/* some space then start selected report sections */}
      <Text>Name of selected Report</Text>
      <View>
        <Text>Give + icon and tag </Text>
      </View>
      <Text>card divider</Text>
      <View>
        <Text>section/container of selected report </Text>
      </View>
    </>
  )
}

export default UserReports

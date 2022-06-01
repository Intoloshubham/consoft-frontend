import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, ScrollView, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, SIZES, dummyData } from '../../../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { CheckBox, Layout, Card } from '@ui-kitten/components';
import { Divider } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

MaterialCommunityIcons.loadFont()



// FontAwesome5.loadFont();



const UserReports = () => {
  const [selectedId, setSelectedId] = React.useState(null)

  const OnSelectedActiveItem = (activeItem) => {

    console.log(activeItem);
    setSelectedId(activeItem)
  }



  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <TouchableOpacity
        // style={{backgroundColor:COLORS.transparentBlack1,padding:SIZES.largeTitle}}
        style={[styles.rend_rep_card, { backgroundColor: (selectedId?.id == item.id) ? "#26D1B2" : COLORS.gray3 }]}
        onPress={() => OnSelectedActiveItem(item)}
      >
        <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
        <Pressable>
          <MaterialCommunityIcons name="toggle-switch-off" color={"red"} size={35} />
        </Pressable>
      </TouchableOpacity>
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
      <Divider style={{ backgroundColor: COLORS.black, marginHorizontal: 8 }} />
      <View>
        <FlatList
          data={dummyData.Reports_part}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal
        />
      </View>

      <Divider style={{ backgroundColor: COLORS.black, marginHorizontal: 8 }} />
      {/* some space then start selected report sections */}
      <View>
        <Text>section/container of selected report </Text>
      </View>
    </>
  )
}

export default UserReports

const styles = StyleSheet.create({

  rend_rep_card: {
    padding: SIZES.largeTitle,
    margin: 5,
    borderRadius: 10
  }
})

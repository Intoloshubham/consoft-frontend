import { View, Text } from 'react-native'
import React from 'react'
import DataTable, { COL_TYPES } from 'react-native-datatable-component'

function Qty_eng_section() {
  return (
    <View>
      <DataTable
        data={[
          { Sno: 1, Particular: 12 },
          { Sno: 2, Particular: 22 },
          { Sno: 3, Particular: 21 },
          { Sno: 4, Particular: 22 },
          { Sno: 5, Particular: 20 },
          { Sno: 6, Particular: 13 }
        ]} // list of objects
        colNames={['Sno', 'Particular']} //List of Strings
        colSettings={[
          { name: 'Sno', type: COL_TYPES.INT, width: '50%' },
          { name: 'Particular', type: COL_TYPES.STRING, width: '30%' }
        ]}//List of Objects
        noOfPages={2} //number
        backgroundColor={'#E4E9F2'} //Table Background Color
        headerLabelStyle={{ color: '#000', fontSize: 12 }} //Text Style Works
      />
    </View>
  )
}
function Quality_eng_section() {
  <View>
    <View>Qty eng</View>
  </View>
}
function Stock_keeper_section() {
  <View>
    <View>Qty eng</View>
  </View>
}


export default function Reports() {
  return (
    <View>
      <Text>Reports</Text>
      {Qty_eng_section()}
      {Quality_eng_section()}
      {Stock_keeper_section()}
    </View>
  )
}
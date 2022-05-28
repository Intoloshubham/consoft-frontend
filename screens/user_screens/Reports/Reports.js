import { View, Text } from 'react-native'
import React from 'react'
import DataTable, { COL_TYPES } from 'react-native-datatable-component'
import { icons, COLORS, SIZES, FONTS, dummyData } from '../../../constants';
function Qty_eng_section() {
  return (
    <View style={{ width: '95%', alignSelf: 'center' }}>
      <DataTable
        data={[
          { Sno: 1, Particulars: 12, select: false },
          { Sno: 2, Particulars: 22, select: true, doHighlight: 'green' },
          { Sno: 3, Particulars: 21, select: false },
          { Sno: 4, Particulars: 22, select: false },
          { Sno: 5, Particulars: 20, select: false },
          { Sno: 6, Particulars: 13, select: false }
        ]} // list of objects
        colNames={['Sno', 'Particulars', 'L', 'B', 'H','select' ]} //List of Strings

        colSettings={[
          {
            name: 'Sno',
            type: COL_TYPES.INT,
            width: '13%',
        
          },
          { name: 'Particulars', type: COL_TYPES.STRING, width: '35%' },
          { name: 'select', type: COL_TYPES.CHECK_BOX, width: '20%', doHighlight: { backgroundColor: '#917584', textColor: 'red' } },
          { name: 'L', type: COL_TYPES.INT, width: '10%' },
          { name: 'B', type: COL_TYPES.INT, width: '10%' },
          { name: 'H', type: COL_TYPES.INT, width: '10%' },
        ]}//List of Objects
        noOfPages={2} //number
        backgroundColor={COLORS.lightblue_500} //Table Background Color
        headerLabelStyle={{ color: '#000', fontSize: 15 }} //Text Style Works
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
      {Qty_eng_section()}
      {Quality_eng_section()}
      {Stock_keeper_section()}
    </View>
  )
}
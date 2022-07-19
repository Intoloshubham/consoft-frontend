import React from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {COLORS, FONTS} from '../../../constants';

const Tracker = () => {
  const [newAdd, setNewAdd] = React.useState(1);

  // states
  const [l, setL] = React.useState([{key: '', value: ''}]);
  const [w, setW] = React.useState([{key: '', value: ''}]);
  const [h, setH] = React.useState([{key: '', value: ''}]);

  return (
    <View style={{flex: 1, padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => alert('add...')}>
          <Text style={{...FONTS.h3, color: COLORS.black}}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tracker;

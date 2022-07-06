import React from 'react';
import {View, FlatList, SafeAreaView} from 'react-native';
import {ItemBox} from '../../../Components';
import {COLORS, SIZES} from '../../../constants';

const data = [
  {id: 1, name: 'A'},
  {id: 2, name: 'B'},
  {id: 3, name: 'C'},
  {id: 4, name: 'D'},
  {id: 5, name: 'E'},
  {id: 6, name: 'F'},
  {id: 7, name: 'G'},
];
const Tasks = () => {
  const [lists, setList] = React.useState(data);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: SIZES.padding,
      }}>
      <FlatList
        data={lists}
        renderItem={({item}) => {
          return <ItemBox data={item} />;
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.black,
              }}></View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Tasks;

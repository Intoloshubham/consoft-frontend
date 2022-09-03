import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Requirement = () => {
  const [isSelected1, setSelection1] = useState(false);

  const checkAllHelper = value => {
    if (value) {
      setSelection1(true);
    } else {
      setSelection1(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected1}
          onValueChange={setSelection1}
          style={styles.checkbox}
        />
        <Text style={styles.label}>CHOOSE</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
export default Requirement;

// import React, {useRef} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Animated,
//   FlatList,
// } from 'react-native';
// import {Transition, Transitioning} from 'react-native-reanimated';
// import {ListItem} from '../../../Components';
// import {getReport} from '../../../controller/ReportController';
// import {COLORS} from '../../../constants';

// const Tasks = () => {
//   // get report
//   const fetchReport = async () => {
//     let response = await getReport('62c827499c1d4cb814ead624');
//     setReport(response.data);
//   };
//   fetchReport();
//   const [report, setReport] = React.useState([]);

//   const transitionRef = useRef();
//   const transition = <Transition.Change interpolation="easeInOut" />;
//   const onPress = () => {
//     transitionRef.current.animateNextTransition();
//   };

//   const renderItem = ({item}) => {
//     return <ListItem item={item} onPress={onPress} />;
//   };

//   return (
//     <Transitioning.View
//       ref={transitionRef}
//       transition={transition}
//       style={{flex: 1, margin: 15}}>
//       <FlatList
//         data={report}
//         keyExtractor={item => `${item._id}`}
//         renderItem={renderItem}
//         ItemSeparatorComponent={() => {
//           return (
//             <View
//               style={{
//                 backgroundColor: COLORS.black,
//                 marginTop: 20,
//               }}></View>
//           );
//         }}
//       />
//     </Transitioning.View>
//   );
// };

// export default Tasks;

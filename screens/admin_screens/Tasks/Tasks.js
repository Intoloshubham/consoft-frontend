import React from 'react';
import {View, Text} from 'react-native';

const Tasks = () => {
  return <></>;
};

export default Tasks;

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

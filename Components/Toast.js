import Toast from 'react-native-toast-message';
import {Button} from 'react-native';

const ToastPopup = () => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  return <Button title="Show toast" onPress={showToast} />;
};
export default ToastPopup;

// import React from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import {COLORS, FONTS, SIZES} from '../constants';

// const Toast = ({msg, onPress}) => {
//   return (
//     <View
//       style={{
//         marginTop: SIZES.padding,
//         backgroundColor: COLORS.white,
//         borderWidth: 1,
//         borderLeftWidth: 8,
//         borderLeftColor: COLORS.green,
//         borderRadius: SIZES.base,
//         marginHorizontal: SIZES.padding,
//         flexDirection: 'row',
//       }}>
//       <View
//         style={{
//           paddingHorizontal: SIZES.radius,
//           paddingVertical: SIZES.base,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <Text style={{...FONTS.body3}}>Login Successfully !</Text>
//       </View>
//       <TouchableOpacity onPress={}>ClickMe</TouchableOpacity>
//     </View>
//   );
// };

// export default Toast;

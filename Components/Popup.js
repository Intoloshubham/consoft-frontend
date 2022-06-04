import {View, Text} from 'react-native';
import {COLORS} from '../constants';

const toastConfig = {
  warning: ({text1, props}) => (
    <View style={{backgroundColor: COLORS.green}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
  done: ({text1, props}) => (
    <View style={{backgroundColor: COLORS.yellow_500}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export {toastConfig};

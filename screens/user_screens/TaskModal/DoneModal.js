import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS, dummyData} from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {Card} from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './css/DoneModalStyle';

const DoneModal = ({doneModal, setdoneModal}) => {
  const renderItem = ({item}) => (
    <View
      style={{
        backgroundColor: COLORS.gray3,
        padding: SIZES.base,
        borderRadius: 10,
        margin: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: -50,
        }}>
        <Image
          resizeMode="contain"
          style={{width: 30, height: 30}}
          source={item.icon}
        />
        <View>
          {item.id == 1 ? (
            <Text style={{fontWeight: 'bold', color: COLORS.blue}}>
              {item.name}
            </Text>
          ) : item.id == 2 ? (
            <Text style={{fontWeight: 'bold', color: COLORS.red}}>
              {item.name}
            </Text>
          ) : (
            <Text style={{fontWeight: 'bold', color: COLORS.black}}>
              {item.name}
            </Text>
          )}
        </View>
        <TouchableOpacity>
          <AntDesign name="rightcircleo" color={'#106853'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );

  function Modalfunction() {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.transparentBlack6,
            paddingTop: SIZES.width * 2,
          }}
          onPress={() => setdoneModal(!doneModal)}></TouchableOpacity>
        <Card
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            borderColor: 'whitesmoke',
            backgroundColor: COLORS.gray2,
            marginVertical: SIZES.width * 0.55,
            marginHorizontal: SIZES.base,
            borderRadius: SIZES.largeTitle,
          }}>
          <View style={{marginVertical: SIZES.base, marginRight: -250}}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.gray2,
                borderRadius: SIZES.padding,
                marginLeft: SIZES.width * 0.8,
                marginTop: -15,
              }}
              onPress={() => setdoneModal(!doneModal)}>
              <Entypo name="cross" color={COLORS.black} size={25} />
            </TouchableOpacity>
          </View>
          <View style={[{alignItems: 'center', marginVertical: -SIZES.h2}]}>
            <Text style={[styles.title, {...FONTS.h2}]}>Completed Tasks !</Text>
          </View>
          <View style={{marginTop: SIZES.h1, marginLeft: -15}}>
            <FlatList
              data={dummyData.comp_tasks_var}
              scrollEnabled={false}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </Card>
      </View>
    );
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={doneModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setDoneModal(!doneModal);
      }}>
      {Modalfunction()}
    </Modal>
  );
};

export default DoneModal;

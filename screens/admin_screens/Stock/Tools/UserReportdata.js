import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {HeaderBar, TextButton, FormInput} from '../../../../Components';
import {SIZES, COLORS, icons} from '../../../../constants';

const UserReportdata = () => {

  const userReport = {Remark:""};

  const [userdata, setUserData] = useState([userReport]);

  const addHandler = () => {
    setUserData([]);
  };

  const deleteHandler = index => {
    const _inputs = userdata.filter((input, index) => index != index);
    setUserData(_inputs);
  };

  const onChange = (e,index) => {
    const updateuser = userdata.map((user, i) =>
      index == i
        ? Object.assign(user, {[e.target.name]: e.target.value})
        : user,
    );
    setUserData(updateuser);
    
    // const {name, value } = e.nativeTarget;
    // const list = [...userdata];
    // list[index][name] = value;
    // setUserData(list);
  };

  // const inputHandler = (text, key)=>{
  //   const _inputs = [...userdata];
  //   _inputs[key].value = text;
  //   _inputs[key].key   = key;
  //   setUserData(_inputs);

  // }

  const savedata = () => {
    console.log(userdata);
  };
  return (
    <View>
      <HeaderBar right={true} title="Report" />
      <View>
        <TextButton
          label="Create Report"
          buttonContainerStyle={{
            height: 50,
            alignItems: 'center',
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightblue_700,
          }}
          onPress={() => {
            addHandler();
          }}
        />
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.inputContainer}>
          {userdata.map((user, index) => {
            const {Remark}= user;
            return(
            
            <View style={styles.inputContainer} key={index}>
              <TextInput
                placeholder={'Enter Name'}
                name='Remark'
                value={Remark}
                onChangeText={e => onChange({e, index})}
                />
              <TouchableOpacity onPress={() => deleteHandler(index)}>
                <Text style={{color: 'red', fontSize: 13}}>Delete</Text>
              </TouchableOpacity>
            </View>
            )
             }
          )}
        </ScrollView>
        <View>
          <Button title="add" onPress={() => savedata()} />
        </View>
      </View>
    </View>
  );
};

export default UserReportdata;

const styles = StyleSheet.create({
  inputContainer:{
  borderRadius:10,
  borderWidth:1,
  margin:10
  }
});

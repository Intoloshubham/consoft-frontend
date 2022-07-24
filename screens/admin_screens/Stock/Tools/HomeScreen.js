import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const HomeScreen = () => {
  const [inputs, setInputs] = useState([{name: '',email: '',phone: ''}]);
//   console.log(inputs);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({name: '',email: '',phone: ''})
    setInputs(_inputs);
  };

  const deleteHandler = key => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].name = text;
    _inputs[key].key = key;
    setInputs(_inputs);
  };
  const inputemail = (text, key) => {
    const _inputemail = [...inputs];
    _inputemail[key].email = text;
    _inputemail[key].key = key;
    setInputs(_inputemail);
  };
  const inputphone = (text, key) => {
    const _inputphone = [...inputs];
    _inputphone[key].phone = text;
    _inputphone[key].key = key;
    setInputs(_inputphone);
  };
  

  const addsubmit=()=>{
    console.log(inputs)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputsContainer}>
        {inputs.map((input, key) => (
          <View style={styles.inputContainer} key={key}>
            <TextInput
              placeholder={'Enter Name'}
              value={input.value}
              onChangeText={text => inputHandler(text, key)}
            />
            <TextInput
              placeholder={'Enter email'}
              value={input.value}
              onChangeText={text => inputemail(text, key)}
            />
            <TextInput
              placeholder={'Enter phone'}
              value={input.value}
              onChangeText={text => inputphone(text, key)}
            />

            <TouchableOpacity onPress={() => deleteHandler(key)}>
              <Text style={{color: 'red', fontSize: 13}}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Button title="Add" onPress={addHandler} />
      <View style={{flexDirection:"row",marginTop:20}}>
        <Button title='addsubmit' onPress={()=>{addsubmit()}} />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  inputsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
   
  },
});

export default HomeScreen;

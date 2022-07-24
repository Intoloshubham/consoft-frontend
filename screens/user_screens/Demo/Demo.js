import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';

const Demo = () => {
  const [inputList, setInputList] = React.useState([
    {len: '', wid: '', hei: '', remark: ''},
  ]);

  console.log(inputList);
  // handle input change
  // const handleInputChange = (e, index) => {
  //   const {name, value} = [...inputList];
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  const handleInputChange = (e, i) => {
    const inputs = [...inputList];
    inputs[i].e = e;
    inputs[i].i = i;
    setInputList(inputs);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, {len: '', wid: '', hei: '', remark: ''}]);
  };

  return (
    <View style={{marginHorizontal: 20, marginTop: 20}}>
      {inputList.map((x, i) => {
        return (
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="len"
              value={x.len}
              onChangeText={e => handleInputChange(e, i)}
            />
            <TextInput
              placeholder="wid"
              // value={x.wid}
              onChangeText={e => handleInputChange(e, i)}
            />
            <TextInput
              placeholder="height"
              // value={x.hei}
              onChangeText={e => handleInputChange(e, i)}
            />
            <TextInput
              placeholder="remark"
              // value={x.remark}1
              onChangeText={e => handleInputChange(e, i)}
            />
            <View style={{left: 10}}>
              {inputList.length !== 1 && (
                <TouchableOpacity onPress={() => handleRemoveClick(i)}>
                  <Text>Remove</Text>
                </TouchableOpacity>
              )}
              {inputList.length - 1 === i && (
                <TouchableOpacity
                  style={{backgroundColor: 'red', padding: 5}}
                  onPress={handleAddClick}>
                  <Text style={{color: 'white'}}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
      <Text style={{fontSize: 15}}>{JSON.stringify(inputList)}</Text>
    </View>
  );
};

export default Demo;

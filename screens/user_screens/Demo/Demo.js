import React from 'react';
import {View, Text} from 'react-native';

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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Demo</Text>
    </View>
  );
};

export default Demo;

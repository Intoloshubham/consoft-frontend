import React from 'react';
import {View, TextInput} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import {TextButton, FormInput, Drop} from '../../../Components';
import {Colors} from 'react-native-paper';

const WorkAssign = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([
    {label: 'Engineer', value: '1'},
    {label: 'Supervisor', value: '2'},
    {label: 'Asst. Supervisor', value: '3'},
    {label: 'Site Engineer', value: '4'},
    {label: 'Other staff', value: '5'},
  ]);
  const [projectTeamname, setProjectTeamName] = React.useState('');
  const [projectTeamNameError, setProjectTeamNameError] = React.useState('');

  function isEnableSubmit() {
    return projectTeamname != '' && projectTeamNameError == '';
  }
  return (
    <View style={{marginVertical: SIZES.radius}}>
      <Drop
        placeholder="Select"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        categorySelectable={true}
        listParentLabelStyle={{
          color: COLORS.white,
        }}
      />
      <FormInput
        inputStyle={{width: 200}}
        // placeholder="Work Details..."
        multiline={true}
        numberOfLines={4}
        label="Work details"
        keyboardType="default"
        autoCompleteType="username"
        onChange={value => {
          setProjectTeamName(value);
        }}
      />

      {/* <TextInput
        label="Demo"
        placeholder="Demo"
        multiline={true}
        numberOfLines={4}
        style={{
          marginTop: SIZES.padding * 2,
          backgroundColor: COLORS.gray3,
          borderRadius: SIZES.base,
        }}
      /> */}

      <TextButton
        label="Submit"
        buttonContainerStyle={{
          height: 50,
          alignItems: 'center',
          marginTop: SIZES.padding * 1.5,
          borderRadius: SIZES.radius,
        }}
        onPress={() => alert('Okay...')}
      />
    </View>
  );
};

export default WorkAssign;

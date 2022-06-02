import React from 'react';
import {View} from 'react-native';
import {SIZES} from '../../../constants';
import {TextButton, FormInput, Dropdown} from '../../../Components';

const WorkAssign = () => {
  const designations = ['Engineer', 'Supervisor', 'Asst. Supervisor'];
  const defaultButtonText = React.useState('');

  const [projectTeamname, setProjectTeamName] = React.useState('');
  const [projectTeamNameError, setProjectTeamNameError] = React.useState('');

  function isEnableSubmit() {
    return projectTeamname != '' && projectTeamNameError == '';
  }
  return (
    <View style={{marginVertical: SIZES.radius}}>
      <Dropdown data={designations} defaultButtonText="Assign to..." />

      <FormInput
        inputStyle={{width: 200}}
        // placeholder="Work Details..."
        label="Work details"
        keyboardType="default"
        autoCompleteType="username"
        onChange={value => {
          setProjectTeamName(value);
        }}
      />

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

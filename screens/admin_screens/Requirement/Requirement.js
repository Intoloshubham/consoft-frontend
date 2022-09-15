import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import RenderHtml from 'react-native-render-html';

const Requirement = () => {
  const source = {
    html: `<p>Hello World!</p>`,
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>Requirement</Text>
      <RenderHtml contentWidth={200} source={source} />
    </View>
  );
};

export default Requirement;

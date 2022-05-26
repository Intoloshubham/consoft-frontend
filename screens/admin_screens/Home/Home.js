import React from 'react';
import {View, Text, LogBox} from 'react-native';
import {FONTS, SIZES, COLORS} from '../../../constants';
import ProjectsBanner from './ProjectsBanner';

const Home = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.lightblue_50,
      }}>
      <ProjectsBanner />
    </View>
  );
};

export default Home;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import {SIZES, FONTS, COLORS, images, icons} from '../../../constants';
import {HeaderBar} from '../../../Components';

const ReportSettings = () => {
  return (
    <View>
      <HeaderBar right={true} title="Report Settings" />
    </View>
  );
};

export default ReportSettings;

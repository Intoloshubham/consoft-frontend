import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  LogBox,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import axios from 'axios';
const url = 'http://192.168.1.99:8000/api/projects';
import {useNavigation} from '@react-navigation/native';

const ProjectProgressReviewTop20 = ({customContainerStyle, history}) => {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    axios.get(url).then(response => setProjects(response.data));
  });

  const navigation = useNavigation();

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        paddingVertical: SIZES.base,
      }}
      onPress={() => {
        navigation.navigate('ProjectsDetails');
      }}>
      {/* n.no  */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{color: COLORS.gray, ...FONTS.body5}}>{index + 1}</Text>
        <Text
          style={{
            marginLeft: 30,
            color: COLORS.gray,
            ...FONTS.body5,
            textTransform: 'capitalize',
          }}>
          {item.project_name} ({index + 1})
        </Text>
      </View>
      {/* p.code  */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* <Text
          style={{
            marginLeft: -10,
            color: COLORS.gray,
            ...FONTS.body5,
          }}>
          {index + 1}
        </Text> */}
        <Text
          style={{
            marginLeft: 35,
            color: COLORS.gray,
            ...FONTS.body5,
          }}>
          55%
        </Text>
        <Text
          style={{
            marginLeft: 60,
            color: COLORS.gray,
            ...FONTS.body5,
          }}>
          4
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightblue_50,
        ...customContainerStyle,
        ...styles.shadow,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: SIZES.base,
        }}>
        <Text style={{...FONTS.h3, color: COLORS.darkGray, flex: 1}}>
          Top 3 Projects
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{marginTop: SIZES.radius}}
        scrollEnabled={false}
        data={projects}
        listKey="top3"
        keyExtractor={item => `top3-${item._id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                flex: 1,
                color: COLORS.black,
                ...FONTS.body4,
              }}>
              S.N
            </Text>
            <Text
              style={{
                flex: 1,
                marginLeft: -35,
                color: COLORS.black,
                ...FONTS.body4,
              }}>
              Name
            </Text>
            {/* <Text
              style={{
                flex: 1,
                marginLeft: 30,
                color: COLORS.darkGray,
                ...FONTS.body5,
              }}>
              Pc
            </Text> */}

            <Text
              style={{
                flex: 1,
                marginLeft: 40,
                color: COLORS.black,
                ...FONTS.body4,
              }}>
              Progress
            </Text>
            <Text
              style={{
                flex: 1,
                color: COLORS.black,
                ...FONTS.body4,
              }}>
              Notification
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLORS.gray2,
                marginVertical: 5,
              }}></View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
export default ProjectProgressReviewTop20;

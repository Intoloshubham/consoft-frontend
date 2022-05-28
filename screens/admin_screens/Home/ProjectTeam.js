import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  LogBox,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import {HeaderBar, TextButton} from '../../../Components';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';

const ProjectTeam = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  // const [showTeamModal, setTeamModal] = React.useState(false);

  const [collapsed, setCollapsed] = React.useState(true);
  const toggleExpanded = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };
  const teamdetail = [
    {
      id: 1,
      name: 'Shivam Verma',
      email: 'shivam@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 2,
      name: 'Rahul Shrivastav',
      email: 'rahul@gmail.com',
      mobile: 9988776655,
      designation: 'Architect',
    },
    {
      id: 3,
      name: 'Chotu Patel',
      email: 'chotu@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 4,
      name: 'Aman Patel',
      email: 'chotu@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 5,
      name: 'Arvind Patel',
      email: 'chotu@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 6,
      name: 'Anup Patil',
      email: 'patil@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
    {
      id: 7,
      name: 'Jeet Singh',
      email: 'singh@gmail.com',
      mobile: 9988776655,
      designation: 'Engineer',
    },
  ];
  const [teamdetails, setTeamDetails] = React.useState(teamdetail);

  function renderTeamList() {
    const renderItem = ({item, index}) => (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.base,
          }}
          onPress={toggleExpanded}>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{index + 1}</Text>
          <View style={{flex: 1, marginLeft: SIZES.radius}}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.darkGray,
              }}>
              {item.name}
            </Text>
          </View>
          <Image
            source={icons.down_arrow}
            resizeMode="contain"
            style={{height: 15, width: 15, tintColor: COLORS.darkGray}}
          />
        </TouchableOpacity>
        <Collapsible
          collapsed={collapsed}
          duration={300}
          style={{marginBottom: SIZES.base}}>
          <Text style={{...FONTS.body4}}>Designation - {item.designation}</Text>
          <Text style={{...FONTS.body4}}>Email - {item.email}</Text>
          <Text style={{...FONTS.body4}}>Mobile No. - {item.mobile}</Text>
        </Collapsible>
      </View>
    );
    return (
      <View
        style={{
          marginBottom: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Team List</Text>
        <FlatList
          contentContainerStyle={{marginTop: SIZES.radius}}
          scrollEnabled={false}
          data={teamdetails}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.lightGray1,
                  marginVertical: 5,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <HeaderBar right={true} />
      <TextButton
        label="Add New Team"
        buttonContainerStyle={{
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_700,
        }}
        // onPress={() => setTeamModal(true)}
      />
      {/* {showTeamModal && (
        <ProjectTeamModal
          isVisible={showTeamModal}
          onClose={() => setTeamModal(false)}
        />
      )} */}
      <ScrollView>{renderTeamList()}</ScrollView>
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

export default ProjectTeam;

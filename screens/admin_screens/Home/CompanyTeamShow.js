import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LogBox,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderBar, TextButton} from '../../../Components';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';
import CompanyTeamModal from '../Modals/CompanyTeamModal';

const ProjectCompanyShow = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const [showAddTeamModal, setShowAddTeamModal] = React.useState(false);

  const CompanyTeam = [
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
  ];
  const [comTeamDetails, setComTeamDetails] = React.useState(CompanyTeam);

  function renderTeamList() {
    const renderItem = ({item, index}) => (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: SIZES.base,
        }}>
        <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{index + 1}</Text>
        <View style={{flex: 1, marginLeft: SIZES.radius}}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
            }}>
            Mr.{item.name}
          </Text>
          <Text style={{...FONTS.body4}}>Designation - {item.designation}</Text>
        </View>
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
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.darkGray,
          }}>
          List
        </Text>
        <FlatList
          contentContainerStyle={{marginTop: SIZES.radius}}
          scrollEnabled={false}
          data={comTeamDetails}
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
      <HeaderBar right={true} title="Company Team" />
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
        onPress={() => setShowAddTeamModal(true)}
      />
      {showAddTeamModal && (
        <CompanyTeamModal
          isVisible={showAddTeamModal}
          onClose={() => setShowAddTeamModal(false)}
        />
      )}
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

export default ProjectCompanyShow;

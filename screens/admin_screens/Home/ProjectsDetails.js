import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import {COLORS, SIZES, FONTS, images, icons} from '../../../constants';
import {TextButton, HeaderBar, FloatingButton} from '../../../Components';
import {useNavigation} from '@react-navigation/native';
import WorkAssignModal from '../Modals/WorkAssignModal';

const ProjectsDetails = ({route}) => {
  const navigation = useNavigation();
  const proDetails = [
    {id: 1, img: icons.p_team, name: 'Company Team'},
    {id: 2, img: icons.p_team, name: 'Project Team'},
    {id: 3, img: icons.contr, name: 'Contractors'},
    {id: 4, img: icons.stock, name: 'Stock / Inventry'},
    {id: 5, img: icons.machine, name: 'Tools & Machinery'},
    {id: 6, img: icons.report1, name: 'Reports'},
    {id: 7, img: icons.time_seh, name: 'Project Sehedule & Timeline'},
  ];
  const ProjectData = [
    {
      id: 1,
      img: images.profile,
      name: 'Demo Project 1',
      start_date: '10/05/2022',
      total_contractor: 5,
      total_staf: 20,
      work_progress: '40%',
    },
    {
      id: 2,
      img: images.profile,
      name: 'Demo  Project 2',
      start_date: '10/05/2022',
      total_contractor: 1,
      total_staf: 25,
      work_progress: '90%',
    },
    {
      id: 3,
      img: images.profile,
      name: 'Demo  Project 3',
      start_date: '10/05/2022',
      total_contractor: 6,
      total_staf: 65,
      work_progress: '99%',
    },
    {
      id: 4,
      img: images.profile,
      name: 'Demo  Project 4',
      start_date: '10/05/2022',
      total_contractor: 9,
      total_staf: 71,
      work_progress: '65%',
    },
  ];

  //get name of project from project banner screen using params
  const {name} = route.params; //

  const [showWorkModal, setWorkModal] = React.useState(false);

  const [dummydetails, setDummyDetails] = React.useState(proDetails);
  const [projectdetails, setProjectDetails] = React.useState(ProjectData);

  function renderProjectDetails() {
    const renderItem = ({item, index}) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingVertical: SIZES.base,
          alignItems: 'center',
        }}
        onPress={() => {
          item.id == 1
            ? navigation.navigate('CompanyTeamShow')
            : item.id == 2
            ? navigation.navigate('ProjectTeam')
            : item.id == 3
            ? navigation.navigate('Contractors')
            : item.id == 4
            ? navigation.navigate('StocksAndInventry')
            : item.id == 5
            ? navigation.navigate('ToolsAndMachinery')
            : item.id == 6
            ? navigation.navigate('ProjectReports')
            : item.id == 7
            ? navigation.navigate('ProjectSeheduleTime')
            : null;
        }}>
        <Image
          source={item.img}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.darkGray,
          }}
        />
        <View
          style={{
            marginLeft: SIZES.radius * 1.5,
            flex: 1,
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
            }}>
            {item.name}
          </Text>
        </View>
        <View>
          <Image
            source={icons.right_arr}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.button_blue,
            }}
          />
        </View>
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        {/* <View style={{alignItems: 'center', marginBottom: SIZES.radius * 3}}>
          <Text style={{...FONTS.h2, color: COLORS.in_orange}}>
            Progress Review
          </Text>
        </View> */}
        <FlatList
          scrollEnabled={false}
          data={dummydetails}
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
                  marginVertical: SIZES.radius,
                }}></View>
            );
          }}
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightblue_50}}>
      <HeaderBar right={true} title={JSON.stringify(name)} />
      <TextButton
        label="Assign Work"
        buttonContainerStyle={{
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_700,
          ...styles.shadow,
        }}
        onPress={() => setWorkModal(true)}
      />
      {showWorkModal && (
        <WorkAssignModal
          isVisible={showWorkModal}
          onClose={() => setWorkModal(false)}
        />
      )}
      {renderProjectDetails()}
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

export default ProjectsDetails;

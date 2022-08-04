import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {TextButton, HeaderBar} from '../../../Components';
import {useNavigation} from '@react-navigation/native';
import WorkAssignModal from '../Modals/WorkAssignModal';

const ProjectsDetails = ({route}) => {
  const navigation = useNavigation();
  const ProjectList = [
    {id: 1, img: icons.p_team, name: 'Company Team'},
    {id: 2, img: icons.p_team, name: 'Project Team'},
    {id: 3, img: icons.contr, name: 'Contractors'},
    {id: 4, img: icons.stock, name: 'Stock / Inventry'},
    {id: 5, img: icons.machine, name: 'Tools & Machinery'},
    {id: 6, img: icons.time_seh, name: 'Sehedule & Timeline'},
    {id: 7, img: icons.boq, name: 'BOQ'},
  ];

  //get name of project from project banner screen using params
  const {name, project_id} = route.params; //
  const [showWorkModal, setWorkModal] = React.useState(false);
  const [projects, setProjects] = React.useState(ProjectList);

  function renderProjectDetails() {
    const renderItem = ({item}) => (
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
            ? navigation.navigate('ProjectTeam', {project_id})
            : item.id == 3
            ? navigation.navigate('Contractors', {project_id})
            : item.id == 4
            ? navigation.navigate('StocksAndInventry')
            : item.id == 5
            ? navigation.navigate('ToolsAndMachinery', {project_id})
            : item.id == 6
            ? navigation.navigate('ProjectSeheduleTime')
            : item.id == 7
            ? navigation.navigate('Boq', {project_id})
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
              textTransform: 'capitalize',
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
          borderRadius: 3,
          backgroundColor: COLORS.white,
          ...styles.shadow,
        }}>
        <FlatList
          data={projects}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          maxHeight={510}
          scrollEnabled={true}
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
      <HeaderBar right={true} title={name} />
      <TextButton
        label="Assign Work"
        buttonContainerStyle={{
          height: 45,
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
          projectId={project_id}
          isVisible={showWorkModal}
          onClose={setWorkModal(false)}
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

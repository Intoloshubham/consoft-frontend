import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TextButton} from '../../../Components';
import {useNavigation} from '@react-navigation/native';
import ProjectsCreateModal from '../Modals/ProjectsCreateModal';
import {COLORS, FONTS, icons, SIZES, images} from '../../../constants';
import axios from 'axios';
const url = 'http://192.168.1.99:8000/api/projects';

const ProjectsBanner = () => {
  const navigation = useNavigation();

  const [collapsed, setCollapsed] = React.useState(true);
  const [projects, setProjects] = React.useState([]);
  const [showCreateProjectModal, setCreateProjectModal] = React.useState(false);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    axios.get(url).then(response => setProjects(response.data));
  }, []);

  function renderProjects() {
    const renderItem = ({item, index}) => (
      <TouchableOpacity
        style={{
          marginVertical: SIZES.base,
          width: SIZES.width / 2.8,
        }}
        onPress={() => {
          navigation.navigate('ProjectsDetails');
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: SIZES.radius,
            backgroundColor: COLORS.lightblue_100,
            borderRadius: SIZES.radius,
          }}>
          <Text
            style={{
              ...FONTS.h3,
              textAlign: 'center',
              color: COLORS.darkGray,
            }}>
            {item.project_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        data={projects}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.lightblue_600,
        borderRadius: SIZES.radius,
        ...styles.shadow,
      }}
      onPress={toggleExpanded}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h2,
            textAlign: 'center',
            color: COLORS.white,
          }}>
          Project
        </Text>
        <Image
          source={icons.down_arrow}
          style={{height: 18, width: 18, tintColor: COLORS.white}}
        />
      </View>

      <View>
        <Collapsible
          collapsed={collapsed}
          style={{marginVertical: SIZES.padding}}>
          <View style={{}}>
            <TextButton
              label="Create New Project"
              disabled={false}
              buttonContainerStyle={{
                height: 40,
                alignItems: 'center',
                marginBottom: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.yellow_400,
              }}
              labelStyle={{
                color: COLORS.black,
              }}
              onPress={() => setCreateProjectModal(true)}
            />
            <View
              style={{
                borderBottomColor: COLORS.lightGray1,
                borderBottomWidth: 1,
                marginBottom: SIZES.radius,
              }}
            />
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
                marginBottom: SIZES.radius,
              }}>
              Existing Projects
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: SIZES.padding}}>
            {renderProjects()}
          </ScrollView>
        </Collapsible>
      </View>
      {showCreateProjectModal && (
        <ProjectsCreateModal
          isVisible={showCreateProjectModal}
          onClose={() => setCreateProjectModal(false)}
        />
      )}
    </TouchableOpacity>
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
export default ProjectsBanner;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {TextButton} from '../../../Components';
import {useNavigation} from '@react-navigation/native';
import ProjectsCreateModal from '../Modals/ProjectsCreateModal';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';
import axios from 'axios';
const url = 'http://192.168.1.99:8000/api/projects';
import ProjectsOperationModal from '../Modals/ProjectsOperationModal';

const ProjectsBanner = () => {
  const navigation = useNavigation();
  const [projects, setProjects] = React.useState([]);
  const [projectsDetails, setProjectsDetails] = React.useState([]);
  const [showCreateProjectModal, setCreateProjectModal] = React.useState(false);
  const [showProjectModal, setShowProjectModal] = React.useState(false);
  const [showProjectOperationModal, setShowProjectOperationModal] =
    React.useState(false);
  const [collapsed, setCollapsed] = React.useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    axios.get(url).then(response => setProjects(response.data));
  });

  const showToast = () => {
    ToastAndroid.show('Project Delete Successfully', ToastAndroid.SHORT);
  };

  const OnSubmit = () => {
    fetch('http://192.168.1.99:8000/api/projects/' + data, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    showToast();
  };

  const [data, setData] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const modalHandler = id => {
    setData(id);
    console.log(id);
    setModalVisible(true);
  };

  function renderProjects() {
    const renderItem = ({item, index}) => (
      <SafeAreaView>
        <ScrollView nestedScrollEnabled={true}>
          <TouchableOpacity
            style={{marginVertical: SIZES.base}}
            onPress={() => {
              navigation.navigate('ProjectsDetails', {
                name: item.project_name,
              });
            }}>
            <View
              style={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white2,
                paddingHorizontal: SIZES.radius,
                paddingVertical: SIZES.radius,
                ...styles.shadow,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.darkGray,
                    textTransform: 'capitalize',
                  }}>
                  {item.project_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ImageBackground
                    style={{
                      width: 18,
                      height: 18,
                      backgroundColor: COLORS.success_300,
                      borderRadius: SIZES.padding,
                      alignItems: 'center',
                      justifyContent: 'center',
                      right: 12,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: COLORS.black,
                      }}>
                      {index + 1}
                    </Text>
                  </ImageBackground>
                  <TouchableOpacity
                    onPress={() => {
                      alert('All Notification Message Show in here...');
                    }}>
                    <Image
                      source={icons.notification}
                      style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.darkGray,
                        right: 3,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      modalHandler(item._id);
                    }}>
                    <Image
                      source={icons.menu}
                      style={{
                        width: 18,
                        height: 18,
                        tintColor: COLORS.darkGray,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.gray,
                }}>
                Project code - {index + 1}
              </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.gray,
                }}>
                Progress - 89%
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
    return (
      <FlatList
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        data={projects}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
      />
    );
  }

  function renderAreaCodeModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack1,
            }}>
            <View
              style={{
                // height: 100,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: SIZES.padding,
                  // marginVertical: SIZES.base,
                }}>
                <TextButton
                  label="Update"
                  disabled={false}
                  buttonContainerStyle={{
                    alignItems: 'center',
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 8,
                    backgroundColor: COLORS.success_400,
                    marginVertical: SIZES.padding,
                  }}
                  labelStyle={{
                    color: COLORS.black,
                    ...FONTS.h3,
                  }}
                  onPress={
                    () =>
                      // OnSubmitEdit()
                      setCreateProjectModal(true)
                    // alert('Update details of project')
                  }
                />
                <TextButton
                  label="Remove"
                  disabled={false}
                  buttonContainerStyle={{
                    alignItems: 'center',
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: SIZES.radius,
                    borderRadius: 8,
                    backgroundColor: COLORS.yellow_400,
                    marginVertical: SIZES.padding,
                  }}
                  labelStyle={{
                    color: COLORS.black,
                    ...FONTS.h3,
                  }}
                  onPress={
                    () => showToast()
                    // alert('Remove from  list add to database')
                  }
                />
                <TextButton
                  label="Delete"
                  disabled={false}
                  buttonContainerStyle={{
                    alignItems: 'center',
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: SIZES.radius,
                    borderRadius: 8,
                    backgroundColor: COLORS.red,
                    marginVertical: SIZES.padding,
                  }}
                  labelStyle={{
                    color: COLORS.white,
                    ...FONTS.h3,
                  }}
                  onPress={
                    () => OnSubmit()
                    // alert('delete')
                  }
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.lightblue_600,
        borderRadius: SIZES.base,
        ...styles.shadow,
      }}
      onPress={toggleExpanded}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{...FONTS.body2, color: COLORS.white}}>Projects</Text>
          <TextButton
            label="Create New"
            disabled={false}
            buttonContainerStyle={{
              marginLeft: SIZES.padding * 3.7,
              alignItems: 'center',
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 8,
              backgroundColor: COLORS.yellow_400,
            }}
            labelStyle={{
              color: COLORS.black,
              ...FONTS.body4,
            }}
            onPress={() => setCreateProjectModal(true)}
          />
        </View>
        <Image
          source={icons.down_arrow}
          style={{
            height: 18,
            width: 18,
            tintColor: COLORS.white,
            marginLeft: SIZES.padding,
          }}
        />
      </View>
      <Collapsible collapsed={collapsed}>
        <View>{renderProjects()}</View>
      </Collapsible>
      {showCreateProjectModal && (
        <ProjectsCreateModal
          isVisible={showCreateProjectModal}
          onClose={() => setCreateProjectModal(false)}
        />
      )}
      {showProjectOperationModal && (
        <ProjectsOperationModal
          isVisible={showProjectOperationModal}
          onClose={() => setShowProjectOperationModal(false)}
        />
      )}
      {showProjectModal && (
        <ProjectsCreateModal
          isVisible={showProjectModal}
          onClose={() => setShowProjectModal(false)}
        />
      )}
      {renderAreaCodeModal()}
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

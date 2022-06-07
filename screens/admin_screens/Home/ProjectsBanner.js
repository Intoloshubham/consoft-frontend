import React from 'react';
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
  const [projects, setProjects] = React.useState([]);
  const [showCreateProjectModal, setCreateProjectModal] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    axios.get(url).then(response => setProjects(response.data));
  });

  function renderProjects() {
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
          <Text style={{color: COLORS.white, ...FONTS.body5}}>{index + 1}</Text>
          <Text
            style={{
              marginLeft: 30,
              color: COLORS.white,
              ...FONTS.body5,
            }}>
            {item.project_name}
          </Text>
        </View>
        {/* p.code  */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: -10,
              color: COLORS.white,
              ...FONTS.body5,
            }}>
            {index + 1}
          </Text>
          <Text
            style={{
              marginLeft: 35,
              color: COLORS.white,
              ...FONTS.body5,
            }}>
            55%
          </Text>
          <Text
            style={{
              marginLeft: 60,
              color: COLORS.white,
              ...FONTS.body5,
            }}>
            4
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={projects}
        keyExtractor={item => `${item._id}`}
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
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
            }}>
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.body5,
              }}>
              S.N
            </Text>
            <Text
              style={{
                flex: 1,
                marginLeft: -25,
                color: COLORS.white,
                ...FONTS.body5,
              }}>
              Name
            </Text>
            <Text
              style={{
                flex: 1,
                marginLeft: 30,
                color: COLORS.white,
                ...FONTS.body5,
              }}>
              Pc
            </Text>

            <Text
              style={{
                flex: 1,
                marginLeft: -30,
                color: COLORS.white,
                ...FONTS.body5,
              }}>
              Progress
            </Text>
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.body5,
              }}>
              Notification
            </Text>
          </View>
        }
      />
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

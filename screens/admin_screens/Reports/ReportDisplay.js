import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux';
import {getProjects} from '../../../controller/ProjectController';
import {SIZES, FONTS, COLORS, icons, images} from '../../../constants';
import {getReport} from '../../../controller/Report';

const ReportDisplay = () => {
  const companyData = useSelector(state => state.company);
  const company_id = companyData._id;

  // projects
  const [onSelect, setOnSelect] = React.useState(false);
  const [openProject, setOpenProject] = React.useState(false);
  const [projectValue, setProjectValue] = React.useState([]);
  const [project, setProject] = React.useState([]);
  const onProjectOpen = React.useCallback(() => {
    fetchProject();
  }, []);

  const [report, setReport] = React.useState([]);

  // get projects
  const fetchProject = async () => {
    let response = await getProjects(company_id);
    if (response.status === 200) {
      let projectFromApi = response.data.map(ele => {
        return {label: ele.project_name, value: ele._id};
      });
      setProject(projectFromApi);
    }
  };

  // get report
  const fetchReport = async project_id => {
    let response = await getReport(project_id);
    setReport(response.data);
  };

  // date
  const [date, setDate] = React.useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode('date');
  };

  function renderProjectFilter() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '85%',
            ...styles.shadow,
          }}>
          <DropDownPicker
            style={{
              borderWidth: null,
              backgroundColor: COLORS.white,
              minHeight: 40,
              borderRadius: 5,
            }}
            dropDownContainerStyle={{
              backgroundColor: COLORS.darkGray,
              borderWidth: null,
              borderRadius: 5,
            }}
            textStyle={{
              fontSize: 16,
              color: COLORS.black,
              textTransform: 'capitalize',
            }}
            listParentLabelStyle={{color: COLORS.white, fontSize: 15}}
            placeholder="Select project"
            open={openProject}
            value={projectValue}
            items={project}
            setOpen={setOpenProject}
            setValue={setProjectValue}
            setItems={setProject}
            tickIconStyle={{
              width: 18,
              height: 18,
              backgroundColor: COLORS.white,
              tintColor: 'black',
            }}
            onSelectItem={value => {
              fetchReport(value.value);
              setOnSelect(true);
            }}
            onOpen={onProjectOpen}
            autoScroll={false}
            arrowIconStyle={{
              width: 25,
              height: 25,
              tintColor: 'black',
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.darkGray,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={showDatepicker}>
          <Image
            source={icons.filter}
            style={{height: 18, width: 18, tintColor: '#ffffff'}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderReport() {
    const renderItem = ({item}) => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.darkGray,
            textTransform: 'capitalize',
          }}>
          {item.user_name}
        </Text>
        <Image source={icons.arr_down} style={{height: 15, width: 15}} />
      </View>
    );
    return (
      <FlatList
        contentContainerStyle={{
          marginTop: SIZES.padding,
          backgroundColor: 'white',
          padding: 10,
        }}
        data={report}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                backgroundColor: COLORS.lightGray1,
                marginVertical: 5,
              }}></View>
          );
        }}
      />
    );
  }

  return (
    <View style={{margin: SIZES.padding}}>
      {renderProjectFilter()}
      {onSelect == true && renderReport()}
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
export default ReportDisplay;

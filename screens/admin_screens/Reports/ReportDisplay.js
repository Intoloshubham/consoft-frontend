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
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux';
import {getProjects} from '../../../controller/ProjectController';
import {SIZES, FONTS, COLORS, icons, images} from '../../../constants';
import {
  getManpower,
  getReport,
  getQuantity,
} from '../../../controller/ReportController';

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
  const [reportModal, setReportModal] = React.useState(false);
  const [reportData, setReportData] = React.useState('');

  const [manpower, setManpower] = React.useState([]);
  const [quantity, setQuantity] = React.useState([]);

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

  // fetch manpower on click
  const fetchManpower = async report_id => {
    let response = await getManpower(report_id);
    if (response.status === 200) {
      setManpower(response.data);
    }
  };

  // fetch quantity on click
  const fetchQuantity = async report_id => {
    let response = await getQuantity(report_id);
    if (response.status === 200) {
      setQuantity(response.data);
    }
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
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 10,
          elevation: 1,
        }}
        onPress={() => {
          setReportModal(true);
          setReportData({
            project_name: item.project_name,
            user_name: item.user_name,
            date: item.report_date,
            time: item.report_time,
          });
          fetchManpower(item._id);
          fetchQuantity(item._id);
        }}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.darkGray,
            textTransform: 'capitalize',
          }}>
          {item.user_name}
        </Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={icons.date}
              style={{height: 12, width: 12, right: 10}}
            />
            <Text style={{fontSize: 12, color: COLORS.darkGray}}>
              {item.report_date}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={icons.time}
              style={{height: 12, width: 12, right: 10}}
            />
            <Text style={{fontSize: 12, color: COLORS.darkGray}}>
              {item.report_time}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        contentContainerStyle={{marginTop: 20}}
        data={report}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                marginVertical: SIZES.base - 2,
              }}></View>
          );
        }}
      />
    );
  }

  function renderReportModal() {
    const renderItem = ({item}) => (
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.gray2,
          padding: 5,
          borderRadius: 3,
          width: SIZES.width / 2.4,
        }}>
        <Text style={{...FONTS.h3, color: 'black'}}>
          {item.contractor_name}
        </Text>
        <View style={{}}>
          {item.manpowerCategories.map((ele, i) => {
            return (
              <View
                key={i}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
                  {i + 1}.
                </Text>
                <View
                  style={{
                    left: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.black,
                    }}>
                    {ele.manpower_category_name} {' - '}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.black,
                    }}>
                    {ele.manpower_member}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );

    const footerComponent = () => <View>{renderQuantity()}</View>;

    return (
      <Modal animationType="slide" transparent={true} visible={reportModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.transparentBlack7,
          }}>
          <View
            style={{
              top: 50,
              backgroundColor: COLORS.white,
              paddingHorizontal: SIZES.radius,
              paddingBottom: SIZES.radius,
              height: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ImageBackground
                style={{
                  borderWidth: 2,
                  borderRadius: 20,
                  borderColor: 'white',
                  padding: 3,
                  top: -20,
                  backgroundColor: COLORS.rose_600,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setReportModal(false);
                  }}>
                  <Image
                    source={icons.cross}
                    style={{height: 25, width: 25, tintColor: COLORS.white}}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.darkGray2,
                borderRadius: 3,
                padding: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.black,
                    textTransform: 'capitalize',
                  }}>
                  {reportData.project_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 13, color: COLORS.darkGray}}>
                      Date{' - '}
                    </Text>
                    <Text style={{fontSize: 12, color: COLORS.darkGray}}>
                      {reportData.date}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 13, color: COLORS.darkGray}}>
                      Time{' - '}
                    </Text>
                    <Text style={{fontSize: 12, color: COLORS.darkGray}}>
                      {reportData.time}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  borderColor: COLORS.gray2,
                }}></View>
              <View>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.black,
                    textAlign: 'center',
                  }}>
                  Manpower
                </Text>
                <Text style={{...FONTS.h3, color: COLORS.black}}>
                  Contractors
                </Text>

                <FlatList
                  contentContainerStyle={{marginTop: 5}}
                  numColumns={2}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                  data={manpower}
                  keyExtractor={item => `${item._id}`}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => {
                    return <View style={{margin: 5}}></View>;
                  }}
                  ListFooterComponent={footerComponent}
                />
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  borderColor: COLORS.gray2,
                }}></View>
              <View>
                <Text> report Footer</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderQuantity() {
    const renderItem = ({item, i}) => (
      <View>
        <View
          style={{
            marginTop: i == 0 ? null : 5,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1,
              ...FONTS.h3,
              color: COLORS.darkGray,
            }}>
            {item.quantityWorkItems.item_name}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              flex: 0.5,
              color: COLORS.darkGray,
              textAlign: 'right',
            }}>
            {item.quantityWorkItems.num_length}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              flex: 0.5,
              color: COLORS.darkGray,
              textAlign: 'right',
            }}>
            {item.quantityWorkItems.num_width}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              flex: 0.5,
              color: COLORS.darkGray,
              textAlign: 'right',
            }}>
            {item.quantityWorkItems.num_height}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              flex: 1,
              color: COLORS.darkGray,
              textAlign: 'right',
            }}>
            {item.quantityWorkItems.num_total}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              flex: 1,
              color: COLORS.darkGray,
              textAlign: 'right',
            }}>
            {item.quantityWorkItems.quality_type}
          </Text>
        </View>
        <View style={{marginTop: 8}}>
          {item.quantityWorkItems.subquantityitems.map((ele, i) => {
            return (
              <View key={i}>
                {i == 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: SIZES.base,
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        ...FONTS.h4,
                        color: COLORS.black,
                        // fsontWeight: 'bold',
                      }}></Text>
                    <Text
                      style={{
                        ...FONTS.h4,
                        flex: 0.5,
                        color: COLORS.black,
                        textAlign: 'right',
                        // fontWeight: 'bold',
                      }}>
                      L
                    </Text>
                    <Text
                      style={{
                        ...FONTS.h4,
                        flex: 0.5,
                        color: COLORS.black,
                        textAlign: 'right',
                        // fontWeight: 'bold',
                      }}>
                      W
                    </Text>
                    <Text
                      style={{
                        ...FONTS.h4,
                        flex: 0.5,
                        color: COLORS.black,
                        textAlign: 'right',
                        // fontWeight: 'bold',
                      }}>
                      H
                    </Text>
                    <Text
                      style={{
                        ...FONTS.h4,
                        flex: 1,
                        color: COLORS.black,
                        textAlign: 'right',
                        // fontWeight: 'bold',
                      }}>
                      Total
                    </Text>
                    <Text
                      style={{
                        ...FONTS.h3,
                        flex: 1,
                        color: COLORS.black,
                        textAlign: 'right',
                        // fontWeight: 'bold',
                      }}>
                      Remark
                    </Text>
                  </View>
                ) : null}
                <View
                  style={{
                    left: 100,
                    borderBottomWidth: 1,
                    borderColor: COLORS.gray2,
                    width: '75%',
                  }}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: SIZES.base,
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      ...FONTS.h4,
                      color: COLORS.darkGray,
                      // fsontWeight: 'bold',
                    }}></Text>
                  <Text
                    style={{
                      ...FONTS.h4,
                      flex: 0.5,
                      color: COLORS.darkGray,
                      textAlign: 'right',
                      // fontWeight: 'bold',
                    }}>
                    {ele.sub_length}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h4,
                      flex: 0.5,
                      color: COLORS.darkGray,
                      textAlign: 'right',
                      // fontWeight: 'bold',
                    }}>
                    {ele.sub_width}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h4,
                      flex: 0.5,
                      color: COLORS.darkGray,
                      textAlign: 'right',
                      // fontWeight: 'bold',
                    }}>
                    {ele.sub_height}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h4,
                      flex: 1,
                      color: COLORS.darkGray,
                      textAlign: 'right',
                      // fontWeight: 'bold',
                    }}>
                    {ele.sub_total}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h3,
                      flex: 1,
                      color: COLORS.darkGray,
                      textAlign: 'right',
                      // fontWeight: 'bold',
                    }}>
                    {ele.sub_quality_type}
                  </Text>
                </View>
                {/* <View
                  style={{
                    left: 100,
                    borderBottomWidth: 1,
                    borderColor: COLORS.gray2,
                    width: '75%',
                  }}></View> */}
              </View>
            );
          })}
        </View>
      </View>
    );

    return (
      <View>
        <View
          style={{
            borderBottomWidth: 1,
            marginVertical: 10,
            borderColor: COLORS.gray2,
          }}></View>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
            textAlign: 'center',
          }}>
          Excluded Quantity
        </Text>
        {/* <Text style={{...FONTS.h3, color: COLORS.black}}>Contractors</Text> */}
        <FlatList
          // contentContainerStyle={{marginTop: 5}}
          data={quantity}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.gray2,
                  marginVertical: SIZES.base,
                }}></View>
            );
          }}
          ListHeaderComponent={
            <View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginBottom: SIZES.base,
                }}>
                <Text
                  style={{
                    flex: 1,
                    ...FONTS.h3,
                    color: COLORS.black,
                    // fsontWeight: 'bold',
                  }}>
                  Items
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    flex: 0.5,
                    color: COLORS.black,
                    textAlign: 'right',
                    // fontWeight: 'bold',
                  }}>
                  L
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    flex: 0.5,
                    color: COLORS.black,
                    textAlign: 'right',
                    // fontWeight: 'bold',
                  }}>
                  W
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    flex: 0.5,
                    color: COLORS.black,
                    textAlign: 'right',
                    // fontWeight: 'bold',
                  }}>
                  H
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    flex: 1,
                    color: COLORS.black,
                    textAlign: 'right',
                    // fontWeight: 'bold',
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    flex: 1,
                    color: COLORS.black,
                    textAlign: 'right',
                    // fontWeight: 'bold',
                  }}>
                  Remark
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: COLORS.gray2,
                }}></View>
            </View>
          }
        />
      </View>
    );
  }

  return (
    <View style={{margin: SIZES.radius}}>
      {renderProjectFilter()}
      {onSelect == true && renderReport()}
      {renderReportModal()}
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

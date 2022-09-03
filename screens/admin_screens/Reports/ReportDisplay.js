import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
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
import CheckBox from '@react-native-community/checkbox';
import {getPrivileges} from '../../../controller/UserRoleController';
import {getProjectReportPath} from '../../../controller/ReportController';

const ReportDisplay = () => {
  const companyDetail = useSelector(state => state.company);
  const userData = useSelector(state => state.user);

  var companyData;
  if (companyDetail._id) {
    companyData = companyDetail;
  } else {
    companyData = userData;
  }
  const company_id = companyData._id;

  // console.log(companyData);

  // projects
  const [onSelect, setOnSelect] = React.useState(false);
  const [openProject, setOpenProject] = React.useState(false);
  const [projectValue, setProjectValue] = React.useState([]);
  const [project, setProject] = React.useState([]);

  const [report, setReport] = React.useState([]);
  const [reportModal, setReportModal] = React.useState(false);
  const [reportData, setReportData] = React.useState('');

  //report
  const [manpower, setManpower] = React.useState([]);
  const [quantity, setQuantity] = React.useState([]);

  //checkbox
  const [isSelected1, setSelection1] = React.useState(false);
  const [isSelected2, setSelection2] = React.useState(false);
  const [isSelected3, setSelection3] = React.useState(false);

  const checkAllHelper = value => {
    if (value) {
      setSelection1(true);
      setSelection2(true);
      setSelection3(true);
    } else {
      setSelection1(false);
      setSelection2(false);
      setSelection3(false);
    }
  };
  // privilges

  const [reportPath, setReportPath] = React.useState([]);

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

  // fetch privileges
  const fetchReportPath = async project_id => {
    const response = await getProjectReportPath(company_id, project_id);
    // console.log(response);
    setReportPath(response.data);
  };

  const onProjectOpen = React.useCallback(() => {
    setOnSelect(false);
    fetchProject();
  }, []);

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
              fetchReportPath(value.value);
            }}
            onOpen={onProjectOpen}
            autoScroll={false}
            arrowIconStyle={{
              width: 25,
              height: 25,
              tintColor: 'black',
            }}
            // maxHeight={200}
            // zIndex={1000}
            zIndexInverse={1000}
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

  // report user list
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

  // report showing modal
  function renderReportModal() {
    const renderItem = ({item, index}) => (
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.gray2,
          padding: 10,
          // borderRadius: 3,
          width: SIZES.width / 2.4,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: 'black',
            textDecorationLine: 'underline',
            textTransform: 'capitalize',
            marginBottom: 3,
          }}>
          {item.contractor_name}
        </Text>
        <View style={{}}>
          {item.manpowerCategories.map((ele, i) => {
            return (
              <View
                key={i}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...FONTS.h4, color: COLORS.black}}>{i + 1}.</Text>
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

    const footerComponent = () => (
      <View>
        {renderQuantity()}
        {renderFooter()}
      </View>
    );

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
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 8,
                ...FONTS.h2,
                color: COLORS.lightblue_900,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              Daily Progress Report
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.darkGray2,
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
                    // ...FONTS.h2,
                    fontSize: 25,
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
                    <Text style={{fontSize: 14, color: COLORS.black}}>
                      Date{' - '}
                    </Text>
                    <Text style={{fontSize: 13, color: COLORS.black}}>
                      {reportData.date}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 14, color: COLORS.black}}>
                      Time{' - '}
                    </Text>
                    <Text style={{fontSize: 13, color: COLORS.black}}>
                      {reportData.time}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginTop: 15,
                  marginBottom: 5,
                  borderColor: COLORS.gray2,
                }}></View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: COLORS.black,
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                    marginBottom: 5,
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
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  // quantity report
  function renderQuantity() {
    const renderItem = ({item, index}) => (
      <View>
        <View
          style={{
            // marginTop: 5,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1,
              ...FONTS.h3,
              color: COLORS.black,
            }}>
            {item.quantityWorkItems.item_name}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              flex: 0.5,
              color: COLORS.black,
              textAlign: 'right',
            }}>
            {item.quantityWorkItems.num_length}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              flex: 0.5,
              color: COLORS.black,
              textAlign: 'right',
            }}>
            {item.quantityWorkItems.num_width}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              flex: 0.5,
              color: COLORS.black,
              textAlign: 'right',
            }}>
            {item.quantityWorkItems.num_height}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              flex: 1,
              color: COLORS.black,
              textAlign: 'right',
            }}>
            {item.quantityWorkItems.num_total}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              flex: 1,
              color: COLORS.black,
              textAlign: 'right',
            }}>
            {item.quantityWorkItems.quality_type}
          </Text>
        </View>
        {index == 0 ? (
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: index == 0 ? 10 : null,
              borderColor: COLORS.darkGray2,
            }}></View>
        ) : null}
        <View style={{}}>
          {item.quantityWorkItems.subquantityitems.map((ele, i) => {
            return (
              <View key={i}>
                {i == 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      // marginBottom: SIZES.base,
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
                    borderColor: COLORS.darkGray2,
                    width: '75%',
                    marginVertical: 5,
                  }}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    // marginBottom: SIZES.base,
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
                    {ele.sub_length}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h4,
                      flex: 0.5,
                      color: COLORS.black,
                      textAlign: 'right',
                      // fontWeight: 'bold',
                    }}>
                    {ele.sub_width}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h4,
                      flex: 0.5,
                      color: COLORS.black,
                      textAlign: 'right',
                      // fontWeight: 'bold',
                    }}>
                    {ele.sub_height}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h4,
                      flex: 1,
                      color: COLORS.black,
                      textAlign: 'right',
                      // fontWeight: 'bold',
                    }}>
                    {ele.sub_total}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.h3,
                      flex: 1,
                      color: COLORS.black,
                      textAlign: 'right',
                      // fontWeight: 'bold',
                    }}>
                    {ele.sub_quality_type}
                  </Text>
                </View>
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
            marginTop: 15,
            marginBottom: 5,
            borderColor: COLORS.gray2,
          }}></View>
        <Text
          style={{
            fontSize: 18,
            color: COLORS.black,
            textAlign: 'center',
            textDecorationLine: 'underline',
            marginBottom: 5,
          }}>
          Excluded Quantity
        </Text>
        <FlatList
          data={quantity}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.darkGray,
                  marginVertical: 10,
                }}></View>
            );
          }}
          ListHeaderComponent={
            <View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    flex: 1,
                    ...FONTS.h3,
                    color: COLORS.black,
                  }}>
                  Items
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    flex: 0.5,
                    color: COLORS.black,
                    textAlign: 'right',
                  }}>
                  L
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    flex: 0.5,
                    color: COLORS.black,
                    textAlign: 'right',
                  }}>
                  W
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    flex: 0.5,
                    color: COLORS.black,
                    textAlign: 'right',
                  }}>
                  H
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    flex: 1,
                    color: COLORS.black,
                    textAlign: 'right',
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    flex: 1,
                    color: COLORS.black,
                    textAlign: 'right',
                  }}>
                  Remark
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: COLORS.darkGray,
                  marginBottom: 10,
                }}></View>
            </View>
          }
        />
      </View>
    );
  }

  function renderFooter() {
    return (
      <View>
        <View
          style={{
            borderBottomWidth: 1,
            marginTop: 15,
            marginBottom: 10,
            borderColor: COLORS.gray2,
          }}></View>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.black,
            marginBottom: 5,
          }}>
          Verify
        </Text>
        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox value={isSelected1} onValueChange={setSelection1} />
          <Text style={{...FONTS.h4, color: 'black'}}>Admin 1</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox value={isSelected2} onValueChange={setSelection2} />
          <Text style={{...FONTS.h4, color: 'black'}}>Admin 2</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox value={isSelected3} onValueChange={setSelection3} />
          <Text style={{...FONTS.h4, color: 'black'}}>Admin 3</Text>
        </View> */}
        {reportPath.map((ele, i) => {
          // {
          //   ele.admin_3 ==
          // }
          return (
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox value={isSelected3} onValueChange={setSelection3} />
                <Text style={{...FONTS.h4, color: 'black'}}>
                  {ele.admin_1_name}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', left: 10}}>
                <CheckBox value={isSelected3} onValueChange={setSelection3} />
                <Text style={{...FONTS.h4, color: 'black'}}>
                  {ele.admin_2_name}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', left: 20}}>
                <CheckBox value={isSelected3} onValueChange={setSelection3} />
                <Text style={{...FONTS.h4, color: 'black'}}>
                  {ele.admin_3_name}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={{margin: SIZES.radius}}>
      {renderProjectFilter()}
      {renderReportModal()}
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

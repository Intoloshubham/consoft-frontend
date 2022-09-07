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
  TextInput,
  TouchableWithoutFeedback,
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
  verifyReport,
  revertReport,
} from '../../../controller/ReportController';
import {getSingleUser} from '../../../controller/UserRoleController';
import {getProjectReportPath} from '../../../controller/ReportController';
import {getUserId} from '../../../services/asyncStorageService';
import {FormInput} from '../../../Components';

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

  const [userId, setUserId] = React.useState('');

  const getUser_Id = async () => {
    const id = await getUserId();
    setUserId(id);
  };

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

  //report path
  const [reportPath, setReportPath] = React.useState([]);

  // for report verify
  const [projectId, setProjectId] = React.useState('');
  const [reportId, setReportId] = React.useState('');

  //modal
  const [revertModal, setRevertModal] = React.useState(false);
  const [revertMsg, setRevertMsg] = React.useState('');

  // console.log('object', reportData.verify_1_status);
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
    setProjectId(project_id);
    let response = await getReport(project_id);
    // console.log(response);
    setReport(response.data);
  };

  // fetch manpower report on click
  const fetchManpower = async report_id => {
    setReportId(report_id);
    let response = await getManpower(report_id);
    if (response.status === 200) {
      setManpower(response.data);
    }
  };

  // fetch quantity report on click
  const fetchQuantity = async report_id => {
    let response = await getQuantity(report_id);
    if (response.status === 200) {
      setQuantity(response.data);
    }
  };

  // fetch report path
  const fetchReportPath = async project_id => {
    const response = await getProjectReportPath(company_id, project_id);
    setReportPath(response.data);
  };

  // fetch verify report
  const fetchVerifyReport = async () => {
    let response = await verifyReport(projectId, reportId, userId);
    if (response.status === 200) {
      alert('Verified');
      fetchReport();
    }
  };

  // fetch revert report
  const submitRevertReport = async () => {
    const formData = {
      revert_msg: revertMsg,
    };
    let response = await revertReport(projectId, reportId, userId, formData);
    // console.log(response);
    if (response.status === 200) {
      alert('Reverted Successfully');
      setRevertMsg('');
      setRevertModal(false);
      fetchReport();
    } else {
      alert(response.message);
    }
  };

  // open project dropdown
  const onProjectOpen = React.useCallback(() => {
    setOnSelect(false);
    fetchProject();
    getUser_Id();
  }, []);

  React.useEffect(() => {
    fetchReport();
  }, []);

  // date section
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
            user_id: item.user_id,
            date: item.report_date,
            time: item.report_time,
            admin_1_status: item.admin_1_status,
            admin_2_status: item.admin_2_status,
            admin_1_revert_msg: item.admin_1_revert_msg,
            admin_2_revert_msg: item.admin_2_revert_msg,
            // admin_1_revert: item.admin_1_revert,
            // admin_2_revert: item.admin_2_revert,
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
        {userId && renderFooter()}
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
              top: 30,
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
                  contentContainerStyle={{marginTop: 5, maxHeight: 450}}
                  numColumns={2}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                  data={manpower}
                  keyExtractor={item => `${item._id}`}
                  renderItem={renderItem}
                  scrollEnabled={true}
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
          Verify Report :
        </Text>
        {reportPath.map((ele, i) => {
          return (
            <View key={i}>
              {ele.admin_1 === userId ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      textTransform: 'capitalize',
                      color: COLORS.black,
                    }}>
                    {ele.admin_1_name} :
                  </Text>
                  {reportData.admin_1_status === false ? (
                    <View
                      style={{
                        left: 20,
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 5,
                          paddingVertical: 1,
                          backgroundColor: COLORS.success_600,
                        }}
                        onPress={() => fetchVerifyReport()}>
                        <Text style={{color: 'white', ...FONTS.h4}}>
                          Verify
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          left: 15,
                          paddingHorizontal: 5,
                          paddingVertical: 1,
                          backgroundColor: COLORS.rose_600,
                        }}
                        onPress={() => setRevertModal(true)}>
                        <Text style={{color: 'white', ...FONTS.h4}}>
                          Revert
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        left: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{...FONTS.h3, color: COLORS.black}}>
                        Verified
                      </Text>
                      <Image
                        source={icons.verify}
                        style={{
                          left: 8,
                          width: 16,
                          height: 16,
                          tintColor: 'green',
                        }}
                      />
                    </View>
                  )}
                </View>
              ) : ele.admin_2 === userId ? (
                <View style={{}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        ...FONTS.h3,
                        textTransform: 'capitalize',
                        color: COLORS.black,
                      }}>
                      {ele.admin_2_name} :
                    </Text>
                    {reportData.admin_2_status === false ? (
                      <View
                        style={{
                          left: 20,
                          // flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            // left: 20,
                            flexDirection: 'row',
                          }}>
                          <TouchableOpacity
                            style={{
                              paddingHorizontal: 5,
                              paddingVertical: 1,
                              backgroundColor: COLORS.success_600,
                            }}
                            onPress={() => fetchVerifyReport()}>
                            <Text style={{color: 'white', ...FONTS.h4}}>
                              Verify
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              left: 15,
                              paddingHorizontal: 5,
                              paddingVertical: 1,
                              backgroundColor: COLORS.rose_600,
                            }}
                            onPress={() => setRevertModal(true)}>
                            <Text style={{color: 'white', ...FONTS.h4}}>
                              Revert
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          left: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text style={{...FONTS.h3, color: COLORS.black}}>
                          Verified
                        </Text>
                        <Image
                          source={icons.verify}
                          style={{
                            left: 8,
                            width: 16,
                            height: 16,
                            tintColor: 'green',
                          }}
                        />
                      </View>
                    )}
                  </View>
                  <Text
                    style={{...FONTS.h3, color: COLORS.black, marginTop: 5}}>
                    Revert message{' : '}
                    {reportData.admin_1_revert_msg}
                  </Text>
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }

  function renderRevertModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={revertModal}>
        <TouchableWithoutFeedback onPress={() => setRevertModal(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.transparentBlack7,
            }}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: COLORS.white,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
                width: '90%',
                top: '30%',
                borderRadius: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={{fontSize: 20, color: COLORS.darkGray}}>
                  Revert message
                </Text>
                <ImageBackground
                  style={{
                    backgroundColor: COLORS.white,
                    padding: 2,
                    elevation: 20,
                  }}>
                  <TouchableOpacity onPress={() => setRevertModal(false)}>
                    <Image
                      source={icons.cross}
                      style={{
                        height: 25,
                        width: 25,
                        tintColor: COLORS.rose_600,
                      }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.darkGray,
                }}>
                <TextInput
                  placeholder="Write your message..."
                  multiline={true}
                  numberOfLines={3}
                  onChangeText={value => {
                    setRevertMsg(value);
                  }}
                />
              </View>

              <TouchableOpacity
                style={{
                  marginTop: SIZES.padding,
                  alignItems: 'center',
                }}
                onPress={() => submitRevertReport()}>
                <Text
                  style={{
                    ...FONTS.h3,
                    backgroundColor: COLORS.lightblue_800,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                    borderRadius: 3,
                    color: COLORS.white,
                  }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <View style={{margin: SIZES.radius}}>
      {renderProjectFilter()}
      {renderRevertModal()}
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

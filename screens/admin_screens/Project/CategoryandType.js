import React, {useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  LogBox,
  Image,
  ImageBackground,
} from 'react-native';
import {
  HeaderBar,
  TextButton,
  IconButton,
  FormInput,
  CustomDropdown,
  CustomToast,
} from '../../../Components';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import Config from '../../../config';
import {useSelector} from 'react-redux';
import {getProjectCategory} from '../../../controller/ProjectCategoryAndTypeController';

const CategoryandType = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  // CUSTOM TOAST OF CRUD OPERATIONS
  const [submitToast, setSubmitToast] = React.useState(false);
  const [updateToast, setUpdateToast] = React.useState(false);
  const [deleteToast, setDeleteToast] = React.useState(false);

  // COMPANY DATA
  const companyData = useSelector(state => state.company);

  // STATES FOR STORING CATEGORIES & PROJECT TYPES DATA
  const [projectCategories, setProjectCategories] = React.useState([]);
  const [projectTypes, setProjectTypes] = React.useState([]);
  //Modal
  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [showTypesModal, setShowTypesModal] = React.useState(false);
  // Form Data
  const [catName, setCatName] = React.useState('');
  const [typeName, setTypeName] = React.useState('');
  //Dropdown
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([]);

  // get project category
  const projectCategory = () => {
    var response = getProjectCategory();
    console.log(response);
  };
  
  // get cat data
  const getData = name => {
    setCatName(name);
  };

  // all apis & Get categories
  React.useEffect(() => {
    const abortConst = new AbortController();
    fetch(
      `${Config.API_URL}project-category`,
      {signal: abortConst.signal},
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        let catFromApi = data.map(item => {
          return {label: item.category_name, value: item._id};
        });
        setProjectCategories(data);
        setItems(catFromApi);
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log(error);
        }
      });
    return () => abortConst.abort();
  }, [projectCategories]);

  // post categories
  const OnSubmit = () => {
    const data = {
      category_name: catName,
      company_id: companyData._id,
    };

    fetch(`${Config.API_URL}project-category`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setShowCategoryModal(false);
          setCatName('');
          setSubmitToast(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setTimeout(() => {
      setSubmitToast(false);
    }, 2000);
  };

  const [id, setId] = React.useState('');
  const getId = id => {
    console.log(id);
    setId(id);
  };
  // Edit categories
  const OnEdit = () => {
    console.log(id);
    const editData = {
      category_name: catName,
      company_id: companyData._id,
    };
    fetch(`${Config.API_URL}project-category/` + `${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          setUpdateToast(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
    setTimeout(() => {
      setUpdateToast(false);
    }, 2000);
  };

  const OnDelete = id => {
    fetch(`${Config.API_URL}project-category/` + `${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setDeleteToast(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
    setTimeout(() => {
      setDeleteToast(false);
    }, 1500);
  };

  const [typeid, setTypeId] = React.useState('');
  const gettypeId = id => {
    setTypeId(id);
  };

  const getTypeData = (cat_id, name) => {
    setValue(cat_id);
    setTypeName(name);
  };

  // Api call for types
  React.useEffect(() => {
    const abortConst = new AbortController();
    fetch(
      `${Config.API_URL}project-type`,
      {signal: abortConst.signal},
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setProjectTypes(data);
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log(error);
        }
      });
    return () => abortConst.abort();
  }, [projectTypes]);

  // post types
  const OnSubmittypes = () => {
    const data = {
      category_id: value,
      project_type: typeName,
      company_id: companyData._id,
    };

    fetch(`${Config.API_URL}project-type`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setSubmitToast(true);
          setTypeName('');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setTimeout(() => {
      setSubmitToast(false);
    }, 2000);
  };

  // Edit types
  const OnEditTypes = () => {
    const editData = {
      category_id: value,
      project_type: typeName,
      company_id: companyData._id,
    };
    fetch(`${Config.API_URL}project-type` + `/${typeid}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setUpdateToast(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setTimeout(() => {
      setUpdateToast(false);
    }, 2000);
  };

  const OnDeleteTypes = id => {
    fetch(`${Config.API_URL}project-type/` + `${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setDeleteToast(true);
          // setTypeDelete(false);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setTimeout(() => {
      setDeleteToast(false);
    }, 1500);
  };

  function renderCategories() {
    const renderItem = ({item, index}) => {
      return (
        <View
          style={{
            paddingVertical: SIZES.base,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
              {index + 1}.
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                marginLeft: SIZES.radius,
                color: COLORS.darkGray,
                textTransform: 'capitalize',
              }}>
              {item.category_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                getId(item._id);
                getData(item.category_name);
                setShowCategoryModal(true);
                // OnEdit();
              }}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.green,
                  padding: 5,
                  borderRadius: SIZES.base,
                  right: 10,
                }}>
                <Image
                  source={icons.edit}
                  style={{
                    height: 15,
                    width: 15,
                    tintColor: COLORS.white,
                  }}
                />
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => OnDelete(item._id)}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.rose_600,
                  padding: 5,
                  borderRadius: SIZES.base,
                }}>
                <Image
                  source={icons.delete_icon}
                  style={{height: 15, width: 15, tintColor: COLORS.white}}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_50,
          ...styles.shadow,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Categories</Text>
          <TextButton
            label="Add New"
            buttonContainerStyle={{
              paddingHorizontal: SIZES.base,
              borderRadius: 5,
            }}
            labelStyle={{...FONTS.h5}}
            onPress={() => {
              setCatName(''), setShowCategoryModal(true);
            }}
          />
        </View>
        <FlatList
          contentContainerStyle={{marginTop: SIZES.radius}}
          data={projectCategories}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          maxHeight={350}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.gray2,
                  // marginVertical: 5,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  function renderTypes() {
    const renderItem = ({item, index}) => {
      return (
        <View
          style={{
            paddingVertical: SIZES.base,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
              {index + 1}.
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                marginLeft: SIZES.radius,
                color: COLORS.darkGray,
                textTransform: 'capitalize',
              }}>
              {item.project_type}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                gettypeId(item._id);
                getTypeData(item.category_id, item.project_type);
                setShowTypesModal(true);
                OnEditTypes();
              }}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.green,
                  padding: 5,
                  borderRadius: SIZES.base,
                  right: 10,
                }}>
                <Image
                  source={icons.edit}
                  style={{
                    height: 15,
                    width: 15,
                    tintColor: COLORS.white,
                  }}
                />
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => OnDeleteTypes(item._id)}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.rose_600,
                  padding: 5,
                  borderRadius: SIZES.base,
                }}>
                <Image
                  source={icons.delete_icon}
                  style={{height: 15, width: 15, tintColor: COLORS.white}}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding * 2,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_50,
          ...styles.shadow,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Types</Text>
          <TextButton
            label="Add New"
            buttonContainerStyle={{
              paddingHorizontal: SIZES.base,
              borderRadius: 5,
            }}
            labelStyle={{...FONTS.h5}}
            onPress={() => {
              setTypeName('');
              setShowTypesModal(true);
            }}
          />
        </View>
        <FlatList
          contentContainerStyle={{marginTop: SIZES.radius}}
          data={projectTypes}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          maxHeight={350}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.gray2,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  function renderAddCategoriesModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCategoryModal}>
        <TouchableWithoutFeedback>
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
                left: SIZES.padding,
                width: '90%',
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
              }}>
              <View style={{}}>
                {/* header */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{flex: 1, fontSize: 20, color: COLORS.darkGray}}>
                    Project Categories
                  </Text>
                  <IconButton
                    containerStyle={{
                      boborderWidth: 2,
                      borderRadius: 10,
                      borderColor: COLORS.gray2,
                    }}
                    icon={icons.cross}
                    iconStyle={{
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setShowCategoryModal(false)}
                  />
                </View>
                <ScrollView
                  style={{
                    marginTop: SIZES.radius,
                  }}>
                  <FormInput
                    label="Name"
                    keyboardType="default"
                    autoCompleteType="username"
                    value={catName}
                    onChange={value => {
                      setCatName(value);
                    }}
                  />
                  <TextButton
                    label="Submit"
                    buttonContainerStyle={{
                      height: 50,
                      alignItems: 'center',
                      marginTop: SIZES.padding,
                      borderRadius: SIZES.radius,
                    }}
                    onPress={() => {
                      id == ''
                        ? (OnSubmit(), setShowCategoryModal(false))
                        : (OnEdit(), setShowCategoryModal(false));
                    }}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  function renderAddTypesModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={showTypesModal}>
        <TouchableWithoutFeedback>
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
                left: SIZES.padding,
                width: '90%',
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
              }}>
              <View style={{}}>
                {/* header */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{flex: 1, fontSize: 20, color: COLORS.darkGray}}>
                    Project Types
                  </Text>
                  <IconButton
                    containerStyle={{
                      boborderWidth: 2,
                      borderRadius: 10,
                      borderColor: COLORS.gray2,
                    }}
                    icon={icons.cross}
                    iconStyle={{
                      tintColor: COLORS.gray,
                    }}
                    onPress={() => setShowTypesModal(false)}
                  />
                </View>
                <ScrollView
                  style={{
                    marginTop: SIZES.base,
                  }}>
                  <CustomDropdown
                    placeholder="Select Categories"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    categorySelectable={true}
                    listParentLabelStyle={{
                      color: COLORS.white,
                    }}
                  />
                  <FormInput
                    label="Name"
                    keyboardType="default"
                    autoCompleteType="username"
                    value={typeName}
                    onChange={value => {
                      setTypeName(value);
                    }}
                  />
                  <TextButton
                    label="Submit"
                    buttonContainerStyle={{
                      height: 50,
                      alignItems: 'center',
                      marginTop: SIZES.padding,
                      borderRadius: SIZES.radius,
                    }}
                    onPress={() => {
                      typeid == ''
                        ? (OnSubmittypes(), setShowTypesModal(false))
                        : (OnEditTypes(), setShowTypesModal(false));
                    }}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}>
      <HeaderBar right={true} title="Categories & Types" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderCategories()}
        {renderTypes()}
        {renderAddCategoriesModal()}
        {renderAddTypesModal()}
      </ScrollView>

      <CustomToast
        isVisible={submitToast}
        onClose={() => setSubmitToast(false)}
        color={COLORS.green}
        title="Submit"
        message="Submitted Successfully..."
      />
      <CustomToast
        isVisible={updateToast}
        onClose={() => setUpdateToast(false)}
        color={COLORS.yellow_400}
        title="Update"
        message="Updated Successfully..."
      />
      <CustomToast
        isVisible={deleteToast}
        onClose={() => setDeleteToast(false)}
        color={COLORS.rose_600}
        title="Delete"
        message="Deleted Successfully..."
      />
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

export default CategoryandType;

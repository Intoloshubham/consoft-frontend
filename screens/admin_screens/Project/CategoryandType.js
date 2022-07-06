import React from 'react';
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
} from '../../../Components';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import Toast from 'react-native-toast-message';
import Config from '../../../config';
import {useSelector} from 'react-redux';

const CategoryandType = ({navigation}) => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });
  const companyData = useSelector(state => state.company);

  // Store categories & types data from api
  const [categories, setCategories] = React.useState([]);
  const [types, setTypes] = React.useState([]);
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

  // show toast on successfullt created
  const catshowToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'Created Successfully',
      text2: 'Success',
      visibilityTime: 2000,
    });

  const updateShowToast = () =>
    Toast.show({
      position: 'top',
      type: 'success',
      text1: 'Updated Successfully',
      text2: 'Success',
      visibilityTime: 2000,
    });

  const typeDeleteToast = () =>
    Toast.show({
      position: 'top',
      type: 'info',
      text1: 'Deleted Successfully',
      text2: 'Delete',
      visibilityTime: 2000,
    });

  // get cat id
  const [id, setId] = React.useState('');
  const getId = id => {
    // console.log('onedit', id);
    setId(id);
  };

  // get cat data
  const getData = name => {
    // console.log(name);
    setCatName(name);
  };

  // all apis & Get categories
  React.useEffect(() => {
    fetch(`${Config.API_URL}project-category`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        let catFromApi = data.map(item => {
          return {label: item.category_name, value: item._id};
        });
        setCategories(data);
        setItems(catFromApi);
      })
      .catch(error => console.log(error.message));
  }, [categories]);

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
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Edit categories
  const OnEdit = () => {
    const editData = {
      category_name: catName,
      company_id: companyData._id,
    };
    fetch(`${Config.API_URL}project-category` + `/${id}`, {
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
          updateShowToast();
        }
      });
  };

  // Delete categories
  const OnDelete = id => {
    fetch(`${Config.API_URL}project-category` + `/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    // console.log('cat delete');
  };

  // All api of types
  // get id
  const [typeid, setTypeId] = React.useState('');
  const gettypeId = id => {
    // console.log('type', id);
    setTypeId(id);
  };

  // get type data
  const getTypeData = (cat_id, name) => {
    // console.log(name);
    setValue(cat_id);
    setTypeName(name);
  };

  // Api call for types
  React.useEffect(() => {
    fetch(`${Config.API_URL}project-type`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setTypes(data);
      })
      .catch(error => console.log(error.message));
  });

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
        // console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
          updateShowToast();
        }
      });
  };

  // Delete types
  const OnDeleteTypes = id => {
    // console.log('delete', id);
    fetch('http://192.168.1.99:8000/api/project-type/' + `${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    // console.log('type delete');
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
                OnEdit();
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
            onPress={() => setShowCategoryModal(true)}
          />
        </View>
        <FlatList
          contentContainerStyle={{marginTop: SIZES.radius}}
          data={categories}
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
                  marginVertical: 5,
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
            onPress={() => setShowTypesModal(true)}
          />
        </View>
        <FlatList
          contentContainerStyle={{marginTop: SIZES.radius}}
          data={types}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
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
      <Toast config={catshowToast} />
      <Toast config={updateShowToast} />
      <Toast config={typeDeleteToast} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderCategories()}
        {renderTypes()}
        {renderAddCategoriesModal()}
        {renderAddTypesModal()}
      </ScrollView>
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

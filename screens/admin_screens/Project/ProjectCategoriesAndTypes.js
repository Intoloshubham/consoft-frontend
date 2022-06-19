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
} from 'react-native';
import {
  HeaderBar,
  TextButton,
  IconButton,
  FormInput,
  Drop,
} from '../../../Components';
import {COLORS, SIZES, FONTS, icons} from '../../../constants';

const ProjectCategory = ({navigation}) => {
  //LogBox
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

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
  const [items, setItems] = React.useState([
    {label: 'Residential', value: '1'},
    {label: 'Hotels', value: '2'},
    {label: 'Hospitals', value: '3'},
  ]);

  // get cat id
  const [id, setId] = React.useState('');
  const getId = id => {
    console.log('onedit', id);
    setId(id);
  };

  // get cat data
  const getData = name => {
    console.log(name);
    setCatName(name);
  };

  // All Api calls of categories
  // Get categories
  React.useEffect(() => {
    fetch('http://192.168.1.99:8000/api/project-category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCategories(data);
      })
      .catch(error => console.log(error.message));
  }, []);

  // post categories
  const OnSubmit = () => {
    const data = {
      category_name: catName,
    };

    fetch('http://192.168.1.99:8000/api/project-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Edit categories
  const OnEdit = () => {
    const editData = {
      category_name: catName,
    };
    fetch('http://192.168.1.99:8000/api/project-category/' + `${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    });
  };

  // Delete categories
  const OnDelete = id => {
    fetch('http://192.168.1.99:8000/api/project-category' + `/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('cat delete');
  };

  // All api of types
  // get id
  const [typeid, setTypeId] = React.useState('');
  const gettypeId = id => {
    console.log('type', id);
    setTypeId(id);
  };

  // get type data
  const getTypeData = (cat_id, name) => {
    console.log(name);
    setValue(cat_id);
    setTypeName(name);
  };

  // Api call for types
  React.useEffect(() => {
    fetch('http://192.168.1.99:8000/api/project-type', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTypes(data);
      })
      .catch(error => console.log(error.message));
  }, []);

  // post types
  const OnSubmittypes = () => {
    const data = {
      category_id: value,
      project_type: typeName,
    };

    fetch('http://192.168.1.99:8000/api/project-type', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
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
    };
    fetch('http://192.168.1.99:8000/api/project-type/' + `${typeid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    });
  };

  // Delete types
  const OnDeleteTypes = id => {
    console.log('delete', id);
    fetch('http://192.168.1.99:8000/api/project-type/' + `${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('type delete');
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
              <Image
                source={icons.edit}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: COLORS.lightblue_800,
                  right: 10,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => OnDelete(item._id)}>
              <Image
                source={icons.delete_icon}
                style={{height: 15, width: 15, tintColor: COLORS.red}}
              />
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
              <Image
                source={icons.edit}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: COLORS.lightblue_800,
                  right: 10,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => OnDeleteTypes(item._id)}>
              <Image
                source={icons.delete_icon}
                style={{height: 15, width: 15, tintColor: COLORS.red}}
              />
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
        <TouchableWithoutFeedback onPress={() => setShowCategoryModal(false)}>
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
        <TouchableWithoutFeedback onPress={() => setShowTypesModal(false)}>
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
                  <Drop
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

export default ProjectCategory;

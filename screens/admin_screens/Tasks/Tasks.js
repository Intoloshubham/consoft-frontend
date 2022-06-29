import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {
  SIZES,
  FONTS,
  COLORS,
  icons,
  images,
  dummyData,
} from '../../../constants';
import {Drop, TextButton, IconButton} from '../../../Components';


const Tasks = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [menuList, setMenuList] = React.useState([]);

  React.useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  function handleChangeCategory(categoryId, menuTypeId) {
    //find the menu based on the menutypeid
    let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId);

    //setmenu based on the categoryid
    setMenuList(
      selectedMenu?.list.filter(a => a.categories.includes(categoryId)),
    );
  }

  

  function renderMenutype() {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 10, marginBottom: 20}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight:
                  index == dummyData.menu.length - 1 ? SIZES.padding : 0,
              }}
              onPress={() => {
                setSelectedMenuType(item.id);
                handleChangeCategory(selectedCategoryId, item.id);
              }}>
              <Text
                style={{
                  color:
                    selectedMenuType == item.id
                      ? COLORS.lightblue_900
                      : COLORS.black,
                  ...FONTS.h3,
                  fontWeight: selectedMenuType == item.id ? 'bold' : null,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  return (
    <FlatList
      data={menuList}
      keyExtractor={item => `${item.id}`}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={({item, index}) => {
        return (
          <View>
            <Text
              style={{
                ...FONTS.h2,
                marginHorizontal: SIZES.padding,
                marginTop: SIZES.padding,
              }}>
              Report
            </Text>
            {renderMenutype()}
          </View>
        );
      }}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              marginHorizontal: SIZES.padding,
              marginBottom: SIZES.base,

              // flexDirection: 'row',
              // alignItems: 'center',
            }}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        );
      }}
    />
  );
};
export default Tasks;

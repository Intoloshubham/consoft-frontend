import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {SIZES, reportdata, FONTS, images, icons} from '../../../constants';

const ReportDisplay = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [selectedMenuType, setSeletedMenuType] = React.useState(1);
  const [menuList, setMenuList] = React.useState([]);
  // console.log(menuList);

  React.useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  function handleChangeCategory(categoryId, menuTypeId) {
    let selectedMenu = reportdata.menu.find(a => a.id == menuTypeId);
    setMenuList(
      selectedMenu?.list.filter(a => a.categories.includes(categoryId)),
    );
  }
  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
      }}>
      <FlatList
        data={menuList}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ReportDisplay;

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LogBox,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SIZES, COLORS, FONTS, icons, images} from '../../../constants';
import Collapsible from 'react-native-collapsible';

const Account = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });

  const AccountList = [
    {id: 1, name: 'Users', img: icons.profile},
    {id: 2, name: 'Stocks', img: icons.account},
    {id: 3, name: 'Contractors', img: icons.dashboard},
    {id: 4, name: 'FAQ', img: icons.report},
  ];

  const list = [
    {id: 1, name: 'See Users'},
    {id: 2, name: 'Update Users Details'},
    {id: 3, name: 'Delete Users'},
  ];

  const [collapsed, setCollapsed] = React.useState(true);
  const [accList, setAccList] = React.useState(AccountList);
  const [collList, setCollList] = React.useState(list);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  function renderUser() {
    return (
      <TouchableOpacity
        style={{
          marginTop: SIZES.padding,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            backgroundColor: COLORS.lightblue_700,
            borderRadius: SIZES.radius,
            ...styles.shadow,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: COLORS.success_300,
                ...FONTS.h2,
                fontWeight: 'bold',
              }}>
              Consoft App
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body4,
                marginTop: 2,
              }}>
              consoft99@gmail.com
            </Text>
          </View>
          <Image
            source={images.Profile7}
            resizeMode="contain"
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function renderLists() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: SIZES.base,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
          }}>
          {item.name}
        </Text>
        <Image
          source={icons.right_arr}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          marginVertical: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightblue_800,
          paddingHorizontal: SIZES.padding,
        }}>
        <FlatList
          contentContainerStyle={{marginVertical: SIZES.base}}
          scrollEnabled={false}
          data={collList}
          keyExtracto={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.lightGray1,
                }}></View>
            );
          }}
        />
      </View>
    );
  }

  function renderAccountCompList() {
    const renderItem = ({item}) => (
      <>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.radius,
          }}
          onPress={toggleExpanded}>
          <Image
            source={item.img}
            style={{width: 20, height: 20, tintColor: COLORS.success_300}}
          />
          <View style={{flex: 1, marginLeft: SIZES.radius}}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
            }}>
            <Image
              source={icons.down_arrow}
              style={{height: 18, width: 18, tintColor: COLORS.white}}
            />
          </View>
        </TouchableOpacity>
        <View>
          <Collapsible collapsed={collapsed}>{renderLists()}</Collapsible>
        </View>
      </>
    );
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        <FlatList
          contentContainerStyle={{marginVertical: SIZES.padding}}
          scrollEnabled={false}
          data={accList}
          keyExtracto={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: COLORS.lightGray1,
                }}></View>
            );
          }}
        />
      </View>
    );
  }
  return (
    <ScrollView style={{backgroundColor: COLORS.lightblue_900}}>
      <View
        style={{
          flex: 1,
        }}>
        {renderUser()}
        {renderAccountCompList()}
      </View>
    </ScrollView>
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
export default Account;

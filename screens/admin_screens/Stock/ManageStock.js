import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {HeaderBar} from '../../../Components';
import {FONTS, SIZES, COLORS, icons, images} from '../../../constants';

const ManageStock = () => {
  const stock = [
    {id: 1, item_name: 'plaster', qty: 1000},
    {id: 2, item_name: 'bricks', qty: 400},
    {id: 3, item_name: 'cement', qty: 300},
  ];
  const [data, setData] = React.useState(stock);

  const renderStock = () => {
    const renderItem = ({item, index}) => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h4,
            flex: 0.5,
            color: COLORS.darkGray,
            textAlign: 'left',
          }}>
          {index + 1}.
        </Text>
        <Text
          style={{
            flex: 2.5,
            ...FONTS.h3,
            color: COLORS.darkGray,
            textAlign: 'left',
            textTransform: 'capitalize',
          }}>
          {item.item_name}
        </Text>

        <Text
          style={{
            ...FONTS.h3,
            flex: 1,
            color: COLORS.darkGray,
            textAlign: 'left',
          }}>
          {item.qty}
        </Text>
      </View>
    );

    return (
      <FlatList
        contentContainerStyle={{marginHorizontal: SIZES.radius}}
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.lightGray1,
                marginVertical: 15,
              }}></View>
          );
        }}
        ListHeaderComponent={
          <View style={{marginBottom: 3}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  flex: 0.5,
                  color: COLORS.darkGray,
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}>
                Sn.
              </Text>
              <Text
                style={{
                  flex: 2.5,
                  ...FONTS.h3,
                  color: COLORS.darkGray,
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}>
                Item name
              </Text>

              <Text
                style={{
                  ...FONTS.h3,
                  flex: 1,
                  color: COLORS.darkGray,
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}>
                Qty
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLORS.darkGray,
                marginVertical: 5,
              }}></View>
          </View>
        }
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <HeaderBar title="Manage Stock" />
      {renderStock()}
    </View>
  );
};

export default ManageStock;

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {FONTS, SIZES, COLORS, images, icons} from '../../../constants';

const Vouchers = () => {
  
  const vouchers = [
    {
      id: 1,
      request_type: 'purchase request',
      requests: [
        {id: 1, request: 'we need 2000 brick'},
        {id: 2, request: 'we need 600 brick'},
        {id: 3, request: 'we need 700 brick'},
      ],
    },
    {
      id: 2,
      request_type: 'received request',
      requests: [{id: 1, request: 'we need 1000 brick'}],
    },
    {
      id: 3,
      request_type: 'purchase return request',
      requests: [{id: 1, request: 'we need 500 brick'}],
    },
    {
      id: 4,
      request_type: 'received return request',
      requests: [{id: 1, request: 'we need 7800 brick'}],
    },
  ];

  const [data, setData] = React.useState(vouchers);

  console.log(data);

  function renderVouchers() {
    const renderItem = ({item, index}) => (
      <View style={{}}>
        <Text
          style={{
            fontSize: 18,
            color: COLORS.darkGray,
            textTransform: 'capitalize',
            fontWeight: '400',
          }}>
          {item.request_type}
        </Text>
        <View style={{marginTop: 5}}>
          {item.requests.map((ele, i) => {
            return (
              <View>
                
              </View>
            );
          })}
        </View>
      </View>
    );

    return (
      <FlatList
        contentContainerStyle={{
          margin: SIZES.padding,
        }}
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
                backgroundColor: COLORS.black,
                marginVertical: 10,
              }}></View>
          );
        }}
        // ListHeaderComponent={
        //   <View style={{marginBottom: 3}}>
        //     <View
        //       style={{
        //         flexDirection: 'row',
        //       }}>
        //       <Text
        //         style={{
        //           ...FONTS.h3,
        //           flex: 0.4,
        //           color: COLORS.darkGray,
        //           textAlign: 'left',
        //           fontWeight: 'bold',
        //         }}>
        //         Sn.
        //       </Text>
        //       <Text
        //         style={{
        //           flex: 1.8,
        //           ...FONTS.h3,
        //           color: COLORS.darkGray,
        //           textAlign: 'left',
        //           fontWeight: 'bold',
        //         }}>
        //         Name
        //       </Text>

        //       <Text
        //         style={{
        //           ...FONTS.h3,
        //           flex: 0.8,
        //           color: COLORS.darkGray,
        //           textAlign: 'left',
        //           fontWeight: 'bold',
        //         }}>
        //         Unit
        //       </Text>
        //       <Text
        //         style={{
        //           ...FONTS.h3,
        //           flex: 1,
        //           color: COLORS.darkGray,
        //           textAlign: 'right',
        //           fontWeight: 'bold',
        //         }}>
        //         Edit/Delete
        //       </Text>
        //     </View>
        //     <View
        //       style={{
        //         width: '100%',
        //         height: 0.6,
        //         backgroundColor: COLORS.lightGray1,
        //         marginVertical: 5,
        //       }}></View>
        //   </View>
        // }
      />
    );
  }

  return <View style={{flex: 1}}>{renderVouchers()}</View>;
};

export default Vouchers;

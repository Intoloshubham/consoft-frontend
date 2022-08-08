import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {COLORS, FONTS, icons} from '../../../constants';

const VerifyWorks = ({VerifyData}) => {
  const verify = [VerifyData];
  const renderItem = ({item}) => (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.darkGray,
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}>
            {item.user_name}
          </Text>
          <Text
            style={{
              fontSize: 9,
              left: 3,
              paddingHorizontal: 3,
              backgroundColor: COLORS.green,
              color: COLORS.white,
              borderRadius: 2,
            }}>
            {item.work_code}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              right: 10,
            }}>
            <Image
              source={icons.date}
              style={{
                height: 10,
                width: 10,
                tintColor: COLORS.darkGray,
                right: 3,
              }}
            />
            <Text
              style={{
                fontSize: 10,
                color: COLORS.darkGray,
              }}>
              {item.verify_date}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={icons.time}
              style={{
                height: 10,
                width: 10,
                tintColor: COLORS.darkGray,
                right: 3,
              }}
            />
            <Text
              style={{
                fontSize: 10,
                color: COLORS.darkGray,
              }}>
              {item.verify_time}
            </Text>
          </View>
        </View>
      </View>
      <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
        <Text style={{...FONTS.h4, color: COLORS.black}}>Work{' - '}</Text>
        {item.work}
      </Text>
      <Text style={{...FONTS.h4, color: COLORS.darkGray}}>
        <Text style={{...FONTS.h4, color: COLORS.black}}>Msg{' - '}</Text>
        {item.submit_work_text}
      </Text>
    </View>
  );

  return (
    <View style={{marginTop: 5, padding: 10}}>
      <FlatList
        data={verify}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLORS.gray,
                marginVertical: 10,
              }}></View>
          );
        }}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default VerifyWorks;

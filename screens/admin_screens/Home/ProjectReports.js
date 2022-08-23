import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../../../constants';

const ProjectReports = () => {
  const filtertypes = [
    {id: 1, name: 'Cost & Timeline', filtertype: 1},
    {id: 2, name: 'Stock & Manpower', filtertype: 2},
    {id: 3, name: 'Quality & Safety', filtertype: 3},
    {id: 4, name: 'Technical', filtertype: 4},
  ];

  const [reportFilterModal, setReportFilterModal] = React.useState(false);
  const [filter, setFilter] = React.useState(filtertypes);

  const repData = [];
  const filterDataHandler = (id, i) => {
    let filt = repData?.filter(a => a.category_id == id);
    setNewData(filt);
    setReportFilterModal(false);

    const Heading1 =
      i == 0
        ? 'Cost'
        : i == 1
        ? 'Stock'
        : i == 2
        ? 'Quality'
        : i == 3
        ? 'Technical'
        : null;
    setHeading1(Heading1);

    const Heading2 =
      i == 0
        ? 'Timeline'
        : i == 1
        ? 'Manpower'
        : i == 2
        ? 'Safety'
        : i == undefined
        ? 'Timline'
        : null;
    setHeading2(Heading2);
  };

  const [nullIndex, setNullIndex] = React.useState('');
  const [heading1, setHeading1] = React.useState('');
  const [heading2, setHeading2] = React.useState('');
  const [newData, setNewData] = React.useState(repData);

  function renderReportData() {
    const renderItem = ({item}) => {
      return (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1.5,
              ...FONTS.h4,
              color: COLORS.black,
              textTransform: 'capitalize',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.black,
              flex: 0.5,
              textAlign: 'right',
            }}>
            {item.cost}
          </Text>

          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.black,
              flex: 1,
              textAlign: 'right',
            }}>
            {item.startdate}
          </Text>
        </View>
      );
    };

    return (
      <FlatList
        contentContainerStyle={{}}
        data={newData}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        maxHeight={250}
        nestedScrollEnabled={true}
        ListHeaderComponent={
          <></>
          // <View
          //   style={{
          //     flexDirection: 'row',
          //     marginBottom: SIZES.base,
          //   }}>
          //   <Text
          //     style={{
          //       flex: 1,
          //       ...FONTS.h3,
          //       color: COLORS.darkGray,
          //       fontWeight: 'bold',
          //     }}>
          //     Projects
          //   </Text>

          //   <Text
          //     style={{
          //       ...FONTS.h3,
          //       flex: 1,
          //       color: COLORS.darkGray,
          //       textAlign: 'right',
          //       fontWeight: 'bold',
          //     }}>
          //     {nullIndex == '' ? 'Cost' : heading1}
          //     {/* {heading1} */}
          //   </Text>
          //   <Text
          //     style={{
          //       ...FONTS.h3,
          //       flex: 1,
          //       color: COLORS.darkGray,
          //       textAlign: 'right',
          //       fontWeight: 'bold',
          //     }}>
          //     {nullIndex == '' ? 'Timeline' : heading2}
          //     {/* {heading2} */}
          //   </Text>
          // </View>
        }
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.gray3,
                marginVertical: SIZES.base,
              }}></View>
          );
        }}
      />
    );
  }

  function renderFilterModal() {
    const renderItem = ({item, index}) => {
      setNullIndex(index);
      return (
        <TouchableOpacity
          onPress={() => filterDataHandler(item.filtertype, index)}
          style={{flexDirection: 'row'}}>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
            {index + 1}.
          </Text>
          <Text style={{...FONTS.h3, color: COLORS.darkGray, left: 8}}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportFilterModal}>
        <TouchableWithoutFeedback onPress={() => setReportFilterModal(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.transparentBlack5,
            }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                width: '60%',
                // height: '50%',
                borderRadius: 5,
              }}>
              <FlatList
                contentContainerStyle={{padding: 20}}
                data={filter}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        marginVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.darkGray2,
                      }}></View>
                  );
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.padding,
        marginTop: SIZES.padding,
        borderRadius: 5,
        padding: 20,
        ...styles.shadow,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.darkGray,
          }}>
          Project at a glance
        </Text>
        <TouchableOpacity onPress={() => setReportFilterModal(true)}>
          <Image
            source={icons.filter}
            resizeMode="contain"
            style={{height: 15, width: 15, tintColor: COLORS.darkGray}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.gray2,
          marginVertical: SIZES.base,
        }}></View>
      {renderFilterModal()}
      {renderReportData()}
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
export default ProjectReports;

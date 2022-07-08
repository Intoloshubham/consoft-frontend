import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../../../constants';
import {VictoryPie} from 'victory-native';

const SubmittedWorks = () => {
  // dummy data
  const confirmStatus = 'C';
  const pendingStatus = 'P';

  let categoriesData = [
    {
      id: 1,
      name: 'Education',
      icon: icons.education,
      color: COLORS.yellow_500,
      expenses: [
        {
          id: 1,
          title: 'Tuition Fee',
          description: 'Tuition fee',
          location: "ByProgrammers' tuition center",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 2,
          title: 'Arduino',
          description: 'Hardward',
          location: "ByProgrammers' tuition center",
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 3,
          title: 'Javascript Books',
          description: 'Javascript books',
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
        {
          id: 4,
          title: 'PHP Books',
          description: 'PHP books',
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 2,
      name: 'Nutrition',
      icon: icons.food,
      color: COLORS.lightblue_400,
      expenses: [
        {
          id: 5,
          title: 'Vitamins',
          description: 'Vitamin',
          location: "ByProgrammers' Pharmacy",
          total: 25.0,
          status: pendingStatus,
        },

        {
          id: 6,
          title: 'Protein powder',
          description: 'Protein',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 3,
      name: 'Child',
      icon: icons.baby_car,
      color: COLORS.green,
      expenses: [
        {
          id: 7,
          title: 'Toys',
          description: 'toys',
          location: "ByProgrammers' Toy Store",
          total: 25.0,
          status: confirmStatus,
        },
        {
          id: 8,
          title: 'Baby Car Seat',
          description: 'Baby Car Seat',
          location: "ByProgrammers' Baby Care Store",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 9,
          title: 'Pampers',
          description: 'Pampers',
          location: "ByProgrammers' Supermarket",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 10,
          title: 'Baby T-Shirt',
          description: 'T-Shirt',
          location: "ByProgrammers' Fashion Store",
          total: 20.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 4,
      name: 'Beauty & Care',
      icon: icons.healthcare,
      color: COLORS.rose_600,
      expenses: [
        {
          id: 11,
          title: 'Skin Care product',
          description: 'skin care',
          location: "ByProgrammers' Pharmacy",
          total: 10.0,
          status: pendingStatus,
        },
        {
          id: 12,
          title: 'Lotion',
          description: 'Lotion',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
        {
          id: 13,
          title: 'Face Mask',
          description: 'Face Mask',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
        {
          id: 14,
          title: 'Sunscreen cream',
          description: 'Sunscreen cream',
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 5,
      name: 'Sports',
      icon: icons.sports_icon,
      color: COLORS.gray,
      expenses: [
        {
          id: 15,
          title: 'Gym Membership',
          description: 'Monthly Fee',
          location: "ByProgrammers' Gym",
          total: 45.0,
          status: pendingStatus,
        },
        {
          id: 16,
          title: 'Gloves',
          description: 'Gym Equipment',
          location: "ByProgrammers' Gym",
          total: 15.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 6,
      name: 'Clothing',
      icon: icons.cloth_icon,
      color: COLORS.red,
      expenses: [
        {
          id: 17,
          title: 'T-Shirt',
          description: 'Plain Color T-Shirt',
          location: "ByProgrammers' Mall",
          total: 20.0,
          status: pendingStatus,
        },
        {
          id: 18,
          title: 'Jeans',
          description: 'Blue Jeans',
          location: "ByProgrammers' Mall",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
  ];
  const submitWorkData = [
    {
      id: 1,
      username: 'Rohit namdeo',
      work: 'Consoft Application',
      msg: 'We are reach 70%',
    },
    {
      id: 2,
      username: 'Shubham Sahu',
      work: 'Water Tank Alarm',
      msg: '90% work done',
    },
  ];

  const [categories, setCategories] = React.useState(categoriesData);
  function processCategoryDataToDisplay() {
    let chartData = categories.map(item => {
      let confirmExpenses = item.expenses.filter(a => a.status == 'C');
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);
      return {
        name: item.name,
        y: total,
        expensesCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    let filterChartData = chartData.filter(a => a.y > 0);
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);
    let finalChartData = filterChartData.map(item => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expensesCount: item.expensesCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });
    return finalChartData;
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    let colorScales = chartData.map(item => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expensesCount || 0),
      0,
    );
    return (
      <View>
        <VictoryPie
          data={chartData}
          colorScale={colorScales}
          labels={datum => `${datum.y}`}
          radius={SIZES.width * 0.4 - 10}
          innerRadius={60}
          labelRadius={({innerRadius}) =>
            (SIZES.width * 0.4 + innerRadius) / 2.5
          }
          style={{
            labels: {fill: COLORS.white, ...FONTS.body3},
          }}
          width={SIZES.width * 0.8}
          height={SIZES.height * 0.8}
        />
        <View style={{position: 'absolute', top: '45%', left: '40%'}}>
          <Text style={{...FONTS.h1, textAlign: 'center'}}>
            {totalExpenseCount}
          </Text>
          <Text style={{...FONTS.body3, textAlign: 'center'}}>Expenses</Text>
        </View>
      </View>
    );
  }

  function renderExpenseSummary() {
    let data = processCategoryDataToDisplay();
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 40,
            paddingHorizontal: SIZES.radius,
            borderRadius: 10,
            marginTop: 5,
            backgroundColor: item.color,
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: item.color,
                borderRadius: 5,
              }}></View>
            <Text
              style={{
                marginLeft: SIZES.base,
                ...FONTS.h3,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              {item.name}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
                fontWeight: 'bold',
              }}>
              {item.y} USD - {item.label}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }

  const [submitWork, setSubmitWork] = React.useState(submitWorkData);

  const [pValue, setPValue] = React.useState(20);

  function renderSubmitWork() {
    const renderItem = ({item}) => {
      return (
        <View style={{}}>
          {/* username */}

          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.black,
              textTransform: 'capitalize',
            }}>
            {item.username}
          </Text>

          {/* works lists  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* <Text style={{...FONTS.h4, flex: 1, color: COLORS.darkGray}}>
              Work - {item.work}
            </Text> */}
            <Text
              style={{
                ...FONTS.h4,
                flex: 1.4,
                color: COLORS.black,
                textAlign: 'auto',
              }}>
              Work<Text style={{color: COLORS.darkGray}}> - {item.work}</Text>
            </Text>
            <View style={{flex: 0.6}}>
             
            </View>
            <TouchableOpacity
              onPress={() => console.log('Verification Successfully...')}
              style={{alignItems: 'flex-end'}}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.lightblue_200,
                  padding: 5,
                  borderRadius: SIZES.padding,
                }}>
                <Image
                  source={icons.verify}
                  resizeMode="contain"
                  style={{
                    height: 10,
                    width: 10,
                    tintColor: COLORS.lightblue_900,
                  }}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>
          {/* message  */}
          <View
            style={{
              // marginTop: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{...FONTS.h4, color: COLORS.black}}>
              Message
              <Text style={{color: COLORS.darkGray}}> - {item.msg}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => console.log('You Have a Revert Message...')}>
              <ImageBackground
                style={{
                  backgroundColor: COLORS.warning_200,
                  padding: 5,
                  borderRadius: SIZES.padding,
                }}>
                <Image
                  source={icons.revert}
                  resizeMode="contain"
                  style={{
                    height: 10,
                    width: 10,
                    tintColor: COLORS.rose_600,
                  }}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        contentContainerStyle={{}}
        data={submitWork}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                borderBottomWidth: 0.3,
                borderColor: COLORS.gray,
                marginVertical: SIZES.radius,
              }}></View>
          );
        }}
      />
    );
  }
  return (
    <View
      style={{
        ...styles.shadow,
        backgroundColor: COLORS.lightblue_50,
        marginHorizontal: SIZES.padding,
        marginTop: SIZES.padding,
        borderRadius: SIZES.radius,
        padding: 20,
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
          Submitted Works
        </Text>
        {/* <TouchableOpacity onPress={() => console.log('fdjhg')}>
          <Image
            source={icons.filter}
            resizeMode="contain"
            style={{height: 18, width: 18, tintColor: COLORS.darkGray}}
          />
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.gray2,
          marginVertical: SIZES.base,
        }}></View>
      {renderSubmitWork()}
      {/* {renderChart()} */}
      {/* {renderExpenseSummary()} */}
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
export default SubmittedWorks;

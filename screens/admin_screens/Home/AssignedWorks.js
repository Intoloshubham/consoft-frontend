import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  ScrollView,
  UIManager,
  Image,
} from 'react-native';
import {COLORS, FONTS, SIZES, Apis, icons} from '../../../constants';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const AssignedWorks = () => {
  const [active, setActive] = React.useState(null);
  const [innerActive, setInnerActive] = React.useState(null);

  const dummtdata = [1, 2, 3, 4, 5];
  const dummtdata1 = [1, 2, 3, 4];
  const dummtdata2 = [1, 2, 3, 4, 5];

  const RenderData = ({
    index,
    active,
    setActive,
    i,
    innerActive,
    setInnerActive,
  }) => {
    const onPress = () => {
      LayoutAnimation.easeInEaseOut();
      setActive(index === active ? null : index);
    };
    const onPress1 = () => {
      LayoutAnimation.easeInEaseOut();
      setInnerActive(i === innerActive ? null : i);
    };
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.black,
            }}>
            {index + 1} - Header
          </Text>
          <Image
            source={active === index ? icons.up_arrow : icons.down1}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.black,
            }}
          />
        </View>
        <View
          style={{
            marginVertical: 5,
          }}>
          {active == index &&
            dummtdata.map(x => {
              return (
                <View
                  style={{
                    marginLeft: SIZES.padding,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={onPress1} activeOpacity={1}>
                    {/* <Text style={{...FONTS.h3}} key={x}>
                      -Data
                    </Text> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          ...FONTS.h3,
                          color: COLORS.black,
                        }}>
                        {i + 1} - Data
                      </Text>
                      <Image
                        source={active === index ? icons.up_arrow : icons.down1}
                        style={{
                          height: 15,
                          width: 15,
                          tintColor: COLORS.black,
                        }}
                      />
                    </View>
                    {innerActive == i &&
                      dummtdata2.map(x => {
                        return (
                          <View>
                            <Text></Text>
                          </View>
                        );
                      })}
                  </TouchableOpacity>
                  <Image
                    source={icons.up_arrow}
                    style={{
                      height: 15,
                      width: 15,
                      tintColor: COLORS.red,
                    }}
                  />
                </View>
              );
            })}
        </View>
      </TouchableOpacity>
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
      <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Assign Works</Text>
      <ScrollView style={{marginTop: SIZES.radius}}>
        {dummtdata1.map((x, i) => {
          return (
            <View>
              <RenderData
                key={x}
                index={i}
                active={active}
                setActive={setActive}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

// const AssignedWorks = () => {
//   const [active, setActive] = React.useState(null);

//   const Xxample = ({i, active, setActive}) => {
//     const onPress = () => {
//       LayoutAnimation.easeInEaseOut();
//       setActive(i === active ? null : i);
//     };
//     const open = (active = i);

//     return (
//       <TouchableOpacity onPress={onPress} activeOpacity={1}>
//         <View>
//           <Text>Header -{i + 1}</Text>
//           <Text>{open ? 'close' : 'open'}</Text>
//           {open &&
//             [1, 2, 3, 4].map(x => {
//               return <Text key={x}> - data</Text>;
//             })}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View
//       style={{
//         marginTop: SIZES.padding,
//         marginHorizontal: SIZES.padding,
//         padding: 20,
//         borderRadius: SIZES.radius,
//         backgroundColor: COLORS.lightblue_50,
//         ...styles.shadow,
//       }}>
//       <Text style={{...FONTS.h2, color: COLORS.darkGray}}>Assign Works</Text>
//       <ScrollView>
//         {[1, 2, 3, 4, 5].map((x, i) => {
//           <Xxample key={x} />;
//         })}
//       </ScrollView>
//     </View>
//   );
// };

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

export default AssignedWorks;

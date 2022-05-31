import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  ImageBackground,
  FlatList,
} from 'react-native';
import {FONTS, COLORS, SIZES, icons, images, constants} from '../../constants';
import {TextButton} from '../../Components';

const OnBoarding = ({navigation}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onViewChangeRef = React.useRef(({viewableItems, changed}) => {
    setCurrentIndex(viewableItems[0].index);
  });

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {constants.onboarding_screens.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              COLORS.lightOrange,
              COLORS.primary,
              COLORS.lightOrange,
            ],
            extrapolate: 'clamp',
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: dotWidth,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  function renderHeaderLogo() {
    return (
      <View
        style={{
          position: 'absolute',
          top: SIZES.height > 800 ? 50 : 25,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.cons_logo}
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.5,
            height: 100,
          }}
        />
        <Text
          style={{
            ...FONTS.body3,
          }}>
          Powered by Intolo
        </Text>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          height: 160,
        }}>
        {/* Pagination  */}

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Dots />
        </View>
        {/* buttons  */}
        {currentIndex < constants.onboarding_screens.length - 1 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}>
            <TextButton
              label="Skip"
              buttonContainerStyle={{backgroundColor: null}}
              labelStyle={{
                color: COLORS.darkGray2,
              }}
              onPress={() => navigation.replace('SignIn')}
            />
            <TextButton
              label="Next"
              buttonContainerStyle={{
                height: 45,
                width: 120,
                borderRadius: SIZES.radius,
              }}
              onPress={() => {
                flatListRef?.current?.scrollToIndex({
                  index: currentIndex + 1,
                  animated: true,
                });
              }}
            />
          </View>
        )}
        {currentIndex == constants.onboarding_screens.length - 1 && (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}>
            <TextButton
              label="Let's Get Started"
              buttonContainerStyle={{
                height: 45,
                borderRadius: SIZES.radius,
              }}
              onPress={() => navigation.replace('SignIn')}
            />
          </View>
        )}
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={constants.onboarding_screens}
        scrollEventThrottle={15}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onViewableItemsChanged={onViewChangeRef.current}
        keyExtractor={item => `${item.id}`}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: SIZES.width,
              }}>
              {/* Header  */}
              <View
                style={{
                  flex: 3,
                }}>
                <ImageBackground
                  source={item.backgroundImage}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: index == 1 ? '92%' : '100%',
                    width: '100%',
                  }}>
                  <Image
                    source={item.bannerImage}
                    resizeMode="contain"
                    style={{
                      width: SIZES.width * 0.7,
                      height: SIZES.width * 0.7,
                      marginBottom: -SIZES.padding,
                    }}
                  />
                </ImageBackground>
              </View>
              {/* Details  */}
              <View
                style={{
                  flex: 1,
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: SIZES.radius,
                }}>
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.darkGray,
                    // fontWeight: 'bold',
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    marginTop: SIZES.radius,
                    textAlign: 'center',
                    color: COLORS.darkGray2,
                    paddingHorizontal: SIZES.padding,
                    ...FONTS.body4,
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {renderHeaderLogo()}
      {renderFooter()}
    </View>
  );
};

export default OnBoarding;

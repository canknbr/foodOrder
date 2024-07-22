import {
  Image,
  ListRenderItem,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { restaurant } from '@/assets/data/restaurant';
import { Link, Stack, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useBasketStore from '@/store/basketStore';
import { SafeAreaView } from 'react-native-safe-area-context';
const DetailsPage = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const opacity = useSharedValue(0);
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<TouchableOpacity[]>([]);
  const { items, total } = useBasketStore();
  const animatedOpacityStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.roundedButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.roundedButton}
          >
            <Ionicons name="share-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.roundedButton}
          >
            <Ionicons name="search-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  const handleSelectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    selected.measure((x, y, width, height, pageX, pageY) => {
      scrollRef.current?.scrollTo({ x: x - 16, y, animated: true });
    });
    setActiveIndex(index);
  };
  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 250) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };
  const sectionData = restaurant.food.map((item, index) => {
    return {
      title: item.category,
      data: item.meals,
      index,
    };
  });
  const renderItem: ListRenderItem<any> = ({ item, index }) => {
    return (
      <Link
        href={{ pathname: '/(modal)/dish', params: { id: item.id } }}
        asChild
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 16,
            marginVertical: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.dish}>{item.name}</Text>
            <Text style={styles.dishInfo}>{item.info}</Text>
            <Text>₺{item.price}.00 </Text>
          </View>
          <Image source={item.img} style={styles.itemImage} />
        </TouchableOpacity>
      </Link>
    );
  };
  return (
    <>
      <ParallaxScrollView
        scrollEvent={onScroll}
        style={{ flex: 1 }}
        backgroundColor={'#fff'}
        parallaxHeaderHeight={250}
        contentBackgroundColor={Colors.lightGrey}
        stickyHeaderHeight={120}
        renderBackground={() => (
          <Image
            source={restaurant.img}
            style={{ height: 300, width: '100%' }}
          />
        )}
        renderStickyHeader={() => (
          <View key={'sticky-header'} style={styles.stickyHeader}>
            <Text style={styles.stickyHeaderText}>{restaurant.name}</Text>
          </View>
        )}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.delivery}{' '}
            {restaurant.tags.map((item, index) => {
              return `${item}${index < restaurant.tags.length - 1 ? '·' : ''}`;
            })}
          </Text>
          <Text style={styles.restaurantDescription}>{restaurant.about}</Text>
          <SectionList
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => `${item.id + index}`}
            scrollEnabled={false}
            sections={sectionData}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title, index } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 2, backgroundColor: Colors.grey }}></View>
            )}
            // SectionSeparatorComponent={() => (
            //   <View
            //     style={{ height: 2, backgroundColor: Colors.grey }}
            //   ></View>
            // )}
          />
        </View>
      </ParallaxScrollView>
      <Animated.View style={[styles.stickySegments, animatedOpacityStyle]}>
        <View style={styles.stickySegmentsShadow}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.segmentScrollView}
          >
            {restaurant.food.map((item, index) => {
              return (
                <TouchableOpacity
                  ref={(ref) => (itemsRef.current[index] = ref!)}
                  onPress={() => handleSelectCategory(index)}
                  key={index}
                  style={
                    activeIndex === index
                      ? styles.activeSegmentButton
                      : styles.segmentsButton
                  }
                >
                  <Text
                    style={
                      activeIndex === index
                        ? styles.activeSegmentsText
                        : styles.segmentsText
                    }
                  >
                    {item.category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Animated.View>
      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'white' }}>
            <Link asChild href={'/(modal)/basket'}>
              <TouchableOpacity style={styles.fullButton}>
                <Text style={styles.basket}>{items}</Text>
                <Text style={styles.footerText}>Sepeti Gör</Text>
                <Text style={styles.basketTotal}>₺{total}</Text>
              </TouchableOpacity>
            </Link>
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
  },
  stickyHeader: {
    backgroundColor: 'white',
    height: 100,
    paddingTop: 58,
  },
  segmentScrollView: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 20,
    paddingBottom: 4,
  },
  stickySegments: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 50,
    top: 110,
    backgroundColor: Colors.lightGrey,
    paddingBottom: 4,
    overflow: 'hidden',
  },
  stickySegmentsShadow: {
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: '100%',
    width: '100%',

    elevation: 5,
  },
  segmentsButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  segmentsText: {
    color: Colors.primary,
    fontSize: 16,
  },
  activeSegmentButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activeSegmentsText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  roundedButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 50,
  },
  stickyHeaderText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  restaurantName: {
    fontSize: 30,
    margin: 16,
    color: Colors.primary,
  },
  restaurantDescription: {
    fontSize: 16,
    margin: 16,
    marginTop: 10,
    color: Colors.medium,
    lineHeight: 22,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    margin: 16,
    marginTop: 30,
    color: Colors.primary,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  dish: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dishInfo: {
    fontSize: 14,
    color: Colors.medium,
    marginBottom: 4,
  },
  footer: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    paddingTop: 20,
  },
  footerContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    height:50,
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  footerText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  basket: {
    color:'#fff',
    backgroundColor:'#e03131',
    fontWeight:'bold',
    padding:8,
    borderRadius:12
  },
  basketTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',

  },
});

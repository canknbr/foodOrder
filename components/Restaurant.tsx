import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { restaurants } from '@/assets/data/home';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

const Restaurant = ({ isShuffle }: { isShuffle?: boolean }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {isShuffle && restaurants
        .sort((a, b) => b.name.localeCompare(a.name))
        .map((restaurant, index) => (
          <Link href={'/details'} key={index} asChild>
            <TouchableOpacity>
              <View style={styles.categoryCard}>
                <Image source={restaurant.img} style={styles.image} />
                <View style={styles.categoryBox}>
                  <Text style={styles.categoryText}>{restaurant.name}</Text>
                  <Text style={{ color: 'green' }}>
                    {restaurant.rating} {restaurant.ratings}
                  </Text>
                  <Text style={{ color: Colors.medium }}>
                    {restaurant.distance}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      {!isShuffle &&
        restaurants
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((restaurant, index) => (
            <Link href={'/details'} key={index} asChild>
              <TouchableOpacity>
                <View style={styles.categoryCard}>
                  <Image source={restaurant.img} style={styles.image} />
                  <View style={styles.categoryBox}>
                    <Text style={styles.categoryText}>{restaurant.name}</Text>
                    <Text style={{ color: 'green' }}>
                      {restaurant.rating} {restaurant.ratings}
                    </Text>
                    <Text style={{ color: Colors.medium }}>
                      {restaurant.distance}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
    </ScrollView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    backgroundColor: '#fff',
    marginEnd: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 16,
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
    borderRadius: 16,
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
});

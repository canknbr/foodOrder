import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { categories } from '@/assets/data/home';
import Colors from '@/constants/Colors';

const Categories = () => {
  return (
    <FlatList
      contentContainerStyle={{
        gap: 20,
        marginHorizontal: 16,
      }}
      alwaysBounceHorizontal
      decelerationRate={'normal'}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={({ item }) => {
        return (
          <View style={styles.imageContainer}>
            <Image source={item.img} style={styles.image} />
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        );
      }}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 16,
    gap:10,
    backgroundColor:'#FFFFFF',

  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  itemText:{
    textAlign:'center',
    fontWeight:'600',
    fontSize:18,
    color:Colors.primary
  }
});

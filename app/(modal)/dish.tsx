import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { getDishById } from '@/assets/data/restaurant';
import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeIn,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import useBasketStore from '@/store/basketStore';
const DishModalScreen = () => {
  const [count, setCount] = useState<number>(0);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const item = getDishById(+id)!;
  const { addProduct, reduceProduct } = useBasketStore();
  const handleCount = (action: 'plus' | 'min') => {
    if (action === 'plus') {
      setCount((prev) => prev + 1);
    } else if (action === 'min' && count > 0) {
      setCount((prev) => prev - 1);
    }
  };
  const addToCart = () => {
    addProduct(item);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
        }}
      />
      <View style={styles.container}>
        <Animated.Image
          entering={FadeIn.duration(500).delay(400)}
          source={item?.img}
          style={styles.image}
        />
        <View style={{ padding: 20 }}>
          <Animated.Text
            entering={FadeInLeft.duration(500).delay(400)}
            style={styles.dishName}
          >
            {item?.name}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(500).delay(450)}
            style={styles.dishDescription}
          >
            {item?.info}
          </Animated.Text>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 30,
            }}
          >
            <TouchableOpacity onPress={() => handleCount('min')}>
              <AntDesign name="minuscircleo" size={28} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 24 }}>{count + 1}</Text>
            <TouchableOpacity onPress={() => handleCount('plus')}>
              <AntDesign name="pluscircleo" size={28} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={addToCart} style={styles.button}>
            <Text style={styles.buttonText}>Sepete Ekle ₺{item?.price}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default DishModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  image: {
    height: 300,
    width: '100%',
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
  },
  dishDescription: {
    color: Colors.mediumDark,
    lineHeight: 24,
    fontSize: 16,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 40,
    gap: 20,
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  button: {
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

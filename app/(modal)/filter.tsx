import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import categories from '@/assets/data/filter.json';
import { Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
type ICategory = {
  count: number;
  name: string;
  isChecked?: boolean;
};
const ItemBox = () => {
  return (
    <>
      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Sırala</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Puan</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Öneriler</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Besin Değerleri</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
        Kategoriler
      </Text>
    </>
  );
};
const FilterPage = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<ICategory[]>(categories);
  const [selected, setSelected] = useState<ICategory[]>([]);
  const flexWidth = useSharedValue(0);
  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.isChecked);
    const newSelected = selectedItems.length > 0;
    if (hasSelected != newSelected) {
      flexWidth.value = newSelected ? 100 : 0;
    }
    setSelected(selectedItems);
  }, [items]);
  const handleClearCheckItems = () => {
    setItems((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          isChecked: false,
        };
      });
    });
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
    };
  });
  const renderItem: ListRenderItem<ICategory> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        isChecked={items[index].isChecked}
        fillColor={Colors.primary}
        unFillColor="#fff"
        iconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
          borderWidth: 2,
        }}
        innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
        onPress={() => {
          // const updatedArray = items.map((item) => {
          //   if (item.name === items[index].name) {
          //     return {
          //       ...item,
          //       isChecked: !items[index].isChecked,
          //     };
          //   }
          //   return item;
          // });
          setItems((prev) => {
            return prev.map((item) => {
              if (item.name === prev[index].name) {
                return {
                  ...item,
                  isChecked: !prev[index].isChecked,
                };
              }
              return item;
            });
          });
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox />}
      />
      <View style={{ height: 80 }}></View>
      <View style={styles.footerContainer}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Onayla</Text>
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: Colors.primary,
              },
              animatedStyle,
            ]}
          >
            <TouchableOpacity onPress={handleClearCheckItems}>
              <Text style={[styles.buttonText, { color: '#000' }]}>
                Temizle
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default FilterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    padding: 24,
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,

    bottom: 0,
    height: 100,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 6,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  boxContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  itemText: {
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
});

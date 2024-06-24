import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import BottomSheet from './BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <Ionicons name='ios-search' size={20} color={Colors.medium}/>
          <TextInput placeholder="Hadi bir şeyler bulalım" style={{marginLeft:4}} />
        </View>
        <Link href={'/'} asChild>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="options-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};
const CustomHeader = () => {
  const bottomRef = useRef<BottomSheetModal>(null)
  const openModal = () => {
    bottomRef.current?.present()
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <BottomSheet ref={bottomRef}/>
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Image
            source={require('@/assets/images/bike.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
          <Text style={styles.title}>Evim</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={styles.subTitle}>Cankaya, Ankara</Text>
            <Ionicons
              name="chevron-down-outline"
              size={20}
              color={Colors.primary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButtonContainer}>
          <Ionicons name="person-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    gap: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  image: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.medium,
    marginBottom: 2,
  },
  profileButtonContainer: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchContainer: {
    height: 60,
    backgroundColor: '#fff',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  optionButton: {
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

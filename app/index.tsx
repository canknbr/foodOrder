import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Categories from '@/components/Categories';
import Restaurant from '@/components/Restaurant';

const Page = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <Categories />
        <Text style={styles.header}>Tercih Edilenler</Text>
        <Restaurant isShuffle={false} />
        <Text style={styles.header}>Yakınlarda Seçebileceklerin</Text>
        <Restaurant isShuffle={true} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    top: 70,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});

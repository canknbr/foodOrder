import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const BottomSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const points = useMemo(() => ['50%'], []);
  const { dismiss } = useBottomSheetModal();
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  return (
    <BottomSheetModal
      backgroundStyle={{
        backgroundColor: Colors.lightGrey,
      }}
      overDragResistanceFactor={0}
      style={{ flex: 1 }}
      enablePanDownToClose
      ref={ref}
      backdropComponent={renderBackdrop}
      snapPoints={points}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.toggle}>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.activeText}>Teslimat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleInActive}>
            <Text style={styles.inactiveText}>Gel Al</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subHeader}>Konumunuz</Text>

        <Link asChild href={'/(modal)/location-search'}>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="location-outline" size={20} color={Colors.medium} />
            <Text style={{ flex: 1 }}>Ev</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </Link>

        <Text style={styles.subHeader}>Tahmini Teslimat</Text>
        <Link asChild href={'/'}>
          <TouchableOpacity style={styles.item}>
            <Ionicons
              name="stopwatch-outline"
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>12 dk</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          onPress={() => dismiss()}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Onayla</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',

    fontWeight: 'bold',
  },
  toggle: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  toggleInActive: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  inactiveText: {
    color: Colors.primary,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    margin: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
  },
});

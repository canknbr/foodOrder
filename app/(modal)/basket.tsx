import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import useBasketStore from '@/store/basketStore';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Link } from 'expo-router';
const BasketPage = () => {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);
  const fees = {
    service: 2.99,
    delivery: 5.99,
  };
  const startCheckout = () => {
    setOrder(true);
    clearCart();
  };
  return (
    <>
      {order && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fadeOut={true}
          fallSpeed={2500}
          autoStart={true}
        />
      )}
      {order && (
        <View style={{ marginTop: '50%', padding: 20, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: Colors.primary,
              textAlign: 'center',
            }}
          >
            Siparişiniz Oluşturuldu!
          </Text>
          <Link href={'/'} asChild>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.footerText}>Yeni Sipariş</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
      {!order && (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text style={styles.section}>Ürünler</Text>}
            ListFooterComponent={
              <View style={{ paddingVertical: 12 }}>
                <View style={styles.totalRow}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      color: Colors.medium,
                    }}
                  >
                    Ürünlerin Toplamı
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: Colors.primary,
                    }}
                  >
                    ₺{total}
                  </Text>
                </View>
                <View style={styles.totalRow}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      color: Colors.medium,
                    }}
                  >
                    Kurye Ücreti
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: Colors.primary,
                    }}
                  >
                    ₺{fees.delivery}
                  </Text>
                </View>
                <View style={styles.totalRow}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: Colors.medium,
                    }}
                  >
                    Toplam Ücret
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: Colors.primary,
                    }}
                  >
                    ₺{fees.delivery + total}
                  </Text>
                </View>
              </View>
            }
            data={products}
            renderItem={({ item }) => {
              return (
                <View style={styles.row}>
                  <Text style={{ color: Colors.primary, fontSize: 14 }}>
                    {item.quantity}x
                  </Text>
                  <Text style={{ flex: 1, fontSize: 16 }}>{item.name}</Text>
                  <Text style={{ fontSize: 16 }}>
                    ₺{item.price * item.quantity}
                  </Text>
                </View>
              );
            }}
          />
          <View style={styles.footer}>
            <SafeAreaView edges={['bottom']}>
              <TouchableOpacity
                style={styles.fullButton}
                onPress={startCheckout}
              >
                <Text style={styles.footerText}>Sipariş Ver</Text>
                <Text style={styles.footerTotal}>
                  {' '}
                  ₺{fees.delivery + total}
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </>
      )}
    </>
  );
};

export default BasketPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  fullButton: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    gap: 12,
  },
  footerText: {
    flex: 4,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  footerTotal: {
    flex: 1,
    backgroundColor: 'white',
    lineHeight: 50,

    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  orderButton: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    lineHeight: 60,
    alignSelf: 'center',
    shadowColor: Colors.primary,
    paddingVertical:18,
    marginTop:20
  },
});

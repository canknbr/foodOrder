import { Stack, useNavigation } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayoutNav() {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar hidden={true} />
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              header: () => <CustomHeader />,
            }}
          />
          <Stack.Screen
            name="(modal)/filter"
            options={{
              headerTitle: 'Filter',
              presentation: 'modal',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="close-outline"
                      size={24}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
          <Stack.Screen
            name="(modal)/location-search"
            options={{
              headerTitle: 'Haritadan Bul',
              presentation: 'fullScreenModal',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="close-outline"
                      size={24}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
          <Stack.Screen
            name="(modal)/dish"
            options={{
              presentation: 'modal',
              headerTransparent: true,
              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 8,
                      borderRadius: 40,
                      backgroundColor: Colors.lightGrey,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons
                      name="close-outline"
                      size={24}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
          <Stack.Screen
            name="(modal)/basket"
            options={{
              headerTitle: 'Sepetim',
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="arrow-back"
                      size={28}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </>
  );
}

import { Stack } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayoutNav() {
  return (
    <BottomSheetModalProvider>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomHeader />,
        }}
      />
    </Stack>
    </BottomSheetModalProvider>
  );
}

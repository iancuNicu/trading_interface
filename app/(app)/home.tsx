import { selectUser } from '@/store/authentication/auth.slice';
import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '../components/search';
import { ToastProvider } from '@tamagui/toast';


export default function IndexScreen() {
  const user = useSelector(selectUser)
    
  if(!user) {
    return <Redirect href={"/(auth)/login"} />
  }
  
  return (
    <ToastProvider>
        <SafeAreaView>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Search />
          </View>
      </SafeAreaView>
    </ToastProvider>
  );
}
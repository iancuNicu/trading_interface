import { Link, Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

export default function AuthLayout() {
    return (
        <Tabs 
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
            }}>
            <Tabs.Screen name="login" options={
                {
                    tabBarIcon: ({ color }) => (<Entypo name='login' color="black" size={20} />),
                    headerShown: false
                }
            }
            />
            <Tabs.Screen name="signup" options={
                {
                    headerShown: false,
                    tabBarIcon: ({ color }) => (<FontAwesome name='sign-in' color="black" size={20} />)
                }
            } />
        </Tabs>
    )
}
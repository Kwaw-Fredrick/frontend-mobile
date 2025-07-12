import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import COLORS from '../../constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function TabLayout() {
    const insets = useSafeAreaInsets();
  return (
   <Tabs screenOptions={{
    headerShown: false,
    tabBarActiveTintColor:COLORS.primary,
    headerTitleStyle: {
        fontWeight: "600",
        color: COLORS.textPrimary,
    },

    tabBarStyle:{
        backgroundColor: COLORS.cardBackground,
        borderTopColor: COLORS.border,
        borderTopWidth: 1,
        paddingBottom: insets.bottom, 
        paddingTop: 5,
        height: 60 + insets.bottom,
    }
   }}
   
   >
    <Tabs.Screen name='index' 
    options={{title: "Home",
        tabBarIcon: ({color, size}) =>(<Ionicons name="home-outline" color={color} size={size} />)
    }}
    />
    <Tabs.Screen name='create' options={{title: "Create",
        tabBarIcon: ({color, size}) => (<Ionicons name="add-circle-outline"  color={color} size={size}/>)
    }}/>
    <Tabs.Screen name='profile' options={{
        title: "Profile",
        tabBarIcon: ({size, color})=>(<Ionicons name="person-outline" size={size} color={color} />)
    }}/>
   </Tabs>
  )
}
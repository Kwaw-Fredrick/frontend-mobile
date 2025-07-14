import {Text, TouchableOpacity, Alert } from 'react-native'
import { useAuthStore } from '../store/authStore'
import styles from '../styles/profile.styles';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export default function LogoutButton() {
    const {logout} = useAuthStore();

    const confirmLogout= () =>{
        Alert.alert("Logout", "Are sure you want to logout?",[
            {text:"Cancel", style: "cancel"},
            {text: "Logout", style: "destructive", onPress:()=>logout()}
        ])
    }
  return (
    <TouchableOpacity onPress={confirmLogout} style={styles.logoutButton}>
        <Ionicons
        name='log-out--outlie'
        size={20}
        color={COLORS.white}
        />
        <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  )
}
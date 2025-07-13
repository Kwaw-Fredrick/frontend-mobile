import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import styles from "../../styles/login.styles";


export default function Home() {
  const {token} = useAuthStore();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1)
  const {hasMore, setHasMore} = useState(true);

  useEffect(()=>{
    
  })
  return (
    <View>
      
    </View>
  )
}
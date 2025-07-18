import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/home.styles";
import { API_URL } from "../../constants/api";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { formatPublishDate } from "../../lib/utils";
import Loader from "../../components/Loader";

const sleep = (ms) => new Promise((resolve)=>setTimeout(resolve, ms));

export default function Home() {
  const { token } = useAuthStore();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const { hasMore, setHasMore } = useState(true);

  const fectchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setRefreshing(true);

      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=3`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      //setBooks((prevBooks) =>[...prevBooks, ...data.books]);
      const uniqueBooks =
        refresh || pageNum === 1
          ? data.books
          : Array.from(
              new Set([...books, ...data.books].map((book) => book._id))
            ).map((id) =>
              [...books, ...data.books].find((book) => book._id === id)
            );

      setBooks(uniqueBooks);

      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching books", error);
    }finally{
      await sleep(800);
    if (refresh) {setRefreshing(false)
    }
    else setLoading(false);

    }
  };

  useEffect(() => {
    fectchBooks();
  });

  const handleLoadMore = async () => {
    if (hasMore && !refreshing && !loading) {
      await fectchBooks(page + 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profileImge }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>
      <View style={styles.bookImageContainer}>
        <Image
          source={item.Image}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          {RenderRatingStars(item.rating)}
          <Text style={styles.caption}>{item.caption}</Text>
          <Text style={styles.date}>
            Shared on {formatPublishDate(item.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );

  const RenderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  if(loading) return <Loader/>;
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fectchBooks(1, true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>BookWorm 🐛</Text>
            <Text style={styles.headerSubtitle}>
              Discover great reads from the community👇
            </Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator
              style={styles.footerLoader}
              size="small"
              color={COLORS.primary}
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="book-outline"
              size={60}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <Text style={styles.emptySubtext}>
              Be the first to share a book!
            </Text>
          </View>
        }
      />
    </View>
  );
}

// app/(tabs)/Home.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Share, TextInput } from 'react-native';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext'; // Import your useTheme hook

const Home = () => {
  const { theme } = useTheme(); // Get the current theme from context
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://rupeesh10148.pythonanywhere.com//api/news/')
      .then(response => {
        const sortedNews = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setNews(sortedNews);
        setFilteredNews(sortedNews); // Initially show all news
      })
      .catch(error => console.error(error));
  }, []);

  const addNewsItem = (newItem) => {
    const updatedNews = [newItem, ...news]; // Prepend the new item at the top
    setNews(updatedNews);
    setFilteredNews(updatedNews);
  };

  const handleShare = async (title, content) => {
    try {
      await Share.share({
        message: `Check out this news post: ${title}\n\n${content}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = news.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(filtered);
  };

  const renderNewsItem = ({ item }) => {
    return (
      <View style={[styles.card, theme === 'dark' && styles.darkCard]}>
        <Text style={[styles.cardTitle, theme === 'dark' && styles.darkCardTitle]}>{item.title}</Text>
        <Image source={{ uri: `https://rupeesh10148.pythonanywhere.com/${item.image}` }} style={styles.image} />
        <Text style={[styles.content, theme === 'dark' && styles.darkContent]}>{item.content}</Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => handleShare(item.title, item.content)}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.title, theme === 'dark' && styles.darkTitle]}>TTD UPDATES</Text>

      {/* Search Bar */}
      <View style={[styles.searchContainer, theme === 'dark' && styles.darkSearchContainer]}>
        <TextInput
          style={[styles.searchInput, theme === 'dark' && styles.darkSearchInput]}
          placeholder="Search news..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Latest News Heading */}
      <Text style={[styles.latestNewsHeading, theme === 'dark' && styles.darkLatestNewsHeading]}>Latest News</Text>

      {/* Filtered News List */}
      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Light background color
    padding: 15,
  },
  darkContainer: {
    backgroundColor: '#000', // Dark background color
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 5,
    color: '#003366',
    padding: 10,
  },
  darkTitle: {
    color: '#fff', // Dark title color
  },
  searchContainer: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  darkSearchContainer: {
    backgroundColor: '#333', // Dark search container background
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: 16,
  },
  darkSearchInput: {
    borderColor: '#666', // Dark search input border
    backgroundColor: '#444', // Dark search input background
    color: '#fff', // Dark search input text color
  },
  latestNewsHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
    color: '#333',
  },
  darkLatestNewsHeading: {
    color: '#fff', // Dark heading color
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  darkCard: {
    backgroundColor: '#222', // Dark card background
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  darkCardTitle: {
    color: '#fff', // Dark card title color
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#555',
  },
  darkContent: {
    color: '#ccc', // Dark content color
  },
  shareButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface NewsItem {
  title: string;
  image: string;
  content: string;
}

interface NewsContextType {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
}

export const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://YOUR_IP_ADDRESS:8000/api/news/'); // Update with your IP
        setNews(response.data);
      } catch (err) {
        setError('Error fetching news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading, error }}>
      {children}
    </NewsContext.Provider>
  );
};

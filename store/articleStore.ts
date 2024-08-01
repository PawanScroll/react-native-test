import axios from 'axios';
import { create } from 'zustand';

import { Article } from '../models/Article';

interface ArticleStore {
    articles: Array<Article>,
    fetchArticles: () => void
}

export const useArticleStore = create<ArticleStore>((set, get) => ({
    articles: [],
    fetchArticles: async () => {
        try {
            const response = await axios.get('https://api.scroll.in/api/2.0/articles/headlines?limit=20');
            set({ articles: response.data?.articles });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}))
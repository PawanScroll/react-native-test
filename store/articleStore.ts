import axios from 'axios';
import { create } from 'zustand';

import { Article } from '../models/Article';

interface ArticleStore {
    articles: Array<Article>,
    currentLimit: number,
    currentPage: number,
    isError: boolean,
    isLoading: boolean,
    lastOffset: number | null,
    fetchArticles: () => void
    updateArticles: () => Promise<void>
}

export const useArticleStore = create<ArticleStore>((set, get) => ({
    articles: [],
    isLoading: false,
    currentLimit: 20,
    currentPage: 1,
    isError: false,
    lastOffset: null,
    fetchArticles: async () => {
        set({ isError: false, currentPage: 1, currentLimit: 2, isLoading: true });
        try {
            const response = await axios.get(`https://api.scroll.in/api/2.0/articles/headlines?limit=${get().currentLimit}`);
            set({ articles: response.data?.articles });
            set({ lastOffset: get().articles[get().articles.length - 1].index });
        } catch (error) {
            set({ isError: true });
            console.error('Error fetching data:', error);
        } finally {
            set({ isLoading: false });
        }
    },
    updateArticles: async () => {
        set({ currentPage: ++get().currentPage, currentLimit: get().currentLimit + 10 });

        try {
            const resp = await axios.get(`https://api.scroll.in/api/2.0/articles/headlines?limit=${get().currentLimit}&offset=${get().lastOffset}`);
            set({ articles: [...get().articles, ...resp.data?.articles] });
            set({ lastOffset: get().articles[get().articles.length - 1].index });
        } catch (err) {
            console.error(err);
        }
    }
}))
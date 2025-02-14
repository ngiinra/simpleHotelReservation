import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

const BookmarksContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

export function BookmarksProvider({ children }) {
    const [singleBookmark, setSingleBookmark] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [bookmarksList, setBookmarksList] = useState([]);

    async function getBookmarksList() {
        try{
            setLoading(true);
            const { data } = await axios.get(`${BASE_URL}`);
            setBookmarksList(data);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

    async function getSingleBookmark(id) {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/${id}`);
        setSingleBookmark(data);
        setLoading(false);
    }

    async function createBookmark(newBookmarkObj) {
        setLoading(true);
        const { data } = await axios.post(`${BASE_URL}/`, newBookmarkObj);
        setBookmarksList(pre => [...pre, data]);
        setSingleBookmark(data);
        setLoading(false);
    }

    async function searchBookmarks(query) {
        try{
            setLoading(true);
            const { data } = await axios.get(`${BASE_URL}?${query}`);
            setBookmarksList(data);
            console.log(data)
        }catch(e){
            console.log(e);
        }finally{
            console.log("hey you")
            setLoading(false);
        }
    }

    async function deleteBookmark(id){
        setLoading(true);
        await axios.delete(`${BASE_URL}/${id}`);
        setBookmarksList(pre=>pre.filter(bookmark=> bookmark.id !== id));
        setLoading(false);
    }

    async function editBookmark(id,newData) {
        setLoading(true);
        const {data} = await axios.put(`${BASE_URL}/${id}`,newData);
        //setBookmarksList(pre=>pre.filter(bookmark=> bookmark.id !== id));
        console.log(data)
        setLoading(false);
    }

    return (
        <BookmarksContext.Provider value={{
            getBookmarksList,
            singleBookmark,
            getSingleBookmark,
            bookmarksList,
            isLoading,
            createBookmark,
            searchBookmarks,
            deleteBookmark,
            editBookmark
        }}>
            {children}
        </BookmarksContext.Provider>
    )
}

export function useBookmarks() {
    return useContext(BookmarksContext);
}
export default BookmarksContext;
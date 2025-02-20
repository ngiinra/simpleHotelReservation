import React, { useState } from 'react'
import { useBookmarks } from '../../context/BookmarksContext';

function SearchBookmarks() {
    const [countryQuery, setCountryQuery] = useState("");
    const { searchBookmarks , bookmarksList} = useBookmarks();

    const handleSearch = async () => {
        await searchBookmarks(`country_like=${countryQuery}`);
    };

    return (
        <form className='near-flex' >
            <input className='width-60' type='text' placeholder='نام کشور' value={countryQuery} onChange={(e) => setCountryQuery(e.target.value)} />
            <button type='button' className='return-btn' onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                handleSearch();
            }
            }>جستجو</button>
            <h2 className="pl-2">founded bookmarks ({bookmarksList?.length})</h2>
        </form>
    )
}

export default SearchBookmarks
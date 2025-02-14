import { Link } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksContext";
import ReactCountryFlag from "react-country-flag";
import { TbTrash } from "react-icons/tb";

export default function BookmarksList() {

    const { bookmarksList, singleBookmark, deleteBookmark } = useBookmarks();

    async function handleClickingDeleteButton(e,id) {
        e.preventDefault();
        deleteBookmark(id);
    }

    return (
        <div className="BookmarkList">
            {bookmarksList?.map(bookmark => {
                return (
                    <Link to={`${bookmark?.id}?lat=${bookmark?.latitude}&lng=${bookmark?.longitude}`} key={bookmark?.id} >
                        <div className="bookmark-min-card">
                            <div style={{ width: '100%' }}>
                                <h3 className="bold">
                                    <ReactCountryFlag countryCode={bookmark?.countryCode}
                                        svg
                                        style={{
                                            width: '2em',
                                            height: '2em',
                                        }} />
                                    {" " + bookmark?.cityName + " ," + bookmark?.country}
                                </h3>
                                <button className="no-color-btn" style={{ float: 'right' }} onClick={(e)=>handleClickingDeleteButton(e,bookmark.id)}>
                                    <TbTrash style={{ color: 'red', fontSize: '23px' }} />
                                </button>

                                <p><span className="bold">host location: </span>{bookmark?.host_location}</p>
                                <p>{singleBookmark?.id === bookmark?.id ? "visited" : ""}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}


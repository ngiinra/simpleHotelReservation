import { createSearchParams, json, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { HiMinus, HiPlusSm } from "react-icons/hi";
import useOutsideClick from "../customHooks/useOutsideClick";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from "react-date-range";
import format from "date-fns/format"

export default function Navbar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("location") || ""); //اگر کاربر قبلا چیزی سرچ کرده داخل کوئری استرینگه با رفرش دوباره مقدارشو ببینه
    const [showOptions, setShowOptions] = useState(false);
    const [options, setOptions] = useState({ adult: 1, children: 0, room: 0 });
    const [showDateRange, setShowDateRange] = useState(false);
    const [dateRangeData, setDateRangeData] = useState([{ startDate: new Date(), endDate: new Date(), key: "dateRangeFilter" }]);
    const navigate = useNavigate();

    //handelers
    function handleOptions(optionName, operation, e) {
        e.preventDefault();
        setOptions(prev => {
            return {
                ...prev,
                [optionName]:
                    operation === "add" ?
                        options[optionName] + 1 :
                        operation === "minus" ?
                            options[optionName] - 1 :
                            options[optionName]
            }
        });
    }

    function handleSearch(e) {
        e.preventDefault();
        const encodedSearchQuery = createSearchParams({
            date: JSON.stringify(dateRangeData),
            location: searchQuery,
            options: JSON.stringify(options)
        });
        navigate({ pathname: "/hotels", search: encodedSearchQuery.toString() });
    }

    return (
        <div className="navbar-section">
            <div className="navbar-background"></div>
            <div className="navbar">
                <div className="home"><Link to='/'>Home</Link></div>
                <form>
                    <div className="has-seperator">
                        <FaLocationDot className="locationIcon" />
                        <input placeholder="where to go?"
                            name="searchInput"
                            value={searchQuery}
                            className="Input"
                            onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className="has-seperator" id="navbar-date-range">
                        <div onClick={() => setShowDateRange(!showDateRange)}>
                            {`from ${format(dateRangeData[0].startDate, "yyyy/MM/dd")} 
                            to ${format(dateRangeData[0].endDate, "yyyy/MM/dd")}`}
                        </div>
                        {showDateRange &&
                            <DateRange
                                ranges={dateRangeData}
                                minDate={new Date()}
                                className="dateRangePicker"
                                onChange={item => setDateRangeData([item.dateRangeFilter])}
                                moveRangeOnFirstSelection={true} />
                        }
                    </div>
                    <div>
                        <div onClick={() => setShowOptions(!showOptions)} className="has-seperator" id="navbar-options-list">
                            {options.adult} adult &bull; {options.children} childen &bull; {options.room} room
                        </div>
                        {showOptions && <OptionsList options={options} handleOptions={handleOptions} setShowOptions={setShowOptions} />}
                    </div>
                    <div>
                        <button className="search-icon" onClick={(e) => handleSearch(e)}> <IoIosSearch /> </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function OptionsList({ options, handleOptions, setShowOptions }) {
    const optionsRef = useRef();
    //for closing options when outside of modal clicks
    useOutsideClick(optionsRef, "navbar-options-list", () => setShowOptions(false));

    return (
        <div className="optionsDropDown" ref={optionsRef}>
            <Option type="adult" minimum="1" options={options} handleOptions={handleOptions} />
            <Option type="children" minimum="0" options={options} handleOptions={handleOptions} />
            <Option type="room" minimum="0" options={options} handleOptions={handleOptions} />
        </div>
    );
}

function Option({ type, options, minimum, handleOptions }) {
    return (
        <div>
            <span>{type}</span>
            <button onClick={(e) => handleOptions(type, "minus", e)} disabled={options[type] <= minimum}><HiMinus /></button>
            <span>{options[type]}</span>
            <button onClick={(e) => handleOptions(type, "add", e)}><HiPlusSm /></button>
        </div>
    );
}
import React, { useEffect } from "react";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import {
  IoIosCloseCircle,
  IoIosList,
  IoIosPerson,
  IoIosSearch,
} from "react-icons/io";
import { HiMinus, HiPlusSm } from "react-icons/hi";
import useOutsideClick from "../../customHooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { useUsers } from "../../context/UsersContext";
import { BiLogOutCircle } from "react-icons/bi";

export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("location") || ""
  ); //اگر کاربر قبلا چیزی سرچ کرده داخل کوئری استرینگه با رفرش دوباره مقدارشو ببینه
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 0 });
  const [showDateRange, setShowDateRange] = useState(false);
  const [dateRangeData, setDateRangeData] = useState([
    { startDate: new Date(), endDate: new Date(), key: "dateRangeFilter" },
  ]);
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  //handelers
  function handleOptions(optionName, operation, e) {
    e.preventDefault();
    setOptions((prev) => {
      return {
        ...prev,
        [optionName]:
          operation === "add"
            ? options[optionName] + 1
            : operation === "minus"
            ? options[optionName] - 1
            : options[optionName],
      };
    });
  }

  function handleSearch(e) {
    e.preventDefault();
    const encodedSearchQuery = createSearchParams({
      date: JSON.stringify(dateRangeData),
      location: searchQuery,
      options: JSON.stringify(options),
    });
    navigate({ pathname: "/hotels", search: encodedSearchQuery.toString() });
  }

  function handleOpenMobileNav(e) {
    e.preventDefault();
    setIsMobileNavOpen((pre) => !pre);
  }

  return (
    <div
      className={`flex flex-row lg:top-1/3 mx-auto justify-center items-center lg:w-4/5 lg:h-13 relative sm:static mt-5 mb-10 border-b-1 border-stone-300 pb-5`}
    >
      <div className="pr-5 p-3">
        <NavLink to="/" className="text-blue-600 hover:text-pink-600">
          Home
        </NavLink>
      </div>
      <div className="pr-3 text-xl">
        <UserState />
      </div>
      <div className="text-4xl text-blue-600 hover:text-pink-600 font-bold lg:hidden">
        <button
          className="items-center"
          onClick={(e) => handleOpenMobileNav(e)}
        >
          <IoIosList />
        </button>
      </div>
      <form
        className={`p-3 items-center ${
          isMobileNavOpen ? "block" : "hidden"
        }  z-1005 lg:block`}
      >
        <div
          className="
        flex lg:flex-row flex-col lg:gap-x-6 gap-y-6 absolute 
        lg:static left-0 bg-white lg:bg-inherit shadow-2xl lg:shadow-none border-stone-300 border-1
        lg:border-0 rounded-r-lg p-4 items-center"
        >
          <button className="inline text-red-500 text-xl lg:hidden self-end">
            <IoIosCloseCircle onClick={handleOpenMobileNav} />
          </button>
          {/* location ---------------------------------------- */}
          <div className=" flex items-center lg:my-0">
            <FaLocationDot className=" w-1/5 text-pink-700 text-2xl" />
            <input
              placeholder="where to go?"
              name="searchInput"
              value={searchQuery}
              className="m-1 p-1 h-5 w-4/5 border-stone-300 border-1 rounded-sm py-3"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* date ranger ---------------------------------------- */}
          <div className="relative pr-2" id="navbar-date-range">
            <div onClick={() => setShowDateRange(!showDateRange)}>
              {`from ${format(dateRangeData[0].startDate, "yyyy/MM/dd")} 
                            to ${format(
                              dateRangeData[0].endDate,
                              "yyyy/MM/dd"
                            )}`}
            </div>
            {showDateRange && (
              <DateRange
                ranges={dateRangeData}
                minDate={new Date()}
                className="shadow-md absolute border-1 border-stone-300 mt-3 mb-2 z-1001"
                onChange={(item) => setDateRangeData([item.dateRangeFilter])}
                moveRangeOnFirstSelection={true}
              />
            )}
          </div>
          {/* options ---------------------------------------- */}
          <div>
            <div
              onClick={() => setShowOptions(!showOptions)}
              id="navbar-options-list"
            >
              {options.adult} adult &bull; {options.children} childen &bull;{" "}
              {options.room} room
            </div>
            {showOptions && (
              <OptionsList
                options={options}
                handleOptions={handleOptions}
                setShowOptions={setShowOptions}
              />
            )}
          </div>
          <div>
            <button
              className="text-blue-600 font-bold cursor-pointer hover:text-pink-500"
              onClick={(e) => handleSearch(e)}
            >
              {" "}
              <IoIosSearch className="inline lg:hover:rotate-90 lg:hover:duration-150 text-5xl" />{" "}
              <p className="inline lg:hidden text-sm">search</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function OptionsList({ options, handleOptions, setShowOptions }) {
  const optionsRef = useRef();
  //for closing options when outside of modal clicks
  useOutsideClick(optionsRef, "navbar-options-list", () =>
    setShowOptions(false)
  );

  return (
    <div
      className="absolute p-1 w-45 overflow-hidden bg-white border-1 border-stone-300 rounded-md shadow-md mt-2"
      ref={optionsRef}
    >
      <Option
        type="adult"
        minimum="1"
        options={options}
        handleOptions={handleOptions}
      />
      <Option
        type="children"
        minimum="0"
        options={options}
        handleOptions={handleOptions}
      />
      <Option
        type="room"
        minimum="0"
        options={options}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function Option({ type, options, minimum, handleOptions }) {
  return (
    <div className="ml-3 my-1 p-0.5 border-b-1 border-stone-300">
      <span className="inline-block w-20">{type}</span>
      <button
        onClick={(e) => handleOptions(type, "minus", e)}
        disabled={options[type] <= minimum}
        className="mx-1 p-[1px] text-red-600 self-center"
      >
        <HiMinus />
      </button>
      <span>{options[type]}</span>
      <button
        onClick={(e) => handleOptions(type, "add", e)}
        className="px-1 text-blue-600 self-center"
      >
        <HiPlusSm />
      </button>
    </div>
  );
}

function UserState() {
  const { user, logout } = useUsers();
  const navigate = useNavigate();

  if (!user.isAuth)
    return (
      <NavLink to="/login">
        <IoIosPerson className="hover:text-blue-600" />
      </NavLink>
    );
  else
    return (
      <button
        className="flex flex-row items-center"
        onClick={(e) => {
          e.preventDefault();
          logout();
          navigate("/");
        }}
      >
        <p className="text-xs inline">{user.username}</p>
        <BiLogOutCircle className="hover:text-blue-600 inline" />
      </button>
    );
}

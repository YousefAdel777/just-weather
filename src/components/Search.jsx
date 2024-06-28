import { useState, useEffect, useRef } from "react";
import { useWeatherContext } from "../contexts/WeatherContext";
import useDebounce from "../hooks/useDebounce";
import useSearch from "../hooks/useSearch";
import SearchResult from "./SearchResult";
import SearchLoader from "./SearchLoader";
import SearchError from "./SearchError";
import RecentSearch from "./RecentSearch";

const Search = () => {
    const [search, setSearch] = useState("");
    const [recentSearchResults, setRecentSearchResults] = useState(() => JSON.parse(localStorage.getItem("recent")) || []);
    const [showRecent, setShowRecent] = useState(false);
    const { debouncedValue } = useDebounce(search, 500);
    const { dispatch } = useWeatherContext();
    const recentRef = useRef(null);
    const { isError, isLoading, data: searchResults } = useSearch(debouncedValue);

    useEffect(() => {
        localStorage.setItem("recent", JSON.stringify(recentSearchResults));
    }, [recentSearchResults]);

    const handleResultClick = (result) => {
        setSearch("");
        setShowRecent(false);
        deleteSearch(result.id);
        setRecentSearchResults(prevState => [
                result,
                ...prevState
        ]);
        dispatch({type: "SET_LOCATION", payload: {lon: result.lon, lat: result.lat}});
        dispatch({type: "SET_DAY", payload: 0});
    }

    const deleteSearch = (id) => {
        setRecentSearchResults(prevState => prevState.filter(result => result.id !== id));
    }

    return (
        <div 
            className="w-full relative flex flex-col gap-6 outline-none" 
            tabIndex={99} 
            onFocus={() => setShowRecent(true)}
        >
            <form onSubmit={e => e.preventDefault()} className="w-full">
                <input
                    type="text"
                    value={search}
                    onBlur={(e) => {
                        if (!recentRef.current?.contains(e.relatedTarget)) {
                            setShowRecent(false);
                        }
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for cities"
                    className="w-full outline-none border-[3px] rounded-lg border-gray-400 bg-gray-400 px-4 py-[0.2rem] placeholder:text-zinc-900 placeholder:text-sm focus:border-violet-700"
                />
            </form>
            <div className="search-results-container rounded-md max-h-[25rem] overflow-y-auto overflow-x-hidden z-10 shadow-lg absolute left-1/2 -translate-x-1/2 bg-gray-400 w-full -bottom-4 translate-y-full">
                {
                    isLoading ?
                    <SearchLoader />
                    :
                    isError ?
                    <SearchError />
                    :
                    searchResults?.length > 0 ? 
                    searchResults.map((result, i) => {
                        return <SearchResult {...result} onClick={() => handleResultClick(result)} key={i} />
                    })
                    :
                    searchResults?.length === 0 ?
                    <div className="h-16 flex items-center justify-center">
                        <p>No Cities To Show.</p>
                    </div>
                    :
                    showRecent && search === "" ?
                    <RecentSearch 
                        clearAll={() => setRecentSearchResults([])}
                        recentSearchResults={recentSearchResults}
                        deleteSearch={deleteSearch}
                        handleResultClick={handleResultClick}
                        ref={recentRef}
                        onBlur={() => setShowRecent(false)}
                    />
                    :
                    <>
                    </>
                }
            </div>
        </div>
    );
}

export default Search;
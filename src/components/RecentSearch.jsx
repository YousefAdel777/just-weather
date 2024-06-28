/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import useGetRecentSearch from "../hooks/useGetRecentSearch";
import { TrashIcon } from "../icons";
import { useWeatherContext } from "../contexts/WeatherContext";
import SearchLoader from "../components/SearchLoader";
import SearchError from "../components/SearchError";
import "react-loading-skeleton/dist/skeleton.css";

const RecentSearch = forwardRef(({handleResultClick, deleteSearch, clearAll, recentSearchResults, onBlur}, ref) => {
    const { state } = useWeatherContext();
    const queries = useGetRecentSearch(recentSearchResults);

    if (queries.some(query => query.isLoading)) {
        return <SearchLoader />;
    }

    if (queries.some(query => query.isError)) {
        return <SearchError />;
    }

    if (recentSearchResults.length > 0) {
        return (
            <div ref={ref} tabIndex={100} onBlur={onBlur}>
                <div className="flex justify-between p-3">
                    <h2 className="text-2xl font-semibold">Recent</h2>
                    <span className="text-violet-700 cursor-pointer hover:underline" onClick={clearAll}>
                        Clear All
                    </span>
                </div>
                {queries.map((query, i) => {
                    return (
                        <div 
                            key={i} 
                            className="text-zinc-900 p-3 hover:bg-violet-700 hover:text-white cursor-pointer flex justify-between items-center" 
                            onClick={() => handleResultClick(recentSearchResults[i])}
                        >
                            <div className="flex items-center justif-center gap-3 md:gap-4">
                                <div className="min-w-[3.5rem] max-w-[3.5rem]">
                                    <img src={query.data?.current.condition.icon} alt={query.data?.current.condition.text} />
                                </div>
                                <span>
                                    &deg;
                                    {state.tempUnit === "celsius" ? Math.round(query.data?.current.temp_c) : Math.round(query.data?.current.temp_f)}
                                </span>
                                <div>
                                    <p className="text-lg">{recentSearchResults[i].name}</p>
                                    <p className="text-sm">{recentSearchResults[i].region}, {recentSearchResults[i].country}</p>
                                </div>
                            </div>
                            <span 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteSearch(recentSearchResults[i].id)
                                }}
                            >
                                <TrashIcon />
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }
});

RecentSearch.displayName = "RecentSearch";

export default RecentSearch;
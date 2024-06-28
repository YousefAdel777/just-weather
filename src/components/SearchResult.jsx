/* eslint-disable react/prop-types */
const SearchResult = ({onClick, name, region, country}) => {
    return (
        <div className="text-zinc-900 px-3 py-3 hover:bg-violet-700 hover:text-white cursor-pointer" onClick={onClick}>
            <p>{name}, {region}, {country}</p>
        </div>
    );
}

export default SearchResult;
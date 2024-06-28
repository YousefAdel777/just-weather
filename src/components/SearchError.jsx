import errorImg from "../assets/cloud-error-illustration.svg";

const SearchError = () => {
    return (
        <div className="flex flex-col gap-6 h-52 items-center justify-center">
            <img className="h-28" src={errorImg} alt="Search error image" />
            <p>An unexpected error has occured.</p>
        </div>
    );
}

export default SearchError;
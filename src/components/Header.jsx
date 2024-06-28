import logo from "../assets/logo.svg";
import Search from "./Search";
import { useWeatherContext } from "../contexts/WeatherContext";

const Header = () => {
    const { state, dispatch } = useWeatherContext();

    const toggleTempUnit = () => {
        if  (state.tempUnit === "celsius") {
            dispatch({type: "SET_UNIT", payload: "fahrenheit"});
        }
        else {
            dispatch({type: "SET_UNIT", payload: "celsius"});
        }
    }

    return (
        <header className="pb-10 pt-7">
            <div className="container flex flex-col items-center justify-center gap-10 md:flex-row">
                <div>
                    <img className="w-40 mx-auto md:m-0" src={logo} alt="Just weather logo" />
                </div>
                <div className="flex flex-col items-center justify-center gap-8 w-full md:flex-row">
                    <Search />
                    <div
                        className="relative z-0 select-none duration-300 font-medium px-3 shadow-md bg-gray-400 h-8 w-[4.5rem] cursor-pointer rounded-2xl flex items-center gap-2 justify-between"
                        onClick={toggleTempUnit}
                    >
                        <div className={`rounded-full w-7 h-7 absolute bg-violet-700 -z-10 duration-300 ${state.tempUnit === "celsius" ? "right-1.5" : "left-1.5"}`} />
                        <span className={state.tempUnit === "fahrenheit" ? "text-white" : "text-black"}>&deg;F</span>
                        <span className={state.tempUnit === "celsius" ? "text-white" : "text-black"}>&deg;C</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
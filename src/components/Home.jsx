import { useWeatherContext } from "../contexts/WeatherContext";
import { ToastContainer, toast } from "react-toastify";
import homeImg from "../assets/home.png";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const { dispatch } = useWeatherContext();

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            dispatch({type: "SET_LOCATION", payload: {lon: position.coords.longitude, lat: position.coords.latitude}});
        }, () => {
            toast.error("Location Access Denied By User");
        });
    }

    return (
        <section>
            <div className="container">
                <div className="flex flex-col justify-center items-center text-center">
                    <img className="w-80" src={homeImg} alt="Man in the rain" />
                    <h1 className="font-bold text-violet-700 text-5xl mb-3">Just Weather</h1>
                    <h2 className="font-medium text-2xl mb-3">
                        Get The Forecast You Can Trust
                    </h2>
                    <p className="mb-4 text-zinc-900">
                        Accurate, real-time weather updates for your location and around the world.
                    </p>
                    <button onClick={getUserLocation} className="bg-violet-700 mb-4 rounded-3xl px-5 py-2 font-semibold text-lg text-white">
                        Use Current Location
                    </button>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default Home;
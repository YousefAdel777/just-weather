import errorImg from "../assets/cloud-error-illustration.svg";

const WeatherError = () => {
    return (
        <div className="mt-24 text-center">
            <div className="container flex flex-col justify-center items-center gap-6">
                <img src={errorImg} alt="erro cloud image" />
                <h2 className="leading-none font-semibold text-4xl">Oh no!</h2>
                <p className="font-semibold text-xl uppercase">Something went wrong</p>
                <button 
                    className="rounded-3xl mb-8 text-lg bg-violet-700 px-4 py-2 mx-auto block text-white font-semibold"
                    onClick={() => location.reload()}
                >
                    Refresh Page
                </button>
            </div>
        </div>
    );
}

export default WeatherError;
import Header from "./components/Header";
import Home from "./components/Home";
import CurrentWeather from "./components/CurrentWeather";
import DayForecast from "./components/DayForecast";
import WeatherDetails from "./components/WeatherDetails";
import WeekForecast from "./components/WeekForecast";
import WeatherError from "./components/WeatherError";
import { useWeatherContext } from "./contexts/WeatherContext";

const App = () => {
  const { isError, state } = useWeatherContext();

  if (isError) {
    return (
      <>
        <Header />
        <WeatherError />
      </>
    );
  }

  if (!state.location) {
    return (
      <>
        <Header />
        <Home />
      </>
    )
  }

  return (
    <>
      <Header />
      <CurrentWeather />
      <DayForecast />
      <WeatherDetails />
      <WeekForecast />
    </>
  );
}

export default App

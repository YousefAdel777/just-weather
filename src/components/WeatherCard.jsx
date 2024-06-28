/* eslint-disable react/prop-types */

const WeatherCard = ({title, text, Icon}) => {
    return (
        <div className="bg-gray-200 rounded-xl p-4 flex flex-col-reverse justify-center text-center items-center gap-2 md:flex-row md:justify-between md:text-left">
            <div>
                <h2 className="text-gray-500 font-bold leading-none mb-2 md:text-lg">{title}</h2>
                <span className="font-bold text-[1.5rem] md:text-[1.75rem]">{text}</span>
            </div>
            <div className="text-gray-500">
                <Icon />
            </div>
        </div>
    );
}

export default WeatherCard;
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { WeatherContext } from "../contexts/WeatherContext";
import { render } from "@testing-library/react";

const Wrapper = ({children, contextValue}) => {
    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    );
}

export const customRender = (ui, options) => {
    return render(ui, {wrapper: props => <Wrapper {...props} {...options.wrapperProps} />, ...options});
}

export const mockedRecentSearchData = [
    {
        isLoading: false,
        isError: false,
        data: {
            current: {
                condition: {
                    text: "test_text",
                    icon: "test_url",
                },
                temp_c: "30",
                temp_f: "90",
            }
        }
    },
    {
        isLoading: false,
        isError: false,
        data: {
            current: {
                condition: {
                    text: "test_text_2",
                    icon: "test_url_2",
                },
                temp_c: "20",
                temp_f: "70",
            }
        }
    }
];
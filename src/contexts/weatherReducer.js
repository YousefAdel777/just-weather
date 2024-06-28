
const weatherReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOCATION":
            return ({
                ...state,
                location: action.payload,
            });
        case "SET_UNIT":
            return ({
                ...state,
                tempUnit: action.payload,
            });
        case "SET_DAY":
            return ({
                ...state,
                day: action.payload,
            });
        default:
            return state;
    }
}

export default weatherReducer;
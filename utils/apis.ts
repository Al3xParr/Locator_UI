import dotenv from 'dotenv'; 
dotenv.config();

export const DATA_API = {
    GET_ALL_LOCATIONS : process.env.REACT_APP_API_URL + "location_all",
    ADD_LOCATION : process.env.REACT_APP_API_URL + "/location"
}
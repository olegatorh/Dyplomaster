import axios from "axios";
import {base_api_url, getHeaders} from "./base";


const search_places = (value, token) => {
    const headers = {"Authorization": `Token ${token}`}
    return axios.get(`http://${base_api_url}/api/places/points/${value}`, {headers})
}

const place_details = (item_id, token) => {
    const headers = {"Authorization": `Token ${token}`}
    return axios.get(`http://${base_api_url}/api/places/items/${item_id}`, {headers}).catch((error) => {
        alert(`place Details ${JSON.stringify(error.response.data)}`);
    });

}

const get_places = (token) => {
    const headers = {"Authorization": `Token ${token}`}
    return axios.get(`http://${base_api_url}/api/places/points/`, {headers});
}

const check_current_seats = (parameters) => {
    const {token, date_time, place} = parameters
    const headers = {"Authorization": `Token ${token}`}
    return axios.post(`http://${base_api_url}/api/places/available_seats/`, {
        date_time: date_time.toISOString(),
        place: place
    }, {headers}).catch((error) => {
        alert(`check Seats ${JSON.stringify(error.response.data)}`);
    });
}


export {search_places, place_details, get_places, check_current_seats}
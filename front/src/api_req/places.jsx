import axios from "axios";
import {base_api_url, getHeaders} from "./base";



const search_places = (value, token) => {
    const headers = {"Authorization": `Token ${token}`}
    return axios.get(`http://${base_api_url}/api/places/points/${value}`, {headers})
}

const place_details = (item_id, token) => {
    const headers = {"Authorization": `Token ${token}`}
    return axios.get(`http://${base_api_url}/api/places/items/${item_id}`, {headers})

}

const get_places = (token) => {
    const headers = {"Authorization": `Token ${token}`}
    return axios.get(`http://${base_api_url}/api/places/points/`, { headers });
}



export {search_places, place_details, get_places}
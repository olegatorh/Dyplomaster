import axios from "axios";
import {base_api_url, getHeaders} from "./base";


const get_bookings = (user_id, token) => {
    const headers = {"Authorization": `Token ${token}`}
    return axios.get(`http://${base_api_url}/api/places/bookings/${user_id}`, {headers})
}

export {get_bookings}
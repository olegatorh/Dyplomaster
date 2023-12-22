import axios from "axios";
import {base_api_url} from "./base";


const get_user_info = (token) => {
    const headers = {"Authorization": `Token ${token}`}
    return axios.get(`http://${base_api_url}/api/users/user/`, {headers})
}

const get_bookings = (user_id, token) => {
    console.log('get bookings', user_id, token)
    const headers = {"Authorization": `Token ${token}`}
    return axios.get(`http://${base_api_url}/api/places/bookings/${user_id}`, {headers})
}
const update_user_info = (parameters) => {
    const {token, ...userWithoutToken} = parameters;
    const headers = {"Authorization": `Token ${token}`}
    return axios.put(`http://${base_api_url}/api/users/change_user/${parameters.id}/`, {userWithoutToken}, {headers})
}

const get_bookings_all = (token) => {
    const headers = {"Authorization": `Token ${token}`}
    return axios.get(`http://${base_api_url}/api/places/bookings/`, {headers}).catch((error) => {
        console.log('error bookings all', error.response.data);
    });
}


const delete_booking = (booking_id, token) => {
    const headers = {"Authorization": `Token ${token}`}
    return axios.post(`http://${base_api_url}/api/places/bookings/disable_booking/`, {'booking_id': booking_id}, {headers})
}

const create_booking = (parameters) => {
    const {place, people_number, additional_info, booking_time_start, booking_time_end, user, token} = parameters
    const headers = {"Authorization": `Token ${token}`}
    return axios.post(`http://${base_api_url}/api/places/bookings/create_booking/`, {
        place,
        people_number,
        additional_info,
        booking_time_start,
        booking_time_end,
        user
    }, {headers}).catch((error) => {
        console.log(JSON.stringify(error.response.data))
        let values = Object.values(error.response.data).flatMap(function (arr) {
            return arr;
        });
        let message = values.join('\n');
        alert(message);
    });


}

export {get_bookings, delete_booking, create_booking, get_bookings_all, update_user_info, get_user_info}

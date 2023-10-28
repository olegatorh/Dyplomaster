import axios from "axios";
import {base_api_url} from "./base";

const registration = (email, password, username, phone_number) => {
    return axios.post(`http://${base_api_url}/api/users/register/`, { email, password, username, phone_number })
}


const login = (email, password) => {
     return axios.post(`http://${base_api_url}/api/users/login/`, {email, password})

}
export { registration, login };
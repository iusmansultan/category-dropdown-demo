import { baseUrl } from './Config';
import axios from 'axios';


const GetCategories = async () => {
    return await axios.get(`${baseUrl}/categories`);
}

export {
    GetCategories
}
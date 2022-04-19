import { baseUrl } from './Config';
import axios from 'axios';


const GetCategories = async (id) => {
    return await axios.get(`${baseUrl}/categories/${id}`);
}

export {
    GetCategories
}
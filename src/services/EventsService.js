import axios from 'axios';

const baseAxios = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router', 
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
export default { 
    getEvents() {
        return baseAxios.get('/events');
    },
    getEvent(id) { 
        return baseAxios.get(`/events/${id}`);
    }
};
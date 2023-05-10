import axios from 'axios';

const baseAxios = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3', 
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
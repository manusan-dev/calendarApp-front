import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const calendarApi = axios.create({
    baseURL: REACT_APP_API_URL
});

// Todo: configurar interceptores
calendarApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    };
    return config;
});

export default calendarApi;



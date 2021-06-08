import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://payroll-ent-cloud.herokuapp.com/api/', // heroku
    // baseURL: 'https://payroll-ent-cloud.herokuapp.com/api/', // server
});

export default instance
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://payroll-ent-cloud.herokuapp.com/api/', // heroku
    //baseURL: 'http://159.138.137.115:5000/', // server
});

export default instance
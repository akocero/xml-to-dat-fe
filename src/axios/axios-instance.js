import axios from "axios";
import store from "@/store";

const instance = axios.create({
	//baseURL: 'https://payroll-ent-cloud.herokuapp.com/api/', // heroku
	//baseURL: 'http://159.138.137.115:5000/', // server
	// baseURL: 'http://pecbe-env.eba-jrab52bp.us-east-2.elasticbeanstalk.com/api/',
	baseURL: process.env.VUE_APP_BASE_URL_SERVER,
	headers: {
		Authorization: `Bearer ${store.getters.getToken}`,
	},
});

export default instance;

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

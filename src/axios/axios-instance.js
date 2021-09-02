import axios from "axios";

const instance = axios.create({
	//baseURL: 'https://payroll-ent-cloud.herokuapp.com/api/', // heroku
	//baseURL: 'http://159.138.137.115:5000/', // server
	// baseURL: 'http://pecbe-env.eba-jrab52bp.us-east-2.elasticbeanstalk.com/api/',
	baseURL: "http://127.0.0.1:8000/api/",
	headers: {
		Authorization: `Bearer 11|HKPxl1aJmhkyfAYmXQs3scgp7eCkDGAvC3OhV9cX`,
	},
});

export default instance;

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

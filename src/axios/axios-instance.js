import axios from "axios";
import store from "@/store";

const instance = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL_SERVER,
	headers: {
		Authorization: `Bearer ${store.getters.getToken}`,
	},
});

export default instance;

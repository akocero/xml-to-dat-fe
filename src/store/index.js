import { createStore } from "vuex";
import Cookies from "js-cookie";

export default createStore({
	state: {
		user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
		company: Cookies.get("company")
			? JSON.parse(Cookies.get("company"))
			: null,
		token: Cookies.get("token") ? Cookies.get("token") : null,
		abilities: [
			{
				module: "user setup",
				details: "user details",
				methods: [
					"setup:user:list",
					"setup:user:show",
					"setup:user:store",
					"setup:user:update",
				],
			},
			{
				module: "role setup",
				details: "role details",
				methods: [
					"setup:role:list",
					"setup:role:show",
					"setup:role:store",
					"setup:role:update",
				],
			},
			{
				module: "employee management",
				details: "employee details",
				methods: [
					"employee:list",
					"employee:show",
					"employee:store",
					"employee:update",
				],
			},
			{
				module: "employee setup",
				details: "employee-setup details",
				methods: [
					"setup:employee:list",
					"disabled",
					"setup:employee:store",
					"setup:employee:update",
				],
			},
			{
				module: "company setup",
				details: "company details",
				methods: [
					"setup:company:list",
					"setup:company:show",
					"setup:company:store",
					"setup:company:update",
				],
			},
		],
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
			Cookies.set("user", JSON.stringify(payload), { expires: 7 });
		},

		removeUser(state) {
			Cookies.remove("user");
			state.user = null;
		},

		setCompany(state, payload) {
			state.company = payload;
			Cookies.set("company", JSON.stringify(payload), { expires: 7 });
		},

		removeCompany(state) {
			Cookies.remove("company");
			state.company = null;
		},

		setToken(state, payload) {
			state.token = payload;
			Cookies.set("token", payload, { expires: 7 });
		},

		removeToken(state) {
			Cookies.remove("token");
			state.token = null;
		},
	},
	actions: {},
	modules: {},
	getters: {
		getUser(state) {
			return state.user;
		},

		getCompany(state) {
			return state.company;
		},

		getToken(state) {
			return state.token;
		},
		getAbilities(state) {
			return state.abilities;
		},
	},
});

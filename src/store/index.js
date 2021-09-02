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
				module: "user",
				details: "user details",
				methods: [
					"user:list",
					"user:read",
					"user:create",
					"user:update",
				],
			},
			{
				module: "role",
				details: "role details",
				methods: [
					"role:list",
					"role:read",
					"role:create",
					"role:update",
				],
			},
			{
				module: "employee",
				details: "employee details",
				methods: [
					"employee:list",
					"employee:read",
					"employee:create",
					"employee:update",
				],
			},
			{
				module: "employee-setup",
				details: "employee-setup details",
				methods: [
					"employee-setup:list",
					"disabled",
					"employee-setup:create",
					"employee-setup:update",
				],
			},
			{
				module: "company",
				details: "company details",
				methods: [
					"company:list",
					"company:read",
					"company:create",
					"company:update",
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

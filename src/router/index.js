import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const authRequired = (to, from, next) => {
	const authorized =
		store.getters.getUser && store.getters.getCompany
			? next()
			: next({ name: "auth" });
};

const noAuthRequired = (to, from, next) => {
	const authorized =
		store.getters.getUser && store.getters.getCompany
			? next({ name: "dashboard" })
			: next();
};

const routes = [
	{
		path: "/",
		name: "auth",
		component: () => import("@/views/auth/Auth"),
		beforeEnter: noAuthRequired,
	},
	{
		path: "/auth/password-reset",
		name: "password-reset",
		component: () => import("@/views/password_reset/PasswordReset"),
		beforeEnter: noAuthRequired,
	},
	{
		path: "/app",
		name: "admin-lte",
		component: () => import("@/components/AdminLTE"),
		beforeEnter: authRequired,
		children: [
			{
				path: "dashboard",
				name: "dashboard",
				component: () => import("@/views/Dashboard"),
			},
			{
				path: "user",
				name: "user",
				component: () => import("@/views/setup_user/User.vue"),
				props: true,
			},
			{
				path: "user/create",
				name: "create-user",
				component: () => import("@/views/setup_user/CreateUser.vue"),
			},
			{
				path: "user/update/:id",
				name: "update-user",
				component: () => import("@/views/setup_user/UpdateUser.vue"),
			},
			{
				path: "user/view/:id",
				name: "view-user",
				component: () => import("@/views/setup_user/ViewUser.vue"),
			},
			{
				path: "setup/company",
				name: "company",
				component: () => import("@/views/setup_company/Company.vue"),
			},
			{
				path: "setup/company/create",
				name: "create-company",
				component: () =>
					import("@/views/setup_company/CreateCompany.vue"),
			},
			{
				path: "setup/company/update/:id",
				name: "update-company",
				component: () =>
					import("@/views/setup_company/UpdateCompany.vue"),
			},
			{
				path: "setup/company/view/:id",
				name: "view-company",
				component: () =>
					import("@/views/setup_company/ViewCompany.vue"),
			},
			{
				path: "setup/employee",
				name: "setup-employee",
				component: () =>
					import("@/views/setup_employee/SetupEmployee.vue"),
			},
			{
				path: "employee-management",
				name: "employee-management",
				component: () =>
					import("@/views/employee_management/EmployeeList.vue"),
			},
			{
				path: "employee-management/create",
				name: "create-employee",
				component: () =>
					import("@/views/employee_management/CreateEmployee.vue"),
			},
			{
				path: "employee-management/edit/:id",
				name: "edit-employee",
				component: () =>
					import("@/views/employee_management/EditEmployee.vue"),
			},
			{
				path: "employee-management/view/:id",
				name: "view-employee",
				component: () =>
					import("@/views/employee_management/ViewEmployee.vue"),
			},
			{
				path: "role",
				name: "role",
				component: () => import("@/views/role/RoleList.vue"),
			},
			{
				path: "role/create",
				name: "create-role",
				component: () => import("@/views/role/CreateRole.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;

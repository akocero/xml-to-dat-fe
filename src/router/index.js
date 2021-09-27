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

const userCan = (ability, next) => {
	const userAbilities = store.getters.getUser.role.abilities;
	if (userAbilities.includes(ability)) return next();
	else return next({ name: "dashboard" });
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
				path: "setup/user",
				name: "user",
				component: () => import("@/views/setup_user/User.vue"),
				props: true,
			},
			{
				path: "setup/user/create",
				name: "create-user",
				component: () => import("@/views/setup_user/CreateUser.vue"),
			},
			{
				path: "setup/user/update/:id",
				name: "update-user",
				component: () => import("@/views/setup_user/UpdateUser.vue"),
			},
			{
				path: "setup/user/view/:id",
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
				path: "setup/role",
				name: "role",
				component: () => import("@/views/role/RoleList.vue"),
			},
			{
				path: "setup/role/create",
				name: "create-role",
				component: () => import("@/views/role/CreateRole.vue"),
				beforeEnter: (to, from, next) => {
					userCan("role:store", next);
				},
			},
			{
				path: "setup/role/edit/:id",
				name: "edit-role",
				component: () => import("@/views/role/EditRole.vue"),
				beforeEnter: (to, from, next) => {
					userCan("role:update", next);
				},
			},
			{
				path: "setup/role/view/:id",
				name: "view-role",
				component: () => import("@/views/role/ViewRole.vue"),
				beforeEnter: (to, from, next) => {
					userCan("setup:role:show", next);
				},
			},
			{
				path: "setup/payroll-parameter",
				name: "payroll-parameter",
				component: () =>
					import(
						"@/views/payroll_parameter/PayrollParameterList.vue"
					),
			},
			{
				path: "setup/payroll-parameter/create",
				name: "create-payroll-parameter",
				component: () =>
					import(
						"@/views/payroll_parameter/CreatePayrollParameter.vue"
					),
			},
			{
				path: "setup/payroll-parameter/edit/:id",
				name: "edit-payroll-parameter",
				component: () =>
					import(
						"@/views/payroll_parameter/EditPayrollParameter.vue"
					),
			},
			{
				path: "setup/payroll-parameter/view/:id",
				name: "view-payroll-parameter",
				component: () =>
					import(
						"@/views/payroll_parameter/ViewPayrollParameter.vue"
					),
			},
			{
				path: "setup/schedule-management",
				name: "schedule-management",
				component: () =>
					import("@/views/schedule_management/ScheduleList.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;

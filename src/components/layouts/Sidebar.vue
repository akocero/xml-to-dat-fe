<template>
	<aside class="main-sidebar sidebar-dark-primary elevation-4">
		<!-- Brand Logo -->
		<a href="" class="brand-link text-sm">
			<span class="brand-text font-weight-bold pl-3">{{
				company.name
			}}</span>
		</a>

		<!-- Sidebar -->
		<div class="sidebar">
			<!-- Sidebar user panel (optional) -->
			<div class="user-panel mt-3 pb-3 d-flex">
				<!-- <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
          d -->
				<div class="initial">
					{{ userInitial }}
				</div>

				<div class="info">
					<a href="#" class="d-block">{{ user.full_name }}</a>
					<small class="text-white role">{{
						user.login_type === 'admin'
							? 'administrator'
							: user.role.name
					}}</small>
				</div>
			</div>
			<!-- Sidebar Menu -->
			<nav class="mt-2">
				<ul
					class="nav nav-pills nav-sidebar flex-column"
					data-widget="treeview"
					role="menu"
					data-accordion="false"
				>
					<!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
					<li class="nav-header ml-2">ADMINISTRATOR</li>

					<li class="nav-item">
						<a href="#" class="nav-link">
							<!-- <i class="nav-icon fas fa-chart-pie"></i> -->
							<i
								v-html="home"
								class="nav-icon nav-icon fas pr-2"
							></i>
							<p>
								Home
								<i class="right fas fa-angle-left"></i>
							</p>
						</a>
						<ul class="nav nav-treeview">
							<li class="nav-item">
								<router-link
									:to="{ name: 'dashboard' }"
									class="nav-link"
								>
									<i class="nav-icon far pr-2">&#9679;</i>
									<p>Dashboard</p>
								</router-link>
							</li>
						</ul>
					</li>

					<li class="nav-item">
						<a href="#" class="nav-link">
							<!-- <i class="nav-icon fas fa-cog"></i> -->
							<i
								v-html="settings"
								class="nav-icon nav-icon fas pr-2"
							></i>
							<p>
								Setup
								<i class="right fas fa-angle-left"></i>
								<!-- <i v-html="chevronLeft" class="right fe"></i> -->
							</p>
						</a>

						<ul
							class="nav nav-treeview"
							v-if="userCan('setup:user:list')"
						>
							<li class="nav-item">
								<router-link
									:to="{ name: 'setup_license' }"
									class="nav-link"
								>
									<i class="nav-icon far pr-2">&#9679;</i>
									<p>License</p>
								</router-link>
							</li>
						</ul>
						<!-- <ul
							class="nav nav-treeview"
							v-if="userCan('setup:company:list')"
						>
							<li class="nav-item">
								<router-link
									:to="{ name: 'company' }"
									class="nav-link"
								>
									<i class="nav-icon far pr-2">&#9679;</i>
									<p>Company</p>
								</router-link>
							</li>
						</ul> -->
						<!-- <ul
							class="nav nav-treeview"
							v-if="userCan('setup:employee:list')"
						>
							<li class="nav-item">
								<router-link
									:to="{ name: 'setup-employee' }"
									class="nav-link"
								>
									<i class="nav-icon far pr-2">&#9679;</i>
									<p>Employee</p>
								</router-link>
							</li>
						</ul> -->
						<!-- <ul
							class="nav nav-treeview"
							v-if="userCan('setup:role:list')"
						>
							<li class="nav-item">
								<router-link
									:to="{ name: 'role' }"
									class="nav-link"
								>
									<i class="nav-icon far pr-2">&#9679;</i>
									<p>Role</p>
								</router-link>
							</li>
						</ul> -->
						<!-- <ul
							class="nav nav-treeview"
							v-if="userCan('setup:role:list')"
						>
							<li class="nav-item">
								<router-link
									:to="{ name: 'payroll-parameter' }"
									class="nav-link"
								>
									<i class="nav-icon far pr-2">&#9679;</i>
									<p>Payroll Parameter</p>
								</router-link>
							</li>
						</ul> -->
						<!-- <ul
							class="nav nav-treeview"
							v-if="userCan('setup:role:list')"
						>
							<li class="nav-item">
								<router-link
									:to="{ name: 'shift' }"
									class="nav-link"
								>
									<i class="nav-icon far pr-2">&#9679;</i>
									<p>Schedule Shift</p>
								</router-link>
							</li>
						</ul> -->
						<!-- <ul
							class="nav nav-treeview"
							v-if="userCan('setup:role:list')"
						>
							<li class="nav-item">
								<router-link
									:to="{ name: 'bank' }"
									class="nav-link"
								>
									<i class="nav-icon far pr-2">&#9679;</i>
									<p>Bank</p>
								</router-link>
							</li>
						</ul> -->
					</li>

					<!-- <li class="nav-header ml-2 mt-2">DATA ENTRY</li>
					<li class="nav-item" v-if="userCan('employee:list')">
						<router-link
							:to="{ name: 'employee-management' }"
							class="nav-link"
						>
							<i
								v-html="users"
								class="nav-icon nav-icon fas pr-2"
							></i>
							<p>
								Employee Management
							</p>
						</router-link>
					</li>
					<li class="nav-item" v-if="userCan('employee:list')">
						<router-link
							:to="{ name: 'schedule-management' }"
							class="nav-link"
						>
							<i
								v-html="iCalendar"
								class="nav-icon nav-icon fas pr-2"
							></i>
							<p>
								Schedule Management
							</p>
						</router-link>
					</li> -->

					<li class="nav-header ml-2 mt-2">REPORTS</li>
					<li class="nav-item" v-if="userCan('employee:list')">
						<router-link
							:to="{ name: 'reports_withholding' }"
							class="nav-link"
						>
							<i
								v-html="users"
								class="nav-icon nav-icon fas pr-2"
							></i>
							<p>
								Withholding Tax
							</p>
						</router-link>
					</li>
					<li class="nav-item" v-if="userCan('employee:list')">
						<router-link
							:to="{ name: 'schedule-management' }"
							class="nav-link"
						>
							<i
								v-html="iCalendar"
								class="nav-icon nav-icon fas pr-2"
							></i>
							<p>
								VAT
							</p>
						</router-link>
					</li>

					<li class="nav-header ml-2 mt-2">FORMS</li>
					<li class="nav-item" v-if="userCan('employee:list')">
						<router-link
							:to="{ name: 'employee-management' }"
							class="nav-link"
						>
							<i
								v-html="users"
								class="nav-icon nav-icon fas pr-2"
							></i>
							<p>
								Withholding Tax
							</p>
						</router-link>
					</li>
					<li class="nav-item" v-if="userCan('employee:list')">
						<router-link
							:to="{ name: 'schedule-management' }"
							class="nav-link"
						>
							<i
								v-html="iCalendar"
								class="nav-icon nav-icon fas pr-2"
							></i>
							<p>
								Final Withholding Tax
							</p>
						</router-link>
					</li>
					<li class="nav-item" v-if="userCan('employee:list')">
						<router-link
							:to="{ name: 'schedule-management' }"
							class="nav-link"
						>
							<i
								v-html="iCalendar"
								class="nav-icon nav-icon fas pr-2"
							></i>
							<p>
								VAT
							</p>
						</router-link>
					</li>
				</ul>
			</nav>
			<!-- /.sidebar-menu -->
		</div>
		<!-- /.sidebar -->
	</aside>
</template>
<script>
import feather from 'feather-icons';
import { computed } from 'vue';
import { useStore } from 'vuex';
import useAbility from '@/composables/useAbility';
export default {
	name: 'Sidebar',
	computed: {
		chevronLeft: function() {
			return feather.icons['chevron-left'].toSvg({
				width: 16
			});
		},
		tool: function() {
			return feather.icons['tool'].toSvg({
				width: 20
			});
		},
		home: function() {
			return feather.icons['home'].toSvg({
				width: 20
			});
		},
		settings: function() {
			return feather.icons['settings'].toSvg({
				width: 20
			});
		},
		database: function() {
			return feather.icons['database'].toSvg({
				width: 20
			});
		},
		messageCircle: function() {
			return feather.icons['message-circle'].toSvg({
				width: 20
			});
		},
		bell: function() {
			return feather.icons['bell'].toSvg({
				width: 20
			});
		},
		fileText: function() {
			return feather.icons['file-text'].toSvg({
				width: 20
			});
		},
		users: function() {
			return feather.icons['users'].toSvg({
				width: 20
			});
		},
		iCalendar: function() {
			return feather.icons['calendar'].toSvg({
				width: 20
			});
		}
	},
	setup() {
		const store = useStore();
		const user = computed(() => store.getters.getUser);
		const company = computed(() => store.getters.getCompany);
		const user_name_array = user.value.full_name.split(' ');
		const { userCan } = useAbility();
		//console.log(user_name_array)
		const userInitial = `${user_name_array[0].substr(
			0,
			1
		)}${user_name_array[user_name_array.length - 1].substr(0, 1)}`;

		// onBeforeMount(() => {
		// 	setTimeout(() => {
		// 		const links = document.querySelectorAll(".nav-link");
		// 		links.forEach((element) => {
		// 			console.log(element);
		// 		});
		// 	}, 2000);
		// });

		return {
			user,
			userInitial,
			company,
			userCan
		};
	}
};
</script>
<style scoped>
.custom-initial {
	height: 40px;
	min-width: 40px;
	border-radius: 50%;
	background: whitesmoke;
	color: #333;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

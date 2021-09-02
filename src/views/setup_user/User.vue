<template>
	<transition name="alert">
		<Alert
			v-if="userAdded"
			:status="'success'"
			:message="'User Added'"
			@closeModal="handleCloseModal"
		/>
	</transition>
	<div class="card boiler shadow-md">
		<div class="card-body pt-4">
			<div class="row mb-4">
				<div
					class="col-md-12 d-flex justify-content-between align-items-center"
				>
					<h4 class="h4 mb-0 text-primary">User List</h4>
					<router-link
						:to="{ name: 'create-user' }"
						class="btn btn-custom-primary"
						v-if="userCan('user:create')"
						>New User</router-link
					>
				</div>
			</div>
			<form action="" @submit.prevent="HandleSearch" class="mb-3 d-flex">
				<!-- <label for="">Search <span>(Hit Enter)</span></label> -->
				<input
					type="text"
					v-model="search"
					placeholder="Type User Code, Full Name, Email / Login ID"
					class="input-custom-search"
					required
				/>
				<button type="submit" class="btn btn-default btn-flat">
					<i class="fas fa-search"></i>
				</button>
				<a
					class="btn btn-default btn-flat"
					role="button"
					@click="fetchAll"
					><i class="fas fa-sync"></i
				></a>
			</form>

			<div class="row" v-if="!isPending">
				<div class="col-12">
					<div class="table-responsive">
						<table class="table">
							<thead>
								<tr class="text-secondary">
									<th class="text-center">Code</th>
									<th>Name</th>
									<th>Email</th>
									<th class="text-center">Role</th>
									<th width="12%">Actions</th>
								</tr>
							</thead>
							<tbody v-if="!isPending && data?.data?.length">
								<tr v-for="item in data.data" :key="item.id">
									<td class="text-center">
										{{ item.employee_id }}
									</td>
									<td>{{ item.full_name }}</td>
									<td>{{ item.login_id }}</td>
									<td class="text-center" v-if="item.role">
										<Badge
											v-if="
												item?.role.name?.toLowerCase() ===
													'admin'
											"
											:type="item?.role.name"
											:badge="'success'"
										/>
										<Badge
											v-else-if="
												item?.role.name?.toLowerCase() ===
													'manager'
											"
											:type="item?.role.name"
											:badge="'warning'"
										/>
										<Badge
											v-else
											:type="item?.role.name"
											:badge="''"
										/>
									</td>
									<td>
										<router-link
											:to="{
												name: 'view-user',
												params: { id: item.id },
											}"
											class="btn btn-sm btn-transparent"
											v-if="userCan('user:read')"
										>
											<i
												class="far fa-eye text-secondary"
											></i>
										</router-link>
										<!-- <router-link to="create-boiler" class="btn btn-custom-primary">Create User</router-link> -->
										<router-link
											:to="{
												name: 'update-user',
												params: { id: item.id },
											}"
											class="btn btn-sm btn-transparent"
											v-if="userCan('user:update')"
										>
											<i
												class="far fa-edit text-secondary"
											></i>
										</router-link>
									</td>
								</tr>
							</tbody>
							<tbody v-else>
								<tr>
									<td colspan="10" class="text-center">
										No data found!
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<Pagination :data="data" @paginate="paginate($event)" />
			</div>
			<div v-else>
				<Spinner />
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
// import { router-link } from "vue-router"
import useFetch from "@/composables/useFetch";
import useAbility from "@/composables/useAbility";
import Spinner from "@/components/Spinner.vue";
import Badge from "@/components/Badge.vue";
import Pagination from "@/components/Pagination.vue";
import Alert from "@/components/Alert.vue";

export default {
	name: "User",
	props: ["userAdded"],
	components: { Spinner, Pagination, Badge, Alert },
	setup(props) {
		const { data, error, fetch, isPending } = useFetch();
		const { userCan } = useAbility();
		const search = ref("");
		onBeforeMount(() => {
			fetchAll();
		});

		const fetchAll = async () => {
			search.value = "";
			await fetch("payrolluser");

			console.log(data.value);
		};

		const paginate = async (url) => {
			await fetch(url);
		};

		const HandleSearch = () => {
			fetch(`payrolluser?search=${search.value}`);
		};
		const handleCloseModal = () => {
			props.userAdded = false;
		};

		return {
			data,
			error,
			paginate,
			fetchAll,
			HandleSearch,
			search,
			isPending,
			handleCloseModal,
			userCan,
		};
	},
};
</script>

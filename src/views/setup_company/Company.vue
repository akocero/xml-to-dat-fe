<template>
	<div class="card boiler shadow-md">
		<div class="card-body pt-4">
			<div class="row mb-4">
				<div
					class="col-md-12 d-flex justify-content-between align-items-center"
				>
					<h4 class="h4 mb-0 text-primary">Company List</h4>
					<router-link
						:to="{ name: 'create-company' }"
						class="btn btn-custom-primary"
						v-if="userCan('setup:company:store')"
						>New Company</router-link
					>
				</div>
			</div>
			<form action="" @submit.prevent="HandleSearch" class="mb-3 d-flex">
				<!-- <label for="">Search <span>(Hit Enter)</span></label> -->
				<input
					type="text"
					v-model="search"
					placeholder="Type Company Code, Name, Classification"
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
									<th>Contact</th>
									<th>Classification</th>
									<th width="12%">Actions</th>
								</tr>
							</thead>
							<tbody v-if="!isPending && data?.data?.length">
								<tr v-for="item in data.data" :key="item.id">
									<td class="text-center">{{ item.code }}</td>
									<td>{{ item.name }}</td>
									<td>{{ item.tel_no }}</td>
									<td>{{ item.classification }}</td>
									<td>
										<router-link
											:to="{
												name: 'view-company',
												params: { id: item.id },
											}"
											class="btn btn-sm btn-transparent"
											v-if="userCan('setup:company:show')"
										>
											<i
												class="far fa-eye text-secondary"
											></i>
										</router-link>
										<!-- <router-link to="create-boiler" class="btn btn-custom-primary">Create User</router-link> -->
										<router-link
											:to="{
												name: 'update-company',
												params: { id: item.id },
											}"
											class="btn btn-sm btn-transparent"
											v-if="
												userCan('setup:company:update')
											"
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
import endpoints from "@/utils/endpoints";

export default {
	name: "Company",
	components: { Spinner, Pagination, Badge },
	setup() {
		const { data, error, fetch, isPending } = useFetch();
		const search = ref("");
		const { userCan } = useAbility();

		onBeforeMount(() => {
			fetchAll();
		});

		const fetchAll = () => {
			search.value = "";
			fetch(endpoints.setupCompany);
		};

		const paginate = async (url) => {
			await fetch(url);
		};

		const HandleSearch = () => {
			fetch(`${endpoints.setupCompany}?search=${search.value}`);
		};

		return {
			data,
			error,
			paginate,
			isPending,
			search,
			HandleSearch,
			fetchAll,

			userCan,
		};
	},
};
</script>

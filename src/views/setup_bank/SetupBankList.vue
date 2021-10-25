<template>
	<transition name="alert">
		<Alert
			v-if="shiftAdded"
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
					<h4 class="h4 mb-0 text-primary">Bank List</h4>
					<router-link
						:to="{ name: 'create-bank' }"
						class="btn btn-custom-primary"
						v-if="userCan('setup:role:store')"
						>New Bank</router-link
					>
				</div>
			</div>
			<form action="" @submit.prevent="HandleSearch" class="mb-3 d-flex">
				<!-- <label for="">Search <span>(Hit Enter)</span></label> -->
				<input
					type="text"
					v-model="search"
					placeholder="Type Role Code, Description"
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
									<th class="text-center">Bank Code</th>
									<th class="text-center">Description</th>
									<th width="12%" class="text-center">
										Actions
									</th>
								</tr>
							</thead>
							<tbody v-if="!isPending && data?.data?.length">
								<tr v-for="item in data.data" :key="item.id">
									<td class="text-center">
										{{ item.code }}
									</td>
									<td class="text-center">
										{{ item.description }}
									</td>
									<td class="text-center">
										<router-link
											:to="{
												name: 'view-shift',
												params: { id: item.id },
											}"
											class="btn btn-sm btn-transparent"
										>
											<i
												class="far fa-eye text-secondary"
											></i>
										</router-link>
										<!-- <router-link to="create-boiler" class="btn btn-custom-primary">Create User</router-link> -->
										<router-link
											:to="{
												name: 'edit-bank',
												params: { id: item.id },
											}"
											class="btn btn-sm btn-transparent"
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
import useFetch from "@/composables/useFetch";
import Spinner from "@/components/Spinner.vue";
import Badge from "@/components/Badge.vue";
import Pagination from "@/components/Pagination.vue";
import Alert from "@/components/Alert.vue";

import useAbility from "@/composables/useAbility";
import endpoints from "@/utils/endpoints";

export default {
	name: "BankList",
	props: ["shiftAdded"],
	components: { Spinner, Pagination, Badge, Alert },
	setup(props) {
		const { userCan } = useAbility();
		const { data, error, fetch, isPending } = useFetch();
		const search = ref("");

		onBeforeMount(() => {
			fetchAll();
		});

		const fetchAll = async () => {
			search.value = "";
			await fetch(endpoints.setupBank);

			console.log(data.value);
		};

		const paginate = async (url) => {
			await fetch(url);
		};

		const HandleSearch = async () => {
			await fetch(`${endpoints.setupBank}?search=${search.value}`);
		};

		const handleCloseModal = () => {
			props.shiftAdded = false;
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

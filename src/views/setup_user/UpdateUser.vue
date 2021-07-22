<template>
	<transition name="alert">
		<Alert
			v-if="alert"
			:status="alert.status"
			:message="alert.message"
			@closeModal="alert = false"
		/>
	</transition>
	<div class="card boiler shadow-md">
		<div class="card-body">
			<div class="row mb-3">
				<div
					class="col-md-12 d-flex justify-content-between align-items-center"
				>
					<h4 class="h4 mb-0 text-primary" v-if="item">
						{{ item.full_name }} Information.
					</h4>
					<router-link class="btn btn-primary" :to="{ name: 'user' }"
						>User List <i v-html="chevronRight"></i>
					</router-link>
				</div>
			</div>

			<hr />

			<form action="" @submit.prevent="handleSubmit">
				<div class="row" v-if="item">
					<div class="col-md-6">
						<div class="row pr-3">
							<div class="form-group col-5">
								<label>Employee ID</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.employee_id &&
											'is-invalid',
									]"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Enter email"
									v-model="item.employee_id"
								/>
								<small
									v-if="error && error.errors.employee_id"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.employee_id[0] }}
								</small>
							</div>
							<!-- <div class="error">{{ error }}</div> -->
							<div class="form-group col-7">
								<label for="exampleInputEmail1"
									>Full Name</label
								>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.full_name &&
											'is-invalid',
									]"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Enter email"
									v-model="item.full_name"
								/>
								<small
									v-if="error && error.errors.full_name"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.full_name[0] }}
								</small>
							</div>

							<div class="form-group col-12">
								<label>Email address</label>
								<input
									type="email"
									class="form-control"
									:class="[
										error &&
											error.errors.login_id &&
											'is-invalid',
									]"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Enter email "
									v-model="item.login_id"
								/>
								<small
									v-if="error && error.errors.login_id"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.login_id[0] }}
								</small>
							</div>

							<div class="form-group col-12">
								<label for="">Role</label>
								<select
									name=""
									id=""
									class="form-control"
									:class="[
										error &&
											error.errors.login_type &&
											'is-invalid',
									]"
									v-model="item.login_type"
								>
									<option value="">Choose ...</option>
									<option value="employee">Employee</option>
									<option value="admin">Admin</option>
									<option value="manager">Manager</option>
								</select>
								<small
									v-if="error && error.errors.login_type"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.login_type[0] }}
								</small>
							</div>
						</div>
					</div>

					<div class="col-md-6">
						<label class="text-bold">Companies </label>
						<input
							type="text"
							v-model="search"
							class="mini-search-company"
							placeholder="Company name..."
						/>
						<div
							class="multi-select text-secondary"
							v-if="
								!isPendingCompany &&
									companies.data?.length &&
									companiesArray.length
							"
						>
							<div
								v-for="company in matchCompanies"
								:key="company.id"
								class="multi-select-card shadow-sm border"
							>
								<input
									type="checkbox"
									name=""
									:value="company.id"
									v-model="companiesArray"
								/>
								<h6 class="h6 text-bold pb-0 mb-0">
									{{ company.code }} - {{ company.name }}
								</h6>
							</div>
						</div>
						<div v-else>
							<p class="text-danger">
								User Can't have 0 company related!
							</p>
							<p class="text-danger">
								Click here to reload the page<a href="">
									Reload</a
								>
							</p>

							{{ disableSaveChanges }}
							<Spinner />
						</div>
					</div>
				</div>
				<div class="row" v-else>
					<Spinner />
				</div>
				<hr />
				<div class="row col-12">
					<button
						class="btn btn-custom-success"
						v-if="!loading && !disabledSaveChanges"
					>
						Save Changes
					</button>
					<button
						class="btn btn-custom-success"
						v-if="loading"
						disabled
					>
						Loading ...
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import getItem from "@/composables/getItem";
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";
import Alert from "@/components/Alert";
import { useRoute } from "vue-router";
import Spinner from "@/components/Spinner.vue";
import feather from "feather-icons";
import useFetch from "@/composables/useFetch";
export default {
	name: "UpdateUser",
	components: {
		Alert,
		Spinner,
	},
	computed: {
		chevronRight: function() {
			return feather.icons["chevron-right"].toSvg({
				width: 18,
			});
		},
	},
	setup() {
		const route = useRoute();
		const {
			data: companies,
			error: errorCompany,
			fetch,
			isPending: isPendingCompany,
		} = useFetch();

		const { alert, displayAlert } = useAlert();
		const { response, error, update, loading, unknownError } = useData();

		// const error = ref(null);
		// const unknownError = ref(null);
		// const response = ref(null);
		// const loading = ref(false);

		fetch("setupcompany?page=1");

		const search = ref("");
		const disabledSaveChanges = ref(false);

		const matchCompanies = computed(() => {
			return companies.value.data.filter((item) =>
				item.name.toLowerCase().includes(search.value.toLowerCase())
			);
		});

		const { item, error: errorData, load } = getItem(
			route.params.id,
			"payrolluser"
		);

		const companiesArray = ref([100]);

		const pushToCompaniesArray = async () => {
			await load();
			companiesArray.value = [];
			if (!errorData.value) {
				item?.value?.setup_companies.forEach((item) => {
					companiesArray.value.push(item.id);
				});
			}
		};

		const disableSaveChanges = computed(() => {
			if (companiesArray.value.length < 1) {
				disabledSaveChanges.value = true;
			}
			console.log(companiesArray.value.length);
		});

		onMounted(() => {
			pushToCompaniesArray();
		});

		const handleSubmit = async () => {
			const data = {
				full_name: item.value.full_name,
				login_id: item.value.login_id,
				login_type: item.value.login_type,
				employee_id: item.value.employee_id,
				active: 1,
				password: "password",
				companies: companiesArray.value,
			};

			await update(`payrolluser/${route.params.id}`, data);
			if (!error.value) {
				// router.push({ name: "user", params: { userAdded: true } });
				displayAlert("info", "User Updated");
			} else {
				displayAlert("error", "Invalid Inputs");
				// console.log("error: ", error.value);
			}
		};

		return {
			handleSubmit,

			error,
			loading,
			response,

			item,

			companies,

			search,
			matchCompanies,

			isPendingCompany,
			companiesArray,

			disabledSaveChanges,
			disableSaveChanges,

			alert,
		};
	},
};
</script>

<style></style>

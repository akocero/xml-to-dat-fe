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
			<ThePageHeader
				v-if="item"
				:heading="item.full_name"
				routeName="user"
				mode="edit"
			/>

			<hr />

			<form action="" @submit.prevent="handleSubmit">
				<div class="row" v-if="item">
					<div class="col-md-6">
						<div class="row pr-3">
							<div class="form-group col-5">
								<BaseInputField
									id="input_employee_id"
									label="Employee ID"
									v-model="item.employee_id"
									:error="error"
									:errorField="
										error?.errors?.employee_id || null
									"
									placeholder="Ex. 213456"
									:required="true"
								/>
							</div>
							<!-- <div class="error">{{ error }}</div> -->
							<div class="form-group col-7">
								<BaseInputField
									id="input_full_name"
									label="Full Name"
									v-model="item.full_name"
									:error="error"
									:errorField="
										error?.errors?.full_name || null
									"
									placeholder="Ex. John Doe"
									:required="true"
								/>
							</div>

							<div class="form-group col-12">
								<BaseInputField
									type="email"
									id="input_email"
									label="Email"
									v-model="item.login_id"
									:error="error"
									:errorField="
										error?.errors?.login_id || null
									"
									placeholder="Ex. johndoe@example.com"
									:required="true"
								/>
							</div>

							<div class="form-group col-12">
								<BaseSelectField
									id="select_role"
									label="Role"
									v-model="item.login_type"
									:error="error"
									:errorField="
										error?.errors?.login_type || null
									"
									:options="[
										{
											value: 'employee',
											label: 'Employee',
										},
										{
											value: 'admin',
											label: 'Administrator',
										},
										{ value: 'manager', label: 'Manager' },
									]"
									:required="true"
								/>
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
						Saving ...
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import getItem from "@/composables/getItem";
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";
import useFetch from "@/composables/useFetch";

import { useRoute } from "vue-router";
import { onMounted, computed, ref } from "vue";
import feather from "feather-icons";

import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner.vue";
import BaseInputField from "@/components/BaseInputField";
import BaseSelectField from "@/components/BaseSelectField";
import ThePageHeader from "@/components/layouts/ThePageHeader";

export default {
	name: "UpdateUser",
	components: {
		Alert,
		Spinner,
		BaseInputField,
		BaseSelectField,
		ThePageHeader,
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

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
					<h5 class="h4 mb-0">New User</h5>
					<router-link class="btn btn-primary" :to="{ name: 'user' }"
						>User List<i v-html="chevronRight"></i>
					</router-link>
				</div>
			</div>

			<hr />

			<form @submit.prevent="handleSubmit" id="form_create_user">
				<div class="row">
					<div class="col-md-6">
						<div class="row pr-3">
							<div class="form-group col-5">
								<BaseInputField
									id="input_employee_id"
									label="Employee ID"
									v-model="employee_id"
									:error="error"
									:errorField="
										error?.errors?.employee_id || null
									"
									placeholder="Ex. 213456"
									:required="true"
								/>
							</div>

							<div class="form-group col-7">
								<BaseInputField
									id="input_full_name"
									label="Full Name"
									v-model="full_name"
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
									v-model="login_id"
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
									v-model="login_type"
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
						<div>
							<label class="text-bold"
								>Companies
								<span class="text-danger text-bold">*</span>
							</label>
							<small
								v-if="error && error.errors.companies"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.companies[0] }}
							</small>
							<input
								type="text"
								v-model="search"
								class="mini-search-company mt-2"
								placeholder="Company name..."
							/>
						</div>

						<div
							class="multi-select text-secondary"
							v-if="!loadingCompany && companies.data?.length"
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
							<Spinner />
						</div>
					</div>
				</div>
				<hr />
				<div class="row col-12">
					<input
						type="submit"
						class="btn btn-custom-success"
						v-if="!loading"
						value="Save"
					/>
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
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";
import useFetch from "@/composables/useFetch";

import feather from "feather-icons";

import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import BaseInputField from "@/components/BaseInputField";
import BaseSelectField from "@/components/BaseSelectField";

export default {
	name: "CreateUser",
	components: {
		Alert,
		Spinner,
		BaseInputField,
		BaseSelectField,
	},
	data() {
		return {
			testt: "",
		};
	},
	computed: {
		chevronRight: function() {
			return feather.icons["chevron-right"].toSvg({
				width: 18,
			});
		},
	},
	setup() {
		const {
			data: companies,
			error: errorCompany,
			fetch,
			isPending: loadingCompany,
		} = useFetch();
		const { response, error, create, loading, unknownError } = useData();
		const { alert, displayAlert } = useAlert();
		const router = useRouter();

		fetch("setupcompany?page=1");

		const search = ref("");

		const matchCompanies = computed(() => {
			return companies.value.data.filter((item) =>
				item.name.toLowerCase().includes(search.value.toLowerCase())
			);
		});

		const companiesArray = ref([]);
		const full_name = ref("");
		const login_id = ref("");
		const login_type = ref("");
		const employee_id = ref("");

		const handleSubmit = async () => {
			const data = {
				full_name: full_name.value,
				login_id: login_id.value,
				login_type: login_type.value,
				employee_id: employee_id.value,
				active: 1,
				password: "password",
				companies: companiesArray.value,
			};

			console.log(data);

			await create("payrolluser", data);

			if (!error.value) {
				console.log("user created");
				router.push({ name: "user", params: { userAdded: true } });
				// displayAlert("success", "User Added");
			} else {
				displayAlert("error", "Invalid Inputs");
				console.log("error: ", error.value);
			}
		};

		return {
			handleSubmit,

			full_name,
			login_id,
			login_type,
			employee_id,

			error,
			loading,
			response,

			companies,
			companiesArray,
			matchCompanies,
			loadingCompany,

			search,
			alert,
		};
	},
};
</script>

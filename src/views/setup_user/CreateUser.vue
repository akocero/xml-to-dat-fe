<template>
	<transition name="alert">
		<Alert
			v-if="response"
			:status="'success'"
			:message="'User Added'"
			@closeModal="handleCloseModal"
		/>
	</transition>
	<transition name="alert">
		<Alert
			v-if="error && error.message"
			:status="'error'"
			:message="error.message"
			@closeModal="handleCloseModal"
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
								<label
									>Employee ID
									<span class="text-danger text-bold">*</span>
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.employee_id &&
											'is-invalid',
									]"
									id=""
									aria-describedby="emailHelp"
									placeholder="Ex. 1234567"
									v-model="employee_id"
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
								<label for=""
									>Full Name
									<span class="text-danger text-bold">*</span>
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.full_name &&
											'is-invalid',
									]"
									id=""
									aria-describedby="emailHelp"
									placeholder="Ex. John Doe"
									v-model="full_name"
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
								<label
									>Email
									<span class="text-danger text-bold">*</span>
								</label>
								<input
									type="email"
									class="form-control"
									:class="[
										error &&
											error.errors.login_id &&
											'is-invalid',
									]"
									id=""
									aria-describedby="emailHelp"
									placeholder="Ex. johndoe@example.com "
									v-model="login_id"
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
								<label for=""
									>Role
									<span class="text-danger text-bold">*</span>
								</label>
								<select
									name=""
									id=""
									class="form-control"
									:class="[
										error &&
											error.errors.login_type &&
											'is-invalid',
									]"
									v-model="login_type"
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
						<div>
							<label class="text-bold"
								>Companies
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								v-model="search"
								class="mini-search-company"
								placeholder="Company name..."
							/>
						</div>

						<div
							class="multi-select text-secondary"
							v-if="!isPendingCompany && companies.data?.length"
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
						v-if="!isPending"
						value="Save"
					/>
					<button
						class="btn btn-custom-success"
						v-if="isPending"
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
// import axios from 'axios';
import { ref, onUnmounted, computed } from "vue";
// import useCreate from "../../composables/useCreate";
import feather from "feather-icons";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import useFetch from "@/composables/useFetch";
import { useRouter } from "vue-router";
import axios from "@/axios/axios-instance";
export default {
	name: "CreateUser",
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
		const {
			data: companies,
			error: errorCompany,
			fetch,
			isPending: isPendingCompany,
		} = useFetch();
		// const { response, error, create, isPending } = useCreate();
		const error = ref(null);
		const unknownError = ref(null);
		const response = ref(null);
		const isPending = ref(false);

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

			try {
				const res = await axios.post("payrolluser", data);
				response.value = res.data;
				error.value = null;
				unknownError.value = null;
				isPending.value = false;
				router.push({ name: "user", params: { userAdded: true } });
			} catch (err) {
				isPending.value = false;

				if (err.message.includes("422")) {
					error.value = err.response.data;
					unknownError.value = null;
				} else {
					unknownError.value =
						"Please check your internet connection";
					error.value = null;
					response.value = null;
				}
				window.scrollTo(0, 0);
			}
		};

		const handleCloseModal = () => {
			error.value.message = null;
			response.value = "";
		};

		return {
			handleSubmit,
			full_name,
			login_id,
			login_type,
			employee_id,
			error,
			isPending,
			response,
			handleCloseModal,
			companies,
			companiesArray,
			matchCompanies,
			search,
			isPendingCompany,
		};
	},
};
</script>

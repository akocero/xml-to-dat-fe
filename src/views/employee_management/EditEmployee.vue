<template>
	<transition name="alert">
		<Alert
			v-if="alert"
			:status="alert.status"
			:message="alert.message"
			@closeModal="handleCloseAlert"
		/>
	</transition>
	<div class="card boiler shadow-md">
		<div class="card-body">
			<div class="row mb-3">
				<div
					class="col-md-12 d-flex justify-content-between align-items-center"
				>
					<h5 class="h4 mb-0 text-primary" v-if="item">
						{{ item.last_name }},
						{{ item.first_name }}
						{{ item.maiden_name }} {{ item.extension_name }}. Info.
					</h5>
					<router-link
						class="btn btn-light"
						:to="{ name: 'employee-management' }"
						>Cancel <i v-html="chevronRight"></i>
					</router-link>
				</div>
			</div>

			<div class="row">
				<div class="col-12">
					<ul
						class="nav nav-pills mb-3"
						id="pills-tab"
						role="tablist"
					>
						<li class="nav-item">
							<a
								class="nav-link active"
								:class="mainTabHasError && 'pr-4'"
								id="pills-main-tab"
								data-toggle="pill"
								href="#pills-main"
								role="tab"
								aria-controls="pills-main"
								aria-selected="true"
								>Employee Info
								<i
									v-if="mainTabHasError"
									v-html="alertTriangle"
									class="text-danger icon-error"
								></i>
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								:class="commTabHasError && 'pr-4'"
								id="pills-comm-tab"
								data-toggle="pill"
								href="#pills-comm"
								role="tab"
								aria-controls="pills-comm"
								aria-selected="false"
							>
								Contact Info
								<i
									v-if="commTabHasError"
									v-html="alertTriangle"
									class="text-danger icon-error"
								></i>
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								:class="connTabHasError ? 'pr-4' : ''"
								id="pills-contri-tab"
								data-toggle="pill"
								href="#pills-contri"
								role="tab"
								aria-controls="pills-contri"
								aria-selected="false"
							>
								Other Info
								<i
									v-if="connTabHasError"
									v-html="alertTriangle"
									class="text-danger icon-error"
								></i>
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link disabled"
								id="pills-banks-tab"
								data-toggle="pill"
								href="#pills-banks"
								role="tab"
								aria-controls="pills-banks"
								aria-selected="false"
								>HR Setup</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link disabled"
								id="pills-signatory-tab"
								data-toggle="pill"
								href="#pills-signatory"
								role="tab"
								aria-controls="pills-signatory"
								aria-selected="false"
								>Payroll Setup</a
							>
						</li>
					</ul>
					<form
						@submit.prevent="handleSubmit"
						id="form_create_user"
						v-if="item"
					>
						<div class="tab-content pt-3" id="pills-tabContent">
							<div
								class="tab-pane fade show active"
								id="pills-main"
								role="tabpanel"
								aria-labelledby="pills-main-tab"
							>
								<div class="row pr-3 pb-3">
									<div class="col-md-4">
										<h5 class="h5">Profile Image</h5>
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
										</label>
									</div>

									<div class="col-md-2">
										<img
											v-if="
												item.profile_image_path &&
													!imageUrl
											"
											:src="
												'http://127.0.0.1:8000/storage/' +
													item.profile_image_path
											"
											alt=""
											style="width: 90%"
										/>
										<img
											v-else-if="imageUrl"
											:src="imageUrl"
											alt=""
											style="width: 90%"
										/>
										<img
											v-else
											src="../../assets/no-image.png"
											alt=""
											style="width: 90%"
										/>
									</div>

									<div class="form-group col-md-6">
										<label for="">Upload Image</label>
										<input
											type="file"
											class="d-block mt-2"
											@change="onFileSelected"
										/>
										<small
											>The maximum file size allowed is
											200KB.</small
										><br /><br />
										<small
											v-if="
												error && error.errors.image_path
											"
											id="emailHelp"
											class="form-text text-danger"
										>
											{{ error.errors.image_path[0] }}
										</small>
									</div>
								</div>

								<hr />

								<div class="row pb-3">
									<div class="col-4">
										<h5 class="h5">Main Information</h5>
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-4">
											<label>
												Employee ID
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.employee_id &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 1234567"
												v-model="item.employee_id"
											/>
											<small
												v-if="
													error &&
														error.errors.employee_id
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors.employee_id[0]
												}}
											</small>
										</div>
										<!-- <div class="error">{{ error }}</div> -->
										<div class="form-group col-4">
											<label for=""
												>First Name
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.first_name &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. John Doe"
												v-model="item.first_name"
											/>
											<small
												v-if="
													error &&
														error.errors.first_name
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.first_name[0] }}
											</small>
										</div>

										<div class="form-group col-4">
											<label
												>Last Name
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.last_name &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. johndoe@example.com "
												v-model="item.last_name"
											/>
											<small
												v-if="
													error &&
														error.errors.last_name
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.last_name[0] }}
											</small>
										</div>

										<div class="form-group col-4">
											<label
												>Middle Name
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.maiden_name &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. johndoe@example.com "
												v-model="item.maiden_name"
											/>
											<small
												v-if="
													error &&
														error.errors.maiden_name
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors.maiden_name[0]
												}}
											</small>
										</div>
										<div class="form-group col-4">
											<label>
												Extension Name
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.extension_name &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 1234567"
												v-model="item.extension_name"
											/>
											<small
												v-if="
													error &&
														error.errors
															.extension_name
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors
														.extension_name[0]
												}}
											</small>
										</div>

										<div class="form-group col-4">
											<label for=""
												>Gender
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<select
												name=""
												id="input_currency"
												class="form-control"
												:class="[
													error &&
														error.errors.gender &&
														'is-invalid',
												]"
												v-model="item.gender"
											>
												<option value=""
													>Choose ...</option
												>
												<option value="male"
													>Male</option
												>
												<option value="female"
													>Female</option
												>
											</select>
											<small
												v-if="
													error && error.errors.gender
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.gender[0] }}
											</small>
										</div>
										<div class="form-group col-6">
											<label
												>Birthdate
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="date"
												class="form-control"
												:class="[
													error &&
														error.errors
															.birthdate &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 02-8123-4567 "
												v-model="item.birthdate"
											/>
											<small
												v-if="
													error &&
														error.errors.birthdate
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.birthdate[0] }}
											</small>
										</div>
										<div class="form-group col-6">
											<label>birthplace</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.birthplace &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 02-8123-4567 "
												v-model="item.birthplace"
											/>
											<small
												v-if="
													error &&
														error.errors.birthplace
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.birthplace[0] }}
											</small>
										</div>
										<div class="form-group col-6">
											<label>Citizenship</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.citizenship &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. https://www.tel_no.com/"
												v-model="item.citizenship"
											/>
											<small
												v-if="
													error &&
														error.errors.citizenship
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors.citizenship[0]
												}}
											</small>
										</div>
										<div class="form-group col-6">
											<label
												>Civil Status
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.civil_status &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex.  "
												v-model="item.civil_status"
											/>
											<small
												v-if="
													error &&
														error.errors
															.civil_status
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors.civil_status[0]
												}}
											</small>
										</div>
									</div>
								</div>
							</div>
							<div
								class="tab-pane fade"
								id="pills-comm"
								role="tabpanel"
								aria-labelledby="pills-comm-tab"
							>
								<div class="row">
									<div class="col-4">
										<h5 class="h5">Contact Info</h5>
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>Email
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="email"
												class="form-control"
												:class="[
													error &&
														error.errors.email &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. johndoe@example.com "
												v-model="item.email"
											/>
											<small
												v-if="
													error && error.errors.email
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.email[0] }}
											</small>
										</div>
										<div class="form-group col-6">
											<label for="">Tel No.</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.tel_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. https://www.tel_no.com/hisoka.morow.904/"
												v-model="item.tel_no"
											/>
											<small
												v-if="
													error && error.errors.tel_no
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.tel_no[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label>Mobile No.</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.mobile_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. https://www.mobile_no.com/hisoka.morow.904/ "
												v-model="item.mobile_no"
											/>
											<small
												v-if="
													error &&
														error.errors.mobile_no
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.mobile_no[0] }}
											</small>
										</div>
									</div>
								</div>
								<hr />
								<div class="row pb-2">
									<div
										class="col-12 d-flex justify-content-between align-items-center pb-1"
									>
										<h5 class="h5 mb-0">Address List</h5>
										<button
											type="button"
											class="btn btn-sm btn-custom-primary"
											@click="addAddress"
										>
											Add Address
										</button>
									</div>
									<EmployeeAddressList
										:addresses="item.addresses"
										@deleteAddress="deleteAddress($event)"
									/>
								</div>
								<hr />
								<div class="row pb-2">
									<div
										class="col-12 d-flex justify-content-between align-items-center pb-1"
									>
										<h5 class="h5 mb-0">Relative List</h5>
										<button
											type="button"
											class="btn btn-sm btn-custom-primary"
											@click="addRelative"
										>
											Add Relative
										</button>
									</div>

									<EmployeeRelativeList
										:relatives="item.relatives"
										@deleteRelative="deleteRelative($event)"
									/>
								</div>
								<hr />
								<div class="row">
									<div class="col-4">
										<h5 class="h5">Social Media</h5>
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
										</label>
									</div>

									<div class="row col-8">
										<!-- <div class="error">{{ error }}</div> -->
									</div>
								</div>
							</div>
							<div
								class="tab-pane fade"
								id="pills-contri"
								role="tabpanel"
								aria-labelledby="pills-contri-tab"
							>
								<div class="row">
									<div class="col-4">
										<h5 class="h5">SSS Info</h5>
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>Height
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.height &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 3484073113 "
												v-model="item.height"
											/>
											<small
												v-if="
													error && error.errors.height
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.height[0] }}
											</small>
										</div>
										<div class="form-group col-6">
											<label>Weight</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.weight &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex.  "
												v-model="item.weight"
											/>
											<small
												v-if="
													error && error.errors.weight
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.weight[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>Blood Type
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.blood_type &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex.  "
												v-model="item.blood_type"
											/>
											<small
												v-if="
													error &&
														error.errors.blood_type
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.blood_type[0] }}
											</small>
										</div>
									</div>
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
								Saving...
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onUnmounted, computed, onBeforeMount } from "vue";
import { v4 as uuidv4 } from "uuid";
import feather from "feather-icons";
import EmployeeAddressList from "./EmployeeAddressList.vue";
import EmployeeRelativeList from "./EmployeeRelativeList.vue";
import Alert from "@/components/Alert";
import { useRoute, useRouter } from "vue-router";
import useData from "@/composables/useData";
import getItem from "../../composables/getItem";

export default {
	name: "CreateCompany",
	components: {
		Alert,
		EmployeeAddressList,
		EmployeeRelativeList,
	},
	computed: {
		chevronRight: function() {
			return feather.icons["chevron-right"].toSvg({
				width: 18,
			});
		},
		alertTriangle: function() {
			return feather.icons["alert-circle"].toSvg({
				width: 18,
			});
		},
	},
	setup() {
		const router = useRouter();
		const route = useRoute();
		const { error, response, loading, create, unknownError } = useData();
		const { item, error: errorData, load, loading: isLoading } = getItem(
			route.params.id,
			"basicemployeeinformation"
		);

		onBeforeMount(async () => {
			await load();

			item.value.addresses = JSON.parse(item.value.addresses);
			item.value.relatives = JSON.parse(item.value.relatives);
			// console.log(item.value.addresses)
			console.log(item.value);
		});
		const alert = ref(null);

		const selectedFile = ref(null);
		const imageUrl = ref(null);

		const addAddress = () => {
			alert.value = null;

			const tempAddress = {
				id: uuidv4(),
				street: "",
				city: "",
				country: "",
				bldg: "",
				geocode: "",
				zipcode: "",
				region: "",
				brgy: "",
			};

			let err = false;
			item.value.addresses.forEach((address) => {
				if (!address.city || !address.country || !address.brgy) {
					err = true;
				}
			});

			err
				? displayAlert(
						"info",
						"Please fill out city and country in address list before adding one"
				  )
				: item.value.addresses.push(tempAddress);
		};

		const addRelative = () => {
			alert.value = null;
			const tempRelative = {
				id: uuidv4(),
				relationship: "",
				name: "",
				address: "",
				contact_no: "",
				occupation: "",
			};

			let err = false;
			item.value.relatives.forEach((relative) => {
				if (!relative.relationship || !relative.name) {
					err = true;
				}
			});

			err
				? displayAlert(
						"info",
						"Please fill out relationship and name in relative list before adding one"
				  )
				: item.value.relatives.push(tempRelative);
		};

		const deleteAddress = (id) => {
			console.log("this id will be deleted: ", id);
			if (
				confirm("Are you sure you want to delete the address?") &&
				item.value.addresses.length !== 1
			) {
				item.value.addresses = item.value.addresses.filter(
					(address) => address.id !== id
				);
			} else {
				displayAlert("info", "Employee need atleast 1 address");
			}
		};

		const deleteRelative = (id) => {
			console.log("this id will be deleted: ", id);
			if (
				confirm("Are you sure you want to delete the relative?") &&
				item.value.relatives.length !== 1
			) {
				item.value.relatives = item.value.relatives.filter(
					(relative) => relative.id !== id
				);
			} else {
				displayAlert("info", "Employee need atleast 1 relative");
			}
		};

		const handleSubmit = async () => {
			const form_data = new FormData();
			const data = {
				first_name: item.value.first_name,
				employee_id: item.value.employee_id,
				tel_no: item.value.tel_no,
				mobile_no: item.value.mobile_no,
				last_name: item.value.last_name,
				birthdate: item.value.birthdate,
				birthplace: item.value.birthplace,
				email: item.value.email,
				citizenship: item.value.citizenship,
				maiden_name: item.value.maiden_name,
				height: item.value.height,
				weight: item.value.weight,
				blood_type: item.value.blood_type,
				civil_status: item.value.civil_status,
				extension_name: item.value.extension_name,
				gender: item.value.gender,
				addresses: JSON.stringify(item.value.addresses),
				relatives: JSON.stringify(item.value.relatives),
				active: 1,
			};

			console.log(data);
			// Checking form_data values

			for (var key in data) {
				form_data.append(key, data[key]);
			}

			if (selectedFile.value) {
				form_data.append("profile_image_path", selectedFile.value);
			}

			for (var pair of form_data.entries()) {
				console.log(pair[0] + ", " + pair[1]);
			}

			await create(
				`basicemployeeinformation/${route.params.id}?_method=PATCH`,
				form_data
			);

			if (!error.value) {
				displayAlert("success", "Employee Added");
			} else {
				displayAlert("error", "Invalid Inputs");
			}
		};

		const displayAlert = (status, message) => {
			const alertDelay = 5000;

			alert.value = {
				status,
				message,
			};
			window.scrollTo(0, 0);
			setTimeout(() => {
				alert.value = null;
			}, alertDelay);
		};

		const handleCloseAlert = () => {
			alert.value = null;
		};

		const commTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.email) ||
				(error.value && error.value.errors.birthdate)
			);
		});

		const mainTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.employee_id) ||
				(error.value && error.value.errors.first_name) ||
				(error.value && error.value.errors.last_name) ||
				(error.value && error.value.errors.address)
			);
		});

		const connTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.height) ||
				(error.value && error.value.errors.tin_no) ||
				(error.value && error.value.errors.hdmf_no) ||
				(error.value && error.value.errors.tax_branch_code) ||
				(error.value && error.value.errors.alphalist_no)
			);
		});

		const onFileSelected = (e) => {
			selectedFile.value = e.target.files[0];
			imageUrl.value = URL.createObjectURL(selectedFile.value);
		};

		return {
			selectedFile,
			imageUrl,

			item,

			handleSubmit,
			error,
			loading,
			response,
			alert,
			handleCloseAlert,
			onFileSelected,

			commTabHasError,
			mainTabHasError,
			connTabHasError,

			addAddress,
			deleteAddress,

			addRelative,
			deleteRelative,
		};
	},
};
</script>

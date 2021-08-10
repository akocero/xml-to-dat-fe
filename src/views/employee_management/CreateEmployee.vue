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
					<h5 class="h4 mb-0 text-primary">New Employee</h5>
					<router-link
						class="btn btn-primary"
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
								id="pills-main-tab"
								data-toggle="pill"
								href="#pills-main"
								role="tab"
								aria-controls="pills-main"
								aria-selected="true"
								>Employee Info
								{{ employeeTabHasError && "&nbsp; &nbsp;" }}
								<i
									v-if="employeeTabHasError"
									v-html="alertTriangle"
									class="text-danger icon-error"
								></i>
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-comm-tab"
								data-toggle="pill"
								href="#pills-comm"
								role="tab"
								aria-controls="pills-comm"
								aria-selected="false"
							>
								Contact Info
								{{ contactTabHasError && "&nbsp; &nbsp;" }}
								<i
									v-if="contactTabHasError"
									v-html="alertTriangle"
									class="text-danger icon-error"
								></i>
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-contri-tab"
								data-toggle="pill"
								href="#pills-contri"
								role="tab"
								aria-controls="pills-contri"
								aria-selected="false"
							>
								Other Info
								{{ otherInfoTabHasError && "&nbsp; &nbsp;" }}
								<i
									v-if="otherInfoTabHasError"
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
					<form @submit.prevent="handleSubmit" id="form_create_user">
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
										<label for="" class="text-justify pr-4">
											This profile image is optional. The
											employee's image may be used for
											his/her ID, and other documents.
											Please upload a recent photo.
										</label>
									</div>

									<div class="col-md-2">
										<img
											v-if="profile_image_path"
											:src="profile_image_path"
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
											@change="onProfileFileSelected"
										/>
										<small
											>The maximum file size allowed is
											200KB.</small
										><br /><br />
										<small
											v-if="
												error &&
													error.errors
														.profile_image_path
											"
											id="emailHelp"
											class="form-text text-danger"
										>
											{{
												error.errors
													.profile_image_path[0]
											}}
										</small>
									</div>
								</div>

								<hr />

								<div class="row pb-3">
									<div class="col-4">
										<h5 class="h5">Main Information</h5>
										<label for="" class="text-justify pr-4">
											Add employee's basic personal
											information.
										</label>
									</div>

									<div class="row col-8">
										<div class="row col-12">
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
													v-model="employee_id"
												/>
												<small
													v-if="
														error &&
															error.errors
																.employee_id
													"
													id="emailHelp"
													class="form-text text-danger"
												>
													{{
														error.errors
															.employee_id[0]
													}}
												</small>
											</div>
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
												placeholder="Ex. Juan"
												v-model="first_name"
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

										<div class="form-group col-3">
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
												placeholder="Ex. Dela Cruz"
												v-model="last_name"
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

										<div class="form-group col-3">
											<label>Middle Name </label>
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
												placeholder="Ex. Santos"
												v-model="maiden_name"
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
										<div class="form-group col-2">
											<label>
												Suffix
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
												placeholder="Ex. Jr."
												v-model="extension_name"
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

										<div class="form-group col-2">
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
												v-model="gender"
											>
												<option value=""
													>Choose
												</option>
												<option value="male"
													>Male</option
												>
												<option value="female"
													>Female</option
												>
												<option value="female"
													>Others</option
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
										<div class="form-group col-3">
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
												v-model="birthdate"
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
										<div class="form-group col-4">
											<label
												>Birthplace<span
													class="text-danger text-bold"
													>*</span
												></label
											>
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
												placeholder="Ex. Manila"
												v-model="birthplace"
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
										<div class="form-group col-3">
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
												placeholder="Ex. Filipino"
												v-model="citizenship"
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
										<div class="form-group col-4">
											<label for=""
												>Civil Status
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
														error.errors
															.civil_status &&
														'is-invalid',
												]"
												v-model="civil_status"
											>
												<option value=""
													>Choose
												</option>
												<option value="signle"
													>Single</option
												>
												<option value="married"
													>Married</option
												>
												<option value="widow"
													>Widow</option
												>
											</select>
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
										<label for="" class="text-justify pr-4">
											Add employee's contact information.
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
												v-model="email"
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
											<label for=""
												>Tel No.<span
													class="text-danger text-bold"
													>*</span
												></label
											>
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
												placeholder="Ex. 1233334"
												v-model="tel_no"
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
											<label
												>Mobile No.<span
													class="text-danger text-bold"
													>*</span
												></label
											>
											<input
												type="number"
												class="form-control"
												:class="[
													error &&
														error.errors
															.mobile_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 09999252144"
												v-model="mobile_no"
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
										:addresses="addresses"
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
										:relatives="relatives"
										@deleteRelative="deleteRelative($event)"
									/>
								</div>
								<hr />
								<div class="row">
									<div class="col-4">
										<h5 class="h5">Social Media</h5>
										<label for="" class="text-justify pr-4">
											Include social media accounts of the
											employee to keep them engaged with
											company activities and updates.
										</label>
									</div>

									<div class="row col-8">
										<!-- <div class="error">{{ error }}</div> -->
									</div>
								</div>
								<!-- <hr class="my-3" />
									<div class="row">
										<div class="col-4">
											<h5 class="h5">Previous Employer</h5>
											<label for="" class="text-justify pr-4">
												This Paragraph will explain what was
												the fields does or what was the use
												of it
											</label>
										</div>

										<div class="row col-8">
											
										</div>
									</div> -->
							</div>
							<div
								class="tab-pane fade"
								id="pills-contri"
								role="tabpanel"
								aria-labelledby="pills-contri-tab"
							>
								<div class="row">
									<div class="col-md-4">
										<h5 class="h5">Signature Image</h5>
										<label for="" class="text-justify pr-4">
											Upload Employee Signature to be used
											for Employee ID and other documents.
										</label>
									</div>

									<div class="col-md-2">
										<img
											v-if="signatory_image_path"
											:src="signatory_image_path"
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
											@change="onSignatureFileSelected"
										/>
										<small
											>The maximum file size allowed is
											200KB.</small
										><br /><br />
										<small
											v-if="
												error &&
													error.errors
														.signatory_image_path
											"
											id="emailHelp"
											class="form-text text-danger"
										>
											{{
												error.errors
													.signatory_image_path[0]
											}}
										</small>
									</div>
									<div class="col-12 my-2">
										<hr />
									</div>

									<div class="col-4">
										<h5 class="h5">Biometrics</h5>
										<label for="" class="text-justify pr-4">
											Update employee's additional vital
											health information.
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label>Height </label>
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
												placeholder="Ex. 183 cm"
												v-model="height"
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
												placeholder="Ex. 70 kilos"
												v-model="weight"
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
											<label>Blood Type </label>
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
												placeholder="Ex. O+"
												v-model="blood_type"
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
									<div class="col-12 my-2">
										<hr />
									</div>

									<div class="row pb-2 col-12">
										<div
											class="col-12 d-flex justify-content-between align-items-center pb-1"
										>
											<h5 class="h5 mb-0">
												Dependent List
											</h5>
											<button
												type="button"
												class="btn btn-sm btn-custom-primary"
												@click="addDependent"
											>
												Add Dependent
											</button>
										</div>

										<EmployeeDependentList
											:dependents="dependents"
											@deleteDependent="
												deleteDependent($event)
											"
										/>
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
								Saving
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import feather from "feather-icons";
import EmployeeAddressList from "./EmployeeAddressList.vue";
import EmployeeRelativeList from "./EmployeeRelativeList.vue";
import EmployeeDependentList from "./EmployeeDependentList.vue";
import Alert from "@/components/Alert";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";

export default {
	name: "CreateCompany",
	components: {
		Alert,
		EmployeeAddressList,
		EmployeeRelativeList,
		EmployeeDependentList,
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
		const { error, response, loading, create, unknownError } = useData();
		const { alert, displayAlert } = useAlert();

		const first_name = ref("");
		const employee_id = ref("");
		const last_name = ref("");
		const birthdate = ref("");
		const birthplace = ref("");
		const email = ref("");
		const citizenship = ref("");
		const tel_no = ref("");
		const mobile_no = ref("");
		const maiden_name = ref("");
		const height = ref("");
		const weight = ref("");
		const blood_type = ref("");
		const civil_status = ref("");
		const extension_name = ref("");
		const gender = ref("");

		const selectedFileProfile = ref(null);
		const profile_image_path = ref(null);

		const selectedFileSignature = ref(null);
		const signatory_image_path = ref(null);

		const addresses = ref([
			{
				id: uuidv4(),
				street: "",
				city: "",
				country: "",
				bldg: "",
				geocode: "",
				zipcode: "",
				province: "",
				brgy: "",
			},
		]);

		const dependents = ref([
			{
				id: uuidv4(),
				full_name: "",
				birthdate: "",
				include: "yes",
				active: "active",
			},
		]);

		const relatives = ref([
			{
				id: uuidv4(),
				relationship: "",
				name: "",
				address: "",
				contact_no: "",
				occupation: "",
			},
		]);

		const addAddress = () => {
			alert.value = null;
			console.log(addresses.value);
			const tempAddress = {
				id: uuidv4(),
				street: "",
				city: "",
				country: "",
				bldg: "",
				geocode: "",
				zipcode: "",
				province: "",
				brgy: "",
			};

			let err = false;
			addresses.value.forEach((address) => {
				if (!address.city || !address.country || !address.brgy) {
					err = true;
				}
			});

			err
				? displayAlert(
						"info",
						"Please fill out city and country in address list before adding one"
				  )
				: addresses.value.push(tempAddress);
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
			relatives.value.forEach((relative) => {
				if (!relative.relationship || !relative.name) {
					err = true;
				}
			});

			err
				? displayAlert(
						"info",
						"Please fill out relationship and name in relative list before adding one"
				  )
				: relatives.value.push(tempRelative);
		};

		const addDependent = () => {
			alert.value = null;
			const tempDependent = {
				id: uuidv4(),
				full_name: "",
				birthdate: "",
				include: "included",
				active: "active",
			};

			let err = false;
			dependents.value.forEach((dependent) => {
				if (!dependent.full_name) {
					err = true;
				}
			});

			err
				? displayAlert(
						"info",
						"Please fill out full name in dependent list before adding one"
				  )
				: dependents.value.push(tempDependent);
		};

		const deleteAddress = (id) => {
			console.log("this id will be deleted: ", id);
			if (
				confirm("Are you sure you want to delete the address?") &&
				addresses.value.length !== 1
			) {
				addresses.value = addresses.value.filter(
					(address) => address.id !== id
				);
			} else {
				displayAlert("info", "Employee need atleast 1 address");
			}
		};

		const deleteDependent = (id) => {
			console.log("this id will be deleted: ", id);
			if (
				confirm("Are you sure you want to delete the dependent?") &&
				dependents.value.length !== 1
			) {
				dependents.value = dependents.value.filter(
					(dependent) => dependent.id !== id
				);
			} else {
				displayAlert("info", "Employee need atleast 1 dependent");
			}
		};

		const deleteRelative = (id) => {
			console.log("this id will be deleted: ", id);
			if (
				confirm("Are you sure you want to delete the relative?") &&
				relatives.value.length !== 1
			) {
				relatives.value = relatives.value.filter(
					(relative) => relative.id !== id
				);
			} else {
				displayAlert("info", "Employee need atleast 1 relative");
			}
		};

		const handleSubmit = async () => {
			const form_data = new FormData();
			const data = {
				first_name: first_name.value,
				employee_id: employee_id.value,
				tel_no: tel_no.value,
				mobile_no: mobile_no.value,
				last_name: last_name.value,
				birthdate: birthdate.value,
				birthplace: birthplace.value,
				email: email.value,
				citizenship: citizenship.value,
				maiden_name: maiden_name.value,
				height: height.value,
				weight: weight.value,
				blood_type: blood_type.value,
				civil_status: civil_status.value,
				extension_name: extension_name.value,
				gender: gender.value,
				addresses: JSON.stringify(addresses.value),
				relatives: JSON.stringify(relatives.value),
				dependents: JSON.stringify(dependents.value),
				active: 1,
			};

			console.log(data);
			// Checking form_data values

			for (var key in data) {
				form_data.append(key, data[key]);
			}

			if (selectedFileProfile.value) {
				form_data.append(
					"profile_image_path",
					selectedFileProfile.value
				);
			}

			if (selectedFileSignature.value) {
				form_data.append(
					"signatory_image_path",
					selectedFileSignature.value
				);
			}

			// for (var pair of form_data.entries()) {
			// 	console.log(pair[0] + ", " + pair[1]);
			// }

			await create("basicemployeeinformation", form_data);

			if (!error.value) {
				// displayAlert("success", "Employee Added");
				router.push({
					name: "view-employee",
					params: { id: response.value.id },
					query: { q: "employee added" },
				});
			} else {
				displayAlert("error", "Invalid Inputs");
			}
		};

		const contactTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.email) ||
				(error.value && error.value.errors.tel_no) ||
				(error.value && error.value.errors.mobile_no)
			);
		});

		const employeeTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.employee_id) ||
				(error.value && error.value.errors.first_name) ||
				(error.value && error.value.errors.last_name) ||
				(error.value && error.value.errors.citizenship) ||
				(error.value && error.value.errors.civil_status) ||
				(error.value && error.value.errors.gender) ||
				(error.value && error.value.errors.birthdate) ||
				(error.value && error.value.errors.birthplace)
			);
		});

		const otherInfoTabHasError = computed(() => {
			return error.value && error.value.errors.height;
		});

		const onProfileFileSelected = (e) => {
			selectedFileProfile.value = e.target.files[0];
			profile_image_path.value = URL.createObjectURL(
				selectedFileProfile.value
			);
		};

		const onSignatureFileSelected = (e) => {
			selectedFileSignature.value = e.target.files[0];
			signatory_image_path.value = URL.createObjectURL(
				selectedFileSignature.value
			);
		};

		onBeforeRouteLeave((to, from) => {
			const answer = window.confirm(
				"Do you really want to leave? you have unsaved changes!"
			);
			// cancel the navigation and stay on the same page
			if (!answer) return false;
		});

		return {
			employee_id,
			email,
			first_name,
			birthdate,
			birthplace,
			citizenship,
			tel_no,
			mobile_no,
			last_name,
			maiden_name,
			height,
			weight,
			blood_type,
			civil_status,
			extension_name,
			gender,

			selectedFileProfile,
			profile_image_path,
			onProfileFileSelected,

			selectedFileSignature,
			signatory_image_path,
			onSignatureFileSelected,

			handleSubmit,
			error,
			loading,
			response,
			alert,

			contactTabHasError,
			employeeTabHasError,
			otherInfoTabHasError,

			dependents,
			addDependent,
			deleteDependent,

			addAddress,
			addresses,
			deleteAddress,

			addRelative,
			relatives,
			deleteRelative,
		};
	},
};
</script>

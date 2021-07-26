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
					<h5 class="h4 mb-0 text-primary" v-if="item">
						{{ item.last_name }},
						{{ item.first_name }}
						{{ item.maiden_name }} {{ item.extension_name }}
						Information
					</h5>
					<h5 v-else class="h4 mb-0 text-primary">
						N/A
					</h5>
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
													!profile_image_path
											"
											:src="
												'http://127.0.0.1:8000/storage/' +
													item.profile_image_path
											"
											alt=""
											style="width: 90%"
										/>
										<img
											v-else-if="profile_image_path"
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
										<button
											v-if="item.profile_image_path"
											class="btn btn-sm btn-danger"
											@click="deleteProfileImage(item.id)"
											type="button"
										>
											Delete Profile
										</button>
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
													v-model="item.employee_id"
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

										<div class="form-group col-3">
											<label
												>Citizenship<span
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
												v-model="item.civil_status"
											>
												<option value=""
													>Choose ...</option
												>
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
											<label for=""
												>Tel No.
												<span
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
											<label
												>Mobile No.<span
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
									<div class="col-md-4">
										<h5 class="h5">Signature Image</h5>
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
										</label>
									</div>

									<div class="col-md-2">
										<img
											v-if="
												item.signatory_image_path &&
													!signatory_image_path
											"
											:src="
												'http://127.0.0.1:8000/storage/' +
													item.signatory_image_path
											"
											alt=""
											style="width: 90%"
										/>
										<img
											v-else-if="signatory_image_path"
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
										<button
											v-if="item.signatory_image_path"
											class="btn btn-sm btn-danger"
											@click="
												deleteSignatureImage(item.id)
											"
											type="button"
										>
											Delete Signature
										</button>
									</div>

									<div class="col-12 my-2">
										<hr />
									</div>
									<div class="col-4">
										<h5 class="h5">Biometrics</h5>
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
											:dependents="item.dependents"
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
								value="Save Changes"
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
					<div v-else>
						<Spinner />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { v4 as uuidv4 } from "uuid";
import feather from "feather-icons";
import axios from "@/axios/axios-instance";
import EmployeeAddressList from "./EmployeeAddressList.vue";
import EmployeeRelativeList from "./EmployeeRelativeList.vue";
import EmployeeDependentList from "./EmployeeDependentList.vue";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { useRoute, useRouter } from "vue-router";
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";
import getItem from "../../composables/getItem";

export default {
	name: "CreateCompany",
	components: {
		Alert,
		Spinner,
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
		const route = useRoute();
		const { error, response, loading, create, unknownError } = useData();
		const { item, error: errorData, load, loading: isLoading } = getItem(
			route.params.id,
			"basicemployeeinformation"
		);
		const { alert, displayAlert } = useAlert();

		onBeforeMount(async () => {
			await load();

			item.value.addresses = JSON.parse(item.value.addresses);
			item.value.relatives = JSON.parse(item.value.relatives);
			item.value.dependents = JSON.parse(item.value.dependents);
			// console.log(item.value.addresses)
			console.log(item.value);
		});

		const selectedProfileFile = ref(null);
		const profile_image_path = ref(null);

		const selectedSignatureFile = ref(null);
		const signatory_image_path = ref(null);

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
				if (!address.city || !address.country) {
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
			item.value.dependents.forEach((dependent) => {
				if (!dependent.full_name) {
					err = true;
				}
			});

			err
				? displayAlert(
						"info",
						"Please fill out full name in dependent list before adding one"
				  )
				: item.value.dependents.push(tempDependent);
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

		const deleteDependent = (id) => {
			console.log("this id will be deleted: ", id);
			if (
				confirm("Are you sure you want to delete the dependent?") &&
				item.value.dependents.length !== 1
			) {
				item.value.dependents = item.value.dependents.filter(
					(dependent) => dependent.id !== id
				);
			} else {
				displayAlert("info", "Employee need atleast 1 dependent");
			}
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
				dependents: JSON.stringify(item.value.dependents),
				active: 1,
			};

			console.log(data);
			// Checking form_data values

			for (var key in data) {
				form_data.append(key, data[key]);
			}

			if (selectedProfileFile.value) {
				form_data.append(
					"profile_image_path",
					selectedProfileFile.value
				);
			}

			if (selectedSignatureFile.value) {
				form_data.append(
					"signatory_image_path",
					selectedSignatureFile.value
				);
			}

			for (var pair of form_data.entries()) {
				console.log(pair[0] + ", " + pair[1]);
			}

			const res = await create(
				`basicemployeeinformation/${route.params.id}?_method=PATCH`,
				form_data
			);

			if (!error.value) {
				if (selectedProfileFile.value) {
					item.value.profile_image_path = res.profile_image_path;
					selectedProfileFile.value = null;
					profile_image_path.value = null;
				}

				if (selectedSignatureFile.value) {
					item.value.signatory_image_path = res.signatory_image_path;
					selectedSignatureFile.value = null;
					signatory_image_path.value = null;
				}

				displayAlert("info", "Employee Updated");
			} else {
				displayAlert("error", "Invalid Inputs");
			}
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

		const onProfileFileSelected = (e) => {
			selectedProfileFile.value = e.target.files[0];
			profile_image_path.value = URL.createObjectURL(
				selectedProfileFile.value
			);
		};

		const onSignatureFileSelected = (e) => {
			selectedSignatureFile.value = e.target.files[0];
			signatory_image_path.value = URL.createObjectURL(
				selectedSignatureFile.value
			);
		};

		const deleteProfileImage = async (id) => {
			if (confirm("Are you sure you want to delete this image?")) {
				const res = await axios.delete(
					"/basicemployeeinformation/deleteProfileImage/" + id
				);
				item.value.profile_image_path = null;
			}
		};

		const deleteSignatureImage = async (id) => {
			if (confirm("Are you sure you want to delete this image?")) {
				const res = await axios.delete(
					"/basicemployeeinformation/deleteSignatoryImage/" + id
				);
				item.value.signatory_image_path = null;
			}
		};

		return {
			deleteProfileImage,
			deleteSignatureImage,

			selectedProfileFile,
			profile_image_path,
			onProfileFileSelected,

			selectedSignatureFile,
			signatory_image_path,
			onSignatureFileSelected,

			item,

			handleSubmit,
			error,
			loading,
			response,

			alert,

			commTabHasError,
			mainTabHasError,
			connTabHasError,

			addAddress,
			deleteAddress,

			addRelative,
			deleteRelative,

			addDependent,
			deleteDependent,
		};
	},
};
</script>

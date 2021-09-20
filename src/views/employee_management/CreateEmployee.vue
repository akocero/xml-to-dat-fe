<template>
	<EmployeeRelativeModal
		@addRelative="addRelative($event)"
		@updateRelative="updateRelative($event)"
		:data="forEditRelative"
	/>
	<EmployeeAddressModal
		@addAddress="addAddress($event)"
		@updateAddress="updateAddress($event)"
		:data="forEditAddress"
	/>
	<EmployeeDependentModal
		@addDependent="addDependent($event)"
		@updateDependent="updateDependent($event)"
		:data="forEditDependent"
	/>
	<div class="card boiler shadow-md">
		<div class="card-body">
			<ThePageHeader
				heading="New Employee"
				routeName="employee-management"
				mode="create"
			/>

			<div class="row">
				<div class="col-12">
					<BaseNavigationTab
						:properties="[
							{
								id: 'employee',
								label: 'Employee Info',
								error: employeeTabHasError,
								active: true,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'contact',
								label: 'Contact Info',
								error: contactTabHasError,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'other',
								label: 'Other Info',
								error: otherTabHasError,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'payroll-setup',
								label: 'Payroll Setup',
								error: null,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'hr-setup',
								label: 'HR Setup',
								error: null,
								active: false,
								disabled: false,
								tooltip: null,
							},
						]"
					/>
					<form @submit.prevent="handleSubmit" id="form_create_user">
						<div class="tab-content pt-3" id="pills-tabContent">
							<div
								class="tab-pane fade show active"
								id="pills-employee"
								role="tabpanel"
								aria-labelledby="pills-employee-tab"
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
											1000KB/1MB.</small
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
									<BaseRowHeading
										heading="Main Information"
										para="Add employee's basic personal
											information."
									/>

									<div class="row col-8">
										<div class="row col-12">
											<div class="form-group col-4">
												<BaseInputField
													id="input_employee_id"
													type="text"
													label="Employee ID"
													v-model="employee_id"
													:error="error"
													:errorField="
														error?.errors
															?.employee_id ||
															null
													"
													placeholder="Ex. 1234567"
													:required="true"
												/>
											</div>
										</div>
										<div class="form-group col-4">
											<BaseInputField
												id="input_first_name"
												type="text"
												label="First Name"
												v-model="first_name"
												:error="error"
												:errorField="
													error?.errors?.first_name ||
														null
												"
												placeholder="Ex. Juan"
												:required="true"
											/>
										</div>

										<div class="form-group col-3">
											<BaseInputField
												id="input_last_name"
												type="text"
												label="Last Name"
												v-model="last_name"
												:error="error"
												:errorField="
													error?.errors?.last_name ||
														null
												"
												placeholder="Ex. Dela Cruz"
												:required="true"
											/>
										</div>

										<div class="form-group col-3">
											<BaseInputField
												id="input_maiden_name"
												type="text"
												label="Middle Name"
												v-model="maiden_name"
												:error="error"
												:errorField="
													error?.errors
														?.maiden_name || null
												"
												placeholder="Ex. Santos"
												:required="false"
											/>
										</div>
										<div class="form-group col-2">
											<BaseInputField
												id="input_extension_name"
												type="text"
												label="Suffix"
												v-model="extension_name"
												:error="error"
												:errorField="
													error?.errors
														?.extension_name || null
												"
												placeholder="Ex. Jr"
												:required="false"
											/>
										</div>

										<div class="form-group col-2">
											<BaseSelectField
												id="input_gender"
												label="Gender"
												v-model="gender"
												:error="error"
												:errorField="
													error?.errors?.gender ||
														null
												"
												:options="[
													{
														value: 'male',
														label: 'Male',
													},
													{
														value: 'female',
														label: 'Female',
													},
													{
														value: 'others',
														label: 'Others',
													},
												]"
												:required="true"
											/>
										</div>
										<div class="form-group col-3">
											<BaseInputField
												id="input_birthdate"
												type="date"
												label="Birthdate"
												v-model="birthdate"
												:error="error"
												:errorField="
													error?.errors?.birthdate ||
														null
												"
												placeholder="Ex. Jr"
												:required="true"
											/>
										</div>
										<div class="form-group col-4">
											<BaseInputField
												id="input_birthplace"
												type="text"
												label="Birth Place"
												v-model="birthplace"
												:error="error"
												:errorField="
													error?.errors?.birthplace ||
														null
												"
												placeholder="Ex. Manila"
												:required="true"
											/>
										</div>
										<div class="form-group col-3">
											<BaseInputField
												id="input_citizenship"
												type="text"
												label="Citizenship"
												v-model="citizenship"
												:error="error"
												:errorField="
													error?.errors
														?.citizenship || null
												"
												placeholder="Ex. Filipino"
												:required="true"
											/>
										</div>
										<div class="form-group col-4">
											<BaseSelectField
												id="input_civil_status"
												label="Civil Status"
												v-model="civil_status"
												:error="error"
												:errorField="
													error?.errors
														?.civil_status || null
												"
												:options="[
													{
														value: 'single',
														label: 'Single',
													},
													{
														value: 'married',
														label: 'Married',
													},
													{
														value: 'widow',
														label: 'Widow',
													},
												]"
												:required="true"
											/>
										</div>
									</div>
								</div>
							</div>
							<div
								class="tab-pane fade"
								id="pills-contact"
								role="tabpanel"
								aria-labelledby="pills-contact-tab"
							>
								<div class="row">
									<BaseRowHeading
										heading="Contact Info"
										para="Add employee's contact information."
									/>

									<div class="row col-8">
										<div class="form-group col-6">
											<BaseInputField
												id="input_email"
												type="email"
												label="Email"
												v-model="email"
												:error="error"
												:errorField="
													error?.errors?.email || null
												"
												placeholder="Ex. johndoe@example.com"
												:required="true"
											/>
										</div>
										<div class="form-group col-6">
											<BaseInputField
												id="input_tel_no"
												type="text"
												label="Tel No."
												v-model="tel_no"
												:error="error"
												:errorField="
													error?.errors?.tel_no ||
														null
												"
												placeholder="Ex. 1233334"
												:required="false"
											/>
										</div>

										<div class="form-group col-6">
											<BaseInputField
												id="input_mobile_no"
												type="number"
												label="Mobile No."
												v-model="mobile_no"
												:error="error"
												:errorField="
													error?.errors?.mobile_no ||
														null
												"
												placeholder="Ex. 09999252144"
												:required="true"
											/>
										</div>
									</div>
								</div>
								<hr />
								<div class="row">
									<div
										class="col-12 d-flex justify-content-between align-items-center"
									>
										<h5 class="h5 mb-0">Address List</h5>
										<button
											type="button"
											class="btn btn-sm btn-primary"
											data-toggle="modal"
											data-target="#employee-address-modal"
											data-backdrop="static"
											data-keyboard="false"
											@click="forEditAddress = ''"
										>
											<i v-html="iPlus"></i>
										</button>
									</div>
									<div class="col-md-12">
										<EmployeeAddressTable
											:addresses="addresses"
											@deleteAddress="
												deleteAddress($event)
											"
											@forEditAddress="
												forEditAddress = { ...$event }
											"
										/>
									</div>
								</div>
								<hr />
								<div class="row">
									<div
										class="col-12 d-flex justify-content-between align-items-center"
									>
										<h5 class="h5 mb-0">Relative List</h5>
										<button
											type="button"
											class="btn btn-sm btn-primary"
											data-toggle="modal"
											data-target="#employee-relative-modal"
											data-backdrop="static"
											data-keyboard="false"
											@click="forEditRelative = ''"
										>
											<i v-html="iPlus"></i>
										</button>
									</div>
									<div class="col-12">
										<EmployeeRelativeTable
											:relatives="relatives"
											@deleteRelative="
												deleteRelative($event)
											"
											@forEditRelative="
												forEditRelative = { ...$event }
											"
										/>
									</div>
								</div>
								<hr />
								<div class="row">
									<BaseRowHeading
										heading="Social Media"
										para="Include social media accounts of the
											employee to keep them engaged with
											company activities and updates."
									/>
									<div class="row col-8"></div>
								</div>
							</div>
							<div
								class="tab-pane fade"
								id="pills-other"
								role="tabpanel"
								aria-labelledby="pills-other-tab"
							>
								<div class="row">
									<BaseRowHeading
										heading="Signature Image"
										para="Upload Employee Signature to be used
											for Employee ID and other documents."
									/>

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

									<BaseRowHeading
										heading="Biometrics"
										para="Update employee's additional vital
											health information."
									/>

									<div class="row col-8">
										<div class="form-group col-6">
											<BaseInputField
												id="input_height"
												type="text"
												label="Height"
												v-model="height"
												:error="error"
												:errorField="
													error?.errors?.height ||
														null
												"
												placeholder="Ex. 183 cm"
												:required="false"
											/>
										</div>
										<div class="form-group col-6">
											<BaseInputField
												id="input_weight"
												type="text"
												label="Weight"
												v-model="weight"
												:error="error"
												:errorField="
													error?.errors?.weight ||
														null
												"
												placeholder="Ex. 70 kilos"
												:required="false"
											/>
										</div>

										<div class="form-group col-6">
											<BaseInputField
												id="input_blood_type"
												type="text"
												label="Blood Type"
												v-model="blood_type"
												:error="error"
												:errorField="
													error?.errors?.blood_type ||
														null
												"
												placeholder="Ex. O+"
												:required="false"
											/>
										</div>
									</div>
									<div class="col-12 my-2">
										<hr />
									</div>

									<div class="row col-12">
										<div
											class="col-12 d-flex justify-content-between align-items-center"
										>
											<h5 class="h5 mb-0">
												Dependent List
											</h5>
											<button
												type="button"
												class="btn btn-sm btn-primary"
												data-toggle="modal"
												data-target="#employee-dependent-modal"
												data-backdrop="static"
												data-keyboard="false"
												@click="forEditDependent = ''"
											>
												<i v-html="iPlus"></i>
											</button>
										</div>

										<div class="col-12">
											<EmployeeDependentTable
												:dependents="dependents"
												@deleteDependent="
													deleteDependent($event)
												"
												@forEditDependent="
													forEditDependent = {
														...$event,
													}
												"
											/>
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
import feather from "feather-icons";
import EmployeeRelativeModal from "./EmployeeRelativeModal.vue";
import EmployeeDependentModal from "./EmployeeDependentModal.vue";
import EmployeeAddressModal from "./EmployeeAddressModal.vue";
import EmployeeRelativeTable from "./EmployeeRelativeTable.vue";
import EmployeeAddressTable from "./EmployeeAddressTable.vue";
import EmployeeDependentTable from "./EmployeeDependentTable.vue";
import Alert from "@/components/Alert";
import ThePageHeader from "@/components/layouts/ThePageHeader";
import BaseNavigationTab from "@/components/BaseNavigationTab";
import BaseRowHeading from "@/components/BaseRowHeading";
import BaseSelectField from "@/components/BaseSelectField";
import BaseInputField from "@/components/BaseInputField";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";
import endpoints from "@/utils/endpoints";

export default {
	name: "CreateCompany",
	components: {
		Alert,
		EmployeeRelativeTable,
		EmployeeAddressTable,
		EmployeeDependentTable,
		EmployeeAddressModal,
		EmployeeDependentModal,
		EmployeeRelativeModal,
		ThePageHeader,
		BaseNavigationTab,
		BaseInputField,
		BaseSelectField,
		BaseRowHeading,
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
		iPlus: function() {
			return feather.icons["plus"].toSvg({
				width: 18,
			});
		},
	},
	setup() {
		const router = useRouter();
		const { error, response, loading, create, unknownError } = useData();
		const { pushAlert } = useAlert();

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
		const addresses = ref([]);
		const relatives = ref([]);
		const dependents = ref([]);

		const selectedFileProfile = ref(null);
		const profile_image_path = ref(null);

		const selectedFileSignature = ref(null);
		const signatory_image_path = ref(null);

		const employeeAdded = ref(false);

		const forEditRelative = ref("");
		const forEditAddress = ref("");
		const forEditDependent = ref("");

		const updateAddress = (data) => {
			addresses.value = addresses.value.map((address) => {
				let tempAddress = address;
				if (address.id === data.id) {
					tempAddress = data;
				}
				return tempAddress;
			});
			$("#employee-address-modal").modal("hide");
			pushAlert("info", "Address Updated");
		};

		const updateRelative = (data) => {
			relatives.value = relatives.value.map((relative) => {
				let tempRelative = relative;
				if (relative.id === data.id) {
					tempRelative = data;
				}
				return tempRelative;
			});
			$("#employee-relative-modal").modal("hide");
			pushAlert("info", "Relative Updated");
		};

		const updateDependent = (data) => {
			dependents.value = dependents.value.map((depedent) => {
				let tempDependent = depedent;
				if (depedent.id === data.id) {
					tempDependent = data;
				}
				return tempDependent;
			});
			$("#employee-dependent-modal").modal("hide");
			pushAlert("info", "Dependent Updated");
		};

		const addAddress = (data) => {
			addresses.value.push(data);
			$("#employee-address-modal").modal("hide");
			pushAlert("success", "Address Added");
		};

		const addDependent = (data) => {
			dependents.value.push(data);
			$("#employee-dependent-modal").modal("hide");
			pushAlert("success", "dependent Added");
		};

		const addRelative = (data) => {
			relatives.value.push(data);
			$("#employee-relative-modal").modal("hide");
			pushAlert("success", "Relative Added");
		};

		const deleteDependent = (id) => {
			console.log("this id will be deleted: ", id);
			if (dependents.value.length > 1) {
				if (confirm("Are you sure you want to delete the dependent?")) {
					dependents.value = dependents.value.filter(
						(dependent) => dependent.id !== id
					);
				}
			} else {
				pushAlert("warning", "Employee need atleast one dependent");
			}
		};

		const deleteAddress = (id) => {
			console.log("this id will be deleted: ", id);
			if (addresses.value.length > 1) {
				if (confirm("Are you sure you want to delete the address?")) {
					addresses.value = addresses.value.filter(
						(address) => address.id !== id
					);
				}
			} else {
				pushAlert("warning", "Employee need atleast one address");
			}
		};

		const deleteRelative = (id) => {
			console.log("this id will be deleted: ", id);
			if (relatives.value.length > 1) {
				if (confirm("Are you sure you want to delete the relative?")) {
					relatives.value = relatives.value.filter(
						(relative) => relative.id !== id
					);
				}
			} else {
				pushAlert("warning", "Employee need atleast one relative");
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

			await create(endpoints.employee, form_data);

			if (!error.value) {
				// pushAlert("success", "Employee Added");
				employeeAdded.value = true;
				router.push({
					name: "edit-employee",
					params: { id: response.value.id },
					query: { q: "employee added" },
				});
			} else {
				pushAlert("error", "Invalid Inputs");
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

		const otherTabHasError = computed(() => {
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
			if (!employeeAdded.value) {
				const answer = window.confirm(
					"Do you really want to leave? you have unsaved changes!"
				);
				// cancel the navigation and stay on the same page
				if (!answer) return false;
			}
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
			dependents,
			relatives,
			addresses,

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

			contactTabHasError,
			employeeTabHasError,
			otherTabHasError,

			addAddress,
			deleteAddress,
			updateRelative,

			addRelative,
			deleteRelative,
			updateAddress,

			addDependent,
			deleteDependent,
			updateDependent,

			forEditRelative,
			forEditAddress,
			forEditDependent,
		};
	},
};
</script>

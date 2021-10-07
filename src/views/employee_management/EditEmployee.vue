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
				v-if="item"
				:heading="
					`${item.last_name},
						${item.first_name} 
						 ${item.maiden_name || ''} ${item.extension_name || ''}`
				"
				routeName="employee-management"
				mode="edit"
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
					<form
						@submit.prevent="handleSubmit"
						id="form_edit_employee"
						v-if="item"
					>
						<div class="tab-content pt-3" id="pills-tabContent">
							<div
								class="tab-pane fade show active"
								id="pills-employee"
								role="tabpanel"
								aria-labelledby="pills-employee-tab"
							>
								<div class="row pr-3">
									<BaseRowHeading
										heading="Profile Image"
										para="This profile image is optional. The employee's image may be used for his/her ID, and other documents. Please upload a recent photo."
									/>

									<div class="col-md-2">
										<BaseImageField
											:image_path="profile_image_path"
											:database="item?.profile_image_path"
										/>
									</div>

									<div class="form-group col-md-6">
										<BaseInputFileField
											id="input_profile_image_path"
											label="Upload Profile Image"
											@fileSelected="
												onProfileFileSelected($event)
											"
											:error="error"
											:errorField="
												error?.errors
													?.profile_image_path || null
											"
											:required="false"
										/>
										<br />
										<button
											v-if="item.profile_image_path"
											class="btn btn-sm btn-danger"
											@click="
												handleDeleteProfileImage(
													item.id
												)
											"
											type="button"
										>
											Delete Profile
										</button>
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
													v-model="item.employee_id"
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
												v-model="item.first_name"
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
												v-model="item.last_name"
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
												v-model="item.maiden_name"
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
												v-model="item.extension_name"
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
												v-model="item.gender"
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
												v-model="item.birthdate"
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
												v-model="item.birthplace"
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
												v-model="item.citizenship"
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
												v-model="item.civil_status"
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
												v-model="item.email"
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
												v-model="item.tel_no"
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
												v-model="item.mobile_no"
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
											:addresses="item.addresses"
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
											:relatives="item.relatives"
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
										para="You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com"
									/>

									<div class="row col-8">
										<!-- <div class="error">{{ error }}</div> -->
									</div>
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
										para="You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com"
									/>

									<div class="col-md-2">
										<BaseImageField
											:image_path="signatory_image_path"
											:database="
												item?.signatory_image_path
											"
										/>
									</div>

									<div class="form-group col-md-6">
										<BaseInputFileField
											id="input_signatory_image_path"
											label="Upload Signature Image"
											@fileSelected="
												onSignatureFileSelected($event)
											"
											:error="error"
											:errorField="
												error?.errors
													?.signatory_image_path ||
													null
											"
											:required="false"
										/>
										<br />
										<button
											v-if="item.signatory_image_path"
											class="btn btn-sm btn-danger"
											@click="
												handleDeleteSignatureImage(
													item.id
												)
											"
											type="button"
										>
											Delete Signature
										</button>
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
												v-model="item.height"
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
												v-model="item.weight"
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
												v-model="item.blood_type"
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
												:dependents="item.dependents"
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
							<div
								class="tab-pane fade"
								id="pills-payroll-setup"
								role="tabpanel"
								aria-labelledby="pills-payroll-setup-tab"
							>
								<div class="row pb-3">
									<BaseRowHeading
										heading="Payroll Parameter Information"
										para="You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com"
									/>

									<div class="row col-8">
										<div class="form-group col-4">
											<BaseSelectWithButtonField
												id="input_halfday_saturday"
												label="Payroll Parameter"
												v-model="item.halfday_saturday"
												:error="error"
												:errorField="
													error?.errors
														?.halfday_saturday ||
														null
												"
												:options="[
													{
														value: 0,
														label: 'Disabled',
													},
													{
														value: 1,
														label: 'Enabled',
													},
												]"
												:required="false"
												:emptyOption="false"
												:buttonEditProperties="{
													name: 'nyaw',
												}"
											/>
										</div>
										<div class="form-group col-4">
											<BaseSelectField
												id="input_halfday_saturday"
												label="Payroll Frequency"
												v-model="item.halfday_saturday"
												:error="error"
												:errorField="
													error?.errors
														?.halfday_saturday ||
														null
												"
												:options="[
													{
														value: 0,
														label: 'Disabled',
													},
													{
														value: 1,
														label: 'Enabled',
													},
												]"
												:required="false"
												:emptyOption="false"
											/>
										</div>
										<div class="form-group col-4">
											<BaseSelectField
												id="input_halfday_saturday"
												label="Productivity Type"
												v-model="item.halfday_saturday"
												:error="error"
												:errorField="
													error?.errors
														?.halfday_saturday ||
														null
												"
												:options="[
													{
														value: 0,
														label: 'Disabled',
													},
													{
														value: 1,
														label: 'Enabled',
													},
												]"
												:required="false"
												:emptyOption="false"
											/>
										</div>
										<div class="form-group col-4">
											<BaseSelectWithButtonField
												id="input_halfday_saturday"
												label="Workhour Type"
												v-model="item.halfday_saturday"
												:error="error"
												:errorField="
													error?.errors
														?.halfday_saturday ||
														null
												"
												:options="[
													{
														value: 0,
														label: 'Disabled',
													},
													{
														value: 1,
														label: 'Enabled',
													},
												]"
												:required="false"
												:emptyOption="false"
												:buttonEditProperties="{
													name: 'nyaw',
												}"
											/>
										</div>
										<div class="form-group col-4">
											<BaseSelectField
												id="input_halfday_saturday"
												label="Day Off"
												v-model="item.halfday_saturday"
												:error="error"
												:errorField="
													error?.errors
														?.halfday_saturday ||
														null
												"
												:options="[
													{
														value: 0,
														label: 'Disabled',
													},
													{
														value: 1,
														label: 'Enabled',
													},
												]"
												:required="false"
												:emptyOption="false"
											/>
										</div>
									</div>
								</div>
								<hr />
								<div class="row pb-3">
									<BaseRowHeading
										heading="Payroll Parameter"
										para="You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com"
									/>

									<div class="row col-8"></div>
								</div>
							</div>
							<div
								class="tab-pane fade"
								id="pills-hr-setup"
								role="tabpanel"
								aria-labelledby="pills-hr-setup-tab"
							>
								<div class="row">
									<BaseRowHeading
										heading="HR Setup Fields"
										para="You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com"
									/>
									<div class="col-8">
										<div class="row">
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
											<div class="form-group col-6">
												<BaseSelectField
													id="input_gender"
													label="Gender"
													v-model="item.gender"
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
import feather from "feather-icons";
import EmployeeRelativeModal from "./EmployeeRelativeModal.vue";
import EmployeeDependentModal from "./EmployeeDependentModal.vue";
import EmployeeAddressModal from "./EmployeeAddressModal.vue";
import EmployeeRelativeTable from "./EmployeeRelativeTable.vue";
import EmployeeAddressTable from "./EmployeeAddressTable.vue";
import EmployeeDependentTable from "./EmployeeDependentTable.vue";
import BaseNavigationTab from "@/components/BaseNavigationTab";
import Alert from "@/components/Alert";
import BaseSelectField from "@/components/BaseSelectField";
import BaseSelectWithButtonField from "@/components/BaseSelectWithButtonField";
import BaseImageField from "@/components/BaseImageField";
import BaseInputField from "@/components/BaseInputField";
import BaseInputFileField from "@/components/BaseInputFileField";
import BaseRowHeading from "@/components/BaseRowHeading";
import ThePageHeader from "@/components/layouts/ThePageHeader";
import Spinner from "@/components/Spinner";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import useData from "@/composables/useData";
import useImage from "@/composables/useImage";
import useAlert from "@/composables/useAlert";
import getItem from "../../composables/getItem";
import endpoints from "@/utils/endpoints";

export default {
	name: "CreateCompany",
	components: {
		Alert,
		Spinner,
		ThePageHeader,
		BaseNavigationTab,
		BaseSelectField,
		EmployeeRelativeTable,
		EmployeeAddressTable,
		EmployeeDependentTable,
		EmployeeAddressModal,
		EmployeeDependentModal,
		EmployeeRelativeModal,
		BaseRowHeading,
		BaseInputField,
		BaseImageField,
		BaseInputFileField,
		BaseSelectWithButtonField,
	},
	computed: {
		iEdit: function() {
			return feather.icons["edit"].toSvg({
				width: 18,
			});
		},
		iPlus: function() {
			return feather.icons["plus"].toSvg({
				width: 18,
			});
		},
		iView: function() {
			return feather.icons["eye"].toSvg({
				width: 18,
			});
		},
		iTrash: function() {
			return feather.icons["trash"].toSvg({
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
			endpoints.employee
		);
		const { pushAlert } = useAlert();

		const {
			image: profile_image_path,
			selectedFile: selectedProfileFile,
			onFileSelected: onProfileFileSelected,
			deleteImage: deleteProfileImage,
		} = useImage();

		const {
			image: signatory_image_path,
			selectedFile: selectedSignatureFile,
			onFileSelected: onSignatureFileSelected,
			deleteImage: deleteSignatureImage,
		} = useImage();

		onBeforeMount(async () => {
			await load();
			item.value.addresses = JSON.parse(item.value.addresses);
			item.value.relatives = JSON.parse(item.value.relatives);
			item.value.dependents = JSON.parse(item.value.dependents);
			// console.log(item.value.addresses)
			console.log(item.value);
		});

		const forEditRelative = ref("");
		const forEditAddress = ref("");
		const forEditDependent = ref("");

		const updateAddress = (data) => {
			item.value.addresses = item.value.addresses.map((address) => {
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
			item.value.relatives = item.value.relatives.map((relative) => {
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
			item.value.dependents = item.value.dependents.map((depedent) => {
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
			item.value.addresses.push(data);
			$("#employee-address-modal").modal("hide");
			pushAlert("success", "Address Added");
		};

		const addDependent = (data) => {
			item.value.dependents.push(data);
			$("#employee-dependent-modal").modal("hide");
			pushAlert("success", "dependent Added");
		};

		const addRelative = (data) => {
			item.value.relatives.push(data);
			$("#employee-relative-modal").modal("hide");
			pushAlert("success", "Relative Added");
		};

		const deleteDependent = (id) => {
			console.log("this id will be deleted: ", id);
			if (item.value.dependents.length > 1) {
				if (confirm("Are you sure you want to delete the dependent?")) {
					item.value.dependents = item.value.dependents.filter(
						(dependent) => dependent.id !== id
					);
				}
			} else {
				pushAlert("warning", "Employee need atleast one dependent");
			}
		};

		const deleteAddress = (id) => {
			console.log("this id will be deleted: ", id);
			if (item.value.addresses.length > 1) {
				if (confirm("Are you sure you want to delete the address?")) {
					item.value.addresses = item.value.addresses.filter(
						(address) => address.id !== id
					);
				}
			} else {
				pushAlert("warning", "Employee need atleast one address");
			}
		};

		const deleteRelative = (id) => {
			console.log("this id will be deleted: ", id);
			if (item.value.relatives.length > 1) {
				if (confirm("Are you sure you want to delete the relative?")) {
					item.value.relatives = item.value.relatives.filter(
						(relative) => relative.id !== id
					);
				}
			} else {
				pushAlert("warning", "Employee need atleast one relative");
			}
		};

		onBeforeRouteLeave((to, from) => {
			const answer = window.confirm(
				"Do you really want to leave? you have unsaved changes!"
			);
			// cancel the navigation and stay on the same page
			if (!answer) return false;
		});

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
				if (data[key] !== "null" && data[key] !== null) {
					form_data.append(key, data[key]);
				}
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

			// for (var pair of form_data.entries()) {
			// 	console.log(pair[0] + ", " + pair[1]);
			// }

			const res = await create(
				`${endpoints.employee}/${route.params.id}?_method=PATCH`,
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

				pushAlert("info", "Employee Updated");
			} else {
				pushAlert("error", "Invalid Inputs");
			}
		};

		const contactTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.email) ||
				(error.value && error.value.errors.mobile_no)
			);
		});

		const employeeTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.employee_id) ||
				(error.value && error.value.errors.first_name) ||
				(error.value && error.value.errors.last_name) ||
				(error.value && error.value.errors.address)
			);
		});

		const otherTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.height) ||
				(error.value && error.value.errors.tin_no) ||
				(error.value && error.value.errors.hdmf_no) ||
				(error.value && error.value.errors.tax_branch_code) ||
				(error.value && error.value.errors.alphalist_no)
			);
		});

		const handleDeleteProfileImage = async (id) => {
			if (confirm("Are you sure you want to delete this image?")) {
				const res = await deleteProfileImage(
					`${endpoints.employeeImageProfile}/${id}`
				);

				if (res.status === 204) {
					item.value.profile_image_path = null;
					pushAlert("success", "Profile Image Deleted");
				} else {
					pushAlert("error", "Error Deleting Image");
				}
			}
		};

		const handleDeleteSignatureImage = async (id) => {
			if (confirm("Are you sure you want to delete this image?")) {
				const res = await deleteSignatureImage(
					`${endpoints.employeeImageSignatory}/${id}`
				);

				if (res.status === 204) {
					item.value.signatory_image_path = null;
					pushAlert("success", "Signatory Image Deleted");
				} else {
					pushAlert("error", "Error Deleting Image");
				}
			}
		};

		return {
			handleDeleteProfileImage,
			handleDeleteSignatureImage,

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

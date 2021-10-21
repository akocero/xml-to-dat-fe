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
						 ${item.maiden_name} ${item.extension_name}
						Information`
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
							<!-- hrsetup -->
							<div
								class="tab-pane fade"
								id="pills-hr-setup"
								role="tabpanel"
								aria-labelledby="pills-hr-setup-tab"
							>
								<div class="row pb-3">
									<BaseRowHeading
										heading="Employee Class"
										para="Specify your employee's class."
									/>

									<div class="row col-8">
										<div class="form-group col-4">
											<BaseSelectField
												id="employee_class_id"
												label="Employee Class"
												v-model="item.employee_class_id"
												:error="error"
												:errorField="
													error?.errors
														?.employee_class_id ||
														null
												"
												:options="
													employee_classes_array || []
												"
												:required="false"
											/>
										</div>
										<div class="form-group col-8">
											<label for="">Tags</label><br />

											<div
												v-if="
													employeeClassClasses &&
														employeeClassClasses[0]
															.classes
												"
											>
												<span
													class="custom-badge custom-badge-info"
													v-for="tag in employeeClassClasses[0]
														.classes"
													:key="tag"
												>
													{{ tag }}
												</span>
											</div>
										</div>
									</div>
								</div>
								<hr />
								<div class="row pb-3 pr-3">
									<BaseRowHeading
										heading="Resignation Information"
										para="You can specify resignation data of resigned employee"
									/>

									<div class="row col-8">
										<div class="form-group col-4">
											<BaseSelectField
												id="select_resigned"
												label="Resigned"
												v-model="item.resigned"
												:error="error"
												:errorField="
													error?.errors?.resigned ||
														null
												"
												:options="[
													{
														value: 0,
														label: 'No',
													},
													{
														value: 1,
														label: 'Yes',
													},
												]"
												:required="false"
												:emptyOption="false"
											/>
										</div>
										<div
											class="form-group col-4"
											v-if="item.resigned == '1'"
										>
											<BaseInputField
												id="resignation_date"
												type="date"
												label="Resignation Date"
												v-model="item.resignation_date"
												:error="error"
												:errorField="
													error?.errors
														?.resignation_date ||
														null
												"
												:required="false"
											/>
										</div>
										<div
											class="form-group col-4"
											v-if="item.resigned == '1'"
										>
											<BaseSelectField
												id="separation_reason"
												label="Reason of Separation"
												v-model="item.separation_reason"
												:error="error"
												:errorField="
													error?.errors
														?.separation_reason ||
														null
												"
												:options="[
													{
														value: 'resigned',
														label: 'Resigned',
													},
													{
														value: 'terminated',
														label: 'Terminated',
													},
													{
														value: 'transferred',
														label: 'Transferred',
													},
													{
														value: 'retired',
														label: 'Retired',
													},
													{
														value: 'death',
														label: 'Death',
													},
												]"
												:required="false"
											/>
										</div>
									</div>
								</div>
								<hr />
								<div class="row pb-3">
									<BaseRowHeading
										heading="General Information"
										para="Update employee's HR general information."
									/>
									<div class="row col-8">
										<div class="form-group col-4">
											<BaseSelectField
												id="employee_rank_id"
												label="Employee Rank"
												v-model="item.employee_rank_id"
												:error="error"
												:errorField="
													error?.errors
														?.employee_rank_id ||
														null
												"
												:options="
													employee_ranks_array || []
												"
												:required="false"
											/>
										</div>
										<div class="form-group col-4">
											<BaseSelectField
												id="branch_id"
												label="Branch Code"
												v-model="item.branch_id"
												:error="error"
												:errorField="
													error?.errors?.branch_id ||
														null
												"
												:options="branches_array || []"
												:required="false"
											/>
										</div>
										<div class="form-group col-4">
											<BaseInputField
												id="region"
												label="Region"
												v-model="item.region"
												:error="error"
												:errorField="
													error?.errors?.region ||
														null
												"
												:required="false"
												placeholder="Ex. Metro Manila"
											/>
										</div>
										<div class="form-group col-4">
											<BaseSelectField
												id="cost_center_id"
												label="Cost Center Code"
												v-model="item.cost_center_id"
												:error="error"
												:errorField="
													error?.errors
														?.cost_center_id || null
												"
												:options="
													cost_centers_array || []
												"
												:required="false"
											/>
										</div>
										<div class="form-group col-4">
											<BaseSelectField
												id="department_id"
												label="Department"
												v-model="item.department_id"
												:error="error"
												:errorField="
													error?.errors
														?.department_id || null
												"
												:options="
													departments_array || []
												"
												:required="false"
											/>
										</div>
										<div class="form-group col-4">
											<BaseSelectField
												id="sub_department_id"
												label="Sub-department"
												v-model="item.sub_department_id"
												:error="error"
												:errorField="
													error?.errors
														?.sub_department_id ||
														null
												"
												:options="
													sub_departments_array || []
												"
												:required="false"
											/>
										</div>
										<div class="form-group col-4">
											<BaseInputField
												id="date_employed"
												type="date"
												label="Date Employed"
												v-model="item.date_employed"
												:error="error"
												:errorField="
													error?.errors
														?.date_employed || null
												"
												:required="false"
											/>
										</div>
										<div class="form-group col-4">
											<BaseInputField
												id="last_merit"
												type="date"
												label="Last Merit"
												v-model="item.last_merit"
												:error="error"
												:errorField="
													error?.errors?.last_merit ||
														null
												"
												:required="false"
											/>
										</div>
										<div class="form-group col-4">
											<BaseInputField
												id="nationality"
												label="Nationality"
												v-model="item.nationality"
												:error="error"
												:errorField="
													error?.errors
														?.nationality || null
												"
												:required="false"
											/>
										</div>

										<div class="form-group col-4">
											<BaseSelectField
												id="dimension_id"
												label="Dimension"
												v-model="item.dimension_id"
												:error="error"
												:errorField="
													error?.errors
														?.dimension_id || null
												"
												:options="
													dimensions_array || []
												"
												:required="false"
											/>
										</div>
									</div>
								</div>
								<hr />
								<div class="row pb-3">
									<BaseRowHeading
										heading="Government Information"
										para="Update employee's HR government information."
									/>

									<div class="row col-8">
										<div class="form-group col-4">
											<BaseInputField
												id="tin_no"
												label="Tin No."
												v-model="item.tin_no"
												:errorField="
													error?.errors
														?.amount_except || null
												"
												:required="false"
												placeholder="Ex. 1234567890"
											/>
										</div>
										<div class="form-group col-4">
											<BaseInputField
												id="hdmf_no"
												label="PAG-IBIG No."
												v-model="item.hdmf_no"
												:errorField="
													error?.errors?.hdmf_no ||
														null
												"
												:required="false"
												placeholder="Ex. 000111222333"
											/>
										</div>
										<div class="form-group col-4">
											<BaseInputField
												id="phic_no"
												label="PhilHealth No."
												v-model="item.phic_no"
												:errorField="
													error?.errors?.phic_no ||
														null
												"
												:required="false"
												placeholder="Ex. 111222333444"
											/>
										</div>
										<div class="form-group col-4">
											<BaseInputField
												id="tax_branch"
												label="Tax Branch"
												v-model="item.tax_branch"
												:errorField="
													error?.errors?.tax_branch ||
														null
												"
												:required="false"
												placeholder="Ex. CEBU"
											/>
										</div>
										<div class="form-group col-4">
											<BaseSelectField
												id="tax_status"
												label="Tax Status"
												v-model="item.tax_status"
												:errorField="
													error?.errors?.tax_status ||
														null
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
														value: 'zero_exemption',
														label: 'Zero Exemption',
													},
												]"
												:required="false"
											/>
										</div>
										<div class="form-group col-4">
											<BaseInputField
												id="amount_except"
												label="Amount Exception"
												v-model="item.amount_except"
												:errorField="
													error?.errors
														?.amount_except || null
												"
												:required="false"
												placeholder="Ex. 9000.99"
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
import { ref, computed, onBeforeMount, watch } from "vue";
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
import useFetch from "@/composables/useFetch";
import useValidArray from "@/composables/useValidArray";
import endpoints from "@/utils/endpoints";

export default {
	name: "EditEmployee",
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
		const { item, error: errorData, load } = getItem(
			route.params.id,
			endpoints.employee
		);
		const { convertToValidArray } = useValidArray();
		// const employee_class_id = ref("");
		const employee_classes_array = ref([]);
		const cost_centers_array = ref([]);
		const departments_array = ref([]);
		const dimensions_array = ref([]);
		const employee_ranks_array = ref([]);
		const sub_departments_array = ref([]);
		const branches_array = ref([]);
		const domContentLoaded = ref(false)
		const {
			data: employee_classes,
			fetch: fetchEmployeeClass,
		} = useFetch();
		const { data: cost_centers, fetch: fetchCostCenter } = useFetch();
		const {
			data: employee_dropdowns,
			fetch: fetchEmployeeDropdown,
		} = useFetch();
		const { pushAlert } = useAlert();

		const employeeClassClasses = computed(() => {
			if (domContentLoaded.value) {
				return employee_classes.value.data.filter(
					(employee_class_item) =>
						employee_class_item.id == item.value.employee_class_id
				);
			}
		});

		// watch(
		// 	() => resigned.value,
		// 	(count, prevCount) => {
		// 		resigned.value == "1" &&
		// 			pushAlert(
		// 				"info",
		// 				"Please update your employee class into <Resigned>"
		// 			);
		// 	}
		// );

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

		const filterDataBaseOnType = (data, type) => {
			return data.filter((item) => {
				return item.type === type;
			});
		};

		onBeforeMount(async () => {
			domContentLoaded.value = false;
			await load();

			item.value.addresses = JSON.parse(item.value.addresses);
			item.value.relatives = JSON.parse(item.value.relatives);
			item.value.dependents = JSON.parse(item.value.dependents);
			// console.log(item.value.addresses)
			console.log("item", item.value);

			await fetchEmployeeClass(endpoints.setupEmployeeEmployeeClass);
			await fetchCostCenter(endpoints.setupEmployeeCostCenter);
			await fetchEmployeeDropdown(
				endpoints.setupEmployeeEmployeeDropdown
			);
			console.log("mount", employee_classes.value);

			employee_classes_array.value = convertToValidArray(
				employee_classes.value.data
			);
			cost_centers_array.value = convertToValidArray(
				cost_centers.value.data
			);
			departments_array.value = convertToValidArray(
				filterDataBaseOnType(
					employee_dropdowns.value.data,
					"department"
				)
			);
			dimensions_array.value = convertToValidArray(
				filterDataBaseOnType(employee_dropdowns.value.data, "dimension")
			);
			employee_ranks_array.value = convertToValidArray(
				filterDataBaseOnType(
					employee_dropdowns.value.data,
					"employee_rank"
				)
			);
			sub_departments_array.value = convertToValidArray(
				filterDataBaseOnType(
					employee_dropdowns.value.data,
					"sub_department"
				)
			);
			branches_array.value = convertToValidArray(
				filterDataBaseOnType(employee_dropdowns.value.data, "branch")
			);

			domContentLoaded.value = true;
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
				tax_branch: item.value.tax_branch,
				tax_code: item.value.tax_code,
				amount_except: item.value.amount_except,
				tin_no: item.value.tin_no,
				hdmf_no: item.value.hdmf_no,
				phic_no: item.value.phic_no,
				date_employed: item.value.date_employed,
				last_merit: item.value.last_merit,
				nationality: item.value.nationality,
				date_employed: item.value.date_employed,
				resigned: item.value.resigned,
				resignation_date: item.value.resignation_date,
				separation_reason: item.value.separation_reason,
				addresses: JSON.stringify(item.value.addresses),
				relatives: JSON.stringify(item.value.relatives),
				dependents: JSON.stringify(item.value.dependents),
				active: 1,

				employee_class_id: item.value.employee_class_id,
				cost_center_id: item.value.cost_center_id,
				dimension_id: item.value.dimension_id,
				employee_rank_id: item.value.employee_rank_id,
				department_id: item.value.department_id,
				sub_department_id: item.value.sub_department_id,
				branch_id: item.value.branch_id,
			};

			console.log("data to send", data);
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

			employee_classes_array,
			cost_centers_array,
			departments_array,
			dimensions_array,
			employee_ranks_array,
			sub_departments_array,
			branches_array,

			employeeClassClasses,
			domContentLoaded,
		};
	},
};
</script>

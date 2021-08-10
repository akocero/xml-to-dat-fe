<template>
	<transition name="alert">
		<Alert
			v-if="alert"
			:status="alert.status"
			:message="alert.message"
			@closeModal="alert = false"
		/>
	</transition>
	<CreateBank
		v-if="item && creatingBank"
		:companyID="item.id"
		@bankAdded="bankAdded($event)"
		@hideCreateBank="creatingBank = false"
	/>

	<EditBank
		v-if="item && updatingBank"
		:bank_id="update_bank_id"
		@bankUpdated="bankUpdated($event)"
		@hideEditBank="updatingBank = false"
	/>

	<EditSignatory
		v-if="item && updatingSignatory"
		:signatory_id="update_signatory_id"
		@signatoryUpdated="signatoryUpdated($event)"
		@hideEditSignatory="updatingSignatory = false"
	/>

	<CreateSignatory
		v-if="item && creatingSignatory"
		:companyID="item.id"
		@signatoryAdded="signatoryAdded($event)"
		@hideCreateSignatory="creatingSignatory = false"
	/>

	<div class="card boiler shadow-md">
		<div class="card-body">
			<ThePageHeader
				v-if="item"
				:heading="item.name"
				routeName="company"
				mode="edit"
			/>

			<div class="row">
				<div class="col-12">
					<BaseNavigationTab
						:properties="[
							{
								id: 'main',
								label: 'Main',
								error: mainTabHasError,
								active: true,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'comm',
								label: 'Communication',
								error: commTabHasError,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'contri',
								label: 'Contribution',
								error: connTabHasError,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'banks',
								label: 'Banks',
								error: item?.setup_company_banks.length === 0,
								active: false,
								disabled: false,
								tooltip: null,
								errorType: 'warning',
							},
							{
								id: 'signatories',
								label: 'Signatories',
								error:
									item?.setup_company_signatories.length ===
									0,
								active: false,
								disabled: false,
								tooltip: null,
								errorType: 'warning',
							},
						]"
					/>
					<form
						@submit.prevent="handleSubmit"
						id="form_update_company"
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
									<BaseRowHeading
										heading="Company Logo"
										para="Add your company's logo to
											personalize your company profile.
											This logo can also be used in
											payslips and generation of reports."
									/>

									<div class="col-md-2">
										<BaseImageField
											:image_path="imageUrl"
											:database="item?.image_path"
										/>
									</div>

									<div class="form-group col-md-6">
										<BaseInputFileField
											id="input_image_path"
											label="Upload Company Logo"
											@fileSelected="
												onFileSelected($event)
											"
											:error="error"
											:errorField="
												error?.errors?.image_path ||
													null
											"
											:required="false"
										/>
										<br />
										<button
											v-if="item.image_path"
											class="btn btn-sm btn-danger"
											@click="handleDeleteImage(item.id)"
											type="button"
										>
											Delete Image
										</button>
									</div>
								</div>

								<hr />

								<div class="row pb-3">
									<BaseRowHeading
										heading="Main Information"
										para="Input basic information of your
											company to provide more data about
											your organization."
									/>

									<div class="row col-8">
										<div class="form-group col-4">
											<BaseInputField
												id="input_code"
												label="Code"
												v-model="item.code"
												:error="error"
												:errorField="
													error?.errors?.code || null
												"
												placeholder="Ex. ABC"
												:required="true"
											/>
										</div>

										<!-- <div class="error">{{ error }}</div> -->
										<div class="form-group col-8">
											<BaseInputField
												id="input_name"
												label="Name"
												v-model="item.name"
												:error="error"
												:errorField="
													error?.errors?.name || null
												"
												placeholder="Ex. ABC Company"
												:required="true"
											/>
										</div>

										<div class="form-group col-4">
											<BaseInputField
												id="input_vat_reg"
												type="number"
												label="Vat Registration"
												v-model="item.vat_reg"
												:error="error"
												:errorField="
													error?.errors?.vat_reg ||
														null
												"
												placeholder="Ex. 123456789000"
												:required="true"
											/>
										</div>

										<div class="form-group col-8">
											<BaseInputField
												id="input_classification"
												type="text"
												label="Classification"
												v-model="item.classification"
												:error="error"
												:errorField="
													error?.errors
														?.classification || null
												"
												placeholder="Ex. Manufacturing Industry"
												:required="true"
											/>
										</div>

										<div class="col-md-12">
											<BaseTextAreaField
												id="input_address"
												label="Address"
												v-model="item.address"
												:error="error"
												:errorField="
													error?.errors?.address ||
														null
												"
												placeholder="Ex. "
												:required="true"
											/>
										</div>
									</div>
								</div>
								<hr />
								<div class="row pb-3">
									<BaseRowHeading
										heading="Company Settings"
										para="Choose settings to be applied across
											all modules in your Company's
											payroll system."
									/>

									<div class="row col-8">
										<div class="form-group col-4">
											<BaseInputField
												id="input_decimal_place"
												type="number"
												label="Decimal Place"
												v-model="item.decimal_place"
												:error="error"
												:errorField="
													error?.errors
														?.decimal_place || null
												"
												placeholder="Ex. 2"
												:required="true"
											/>
										</div>

										<div class="form-group col-4">
											<BaseSelectField
												id="input_currency"
												label="Currency"
												v-model="item.currency"
												:error="error"
												:errorField="
													error?.errors?.currency ||
														null
												"
												:options="[
													{
														value: 'php',
														label: 'PHP',
													},
													{
														value: 'usd',
														label: 'USD',
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
								id="pills-comm"
								role="tabpanel"
								aria-labelledby="pills-comm-tab"
							>
								<div class="row">
									<BaseRowHeading
										heading="Contact Info"
										para="Provide your company's updated
											contact information."
									/>

									<div class="row col-8">
										<div class="form-group col-6">
											<BaseInputField
												id="input_tel_no"
												type="text"
												label="Telephone Number"
												v-model="item.tel_no"
												:error="error"
												:errorField="
													error?.errors?.tel_no ||
														null
												"
												placeholder="Ex. 02-8123-4567"
												:required="true"
											/>
										</div>
										<div class="form-group col-6">
											<BaseInputField
												id="input_tel_no_alt"
												type="text"
												label="Alternative Telephone Number"
												v-model="item.tel_no_alt"
												:error="error"
												:errorField="
													error?.errors?.tel_no_alt ||
														null
												"
												placeholder="Ex. 02-8123-4567"
												:required="false"
											/>
										</div>

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
												placeholder="Ex. abccompany@example.com"
												:required="true"
											/>
										</div>
									</div>
								</div>
								<hr />
								<div class="row">
									<BaseRowHeading
										heading="Social Media"
										para="Include social media handles of the
											organization so your employees can
											reach you."
									/>

									<div class="row col-8">
										<div class="form-group col-6">
											<BaseInputField
												id="input_website"
												type="text"
												label="Website"
												v-model="item.website"
												:error="error"
												:errorField="
													error?.errors?.website ||
														null
												"
												placeholder="Ex. http://www.company.com (include http:// or https://)"
												:required="false"
											/>
										</div>

										<div class="form-group col-6">
											<BaseInputField
												id="input_facebook"
												type="text"
												label="Facebook"
												v-model="item.facebook"
												:error="error"
												:errorField="
													error?.errors?.facebook ||
														null
												"
												placeholder="Ex. http://facebook.com/company (include http:// or https://)"
												:required="false"
											/>
										</div>

										<div class="form-group col-6">
											<BaseInputField
												id="input_twitter"
												type="text"
												label="Twitter"
												v-model="item.twitter"
												:error="error"
												:errorField="
													error?.errors?.twitter ||
														null
												"
												placeholder="Ex. http://twitter.com/company (include http:// or https://)"
												:required="false"
											/>
										</div>
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
									<BaseRowHeading
										heading="SSS Info"
										para="Provide your company's Social
											Security System (SSS) details. This
											information will be used for your
											monthly contribution as an employer,
											as well as for generating reports."
									/>

									<div class="row col-8">
										<div class="form-group col-6">
											<BaseInputField
												id="input_sss_no"
												type="text"
												label="SSS Number"
												v-model="item.sss_no"
												:error="error"
												:errorField="
													error?.errors?.sss_no ||
														null
												"
												placeholder="Ex. 04-2888123-4"
												:required="true"
											/>
										</div>

										<div class="form-group col-6">
											<BaseInputField
												id="input_doc_no"
												type="text"
												label="SSS Doc Number"
												v-model="item.sss_doc_no"
												:error="error"
												:errorField="
													error?.errors?.sss_doc_no ||
														null
												"
												placeholder="Ex. PRN00001235467"
												:required="false"
											/>
										</div>

										<div class="form-group col-6">
											<BaseInputField
												id="input_sss_emp_loc_code"
												type="text"
												label="SSS Employer Location Code"
												v-model="
													item.sss_emp_location_code
												"
												:error="error"
												:errorField="
													error?.errors
														?.sss_emp_location_code ||
														null
												"
												placeholder="Ex. 000"
												:required="false"
											/>
										</div>
									</div>
								</div>
								<hr class="pb-3" />
								<div class="row">
									<BaseRowHeading
										heading="PhilHealth Info"
										para="Provide your company's PhilHealth
											details. This information will be
											used for your monthly contribution
											as an employer, as well as for
											generating reports."
									/>

									<div class="row col-8">
										<div class="form-group col-6">
											<BaseInputField
												id="input_phic_no"
												type="text"
												label="PhilHealth Number"
												v-model="item.phic_no"
												:error="error"
												:errorField="
													error?.errors?.phic_no ||
														null
												"
												placeholder="Ex. 00-000000000-0"
												:required="true"
											/>
										</div>

										<div class="form-group col-6">
											<BaseInputField
												id="input_phic_signatory"
												type="text"
												label="PhilHealth Signatory"
												v-model="item.phic_signatory"
												:error="error"
												:errorField="
													error?.errors
														?.phic_signatory || null
												"
												placeholder="Ex. Juan Dela Cruz"
												:required="false"
											/>
										</div>

										<div class="form-group col-6">
											<BaseInputField
												id="input_phic_position"
												type="text"
												label="PhilHealth Position"
												v-model="item.phic_position"
												:error="error"
												:errorField="
													error?.errors
														?.phic_position || null
												"
												placeholder="Ex. General Manager"
												:required="false"
											/>
										</div>
									</div>
								</div>
								<hr class="pb-3" />
								<div class="row">
									<BaseRowHeading
										heading="Pag-IBIG Info"
										para="Provide your company's Pag-IBIG Fund
											details. This information will be
											used for your monthly contribution
											as an employer, as well as for
											generating reports."
									/>

									<div class="row col-8">
										<div class="form-group col-6">
											<BaseInputField
												id="input_hdmf_no"
												type="text"
												label="Pag-IBIG Number"
												v-model="item.hdmf_no"
												:error="error"
												:errorField="
													error?.errors?.hdmf_no ||
														null
												"
												placeholder="Ex. 0000-0000-0000"
												:required="true"
											/>
										</div>
									</div>
								</div>

								<hr class="pb-3" />

								<div class="row">
									<BaseRowHeading
										heading="Other Contribution Details"
										para="Input additional contribution
											details as an employer. Any
											information added here will be used
											for your monthly dues as an
											employer, as well as for generating
											reports."
									/>

									<div class="row col-8">
										<div class="form-group col-6">
											<BaseInputField
												id="input_tax_branch_code"
												type="text"
												label="Tax Branch Code"
												v-model="item.tax_branch_code"
												:error="error"
												:errorField="
													error?.errors
														?.tax_branch_code ||
														null
												"
												placeholder="Ex. RD00"
												:required="true"
											/>
										</div>
										<div class="form-group col-6">
											<BaseInputField
												id="input_alphalist_no"
												type="text"
												label="Alphalist Number"
												v-model="item.alphalist_no"
												:error="error"
												:errorField="
													error?.errors
														?.alphalist_no || null
												"
												placeholder="Ex. 0000"
												:required="true"
											/>
										</div>
									</div>
								</div>
							</div>
							<div
								class="tab-pane fade"
								id="pills-signatories"
								role="tabpanel"
								aria-labelledby="pills-signatories-tab"
							>
								<div class="row">
									<div
										class="col-12 d-flex justify-content-between mb-3 align-items-center"
									>
										<h4 class="tab-pane-title">
											Signatory List
										</h4>
										<button
											type="button"
											class="btn btn-custom-primary btn-sm"
											data-toggle="modal"
											data-target="#create-signatory-modal"
											data-backdrop="static"
											data-keyboard="false"
											@click="
												showSignatoryModal('create')
											"
										>
											Add Signatory
										</button>
									</div>

									<div class="col-md-12">
										<div
											class="list "
											v-if="
												item.setup_company_signatories
													.length
											"
										>
											<div
												class="list-item signatory"
												v-for="signatory in item.setup_company_signatories"
												:key="signatory.id"
											>
												<div class="list-col">
													<label
														for=""
														class="list-label"
														>CODE</label
													>
													<h4 class="list-value">
														{{ signatory.code }}
													</h4>
												</div>
												<div class="list-col">
													<label
														for=""
														class="list-label"
														>PREPARED BY:</label
													>
													<h4 class="list-value">
														{{
															signatory.prepared_by
														}}
													</h4>
												</div>
												<div class="list-col">
													<label
														for=""
														class="list-label"
														>POSITION</label
													>
													<h4 class="list-value">
														{{
															signatory.p_position
														}}
													</h4>
												</div>

												<div class="list-col">
													<label
														for=""
														class="list-label"
														>STATUS</label
													>
													<h4 class="list-value">
														<span
															class="custom-badge custom-badge-success"
															v-if="
																signatory.active ==
																	1
															"
															>Active</span
														>
														<span
															class="custom-badge custom-badge-danger"
															v-else
															>Inactive</span
														>
													</h4>
												</div>
												<div class="list-actions">
													<button
														type="button"
														class="btn btn-sm btn-light"
														data-toggle="modal"
														data-target="#update-signatory-modal"
														data-backdrop="static"
														data-keyboard="false"
														@click="
															showSignatoryModal(
																'update',
																signatory.id
															)
														"
													>
														<i
															class="far fa-edit"
														></i>
													</button>
												</div>
											</div>
										</div>
										<div v-else>
											No Signatory available!
										</div>
									</div>
								</div>
							</div>
							<div
								class="tab-pane fade"
								id="pills-banks"
								role="tabpanel"
								aria-labelledby="pills-banks-tab"
							>
								<div class="row">
									<div
										class="col-12 d-flex justify-content-between mb-3 align-items-center"
									>
										<h4 class="tab-pane-title">
											Bank List
										</h4>

										<button
											type="button"
											class="btn btn-custom-primary btn-sm"
											data-toggle="modal"
											data-target="#create-bank-modal"
											data-backdrop="static"
											data-keyboard="false"
											@click="showBankModal('create')"
										>
											Add Bank
										</button>
									</div>

									<div class="col-md-12">
										<div
											class="list"
											v-if="
												item.setup_company_banks.length
											"
										>
											<div
												class="list-item"
												v-for="bank in item.setup_company_banks"
												:key="bank.id"
											>
												<div class="list-col">
													<label
														for=""
														class="list-label"
														>BANK CODE</label
													>
													<h4 class="list-value">
														{{ bank.bank_code }}
													</h4>
												</div>
												<div class="list-col">
													<label
														for=""
														class="list-label"
														>ACCOUNT NAME</label
													>
													<h4 class="list-value">
														{{ bank.name }}
													</h4>
												</div>
												<div class="list-col">
													<label
														for=""
														class="list-label"
														>DESCRIPTION</label
													>
													<h4 class="list-value">
														{{ bank.description }}
													</h4>
												</div>
												<div class="list-actions">
													<button
														type="button"
														class="btn btn-sm btn-light"
														data-toggle="modal"
														data-target="#update-bank-modal"
														data-backdrop="static"
														data-keyboard="false"
														@click="
															showBankModal(
																'update',
																bank.id
															)
														"
													>
														<i
															class="far fa-edit"
														></i>
													</button>
												</div>
											</div>
										</div>
										<div v-else>
											No bank available!
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
// import axios from 'axios';
import { onUnmounted, computed, ref, onBeforeMount } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";

import getItem from "@/composables/getItem";
import useAlert from "@/composables/useAlert";
import useData from "@/composables/useData";
import useImage from "@/composables/useImage";

import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner.vue";
import Badge from "@/components/Badge.vue";
import BaseInputField from "@/components/BaseInputField";
import BaseSelectField from "@/components/BaseSelectField";
import BaseTextAreaField from "@/components/BaseTextAreaField";
import BaseInputFileField from "@/components/BaseInputFileField";
import BaseImageField from "@/components/BaseImageField";
import BaseRowHeading from "@/components/BaseRowHeading";
import BaseNavigationTab from "@/components/BaseNavigationTab";
import ThePageHeader from "@/components/layouts/ThePageHeader";

import CreateBank from "./CreateBank";
import EditBank from "./EditBank";
import CreateSignatory from "./CreateSignatory";
import EditSignatory from "./EditSignatory";

import feather from "feather-icons";

export default {
	name: "UpdateCompany",
	components: {
		Alert,
		Spinner,
		CreateBank,
		CreateSignatory,
		EditBank,
		EditSignatory,
		Badge,
		BaseInputField,
		BaseSelectField,
		BaseTextAreaField,
		BaseInputFileField,
		BaseImageField,
		BaseRowHeading,
		ThePageHeader,
		BaseNavigationTab,
	},
	computed: {
		alertTriangle: function() {
			return feather.icons["alert-circle"].toSvg({
				width: 18,
			});
		},
	},
	setup() {
		const route = useRoute();
		const { item, error: errorData, load } = getItem(
			route.params.id,
			"setupcompany"
		);

		const { response, error, create, loading, unknownError } = useData();
		const {
			image: imageUrl,
			selectedFile,
			onFileSelected,
			deleteImage,
		} = useImage();
		const { displayAlert, alert } = useAlert();

		const creatingBank = ref(false);
		const updatingBank = ref(false);
		const creatingSignatory = ref(false);
		const updatingSignatory = ref(false);

		const update_bank_id = ref(null);
		const update_signatory_id = ref(null);

		onBeforeMount(async () => {
			await load();

			if (
				item.value.setup_company_banks.length === 0 ||
				item.value.setup_company_signatories.length === 0
			) {
				displayAlert(
					"warning",
					"Please add company banks or signatories"
				);
			}
		});

		// methods/functions
		const handleSubmit = async () => {
			const form_data = new FormData();
			const data = {
				name: item.value.name,
				code: item.value.code,
				facebook: item.value.facebook,
				twitter: item.value.twitter,
				vat_reg: item.value.vat_reg,
				tel_no: item.value.tel_no,
				tel_no_alt: item.value.tel_no_alt,
				email: item.value.email,
				website: item.value.website,
				address: item.value.address,
				classification: item.value.classification,
				sss_no: item.value.sss_no,
				sss_doc_no: item.value.sss_doc_no,
				sss_emp_location_code: item.value.sss_emp_location_code,
				phic_no: item.value.phic_no,
				phic_signatory: item.value.phic_signatory,
				phic_position: item.value.phic_position,
				hdmf_no: item.value.hdmf_no,
				tax_branch_code: item.value.tax_branch_code,
				alphalist_no: item.value.alphalist_no,
				currency: item.value.currency,
				decimal_place: item.value.decimal_place,
				amount: item.value.amount,
			};

			for (var key in data) {
				form_data.append(key, data[key]);
			}

			if (selectedFile.value) {
				form_data.append("image_path", selectedFile.value);
			}

			const res = await create(
				`setupcompany/${route.params.id}?_method=PATCH`,
				form_data
			);

			if (!error.value) {
				if (selectedFile.value) {
					item.value.image_path = res.image_path;
					selectedFile.value = null;
					imageUrl.value = null;
				}

				displayAlert("info", "Company Updated");
			} else {
				displayAlert("error", error.value.message);
			}
		};

		const showBankModal = (type, value = null) => {
			if (type === "create") {
				creatingBank.value = true;
			} else {
				updatingBank.value = true;
				update_bank_id.value = value;
				console.log(update_bank_id.value);
			}
		};

		const showSignatoryModal = (type, value = null) => {
			if (type === "create") {
				creatingSignatory.value = true;
			} else {
				updatingSignatory.value = true;
				update_signatory_id.value = value;
				// console.log(update_bank_id.value);
			}
		};

		const handleCloseModal = () => {
			error.value = null;
			response.value = "";
			isBankAdded.value = false;
			isBankUpdated.value = false;
			isSignatoryAdded.value = false;
			isSignatoryUpdated.value = false;
		};

		const bankAdded = (newBank) => {
			creatingBank.value = false;
			item.value.setup_company_banks = [
				newBank,
				...item.value.setup_company_banks,
			];
			console.log(newBank);
			displayAlert("success", "Bank Added");
		};

		const bankUpdated = (updatedBank) => {
			updatingBank.value = false;
			const newbanks = item.value.setup_company_banks.filter(
				(bank) => bank.id !== updatedBank.id
			);
			item.value.setup_company_banks = [updatedBank, ...newbanks];
			displayAlert("info", "Bank Updated");
		};

		const signatoryAdded = (newSignatory) => {
			creatingSignatory.value = false;
			item.value.setup_company_signatories = [
				newSignatory,
				...item.value.setup_company_signatories,
			];
			displayAlert("success", "Signatory Added");
		};

		const signatoryUpdated = (updatedSignatory) => {
			updatingSignatory.value = false;
			const newSignatories = item.value.setup_company_signatories.filter(
				(signatory) => signatory.id !== updatedSignatory.id
			);
			item.value.setup_company_signatories = [
				updatedSignatory,
				...newSignatories,
			];
			displayAlert("info", "Signatory Updated");
		};

		// computed error handling
		const commTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.email) ||
				(error.value && error.value.errors.tel_no)
			);
		});

		const mainTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.code) ||
				(error.value && error.value.errors.name) ||
				(error.value && error.value.errors.vat_reg) ||
				(error.value && error.value.errors.address)
			);
		});

		const connTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.sss_no) ||
				(error.value && error.value.errors.phic_no) ||
				(error.value && error.value.errors.hdmf_no) ||
				(error.value && error.value.errors.tax_branch_code) ||
				(error.value && error.value.errors.alphalist_no)
			);
		});

		const handleDeleteImage = async (id) => {
			if (confirm("Company logo will be remove. Are you sure?")) {
				const res = await deleteImage("setupcompany/deleteImage/" + id);
				if (res.status === 204) {
					item.value.image_path = null;
					displayAlert("success", "Image Deleted");
				} else {
					displayAlert("error", "Error Deleting Image");
				}
			}
		};

		onBeforeRouteLeave((to, from) => {
			const answer = window.confirm(
				"Do you really want to leave? you have unsaved changes!"
			);
			// cancel the navigation and stay on the same page
			if (!answer) return false;
		});

		return {
			alert,

			handleSubmit,
			error,
			loading,
			response,
			item,
			imageUrl,
			onFileSelected,
			deleteImage,
			handleDeleteImage,

			handleCloseModal,

			bankAdded,
			bankUpdated,
			creatingBank,
			updatingBank,
			showBankModal,

			signatoryAdded,
			signatoryUpdated,
			creatingSignatory,
			updatingSignatory,
			showSignatoryModal,

			update_bank_id,
			update_signatory_id,

			connTabHasError,
			mainTabHasError,
			commTabHasError,
		};
	},
};
</script>

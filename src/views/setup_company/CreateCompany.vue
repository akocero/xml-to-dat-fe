<template>
	<transition name="alert">
		<Alert
			v-if="alert"
			:status="alert.status"
			:message="alert.message"
			@closeModal="alert = null"
		/>
	</transition>

	<div class="card boiler shadow-md">
		<div class="card-body">
			<ThePageHeader
				heading="New Company"
				routeName="company"
				mode="create"
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
								error: null,
								active: false,
								disabled: true,
								tooltip:
									'Please save your information for Main, Communication, and Contribution tabs to enable Bank Tab',
							},
							{
								id: 'signatory',
								label: 'Signatories',
								error: null,
								active: false,
								disabled: true,
								tooltip:
									'Please save your information for Main, Communication, and Contribution tabs to enable Signatory Tab',
							},
						]"
					/>
					<form @submit.prevent="handleSubmit" id="form_create_user">
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
											:image_path="image_path"
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
												v-model="code"
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
												v-model="name"
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
												v-model="vat_reg"
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
												v-model="classification"
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
												v-model="address"
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
												v-model="decimal_place"
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
												v-model="currency"
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
												v-model="tel_no"
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
												v-model="tel_no_alt"
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
												v-model="email"
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
												v-model="website"
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
												v-model="facebook"
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
												v-model="twitter"
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
												v-model="sss_no"
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
												v-model="sss_doc_no"
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
												v-model="sss_emp_location_code"
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
												v-model="phic_no"
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
												v-model="phic_signatory"
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
												v-model="phic_position"
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
												v-model="hdmf_no"
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
												v-model="tax_branch_code"
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
												v-model="alphalist_no"
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
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";
import useImage from "@/composables/useImage";

import { ref, computed } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

import feather from "feather-icons";
import $ from "jquery";

import Alert from "@/components/Alert";
import BaseInputField from "@/components/BaseInputField";
import BaseSelectField from "@/components/BaseSelectField";
import BaseTextAreaField from "@/components/BaseTextAreaField";
import BaseInputFileField from "@/components/BaseInputFileField";
import BaseImageField from "@/components/BaseImageField";
import BaseRowHeading from "@/components/BaseRowHeading";
import BaseNavigationTab from "@/components/BaseNavigationTab";
import ThePageHeader from "@/components/layouts/ThePageHeader";
export default {
	name: "CreateCompany",
	components: {
		Alert,
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
		const { response, error, create, loading, unknownError } = useData();
		const { alert, displayAlert } = useAlert();
		const { image: image_path, selectedFile, onFileSelected } = useImage();

		const companyAdded = ref(false);

		const name = ref("");
		const code = ref("");
		const vat_reg = ref("");
		const tel_no = ref("");
		const tel_no_alt = ref("");
		const email = ref("");
		const website = ref("");
		const facebook = ref("");
		const twitter = ref("");
		const address = ref("");
		const classification = ref("");
		const sss_no = ref("");
		const sss_doc_no = ref("");
		const sss_emp_location_code = ref("");
		const phic_no = ref("");
		const phic_signatory = ref("");
		const phic_position = ref("");
		const hdmf_no = ref("");
		const tax_branch_code = ref("");
		const alphalist_no = ref("");
		const decimal_place = ref("");
		const currency = ref("");
		const amount = ref("");

		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

		const handleSubmit = async () => {
			const form_data = new FormData();
			const data = {
				name: name.value,
				code: code.value,
				facebook: facebook.value,
				twitter: twitter.value,
				vat_reg: vat_reg.value,
				tel_no: tel_no.value,
				tel_no_alt: tel_no_alt.value,
				email: email.value,
				website: website.value,
				address: address.value,
				classification: classification.value,
				sss_no: sss_no.value,
				sss_doc_no: sss_doc_no.value,
				sss_emp_location_code: sss_emp_location_code.value,
				phic_no: phic_no.value,
				phic_signatory: phic_signatory.value,
				phic_position: phic_position.value,
				hdmf_no: hdmf_no.value,
				tax_branch_code: tax_branch_code.value,
				alphalist_no: alphalist_no.value,
				decimal_place: decimal_place.value,
				currency: currency.value,
				amount: amount.value,
			};

			for (var key in data) {
				form_data.append(key, data[key]);
			}

			selectedFile.value &&
				form_data.append("image_path", selectedFile.value);

			// Checking form_data values
			// for (var pair of form_data.entries()) {
			// 	console.log(pair[0]+ ', ' + pair[1]);
			// }
			const res = await create("setupcompany", form_data);

			if (!error.value) {
				companyAdded.value = true;
				router.push({
					name: "update-company",
					params: { id: response.value.id },
				});
			} else {
				displayAlert("error", "Invalid Inputs");
			}
		};

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

		onBeforeRouteLeave((to, from) => {
			if (!companyAdded.value) {
				const answer = window.confirm(
					"Do you really want to leave? you have unsaved changes!"
				);
				// cancel the navigation and stay on the same page
				if (!answer) return false;
			}
		});

		return {
			alert,

			code,
			email,
			name,
			tel_no,
			tel_no_alt,
			website,
			facebook,
			twitter,
			vat_reg,
			address,
			classification,
			sss_no,
			sss_doc_no,
			sss_emp_location_code,
			phic_no,
			phic_signatory,
			phic_position,
			hdmf_no,
			tax_branch_code,
			alphalist_no,
			decimal_place,
			currency,
			amount,
			selectedFile,
			image_path,

			handleSubmit,
			error,
			loading,
			onFileSelected,

			commTabHasError,
			mainTabHasError,
			connTabHasError,
		};
	},
};
</script>

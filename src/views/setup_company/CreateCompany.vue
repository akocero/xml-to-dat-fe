<template>
	<transition name="alert">
		<Alert
			v-if="response"
			:status="'success'"
			:message="'Company Added'"
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
					<h5 class="h4 mb-0 text-primary">New Company</h5>
					<router-link
						class="btn btn-primary"
						:to="{ name: 'company' }"
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
								>Main
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
								Communication
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
								Contribution
								<i
									v-if="connTabHasError"
									v-html="alertTriangle"
									class="text-danger icon-error"
								></i>
							</a>
						</li>
						<li
							class="nav-item"
							data-toggle="tooltip"
							data-placement="left"
							title="Please save your information for Main, Communication, and Contribution tabs to enable Bank Tab"
						>
							<a
								class="nav-link disabled"
								id="pills-banks-tab"
								data-toggle="pill"
								href="#pills-banks"
								role="tab"
								aria-controls="pills-banks"
								aria-selected="false"
								>Banks</a
							>
						</li>
						<li
							class="nav-item"
							data-toggle="tooltip"
							data-placement="left"
							title="Please save your information for Main, Communication, and Contribution tabs to enable Signatory Tab"
						>
							<a
								class="nav-link disabled"
								id="pills-signatory-tab"
								data-toggle="pill"
								href="#pills-signatory"
								role="tab"
								aria-controls="pills-signatory"
								aria-selected="false"
								>Signatory</a
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
										<h5 class="h5">Company Image</h5>
										<label for="" class="text-justify pr-4">
											Add your company's logo to
											personalize your company profile.
											This logo can also be used in
											payslips and generation of reports.
										</label>
									</div>

									<div class="col-md-2">
										<img
											v-if="imageUrl"
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
										<label for="" class="text-justify pr-4">
											Input basic information of your
											company to provide more data about
											your organization.
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-4">
											<BaseTextField
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
											<BaseTextField
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
											<label
												>Vat Registration
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="number"
												class="form-control"
												:class="[
													error &&
														error.errors.vat_reg &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 123-456-789-000"
												v-model="vat_reg"
											/>
											<small
												v-if="
													error &&
														error.errors.vat_reg
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.vat_reg[0] }}
											</small>
										</div>

										<div class="form-group col-8">
											<label
												>Classification
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
															.classification &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. Manufacturing Industry"
												v-model="classification"
											/>
											<small
												v-if="
													error &&
														error.errors
															.classification
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors
														.classification[0]
												}}
											</small>
										</div>

										<div class="col-md-12">
											<label for=""
												>Address
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<textarea
												name=""
												:class="[
													error &&
														error.errors.address &&
														'is-invalid',
												]"
												id=""
												class="form-control"
												v-model="address"
											></textarea>
											<small
												v-if="
													error &&
														error.errors.address
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.address[0] }}
											</small>
										</div>
									</div>
								</div>
								<hr />
								<div class="row pb-3">
									<div class="col-4">
										<h5 class="h5">Company Settings</h5>
										<label for="" class="text-justify pr-4">
											Choose settings to be applied across
											all modules in your Company's
											payroll system.
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-4">
											<label>
												Decimal Place
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="number"
												class="form-control"
												:class="[
													error &&
														error.errors
															.decimal_place &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 2"
												v-model="decimal_place"
											/>
											<small
												v-if="
													error &&
														error.errors
															.decimal_place
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors
														.decimal_place[0]
												}}
											</small>
										</div>

										<div class="form-group col-4">
											<label for=""
												>Currency
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
														error.errors.currency &&
														'is-invalid',
												]"
												v-model="currency"
											>
												<option value=""
													>Choose ...</option
												>
												<option value="php">PHP</option>
												<option value="usd">USD</option>
											</select>
											<small
												v-if="
													error &&
														error.errors.currency
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.currency[0] }}
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
											Provide your company's updated
											contact information.
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>Tel No.
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="number"
												class="form-control"
												:class="[
													error &&
														error.errors.tel_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 02-8123-4567 "
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
											<label>Tel No Alt.</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.tel_no_alt &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 02-8123-4567 "
												v-model="tel_no_alt"
											/>
											<small
												v-if="
													error &&
														error.errors.tel_no_alt
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.tel_no_alt[0] }}
											</small>
										</div>

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
									</div>
								</div>
								<hr />
								<div class="row">
									<div class="col-4">
										<h5 class="h5">Social Media</h5>
										<label for="" class="text-justify pr-4">
											Include social media handles of the
											organization so your employees can
											reach you.
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label>Website</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.website &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. http://www.company.com (include http:// or https://)"
												v-model="website"
											/>
											<small
												v-if="
													error &&
														error.errors.website
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.website[0] }}
											</small>
										</div>
										<!-- <div class="error">{{ error }}</div> -->
										<div class="form-group col-6">
											<label for="">Facebook</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.facebook &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. http://facebook.com/company (include http:// or https://)"
												v-model="facebook"
											/>
											<small
												v-if="
													error &&
														error.errors.facebook
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.facebook[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label>Twitter</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.twitter &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. http://twitter.com/company (include http:// or https://)"
												v-model="twitter"
											/>
											<small
												v-if="
													error &&
														error.errors.twitter
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.twitter[0] }}
											</small>
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
									<div class="col-4">
										<h5 class="h5">SSS Info</h5>
										<label for="" class="text-justify pr-4">
											Provide your company's Social
											Security System (SSS) details. This
											information will be used for your
											monthly contribution as an employer,
											as well as for generating reports.
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>SSS Number
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="number"
												class="form-control"
												:class="[
													error &&
														error.errors.sss_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 0428881234"
												v-model="sss_no"
											/>
											<small
												v-if="
													error && error.errors.sss_no
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.sss_no[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>SSS Doc No
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
															.sss_doc_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. PRN00001235467"
												v-model="sss_doc_no"
											/>
											<small
												v-if="
													error &&
														error.errors.sss_doc_no
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.sss_doc_no[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>SSS Employer Location Code
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
															.sss_emp_location_code &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 000"
												v-model="sss_emp_location_code"
											/>
											<small
												v-if="
													error &&
														error.errors
															.sss_emp_location_code
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors
														.sss_emp_location_code[0]
												}}
											</small>
										</div>
									</div>
								</div>
								<hr class="pb-3" />
								<div class="row">
									<div class="col-4">
										<h5 class="h5">PhilHealth Info</h5>
										<label for="" class="text-justify pr-4">
											Provide your company's PhilHealth
											details. This information will be
											used for your monthly contribution
											as an employer, as well as for
											generating reports.
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>PhilHealth Number
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="number"
												class="form-control"
												:class="[
													error &&
														error.errors.phic_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 00-000000000-0"
												v-model="phic_no"
											/>
											<small
												v-if="
													error &&
														error.errors.phic_no
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.phic_no[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>PhilHealth Signatory
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
															.phic_signatory &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. Juan Dela Cruz"
												v-model="phic_signatory"
											/>
											<small
												v-if="
													error &&
														error.errors
															.phic_signatory
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors
														.phic_signatory[0]
												}}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>PhilHealth Position
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
															.phic_position &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. General Manager"
												v-model="phic_position"
											/>
											<small
												v-if="
													error &&
														error.errors
															.phic_position
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors
														.phic_position[0]
												}}
											</small>
										</div>
									</div>
								</div>
								<hr class="pb-3" />
								<div class="row">
									<div class="col-4">
										<h5 class="h5">Pag-IBIG Info</h5>
										<label for="" class="text-justify pr-4">
											Provide your company's Pag-IBIG Fund
											details. This information will be
											used for your monthly contribution
											as an employer, as well as for
											generating reports.
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>Pag-ibig Number
												<span
													class="text-danger text-bold"
													>*</span
												>
											</label>
											<input
												type="number"
												class="form-control"
												:class="[
													error &&
														error.errors.hdmf_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 0000-0000-0000"
												v-model="hdmf_no"
											/>
											<small
												v-if="
													error &&
														error.errors.hdmf_no
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.hdmf_no[0] }}
											</small>
										</div>
									</div>
								</div>

								<hr class="pb-3" />

								<div class="row">
									<div class="col-4">
										<h5 class="h5">
											Other Contribution Details
										</h5>
										<label for="" class="text-justify pr-4">
											Input additional contribution
											details as an employer. Any
											information added here will be used
											for your monthly dues as an
											employer, as well as for generating
											reports.
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>Tax Branch Code
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
															.tax_branch_code &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. RD00"
												v-model="tax_branch_code"
											/>
											<small
												v-if="
													error &&
														error.errors
															.tax_branch_code
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors
														.tax_branch_code[0]
												}}
											</small>
										</div>
										<div class="form-group col-6">
											<label>Alphalist Number</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.alphalist_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 0000"
												v-model="alphalist_no"
											/>
											<small
												v-if="
													error &&
														error.errors
															.alphalist_no
												"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{
													error.errors.alphalist_no[0]
												}}
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
								v-if="!isPending"
								value="Save"
							/>
							<button
								class="btn btn-custom-success"
								v-if="isPending"
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
import { ref, onUnmounted, computed } from "vue";

import feather from "feather-icons";
import Alert from "@/components/Alert";
import { useRouter } from "vue-router";
import axios from "@/axios/axios-instance";
import BaseTextField from "@/components/BaseTextField";
import $ from "jquery";
export default {
	name: "CreateCompany",
	components: {
		Alert,
		BaseTextField,
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

		const error = ref(null);
		const unknownError = ref(null);
		const response = ref(null);
		const isPending = ref(false);

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

		const selectedFile = ref(null);
		const imageUrl = ref(null);

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

			if (selectedFile.value) {
				form_data.append("image_path", selectedFile.value);
			}

			// Checking form_data values
			// for (var pair of form_data.entries()) {
			// 	console.log(pair[0]+ ', ' + pair[1]);
			// }

			try {
				const res = await axios.post("setupcompany", form_data);
				response.value = res.data;
				error.value = null;
				unknownError.value = null;
				isPending.value = false;
				router.push({
					name: "update-company",
					params: { id: response.value.id },
				});
			} catch (err) {
				isPending.value = false;

				if (err.message.includes("422")) {
					error.value = err.response.data;
					console.log(err.response.data);
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

		const handleCloseModal = () => {
			error.value.message = null;
			response.value = "";
		};

		const onFileSelected = (e) => {
			selectedFile.value = e.target.files[0];
			imageUrl.value = URL.createObjectURL(selectedFile.value);
		};

		return {
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
			imageUrl,

			handleSubmit,
			error,
			isPending,
			response,
			handleCloseModal,
			onFileSelected,

			commTabHasError,
			mainTabHasError,
			connTabHasError,
		};
	},
};
</script>

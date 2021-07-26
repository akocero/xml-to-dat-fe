<template>
	<transition name="alert">
		<Alert
			v-if="response"
			:status="'info'"
			:message="'Company Updated'"
			@closeModal="handleCloseModal"
		/>
	</transition>

	<transition name="alert">
		<Alert
			v-if="isBankAdded"
			:status="'success'"
			:message="'Bank Added'"
			@closeModal="handleCloseModal"
		/>
	</transition>

	<transition name="alert">
		<Alert
			v-if="isBankUpdated"
			:status="'info'"
			:message="'Bank Updated'"
			@closeModal="handleCloseModal"
		/>
	</transition>

	<transition name="alert">
		<Alert
			v-if="isSignatoryAdded"
			:status="'success'"
			:message="'Signatory Added'"
			@closeModal="handleCloseModal"
		/>
	</transition>

	<transition name="alert">
		<Alert
			v-if="isSignatoryUpdated"
			:status="'info'"
			:message="'Signatory Updated'"
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
			<div class="row mb-3">
				<div
					class="col-md-12 d-flex justify-content-between align-items-center"
				>
					<h5 class="h4 mb-0 text-primary" v-if="item">
						{{ item.name }} Information.
					</h5>
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
								:class="mainTabHasError ? 'pr-4' : ''"
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
								:class="commTabHasError ? 'pr-4' : ''"
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
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-banks-tab"
								data-toggle="pill"
								href="#pills-banks"
								role="tab"
								aria-controls="pills-banks"
								aria-selected="false"
								>Banks</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-signatories-tab"
								data-toggle="pill"
								href="#pills-signatories"
								role="tab"
								aria-controls="pills-signatories"
								aria-selected="false"
								>Signatories</a
							>
						</li>
					</ul>
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
									<div class="col-md-4">
										<h5 class="h5">Company Image</h5>
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
										</label>
									</div>

									<div class="col-md-2">
										<img
											v-if="item.image_path && !imageUrl"
											:src="
												'http://127.0.0.1:8000/storage/' +
													item.image_path
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
											ref="input_image"
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
											class="form-text text-danger"
										>
											{{ error.errors.image_path[0] }}
										</small>
										<button
											v-if="item.image_path"
											class="btn btn-sm btn-danger"
											@click="deleteImage(item.id)"
											type="button"
										>
											Delete Image
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
										<div class="form-group col-4">
											<label>
												Code
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
														error.errors.code &&
														'is-invalid',
												]"
												id="input_code"
												placeholder="Ex. 1234567"
												v-model="item.code"
											/>
											<small
												v-if="
													error && error.errors.code
												"
												class="form-text text-danger"
											>
												{{ error.errors.code[0] }}
											</small>
										</div>
										<!-- <div class="error">{{ error }}</div> -->
										<div class="form-group col-8">
											<label for=""
												>Name
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
														error.errors.name &&
														'is-invalid',
												]"
												id="input_name"
												placeholder="Ex. John Doe"
												v-model="item.name"
											/>
											<small
												v-if="
													error && error.errors.name
												"
												class="form-text text-danger"
											>
												{{ error.errors.name[0] }}
											</small>
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
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.vat_reg &&
														'is-invalid',
												]"
												id="input_vat_reg"
												placeholder="Ex. johndoe@example.com "
												v-model="item.vat_reg"
											/>
											<small
												v-if="
													error &&
														error.errors.vat_reg
												"
												class="form-text text-danger"
											>
												<span
													v-for="(err_vat_reg,
													index) in error.errors
														.vat_reg"
													:key="index"
													class="d-block"
												>
													{{ err_vat_reg }}</span
												>
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
												id="input_classification"
												placeholder="Ex. johndoe@example.com "
												v-model="item.classification"
											/>
											<small
												v-if="
													error &&
														error.errors
															.classification
												"
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
												id="input_address"
												class="form-control"
												v-model="item.address"
											></textarea>
											<small
												v-if="
													error &&
														error.errors.address
												"
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
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
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
												id="input_decimal_place"
												aria-describedby="emailHelp"
												placeholder="Ex. 1234567"
												v-model="item.decimal_place"
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
												v-model="item.currency"
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
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
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
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.tel_no &&
														'is-invalid',
												]"
												id="input_tel_no"
												placeholder="Ex. 02-8123-4567 "
												v-model="item.tel_no"
											/>
											<small
												v-if="
													error && error.errors.tel_no
												"
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
												id="input_tel_no_alt"
												placeholder="Ex. 02-8123-4567 "
												v-model="item.tel_no_alt"
											/>
											<small
												v-if="
													error &&
														error.errors.tel_no_alt
												"
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
												id="input_email"
												placeholder="Ex. johndoe@example.com "
												v-model="item.email"
											/>
											<small
												v-if="
													error && error.errors.email
												"
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
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
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
												id="input_website"
												placeholder="Ex. https://www.facebook.com/"
												v-model="item.website"
											/>
											<small
												v-if="
													error &&
														error.errors.website
												"
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
												id="input_facebook"
												placeholder="Ex. https://www.facebook.com/hisoka.morow.904/"
												v-model="item.facebook"
											/>
											<small
												v-if="
													error &&
														error.errors.facebook
												"
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
												id="input_twitter"
												placeholder="Ex. https://www.twitter.com/hisoka.morow.904/ "
												v-model="item.twitter"
											/>
											<small
												v-if="
													error &&
														error.errors.twitter
												"
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
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
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
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.sss_no &&
														'is-invalid',
												]"
												id="input_sss_no"
												placeholder="Ex. 3484073113 "
												v-model="item.sss_no"
											/>
											<small
												v-if="
													error && error.errors.sss_no
												"
												class="form-text text-danger"
											>
												{{ error.errors.sss_no[0] }}
											</small>
										</div>
										<div class="form-group col-6">
											<label>SSS Initial</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.sss_initial &&
														'is-invalid',
												]"
												id="input_sss_initial"
												placeholder="Ex.  "
												v-model="item.sss_initial"
											/>
											<small
												v-if="
													error &&
														error.errors.sss_initial
												"
												class="form-text text-danger"
											>
												{{
													error.errors.sss_initial[0]
												}}
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
												id="input_doc_no"
												placeholder="Ex.  "
												v-model="item.sss_doc_no"
											/>
											<small
												v-if="
													error &&
														error.errors.sss_doc_no
												"
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
												id="input_location_code"
												placeholder="Ex.  "
												v-model="
													item.sss_emp_location_code
												"
											/>
											<small
												v-if="
													error &&
														error.errors
															.sss_emp_location_code
												"
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
										<h5 class="h5">Philhealth Info</h5>
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>Philhealth Number
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
														error.errors.phic_no &&
														'is-invalid',
												]"
												id="input_phic_no"
												placeholder="Ex. 022500018635 "
												v-model="item.phic_no"
											/>
											<small
												v-if="
													error &&
														error.errors.phic_no
												"
												class="form-text text-danger"
											>
												{{ error.errors.phic_no[0] }}
											</small>
										</div>
										<div class="form-group col-6">
											<label>Philhealth Initial</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors
															.phic_initial &&
														'is-invalid',
												]"
												id="input_phic_initial"
												placeholder="Ex. "
												v-model="item.phic_initial"
											/>
											<small
												v-if="
													error &&
														error.errors
															.phic_initial
												"
												class="form-text text-danger"
											>
												{{
													error.errors.phic_initial[0]
												}}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>Philhealth Signatory
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
												id="input_phic_signatory"
												placeholder="Ex."
												v-model="item.phic_signatory"
											/>
											<small
												v-if="
													error &&
														error.errors
															.phic_signatory
												"
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
												>Philhealth Position
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
												id="input_phic_position"
												placeholder="Ex. "
												v-model="item.phic_position"
											/>
											<small
												v-if="
													error &&
														error.errors
															.phic_position
												"
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
										<h5 class="h5">Pag-ibig Info</h5>
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
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
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.hdmf_no &&
														'is-invalid',
												]"
												id="input_hdmf_no"
												placeholder="Ex.123456789101 "
												v-model="item.hdmf_no"
											/>
											<small
												v-if="
													error &&
														error.errors.hdmf_no
												"
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
											Other Conributon Details
										</h5>
										<label for="">
											You can change your avatar here or
											remove the current avatar to revert
											to gravatar.com
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
												id="input_tax_branch_code"
												placeholder="Ex. "
												v-model="item.tax_branch_code"
											/>
											<small
												v-if="
													error &&
														error.errors
															.tax_branch_code
												"
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
												id="input_alphalist_no"
												placeholder="Ex. "
												v-model="item.alphalist_no"
											/>
											<small
												v-if="
													error &&
														error.errors
															.alphalist_no
												"
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
																signatory.active ===
																	1
															"
															>Active</span
														>
														<span
															class="custom-badge custom-badge-danger"
															v-else
															>Inactive</span
														>
														<!-- {{ signatory.active }} -->
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
						</div>
						<hr />
						<div class="row col-12">
							<input
								type="submit"
								class="btn btn-custom-success"
								v-if="!isPending"
								value="Save Changes"
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
import { onUnmounted, computed, ref } from "vue";
import { useRoute } from "vue-router";

import getItem from "@/composables/getItem";

import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner.vue";
import Badge from "@/components/Badge.vue";

import CreateBank from "./CreateBank";
import EditBank from "./EditBank";
import CreateSignatory from "./CreateSignatory";
import EditSignatory from "./EditSignatory";

import feather from "feather-icons";
import axios from "@/axios/axios-instance";

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
		const route = useRoute();
		const { item, error: errorData, load } = getItem(
			route.params.id,
			"setupcompany"
		);
		const input_image = ref(null);
		const error = ref(null);
		const unknownError = ref(null);
		const response = ref(null);
		const isPending = ref(false);

		const isBankAdded = ref(false);
		const isBankUpdated = ref(false);
		const isSignatoryAdded = ref(false);
		const isSignatoryUpdated = ref(false);

		const creatingBank = ref(false);
		const updatingBank = ref(false);
		const creatingSignatory = ref(false);
		const updatingSignatory = ref(false);

		const update_bank_id = ref(null);
		const update_signatory_id = ref(null);

		load();

		const selectedFile = ref(null);
		const imageUrl = ref(null);

		// methods/functions
		const handleSubmit = async () => {
			response.value = null;
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
				sss_initial: item.value.sss_initial,
				sss_doc_no: item.value.sss_doc_no,
				sss_emp_location_code: item.value.sss_emp_location_code,
				phic_no: item.value.phic_no,
				phic_initial: item.value.phic_initial,
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

			try {
				const res = await axios.post(
					`setupcompany/${route.params.id}?_method=PATCH`,
					form_data
				);
				response.value = res.data;
				if (selectedFile.value) {
					item.value.image_path = res.data.image_path;
					selectedFile.value = null;
					imageUrl.value = null;
					input_image.value.value = null;
				}

				error.value = null;
				unknownError.value = null;
				isPending.value = false;
				window.scrollTo(0, 0);
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
			isBankAdded.value = true;
			item.value.setup_company_banks = [
				newBank,
				...item.value.setup_company_banks,
			];
			console.log(newBank);
			window.scrollTo(0, 0);
		};

		const bankUpdated = (updatedBank) => {
			updatingBank.value = false;
			isBankUpdated.value = true;
			const newbanks = item.value.setup_company_banks.filter(
				(bank) => bank.id !== updatedBank.id
			);
			item.value.setup_company_banks = [updatedBank, ...newbanks];
			window.scrollTo(0, 0);
		};

		const signatoryAdded = (newSignatory) => {
			creatingSignatory.value = false;
			isSignatoryAdded.value = true;
			item.value.setup_company_signatories = [
				newSignatory,
				...item.value.setup_company_signatories,
			];
			console.log(newSignatory);
			window.scrollTo(0, 0);
		};

		const signatoryUpdated = (updatedSignatory) => {
			updatingSignatory.value = false;
			isSignatoryUpdated.value = true;
			const newSignatories = item.value.setup_company_signatories.filter(
				(signatory) => signatory.id !== updatedSignatory.id
			);
			item.value.setup_company_signatories = [
				updatedSignatory,
				...newSignatories,
			];
			window.scrollTo(0, 0);
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

		const onFileSelected = (e) => {
			selectedFile.value = e.target.files[0];
			imageUrl.value = URL.createObjectURL(selectedFile.value);
		};

		const deleteImage = async (id) => {
			if (confirm("Are you sure you want to delete this image?")) {
				const res = axios.delete("setupcompany/deleteImage/" + id);
				item.value.image_path = null;
			}

			// console.log(id);
		};

		return {
			handleSubmit,
			error,
			isPending,
			response,
			item,
			imageUrl,
			onFileSelected,
			deleteImage,
			input_image,

			handleCloseModal,

			isBankAdded,
			isBankUpdated,
			bankAdded,
			bankUpdated,
			creatingBank,
			updatingBank,
			showBankModal,

			isSignatoryAdded,
			isSignatoryUpdated,
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

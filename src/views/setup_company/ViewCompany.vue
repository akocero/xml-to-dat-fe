<template>
	<ViewBank
		v-if="item && viewingBank"
		:bank_id="update_bank_id"
		@hideEditBank="viewingBank = false"
	/>

	<ViewSignatory
		v-if="item && viewingSignatory"
		:signatory_id="update_signatory_id"
		@hideEditSignatory="viewingSignatory = false"
	/>
	<div class="card boiler shadow-md">
		<div class="card-body">
			<ThePageHeader
				v-if="item"
				:heading="item.name"
				routeName="company"
				mode="view"
			/>

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
								>Main
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
								Communication
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
								Contribution
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
											v-if="item.image_path"
											:src="
												'http://127.0.0.1:8000/storage/' +
													item.image_path
											"
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

									<!-- <div class="form-group col-md-6">
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
										>
									</div> -->
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
												id="input_code"
												placeholder="Ex. 1234567"
												v-model="item.code"
											/>
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
												id="input_name"
												placeholder="Ex. John Doe"
												v-model="item.name"
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
												type="text"
												class="form-control"
												id="input_vat_reg"
												placeholder="Ex. johndoe@example.com "
												v-model="item.vat_reg"
											/>
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
												id="input_classification"
												placeholder="Ex. johndoe@example.com "
												v-model="item.classification"
											/>
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
												id="input_address"
												class="form-control"
												v-model="item.address"
											></textarea>
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
												id="input_decimal_place"
												aria-describedby="emailHelp"
												placeholder="Ex. 1234567"
												v-model="item.decimal_place"
											/>
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
												v-model="item.currency"
											>
												<option value=""
													>Choose ...</option
												>
												<option value="php">PHP</option>
												<option value="usd">USD</option>
											</select>
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
												id="input_tel_no"
												placeholder="Ex. 02-8123-4567 "
												v-model="item.tel_no"
											/>
										</div>
										<div class="form-group col-6">
											<label>Tel No Alt.</label>
											<input
												type="text"
												class="form-control"
												id="input_tel_no_alt"
												placeholder="Ex. 02-8123-4567 "
												v-model="item.tel_no_alt"
											/>
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
												id="input_email"
												placeholder="Ex. johndoe@example.com "
												v-model="item.email"
											/>
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
												id="input_website"
												placeholder="Ex. https://www.facebook.com/"
												v-model="item.website"
											/>
										</div>
										<!-- <div class="error">{{ error }}</div> -->
										<div class="form-group col-6">
											<label for="">Facebook</label>
											<input
												type="text"
												class="form-control"
												id="input_facebook"
												placeholder="Ex. https://www.facebook.com/hisoka.morow.904/"
												v-model="item.facebook"
											/>
										</div>

										<div class="form-group col-6">
											<label>Twitter</label>
											<input
												type="text"
												class="form-control"
												id="input_twitter"
												placeholder="Ex. https://www.twitter.com/hisoka.morow.904/ "
												v-model="item.twitter"
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
												id="input_sss_no"
												placeholder="Ex. 3484073113 "
												v-model="item.sss_no"
											/>
										</div>
										<div class="form-group col-6">
											<label>SSS Initial</label>
											<input
												type="text"
												class="form-control"
												id="input_sss_initial"
												placeholder="Ex.  "
												v-model="item.sss_initial"
											/>
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
												id="input_doc_no"
												placeholder="Ex.  "
												v-model="item.sss_doc_no"
											/>
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
												id="input_location_code"
												placeholder="Ex.  "
												v-model="
													item.sss_emp_location_code
												"
											/>
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
												id="input_phic_no"
												placeholder="Ex. 022500018635 "
												v-model="item.phic_no"
											/>
										</div>
										<div class="form-group col-6">
											<label>Philhealth Initial</label>
											<input
												type="text"
												class="form-control"
												id="input_phic_initial"
												placeholder="Ex. "
												v-model="item.phic_initial"
											/>
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
												id="input_phic_signatory"
												placeholder="Ex."
												v-model="item.phic_signatory"
											/>
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
												id="input_phic_position"
												placeholder="Ex. "
												v-model="item.phic_position"
											/>
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
												id="input_hdmf_no"
												placeholder="Ex.123456789101 "
												v-model="item.hdmf_no"
											/>
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
												id="input_tax_branch_code"
												placeholder="Ex. "
												v-model="item.tax_branch_code"
											/>
										</div>

										<div class="form-group col-6">
											<label>Alphalist Number</label>
											<input
												type="text"
												class="form-control"
												id="input_alphalist_no"
												placeholder="Ex. "
												v-model="item.alphalist_no"
											/>
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
									<div class="col-12">
										<h4 class="tab-pane-title">
											Bank List
										</h4>
									</div>

									<div class="col-md-12">
										<CompanyBankTable
											v-if="
												item.setup_company_banks.length
											"
											:banks="item.setup_company_banks"
											@handleShowBankModal="
												showBankModal(
													$event.action,
													$event.id
												)
											"
											:viewMode="true"
										/>
										<div v-else class="mt-2">
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
									<div class="col-12">
										<h4 class="tab-pane-title">
											Signatory List
										</h4>
									</div>

									<div class="col-md-12">
										<CompanySignatoryTable
											v-if="
												item.setup_company_signatories
													.length
											"
											:signatories="
												item.setup_company_signatories
											"
											@handleShowSignatoryModal="
												showSignatoryModal(
													$event.action,
													$event.id
												)
											"
											:viewMode="true"
										/>
										<div v-else class="mt-2">
											No Signatory available!
										</div>
									</div>
								</div>
							</div>
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
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import getItem from "@/composables/getItem";
import useViewMode from "@/composables/useViewMode";

import ThePageHeader from "@/components/layouts/ThePageHeader";
import Spinner from "@/components/Spinner.vue";

import feather from "feather-icons";

import endpoints from "@/utils/endpoints";
import ViewBank from "./ViewBank";
import ViewSignatory from "./ViewSignatory";
import CompanySignatoryTable from "./CompanySignatoryTable.vue";
import CompanyBankTable from "./CompanyBankTable.vue";
export default {
	name: "UpdateCompany",
	components: {
		Spinner,
		ThePageHeader,
		CompanySignatoryTable,
		CompanyBankTable,
		ViewBank,
		ViewSignatory,
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
			endpoints.setupCompany
		);
		const { disableThisFields } = useViewMode();
		const viewingBank = ref(false);
		const update_bank_id = ref(null);
		const viewingSignatory = ref(false);
		const update_signatory_id = ref(null);

		onBeforeMount(async () => {
			await load();
			disableThisFields(["input", "select", "textarea"]);
		});

		const showBankModal = (type, value = null) => {
			viewingBank.value = true;
			update_bank_id.value = value;
		};

		const showSignatoryModal = (type, value = null) => {
			viewingSignatory.value = true;
			update_signatory_id.value = value;
		};

		return {
			item,
			showBankModal,
			showSignatoryModal,
			viewingBank,
			viewingSignatory,
			update_bank_id,
			update_signatory_id,
		};
	},
};
</script>

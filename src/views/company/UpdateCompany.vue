<template>
	<transition name="alert">
		<Alert
			v-if="response"
			:status="'success'"
			:message="'Company Updated'"
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
					<h5 class="h4 mb-0 text-primary">Update Company</h5>
					<router-link class="btn btn-light" :to="{ name: 'company' }"
						>Cancel <i v-html="chevronRight"></i>
					</router-link>
				</div>
			</div>

			<div class="row">
				<div class="col-12">
					<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
						<li class="nav-item">
							<a class="nav-link active" :class="mainTabHasError ? 'pr-4' : ''" id="pills-main-tab" data-toggle="pill" href="#pills-main" role="tab" aria-controls="pills-main" aria-selected="true">Main
							<i  v-if="mainTabHasError" v-html="alertTriangle" class="text-danger icon-error"></i>
							</a>
							
						</li>
						<li class="nav-item">
							<a class="nav-link" :class="commTabHasError ? 'pr-4' : ''"  id="pills-comm-tab" data-toggle="pill" href="#pills-comm" role="tab" aria-controls="pills-comm" aria-selected="false">
							Communication
							<i  v-if="commTabHasError" v-html="alertTriangle" class="text-danger icon-error"></i> 
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" 
							:class="connTabHasError ? 'pr-4' : ''"  
							id="pills-contri-tab" data-toggle="pill" href="#pills-contri" role="tab" aria-controls="pills-contri" aria-selected="false">
							Contribution
							<i  v-if="connTabHasError" v-html="alertTriangle" class="text-danger icon-error"></i>
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="pills-banks-tab" data-toggle="pill" href="#pills-banks" role="tab" aria-controls="pills-banks" aria-selected="false">Banks</a>
							
						</li>
						<li class="nav-item">
							<a class="nav-link" id="pills-signatories-tab" data-toggle="pill" href="#pills-signatories" role="tab" aria-controls="pills-signatories" aria-selected="false">Signatory</a>
						</li>
					</ul>
					<form @submit.prevent="handleSubmit" id="form_update_comapny" v-if="item">

						<div class="tab-content pt-3" id="pills-tabContent">
							
							<div class="tab-pane fade show active" id="pills-main" role="tabpanel" aria-labelledby="pills-main-tab">
								
								<div class="row pr-3 pb-3">
									<div class="col-md-4">
										<h5 class="h5">Company Image</h5>
										<label for="">
											You can change your avatar here or remove the
											current avatar to revert to gravatar.com
										</label>
									</div>

									<div class="col-md-2">
										<img v-if="item.image_path"
											:src="'http://127.0.0.1:8000/storage/' + item.image_path"
											
											alt=""
											style="width: 90%;"
										/>
										<img v-else
											src="../../assets/no-image.png"
											alt=""
											style="width: 90%;"
										/>
									</div>

									<div class="form-group col-md-6">
										<label for="">Upload Image</label>
										<input type="file" class="d-block mt-2" @change="onFileSelected" />
										<small>The maximum file size allowed is 200KB.</small
										><br /><br />
										<small
											v-if="error && error.errors.image_path"
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
										<label for="">
											You can change your avatar here or remove the
											current avatar to revert to gravatar.com
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-4">
											<label>
												Code
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error && error.errors.code && 'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 1234567"
												v-model="item.code"
											/>
											<small
												v-if="error && error.errors.code"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.code[0] }}
											</small>
										</div>
										<!-- <div class="error">{{ error }}</div> -->
										<div class="form-group col-8">
											<label for=""
												>Name
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error && error.errors.name && 'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. John Doe"
												v-model="item.name"
											/>
											<small
												v-if="error && error.errors.name"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.name[0] }}
											</small>
										</div>

										<div class="form-group col-4">
											<label
												>Vat Registration
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.vat_reg &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. johndoe@example.com "
												v-model="item.vat_reg"
											/>
											<small
												v-if="error && error.errors.vat_reg"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.vat_reg[0] }}
											</small>
										</div>

										

										<div class="form-group col-8">
											<label
												>Classification
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.classification &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. johndoe@example.com "
												v-model="item.classification"
											/>
											<small
												v-if="error && error.errors.classification"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.classification[0] }}
											</small>
										</div>

										<div class="col-md-12">
											<label for=""
												>Address
												<span class="text-danger text-bold">*</span>
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
												v-model="item.address"
											></textarea>
											<small
												v-if="error && error.errors.address"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.address[0] }}
											</small>
										</div>
									</div>
								</div>					
				
							</div>
							<div class="tab-pane fade" id="pills-comm" role="tabpanel" aria-labelledby="pills-comm-tab">
								<div class="row">
									<div class="col-4">
										<h5 class="h5">Contact Info</h5>
										<label for="">
											You can change your avatar here or remove the
											current avatar to revert to gravatar.com
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>Tel No.
												<span class="text-danger text-bold">*</span>
											</label>
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
												placeholder="Ex. 02-8123-4567 "
												v-model="item.tel_no"
											/>
											<small
												v-if="error && error.errors.tel_no"
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
														error.errors.tel_no_alt &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 02-8123-4567 "
												v-model="item.tel_no_alt"
											/>
											<small
												v-if="error && error.errors.tel_no_alt"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.tel_no_alt[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>Email
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="email"
												class="form-control"
												:class="[
													error && error.errors.email && 'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. johndoe@example.com "
												v-model="item.email"
											/>
											<small
												v-if="error && error.errors.email"
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
										<label for="">
											You can change your avatar here or remove the
											current avatar to revert to gravatar.com
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
												placeholder="Ex. https://www.facebook.com/"
												v-model="item.website"
											/>
											<small
												v-if="error && error.errors.website"
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
												placeholder="Ex. https://www.facebook.com/hisoka.morow.904/"
												v-model="item.facebook"
											/>
											<small
												v-if="error && error.errors.facebook"
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
												placeholder="Ex. https://www.twitter.com/hisoka.morow.904/ "
												v-model="item.twitter"
											/>
											<small
												v-if="error && error.errors.twitter"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.twitter[0] }}
											</small>
										</div>
									</div>
								</div>
							</div>
							<div class="tab-pane fade" id="pills-contri" role="tabpanel" aria-labelledby="pills-contri-tab">
								<div class="row">
									<div class="col-4">
										<h5 class="h5">SSS Info</h5>
										<label for="">
											You can change your avatar here or remove the
											current avatar to revert to gravatar.com
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>SSS Number
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.sss_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 3484073113 "
												v-model="item.sss_no"
											/>
											<small
												v-if="error && error.errors.sss_no"
												id="emailHelp"
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
														error.errors.sss_initial &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex.  "
												v-model="item.sss_initial"
											/>
											<small
												v-if="error && error.errors.sss_initial"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.sss_initial[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>SSS Doc No
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error && error.errors.sss_doc_no && 'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex.  "
												v-model="item.sss_doc_no"
											/>
											<small
												v-if="error && error.errors.sss_doc_no"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.sss_doc_no[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>SSS Employer Location Code
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error && error.errors.sss_emp_location_code && 'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex.  "
												v-model="item.sss_emp_location_code"
											/>
											<small
												v-if="error && error.errors.sss_emp_location_code"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.sss_emp_location_code[0] }}
											</small>
										</div>

									</div>
								</div>
								<hr class="pb-3" />
								<div class="row">
									<div class="col-4">
										<h5 class="h5">Philhealth Info</h5>
										<label for="">
											You can change your avatar here or remove the
											current avatar to revert to gravatar.com
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>Philhealth Number
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.phic_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. 022500018635 "
												v-model="item.phic_no"
											/>
											<small
												v-if="error && error.errors.phic_no"
												id="emailHelp"
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
														error.errors.phic_initial &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. "
												v-model="item.phic_initial"
											/>
											<small
												v-if="error && error.errors.phic_initial"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.phic_initial[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>Philhealth Signatory
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error && error.errors.phic_signatory && 'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex."
												v-model="item.phic_signatory"
											/>
											<small
												v-if="error && error.errors.phic_signatory"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.phic_signatory[0] }}
											</small>
										</div>

										<div class="form-group col-6">
											<label
												>Philhealth Position
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error && error.errors.phic_position && 'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. "
												v-model="item.phic_position"
											/>
											<small
												v-if="error && error.errors.phic_position"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.phic_position[0] }}
											</small>
										</div>

									</div>
								</div>
								<hr class="pb-3" />
								<div class="row">
									<div class="col-4">
										<h5 class="h5">Pag-ibig Info</h5>
										<label for="">
											You can change your avatar here or remove the
											current avatar to revert to gravatar.com
										</label>
									</div>

									<div class="row col-8">

										<div class="form-group col-6">
											<label
												>Pag-ibig Number
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error && error.errors.hdmf_no && 'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex.123456789101 "
												v-model="item.hdmf_no"
											/>
											<small
												v-if="error && error.errors.hdmf_no"
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
										<h5 class="h5">Other Conributon Details</h5>
										<label for="">
											You can change your avatar here or remove the
											current avatar to revert to gravatar.com
										</label>
									</div>

									<div class="row col-8">
										<div class="form-group col-6">
											<label
												>Tax Branch Code
												<span class="text-danger text-bold">*</span>
											</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.tax_branch_code &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. "
												v-model="item.tax_branch_code"
											/>
											<small
												v-if="error && error.errors.tax_branch_code"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.tax_branch_code[0] }}
											</small>
										</div>
										<div class="form-group col-6">
											<label>Alphalist Number</label>
											<input
												type="text"
												class="form-control"
												:class="[
													error &&
														error.errors.alphalist_no &&
														'is-invalid',
												]"
												id=""
												aria-describedby="emailHelp"
												placeholder="Ex. "
												v-model="item.alphalist_no"
											/>
											<small
												v-if="error && error.errors.alphalist_no"
												id="emailHelp"
												class="form-text text-danger"
											>
												{{ error.errors.alphalist_no[0] }}
											</small>
										</div>

									</div>
								</div>
							</div>
							<div class="tab-pane fade" id="pills-banks" role="tabpanel" aria-labelledby="pills-banks-tab">
								<div class="row">
									<div class="col-12 d-flex justify-content-between mb-3 align-items-center">
										<h4>Bank list</h4>
										<button type="button" class="btn btn-custom-success btn-sm px-2">Add Bank</button>
									</div>
									
									<div class="col-md-12">
										<table class="table">
											<thead>
												<tr>
												<th width="15%">Code</th>
												<th>Name</th>
												<th>Description</th>
												<th width="10%">Currency</th>
												<th width="10%">Amount</th>
												</tr>
											</thead>
											<tbody>
												<tr>
												<th scope="row">1</th>
												<td>Mark</td>
												<td>Otto</td>
												<td>@mdo</td>
												<td>@mdo</td>
												</tr>
												<tr>
												<th scope="row">2</th>
												<td>Jacob</td>
												<td>Thornton</td>
												<td>@fat</td>
												<td>@mdo</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="tab-pane fade" id="pills-signatories" role="tabpanel" aria-labelledby="pills-signatories-tab">
								<div class="row">
									<div class="col-12 d-flex justify-content-between mb-3 align-items-center">
										<h4>Signatory list</h4>
										<button type="button" class="btn btn-custom-success btn-sm px-2">Add Signatory</button>
									</div>
									
									<div class="col-md-12">
										<table class="table">
											<thead>
												<tr>
												<th scope="col">#</th>
												<th scope="col">First</th>
												<th scope="col">Last</th>
												<th scope="col">Handle</th>
												</tr>
											</thead>
											<tbody>
												<tr>
												<th scope="row">1</th>
												<td>Mark</td>
												<td>Otto</td>
												<td>@mdo</td>
												</tr>
												<tr>
												<th scope="row">2</th>
												<td>Jacob</td>
												<td>Thornton</td>
												<td>@fat</td>
												</tr>
												<tr>
												<th scope="row">3</th>
												<td>Larry</td>
												<td>the Bird</td>
												<td>@twitter</td>
												</tr>
											</tbody>
										</table>
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
import { onUnmounted } from "vue";
import useUpdate from "../../composables/useUpdate";
import getItem from "../../composables/getItem";
import Alert from "../../components/Alert";
import { useRoute } from "vue-router";
import Spinner from "../../components/Spinner.vue";
import feather from "feather-icons";
export default {
	name: "UpdateCompany",
	components: {
		Alert,
		Spinner,
	},
	computed: {
		chevronRight: function() {
			return feather.icons["chevron-right"].toSvg({
				width: 18,
			});
		},
	},
	setup() {
		const route = useRoute();
		const { response, error, update, isPending } = useUpdate();
		const { item, error: errorData, load } = getItem(
			route.params.id,
			"setupcompany"
		);

		onUnmounted(() => {
			error.value = null;
			response.value = null;
		});

		load();

		const handleSubmit = async () => {
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
			};

			await update(`setupcompany/${route.params.id}`, data);

			if (!error.value) {
				window.scrollTo(0, 0);
			}
		};

		const handleCloseModal = () => {
			error.value.message = null;
			response.value = "";
		};

		return {
			handleSubmit,
			error,
			isPending,
			response,
			item,
			handleCloseModal,
		};
	},
};
</script>

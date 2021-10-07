<template>
	<div class="card boiler shadow-md">
		<div class="card-body">
			<ThePageHeader
				v-if="item"
				:heading="
					`${item.last_name},
						${item.first_name} 
						 ${item.maiden_name ? item.maiden_name : ''} ${
						item.extension_name ? item.extension_name : ''
					}
						Information`
				"
				routeName="employee-management"
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
								>Employee Info
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
								Contact Info
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
								Other Info
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
											v-else
											src="../../assets/no-image.png"
											alt=""
											style="width: 90%"
										/>
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
													id="input_employee_id"
													placeholder="Ex. 1234567"
													v-model="item.employee_id"
													disabled
												/>
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
												id="input_first_name"
												placeholder="Ex. John Doe"
												v-model="item.first_name"
												disabled
											/>
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
												id="input_last_name"
												placeholder="Ex. johndoe@example.com "
												v-model="item.last_name"
												disabled
											/>
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
												id="input_maiden_name"
												placeholder="Ex. johndoe@example.com "
												v-model="item.maiden_name"
												disabled
											/>
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
												id="input_extension_name"
												placeholder="Ex. 1234567"
												v-model="item.extension_name"
												disabled
											/>
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
												id="input_gender"
												class="form-control"
												:class="[
													error &&
														error.errors.gender &&
														'is-invalid',
												]"
												v-model="item.gender"
												disabled
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
												id="input_birthdate"
												placeholder="Ex. 02-8123-4567 "
												v-model="item.birthdate"
												disabled
											/>
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
												id="input_birthplace"
												disabled
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
												placeholder="Ex. https://www.tel_no.com/"
												v-model="item.citizenship"
												disabled
											/>
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
												id=""
												class="form-control"
												:class="[
													error &&
														error.errors
															.civil_status &&
														'is-invalid',
												]"
												v-model="item.civil_status"
												disabled
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
												placeholder="Ex. johndoe@example.com "
												v-model="item.email"
												disabled
											/>
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
												placeholder="Ex. https://www.tel_no.com/hisoka.morow.904/"
												v-model="item.tel_no"
												disabled
											/>
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
												placeholder="Ex. https://www.mobile_no.com/hisoka.morow.904/ "
												v-model="item.mobile_no"
												disabled
											/>
										</div>
									</div>
								</div>
								<hr />
								<div class="row pb-2">
									<div
										class="col-12 d-flex justify-content-between align-items-center pb-1"
									>
										<h5 class="h5 mb-0">Address List</h5>
									</div>
									<EmployeeAddressList
										:addresses="item.addresses"
									/>
								</div>
								<hr />
								<div class="row pb-2">
									<div
										class="col-12 d-flex justify-content-between align-items-center pb-1"
									>
										<h5 class="h5 mb-0">Relative List</h5>
									</div>

									<!-- <EmployeeRelativeList
										:relatives="item.relatives"
									/> -->
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
											v-else
											src="../../assets/no-image.png"
											alt=""
											style="width: 90%"
										/>
									</div>

									<!-- <div class="form-group col-md-6">
										<label for="">Upload Image</label>
										<input
											type="file"
											class="d-block mt-2"
											@change="onSignatureFileSelected"
											disabled
										/>
										<small
											>The maximum file size allowed is
											200KB.</small
										>
									</div> -->

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
												placeholder="Ex. 3484073113 "
												v-model="item.height"
												disabled
											/>
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
												placeholder="Ex.  "
												v-model="item.weight"
												disabled
											/>
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
												placeholder="Ex.  "
												v-model="item.blood_type"
												disabled
											/>
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
										</div>

										<EmployeeDependentList
											:dependents="item.dependents"
										/>
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
import { ref, computed, onBeforeMount } from "vue";
import { v4 as uuidv4 } from "uuid";
import feather from "feather-icons";
import EmployeeAddressList from "./EmployeeAddressList.vue";
// import EmployeeRelativeList from "./EmployeeRelativeList.vue";
import EmployeeDependentList from "./EmployeeDependentList.vue";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import { useRoute, useRouter } from "vue-router";
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";
import getItem from "../../composables/getItem";
import ThePageHeader from "@/components/layouts/ThePageHeader";
import endpoints from "@/utils/endpoints";

export default {
	name: "CreateCompany",
	components: {
		Alert,
		Spinner,
		EmployeeAddressList,
		// EmployeeRelativeList,
		EmployeeDependentList,
		ThePageHeader,
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
		const router = useRouter();
		const { error, response, loading, create, unknownError } = useData();
		const { item, error: errorData, load, loading: isLoading } = getItem(
			route.params.id,
			endpoints.employee
		);
		const { pushAlert } = useAlert();

		onBeforeMount(async () => {
			await load();

			item.value.addresses = JSON.parse(item.value.addresses);
			item.value.relatives = JSON.parse(item.value.relatives);
			item.value.dependents = JSON.parse(item.value.dependents);
			// console.log(item.value.addresses)
			console.log(item.value);

			setTimeout(() => {
				const tags = ["input", "select", "textarea", "button"];
				tags.forEach((tagName) => {
					var inputs = document.getElementsByTagName(tagName);
					console.log(inputs[0]);
					for (var i = 0; i < inputs.length; i++) {
						inputs[i].disabled = true;
					}
				});
			}, 500);

			if (route.query.q) {
				pushAlert("success", route.query.q);
				router.replace({ query: null });
			}
		});

		return {
			item,

			error,
			loading,
			response,
		};
	},
};
</script>

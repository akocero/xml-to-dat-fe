<template>
	<transition name="alert">
		<Alert
			v-if="alert"
			:status="alert.status"
			:message="alert.message"
			@closeModal="alert = false"
		/>
	</transition>

	<div class="card boiler shadow-md">
		<div class="card-body">
			<ThePageHeader
				heading="New Payroll Parameter"
				routeName="payroll-parameter"
				mode="create"
			/>

			<div class="row">
				<div class="col-md-12">
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
								id: 'working',
								label: 'Working',
								error: commTabHasError,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'government',
								label: 'Government',
								error: connTabHasError,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'night-diff',
								label: 'Night Differencial',
								error: null,
								active: false,
								disabled: false,
								tooltip:
									'Please save your information for Main, Communication, and Contribution tabs to enable Bank Tab',
							},
							{
								id: 'undertime',
								label: 'Undertime Table',
								error: null,
								active: false,
								disabled: false,
								tooltip:
									'Please save your information for Main, Communication, and Contribution tabs to enable Signatory Tab',
							},
							{
								id: 'overtime',
								label: 'Overtime Table',
								error: null,
								active: false,
								disabled: false,
								tooltip:
									'Please save your information for Main, Communication, and Contribution tabs to enable Signatory Tab',
							},
							{
								id: 'late',
								label: 'Late Table',
								error: null,
								active: false,
								disabled: false,
								tooltip:
									'Please save your information for Main, Communication, and Contribution tabs to enable Signatory Tab',
							},
							{
								id: 'excess',
								label: 'Excess Table',
								error: null,
								active: false,
								disabled: false,
								tooltip:
									'Please save your information for Main, Communication, and Contribution tabs to enable Signatory Tab',
							},
						]"
					/>
				</div>
			</div>
			<form @submit.prevent="handleSubmit" id="form_create_user">
				<div class="tab-content pt-3" id="pills-tabContent">
					<div
						class="tab-pane fade show active"
						id="pills-main"
						role="tabpanel"
						aria-labelledby="pills-main-tab"
					>
						<div class="row">
							<BaseRowHeading
								heading="Main Info"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>

							<div class="form-group col-3">
								<BaseInputField
									id="input_code"
									label="Code"
									v-model="code"
									:error="error"
									:errorField="error?.errors?.code || null"
									placeholder="Ex. admin, user, hr, payroll master"
									:required="true"
								/>
							</div>
							<div class="form-group col-md-5">
								<BaseTextAreaField
									id="input_description"
									label="Description"
									v-model="description"
									:error="error"
									:errorField="
										error?.errors?.description || null
									"
									placeholder="Ex."
									:required="false"
								/>
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="pills-working"
						role="tabpanel"
						aria-labelledby="pills-working-tab"
					>
						<div class="row">
							<BaseRowHeading
								heading="Working Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="row col-md-8">
								<div class="form-group col-4">
									<BaseInputField
										id="input_code"
										label="Code"
										v-model="code"
										:error="error"
										:errorField="
											error?.errors?.code || null
										"
										placeholder="Ex. admin, user, hr, payroll master"
										:required="true"
									/>
								</div>
								<div class="form-group col-4">
									<BaseInputField
										id="input_code"
										label="Code"
										v-model="code"
										:error="error"
										:errorField="
											error?.errors?.code || null
										"
										placeholder="Ex. admin, user, hr, payroll master"
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
											error?.errors?.currency || null
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
						<hr class="mb-4" />
						<div class="row">
							<BaseRowHeading
								heading="Logs Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="form-group col-4">
								<BaseSelectField
									id="input_currency"
									label="Currency"
									v-model="currency"
									:error="error"
									:errorField="
										error?.errors?.currency || null
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
					<div
						class="tab-pane fade"
						id="pills-government"
						role="tabpanel"
						aria-labelledby="pills-government-tab"
					>
						<div class="row">
							<BaseRowHeading
								heading="Contructual Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="row col-md-8">
								<div class="form-group col-4">
									<BaseInputField
										id="input_code"
										label="Code"
										v-model="code"
										:error="error"
										:errorField="
											error?.errors?.code || null
										"
										placeholder="Ex. admin, user, hr, payroll master"
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
											error?.errors?.currency || null
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
						<hr class="mb-4" />
						<div class="row">
							<BaseRowHeading
								heading="Annualized Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="row col-md-8">
								<div class="form-group col-4">
									<BaseInputField
										id="input_code"
										label="Code"
										v-model="code"
										:error="error"
										:errorField="
											error?.errors?.code || null
										"
										placeholder="Ex. admin, user, hr, payroll master"
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
											error?.errors?.currency || null
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
						<hr class="mb-4" />
						<div class="row">
							<BaseRowHeading
								heading="Excemption Ceiling Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="row col-md-8">
								<div class="form-group col-4">
									<BaseInputField
										id="input_code"
										label="Code"
										v-model="code"
										:error="error"
										:errorField="
											error?.errors?.code || null
										"
										placeholder="Ex. admin, user, hr, payroll master"
										:required="true"
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="pills-night-diff"
						role="tabpanel"
						aria-labelledby="pills-night-diff-tab"
					>
						<div class="row">
							<BaseRowHeading
								heading="Night Differential Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="row col-md-8">
								<div class="form-group col-4">
									<BaseInputField
										id="input_code"
										label="Code"
										v-model="code"
										:error="error"
										:errorField="
											error?.errors?.code || null
										"
										placeholder="Ex. admin, user, hr, payroll master"
										:required="true"
									/>
								</div>
								<div class="form-group col-4">
									<BaseInputField
										id="input_code"
										label="Code"
										v-model="code"
										:error="error"
										:errorField="
											error?.errors?.code || null
										"
										placeholder="Ex. admin, user, hr, payroll master"
										:required="true"
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="pills-undertime"
						role="tabpanel"
						aria-labelledby="pills-undertime-tab"
					>
						<div class="row">
							<BaseRowHeading
								heading="Night Differential Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
								colspan="col-md-12"
							/>
							<div class="row col-md-12 pl-3">
								<table class="table table-bordered">
									<thead>
										<tr>
											<th>Range in Minutes</th>
											<th>Range in Minutes</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<input
													type="text"
													class="table_input"
												/>
											</td>
											<td>
												<input
													type="text"
													class="table_input"
												/>
											</td>
											<td>
												<button
													class="btn btn-sm btn-danger"
												>
													Del
												</button>
											</td>
										</tr>
										<tr>
											<td
												colspan="100"
												class="text-center"
											>
												<button
													class="btn btn-sm btn-success"
												>
													Add New
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="pills-overtime"
						role="tabpanel"
						aria-labelledby="pills-overtime-tab"
					>
						<div class="row"></div>
					</div>
					<div
						class="tab-pane fade"
						id="pills-late"
						role="tabpanel"
						aria-labelledby="pills-late-tab"
					>
						<div class="row"></div>
					</div>
					<div
						class="tab-pane fade"
						id="pills-excess"
						role="tabpanel"
						aria-labelledby="pills-excess-tab"
					>
						<div class="row"></div>
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
							Saving ...
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";

import feather from "feather-icons";

import { ref, computed } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import BaseNavigationTab from "@/components/BaseNavigationTab";
import BaseRowHeading from "@/components/BaseRowHeading";
import BaseSelectField from "@/components/BaseSelectField";
import BaseInputField from "@/components/BaseInputField";
import ThePageHeader from "@/components/layouts/ThePageHeader";
import BaseTextAreaField from "@/components/BaseTextAreaField.vue";
import { useStore } from "vuex";
import endpoints from "@/utils/endpoints";
export default {
	name: "CreateRole",
	components: {
		Alert,
		Spinner,
		BaseInputField,
		ThePageHeader,
		BaseTextAreaField,
		BaseRowHeading,
		BaseNavigationTab,
		BaseSelectField,
	},
	computed: {
		chevronRight: function() {
			return feather.icons["chevron-right"].toSvg({
				width: 18,
			});
		},
	},
	setup() {
		const { response, error, create, loading, unknownError } = useData();
		const { alert, displayAlert } = useAlert();
		const router = useRouter();
		const store = useStore();

		const code = ref("");
		const description = ref("");
		const abilities = ref([]);
		const roleAdded = ref(false);
		const abilitiesArray = computed(() => store.getters.getAbilities);
		const handleSubmit = async () => {
			const data = {
				code: code.value,
				abilities: abilities.value,
				description: description.value,
			};

			console.log(data);

			await create(endpoints.setupRole, data);

			if (!error.value) {
				console.log("user created");
				roleAdded.value = true;
				router.push({
					name: "role",
					params: { roleAdded: roleAdded.value },
				});
				// displayAlert("success", "User Added");
			} else {
				displayAlert("error", "Invalid Inputs");
				console.log("error: ", error.value);
			}
		};

		onBeforeRouteLeave((to, from) => {
			if (!roleAdded.value) {
				const answer = window.confirm(
					"Do you really want to leave? you have unsaved changes!"
				);
				// cancel the navigation and stay on the same page
				if (!answer) return false;
			}
		});

		const convertToArray = (object) => {
			return object.map((obj) => {
				return obj.method;
			});
		};

		const pushToAbilities = (array) => {
			let tempAbility = [];
			array.forEach((el) => {
				if (!abilities.value.includes(el)) {
					tempAbility.push(el);
				}
			});
			abilities.value = [...abilities.value, ...tempAbility];
		};

		return {
			handleSubmit,

			code,
			abilities,
			description,

			error,
			loading,
			response,
			alert,
			abilitiesArray,
			convertToArray,
			pushToAbilities,
		};
	},
};
</script>

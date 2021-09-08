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
								error: workingTabHasError,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'government',
								label: 'Government',
								error: govTabHasError,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'night-diff',
								label: 'Night Differencial',
								error: nightDiffTabHasError,
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
									placeholder="Ex. Driver, Guard"
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
									placeholder="Ex. Driver, Guard"
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
										id="input_no_working_days_in_year"
										label="No. of Working Days in a Year"
										v-model="no_working_days_in_year"
										:error="error"
										:errorField="
											error?.errors
												?.no_working_days_in_year ||
												null
										"
										placeholder="Ex. 316"
										:required="true"
										type="number"
									/>
								</div>
								<div class="form-group col-4">
									<BaseInputField
										id="input_no_working_hours_in_day"
										label="No. of Working Hours in a Day"
										v-model="no_working_hours_in_day"
										:error="error"
										:errorField="
											error?.errors
												?.no_working_hours_in_day ||
												null
										"
										placeholder="Ex. 9"
										:required="true"
										type="number"
									/>
								</div>
								<div class="form-group col-4">
									<BaseSelectField
										id="input_no_periods_in_month"
										label="No. of Periods in a Month"
										v-model="no_periods_in_month"
										:error="error"
										:errorField="
											error?.errors
												?.no_periods_in_month || null
										"
										:options="[
											{
												value: 1,
												label: '1 - Monthly',
											},
											{
												value: 2,
												label: '2 - Semi Monthly',
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
								heading="Logs Status Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="form-group col-4">
								<BaseSelectField
									id="input_log_status"
									label="Log Status"
									v-model="log_status"
									:error="error"
									:errorField="
										error?.errors?.log_status || null
									"
									:options="[
										{
											value: 0,
											label: 'Disregard Log Status',
										},
										{
											value: 1,
											label: 'Requiring Log Status',
										},
									]"
									:required="false"
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
								<div class="form-group col-5">
									<BaseInputField
										id="input_contructual_withhold_percent"
										label="Percent to Withhold for Contructual"
										v-model="contructual_withhold_percent"
										:error="error"
										:errorField="
											error?.errors
												?.contructual_withhold_percent ||
												null
										"
										placeholder="Ex. 10"
										:required="false"
										type="number"
									/>
								</div>
								<div class="form-group col-4">
									<BaseSelectField
										id="input_gross_based"
										label="Base on Gross ?"
										v-model="gross_based"
										:error="error"
										:errorField="
											error?.errors?.gross_based || null
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
									<BaseSelectField
										id="input_withhold_start_month"
										label="Starting Month"
										v-model="withhold_start_month"
										:error="error"
										:errorField="
											error?.errors
												?.withhold_start_month || null
										"
										:options="[
											{
												value: 1,
												label: '1 - January',
											},
											{
												value: 2,
												label: '2 - February',
											},
										]"
										:required="false"
									/>
								</div>
								<div class="form-group col-4">
									<BaseSelectField
										id="input_withhold_start_period"
										label="Starting Period"
										v-model="withhold_start_period"
										:error="error"
										:errorField="
											error?.errors
												?.withhold_start_period || null
										"
										:options="[
											{
												value: 1,
												label: '1 - First Period',
											},
											{
												value: 2,
												label: '2 - Second Period',
											},
										]"
										:required="false"
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
										id="input_end_of_year_bonus"
										label="13th Month Exception Ceiling"
										v-model="end_of_year_bonus"
										:error="error"
										:errorField="
											error?.errors?.end_of_year_bonus ||
												null
										"
										placeholder="Ex. 90000"
										:required="true"
										type="number"
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
										id="input_night_diff_start"
										label="From"
										v-model="night_diff_start"
										:error="error"
										:errorField="
											error?.errors?.night_diff_start ||
												null
										"
										placeholder="Ex."
										:required="true"
										type="time"
									/>
								</div>
								<div class="form-group col-4">
									<BaseInputField
										id="input_night_diff_end"
										label="To"
										v-model="night_diff_end"
										:error="error"
										:errorField="
											error?.errors?.night_diff_end ||
												null
										"
										placeholder="Ex."
										:required="true"
										type="time"
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
								heading="Undertime Computation Limit"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
								colspan="col-md-12"
							/>
							<div class="row col-md-12 pl-3">
								<PayrollParameterTable
									type="undertime"
									:table="undertime_table"
									@handleAddInTable="handleAddInTable($event)"
									@handleDeleteInTable="
										handleDeleteInTable($event)
									"
								/>
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="pills-overtime"
						role="tabpanel"
						aria-labelledby="pills-overtime-tab"
					>
						<div class="row">
							<BaseRowHeading
								heading="Overtime Computation Limit"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
								colspan="col-md-12"
							/>
							<div class="row col-md-12 pl-3">
								<PayrollParameterTable
									type="overtime"
									:table="overtime_table"
									@handleAddInTable="handleAddInTable($event)"
									@handleDeleteInTable="
										handleDeleteInTable($event)
									"
								/>
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="pills-late"
						role="tabpanel"
						aria-labelledby="pills-late-tab"
					>
						<div class="row">
							<BaseRowHeading
								heading="Late Computation Limit"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
								colspan="col-md-12"
							/>
							<div class="row col-md-12 pl-3">
								<PayrollParameterTable
									type="late"
									:table="late_table"
									@handleAddInTable="handleAddInTable($event)"
									@handleDeleteInTable="
										handleDeleteInTable($event)
									"
								/>
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="pills-excess"
						role="tabpanel"
						aria-labelledby="pills-excess-tab"
					>
						<div class="row">
							<BaseRowHeading
								heading="Excess Computation Limit"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
								colspan="col-md-12"
							/>
							<div class="row col-md-12 pl-3">
								<PayrollParameterTable
									type="excess"
									:table="excess_table"
									@handleAddInTable="handleAddInTable($event)"
									@handleDeleteInTable="
										handleDeleteInTable($event)
									"
								/>
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
import PayrollParameterTable from "./PayrollParameterTable.vue";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import BaseNavigationTab from "@/components/BaseNavigationTab";
import BaseRowHeading from "@/components/BaseRowHeading";
import BaseSelectField from "@/components/BaseSelectField";
import BaseInputField from "@/components/BaseInputField";
import ThePageHeader from "@/components/layouts/ThePageHeader";
import BaseTextAreaField from "@/components/BaseTextAreaField.vue";
import { v4 as uuidv4 } from "uuid";

import endpoints from "@/utils/endpoints";
export default {
	name: "CreatePayrollParameter",
	components: {
		Alert,
		Spinner,
		BaseInputField,
		ThePageHeader,
		BaseTextAreaField,
		BaseRowHeading,
		BaseNavigationTab,
		BaseSelectField,
		PayrollParameterTable,
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
		const code = ref("");
		const description = ref("");
		const no_working_days_in_year = ref("");
		const no_working_hours_in_day = ref("");
		const no_periods_in_month = ref("");
		const log_status = ref("");
		const contructual_withhold_percent = ref("");
		const gross_based = ref("");
		const withhold_start_month = ref("");
		const withhold_start_period = ref("");
		const end_of_year_bonus = ref("");
		const night_diff_start = ref("");
		const night_diff_end = ref("");
		const undertime_table = ref([]);
		const late_table = ref([]);
		const overtime_table = ref([]);
		const excess_table = ref([]);
		const roleAdded = ref(false);

		const validateAndAddDataIn = (data, tempData) => {
			let err = false;
			data.forEach((item) => {
				if (item.range == 0 || item.value == 0) {
					err = true;
				}
				console.log(item.range, item.value);
			});
			console.log(err);
			err
				? displayAlert("info", "Please fill out range and value")
				: data.push(tempData);
		};

		const handleAddInTable = (type) => {
			const tempData = {
				id: uuidv4(),
				range: "",
				value: "",
			};
			if (type === "undertime") {
				validateAndAddDataIn(undertime_table.value, tempData);
			}
			if (type === "overtime") {
				validateAndAddDataIn(overtime_table.value, tempData);
			}
			if (type === "late") {
				validateAndAddDataIn(late_table.value, tempData);
			}
			if (type === "excess") {
				validateAndAddDataIn(excess_table.value, tempData);
			}
		};

		const handleDeleteInTable = ({ type, id }) => {
			if (type === "undertime") {
				undertime_table.value = undertime_table.value.filter(
					(undertime) => undertime.id != id
				);
			}

			if (type === "late") {
				late_table.value = late_table.value.filter(
					(late) => late.id != id
				);
			}

			if (type === "overtime") {
				overtime_table.value = overtime_table.value.filter(
					(overtime) => overtime.id != id
				);
			}

			if (type === "excess") {
				excess_table.value = excess_table.value.filter(
					(excess) => excess.id != id
				);
			}

			// console.log(undertime_table.value);
			console.log(type);
		};

		const handleSubmit = async () => {
			const data = {
				code: code.value,
				description: description.value,
				no_working_days_in_year: no_working_days_in_year.value,
				no_working_hours_in_day: no_working_hours_in_day.value,
				no_periods_in_month: no_periods_in_month.value,
				log_status: log_status.value,
				contructual_withhold_percent:
					contructual_withhold_percent.value,
				gross_based: gross_based.value,
				withhold_start_month: withhold_start_month.value,
				withhold_start_period: withhold_start_period.value,
				end_of_year_bonus: end_of_year_bonus.value,
				night_diff_start: night_diff_start.value,
				night_diff_end: night_diff_end.value,
				undertime_table: undertime_table.value,
				late_table: late_table.value,
				overtime_table: overtime_table.value,
				excess_table: excess_table.value,
			};

			console.log(data);

			await create(endpoints.setupPayrollParameter, data);

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

		const mainTabHasError = computed(() => {
			return error.value && error.value.errors.code;
		});

		const workingTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.no_working_days_in_year) ||
				(error.value && error.value.errors.no_working_hours_in_day) ||
				(error.value && error.value.errors.no_periods_in_month)
			);
		});

		const govTabHasError = computed(() => {
			return error.value && error.value.errors.end_of_year_bonus;
		});

		const nightDiffTabHasError = computed(() => {
			return (
				(error.value && error.value.errors.night_diff_start) ||
				(error.value && error.value.errors.night_diff_end)
			);
		});

		return {
			handleSubmit,

			code,
			description,
			no_working_days_in_year,
			no_working_hours_in_day,
			no_periods_in_month,
			log_status,
			contructual_withhold_percent,
			gross_based,
			withhold_start_month,
			withhold_start_period,
			end_of_year_bonus,
			night_diff_start,
			night_diff_end,
			undertime_table,
			overtime_table,
			late_table,
			excess_table,

			error,
			loading,
			response,
			alert,

			handleAddInTable,
			handleDeleteInTable,

			nightDiffTabHasError,
			govTabHasError,
			mainTabHasError,
			workingTabHasError,
		};
	},
};
</script>

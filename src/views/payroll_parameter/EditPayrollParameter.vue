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
				v-if="item"
				:heading="item.code"
				routeName="payroll-parameter"
				mode="create"
			/>
			<h4 v-else class="text-secondary h4">N/A</h4>

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
								id: 'overtime-setup',
								label: 'Overtime',
								error: null,
								active: false,
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
								label: 'Night Differential',
								error: nightDiffTabHasError,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'undertime',
								label: 'Undertime Limit',
								error: null,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'overtime',
								label: 'Overtime Limit',
								error: null,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'late',
								label: 'Late Limit',
								error: null,
								active: false,
								disabled: false,
								tooltip: null,
							},
							{
								id: 'excess',
								label: 'Excess Limit',
								error: null,
								active: false,
								disabled: false,
								tooltip: null,
							},
						]"
					/>
				</div>
			</div>
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
						<div class="row">
							<BaseRowHeading
								heading="Main Info"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>

							<div class="form-group col-3">
								<BaseInputField
									id="input_code"
									label="Code"
									v-model="item.code"
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
									v-model="item.description"
									:error="error"
									:errorField="
										error?.errors?.description || null
									"
									placeholder="Ex. Driver, Guard"
									:required="false"
								/>
							</div>
						</div>
						<hr class="mb-4" />
						<div class="row">
							<BaseRowHeading
								heading="Computation Limit"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="row col-md-8">
								<div class="form-group col-3">
									<BaseSelectField
										id="input_undertime_limit"
										label="Undertime Limit"
										v-model="item.undertime_limit"
										:error="error"
										:errorField="
											error?.errors?.undertime_limit ||
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
								<div class="form-group col-3">
									<BaseSelectField
										id="input_late_limit"
										label="Late Limit"
										v-model="item.late_limit"
										:error="error"
										:errorField="
											error?.errors?.late_limit || null
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
								<div class="form-group col-3">
									<BaseSelectField
										id="input_overtime_limit"
										label="Overtime Limit"
										v-model="item.overtime_limit"
										:error="error"
										:errorField="
											error?.errors?.overtime_limit ||
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
								<div class="form-group col-3">
									<BaseSelectField
										id="input_excess_limit"
										label="Excess Limit"
										v-model="item.excess_limit"
										:error="error"
										:errorField="
											error?.errors?.excess_limit || null
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
					</div>
					<div
						class="tab-pane fade"
						id="pills-overtime-setup"
						role="tabpanel"
						aria-labelledby="pills-overtime-setup-tab"
					>
						<div class="row">
							<BaseRowHeading
								heading="Overtime Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
								colspan="col-md-12"
							/>
							<div class="col-md-12">
								<div class="row">
									<PayrollParameterOTTable
										:table="item.overtime_setup"
									/>
								</div>
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
										v-model="item.no_working_days_in_year"
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
										v-model="item.no_working_hours_in_day"
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
										v-model="item.no_periods_in_month"
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
							<div class="form-group col-3">
								<BaseSelectField
									id="input_log_status"
									label="Log Status"
									v-model="item.log_status"
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
									:emptyOption="false"
								/>
							</div>
						</div>
						<hr class="mb-4" />
						<div class="row">
							<BaseRowHeading
								heading="Additional Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="col-md-8 row">
								<div class="form-group col-4">
									<BaseSelectField
										id="input_ot_minus_ut"
										label="UT to Deduct from OT(Total)"
										v-model="item.ot_minus_ut"
										:error="error"
										:errorField="
											error?.errors?.ot_minus_ut || null
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
								<div class="form-group col-5">
									<BaseSelectField
										id="input_minimun_hours"
										label="Must work Minimun expected hours before"
										v-model="item.minimun_hours"
										:error="error"
										:errorField="
											error?.errors?.minimun_hours || null
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
								<div class="form-group col-3">
									<BaseSelectField
										id="input_in_out"
										label="In Out Not Visible"
										v-model="item.in_out"
										:error="error"
										:errorField="
											error?.errors?.in_out || null
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
										label="Compute Half Day for Saturday Absences"
										v-model="item.halfday_saturday"
										:error="error"
										:errorField="
											error?.errors?.halfday_saturday ||
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
										v-model="
											item.contructual_withhold_percent
										"
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
										v-model="item.gross_based"
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
										v-model="item.withhold_start_month"
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
										v-model="item.withhold_start_period"
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
										v-model="item.end_of_year_bonus"
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
						<hr class="mb-4" />
						<div class="row">
							<BaseRowHeading
								heading="Additional Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="form-group col-4">
								<BaseSelectField
									id="input_preceding_legal_holiday_payment"
									label='Non - Payment on Legal Holiday for LWOP on the Working Day "PRECEDING" that Legay Holiday'
									v-model="
										item.preceding_legal_holiday_payment
									"
									:error="error"
									:errorField="
										error?.errors
											?.preceding_legal_holiday_payment ||
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
									id="input_after_legal_holiday_payment"
									label='Non - Payment on Legal Holiday for LWOP on the Working Day   "AFTER" that Legay Holiday'
									v-model="item.after_legal_holiday_payment"
									:error="error"
									:errorField="
										error?.errors
											?.after_legal_holiday_payment ||
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
										v-model="item.night_diff_start"
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
										v-model="item.night_diff_end"
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
						<hr class="mb-4" />
						<div class="row">
							<BaseRowHeading
								heading="Additional Setup"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="form-group col-3">
								<BaseSelectField
									id="input_night_diff_minus_break"
									label="Deduct Break from Night Diff"
									v-model="item.night_diff_minus_break"
									:error="error"
									:errorField="
										error?.errors?.night_diff_minus_break ||
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
									:table="item.undertime_table"
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
									:table="item.overtime_table"
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
									:table="item.late_table"
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
									:table="item.excess_table"
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
							v-if="!saving"
							value="Save Changes"
						/>
						<button
							class="btn btn-custom-success"
							v-if="saving"
							disabled
						>
							Saving ...
						</button>
					</div>
				</div>
			</form>
			<Spinner v-else />
		</div>
	</div>
</template>

<script>
import useData from "@/composables/useData";
import getItem from "@/composables/getItem";
import useAlert from "@/composables/useAlert";

import feather from "feather-icons";

import { ref, computed, onBeforeMount } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import PayrollParameterTable from "./PayrollParameterTable.vue";
import PayrollParameterOTTable from "./PayrollParameterOTTable.vue";
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
	name: "EditPayrollParameter",
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
		PayrollParameterOTTable,
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
		const {
			response,
			error,
			update,
			loading: saving,
			unknownError,
		} = useData();
		const { item, error: errorData, load, loading: isLoading } = getItem(
			route.params.id,
			endpoints.setupPayrollParameter
		);

		onBeforeMount(async () => {
			await load();
			console.log(item.value.overtime_setup);
		});

		const { alert, displayAlert } = useAlert();
		const router = useRouter();

		const payrollParameterAdded = ref(false);

		const validateAndAddDataIn = (data, tempData) => {
			let err = false;
			data.forEach((item) => {
				if (item.range == 0 || item.value == 0) {
					err = true;
				}
				console.log(item.range, item.value);
			});
			console.log(err);
			if (err) {
				return false;
			} else {
				if (tempData) {
					data.push(tempData);
				}
			}

			return true;
		};

		const handleAddInTable = (type) => {
			const tempData = {
				id: uuidv4(),
				range: "",
				value: "",
			};
			type === "undertime" &&
				!validateAndAddDataIn(item.value.undertime_table, tempData) &&
				displayAlert("info", "Please fill out range and value");

			type === "overtime" &&
				!validateAndAddDataIn(item.value.overtime_table, tempData) &&
				displayAlert("info", "Please fill out range and value");

			type === "late" &&
				!validateAndAddDataIn(item.value.late_table, tempData) &&
				displayAlert("info", "Please fill out range and value");

			type === "excess" &&
				!validateAndAddDataIn(item.value.excess_table, tempData) &&
				displayAlert("info", "Please fill out range and value");
		};

		const handleDeleteInTable = ({ type, id }) => {
			if (type === "undertime") {
				item.value.undertime_table = item.value.undertime_table.filter(
					(undertime) => undertime.id != id
				);
			}

			if (type === "late") {
				item.value.late_table = item.value.late_table.filter(
					(late) => late.id != id
				);
			}

			if (type === "overtime") {
				item.value.overtime_table = item.value.overtime_table.filter(
					(overtime) => overtime.id != id
				);
			}

			if (type === "excess") {
				item.value.excess_table = item.value.excess_table.filter(
					(excess) => excess.id != id
				);
			}

			// console.log(undertime_table.value);
			console.log(type);
		};

		const handleSubmit = async () => {
			if (!validateAndAddDataIn(item.value.late_table)) {
				displayAlert(
					"info",
					"Please fill out range or value in late limit tab"
				);
				return false;
			}
			if (!validateAndAddDataIn(item.value.overtime_table)) {
				displayAlert(
					"info",
					"Please fill out range or value in overtime limit tab"
				);
				return false;
			}
			if (!validateAndAddDataIn(item.value.undertime_table)) {
				displayAlert(
					"info",
					"Please fill out range or value in undertime limit tab"
				);
				return false;
			}
			if (!validateAndAddDataIn(item.value.excess_table)) {
				displayAlert(
					"info",
					"Please fill out range or value in excess limit tab"
				);
				return false;
			}
			const data = {
				code: item.value.code,
				description: item.value.description,
				undertime_limit: item.value.undertime_limit,
				late_limit: item.value.late_limit,
				overtime_limit: item.value.overtime_limit,
				excess_limit: item.value.excess_limit,

				no_working_days_in_year: item.value.no_working_days_in_year,
				no_working_hours_in_day: item.value.no_working_hours_in_day,
				no_periods_in_month: item.value.no_periods_in_month,
				log_status: item.value.log_status,
				ot_minus_ut: item.value.ot_minus_ut,
				minimun_hours: item.value.minimun_hours,
				halfday_saturday: item.value.halfday_saturday,
				in_out: item.value.in_out,

				contructual_withhold_percent:
					item.value.contructual_withhold_percent,
				gross_based: item.value.gross_based,
				withhold_start_month: item.value.withhold_start_month,
				withhold_start_period: item.value.withhold_start_period,
				end_of_year_bonus: item.value.end_of_year_bonus,
				preceding_legal_holiday_payment:
					item.value.preceding_legal_holiday_payment,
				after_legal_holiday_payment:
					item.value.after_legal_holiday_payment,

				night_diff_start: item.value.night_diff_start,
				night_diff_end: item.value.night_diff_end,
				night_diff_minus_break: item.value.night_diff_minus_break,

				undertime_table: item.value.undertime_table,
				late_table: item.value.late_table,
				overtime_table: item.value.overtime_table,
				excess_table: item.value.excess_table,
				overtime_setup: item.value.overtime_setup,
			};

			console.log(data);

			await update(
				`${endpoints.setupPayrollParameter}/${route.params.id}`,
				data
			);

			if (!error.value) {
				console.log("Payroll Params created");
				payrollParameterAdded.value = true;
				router.push({
					name: "payroll-parameter",
					params: {
						payrollParameterAdded: payrollParameterAdded.value,
					},
				});
				// displayAlert("success", "User Added");
			} else {
				displayAlert("error", "Invalid Inputs");
				console.log("error: ", error.value);
			}
		};

		onBeforeRouteLeave((to, from) => {
			if (!payrollParameterAdded.value) {
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

			item,

			error,
			saving,
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

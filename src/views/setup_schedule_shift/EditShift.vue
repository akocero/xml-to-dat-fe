<template>
	<div class="card boiler shadow-md">
		<div class="card-body">
			<ThePageHeader
				v-if="item"
				:heading="item.code"
				routeName="shift"
				mode="create"
			/>

			<hr />

			<form
				@submit.prevent="handleSubmit"
				id="form_create_user"
				v-if="item"
			>
				<div class="row">
					<BaseRowHeading
						heading="Main Description"
						para="Input basic information of your Shift"
					/>

					<div class="row col-md-8">
						<div class="form-group col-7">
							<BaseInputField
								id="input_name"
								label="Code"
								v-model="item.code"
								:error="error"
								:errorField="error?.errors?.code || null"
								placeholder="Ex. admin, user, hr, payroll master"
								:required="true"
							/>
						</div>

						<div class="form-group col-5">
							<BaseSelectField
								id="input_night_shift"
								label="Night Shift"
								v-model="item.night_shift"
								:error="error"
								:errorField="error?.errors?.night_shift || null"
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
								:emptyOption="false"
							/>
						</div>
						<div class="form-group col-9">
							<BaseInputField
								id="input_description"
								label="Description"
								v-model="item.description"
								:error="error"
								:errorField="error?.errors?.description || null"
								placeholder="Ex."
								:required="false"
							/>
						</div>
						<div class="form-group col-3">
							<BaseSelectField
								id="input_shift_policy_id"
								label="Shift Policy"
								v-model="item.shift_policy_id"
								:error="error"
								:errorField="
									error?.errors?.shift_policy_id || null
								"
								:options="[
									{
										value: 1,
										label: 'Shift Policy 1',
									},
									{
										value: 2,
										label: 'Shift Policy 2',
									},
								]"
								:required="false"
								:emptyOption="false"
							/>
						</div>
					</div>
				</div>
				<hr />
				<div class="row">
					<BaseRowHeading
						heading="Pair Type"
						para="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore rerum deserunt praesentium nihil doloribus qui veniam aperiam nam."
					/>
					<div class="col-md-8">
						<div class="row">
							<div class="form-group col-md-5">
								<BaseSelectField
									id="input_pair_type"
									label="Pair Type"
									v-model="item.pair_type"
									:error="error"
									:errorField="
										error?.errors?.pair_type || null
									"
									:options="[
										{
											value: 'single_pair',
											label: 'Single Pair',
										},
										{
											value: 'multiple_pair',
											label: 'Multiple Pairs',
										},
									]"
									:required="true"
									:emptyOption="false"
								/>
							</div>
						</div>
						<div
							class="row"
							id="single_pair_fields"
							v-if="item.pair_type === 'single_pair'"
						>
							<div class="form-group col-4">
								<BaseInputField
									id="input_shift_begins_at"
									type="time"
									label="Shift Begins At (From)"
									v-model="item.shift_begins_at"
									:error="error"
									:errorField="
										error?.errors?.shift_begins_at || null
									"
									:required="true"
								/>
							</div>
							<div class="form-group col-4">
								<BaseInputField
									id="input_shift_ends_a"
									type="time"
									label="Shift Ends At (To)"
									v-model="item.shift_ends_at"
									:error="error"
									:errorField="
										error?.errors?.shift_ends_at || null
									"
									:required="true"
								/>
							</div>

							<div class="form-group col-4">
								<BaseInputField
									id="input_break"
									type="number"
									label="Break"
									v-model="item.break_time"
									:error="error"
									:errorField="
										error?.errors?.break_time || null
									"
									:required="false"
								/>
							</div>
						</div>
						<div
							class="row"
							v-if="item.pair_type === 'multiple_pair'"
						>
							<div class="form-group col-4">
								<BaseInputField
									id="input_shift_begins_at"
									type="time"
									label="Shift Begins At (From)"
									v-model="item.shift_begins_at"
									:error="error"
									:errorField="
										error?.errors?.shift_begins_at || null
									"
									:required="true"
								/>
							</div>
							<div class="form-group col-4">
								<BaseInputField
									id="input_shift_ends_a"
									type="time"
									label="Shift Ends At (To)"
									v-model="item.shift_ends_at"
									:error="error"
									:errorField="
										error?.errors?.shift_ends_at || null
									"
									:required="true"
								/>
							</div>
							<div class="col-12">
								<label for="">Time Logs</label>
								<table class="table table-bordered">
									<thead>
										<tr>
											<th width="20%">Time In</th>
											<th width="20%">Time Out</th>
											<th>Description</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr
											v-for="time_log in item.time_logs"
											:key="time_log.id"
										>
											<td>
												<input
													type="time"
													@change="
														validateTimeLog(
															$event,
															time_log.id
														)
													"
													required
													class="table_input"
													v-model="time_log.in"
												/>
											</td>
											<td>
												<input
													type="time"
													@change="
														validateTimeLog(
															$event,
															time_log.id
														)
													"
													required
													class="table_input"
													v-model="time_log.out"
												/>
											</td>
											<td>
												<input
													type="text"
													class="table_input"
													v-model="
														time_log.description
													"
												/>
											</td>
											<td>
												<button
													type="button"
													class="btn btn-sm btn-default"
													@click="
														removeTimeLog(
															time_log.id
														)
													"
												>
													<i v-html="iTrash"></i>
												</button>
											</td>
										</tr>
										<tr v-if="item.time_logs.length <= 2">
											<td colspan="3">
												<button
													type="button"
													class="btn btn-sm btn-primary"
													@click="addTimeLog"
												>
													<i v-html="iPLus"></i>
												</button>
											</td>
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
						v-if="!loading"
						value="Save Changes"
					/>
					<button
						class="btn btn-custom-success"
						v-if="loading"
						disabled
					>
						Saving ...
					</button>
				</div>
			</form>
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
import BaseRowHeading from "@/components/BaseRowHeading";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import BaseInputField from "@/components/BaseInputField";
import ThePageHeader from "@/components/layouts/ThePageHeader";
import BaseTextAreaField from "@/components/BaseTextAreaField.vue";
import BaseSelectField from "@/components/BaseSelectField.vue";
import endpoints from "@/utils/endpoints";
import { v4 as uuid } from "uuid";
export default {
	name: "EditShift",
	components: {
		Alert,
		Spinner,
		BaseInputField,
		ThePageHeader,
		BaseTextAreaField,
		BaseSelectField,
		BaseRowHeading,
	},
	computed: {
		iPLus: function() {
			return feather.icons["plus"].toSvg({
				width: 16,
			});
		},
		iTrash: function() {
			return feather.icons["trash"].toSvg({
				width: 16,
			});
		},
	},
	setup() {
		const route = useRoute();
		const { item, error: errorData, load } = getItem(
			route.params.id,
			endpoints.setupShift
		);
		const { response, error, update, loading, unknownError } = useData();
		const { pushAlert } = useAlert();
		const router = useRouter();

		const shiftUpdated = ref(false);
		const time_logs = ref([
			{
				id: uuid(),
				description: "",
				in: null,
				out: null,
			},
		]);

		const addTimeLog = () => {
			let err = false;
			time_logs.value.forEach((time_log) => {
				if (!time_log.in || !time_log.out) {
					err = true;
				}
				// console.log(time_log.range, time_log.value);
			});
			if (!err) {
				const temp = {
					id: uuid(),
					description: "",
					in: null,
					out: null,
				};

				time_logs.value.push(temp);

				pushAlert(
					"success",
					"Time Log added, Please add time and click save to take effect"
				);
			} else {
				pushAlert(
					"warning",
					"Please add fill out the in and out field, Before adding one"
				);
			}
		};

		const removeTimeLog = (id) => {
			if (time_logs.value.length > 1) {
				time_logs.value = time_logs.value.filter(
					(time_log) => time_log.id !== id
				);
				pushAlert(
					"info",
					"Time Log removed, please click save to take effect"
				);
			} else {
				pushAlert("warning", "Multiple pairs need at least 1 time log");
			}

			console.log(id);
			// time_logs.value.push(temp);
		};

		const validateTimeLog = (e, id) => {
			let temp = e.target.value;
			console.log();
			if (temp > shift_begins_at.value && temp < shift_ends_at.value) {
				console.log("between");
				e.target.parentElement.parentElement.classList.remove(
					"table-warning"
				);
				e.target.parentElement.parentElement.classList.add(
					"table-success"
				);
			} else {
				e.target.parentElement.parentElement.classList.remove(
					"table-success"
				);
				e.target.parentElement.parentElement.classList.add(
					"table-warning"
				);
				pushAlert(
					"error",
					"Please add time log after shift start and before shift ends"
				);
			}
		};
		const handleSubmit = async () => {
			const data = {
				code: item.value.code,
				description: item.value.description,
				night_shift: item.value.night_shift,
				break_time: item.value.break_time,
				time_logs: item.value.time_logs,
				pair_type: item.value.pair_type,
				shift_ends_at: item.value.shift_ends_at,
				shift_begins_at: item.value.shift_begins_at,
				shift_policy_id: item.value.shift_policy_id,
			};

			console.log(data);

			await update(`${endpoints.setupShift}/${route.params.id}`, data);

			if (!error.value) {
				console.log("user updated");
				shiftUpdated.value = true;
				router.push({
					name: "shift",
					params: { shiftUpdated: shiftUpdated.value },
				});
				pushAlert("success", "Shift Added");
			} else {
				pushAlert("error", "Invalid Inputs");
				console.log("error: ", error.value);
			}
		};

		onBeforeRouteLeave((to, from) => {
			if (!shiftUpdated.value) {
				const answer = window.confirm(
					"Do you really want to leave? you have unsaved changes!"
				);
				// cancel the navigation and stay on the same page
				if (!answer) return false;
			}
		});

		onBeforeMount(async () => {
			await load();
		});

		return {
			handleSubmit,

			item,

			error,
			loading,
			response,

			addTimeLog,
			removeTimeLog,
			validateTimeLog,
			// pushToAbilities,
		};
	},
};
</script>

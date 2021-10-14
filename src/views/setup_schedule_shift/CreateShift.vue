<template>
	<div class="card boiler shadow-md">
		<div class="card-body">
			<ThePageHeader
				heading="New Shift Entry"
				routeName="shift"
				mode="create"
			/>

			<hr />

			<form @submit.prevent="handleSubmit" id="form_create_user">
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
								v-model="code"
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
								v-model="night_shift"
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
						<div class="form-group col-12">
							<BaseInputField
								id="input_description"
								label="Description"
								v-model="description"
								:error="error"
								:errorField="error?.errors?.description || null"
								placeholder="Ex."
								:required="false"
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
									v-model="pair_type"
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
							v-if="pair_type === 'single_pair'"
						>
							<div class="form-group col-4">
								<BaseInputField
									id="input_shift_begins_at"
									type="time"
									label="Shift Begins At (From)"
									v-model="shift_begins_at"
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
									v-model="shift_ends_at"
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
									v-model="break_time"
									:error="error"
									:errorField="
										error?.errors?.break_time || null
									"
									:required="false"
								/>
							</div>
						</div>
						<div class="row" v-if="pair_type === 'multiple_pair'">
							<div class="form-group col-4">
								<BaseInputField
									id="input_shift_begins_at"
									type="time"
									label="Shift Begins At (From)"
									v-model="shift_begins_at"
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
									v-model="shift_ends_at"
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
											v-for="time_log in time_logs"
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
										<tr v-if="time_logs.length <= 2">
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
import BaseRowHeading from "@/components/BaseRowHeading";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import BaseInputField from "@/components/BaseInputField";
import ThePageHeader from "@/components/layouts/ThePageHeader";
import BaseTextAreaField from "@/components/BaseTextAreaField.vue";
import BaseSelectField from "@/components/BaseSelectField.vue";
import { useStore } from "vuex";
import endpoints from "@/utils/endpoints";
import { v4 as uuid } from "uuid";
export default {
	name: "CreateShift",
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
		const { response, error, create, loading, unknownError } = useData();
		const { pushAlert } = useAlert();
		const router = useRouter();
		const store = useStore();

		const code = ref("");
		const shift_begins_at = ref("");
		const shift_ends_at = ref("");
		const description = ref("");
		const night_shift = ref(0);
		const break_time = ref(0);
		const shiftAdded = ref(false);
		const pair_type = ref("single_pair");
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

		const abilitiesArray = computed(() => store.getters.getAbilities);
		const handleSubmit = async () => {
			const data = {
				code: code.value,
				description: description.value,
				night_shift: night_shift.value,
				break_time: break_time.value,
				time_logs: time_logs.value,
				pair_type: pair_type.value,
				shift_ends_at: shift_ends_at.value,
				shift_begins_at: shift_begins_at.value,
			};

			console.log(data);

			await create(endpoints.setupShift, data);

			if (!error.value) {
				console.log("user created");
				shiftAdded.value = true;
				router.push({
					name: "shift",
					params: { shiftAdded: shiftAdded.value },
				});
				pushAlert("success", "Shift Added");
			} else {
				pushAlert("error", "Invalid Inputs");
				console.log("error: ", error.value);
			}
		};

		onBeforeRouteLeave((to, from) => {
			if (!shiftAdded.value) {
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

		// const pushToAbilities = (array) => {
		// 	let tempAbility = [];
		// 	array.forEach((el) => {
		// 		if (!abilities.value.includes(el)) {
		// 			tempAbility.push(el);
		// 		}
		// 	});
		// 	abilities.value = [...abilities.value, ...tempAbility];
		// };

		return {
			handleSubmit,

			code,
			description,
			time_logs,
			night_shift,
			break_time,
			shift_begins_at,
			shift_ends_at,

			error,
			loading,
			response,

			abilitiesArray,
			convertToArray,
			pair_type,

			addTimeLog,
			removeTimeLog,
			validateTimeLog,
			// pushToAbilities,
		};
	},
};
</script>

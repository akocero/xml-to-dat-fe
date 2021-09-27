<template>
	<!-- Button trigger modal -->

	<!-- Modal -->
	<div
		class="modal fade"
		id="scheduleModal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="scheduleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="scheduleModalLabel">
						New Schedule
					</h5>
					<button
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form>
					<div class="modal-body">
						<div class="row">
							<BaseRowHeading
								heading="Year"
								para="Lorem ipsum dolor, sit amet consectetur."
							/>
							<div class="col-8">
								<div class="row">
									<div class="form-group col-4">
										<label for="">Year</label>
										<select
											name=""
											id=""
											class="form-control"
											v-model="selected_year"
										>
											<option value="" selected
												>Choose</option
											>
											<option
												:value="year"
												v-for="year in years_array"
												:key="year"
												>{{ year }}</option
											>
										</select>
									</div>

									<!-- <div class="form-group col-6">
										<label for="">From</label>
										<input
											type="date"
											v-model="startDate"
											class="form-control"
										/>
									</div>

									<div class="form-group col-6">
										<label for="">To</label>
										<input
											type="date"
											v-model="endDate"
											class="form-control"
										/>
									</div> -->
								</div>
							</div>
						</div>
						<hr />
						<div class="row">
							<BaseRowHeading
								heading="Schedule Shift"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="col-8">
								<div class="row">
									<div class="form-group col-6">
										<label for="">Time In</label>
										<input
											type="time"
											v-model="time_in"
											class="form-control"
										/>
									</div>

									<div class="form-group col-6">
										<label for="">Time Out</label>
										<input
											type="time"
											v-model="time_out"
											class="form-control"
										/>
									</div>

									<div class="form-group col-6">
										<label for="">Break Time</label>
										<input
											type="number"
											v-model="timeBreak"
											class="form-control"
										/>
									</div>

									<div class="form-group col-6">
										<label for="">Night Shift?</label>
										<select
											name=""
											id=""
											v-model="night_shift"
											class="form-control"
										>
											<option value="" selected
												>No</option
											>
											<option value="1">Yes</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<hr />
						<div class="row">
							<BaseRowHeading
								heading="Rest Day"
								para="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, totam!"
							/>
							<div class="col-8">
								<div class="row pt-2 pl-2">
									<div class="form-check col-4">
										<input
											class="form-check-input"
											type="checkbox"
											v-model="restday"
											value="Mon"
											id="defaultCheck1"
										/>
										<label
											class="form-check-label"
											for="defaultCheck1"
										>
											Monday
										</label>
									</div>
									<div class="form-check col-4">
										<input
											class="form-check-input"
											type="checkbox"
											v-model="restday"
											value="Tue"
											id="defaultCheck1"
										/>
										<label
											class="form-check-label"
											for="defaultCheck1"
										>
											Tuesday
										</label>
									</div>
									<div class="form-check col-4">
										<input
											class="form-check-input"
											type="checkbox"
											v-model="restday"
											value="Wed"
											id="defaultCheck1"
										/>
										<label
											class="form-check-label"
											for="defaultCheck1"
										>
											Wednesday
										</label>
									</div>
									<div class="form-check col-4">
										<input
											class="form-check-input"
											type="checkbox"
											v-model="restday"
											value="Thu"
											id="defaultCheck1"
										/>
										<label
											class="form-check-label"
											for="defaultCheck1"
										>
											Thursday
										</label>
									</div>
									<div class="form-check col-4">
										<input
											class="form-check-input"
											type="checkbox"
											v-model="restday"
											value="Fri"
											id="defaultCheck1"
										/>
										<label
											class="form-check-label"
											for="defaultCheck1"
										>
											Friday
										</label>
									</div>
									<div class="form-check col-4">
										<input
											class="form-check-input"
											type="checkbox"
											v-model="restday"
											id="defaultCheck1"
											value="Sat"
										/>
										<label
											class="form-check-label"
											for="defaultCheck1"
										>
											Saturday
										</label>
									</div>
									<div class="form-check col-4">
										<input
											class="form-check-input"
											type="checkbox"
											v-model="restday"
											id="defaultCheck1"
											value="Sun"
										/>
										<label
											class="form-check-label"
											for="defaultCheck1"
										>
											Sunday
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-primary"
							@click="createCalendar"
						>
							Generate
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="card boiler shadow-md">
		<div class="card-body">
			<div class="row">
				<div>
					<button
						type="button"
						class="btn btn-primary"
						data-toggle="modal"
						data-target="#scheduleModal"
					>
						Open Schedule Setup {{ date_array }}
					</button>
				</div>
				<div class="col-md-12">
					<!-- <h1>Calendar</h1> -->
					<table class="table table-bordered">
						<thead>
							<tr>
								<th width="10%">Date</th>
								<th width="10%">Schedule Type</th>
								<th width="18%">Shift Begings At</th>
								<th width="18%">Must Be Completed By</th>
								<th width="10%">Break Time</th>
							</tr>
						</thead>
						<tbody v-for="item in schedule" :key="item.date">
							<tr>
								<td>
									<input
										type="date"
										v-model="item.date"
										class="table_input"
										disabled
										style="display: none;"
									/>
									{{ item.dateString }}
								</td>
								<td>
									<select
										name=""
										id=""
										v-model="item.schedule_type"
										class="table_input"
									>
										<option value="day_shift" selected
											>Day Shift</option
										>
										<option value="night_shift"
											>Night Shift</option
										>
										<option value="rest_day"
											>Rest Day</option
										>
									</select>
								</td>
								<td>
									<input
										type="time"
										v-model="item.time_in"
										class="table_input"
									/>
								</td>
								<td>
									<input
										type="time"
										v-model="item.time_out"
										class="table_input"
									/>
								</td>
								<td>
									<input
										type="text"
										v-model="item.break_time"
										class="table_input"
									/>
								</td>
							</tr>
						</tbody>
					</table>
					<br />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import moment from "moment";
import ThePageHeader from "@/components/layouts/ThePageHeader";
import BaseRowHeading from "@/components/BaseRowHeading";
import { onBeforeMount } from "@vue/runtime-core";

export default {
	components: {
		ThePageHeader,
		BaseRowHeading,
	},
	setup() {
		const startDate = ref("");
		const endDate = ref("");
		const time_in = ref("");
		const time_out = ref("");
		const restday = ref([]);
		const none_working_day = ref([]);
		const timeBreak = ref(0);
		const night_shift = ref(0);
		const schedule = ref([]);
		const years_array = ref([]);
		const selected_year = ref("");
		const date_array = ref([]);
		onBeforeMount(() => {
			generateYears();
		});

		const generateYears = () => {
			let currentYear = new Date().getFullYear();
			for (let i = 0; i < 10; i++) {
				years_array.value.push(currentYear);
				currentYear += 1;
			}
		};

		const createCalendar = () => {
			// schedule.value = [];
			let current = new Date(selected_year.value + "-01-01");
			const end = new Date(selected_year.value + "-12-31");

			while (current <= end) {
				const date =
					current.getFullYear() +
					"-" +
					("0" + (current.getMonth() + 1)).slice(-2) +
					"-" +
					("0" + current.getDate()).slice(-2);

				const dateString = moment(current).format("YYYY MMM D, ddd");
				const dayWord = moment(current).format("ddd");
				const schedule_type = "";
				const temp_time_in = time_in.value;
				const temp_time_out = time_out.value;
				const break_time = timeBreak.value + "h";

				if (night_shift.value) {
					schedule_type = "night_shift";
				} else {
					schedule_type = "day_shift";
				}

				if (restday.value.includes(dayWord)) {
					schedule_type = "rest_day";
					temp_time_out = "";
					temp_time_in = "";
				}

				const sched = {
					date,
					dateString,
					schedule_type: schedule_type,
					time_in: temp_time_in,
					time_out: temp_time_out,
					break_time,
				};
				console.log(date);
				schedule.value.push(sched);
				current.setDate(current.getDate() + 1);
			}
		};

		return {
			startDate,
			endDate,
			createCalendar,
			schedule,
			restday,
			time_in,
			time_out,
			none_working_day,
			timeBreak,
			night_shift,
			years_array,
			selected_year,
		};
	},
};
</script>

<style></style>

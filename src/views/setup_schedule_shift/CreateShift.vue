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
					<div class="col-md-4">
						<div class="row">
							<div class="form-group col-12">
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
							<div class="form-group col-md-12">
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
							<div class="form-group col-6">
								<BaseSelectField
									id="input_night_shift"
									label="Night Shift"
									v-model="night_shift"
									:error="error"
									:errorField="
										error?.errors?.night_shift || null
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
									:emptyOption="false"
								/>
							</div>
							<div class="form-group col-6">
								<BaseInputField
									id="input_break"
									type="number"
									label="Break"
									v-model="break_time"
									:error="error"
									:errorField="
										error?.errors?.break_time || null
									"
									placeholder="Ex. 1"
									:required="true"
								/>
							</div>
						</div>
					</div>
					<div class="col-8">
						<label for="">Time Logs</label>
						<table class="table table-bordered">
							<thead>
								<tr>
									<th width="20%">Time In</th>
									<th width="20%">Time Out</th>
									<th>description</th>
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
											required
											class="table_input"
											v-model="time_log.in"
										/>
									</td>
									<td>
										<input
											type="time"
											required
											class="table_input"
											v-model="time_log.out"
										/>
									</td>
									<td>
										<input
											type="text"
											class="table_input"
											v-model="time_log.description"
										/>
									</td>
								</tr>
							</tbody>
						</table>
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
		const { pushAlert } = useAlert();
		const router = useRouter();
		const store = useStore();

		const code = ref("");
		const description = ref("");
		const night_shift = ref(0);
		const break_time = ref(0);
		const shiftAdded = ref(false);
		const time_logs = ref([
			{
				id: uuid,
				description: "",
				in: null,
				out: null,
			},
		]);

		const abilitiesArray = computed(() => store.getters.getAbilities);
		const handleSubmit = async () => {
			const data = {
				code: code.value,
				description: description.value,
				night_shift: night_shift.value,
				break_time: break_time.value,
				time_logs: time_logs.value,
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

			error,
			loading,
			response,

			abilitiesArray,
			convertToArray,
			// pushToAbilities,
		};
	},
};
</script>

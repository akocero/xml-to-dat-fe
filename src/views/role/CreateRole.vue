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
			<ThePageHeader heading="New Role" routeName="role" mode="create" />

			<hr />

			<form @submit.prevent="handleSubmit" id="form_create_user">
				<div class="row">
					<div class="col-md-12">
						<div class="row pr-3">
							<div class="form-group col-5">
								<BaseInputField
									id="input_name"
									label="Role Code"
									v-model="name"
									:error="error"
									:errorField="error?.errors?.name || null"
									placeholder="Ex. admin, user, hr, payroll master"
									:required="true"
								/>
							</div>
							<div class="form-group col-md-7">
								<BaseTextAreaField
									id="input_description"
									label="Role Description"
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
					<div class="col-12">
						<label
							>Permissions / Abilities
							<span class="text-danger text-bold">*</span>
							<small
								v-if="error && error?.errors?.abilities"
								class="form-text text-danger"
							>
								<span
									v-for="(err, index) in error?.errors
										?.abilities"
									:key="index"
									class="d-block"
								>
									{{ err }}</span
								>
							</small>
						</label>
						<div class="table-responsive">
							<table class="table">
								<thead>
									<tr class="text-secondary">
										<th width="20%" class="pl-4">Module</th>
										<th>Details</th>
										<th width="6%" class="text-center">
											<small class="text-bold text-sm"
												>List</small
											>
										</th>
										<th width="6%" class="text-center">
											<small class="text-bold text-sm"
												>Show</small
											>
										</th>
										<th width="6%" class="text-center">
											<small class="text-bold text-sm"
												>Create</small
											>
										</th>
										<th width="6%" class="text-center">
											<small class="text-bold text-sm"
												>Update</small
											>
										</th>
									</tr>
								</thead>
								<tbody v-if="abilitiesArray.length">
									<tr
										v-for="item in abilitiesArray"
										:key="item.id"
									>
										<td width="20%" class="pl-4">
											{{ item.module }}
										</td>
										<td>{{ item.details }}</td>
										<td
											width="6%"
											class="text-center"
											v-for="method in item.methods"
											:key="method"
										>
											<input
												type="checkbox"
												v-if="method !== 'disabled'"
												:value="method"
												v-model="abilities"
												name=""
												id=""
											/>
											<input
												type="checkbox"
												v-else
												disabled
												:value="method"
												v-model="abilities"
												name=""
												id=""
											/>
										</td>
									</tr>
								</tbody>
								<tbody v-else>
									<tr>
										<td colspan="10" class="text-center">
											No data found!
										</td>
									</tr>
								</tbody>
							</table>
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

import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
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

		const name = ref("");
		const description = ref("");
		const abilities = ref([]);
		const roleAdded = ref(false);
		const abilitiesArray = computed(() => store.getters.getAbilities);
		const handleSubmit = async () => {
			const data = {
				name: name.value,
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

			name,
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

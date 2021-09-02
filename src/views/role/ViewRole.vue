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
				:heading="item.name"
				routeName="role"
				mode="update"
				v-if="item"
			/>

			<hr />

			<form
				@submit.prevent="handleSubmit"
				id="form_create_user"
				v-if="item && !loading"
			>
				<div class="row">
					<div class="col-md-12">
						<div class="row pr-3">
							<div class="form-group col-5">
								<BaseInputField
									id="input_name"
									label="Role Code"
									v-model="item.name"
									:error="error"
									:errorField="error?.errors?.name || null"
									placeholder="Ex. admin, user, hr, payroll master"
									:required="true"
									:disabled="true"
								/>
							</div>
							<div class="form-group col-md-7">
								<BaseTextAreaField
									id="input_description"
									label="Role Description"
									v-model="item.description"
									:error="error"
									:errorField="
										error?.errors?.description || null
									"
									placeholder="Ex."
									:required="false"
									:disabled="true"
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
										v-for="ability in abilitiesArray"
										:key="ability.id"
									>
										<td width="20%" class="pl-4">
											{{ ability.module }}
										</td>
										<td>{{ ability.details }}</td>
										<td
											width="6%"
											class="text-center"
											v-for="method in ability.methods"
											:key="method"
										>
											<input
												type="checkbox"
												v-if="method !== 'disabled'"
												:value="method"
												v-model="item.abilities"
												name=""
												id=""
											/>
											<input
												type="checkbox"
												v-else
												disabled
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
			</form>
		</div>
	</div>
</template>

<script>
import useData from "@/composables/useData";
import useAlert from "@/composables/useAlert";

import feather from "feather-icons";

import { ref, computed, onBeforeMount } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import BaseInputField from "@/components/BaseInputField";
import ThePageHeader from "@/components/layouts/ThePageHeader";
import BaseTextAreaField from "@/components/BaseTextAreaField.vue";
import getItem from "@/composables/getItem";

export default {
	name: "ViewRole",
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
		const {
			response,
			error,
			update,
			loading: saving,
			unknownError,
		} = useData();
		const { alert, displayAlert } = useAlert();
		const route = useRoute();
		const { item, load } = getItem(route.params.id, "roles");
		const router = useRouter();
		const loading = ref(false);
		const roleAdded = ref(false);
		const abilitiesArray = ref([
			{
				module: "user",
				details: "user details",
				methods: [
					"user:list",
					"user:read",
					"user:create",
					"user:update",
				],
			},
			{
				module: "role",
				details: "role details",
				methods: [
					"role:list",
					"role:read",
					"role:create",
					"role:update",
				],
			},
			{
				module: "employee",
				details: "employee details",
				methods: [
					"employee:list",
					"employee:read",
					"employee:create",
					"employee:update",
				],
			},
			{
				module: "employee-setup",
				details: "employee-setup details",
				methods: [
					"employee-setup:list",
					"disabled",
					"employee-setup:create",
					"employee-setup:update",
				],
			},
		]);

		onBeforeMount(async () => {
			loading.value = true;
			await load();
			console.log(item.value);
			item.value.abilities = JSON.parse(item.value.abilities);

			loading.value = false;

			console.log(item.value.abilities);

			setTimeout(() => {
				const tags = [
					"input",
					"select",
					"textarea",
					"button",
					"checkbox",
				];
				tags.forEach((tagName) => {
					var inputs = document.getElementsByTagName(tagName);
					console.log(inputs[0]);
					for (var i = 0; i < inputs.length; i++) {
						inputs[i].disabled = true;
					}
				});
			}, 100);
		});
		const handleSubmit = async () => {
			const data = {
				name: item.value.name,
				abilities: item.value.abilities,
				description: item.value.description,
			};

			console.log(data);

			await update(`roles/${route.params.id}`, data);

			if (!error.value) {
				console.log("user updated");
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
			loading,
			item,

			error,
			saving,
			response,
			alert,
			abilitiesArray,
			convertToArray,
			pushToAbilities,
		};
	},
};
</script>

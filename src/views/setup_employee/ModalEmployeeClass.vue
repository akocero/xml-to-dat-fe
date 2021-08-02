<template>
	<!-- Modal -->
	<div
		class="modal fade"
		id="employee-class-modal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
		data-backdrop="static"
	>
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5
						class="modal-title"
						id="exampleModalLabel"
						v-if="!forEditEmployeeClassItem"
					>
						New Employee Class
					</h5>
					<h5
						class="modal-title"
						id="exampleModalLabel"
						v-if="forEditEmployeeClassItem"
					>
						Update Employee Class
					</h5>
					<button
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
						@click="handleCloseCostCenterModal"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row" v-if="!forEditEmployeeClassItem">
						<div class="col-6">
							<div class="form-group col-12">
								<label>
									Code
									<span class="text-danger text-bold">*</span>
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.value &&
											'is-invalid',
									]"
									id="input_ec_value"
									aria-describedby="emailHelp"
									placeholder="Ex. Regular"
									v-model="value"
								/>
								<small
									v-if="error && error.errors.value"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.value[0] }}
								</small>
							</div>
							<div class="form-group col-12">
								<label>
									Description
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.description &&
											'is-invalid',
									]"
									id="input_ec_description"
									aria-describedby="emailHelp"
									placeholder="Ex. Regular Employee"
									v-model="description"
								/>
								<small
									v-if="error && error.errors.description"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.description[0] }}
								</small>
							</div>
							<div class="form-group col-12">
								<label>
									Tax As
									<span class="text-danger text-bold">*</span>
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.tax_as &&
											'is-invalid',
									]"
									id="input_ec_tax_as"
									aria-describedby="emailHelp"
									placeholder="Ex. Table / Setup"
									v-model="taxAs"
								/>
								<small
									v-if="error && error.errors.tax_as"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.tax_as[0] }}
								</small>
							</div>
						</div>
						<div class="col-6">
							<div>
								<label class="text-bold"
									>Classes
									<span class="text-danger text-bold">*</span>
								</label>
								<small
									v-if="error && error.errors.classes"
									id="emailHelp"
									class="form-text text-danger mb-2"
								>
									{{ error.errors.classes[0] }}
								</small>
							</div>

							<div class="multi-select text-secondary max-35">
								<div
									v-for="classItem in classesArray"
									:key="classItem"
									class="multi-select-card shadow-sm border"
								>
									<input
										type="checkbox"
										:value="classItem"
										v-model="classes"
									/>
									<h6 class="h6 text-bold pb-0 mb-0">
										{{ classItem }}
									</h6>
								</div>
							</div>
						</div>
					</div>
					<div class="row" v-else>
						<div class="col-6">
							<div class="form-group col-12">
								<label>
									Code
									<span class="text-danger text-bold">*</span>
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.value &&
											'is-invalid',
									]"
									id="input_ec_value"
									aria-describedby="emailHelp"
									placeholder="Ex. Regular"
									v-model="updateValue"
								/>
								<small
									v-if="error && error.errors.value"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.value[0] }}
								</small>
							</div>
							<div class="form-group col-12">
								<label>
									Description
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.description &&
											'is-invalid',
									]"
									id="input_ec_description"
									aria-describedby="emailHelp"
									placeholder="Ex. Regular Employee"
									v-model="updateDescription"
								/>
								<small
									v-if="error && error.errors.description"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.description[0] }}
								</small>
							</div>
							<div class="form-group col-12">
								<label>
									Tax As
									<span class="text-danger text-bold">*</span>
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.tax_as &&
											'is-invalid',
									]"
									id="input_ec_tax_as"
									aria-describedby="emailHelp"
									placeholder="Ex. Table / Setup"
									v-model="updateTaxAs"
								/>
								<small
									v-if="error && error.errors.tax_as"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.tax_as[0] }}
								</small>
							</div>
						</div>
						<div class="col-6">
							<div>
								<label class="text-bold"
									>Classes
									<span class="text-danger text-bold">*</span>
								</label>
								<small
									v-if="error && error.errors.classes"
									id="emailHelp"
									class="form-text text-danger mb-2"
								>
									{{ error.errors.classes[0] }}
								</small>
							</div>

							<div class="multi-select text-secondary max-35">
								<div
									v-for="classItem in classesArray"
									:key="classItem"
									class="multi-select-card shadow-sm border"
								>
									<input
										type="checkbox"
										:value="classItem"
										v-model="updateClasses"
									/>
									<h6 class="h6 text-bold pb-0 mb-0">
										{{ classItem }}
									</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-dismiss="modal"
						@click="handleCloseCostCenterModal"
					>
						Cancel
					</button>
					<button
						type="button"
						class="btn btn-primary"
						@click="handleCreate"
						v-if="!forEditEmployeeClassItem && !loading"
					>
						Save
					</button>
					<button
						type="button"
						class="btn btn-primary"
						@click="handleUpdate"
						v-if="forEditEmployeeClassItem && !loading"
					>
						Save changes
					</button>
					<button
						type="button"
						class="btn btn-primary"
						v-if="loading"
						disabled
					>
						Saving ...
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import useData from "@/composables/useData";
import { onBeforeMount, ref } from "vue";
export default {
	name: "ModalEmployeeClass",
	emits: [
		"closeEmployeeClassModal",
		"employeeClassAdded",
		"employeeClassUpdated",
	],
	props: ["forEditEmployeeClassItem"],
	setup(props, { emit }) {
		const { error, response, create, update, loading } = useData();
		const editing = ref(false);

		const value = ref("");
		const description = ref("");
		const taxAs = ref("");
		const classes = ref([]);

		const classesArray = ref([
			"is_resigned",
			"paid_legal_holiday",
			"paid_legal_holiday_restday",
			"paid_special_holiday",
			"paid_special_holiday_restday",
			"paid_double_holiday",
			"paid_double_holiday_restday",
		]);

		const updateValue = ref("");
		const updateDescription = ref("");
		const updateTaxAs = ref("");
		const updateClasses = ref([]);

		onBeforeMount(() => {
			if (props.forEditEmployeeClassItem) {
				updateValue.value = props.forEditEmployeeClassItem.value;
				updateDescription.value =
					props.forEditEmployeeClassItem.description;
				updateTaxAs.value = props.forEditEmployeeClassItem.tax_as;
				updateClasses.value = props.forEditEmployeeClassItem.classes;
			}
		});

		const handleCreate = async () => {
			const data = {
				value: value.value,
				description: description.value,
				tax_as: taxAs.value,
				classes: classes.value,
			};

			console.log(data);

			await create("setup_employee_class", data);

			if (!error.value) {
				emit("employeeClassAdded", response.value);
			}
		};

		const handleUpdate = async () => {
			if (props.forEditEmployeeClassItem) {
				const data = {
					value: updateValue.value,
					description: updateDescription.value,
					tax_as: updateTaxAs.value,
					classes: updateClasses.value,
					active: 1,
				};
				await update(
					"setup_employee_class/" + props.forEditEmployeeClassItem.id,
					data
				);

				if (!error.value) {
					emit("employeeClassUpdated", response.value);
				}
			}
		};

		const handleCloseCostCenterModal = () => {
			console.log("close modal");
			emit("closeEmployeeClassModal");
		};

		return {
			value,
			description,
			taxAs,

			updateValue,
			updateDescription,
			updateTaxAs,
			updateClasses,

			error,
			handleCreate,
			handleUpdate,
			editing,
			loading,

			classes,
			classesArray,

			handleCloseCostCenterModal,
		};
	},
};
</script>

<style></style>

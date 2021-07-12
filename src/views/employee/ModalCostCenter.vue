<template>
	<!-- Modal -->
	<div
		class="modal fade"
		id="cost-center-modal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
		data-backdrop="static"
	>
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5
						class="modal-title"
						id="exampleModalLabel"
						v-if="!forEditCostCenterItem"
					>
						New Cost Center
					</h5>
					<h5
						class="modal-title"
						id="exampleModalLabel"
						v-if="forEditCostCenterItem"
					>
						Update Cost Center
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
					<div class="row" v-if="!forEditCostCenterItem">
						<div class="form-group col-12">
							<label>
								Value
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error && error.errors.value && 'is-invalid',
								]"
								id="input_cc_value"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
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
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.description &&
										'is-invalid',
								]"
								id="input_cc_description"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
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
								Basic Daily Rate Amount
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="number"
								class="form-control"
								:class="[
									error &&
										error.errors.basic_daily_rate_amount &&
										'is-invalid',
								]"
								id="input_cc_basic_daily_rate_amount"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="basicDailyRateAmount"
							/>
							<small
								v-if="
									error &&
										error.errors.basic_daily_rate_amount
								"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.basic_daily_rate_amount[0] }}
							</small>
						</div>
					</div>
					<div class="row" v-else>
						<div class="form-group col-12">
							<label>
								Value
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error && error.errors.value && 'is-invalid',
								]"
								id="input_cc_value"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
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
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.description &&
										'is-invalid',
								]"
								id="input_cc_description"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
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
								Basic Daily Rate Amount
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="number"
								class="form-control"
								:class="[
									error &&
										error.errors.basic_daily_rate_amount &&
										'is-invalid',
								]"
								id="input_cc_basic_daily_rate_amount"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="updateBasicDailyRateAmount"
							/>
							<small
								v-if="
									error &&
										error.errors.basic_daily_rate_amount
								"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.basic_daily_rate_amount[0] }}
							</small>
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
						v-if="!forEditCostCenterItem && !loading"
					>
						Save
					</button>
					<button
						type="button"
						class="btn btn-primary"
						@click="handleUpdate"
						v-if="forEditCostCenterItem && !loading"
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
	name: "ModalCostCenter",
	emits: ["closeCostCenterModal", "costCenterAdded", "costCenterUpdated"],
	props: ["forEditCostCenterItem"],
	setup(props, { emit }) {
		const { error, response, create, update, loading } = useData();
		const editing = ref(false);

		const value = ref("");
		const description = ref("");
		const basicDailyRateAmount = ref("");

		const updateValue = ref("");
		const updateDescription = ref("");
		const updateBasicDailyRateAmount = ref("");

		onBeforeMount(() => {
			if (props.forEditCostCenterItem) {
				updateValue.value = props.forEditCostCenterItem.value;
				updateDescription.value =
					props.forEditCostCenterItem.description;
				updateBasicDailyRateAmount.value =
					props.forEditCostCenterItem.basic_daily_rate_amount;
			}
		});

		const handleCreate = async () => {
			const data = {
				value: value.value,
				description: description.value,
				basic_daily_rate_amount: basicDailyRateAmount.value,
			};

			console.log(data);

			await create("setup_employee_cost_center", data);

			if (!error.value) {
				emit("costCenterAdded", response.value);
			}
		};

		const handleUpdate = async () => {
			if (props.forEditCostCenterItem) {
				const data = {
					value: updateValue.value,
					description: updateDescription.value,
					basic_daily_rate_amount: updateBasicDailyRateAmount.value,
					active: 1,
				};
				await update(
					"setup_employee_cost_center/" +
						props.forEditCostCenterItem.id,
					data
				);

				if (!error.value) {
					emit("costCenterUpdated", response.value);
				}
			}
		};

		const handleCloseCostCenterModal = () => {
			console.log("close modal");
			emit("closeCostCenterModal");
		};

		return {
			value,
			description,
			basicDailyRateAmount,

			updateValue,
			updateDescription,
			updateBasicDailyRateAmount,

			error,
			handleCreate,
			handleUpdate,
			editing,
			loading,

			handleCloseCostCenterModal,
		};
	},
};
</script>

<style></style>

<template>
	<!-- Modal -->
	<div
		class="modal fade"
		id="cost-center-modal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">
						Modal title
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
					<div class="row" v-if="!editing">
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
								type="text"
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
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-dismiss="modal"
					>
						Close
					</button>
					<button
						type="button"
						class="btn btn-primary"
						@click="handleCreate"
					>
						Save
					</button>
					<button
						type="button"
						class="btn btn-primary"
						@click="handleUpdate"
					>
						Save changes
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import useData from "@/composables/useData";
import { ref } from "vue";
export default {
	name: "ModalCostCenter",
	emits: ["closeCostCenterModal", "costCenterAdded"],
	setup(props, { emit }) {
		const { error, response, create, update, loading } = useData();
		const costCenterID = ref(0);
		const editing = ref(false);

		const value = ref("");
		const description = ref("");
		const basicDailyRateAmount = ref("");

		const updateValue = ref("");
		const updateDescription = ref("");
		const updateBasicDailyRateAmount = ref("");

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
			const res = await update(
				"setup_employee_cost_center/" + costCenterID
			);

			if (!error.value) {
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

			handleCloseCostCenterModal,
		};
	},
};
</script>

<style></style>

<template>
	<div
		class="modal fade"
		id="employee-dependent-modal"
		tabindex="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" v-if="!data">
						New Dependent
					</h5>
					<h5 class="modal-title" v-if="data">
						{{ data.full_name }}
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
				<form @submit.prevent="handleSubmit">
					<div class="modal-body">
						<div class="row" v-if="!data">
							<div class="form-group col-md-6">
								<label for="">Status</label>
								<select
									class="form-control"
									v-model="dependent.active"
									required
								>
									<option value="1">Active</option>
									<option value="0">Inactive</option>
								</select>
							</div>
							<div class="form-group col-md-6">
								<label for="">Full Name</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Juan Dela Cruz"
									required
									v-model="dependent.full_name"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Birth Date</label>
								<input
									type="date"
									class="form-control"
									v-model="dependent.birth_date"
								/>
							</div>

							<div class="form-group col-md-6">
								<label for="">Included</label>
								<select
									class="form-control"
									v-model="dependent.included"
									required
								>
									<option value="1">Yes</option>
									<option value="0">No</option>
								</select>
							</div>
						</div>
						<div class="row" v-if="data">
							<div class="form-group col-md-6">
								<label for="">Status</label>
								<select
									class="form-control"
									v-model="data.active"
									required
								>
									<option value="1">Active</option>
									<option value="0">Inactive</option>
								</select>
							</div>
							<div class="form-group col-md-6">
								<label for="">Full Name</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Juan Dela Cruz"
									required
									v-model="data.full_name"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Birth Date</label>
								<input
									type="date"
									class="form-control"
									v-model="data.birth_date"
								/>
							</div>

							<div class="form-group col-md-6">
								<label for="">Included</label>
								<select
									class="form-control"
									v-model="data.included"
									required
								>
									<option value="1">Yes</option>
									<option value="0">No</option>
								</select>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" v-if="!data">
							Append
						</button>
						<button class="btn btn-primary" v-if="data">
							Append Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { v4 as uuidv4 } from "uuid";
export default {
	name: "EmployeeDependentModal",
	components: {},
	props: ["data"],
	emits: ["addDependent", "updateDependent"],
	setup(props, { emit }) {
		const dependent = ref({
			id: uuidv4(),
			active: 1,
			full_name: "",
			birth_date: "",
			included: 1,
		});

		const handleSubmit = () => {
			if (!props.data) {
				emit("addDependent", dependent.value);
				dependent.value = {
					active: 1,
					full_name: "",
					birth_date: "",
					included: 1,
				};
			} else {
				emit("updateDependent", props.data);
			}
		};
		return { dependent, handleSubmit };
	},
};
</script>

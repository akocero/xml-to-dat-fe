<template>
	<div
		class="modal fade"
		id="update-bank-modal"
		tabindex="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						Edit Bank
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

				<div class="modal-body">
					<div class="row" v-if="bank">
						<div class="form-group col-5">
							<label>
								Code
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.bank_code &&
										'is-invalid',
								]"
								id="input_bank_code"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="bank.bank_code"
							/>
							<small
								v-if="error && error.errors.bank_code"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.bank_code[0] }}
							</small>
						</div>

						<div class="form-group col-7">
							<label>
								Name
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error && error.errors.name && 'is-invalid',
								]"
								id="input_bank_name"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="bank.name"
							/>
							<small
								v-if="error && error.errors.name"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.name[0] }}
							</small>
						</div>

						<div class="form-group col-md-12">
							<label for=""
								>Description
								<span class="text-danger text-bold">*</span>
							</label>
							<textarea
								name=""
								:class="[
									error &&
										error.errors.description &&
										'is-invalid',
								]"
								id="input_bank_description"
								class="form-control"
								v-model="bank.description"
							></textarea>
							<small
								v-if="error && error.errors.description"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.description[0] }}
							</small>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-custom-success"
						@click="handleUpdate"
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import useData from "@/composables/useData.js";
import { ref } from "vue";
import $ from "jquery";
export default {
	name: "EditBank",
	props: ["companyID", "bank"],
	components: {},
	setup(props, { emit }) {
		const { error, item, isPending, update } = useData();

		const handleUpdate = async () => {
			const updatedBank = {
				setup_company_id: props.companyID,
				bank_code: props.bank.bank_code,
				name: props.bank.name,
				description: props.bank.description,
			};
			// console.log(newBank);
			await update(`setupcompanybank/${props.bank.id}`, updatedBank);

			if (!error.value) {
				$("#update-bank-modal").modal("hide");

				emit("bankUpdated", updatedBank);
			} else {
				console.log("has error");
			}
		};

		return {
			error,
			isPending,
			update,
			handleUpdate,
		};
	},
};
</script>

<style></style>

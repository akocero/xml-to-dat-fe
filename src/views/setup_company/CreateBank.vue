<template>
	<div
		class="modal fade"
		id="create-bank-modal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						New Bank
					</h5>
					<button
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
						@click="closeModal"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div
						class="alert alert-danger"
						role="alert"
						v-if="unknownError"
					>
						{{ unknownError }}
					</div>
					<div class="row">
						<div class="form-group col-4">
							<BaseInputField
								id="input_bank_code"
								label="Code"
								v-model="bank_code"
								:error="error"
								:errorField="error?.errors?.bank_code || null"
								placeholder="Ex. BDO"
								:required="true"
							/>
							<!-- <label>
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
								v-model="bank_code"
							/>
							<small
								v-if="error && error.errors.bank_code"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.bank_code[0] }}
							</small> -->
						</div>

						<div class="form-group col-8">
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
								placeholder="Ex. Company 1"
								v-model="name"
							/>
							<small
								v-if="error && error.errors.name"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.name[0] }}
							</small>
						</div>

						<div class="form-group col-4">
							<label>
								Branch Code
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.branch_code &&
										'is-invalid',
								]"
								id="input_bank_branch_code"
								placeholder="Ex. 1234567"
								v-model="branch_code"
							/>
							<small
								v-if="error && error.errors.branch_code"
								class="form-text text-danger"
							>
								{{ error.errors.branch_code[0] }}
							</small>
						</div>

						<div class="form-group col-md-8">
							<label for="">Description </label>
							<textarea
								name=""
								:class="[
									error &&
										error.errors.description &&
										'is-invalid',
								]"
								id="input_bank_description"
								placeholder="Ex. Banco De Oro"
								class="form-control"
								v-model="description"
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
						@click="handleCreate"
						v-if="!isPending"
					>
						Save
					</button>
					<button type="button" class="btn btn-custom-success" v-else>
						Saving...
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "@/axios/axios-instance";
import { ref } from "vue";
import $ from "jquery";
import BaseInputField from "@/components/BaseInputField";
import endpoints from "@/utils/endpoints";
export default {
	name: "CreateBank",
	props: ["companyID"],
	components: { BaseInputField },
	setup(props, { emit }) {
		const error = ref(null);
		const unknownError = ref(null);
		const response = ref(null);
		const isPending = ref(false);

		const bank_code = ref("");
		const name = ref("");
		const branch_code = ref("");
		const description = ref("");

		const handleCreate = async () => {
			isPending.value = true;

			const newBank = {
				setup_company_id: props.companyID,
				bank_code: bank_code.value,
				name: name.value,
				description: description.value,
				branch_code: branch_code.value,
			};

			try {
				const res = await axios.post(
					endpoints.setupCompanyBank,
					newBank
				);
				response.value = res.data;
				error.value = null;
				unknownError.value = null;

				$("#create-bank-modal").modal("hide");

				bank_code.value = "";
				name.value = "";
				description.value = "";
				branch_code.value = "";

				emit("bankAdded", response.value);

				isPending.value = false;
			} catch (err) {
				isPending.value = false;

				if (err.message.includes("422")) {
					error.value = err.response.data;
					unknownError.value = null;
				} else {
					unknownError.value =
						"Please check your internet connection";
					error.value = null;
					response.value = null;
				}
			}
		};

		const closeModal = () => {
			emit("hideCreateBank");
		};

		return {
			error,
			unknownError,
			isPending,
			handleCreate,
			bank_code,
			branch_code,
			name,
			description,
			closeModal,
		};
	},
};
</script>

<style></style>

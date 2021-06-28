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
					<div class="row">
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
								v-model="bank_code"
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
import useCreate from "@/composables/useCreate.js";
import { onUpdated, ref } from "vue";
import $ from "jquery";

export default {
	name: "CreateBank",
	props: ["companyID"],
	components: {},
	setup(props, { emit }) {
		const { error, response, isPending, create } = useCreate();

		const bank_code = ref("");
		const name = ref("");
		const description = ref("");

		const handleCreate = async () => {
			const newBank = {
				setup_company_id: props.companyID,
				bank_code: bank_code.value,
				name: name.value,
				description: description.value,
			};
			// console.log(newBank);
			await create("setupcompanybank", newBank);

			if (!error.value) {
				$("#create-bank-modal").modal("hide");
				bank_code.value = "";
				name.value = "";
				description.value = "";
				emit("bankAdded", response.value);
			} else {
				console.log("has error");
			}
		};

		const closeModal = () => {
			emit("hideCreateBank");
		};

		return {
			error,
			isPending,
			create,
			handleCreate,
			bank_code,
			name,
			description,
			closeModal,
		};
	},
};
</script>

<style></style>

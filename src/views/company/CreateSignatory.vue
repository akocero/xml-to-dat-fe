<template>
	<div
		class="modal fade"
		id="create-signatory-modal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						New Signatory
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
						<div class="form-group col-12">
							<label for="">Upload Signatory Image</label>
							<input
								type="file"
								class="d-block"
								id="input_signatory_image_path"
							/>
						</div>

						<div class="form-group col-7">
							<label>
								Prepared By:
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.prepared_by &&
										'is-invalid',
								]"
								id="input_signatory_prepared_by"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="prepared_by"
							/>
							<small
								v-if="error && error.errors.prepared_by"
								class="form-text text-danger"
							>
								{{ error.errors.prepared_by[0] }}
							</small>
						</div>

						<div class="form-group col-md-5">
							<label for=""
								>Posistion
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								name=""
								:class="[
									error &&
										error.errors.position &&
										'is-invalid',
								]"
								id="input_signatory_position"
								class="form-control"
								v-model="position"
							/>
							<small
								v-if="error && error.errors.position"
								class="form-text text-danger"
							>
								{{ error.errors.position[0] }}
							</small>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-custom-success"
						v-if="!isPending"
						@click="handleCreate"
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
import { onUpdated, ref } from "vue";
import $ from "jquery";

export default {
	name: "CreateSignatory",
	props: ["companyID"],
	components: {},
	setup(props, { emit }) {
		const error = ref(null);
		const unknownError = ref(null);
		const response = ref(null);
		const isPending = ref(false);

		const prepared_by = ref("");
		const position = ref("");

		const handleCreate = async () => {
			const newSignatory = {
				setup_company_id: props.companyID,
				prepared_by: prepared_by.value,
				position: position.value,
			};

			try {
				const res = await axios.post(
					"setupcompanysignatory",
					newSignatory
				);
				response.value = res.data;
				error.value = null;
				unknownError.value = null;

				$("#create-signatory-modal").modal("hide");

				prepared_by.value = "";
				position.value = "";

				emit("signatoryAdded", response.value);

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
			emit("hideCreateSignatory");
		};

		return {
			error,
			isPending,
			handleCreate,
			prepared_by,
			position,
			closeModal,
			unknownError,
		};
	},
};
</script>

<style></style>

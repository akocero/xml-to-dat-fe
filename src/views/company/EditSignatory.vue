<template>
	<div
		class="modal fade"
		id="update-signatory-modal"
		tabindex="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						Edit Signatory
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
					<div class="row" v-if="signatory_id && item">
						<div class="form-group col-5">
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
								id="input_bank_code"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="item.prepared_by"
							/>
							<small
								v-if="error && error.errors.prepared_by"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.prepared_by[0] }}
							</small>
						</div>

						<div class="form-group col-7">
							<label>
								Position
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.position &&
										'is-invalid',
								]"
								id="input_bank_name"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="item.position"
							/>
							<small
								v-if="error && error.errors.position"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.position[0] }}
							</small>
						</div>
					</div>
					<Spinner v-else />
				</div>

				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-custom-success"
						@click="handleUpdate"
						v-if="!isPending"
					>
						Save Changes
					</button>
					<button
						v-else
						type="button"
						class="btn btn-custom-success"
						disabled
					>
						Saving...
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import getItem from "@/composables/getItem.js";
import Spinner from "@/components/Spinner";
import { onUnmounted, ref } from "vue";
import axios from "@/axios/axios-instance";
import $ from "jquery";
export default {
	name: "EditSignatory",
	props: ["signatory_id"],
	components: {
		Spinner,
	},
	setup(props, { emit }) {
		const { item, error: errorData, load } = getItem(
			props.signatory_id,
			"setupcompanysignatory"
		);

		const error = ref(null);
		const unknownError = ref(null);
		const response = ref(null);
		const isPending = ref(false);

		load();

		const handleUpdate = async () => {
			const updatedSignatory = {
				setup_company_id: item.value.setup_company_id,
				prepared_by: item.value.prepared_by,
				position: item.value.position,
			};

			try {
				const res = await axios.patch(
					"setupcompanysignatory/" + props.signatory_id,
					updatedSignatory
				);
				response.value = res.data;
				error.value = null;
				unknownError.value = null;

				$("#update-signatory-modal").modal("hide");

				emit("signatoryUpdated", response.value);

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

		onUnmounted(() => {
			item.value = null;
		});

		const closeModal = () => {
			emit("hideEditSignatory");
		};

		return {
			error,
			isPending,
			handleUpdate,
			closeModal,
			item,
		};
	},
};
</script>

<style></style>

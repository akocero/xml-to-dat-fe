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
						@click="closeModal"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div class="row" v-if="bank_id && item">
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
								v-model="item.bank_code"
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
								v-model="item.name"
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
								v-model="item.description"
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
import axios from "@/axios/axios-instance";
import getItem from "@/composables/getItem.js";
import Spinner from "@/components/Spinner";
import { onUnmounted, ref } from "vue";
import $ from "jquery";
export default {
	name: "EditBank",
	props: ["bank_id"],
	components: {
		Spinner,
	},
	setup(props, { emit }) {
		const { item, error: errorData, load } = getItem(
			props.bank_id,
			"setupcompanybank"
		);
		const error = ref(null);
		const unknownError = ref(null);
		const response = ref(null);
		const isPending = ref(false);

		load();

		const handleUpdate = async () => {
			const updatedBank = {
				setup_company_id: item.value.setup_company_id,
				bank_code: item.value.bank_code,
				name: item.value.name,
				description: item.value.description,
			};

			try {
				const res = await axios.patch(
					"setupcompanybank/" + props.bank_id,
					updatedBank
				);
				response.value = res.data;
				error.value = null;
				unknownError.value = null;

				$("#update-bank-modal").modal("hide");

				emit("bankUpdated", response.value);

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
			emit("hideEditBank");
		};

		return {
			error,
			isPending,
			handleUpdate,
			closeModal,
			unknownError,
			item,
		};
	},
};
</script>

<style></style>

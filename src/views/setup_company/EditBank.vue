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
					<div
						class="alert alert-danger alert-dismissible fade show"
						role="alert"
						v-if="detailError"
					>
						<strong>Error:</strong> Please fill out details field
						<button
							type="button"
							class="close"
							data-dismiss="alert"
							aria-label="Close"
							@click="closeDetailAlert"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div
						class="alert alert-info alert-dismissible fade show"
						role="alert"
						v-if="detailSuccess"
					>
						<strong>Info:</strong> Please hit save changes to save
						additional details
						<button
							type="button"
							class="close"
							data-dismiss="alert"
							aria-label="Close"
							@click="closeDetailAlert"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="row" v-if="bank_id && item">
						<div class="form-group col-4">
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
								placeholder="Ex. BDO"
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
								v-model="item.branch_code"
							/>
							<small
								v-if="error && error.errors.branch_code"
								class="form-text text-danger"
							>
								{{ error.errors.branch_code[0] }}
							</small>
						</div>

						<div class="form-group col-md-8">
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
								placeholder="Ex. Banco De Oro"
							></textarea>
							<small
								v-if="error && error.errors.description"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.description[0] }}
							</small>
						</div>
						<div class="col-12 d-flex align-items-center pt-4 pb-2">
							<h5 class="h6 mb-0 pr-2">
								Additional Details
							</h5>
							<i
								data-toggle="tooltip"
								data-placement="top"
								title="Ex. Account No., SA Company Code, CA Company Code, Latest Company Code, Corp Card No."
								v-html="help"
							></i>
							<button
								class="btn btn-sm btn-primary ml-auto"
								@click="addingDetail = !addingDetail"
							>
								Add Details
							</button>
						</div>
						<div class="col-12">
							<hr class="m-0 p-0 mb-2" />
							<div class="row d-flex col-12">
								<label
									for=""
									class="text-sm font-weight-bold w-25"
									>Label</label
								>

								<label
									for=""
									class="text-sm font-weight-bold pl-5"
									>Value</label
								>
							</div>
						</div>
						<div
							class="form-group col-md-12 d-flex"
							v-if="addingDetail"
						>
							<input
								type="text"
								v-model="detailLabel"
								placeholder="Ex. Account No."
								class="form-control mr-2 w-50 text-primary"
							/>
							<input
								type="text"
								v-model="detailValue"
								placeholder="Ex. 11111111"
								class="form-control mr-2"
							/>
							<button
								class="btn btn-sm btn-success"
								@click="addBankDetail"
							>
								<i v-html="save"></i>
							</button>
						</div>
						<div
							v-for="(item, index) in item.additional_details"
							:key="index"
							class="form-group col-md-12 d-flex"
						>
							<input
								type="text"
								:value="index"
								class="form-control mr-2 w-50 text-primary"
								disabled
							/>
							<input
								type="text"
								:value="item"
								class="form-control mr-2"
								disabled
							/>
							<button
								class="btn btn-sm btn-default"
								@click="deleteDetail(index)"
							>
								<i v-html="trash"></i>
							</button>
						</div>
					</div>
				</div>

				<Spinner v-if="!bank_id && !item" />

				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-custom-success"
						@click="handleUpdate"
						v-if="!isPending && !addingDetail"
					>
						Save Changes
					</button>
					<button
						type="button"
						class="btn btn-custom-success"
						@click="handleUpdate"
						v-else-if="addingDetail && !isPending"
						disabled
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
import feather from "feather-icons";
import $ from "jquery";
export default {
	name: "EditBank",
	props: ["bank_id"],
	components: {
		Spinner,
	},
	computed: {
		trash: function() {
			return feather.icons["trash"].toSvg({
				width: 18,
			});
		},
		save: function() {
			return feather.icons["save"].toSvg({
				width: 18,
			});
		},
		help: function() {
			return feather.icons["help-circle"].toSvg({
				width: 18,
			});
		},
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

		const addingDetail = ref(false);
		const detailLabel = ref(null);
		const detailValue = ref(null);
		const detailError = ref(null);
		const detailSuccess = ref(null);

		load();

		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

		const handleUpdate = async () => {
			const updatedBank = {
				setup_company_id: item.value.setup_company_id,
				bank_code: item.value.bank_code,
				name: item.value.name,
				description: item.value.description,
				branch_code: item.value.branch_code,
				additional_details: item.value.additional_details,
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

		const makeid = (length) => {
			var result = "";
			var characters =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var charactersLength = characters.length;
			for (var i = 0; i < length; i++) {
				result += characters.charAt(
					Math.floor(Math.random() * charactersLength)
				);
			}
			return result;
		};

		const addBankDetail = () => {
			detailError.value = false;
			detailSuccess.value = false;
			if (detailLabel.value && detailValue.value) {
				item.value.additional_details = {
					...item.value.additional_details,
					[detailLabel.value]: detailValue.value,
				};
				addingDetail.value = false;
				detailLabel.value = null;
				detailValue.value = null;
				detailSuccess.value = true;
			} else {
				detailError.value = true;
			}
		};

		const deleteDetail = (detail) => {
			var data = item.value.additional_details;
			for (var key in data) {
				if (key === detail) {
					delete data[detail];
				}
			}

			detailSuccess.value = true;
		};
		const closeDetailAlert = () => {
			detailError.value = false;
			detailSuccess.value = false;
		};

		return {
			error,
			isPending,
			handleUpdate,
			closeModal,
			deleteDetail,
			unknownError,
			addBankDetail,
			addingDetail,
			closeDetailAlert,
			detailValue,
			detailLabel,
			detailError,
			detailSuccess,
			alert,
			item,
		};
	},
};
</script>

<style>
.modal-body {
	max-height: 70vh;
	overflow-y: auto;
}
</style>

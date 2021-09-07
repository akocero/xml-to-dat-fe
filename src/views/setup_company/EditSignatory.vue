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
						@click="$emit('hideEditSignatory')"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div class="row" v-if="signatory_id && item">
						<div class="form-group col-7">
							<BaseInputField
								id="input_signatory_code"
								label="Signatory Code"
								v-model="item.code"
								:error="error"
								:errorField="error?.errors?.code || null"
								placeholder="Ex. Signatory 1"
								:required="true"
							/>
						</div>
						<div class="form-group col-5">
							<label for=""
								>Status
								<span class="text-danger text-bold"
									>*</span
								></label
							>
							<select class="form-control" v-model="item.active">
								<option value="1">Active</option>
								<option value="0">Inactive</option>
							</select>
						</div>
						<div class="form-group col-7">
							<label>
								Prepared by:
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
								v-model="item.prepared_by"
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
								>Position
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								name=""
								:class="[
									error &&
										error.errors.p_position &&
										'is-invalid',
								]"
								id="input_signatory_p_position"
								class="form-control"
								v-model="item.p_position"
							/>
							<small
								v-if="error && error.errors.p_position"
								class="form-text text-danger"
							>
								{{ error.errors.p_position[0] }}
							</small>
						</div>

						<div class="form-group col-7">
							<label>
								Checked by:
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.checked_by &&
										'is-invalid',
								]"
								id="input_signatory_checked_by"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="item.checked_by"
							/>
							<small
								v-if="error && error.errors.checked_by"
								class="form-text text-danger"
							>
								{{ error.errors.checked_by[0] }}
							</small>
						</div>

						<div class="form-group col-md-5">
							<label for="">Position </label>
							<input
								name=""
								:class="[
									error &&
										error.errors.c_position &&
										'is-invalid',
								]"
								id="input_signatory_c_position"
								class="form-control"
								v-model="item.c_position"
							/>
							<small
								v-if="error && error.errors.c_position"
								class="form-text text-danger"
							>
								{{ error.errors.c_position[0] }}
							</small>
						</div>

						<div class="form-group col-7">
							<label>
								Approved by:
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.approved_by &&
										'is-invalid',
								]"
								id="input_signatory_approved_by"
								placeholder="Ex. 1234567"
								v-model="item.approved_by"
							/>
							<small
								v-if="error && error.errors.approved_by"
								class="form-text text-danger"
							>
								{{ error.errors.approved_by[0] }}
							</small>
						</div>

						<div class="form-group col-md-5">
							<label for="">Position </label>
							<input
								name=""
								:class="[
									error &&
										error.errors.a_position &&
										'is-invalid',
								]"
								id="input_signatory_a_position"
								class="form-control"
								v-model="item.a_position"
							/>
							<small
								v-if="error && error.errors.a_position"
								class="form-text text-danger"
							>
								{{ error.errors.a_position[0] }}
							</small>
						</div>

						<div class="form-group col-7">
							<label>
								Noted by:
							</label>
							<input
								type="text"
								class="form-control"
								:class="[
									error &&
										error.errors.noted_by &&
										'is-invalid',
								]"
								id="input_signatory_noted_by"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="item.noted_by"
							/>
							<small
								v-if="error && error.errors.noted_by"
								class="form-text text-danger"
							>
								{{ error.errors.noted_by[0] }}
							</small>
						</div>

						<div class="form-group col-md-5">
							<label for="">Position </label>
							<input
								name=""
								:class="[
									error &&
										error.errors.n_position &&
										'is-invalid',
								]"
								id="input_signatory_n_position"
								class="form-control"
								v-model="item.n_position"
							/>
							<small
								v-if="error && error.errors.n_position"
								class="form-text text-danger"
							>
								{{ error.errors.n_position[0] }}
							</small>
						</div>

						<div class="form-group col-md-12">
							<label for=""
								>Payroll Journal Report
								<span class="text-danger text-bold">*</span>
							</label>
							<textarea
								name=""
								:class="[
									error &&
										error.errors.payroll_journal_report &&
										'is-invalid',
								]"
								id="input_signatory_pjr"
								class="form-control"
								v-model="item.payroll_journal_report"
							></textarea>
							<small
								v-if="
									error && error.errors.payroll_journal_report
								"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.payroll_journal_report[0] }}
							</small>
						</div>

						<div class="form-group col-md-12">
							<label for=""
								>Overtime Journal Report
								<span class="text-danger text-bold">*</span>
							</label>
							<textarea
								name=""
								:class="[
									error &&
										error.errors.overtime_journal_report &&
										'is-invalid',
								]"
								id="input_signatory_ojr"
								class="form-control"
								v-model="item.overtime_journal_report"
							></textarea>
							<small
								v-if="
									error &&
										error.errors.overtime_journal_report
								"
								id="emailHelp"
								class="form-text text-danger"
							>
								{{ error.errors.overtime_journal_report[0] }}
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
						v-if="!loading"
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
import { onBeforeMount, onUnmounted, ref } from "vue";
import BaseInputField from "@/components/BaseInputField";
import useData from "@/composables/useData";
import endpoints from "@/utils/endpoints";
import $ from "jquery";
export default {
	name: "EditSignatory",
	props: ["signatory_id"],
	components: {
		Spinner,
		BaseInputField,
	},
	setup(props, { emit }) {
		const { item, error: errorData, load } = getItem(
			props.signatory_id,
			endpoints.setupCompanySignatory
		);

		const { response, error, update, loading, unknownError } = useData();

		onBeforeMount(async () => {
			await load();
		});

		const handleUpdate = async () => {
			const updatedSignatory = {
				active: item.value.active,
				code: item.value.code,
				setup_company_id: item.value.setup_company_id,
				prepared_by: item.value.prepared_by,
				p_position: item.value.p_position,
				checked_by: item.value.checked_by,
				c_position: item.value.c_position,
				noted_by: item.value.noted_by,
				n_position: item.value.n_position,
				approved_by: item.value.approved_by,
				a_position: item.value.a_position,
				overtime_journal_report: item.value.overtime_journal_report,
				payroll_journal_report: item.value.payroll_journal_report,
			};

			const res = await update(
				`${endpoints.setupCompanySignatory}/${props.signatory_id}`,
				updatedSignatory
			);

			if (!error.value) {
				$("#update-signatory-modal").modal("hide");
				emit("signatoryUpdated", response.value);
				console.log(res);
			}
		};

		onUnmounted(() => {
			item.value = null;
		});

		return {
			error,
			loading,
			handleUpdate,
			item,
		};
	},
};
</script>

<style></style>

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
						<div class="form-group col-7">
							<BaseTextField
								id="input_signatory_code"
								label="Signatory Code"
								v-model="code"
								:error="error"
								:errorField="error?.errors?.code || null"
								placeholder="Ex. Signatory 1"
								:required="true"
							/>
						</div>
						<div class="form-group col-5">
							<label for="">Status</label>
							<select class="form-control" disabled>
								<option value="active">Active</option>
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
								v-model="p_position"
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
								<span class="text-danger text-bold">*</span>
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
								v-model="checked_by"
							/>
							<small
								v-if="error && error.errors.checked_by"
								class="form-text text-danger"
							>
								{{ error.errors.checked_by[0] }}
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
										error.errors.c_position &&
										'is-invalid',
								]"
								id="input_signatory_c_position"
								class="form-control"
								v-model="c_position"
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
								<span class="text-danger text-bold">*</span>
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
								v-model="approved_by"
							/>
							<small
								v-if="error && error.errors.approved_by"
								class="form-text text-danger"
							>
								{{ error.errors.approved_by[0] }}
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
										error.errors.a_position &&
										'is-invalid',
								]"
								id="input_signatory_a_position"
								class="form-control"
								v-model="a_position"
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
								<span class="text-danger text-bold">*</span>
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
								v-model="noted_by"
							/>
							<small
								v-if="error && error.errors.noted_by"
								class="form-text text-danger"
							>
								{{ error.errors.noted_by[0] }}
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
										error.errors.n_position &&
										'is-invalid',
								]"
								id="input_signatory_n_position"
								class="form-control"
								v-model="n_position"
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
								v-model="payroll_journal_report"
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
								v-model="overtime_journal_report"
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
import BaseTextField from "@/components/BaseTextField";

export default {
	name: "CreateSignatory",
	props: ["companyID"],
	components: {
		BaseTextField,
	},
	setup(props, { emit }) {
		const error = ref(null);
		const unknownError = ref(null);
		const response = ref(null);
		const isPending = ref(false);

		const code = ref("");
		const prepared_by = ref("");
		const p_position = ref("");
		const checked_by = ref("");
		const c_position = ref("");
		const approved_by = ref("");
		const a_position = ref("");
		const noted_by = ref("");
		const n_position = ref("");
		const overtime_journal_report = ref("");
		const payroll_journal_report = ref("");

		const handleCreate = async () => {
			const newSignatory = {
				code: code.value,
				active: 0,
				setup_company_id: props.companyID,
				prepared_by: prepared_by.value,
				p_position: p_position.value,
				checked_by: checked_by.value,
				c_position: c_position.value,
				noted_by: noted_by.value,
				n_position: n_position.value,
				approved_by: approved_by.value,
				a_position: a_position.value,
				overtime_journal_report: overtime_journal_report.value,
				payroll_journal_report: payroll_journal_report.value,
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

				emit("signatoryAdded", response.value);

				isPending.value = false;
			} catch (err) {
				isPending.value = false;

				if (err.message.includes("422")) {
					error.value = err.response.data;
					console.log(err.response.data);
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

			closeModal,
			unknownError,

			code,
			prepared_by,
			p_position,
			noted_by,
			n_position,
			approved_by,
			a_position,
			checked_by,
			c_position,
			overtime_journal_report,
			payroll_journal_report,
		};
	},
};
</script>

<style></style>

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
						View Signatory
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
							<label>
								Signatory Code
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								disabled
								type="text"
								class="form-control"
								id="input_signatory_code"
								placeholder="Ex. Signatory 1"
								v-model="item.code"
							/>
						</div>
						<div class="form-group col-5">
							<label for=""
								>Status
								<span class="text-danger text-bold"
									>*</span
								></label
							>
							<select
								class="form-control"
								v-model="item.active"
								disabled
							>
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
								disabled
								type="text"
								class="form-control"
								id="input_signatory_prepared_by"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="item.prepared_by"
							/>
						</div>

						<div class="form-group col-md-5">
							<label for=""
								>Position
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								disabled
								name=""
								id="input_signatory_p_position"
								class="form-control"
								v-model="item.p_position"
							/>
						</div>

						<div class="form-group col-7">
							<label>
								Checked by:
							</label>
							<input
								disabled
								type="text"
								class="form-control"
								id="input_signatory_checked_by"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="item.checked_by"
							/>
						</div>

						<div class="form-group col-md-5">
							<label for="">Position </label>
							<input
								disabled
								name=""
								id="input_signatory_c_position"
								class="form-control"
								v-model="item.c_position"
							/>
						</div>

						<div class="form-group col-7">
							<label>
								Approved by:
							</label>
							<input
								disabled
								type="text"
								class="form-control"
								id="input_signatory_approved_by"
								placeholder="Ex. 1234567"
								v-model="item.approved_by"
							/>
						</div>

						<div class="form-group col-md-5">
							<label for="">Position </label>
							<input
								disabled
								name=""
								id="input_signatory_a_position"
								class="form-control"
								v-model="item.a_position"
							/>
						</div>

						<div class="form-group col-7">
							<label>
								Noted by:
							</label>
							<input
								disabled
								type="text"
								class="form-control"
								id="input_signatory_noted_by"
								aria-describedby="emailHelp"
								placeholder="Ex. 1234567"
								v-model="item.noted_by"
							/>
						</div>

						<div class="form-group col-md-5">
							<label for="">Position </label>
							<input
								disabled
								name=""
								id="input_signatory_n_position"
								class="form-control"
								v-model="item.n_position"
							/>
						</div>

						<div class="form-group col-md-12">
							<label for=""
								>Payroll Journal Report
								<span class="text-danger text-bold">*</span>
							</label>
							<textarea
								disabled
								name=""
								id="input_signatory_pjr"
								class="form-control"
								v-model="item.payroll_journal_report"
							></textarea>
						</div>

						<div class="form-group col-md-12">
							<label for=""
								>Overtime Journal Report
								<span class="text-danger text-bold">*</span>
							</label>
							<textarea
								disabled
								name=""
								id="input_signatory_ojr"
								class="form-control"
								v-model="item.overtime_journal_report"
							></textarea>
						</div>
					</div>
					<Spinner v-else />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import getItem from "@/composables/getItem.js";
import useViewMode from "@/composables/useViewMode.js";
import Spinner from "@/components/Spinner";
import { onBeforeMount, onUnmounted } from "vue";
import BaseInputField from "@/components/BaseInputField";
import endpoints from "@/utils/endpoints";

export default {
	name: "ViewSignatory",
	props: ["signatory_id"],
	components: {
		Spinner,
		BaseInputField,
	},
	setup(props) {
		const { item, error: errorData, load } = getItem(
			props.signatory_id,
			endpoints.setupCompanySignatory
		);
		const { disableThisFields } = useViewMode();

		onBeforeMount(async () => {
			await load();
			// disableThisFields(["input", "select", "textarea"]);
		});

		onUnmounted(() => {
			item.value = null;
		});

		return {
			item,
		};
	},
};
</script>

<style></style>

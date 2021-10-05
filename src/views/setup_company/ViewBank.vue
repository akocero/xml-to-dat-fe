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
						View Bank
					</h5>
					<button
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
						@click="$emit('hideEditBank')"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div class="row" v-if="bank_id && item">
						<div class="form-group col-4">
							<label>
								Code
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								id="input_bank_code"
								aria-describedby="emailHelp"
								placeholder="Ex. BDO"
								v-model="item.bank_code"
							/>
						</div>

						<div class="form-group col-8">
							<label>
								Name
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								id="input_bank_name"
								aria-describedby="emailHelp"
								placeholder="Ex. Company 1"
								v-model="item.name"
							/>
						</div>

						<div class="form-group col-4">
							<label>
								Branch Code
								<span class="text-danger text-bold">*</span>
							</label>
							<input
								type="text"
								class="form-control"
								id="input_bank_branch_code"
								placeholder="Ex. 1234567"
								v-model="item.branch_code"
							/>
						</div>

						<div class="form-group col-md-8">
							<label for="">Description </label>
							<textarea
								name=""
								id="input_bank_description"
								class="form-control"
								v-model="item.description"
								placeholder="Ex. Banco De Oro"
							></textarea>
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
							<!-- <button
								class="btn btn-sm btn-primary ml-auto"
								@click="addingDetail = !addingDetail"
							>
								Add Details
							</button> -->
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
							<button class="btn btn-sm btn-default" disabled>
								<i v-html="trash"></i>
							</button>
						</div>
					</div>
				</div>

				<Spinner v-if="!bank_id && !item" />
			</div>
		</div>
	</div>
</template>

<script>
import getItem from "@/composables/getItem.js";
import useViewMode from "@/composables/useViewMode.js";
import Spinner from "@/components/Spinner";
import { onBeforeMount, onUnmounted } from "vue";
import feather from "feather-icons";
import $ from "jquery";
import endpoints from "@/utils/endpoints";

export default {
	name: "ViewBank",
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
	setup(props) {
		const { item, error: errorData, load } = getItem(
			props.bank_id,
			endpoints.setupCompanyBank
		);
		const { disableThisFields } = useViewMode();

		onBeforeMount(async () => {
			await load();

			disableThisFields(["input", "select", "textarea"]);
		});

		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
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

<style>
.modal-body {
	max-height: 70vh;
	overflow-y: auto;
}
</style>

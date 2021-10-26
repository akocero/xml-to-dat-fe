<template>
	<div
		class="modal fade"
		id="bank-details-modal"
		tabindex="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" v-if="!data">
						New Bank Details
					</h5>
					<h5 class="modal-title" v-if="data">
						Edit Bank Details
					</h5>
					<button
						type="button"
						class="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form @submit.prevent="handleSubmit">
					<div class="modal-body">
						<div class="row" v-if="!data">
							<div class="form-group col-md-6">
								<label for="">Field Name</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Account No"
									v-model="bank_detail.field_name"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Value</label>
								<input
									type="text"
									class="form-control"
									required
									placeholder="Ex. 1233456"
									v-model="bank_detail.value"
								/>
							</div>
						</div>
						<div class="row" v-if="data">
							<div class="form-group col-md-6">
								<label for="">Field Name</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Account No"
									v-model="data.field_name"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Value</label>
								<input
									type="text"
									class="form-control"
									required
									placeholder="Ex. 1233456"
									v-model="data.value"
								/>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" v-if="!data">
							Append
						</button>
						<button class="btn btn-primary" v-if="data">
							Append Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { v4 as uuidv4 } from "uuid";
export default {
	name: "BankAddtionalDetailsModal",
	components: {},
	props: ["data"],
	emits: ["addBankDetail", "updateBankDetail"],
	setup(props, { emit }) {
		const bank_detail = ref({
			id: uuidv4(),
			field_name: "",
			value: "",
		});

		const handleSubmit = () => {
			if (!props.data) {
				console.log(bank_detail.value);
				emit("addBankDetail", bank_detail.value);
				bank_detail.value = {
					id: uuidv4(),
					field_name: "",
					value: "",
				};
			} else {
				emit("updateBankDetail", props.data);
			}
		};
		return { bank_detail, handleSubmit };
	},
};
</script>

<template>
	<div class="row">
		<div class="col-12">
			<ul class="table-card ">
				<li
					class="table-card-item "
					v-for="col in additional_details"
					:key="col.id"
				>
					<div class="table-card-cell">
						<label for="">Field Name</label>
						<div class="text-capitalize">
							{{ col.field_name }}
						</div>
					</div>
					<div class="table-card-cell">
						<label for="">Value </label>
						<div>
							{{ col.value }}
						</div>
					</div>
					<div
						class="table-card-cell-action d-flex align-items-center justify-content-end"
					>
						<button
							class="btn btn-default btn-sm mr-2"
							type="button"
							data-toggle="modal"
							data-target="#bank-details-modal"
							data-backdrop="static"
							data-keyboard="false"
							@click="$emit('forEditBankDetail', col)"
						>
							<i class="far fa-edit text-secondary"></i>
						</button>
						<button
							class="btn btn-default btn-sm"
							type="button"
							@click="$emit('deleteBankDetail', col.id)"
						>
							<i class="far fa-trash-alt text-secondary"></i>
						</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { onUpdated } from "@vue/runtime-core";
export default {
	name: "BankAddtionalDetailsList",
	props: ["additional_details"],

	setup(props) {
		onUpdated(() => {
			console.log(props.additional_details);
		});
	},
};
</script>

<style></style>

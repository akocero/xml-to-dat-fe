<template>
	<ul class="table-card">
		<li class="table-card-item" v-for="bank in banks" :key="bank.id">
			<div class="table-card-cell">
				<label for="" class="">Bank code</label>
				<div class="">
					{{ bank.bank_code }}
				</div>
			</div>
			<div class="table-card-cell">
				<label>Account name</label>
				<div>
					{{ bank.name }}
				</div>
			</div>
			<div class="table-card-cell">
				<label for="">Description</label>
				<div>
					{{ bank.description }}
				</div>
			</div>
			<div
				class="table-card-cell-action d-flex align-items-center justify-content-end"
			>
				<button
					type="button"
					class="btn btn-sm btn-default mr-2"
					data-toggle="modal"
					data-target="#update-bank-modal"
					data-backdrop="static"
					data-keyboard="false"
					@click="
						$emit('handleShowBankModal', {
							id: bank.id,
							action: 'view',
						})
					"
				>
					<i class="far fa-eye"></i>
				</button>
				<button
					v-if="!viewMode"
					type="button"
					class="btn btn-sm btn-default"
					data-toggle="modal"
					data-target="#update-bank-modal"
					data-backdrop="static"
					data-keyboard="false"
					@click="
						$emit('handleShowBankModal', {
							id: bank.id,
							action: 'update',
						})
					"
				>
					<i class="far fa-edit"></i>
				</button>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	name: "CompanyBankTable",
	props: {
		banks: {
			type: Array,
		},
		viewMode: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style></style>

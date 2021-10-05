<template>
	<ul class="table-card">
		<li
			class="table-card-item"
			v-for="signatory in signatories"
			:key="signatory.id"
		>
			<div class="table-card-cell">
				<label>Code</label>
				<div>
					{{ signatory.code }}
				</div>
			</div>
			<div class="table-card-cell">
				<label>Prepared By</label>
				<div>
					{{ signatory.prepared_by }}
				</div>
			</div>
			<div class="table-card-cell">
				<label>Position</label>
				<div>
					{{ signatory.p_position }}
				</div>
			</div>

			<div class="table-card-cell">
				<label>Status</label>
				<div>
					<span
						class="custom-badge custom-badge-success"
						v-if="signatory.active == 1"
						>Active</span
					>
					<span class="custom-badge custom-badge-danger" v-else
						>Inactive</span
					>
				</div>
			</div>
			<div
				class="table-card-cell-action d-flex align-items-center justify-content-end"
			>
				<button
					type="button"
					class="btn btn-sm btn-default mr-2"
					data-toggle="modal"
					data-target="#update-signatory-modal"
					data-backdrop="static"
					data-keyboard="false"
					@click="
						$emit('handleShowSignatoryModal', {
							id: signatory.id,
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
					data-target="#update-signatory-modal"
					data-backdrop="static"
					data-keyboard="false"
					@click="
						$emit('handleShowSignatoryModal', {
							id: signatory.id,
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
	name: "CompanySignatoryTable",
	props: {
		signatories: {
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

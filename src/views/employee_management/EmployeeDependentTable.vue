<template>
	<div class="row">
		<div class="col-12">
			<ul class="table-card ">
				<li
					class="table-card-item "
					v-for="col in dependents"
					:key="col.id"
				>
					<div class="table-card-cell">
						<label for="">Name</label>
						<div>
							{{ col.full_name }}
						</div>
					</div>
					<div class="table-card-cell">
						<label for="">Included</label>
						<br />
						<span
							class="custom-badge custom-badge-info"
							v-if="col.included == 1"
							>Yes</span
						>
						<span class="custom-badge custom-badge-danger" v-else
							>No</span
						>
					</div>
					<div class="table-card-cell">
						<label for="">Status</label><br />
						<span
							class="custom-badge custom-badge-success"
							v-if="col.active == 1"
							>Active</span
						>
						<span class="custom-badge custom-badge-danger" v-else
							>Inactive</span
						>
					</div>
					<div
						class="table-card-cell-action d-flex align-items-center justify-content-end"
					>
						<button
							class="btn btn-default btn-sm mr-2"
							type="button"
							data-toggle="modal"
							data-target="#employee-dependent-modal"
							data-backdrop="static"
							data-keyboard="false"
							@click="$emit('forEditDependent', col)"
						>
							<i class="far fa-edit text-secondary"></i>
						</button>
						<button
							class="btn btn-default btn-sm"
							type="button"
							@click="$emit('deleteDependent', col.id)"
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
export default {
	name: "EmployeeDependentTable",
	props: ["dependents"],
};
</script>

<style></style>

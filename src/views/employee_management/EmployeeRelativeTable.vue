<template>
	<div class="row">
		<div class="col-12">
			<ul class="table-card ">
				<li
					class="table-card-item "
					v-for="col in relatives"
					:key="col.id"
				>
					<div class="table-card-cell">
						<label for="">Name</label>
						<div>
							{{ col.name }}
						</div>
					</div>
					<div class="table-card-cell">
						<label for="">Contact No.</label>
						<div>
							{{ col.contact_no }}
						</div>
					</div>
					<div class="table-card-cell">
						<label for="">Relationship </label>
						<div>
							{{ col.relationship }}
						</div>
					</div>
					<div
						class="table-card-cell-action d-flex align-items-center justify-content-end"
					>
						<button
							class="btn btn-default btn-sm mr-2"
							type="button"
							data-toggle="modal"
							data-target="#employee-relative-modal"
							data-backdrop="static"
							data-keyboard="false"
							@click="$emit('forEditRelative', col)"
						>
							<i class="far fa-edit text-secondary"></i>
						</button>
						<button
							class="btn btn-default btn-sm"
							type="button"
							@click="$emit('deleteRelative', col.id)"
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
	name: "EmployeeRelativeTable",
	props: ["relatives"],
};
</script>

<style></style>

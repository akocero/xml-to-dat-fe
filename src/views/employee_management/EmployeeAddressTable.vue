<template>
	<div class="row">
		<div class="col-12">
			<ul class="table-card ">
				<li
					class="table-card-item "
					v-for="col in addresses"
					:key="col.id"
				>
					<div class="table-card-cell">
						<label for="">Address Type</label>
						<div class="text-capitalize">
							{{ col.type }}
						</div>
					</div>

					<div class="table-card-cell">
						<label for="">City </label>
						<div>
							{{ col.city }}
						</div>
					</div>
					<div class="table-card-cell">
						<label for="">Country </label>
						<div>
							{{ col.country }}
						</div>
					</div>
					<div
						class="table-card-cell-action d-flex align-items-center justify-content-end"
					>
						<button
							class="btn btn-default btn-sm mr-2"
							type="button"
							data-toggle="modal"
							data-target="#employee-address-modal"
							data-backdrop="static"
							data-keyboard="false"
							@click="$emit('forEditAddress', col)"
						>
							<i class="far fa-edit text-secondary"></i>
						</button>
						<button
							class="btn btn-default btn-sm"
							type="button"
							@click="$emit('deleteAddress', col.id)"
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
	name: "EmployeeAddressTable",
	props: ["addresses"],
};
</script>

<style></style>

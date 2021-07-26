<template>
	<div class="row px-2 d-flex justify-content-between align-items-center">
		<h5 class="m-0 pb-0">Employee Class List</h5>
		<button
			class="btn btn-sm btn-custom-primary"
			@click="handleShowModal(0)"
		>
			New Employee Class
		</button>
	</div>
	<hr />
	<div class="row">
		<div class="col-12">
			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr class="text-secondary">
							<th class="pl-4">Code</th>
							<th>Description</th>
							<th width="35%">Classes</th>
							<th>Tax as</th>
							<th width="10%">Actions</th>
						</tr>
					</thead>
					<tbody v-if="employeeClassData?.data?.length">
						<tr
							v-for="item in employeeClassData?.data"
							:key="item.id"
						>
							<td class="pl-4">{{ item.value }}</td>
							<td>{{ item.description }}</td>
							<td>
								<span
									class="custom-badge custom-badge-info"
									v-for="item in item.classes"
									:key="item"
								>
									{{ item.replace(/_/g, " ") }}
								</span>
							</td>
							<td>{{ item.tax_as }}</td>
							<td>
								<button
									class="btn btn-sm btn-light"
									@click="handleShowModal(item.id)"
								>
									<i class="far fa-edit text-secondary"></i>
								</button>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="10" class="text-center">
								No data found!
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import Spinner from "@/components/Spinner";
export default {
	name: "TableCostCenter",
	components: {
		Spinner,
	},
	props: ["employeeClassData"],
	emits: ["showEmployeeClassModal"],
	setup(props, { emit }) {
		const handleShowModal = (id) => {
			emit("showEmployeeClassModal", id);
		};

		return { handleShowModal };
	},
};
</script>

<style></style>

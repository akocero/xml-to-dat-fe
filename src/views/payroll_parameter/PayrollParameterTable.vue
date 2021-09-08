<template>
	<table class="table table-bordered" v-if="table.length">
		<thead>
			<tr>
				<th>Range in Minutes</th>
				<th>Value in Minutes</th>
				<th width="6%">Action</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in table" :key="item.id">
				<td>
					<input
						type="number"
						class="table_input"
						v-model="item.range"
					/>
				</td>
				<td>
					<input
						type="number"
						class="table_input"
						v-model="item.value"
					/>
				</td>
				<td>
					<button
						type="button"
						class="btn btn-sm btn-secondary"
						@click="
							$emit('handleDeleteInTable', {
								type: type,
								id: item.id,
							})
						"
					>
						<i v-html="iTrash"></i>
					</button>
				</td>
			</tr>
			<tr>
				<td colspan="100" class="text-center">
					<button
						type="button"
						class="btn btn-success"
						@click="$emit('handleAddInTable', type)"
					>
						Add New
					</button>
				</td>
			</tr>
		</tbody>
	</table>

	<button
		v-else
		type="button"
		class="btn btn-success"
		@click="$emit('handleAddInTable', type)"
	>
		Add New
	</button>
</template>

<script>
import feather from "feather-icons";
export default {
	props: ["table", "type"],
	emits: ["handleAddInTable", "handleDeleteInTable"],
	computed: {
		iTrash: function() {
			return feather.icons["trash"].toSvg({
				width: 16,
			});
		},
	},
};
</script>

<style></style>

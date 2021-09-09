<template>
	<table class="table table-bordered">
		<thead>
			<tr>
				<th>Range in Minutes</th>
				<th>Value in Minutes</th>
				<th width="6%">Action</th>
			</tr>
		</thead>
		<tbody v-if="table.length">
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
				<td colspan="100">
					<button
						type="button"
						class="btn btn-primary"
						@click="$emit('handleAddInTable', type)"
					>
						<i v-html="iPlus"></i>
					</button>
				</td>
			</tr>
		</tbody>
		<tbody v-if="!table.length">
			<tr>
				<td colspan="100">
					<button
						type="button"
						class="btn btn-primary"
						@click="$emit('handleAddInTable', type)"
					>
						<i v-html="iPlus"></i>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
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
		iPlus: function() {
			return feather.icons["plus"].toSvg({
				width: 16,
			});
		},
	},
};
</script>

<style></style>

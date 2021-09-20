<template>
	<div class="col-md-10">
		<div class="row align-items-center justify-content-between mx-1 mb-1">
			<label for=""
				>Overtime Equivalent Percentage
				<span class="text-primary"
					>(Tip: hover the table header to see the full meaning)</span
				></label
			>
			<button
				class="btn btn-sm btn-secondary"
				v-if="!editMode"
				@click="editMode = !editMode"
			>
				<i v-html="iEdit"></i>
			</button>
			<button
				v-else
				class="btn btn-sm btn-success"
				@click="editMode = !editMode"
			>
				<i v-html="iSave"></i>
			</button>
		</div>
		<table class="table table-bordered">
			<thead>
				<tr>
					<th width="20%">Day Status</th>
					<th
						width="14%"
						data-toggle="tooltip"
						data-placement="top"
						title="Night Differential Percentage"
					>
						ND %
					</th>
					<th
						width="14%"
						data-toggle="tooltip"
						data-placement="top"
						title="Over Time Percentage"
					>
						OT %
					</th>
					<th
						width="14%"
						data-toggle="tooltip"
						data-placement="top"
						title="Night Differential Overtime Percentage"
					>
						NDOT %
					</th>
					<th
						width="14%"
						data-toggle="tooltip"
						data-placement="top"
						title="Excess Percentage"
					>
						EX %
					</th>
					<th
						width="14%"
						data-toggle="tooltip"
						data-placement="top"
						title="Night Differential Excess Percentage"
					>
						NDEX %
					</th>
				</tr>
			</thead>
			<tbody v-if="table.length">
				<tr v-for="item in table" :key="item.id">
					<td>
						{{ item.dayStatus }}
					</td>
					<td>
						<input
							type="number"
							min="0"
							v-if="editMode"
							step=".000001"
							class="table_input"
							v-model="item.nightDiff"
						/>
						<span v-else>{{ item.nightDiff }}</span>
					</td>
					<td>
						<input
							type="number"
							min="0"
							v-if="editMode"
							step=".000001"
							class="table_input"
							v-model="item.overtime"
						/>
						<span v-else>{{ item.overtime }}</span>
					</td>
					<td>
						<input
							type="number"
							min="0"
							v-if="editMode"
							step=".000001"
							class="table_input"
							v-model="item.nightDiff2"
						/>
						<span v-else>{{ item.nightDiff2 }}</span>
					</td>
					<td>
						<input
							type="number"
							min="0"
							v-if="editMode"
							step=".000001"
							class="table_input"
							v-model="item.excess"
						/>
						<span v-else>{{ item.excess }}</span>
					</td>
					<td>
						<input
							type="number"
							min="0"
							v-if="editMode"
							step=".000001"
							class="table_input"
							v-model="item.nightDiffExcess"
						/>
						<span v-else>{{ item.nightDiffExcess }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="col-md-2">
		<div class="mb-2">
			<label for="">Overtime Max Limit</label>
		</div>
		<table class="table table-bordered">
			<thead>
				<tr>
					<th
						data-toggle="tooltip"
						data-placement="top"
						title="Max Overtime Number (Ex. 8.5)"
					>
						Max OT
					</th>
					<th width="4%">Enabled</th>
				</tr>
			</thead>
			<tbody v-if="table.length">
				<tr v-for="item in table" :key="item.id">
					<td v-if="item.maxOTNumberEnabled">
						<input
							type="number"
							min="0"
							step=".000001"
							class="table_input"
							v-model="item.maxOTNumber"
						/>
					</td>
					<td v-if="!item.maxOTNumberEnabled">
						{{ item.maxOTNumber }}
					</td>
					<td class="text-center">
						<input
							type="checkbox"
							v-model="item.maxOTNumberEnabled"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import $ from "jquery";
import feather from "feather-icons";
import { ref } from "@vue/reactivity";
export default {
	name: "PayrollParameterOTTable",
	props: ["table", "type"],
	emits: ["handleAddInTable", "handleDeleteInTable"],
	computed: {
		iSave: function() {
			return feather.icons["save"].toSvg({
				width: 16,
			});
		},
		iEdit: function() {
			return feather.icons["edit"].toSvg({
				width: 16,
			});
		},
	},
	setup() {
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

		const editMode = ref(false);
		return { editMode };
	},
};
</script>

<style></style>

<template>
	<div class="row px-2 d-flex justify-content-between align-items-center">
		<h5 class="m-0 pb-0">{{ title }} List</h5>
		<button
			class="btn btn-sm btn-custom-primary"
			@click="handleShowModal(0)"
		>
			New {{ title }}
		</button>
	</div>
	<hr />
	<div class="row" v-if="data">
		<div class="col-12">
			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr class="text-secondary">
							<th class="pl-4">Code</th>
							<th>Description</th>
							<th width="10%">Actions</th>
						</tr>
					</thead>
					<tbody v-if="filteredData.length">
						<tr v-for="item in filteredData" :key="item.id">
							<td class="pl-4">{{ item.value }}</td>
							<td>{{ item.description }}</td>
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
	<div v-else>
		<Spinner />
	</div>
</template>

<script>
import Spinner from "@/components/Spinner";
import { computed } from "vue";
export default {
	name: "Table",
	props: ["data", "title", "type", "placeholder"],
	components: {
		Spinner,
	},
	emits: ["openModal"],
	setup(props, { emit }) {
		const handleShowModal = (id) => {
			const data = {
				type: props.type,
				title: props.title,
				id: id,
				placeholder: props.placeholder,
			};

			emit("openModal", data);
		};

		const filteredData = computed(() =>
			props.data.filter((item) => item.type === props.type)
		);
		return { handleShowModal, filteredData };
	},
};
</script>

<style></style>

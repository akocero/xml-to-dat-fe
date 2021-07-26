<template>
	<div class="row w-100 mb-2 px-3 mt-4 d-flex" v-if="dependents.length">
		<div class="w-50">
			<label>
				Full Name
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
		<div class="w-22">
			<label>
				Birthdate
			</label>
		</div>
		<div class="w-10">
			<label>
				Included
			</label>
		</div>
		<div class="w-10">
			<label>
				Active
			</label>
		</div>
	</div>
	<!-- <div class="w-4">
			<label for="">Action</label>
		</div> -->

	<div
		class="row w-100 mb-2 px-3 d-flex"
		v-for="(dependent, index) in dependents"
		:key="index"
	>
		<div class="w-50">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. John Doe"
				v-model="dependent.full_name"
			/>
		</div>
		<div class="w-22">
			<input
				type="date"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="dependent.birthdate"
			/>
		</div>
		<div class="w-10">
			<select class="form-control" v-model="dependent.include">
				<option value="no">No</option>
				<option value="yes">Yes</option>
			</select>
		</div>
		<div class="w-10">
			<select class="form-control" v-model="dependent.active">
				<option value="inactive">Inactive</option>
				<option value="active">Active</option>
			</select>
		</div>
		<div class="w-3">
			<button
				type="button"
				class="btn btn-secondary btn-trash"
				@click="handleDeleteDependent(dependent.id)"
			>
				<i v-html="iDelete"></i>
			</button>
		</div>
	</div>
</template>

<script>
import feather from "feather-icons";
export default {
	components: {},
	computed: {
		iDelete: function() {
			return feather.icons["trash"].toSvg({
				width: 18,
			});
		},
		alertTriangle: function() {
			return feather.icons["alert-circle"].toSvg({
				width: 18,
			});
		},
	},
	emits: ["deleteDependent"],
	setup(props, { emit }) {
		const handleDeleteDependent = (id) => {
			emit("deleteDependent", id);
		};

		return { handleDeleteDependent };
	},
	props: ["dependents"],
};
</script>

<style lang="scss" scoped>
.w-22 {
	width: 22%;
	margin-right: 8px;
}

label {
	margin-bottom: 0;
}

.w-3 {
	width: 3%;
	margin-right: 8px;
}

.w-10 {
	width: 10%;
	margin-right: 8px;
}

.w-50 {
	width: 50.5%;
	margin-right: 8px;
}

.row {
	width: 100% !important;
}
</style>

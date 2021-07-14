<template>
	<div class="row w-100 mb-2 px-3 mt-4 d-flex" v-if="relatives.length">
		<div class="w-15">
			<label>
				Relationship
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
		<div class="w-15">
			<label>
				Name
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
		<div class="w-35">
			<label>
				Address
			</label>
		</div>
		<div class="w-15">
			<label>
				Occupation
			</label>
		</div>
		<div class="w-15">
			<label>
				Contact No.
			</label>
		</div>
	</div>
	<!-- <div class="w-4">
			<label for="">Action</label>
		</div> -->

	<div
		class="row w-100 mb-2 px-3 d-flex"
		v-for="(relative, index) in relatives"
		:key="index"
	>
		<div class="w-15">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="relative.relationship"
			/>
		</div>
		<div class="w-15">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="relative.name"
			/>
		</div>
		<div class="w-35">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="relative.address"
			/>
		</div>
		<div class="w-15">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="relative.occupation"
			/>
		</div>
		<div class="w-15">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="relative.contact_no"
			/>
		</div>
		<div class="w-5">
			<button
				type="button"
				class="btn btn-secondary btn-trash"
				@click="handleDeleteRelative(relative.id)"
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
	emits: ["deleteRelative"],
	setup(props, { emit }) {
		const handleDeleteRelative = (id) => {
			emit("deleteRelative", id);
		};

		return { handleDeleteRelative };
	},
	props: ["relatives"],
};
</script>

<style lang="scss" scoped>
.w-15 {
	width: 15%;
	margin-right: 8px;
}

label {
	margin-bottom: 0;
}

.w-5 {
	width: 3%;
	margin-right: 8px;
}

.w-35 {
	width: 31.5%;
	margin-right: 8px;
}

.row {
	width: 100% !important;
}
</style>

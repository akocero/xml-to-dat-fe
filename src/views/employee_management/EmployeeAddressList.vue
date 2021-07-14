<template>
	<div class="row w-100 d-flex px-3 mt-4" v-if="addresses.length">
		<div class="w-12">
			<label>
				Building No.
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
		<div class="w-12">
			<label>
				Street No.
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
		<div class="w-12">
			<label>
				Barangay.
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
		<div class="w-12">
			<label>
				City
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
		<div class="w-8">
			<label>
				Region
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
		<div class="w-12">
			<label>
				Country
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
		<div class="w-8">
			<label>
				Zip Code
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
		<div class="w-8">
			<label>
				Geo Code
				<span class="text-danger text-bold">*</span>
			</label>
		</div>
	</div>
	<!-- <div class="w-4">
			<label for="">Action</label>
		</div> -->

	<div
		class="row w-100 mb-2 px-3 d-flex"
		v-for="(address, index) in addresses"
		:key="index"
	>
		<div class="w-12">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="address.bldg"
			/>
		</div>
		<div class="w-12">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="address.street"
			/>
		</div>
		<div class="w-12">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="address.brgy"
			/>
		</div>
		<div class="w-12">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="address.city"
			/>
		</div>
		<div class="w-8">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="address.region"
			/>
		</div>
		<div class="w-12">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="address.country"
			/>
		</div>
		<div class="w-8">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="address.zipcode"
			/>
		</div>
		<div class="w-8">
			<input
				type="text"
				class="form-control"
				id=""
				aria-describedby="emailHelp"
				placeholder="Ex. 1234567"
				v-model="address.geocode"
			/>
		</div>
		<div>
			<button
				type="button"
				class="btn btn-secondary btn-trash"
				@click="handleDeleteAddress(address.id)"
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
	emits: ["deleteAddress"],
	setup(props, { emit }) {
		const handleDeleteAddress = (id) => {
			emit("deleteAddress", id);
		};

		return { handleDeleteAddress };
	},
	props: ["addresses"],
};
</script>

<style lang="scss" scoped>
.w-4 {
	width: 3%;
}

.btn-trash {
	max-width: 44px;
}
.w-8 {
	width: 8%;
	margin-right: 8px;
}

.w-12 {
	width: 13%;
	margin-right: 8px;
}

.w-16 {
	width: 16%;
}
</style>

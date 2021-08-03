<template>
	<label
		>{{ label }}
		<span v-if="required" class="text-danger text-bold">*</span>
	</label>
	<input
		type="file"
		class="d-block mt-2"
		:id="id"
		@change="$emit('fileSelected', $event)"
	/>
	<small>The maximum file size allowed is 1000KB/1MB.</small>
	<small v-if="error && errorField" class="form-text text-danger">
		<span v-for="(err, index) in errorField" :key="index" class="d-block">
			{{ err }}</span
		>
	</small>
</template>

<script>
export default {
	name: "BaseInputFileField",
	props: {
		id: String,
		label: String,
		error: Object,
		required: Boolean,
		errorField: Object,
	},
	emits: ["fileSelected"],
};
</script>

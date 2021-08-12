<template>
	<label
		>{{ label }}
		<span v-if="required" class="text-danger text-bold">*</span>
	</label>
	<input
		:type="type"
		class="form-control"
		:class="[error && errorField && 'is-invalid']"
		:id="id"
		:placeholder="placeholder"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
	<!-- <small v-if="error && errorField" class="form-text text-danger">
		{{ errorField[0] }}
	</small> -->
	<small v-if="error && errorField" class="form-text text-danger">
		<span v-for="(err, index) in errorField" :key="index" class="d-block">
			{{ err }}</span
		>
	</small>
</template>

<script>
export default {
	name: "BaseInputField",
	props: {
		modelValue: [String, Number],
		id: String,
		label: String,
		error: Object,
		placeholder: String,
		required: Boolean,
		errorField: Object,
		type: {
			type: String,
			default: "text",
			validator: function(value) {
				// The value must match one of these strings
				return (
					["text", "date", "number", "email", "password"].indexOf(
						value
					) !== -1
				);
			},
		},
	},
};
</script>

<style></style>

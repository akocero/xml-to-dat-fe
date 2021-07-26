<template>
	<label
		>{{ label }}
		<span v-if="required" class="text-danger text-bold">*</span>
	</label>
	<input
		type="text"
		class="form-control"
		:class="[error && errorField && 'is-invalid']"
		:id="id"
		:placeholder="placeholder"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
	<small v-if="error && errorField" class="form-text text-danger">
		{{ errorField[0] }}
	</small>
</template>

<script>
export default {
	name: "BaseTextField",
	props: {
		modelValue: String,
		id: String,
		label: String,
		error: Object,
		placeholder: String,
		required: Boolean,
		errorField: Object,
	},
};
</script>

<style></style>

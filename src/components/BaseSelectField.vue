<template>
	<label
		>{{ label }}
		<span v-if="required" class="text-danger text-bold">*</span>
	</label>
	<select
		:id="id"
		class="form-control"
		:class="[error && error.errors.login_type && 'is-invalid']"
		:value="modelValue"
		@change="$emit('update:modelValue', $event.target.value)"
	>
		<option value="">Choose ...</option>
		<option
			:value="option.value"
			v-for="option in options"
			:key="option.value"
			>{{ option.label }}
		</option>
	</select>
	<small v-if="error && errorField" class="form-text text-danger">
		<span v-for="(err, index) in errorField" :key="index" class="d-block">
			{{ err }}
		</span>
	</small>
</template>

<script>
export default {
	name: "BaseSelectField",
	props: {
		modelValue: String,
		id: String,
		label: String,
		error: Object,
		required: Boolean,
		errorField: Object,
		options: Array,
	},
};
</script>

<style></style>

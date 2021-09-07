<template>
	<label
		>{{ label }}
		<span v-if="required" class="text-danger text-bold">*</span>
	</label>
	<select
		:id="id"
		class="custom-select"
		:class="[error && errorField && 'is-invalid']"
		:value="modelValue"
		@change="$emit('update:modelValue', $event.target.value)"
	>
		<option value="" v-if="emptyOption">Choose</option>
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
		modelValue: String | Number,
		emptyOption: {
			type: Boolean,
			default: true,
		},
		id: String,
		label: String,
		error: Object,
		required: Boolean,
		errorField: Object,
		options: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style></style>

<template>
	<label
		>{{ label }}
		<span v-if="required" class="text-danger text-bold">*</span>
	</label>
	<div class="input-group">
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
		<div class="input-group-append" v-if="buttonEditProperties">
			<button class="btn btn-default btn-flat" type="button">
				<i class="far fa-edit text-secondary"></i>
			</button>
		</div>
		<div class="input-group-append" v-if="buttonViewProperties">
			<button class="btn btn-default btn-flat" type="button">
				<i class="far fa-eye text-secondary"></i>
			</button>
		</div>
	</div>

	<small v-if="error && errorField" class="form-text text-danger">
		<span v-for="(err, index) in errorField" :key="index" class="d-block">
			{{ err }}
		</span>
	</small>
</template>

<script>
export default {
	name: "BaseSelectWithButtonField",
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
		buttonViewProperties: {
			type: Object,
			default: null,
		},
		buttonEditProperties: {
			type: Object,
			default: null,
		},
	},
};
</script>

<style></style>

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
	<!-- <input
		type="text"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	/> -->
</template>

<script>
export default {
	name: "BaseTextField",
	// props: ["error", "id", "value", "label", "placeholder", "required"],
	props: {
		modelValue: String,
		id: String,
		label: String,
		error: Object,
		placeholder: String,
		required: Boolean,
		errorField: Object,
	},
	// props: {
	// 	error: Object,
	// 	id: String,
	// 	model: String,
	// 	label: String,
	// 	placeholder: String,
	// 	required: Boolean,
	// },
	// emits: ["update:modelValue"],
	// methods: {
	// 	// handleInput(value) {
	// 	// 	this.$emit("input", value);
	// 	// },
	// 	changeModelValue(title) {
	// 		this.$emit("update:modelValue", title); // previously was `this.$emit('input', title)`
	// 	},
	// },
};
</script>

<style></style>

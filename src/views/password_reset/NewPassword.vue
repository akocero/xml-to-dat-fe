<template>
	<p>
		You are only one step away from logging in. Create your new password
		now.
	</p>

	<form @submit.prevent="handleSubmit">
		<div class="form-group">
			<BaseInputField
				id="input_password"
				label="New Password"
				v-model="password"
				:error="error"
				type="password"
				:errorField="error?.errors?.new_password || null"
				placeholder="Ex. "
				:required="true"
			/>
		</div>
		<div class="form-group">
			<BaseInputField
				id="input_confirm_password"
				label="Confirm Password"
				v-model="confirm_password"
				:error="error"
				type="password"
				:errorField="error?.errors?.confirm_password || null"
				placeholder="Ex. "
				:required="true"
			/>
		</div>
		<div class="row">
			<div class="col-12">
				<button type="submit" class="btn btn-custom-primary btn-block">
					Save
				</button>
			</div>
			<!-- /.col -->
		</div>
	</form>

	<p class="mt-3 mb-1">
		<a href="login.html">Login</a>
	</p>
</template>

<script>
import { ref } from "@vue/reactivity";
import BaseInputField from "@/components/BaseInputField";
export default {
	name: "NewPassword",
	emits: ["sendNewPassword"],
	props: ["error"],
	components: {
		BaseInputField,
	},
	setup(props, { emit }) {
		const password = ref("");
		const confirm_password = ref("");
		const handleSubmit = async () => {
			// console.log(password.value);
			// console.log(confirm_password.value);

			emit("sendNewPassword", {
				new_password: password.value,
				confirm_password: confirm_password.value,
			});
		};
		return {
			handleSubmit,
			password,
			confirm_password,
		};
	},
};
</script>

<style>
.password-reset {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

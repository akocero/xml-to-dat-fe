<template>
	<p>
		Provide an email address to receive your One-Time PIN (OTP)
	</p>

	<form @submit.prevent="handleSubmit">
		<div class="form-group">
			<BaseInputField
				id="input_email"
				label="Email"
				type="email"
				v-model="email"
				:error="error"
				:errorField="error?.errors?.login_id || null"
				placeholder="Ex. johndoe@example.com"
				:required="true"
			/>
		</div>
		<div class="row">
			<div class="col-12">
				<button type="submit" class="btn btn-custom-primary btn-block">
					Request OTP
				</button>
			</div>
			<!-- /.col -->
		</div>
	</form>

	<p class="mt-3 mb-1">
		<router-link role="button" :to="{ name: 'auth' }"
			>Back to Login</router-link
		>
	</p>
</template>

<script>
import { ref } from "@vue/reactivity";
import BaseInputField from "@/components/BaseInputField";
export default {
	name: "EnterEmail",
	emits: ["sendEmail"],
	props: ["error"],
	components: {
		BaseInputField,
	},
	setup(props, { emit }) {
		const email = ref("");
		const handleSubmit = async () => {
			// console.log(email.value);
			emit("sendEmail", email.value);
		};
		return {
			handleSubmit,
			email,
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

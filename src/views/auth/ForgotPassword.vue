<template>
	<div
		class="forgot-password-container w-75"
		v-if="!validatedEmail && !validatedOTP"
	>
		<h3 class="h3">Forgot Password</h3>
		<hr />
		<p class="">
			Provide an email address to receive your One-Time Password (OTP)
		</p>
		<form action="" class="pt-3" @submit.prevent="handleSubmit">
			<div class="form-group">
				<label for="">Email address</label>
				<div>
					<input
						type="email"
						class="form-control"
						id=""
						placeholder="Enter email"
					/>
				</div>

				<small id="" class="form-text text-danger"> </small>
			</div>
			<button type="submit" class="btn btn-custom-primary">Send</button>
			<button type="button" class="btn btn-link" @click="handleCancel">
				Cancel
			</button>
		</form>
	</div>
	<EnterOTP
		v-if="validatedEmail && !validatedOTP"
		@validatedOTP="validatedOTP = true"
	/>
	<ChangePassword v-if="validatedOTP" />
</template>

<script>
import { ref } from "vue";
import EnterOTP from "./EnterOTP";
import ChangePassword from "./ChangePassword.vue";
export default {
	name: "ForgotPassword",
	components: {
		EnterOTP,
		ChangePassword,
	},
	emits: ["cancelForgotPassword"],
	setup(props, { emit }) {
		const validatedEmail = ref(null);
		const validatedOTP = ref(null);

		const handleSubmit = () => {
			validatedEmail.value = true;
			console.log("email submitted");
		};

		const handleCancel = () => {
			console.log("canceled");
			emit("cancelForgotPassword");
		};

		return { handleCancel, handleSubmit, validatedEmail, validatedOTP };
	},
};
</script>

<style scoped>
.forgot-password-container h3 {
	margin-top: -4rem;
}
</style>

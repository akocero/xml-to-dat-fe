<template>
	<div class="forgot-password-container w-75" v-if="!validatedEmail">
		<h3 class="h3">Forgot Password</h3>
		<hr />
		<p class="">Enter email and we will send you OTP</p>
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
	<EnterOTP v-else />
</template>

<script>
import { ref } from "vue";
import EnterOTP from "./EnterOTP";
export default {
	name: "ForgotPassword",
	components: {
		EnterOTP,
	},
	setup(context, { emit }) {
		const validatedEmail = ref(null);

		const handleSubmit = () => {
			validatedEmail.value = true;
		};

		const handleCancel = () => {
			console.log("canceled");
			emit("cancelForgotPassword");
		};

		return { handleCancel, handleSubmit, validatedEmail };
	},
};
</script>

<style scoped>
.forgot-password-container h3 {
	margin-top: -4rem;
}
</style>

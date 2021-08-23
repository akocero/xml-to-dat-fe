<template>
	<p>
		Please enter your OTP for verification.
	</p>

	<form @submit.prevent="handleSubmit">
		<div class="form-group">
			<BaseInputField
				id="input_otp"
				label="OTP"
				v-model="otp"
				:error="error"
				:errorField="error?.errors?.otp || null"
				placeholder="Ex. 123456"
				:required="true"
			/>
		</div>
		<div class="row">
			<div class="col-12">
				<button type="submit" class="btn btn-custom-primary btn-block">
					Submit OTP
				</button>
			</div>
			<!-- /.col -->
		</div>
	</form>
	<p class="mt-3 mb-1 d-flex justify-content-between">
		<a href="login.html">Login</a>
		<a role="button" @click="handleClickResend">Resend OTP</a>
	</p>
</template>

<script>
import { ref } from "@vue/reactivity";
import BaseInputField from "@/components/BaseInputField";
export default {
	name: "EnterOTP",
	emits: ["sendOTP", "resendOTP"],
	components: {
		BaseInputField,
	},
	props: ["error"],
	setup(props, { emit }) {
		const otp = ref("");
		const handleSubmit = () => {
			emit("sendOTP", otp.value);
		};

		const handleClickResend = () => {
			emit("resendOTP");
		};
		return {
			handleSubmit,
			otp,
			handleClickResend,
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

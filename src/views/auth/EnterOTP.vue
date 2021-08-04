<template>
	<div class="forgot-password-container w-75">
		<h3 class="h3">Enter OTP</h3>
		<hr />
		<p class="">Please enter your OTP for verification.</p>
		<form action="" class="pt-3" @submit.prevent="handleSubmit">
			<div class="form-group">
				<div class="d-flex justify-content-between align-items-center">
					<label for="">Enter OTP</label>
				</div>

				<div class="row">
					<input
						type="text"
						class="form-control col-8"
						id=""
						placeholder="Enter OTP"
					/>
					<button
						type="button"
						class="btn btn-link col-4"
						@click="resendOTP"
					>
						Resend OTP
					</button>
				</div>

				<small id="" class="form-text text-danger"> </small>
			</div>
			<button type="submit" class="btn btn-custom-primary">Submit</button>
			<a type="button" href="" class="btn btn-link">
				Cancel
			</a>
		</form>
	</div>
</template>

<script>
export default {
	name: "Enter OTP",
	emits: ["validatedOTP", "cancelForgotPassword"],
	setup(props, { emit }) {
		const resendOTP = () => {
			console.log("canceled");
			emit("cancelForgotPassword");
		};

		const handleSubmit = () => {
			emit("validatedOTP");
			console.log("OTP Submitted");
		};

		return { resendOTP, handleSubmit };
	},
};
</script>

<style scoped>
.forgot-password-container h3 {
	margin-top: -4rem;
}
</style>

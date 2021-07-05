<template>
	<div class="forgot-password-container w-75">
		<h3 class="h3">Enter OTP</h3>
		<hr />
		<p class="">Please enter OTP (One Time Password)</p>
		<form action="" class="pt-3">
			<div class="form-group">
				<div class="d-flex justify-content-between align-items-center">
					<label for="">Enter OTP</label
					><button
						type="button"
						class="btn btn-link"
						@click="resendOTP"
					>
						Resend OTP
					</button>
				</div>

				<div>
					<input
						type="text"
						class="form-control"
						id=""
						placeholder="Enter OTP"
					/>
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
	setup(context, { emit }) {
		const resendOTP = () => {
			console.log("canceled");
			emit("cancelForgotPassword");
		};

		return { resendOTP };
	},
};
</script>

<style scoped>
.forgot-password-container h3 {
	margin-top: -4rem;
}
</style>

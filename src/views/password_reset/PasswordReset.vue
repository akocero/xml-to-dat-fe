<template>
	<div class="password-reset">
		<div class="login-box">
			<div class="login-logo">
				<img
					src="@/assets/images/Payroll-Pro-Logo-white.png"
					alt=""
					class="pec-logo"
				/>
			</div>
			<!-- /.login-logo -->
			<div class="card">
				<div class="card-body login-card-body">
					<Alert
						v-if="alert"
						:status="alert.status"
						:message="alert.message"
						@closeModal="alert = false"
					/>
					<Spinner v-if="loading" />
					<EnterEmail
						v-if="!emailValidated && !otpValidated && !loading"
						@sendEmail="handleSendEmail($event)"
						:error="error"
					/>
					<EnterOTP
						:error="error"
						v-if="emailValidated && !otpValidated && !loading"
						@sendOTP="handleSendOTP($event)"
						@resendOTP="handleResendOTP"
					/>
					<NewPassword
						:error="error"
						v-if="otpValidated && emailValidated && !loading"
						@sendNewPassword="handleSendNewPassword($event)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NewPassword from "./NewPassword";
import EnterOTP from "./EnterOTP";
import EnterEmail from "./EnterEmail.vue";
import { ref } from "@vue/reactivity";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import useAlert from "@/composables/useAlert";
import useData from "@/composables/useData";
import { useRouter } from "vue-router";

export default {
	name: "PasswordReset",
	components: {
		NewPassword,
		EnterOTP,
		EnterEmail,
		Alert,
		Spinner,
		Spinner,
	},
	setup() {
		const { alert, displayAlert } = useAlert();
		const emailValidated = ref(false);
		const otpValidated = ref(false);
		const user_id = ref(null);
		const user_email = ref(null);
		const loading = ref(false);
		const { error, create, update } = useData();
		const router = useRouter();

		const handleSendEmail = async (event) => {
			loading.value = true;
			const res = await create("/forgot/send_validated_email", {
				login_id: event,
			});
			if (res && !error.value) {
				user_email.value = res.login_id;
				console.log(res);
				displayAlert("success", "OTP Sent - Please check your email.");
				emailValidated.value = true;
			} else {
				console.log(error.value);
				displayAlert(
					"error",
					"Failed sending OTP please check your email."
				);
			}
			loading.value = false;
		};

		const handleResendOTP = async () => {
			loading.value = true;
			const res = await create("/forgot/send_validated_email", {
				login_id: user_email.value,
			});
			if (res && !error.value) {
				displayAlert("success", "OTP Sent - Please check your email.");
			} else {
				console.log(error.value);
				displayAlert(
					"error",
					"Failed sending OTP please check your email."
				);
			}
			loading.value = false;
		};

		const handleSendOTP = async (event) => {
			if (user_email.value) {
				loading.value = true;
				const data = {
					login_id: user_email.value,
					otp: event,
				};
				const res = await create("/forgot/validate_otp", data);

				if (res && !error.value) {
					user_id.value = res.id;
					otpValidated.value = true;
					displayAlert(
						"success",
						"OTP Verified - Please change your password."
					);
				} else {
					displayAlert("error", "Invalid OTP");
				}
				loading.value = false;
			}
		};

		const handleSendNewPassword = async (event) => {
			if (user_id.value) {
				loading.value = true;
				const res = await update(
					"/forgot/update_new_password/" + user_id.value,
					event
				);

				if (res && !error.value) {
					displayAlert(
						"success",
						"Password successfully changed - Redirecting"
					);
					setTimeout(() => {
						router.push({ name: "auth" });
					}, 3000);
				} else {
					displayAlert("error", "Failed changing password");
				}
				loading.value = false;
			}
		};

		return {
			emailValidated,
			otpValidated,
			handleSendEmail,
			handleSendOTP,
			handleSendNewPassword,
			handleResendOTP,
			alert,
			loading,
			error,
		};
	},
};
</script>

<style>
.login-box {
	position: relative;
	z-index: 1000;
}

.login-logo img {
	width: 100%;
}
.password-reset {
	background-image: url("../../assets/images/Corporate.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.password-reset::after {
	content: "";
	position: absolute;
	left: 0;
	top: 0;
	height: 100vh;
	width: 100%;
	/* background-color: rgba(49, 20, 177, 0.767); */
	background-image: linear-gradient(
		to right,
		rgba(2, 9, 27, 0.959),
		rgba(14, 80, 151, 0.922)
	);
}
</style>

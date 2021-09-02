<template>
	<div class="row auth-container">
		<div class="col-8 bg-navy-blue auth-right">
			<div class="content pt-5">
				<img
					src="@/assets/images/Payroll-Pro-Logo-white.png"
					alt=""
					class="pec-logo"
				/>
				<p class="mssc">By Mustard Seed Systems Corporation</p>
				<h4 class="h6 pb-2">Version 1.0.1</h4>
				<!-- <p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Modi nostrum, exercitationem necessitatibus veniam ratione
					deleniti expedita ipsum ducimus.
				</p> -->
				<!-- <h5 class="h6 mt-auto">Version 1.0.1</h5> -->
			</div>
		</div>
		<div class="col-4 d-flex justify-content-center align-items-center">
			<form
				class="w-75 auth-form"
				@submit.prevent="handleSubmit"
				v-if="!user"
			>
				<h3 class="h3">Sign In</h3>
				<hr />
				<p>
					Welcome! Use your company email to sign in to your account.
				</p>

				<transition name="alert">
					<Alert
						v-if="error"
						:status="'error'"
						:message="'Username or password is incorrect'"
						@closeModal="handleCloseModal"
					/>
				</transition>
				<div class="form-group pt-2">
					<label for="">Email address</label>
					<div style="position: relative;">
						<input
							type="email"
							class="form-control"
							id=""
							placeholder="Enter email"
							v-model="login_id"
							:class="[
								error && error.errors?.login_id && 'is-invalid',
							]"
						/>
						<i v-html="mailIcon" class="input-icon"></i>
					</div>

					<small
						v-if="error && error.errors?.login_id"
						id=""
						class="form-text text-danger"
					>
						{{ error.errors.login_id[0] }}
					</small>
				</div>
				<div class="form-group">
					<label for="">Password</label>
					<div style="position: relative;">
						<input
							type="password"
							class="form-control"
							id="password"
							placeholder="Password"
							v-model="password"
							:class="[
								error && error.errors?.password && 'is-invalid',
							]"
						/>
						<i
							v-html="eye"
							class="input-icon"
							@click="handleShowPassword"
							v-if="showPassword"
						></i>
						<i
							v-html="eyeOff"
							class="input-icon"
							@click="handleShowPassword"
							v-else
						></i>
					</div>
					<small
						v-if="error && error.errors?.password"
						id=""
						class="form-text text-danger"
					>
						{{ error.errors.password[0] }}
					</small>
				</div>
				<div class="mb-4 text-right">
					<router-link :to="{ name: 'password-reset' }"
						>Forgot Password?</router-link
					>
				</div>
				<div class="">
					<button
						type="submit"
						class="btn btn-custom-primary"
						v-if="!isPending"
					>
						Sign In
					</button>
					<button
						type="submit"
						class="btn btn-custom-primary"
						v-if="isPending"
						disabled
					>
						Loading ...
					</button>
				</div>
			</form>
			<SelectCompany v-if="user" :user="user?.id" />
		</div>
	</div>
</template>

<script>
import { ref, computed } from "vue";
import useLogin from "@/composables/useLogin";
import Alert from "@/components/Alert";
import SelectCompany from "./SelectCompany";
import { useStore } from "vuex";
import feather from "feather-icons";

export default {
	name: "Auth",

	components: {
		Alert,
		SelectCompany,
	},
	computed: {
		mailIcon: function() {
			return feather.icons["mail"].toSvg({
				width: 18,
			});
		},
		eye: function() {
			return feather.icons["eye"].toSvg({
				width: 19,
			});
		},
		eyeOff: function() {
			return feather.icons["eye-off"].toSvg({
				width: 19,
			});
		},
	},
	setup() {
		const login_id = ref("");
		const password = ref("");
		const showPassword = ref(false);
		const store = useStore();
		const { response, error, login, isPending } = useLogin();
		const user = computed(() => store.getters.getUser);

		const handleSubmit = async () => {
			error.value = null;

			const data = {
				login_id: login_id.value.toLowerCase(),
				password: password.value,
			};

			await login("payrolluser/auth", data);
			if (error.value) {
				console.log(error.value);
			} else {
				// user.value = response.value
				// console.log(response.value.login_id)
				store.commit("setUser", response.value.user);
				store.commit("setToken", response.value.token);
				//   router.push({path: '/app/dashboard'} )
				// window.location = "http://localhost:8080/app/dashboard";
			}
		};

		const handleShowPassword = (e) => {
			// console.log(e.target)
			var x = document.getElementById("password");
			if (x.type === "password") {
				showPassword.value = true;
				x.type = "text";
			} else {
				showPassword.value = false;
				x.type = "password";
			}
		};

		const handleCloseModal = () => {
			error.value = null;
			response.value = null;
		};

		return {
			handleSubmit,
			login_id,
			password,
			isPending,
			response,
			error,
			handleCloseModal,
			user,
			showPassword,
			handleShowPassword,
		};
	},
};
</script>

<style scoped>
.input-icon {
	position: absolute;
	top: 5px;
	right: 0.6rem;
	color: rgb(175, 175, 175);
	cursor: pointer;
}
.input-icon:hover {
	color: rgb(87, 87, 87);
}
.auth-right {
	/* background-color: #04164767; */
	background-image: url("../../assets/images/Corporate.jpg");
	background-size: cover;
	background-repeat: no-repeat;
}

.auth-right p {
	z-index: 1000;
	color: white;
}

.auth-right::after {
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

.auth-right .content {
	position: relative;
	/* height: calc(100% - 5rem); */
	z-index: 100;
	/* margin-top: 5rem; */
	/* margin-left: 2rem; */
	/* color: white; */
	/* text-align: center; */
}

.auth-right .content .mssc {
	margin-top: -28px;
	padding-bottom: 3rem;
}
.auth-right .content .pec-logo {
	margin-top: 10rem;
	margin-left: 8rem;
	width: 40%;
	margin-bottom: 2rem;
}

.auth-right .content p,
.auth-right .content h5,
.auth-right .content h4 {
	color: white;
	width: 70%;
	margin: 0 auto;
	/* margin-left: 10px; */
}

.auth-right .content h5 {
	padding-top: 3rem;
}
</style>

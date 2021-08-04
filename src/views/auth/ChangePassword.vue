<template>
	<div class="forgot-password-container w-75">
		<h3 class="h3">Change Password</h3>
		<hr />
		<p class="">Please enter your new password</p>
		<form action="" class="pt-3" @submit.prevent="handleSubmit">
			<div class="form-group">
				<label for="">Enter Password</label>
				<input type="text" class="form-control" id="" />
				<small id="" class="form-text text-danger"> </small>
			</div>
			<div class="form-group">
				<label for="">Confirm Password</label>
				<input type="text" class="form-control" id="" />
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
	name: "ChangePassword",
	setup() {
		const handleSubmit = () => {
			console.log("password submmited");
			window.location.reload();
		};

		return { handleSubmit };
	},
};
</script>

<style scoped>
.forgot-password-container h3 {
	margin-top: -4rem;
}
</style>

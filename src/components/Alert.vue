<template>
	<div
		:class="'alert alert-' + alertType"
		class="alert-dismissible fade show"
		role="alert"
	>
		<strong
			>{{ status.charAt(0).toUpperCase() + status.slice(1) }}!
		</strong>
		{{ message }}
		<button
			type="button"
			class="close"
			data-dismiss="alert"
			aria-label="Close"
			@click="popAlert(id)"
		>
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
</template>

<script>
import { onBeforeUnmount, ref } from "vue";
import useAlert from "@/composables/useAlert";

export default {
	name: "Alert",
	props: ["message", "status", "id"],
	setup(props) {
		const { popAlert } = useAlert();

		const alertType = ref("");

		if (props.status === "error") {
			alertType.value = "danger";
		} else if (props.status === "success") {
			alertType.value = "success";
		} else if (props.status === "warning") {
			alertType.value = "warning";
		} else {
			alertType.value = "info";
		}

		let timeOut = null;

		timeOut = setTimeout(() => {
			popAlert(props.id);
		}, 5000);

		onBeforeUnmount(() => {
			clearTimeout(timeOut);
		});

		return { alertType, popAlert };
	},
};
</script>

<style>
/* .alert {
	min-width: 16rem !important;
	margin: 0 auto;
} */
</style>

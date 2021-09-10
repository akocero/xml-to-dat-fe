<template>
	<div
		:class="'alert alert-' + alertType"
		class="alert-dismissible fade show"
		role="alert"
	>
		<strong v-if="!customStatus" class="text-capitalize"
			>{{ status }}!
		</strong>
		<strong v-else class="text-capitalize">{{ customStatus }}! </strong>
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
	props: {
		status: {
			type: String,
		},
		message: {
			type: String,
		},
		id: {
			type: String,
		},
		customStatus: {
			type: String,
			default: null,
		},
	},
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
		}, 7000);

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

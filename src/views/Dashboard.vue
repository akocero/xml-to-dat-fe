<template>
	<div class="dashboard">
		<transition name="alert">
			<div
				class="alert alert-success alert-dismissible fade show"
				role="alert"
			>
				<strong>Welcome! you are logged in as </strong>
				{{ user.full_name }}
				<button
					type="button"
					class="close"
					data-dismiss="alert"
					aria-label="Close"
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		</transition>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import feather from "feather-icons";
export default {
	computed: {
		ishoppingCart: function() {
			return feather.icons["shopping-cart"].toSvg({
				width: 82,
				height: 82,
			});
		},
		iusers: function() {
			return feather.icons["users"].toSvg({
				width: 82,
				height: 82,
			});
		},
		ichart: function() {
			return feather.icons["pie-chart"].toSvg({
				width: 82,
				height: 82,
			});
		},
		icalendar: function() {
			return feather.icons["calendar"].toSvg({
				width: 82,
				height: 82,
			});
		},
	},
	setup() {
		const store = useStore();
		const user = computed(() => store.getters.getUser);
		return {
			// access a getter in computed function
			user,
		};
	},
};
</script>

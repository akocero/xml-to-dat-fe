<template>
	<div class="row mb-3">
		<div
			class="col-md-12 d-flex justify-content-between align-items-center"
		>
			<h4 class="h4 mb-0 text-primary">{{ heading }}</h4>
			<router-link
				role="button"
				class="btn btn-primary"
				:to="{ name: routeName }"
			>
				Back to list <i v-html="chevronRight"></i>
			</router-link>
		</div>
	</div>
</template>

<script>
import feather from "feather-icons";
export default {
	name: "ThePageHeader",
	props: {
		heading: String,
		routeName: String,
		mode: {
			type: String,
			required: true,
		},
	},
	computed: {
		chevronRight: function() {
			return feather.icons["chevron-right"].toSvg({
				width: 18,
			});
		},
	},
};
</script>

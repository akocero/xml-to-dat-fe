<template>
	<div class="row mb-3">
		<div
			class="col-md-12 d-flex justify-content-between align-items-center"
		>
			<h5 class="h4 mb-0 text-primary">{{ heading }}</h5>
			<a role="button" class="btn btn-primary" @click="handleClick">
				Cancel <i v-html="chevronRight"></i>
			</a>
		</div>
	</div>
</template>

<script>
import feather from "feather-icons";
import { useRouter } from "vue-router";
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
	emits: [""],
	setup(props) {
		const router = useRouter();
		const handleClick = () => {
			if (props.mode !== "view") {
				if (
					confirm(
						`Leave ${props.mode} mode? All unsaved changes will be lost.`
					)
				) {
					router.push({ name: props.routeName });
				}
			} else {
				router.push({ name: props.routeName });
			}
		};

		return { handleClick };
	},
};
</script>

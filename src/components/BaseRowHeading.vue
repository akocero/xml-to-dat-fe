<template>
	<h5 class="h5">{{ heading }}</h5>
	<p for="" class="text-justify pr-4 text-secondary">
		{{ para }}
	</p>
</template>

<script>
export default {
	name: "BaseRowHeading",
	props: {
		heading: {
			type: String,
			required: true,
		},
		para: {
			type: String,
			default:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolores illo facilis debitis veritatis reiciendis quaerat eveniet, harum nihil nesciunt.",
		},
	},
};
</script>

<style></style>

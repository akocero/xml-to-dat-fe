<template>
	<img v-if="image_path" :src="image_path" alt="" style="width: 90%" />
	<img
		v-else-if="database"
		:src="imageBaseURL + database"
		alt=""
		style="width: 90%"
	/>
	<img v-else src="@/assets/no-image.png" alt="" style="width: 90%" />
</template>

<script>
export default {
	name: "BaseImageField",
	data() {
		return {
			imageBaseURL: process.env.VUE_APP_BASE_URL_SERVER + "/storage/",
		};
	},
	props: {
		image_path: String,
		database: {
			type: String,
			default: null,
		},
	},
};
</script>

<style></style>

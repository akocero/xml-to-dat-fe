<template>
	<img v-if="image_path" :src="image_path" alt="" style="width: 90%" />
	<img
		v-else-if="database"
		:src="'http://127.0.0.1:8000/storage/' + database"
		alt=""
		style="width: 90%"
	/>
	<img v-else src="@/assets/no-image.png" alt="" style="width: 90%" />
</template>

<script>
export default {
	name: "BaseImageField",
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

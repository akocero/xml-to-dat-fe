<template>
	<!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
	<div class="wrapper">
		<AlertList :alerts="alerts" />
		<router-view />
	</div>
</template>

<script>
import AlertList from "@/components/AlertList.vue";
import useAlert from "@/composables/useAlert";
export default {
	components: {
		AlertList,
	},
	setup() {
		const { alerts } = useAlert();

		return { alerts };
	},
};
</script>

<style lang="scss">
@import "~admin-lte/plugins/fontawesome-free/css/all.min.css";
@import "~admin-lte/dist/css/adminlte.min.css";
@import "./sass/app.scss";
</style>

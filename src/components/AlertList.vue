<template>
	<div>
		<transition-group name="list" tag="div" class="alert-list" appear>
			<Alert
				v-for="alert in alerts"
				:key="alert.id"
				:status="alert.status"
				:message="alert.message"
				:id="alert.id"
			/>
		</transition-group>
	</div>
</template>

<script>
import Alert from "./Alert.vue";
export default {
	name: "AlertList",
	components: {
		Alert,
	},
	props: ["alerts"],
};
</script>

<style>
.alert-list {
	position: fixed;
	top: 1rem;
	right: 1rem;
	/* left: 50%; */
	width: 26%;
	/* transform: translateX(-50%); */
	z-index: 999999;
}
</style>

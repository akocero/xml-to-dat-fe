<template>
	<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
		<li
			class="nav-item"
			v-for="item in properties"
			:key="item.id"
			data-toggle="tooltip"
			data-placement="left"
			:title="item.tooltip"
		>
			<a
				class="nav-link"
				:class="{ active: item.active, disabled: item.disabled }"
				:id="'pills-' + item.id + '-tab'"
				data-toggle="pill"
				:href="'#pills-' + item.id"
				role="tab"
				:aria-controls="'pills-' + item.id"
				aria-selected="true"
				>{{ item.label }} {{ item.error ? "&nbsp; &nbsp;" : "" }}
				<i
					v-if="item.error"
					v-html="alertTriangle"
					class="icon-error"
					:class="[
						item.errorType === 'warning'
							? 'text-warning'
							: 'text-danger',
					]"
				></i>
			</a>
		</li>
	</ul>
</template>

<script>
import feather from "feather-icons";
export default {
	name: "BaseNavigationTab",
	props: {
		properties: Array,
	},
	computed: {
		alertTriangle: function() {
			return feather.icons["alert-circle"].toSvg({
				width: 18,
			});
		},
	},
};
</script>

<style></style>

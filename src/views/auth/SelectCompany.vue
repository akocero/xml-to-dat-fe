<template>
	<div class="select-company-container">
		<h3 class="h3">Select a Company</h3>
		<hr />
		<p class="">Select a company to proceed to dashboard</p>
		<ul v-if="data && !isPending" class="select-company pt-4">
			<li
				v-for="company in data"
				:key="company.id"
				class="select-company__item shadow-sm border"
			>
				<a
					href=""
					class="select-company__link"
					@click.prevent="handleClick(company)"
					>{{ company.code }}- {{ company.name }}</a
				>
			</li>
		</ul>
		<div v-else>
			<Spinner />
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
// import { router-link } from "vue-router"
import useFetch from "@/composables/useFetch";
import Spinner from "@/components/Spinner.vue";
import { useStore } from "vuex";
import endpoints from "@/utils/endpoints";

export default {
	name: "SelectCompany",
	props: ["user"],
	components: { Spinner },
	setup(props) {
		const { data, error, fetch, isPending } = useFetch();
		const store = useStore();

		fetch(endpoints.setupUserCompany + "/" + props.user);

		const handleClick = (item) => {
			store.commit("setCompany", item);
			window.location.reload();
			// console.log('click')
		};
		return { data, error, isPending, handleClick };
	},
};
</script>

<style scoped>
.select-company {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.select-company__item {
	/* padding: 1rem; */
	/* border: 1px solid black; */
	border-radius: 4px;
	margin-bottom: 0.5rem;
	transition: all 0.3s ease;
}

.select-company__link {
	color: rgb(88, 88, 88);
	display: block;
	padding: 1rem;
}

.select-company__item:hover {
	transform: scale(1.05);
}

.select-company-container {
	margin-top: -8rem;
}
</style>

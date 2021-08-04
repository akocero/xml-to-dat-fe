<template>
	<div class="card boiler shadow-md">
		<div class="card-body">
			<ThePageHeader
				v-if="item"
				:heading="item.full_name"
				routeName="user"
				mode="view"
			/>
			<hr />

			<form action="" @submit.prevent="handleSubmit">
				<div class="row" v-if="item">
					<div class="col-md-6">
						<div class="row pr-3">
							<div class="form-group col-5">
								<label>Employee ID</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.employee_id &&
											'is-invalid',
									]"
									id="input_employee_id"
									placeholder="Enter email"
									v-model="item.employee_id"
								/>
							</div>
							<!-- <div class="error">{{ error }}</div> -->
							<div class="form-group col-7">
								<label for="exampleInputEmail1"
									>Full Name</label
								>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.full_name &&
											'is-invalid',
									]"
									id="input_full_name"
									placeholder="Enter email"
									v-model="item.full_name"
								/>
							</div>

							<div class="form-group col-12">
								<label>Email address</label>
								<input
									type="email"
									class="form-control"
									:class="[
										error &&
											error.errors.login_id &&
											'is-invalid',
									]"
									id="input_login_id"
									placeholder="Enter email "
									v-model="item.login_id"
								/>
							</div>

							<div class="form-group col-12">
								<label for="">Role</label>
								<select
									name=""
									id="select_role"
									class="form-control"
									:class="[
										error &&
											error.errors.login_type &&
											'is-invalid',
									]"
									v-model="item.login_type"
								>
									<option value="">Choose ...</option>
									<option value="employee">Employee</option>
									<option value="admin">Admin</option>
									<option value="manager">Manager</option>
								</select>
							</div>
						</div>
					</div>

					<div class="col-md-6">
						<label class="text-bold">Companies </label>
						<div
							class="multi-select text-secondary"
							v-if="
								!isPendingCompany &&
									companies.data?.length &&
									companiesArray.length
							"
						>
							<div
								v-for="company in matchCompanies"
								:key="company.id"
								class="multi-select-card shadow-sm border"
							>
								<input
									type="checkbox"
									name=""
									:value="company.id"
									v-model="companiesArray"
								/>
								<h6 class="h6 text-bold pb-0 mb-0">
									{{ company.code }} - {{ company.name }}
								</h6>
							</div>
						</div>
						<div v-else>
							<p class="text-danger">
								User Can't have 0 company related!
							</p>
							<p class="text-danger">
								Click here to reload the page<a href="">
									Reload</a
								>
							</p>

							{{ disableSaveChanges }}
							<Spinner />
						</div>
					</div>
				</div>
				<div class="row" v-else>
					<Spinner />
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { onBeforeMount, computed, ref } from "vue";
import getItem from "@/composables/getItem";
import { useRoute } from "vue-router";
import Spinner from "@/components/Spinner.vue";
import feather from "feather-icons";
import useFetch from "@/composables/useFetch";
import ThePageHeader from "@/components/layouts/ThePageHeader";
export default {
	name: "UpdateUser",
	components: {
		Spinner,
		ThePageHeader,
	},
	computed: {
		chevronRight: function() {
			return feather.icons["chevron-right"].toSvg({
				width: 18,
			});
		},
	},
	setup() {
		const route = useRoute();
		const {
			data: companies,
			error: errorCompany,
			fetch,
			isPending: isPendingCompany,
		} = useFetch();

		const error = ref(null);
		const unknownError = ref(null);
		const response = ref(null);
		const isPending = ref(false);

		fetch("setupcompany?page=1");

		const search = ref("");

		const matchCompanies = computed(() => {
			return companies.value.data.filter((item) =>
				item.name.toLowerCase().includes(search.value.toLowerCase())
			);
		});

		const { item, error: errorData, load } = getItem(
			route.params.id,
			"payrolluser"
		);

		const companiesArray = ref([100]);

		const pushToCompaniesArray = async () => {
			await load();
			companiesArray.value = [];
			if (!errorData.value) {
				item?.value?.setup_companies.forEach((item) => {
					companiesArray.value.push(item.id);
				});
			}
		};

		onBeforeMount(() => {
			pushToCompaniesArray();
			setTimeout(() => {
				const tags = ["input", "select", "textarea", "button"];
				tags.forEach((tagName) => {
					var inputs = document.getElementsByTagName(tagName);
					console.log(inputs[0]);
					for (var i = 0; i < inputs.length; i++) {
						inputs[i].disabled = true;
					}
				});
			}, 1000);
		});

		return {
			error,
			isPending,
			response,
			item,
			companies,
			search,
			matchCompanies,
			isPendingCompany,
			companiesArray,
		};
	},
};
</script>

<style></style>

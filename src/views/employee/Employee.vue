<template>
	<div class="row">
		<!-- Modal -->
		<div
			class="modal fade"
			id="employeeSetupModal"
			tabindex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
			data-backdrop="static"
		>
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">
							New {{ dropdownTypeTitle }}
						</h5>
						<button
							type="button"
							class="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="form-group col-12">
								<label>
									Value
									<span class="text-danger text-bold">*</span>
								</label>
								<input
									type="text"
									class="form-control"
									:class="[
										error &&
											error.errors.value &&
											'is-invalid',
									]"
									id="input_value"
									aria-describedby="emailHelp"
									placeholder="Ex. 1234567"
									v-model="value"
								/>
								<small
									v-if="error && error.errors.value"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.value[0] }}
								</small>
							</div>
							<div class="form-group col-12">
								<label for=""
									>Description
									<span class="text-danger text-bold">*</span>
								</label>
								<textarea
									name=""
									:class="[
										error &&
											error.errors.description &&
											'is-invalid',
									]"
									id="input_description"
									class="form-control"
									v-model="description"
								></textarea>
								<small
									v-if="error && error.errors.description"
									id="emailHelp"
									class="form-text text-danger"
								>
									{{ error.errors.description[0] }}
								</small>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-dismiss="modal"
						>
							Close
						</button>
						<button
							type="button"
							class="btn btn-primary"
							@click="handleCreate"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="card boiler shadow-md">
		<div class="card-body pt-4">
			<div class="row mb-4">
				<div
					class="col-md-12 d-flex justify-content-between align-items-center"
				>
					<h4 class="h4 mb-0 text-primary">Employee Setup</h4>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<ul
						class="nav nav-pills mb-3"
						id="pills-tab"
						role="tablist"
					>
						<li class="nav-item">
							<a
								class="nav-link active"
								id="pills-emp-class-tab"
								data-toggle="pill"
								href="#pills-emp-class"
								role="tab"
								aria-controls="pills-emp-class"
								aria-selected="true"
								>Employee Class
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-cost-center-tab"
								data-toggle="pill"
								href="#pills-cost-center"
								role="tab"
								aria-controls="pills-cost-center"
								aria-selected="false"
							>
								Cost Center
							</a>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-dep-tab"
								data-toggle="pill"
								href="#pills-dep"
								role="tab"
								aria-controls="pills-dep"
								aria-selected="false"
								>Department</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-dimension-tab"
								data-toggle="pill"
								href="#pills-dimension"
								role="tab"
								aria-controls="pills-dimension"
								aria-selected="false"
								>Dimension</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-frequency-tab"
								data-toggle="pill"
								href="#pills-frequency"
								role="tab"
								aria-controls="pills-frequency"
								aria-selected="false"
								>Frequency</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-emp-rank-tab"
								data-toggle="pill"
								href="#pills-emp-rank"
								role="tab"
								aria-controls="pills-emp-rank"
								aria-selected="false"
								>Employee Rank</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-sub-dep-tab"
								data-toggle="pill"
								href="#pills-sub-dep"
								role="tab"
								aria-controls="pills-sub-dep"
								aria-selected="false"
								>Sub Department</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-position-tab"
								data-toggle="pill"
								href="#pills-position"
								role="tab"
								aria-controls="pills-position"
								aria-selected="false"
								>Position</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-branch-tab"
								data-toggle="pill"
								href="#pills-branch"
								role="tab"
								aria-controls="pills-branch"
								aria-selected="false"
								>Branch</a
							>
						</li>
					</ul>
				</div>
			</div>

			<div class="tab-content pt-3" id="pills-tabContent">
				<div
					class="tab-pane fade show active"
					id="pills-emp-class"
					role="tabpanel"
					aria-labelledby="pills-emp-class-tab"
				>
					<Table
						type="position"
						@openModal="handleShowModal($event)"
						title="Employee Class"
						:data="branches"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-cost-center"
					role="tabpanel"
					aria-labelledby="pills-cost-center-tab"
				>
					<Table
						type="position"
						@openModal="handleShowModal($event)"
						title="Cost Center"
						:data="positions"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-dep"
					role="tabpanel"
					aria-labelledby="pills-dep-tab"
				>
					<Table
						type="department"
						@openModal="handleShowModal($event)"
						title="Department"
						:data="departments"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-emp-rank"
					role="tabpanel"
					aria-labelledby="pills-emp-rank-tab"
				>
					<Table
						type="employee_rank"
						@openModal="handleShowModal($event)"
						title="Employee Rank"
						:data="employee_ranks"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-sub-dep"
					role="tabpanel"
					aria-labelledby="pills-sub-dep-tab"
				>
					<Table
						type="sub_department"
						@openModal="handleShowModal($event)"
						title="Sub Department"
						:data="sub_departments"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-branch"
					role="tabpanel"
					aria-labelledby="pills-branch-tab"
				>
					<Table
						type="branch"
						@openModal="handleShowModal($event)"
						title="Branch"
						:data="branches"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-position"
					role="tabpanel"
					aria-labelledby="pills-position-tab"
				>
					<Table
						type="position"
						@openModal="handleShowModal($event)"
						title="Position"
						:data="positions"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-frequency"
					role="tabpanel"
					aria-labelledby="pills-frequency-tab"
				>
					<Table
						type="frequency"
						@openModal="handleShowModal($event)"
						title="Frequency"
						:data="frequency"
					/>
				</div>
				<div
					class="tab-pane fade"
					id="pills-dimension"
					role="tabpanel"
					aria-labelledby="pills-dimension-tab"
				>
					<Table
						type="dimension"
						@openModal="handleShowModal($event)"
						title="Dimension"
						:data="dimensions"
					/>
				</div>
			</div>
			<!-- <div v-else>
				<Spinner />
			</div> -->
		</div>
	</div>
</template>

<script>
import Spinner from "@/components/Spinner";
import useFetch from "@/composables/useFetch";
import axios from "@/axios/axios-instance";
import Table from "./Table";
import { computed, onBeforeMount, ref } from "vue";
import $ from "jquery";
export default {
	name: "Employee",
	components: {
		Spinner,
		Table,
	},
	setup() {
		const { data, fetch, error: fetchError } = useFetch();

		const error = ref(null);
		const unknownError = ref(null);
		const response = ref(null);
		const isPending = ref(false);

		const value = ref("");
		const description = ref("");

		const showModal = ref(false);
		const dropdownType = ref("");
		const dropdownTypeTitle = ref("");

		onBeforeMount(async () => {
			await fetch("/setup_employee_dropdown");
		});

		const handleCreate = async () => {
			console.log("creating");
			isPending.value = true;

			const newEmpployeeDropdown = {
				type: dropdownType.value,
				value: value.value,
				description: description.value,
			};

			try {
				const res = await axios.post(
					"/setup_employee_dropdown",
					newEmpployeeDropdown
				);
				response.value = res.data;
				console.log(data.value.data);
				data.value.data = [...data.value.data, res.data];
				error.value = null;
				unknownError.value = null;

				$("#employeeSetupModal").modal("hide");

				value.value = "";
				description.value = "";

				// emit("bankAdded", response.value);

				isPending.value = false;
			} catch (err) {
				isPending.value = false;

				if (err.message.includes("422")) {
					error.value = err.response.data;

					console.log(err.response.data);
					unknownError.value = null;
				} else {
					unknownError.value =
						"Please check your internet connection";
					error.value = null;
					response.value = null;
				}
			}
		};

		fetch("/setup_employee_dropdown");

		const branches = computed(() => {
			return data?.value?.data?.filter((item) => item.type === "branch");
		});

		const positions = computed(() => {
			return data?.value?.data?.filter(
				(item) => item.type === "position"
			);
		});

		const departments = computed(() => {
			return data?.value?.data?.filter(
				(item) => item.type === "department"
			);
		});

		const dimensions = computed(() => {
			return data?.value?.data?.filter(
				(item) => item.type === "dimension"
			);
		});

		const frequency = computed(() => {
			return data?.value?.data?.filter(
				(item) => item.type === "frequency"
			);
		});

		const employee_ranks = computed(() => {
			return data?.value?.data?.filter(
				(item) => item.type === "employee_rank"
			);
		});

		const sub_departments = computed(() => {
			return data?.value?.data?.filter(
				(item) => item.type === "sub_department"
			);
		});

		const handleShowModal = (eventData) => {
			$("#employeeSetupModal").modal("show");

			dropdownType.value = eventData.type;
			dropdownTypeTitle.value = eventData.title;
			console.log(type);
		};

		return {
			data,
			error,
			isPending,
			branches,
			positions,
			employee_ranks,
			sub_departments,
			frequency,
			dimensions,
			departments,

			handleShowModal,
			dropdownTypeTitle,
			handleCreate,
			value,
			description,
		};
	},
};
</script>

<style></style>

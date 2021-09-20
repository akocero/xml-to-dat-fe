<template>
	<div
		class="modal fade"
		id="employee-relative-modal"
		tabindex="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" v-if="!data">
						New Relative
					</h5>
					<h5 class="modal-title" v-if="data">
						{{ data.name }}
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
				<form @submit.prevent="handleSubmit">
					<div class="modal-body">
						<div class="row" v-if="!data">
							<div class="form-group col-md-6">
								<label for="">Full Name</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Juan Dela Cruz"
									required
									v-model="relative.name"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Relationship</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Father"
									required
									v-model="relative.relationship"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Contact No.</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. 09293921349"
									v-model="relative.contact_no"
								/>
							</div>

							<div class="form-group col-md-6">
								<label for="">Occupation</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. IT"
									v-model="relative.occupation"
								/>
							</div>
							<div class="form-group col-md-12">
								<label for="">Address</label>
								<textarea
									class="form-control"
									v-model="relative.address"
								></textarea>
							</div>
						</div>
						<div class="row" v-if="data">
							<div class="form-group col-md-6">
								<label for="">Full Name</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Juan Dela Cruz"
									required
									v-model="data.name"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Relationship</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Juan Dela Cruz"
									required
									v-model="data.relationship"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Contact No.</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. 09293921349"
									v-model="data.contact_no"
								/>
							</div>

							<div class="form-group col-md-6">
								<label for="">Occupation</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. IT"
									v-model="data.occupation"
								/>
							</div>
							<div class="form-group col-md-12">
								<label for="">Address</label>
								<textarea
									class="form-control"
									v-model="data.address"
								></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" v-if="!data">
							Append
						</button>
						<button class="btn btn-primary" v-if="data">
							Append Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { v4 as uuidv4 } from "uuid";
export default {
	name: "EmployeeRelativeModal",
	components: {},
	props: ["data"],
	emits: ["addRelative", "updateRelative"],
	setup(props, { emit }) {
		const relative = ref({
			id: uuidv4(),
			relationship: "",
			name: "",
			address: "",
			contact_no: "",
			occupation: "",
		});

		const handleSubmit = () => {
			if (!props.data) {
				emit("addRelative", relative.value);
				relative.value = {
					relationship: "",
					name: "",
					address: "",
					contact_no: "",
					occupation: "",
				};
			} else {
				emit("updateRelative", props.data);
			}
		};
		return { relative, handleSubmit };
	},
};
</script>

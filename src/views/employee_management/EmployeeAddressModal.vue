<template>
	<div
		class="modal fade"
		id="employee-address-modal"
		tabindex="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" v-if="!data">
						New Address
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
								<label for="">Address Type</label>
								<select
									class="form-control"
									v-model="address.type"
								>
									<option value="current" selected
										>Current</option
									>
									<option value="permanent">Permanent</option>
								</select>
							</div>
							<div class="form-group col-md-6">
								<label for="">Street</label>
								<input
									type="text"
									class="form-control"
									required
									v-model="address.street"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">City</label>
								<input
									type="text"
									class="form-control"
									v-model="address.city"
								/>
							</div>

							<div class="form-group col-md-6">
								<label for="">Country</label>
								<input
									type="text"
									class="form-control"
									v-model="address.country"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Bldg.</label>
								<input
									type="text"
									class="form-control"
									v-model="address.bldg"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Geo Code</label>
								<input
									type="text"
									class="form-control"
									v-model="address.geocode"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Zip Code</label>
								<input
									type="text"
									class="form-control"
									v-model="address.zipcode"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Region</label>
								<input
									type="text"
									class="form-control"
									v-model="address.region"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Brgy.</label>
								<input
									type="text"
									class="form-control"
									v-model="address.brgy"
								/>
							</div>
						</div>
						<div class="row" v-if="data">
							<div class="form-group col-md-6">
								<label for="">Address Type</label>
								<select
									class="form-control"
									v-model="data.type"
								>
									<option value="current" selected
										>Current</option
									>
									<option value="permanent">Permanent</option>
								</select>
							</div>
							<div class="form-group col-md-6">
								<label for="">Street</label>
								<input
									type="text"
									class="form-control"
									required
									v-model="data.street"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">City</label>
								<input
									type="text"
									class="form-control"
									v-model="data.city"
								/>
							</div>

							<div class="form-group col-md-6">
								<label for="">Country</label>
								<input
									type="text"
									class="form-control"
									v-model="data.country"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Bldg</label>
								<input
									type="text"
									class="form-control"
									v-model="data.bldg"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Geo code</label>
								<input
									type="text"
									class="form-control"
									v-model="data.geocode"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Zip code</label>
								<input
									type="text"
									class="form-control"
									v-model="data.zipcode"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Region</label>
								<input
									type="text"
									class="form-control"
									v-model="data.region"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Brgy.</label>
								<input
									type="text"
									class="form-control"
									v-model="data.brgy"
								/>
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
	name: "EmployeeAddressModal",
	components: {},
	props: ["data"],
	emits: ["addAddress", "updateAddress"],
	setup(props, { emit }) {
		console.log(props.data);
		const address = ref({
			id: uuidv4(),
			type: "",
			street: "",
			city: "",
			country: "",
			bldg: "",
			geocode: "",
			zipcode: "",
			region: "",
			brgy: "",
		});

		const handleSubmit = () => {
			if (!props.data) {
				emit("addAddress", address.value);
				address.value = {
					type: "",
					street: "",
					city: "",
					country: "",
					bldg: "",
					geocode: "",
					zipcode: "",
					region: "",
					brgy: "",
				};
			} else {
				emit("updateAddress", props.data);
			}
		};
		return { address, handleSubmit };
	},
};
</script>

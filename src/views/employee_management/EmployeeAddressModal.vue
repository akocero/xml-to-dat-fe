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
						Edit Address
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
									placeholder="Ex. No. 3 Luzon Street, Pilipinas Subdivision"
									required
									v-model="address.street"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">City</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Manila"
									v-model="address.city"
								/>
							</div>

							<div class="form-group col-md-6">
								<label for="">Country</label>
								<input
									type="text"
									class="form-control"
									v-model="address.country"
									placeholder="Ex. Philippines"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Bldg.</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Bldg. 1 Unit No. 2"
									v-model="address.bldg"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Geo Code</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. 1111"
									v-model="address.geocode"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Zip Code</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. 2222"
									v-model="address.zipcode"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Province</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Bulacan"
									v-model="address.province"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Brgy.</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Barangay East"
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
									placeholder="Ex. No. 3 Luzon Street, Pilipinas Subdivision"
									required
									v-model="data.street"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">City</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Manila"
									v-model="data.city"
								/>
							</div>

							<div class="form-group col-md-6">
								<label for="">Country</label>
								<input
									type="text"
									class="form-control"
									v-model="data.country"
									placeholder="Ex. Philippines"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Bldg</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Bldg. 1 Unit No. 2"
									v-model="data.bldg"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Geo code</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. 1111"
									v-model="data.geocode"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Zip Code</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. 2222"
									v-model="data.zipcode"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Province</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Bulacan"
									v-model="data.province"
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="">Brgy.</label>
								<input
									type="text"
									class="form-control"
									placeholder="Ex. Barangay East"
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
		const address = ref({
			id: uuidv4(),
			type: "current",
			street: "",
			city: "",
			country: "",
			bldg: "",
			geocode: "",
			zipcode: "",
			province: "",
			brgy: "",
		});

		const handleSubmit = () => {
			if (!props.data) {
				emit("addAddress", address.value);
				address.value = {
					type: "current",
					street: "",
					city: "",
					country: "",
					bldg: "",
					geocode: "",
					zipcode: "",
					province: "",
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

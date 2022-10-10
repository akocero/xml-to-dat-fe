<template>
	<div class="card boiler shadow-md p-4">
		<div class="row mb-4 ">
			<div
				class="col-md-12 d-flex justify-content-between align-items-center"
			>
				<h4 class="h4 mb-0">
					<span class="text-dark">License Status:</span
					><span class="text-danger">Not Activated</span>
				</h4>
			</div>
		</div>
		<form action="" class="">
			<div class="row">
				<div class="form-group col-9">
					<BaseInputField
						id="input_name"
						label="License Key"
						v-model="name"
						:error="error"
						:errorField="error?.errors?.name || null"
						placeholder="Ex. admin, user, hr, payroll master"
						:required="true"
					/>
				</div>
				<div class="col-3 d-flex align-items-end pb-3">
					<button class="btn btn-custom-primary">Apply</button>
				</div>
			</div>
		</form>
		<h5 class="h5 mt-4">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit.
		</h5>
		<ul>
			<li>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
				animi, aspernatur
			</li>
			<li>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
				animi, aspernatur
			</li>
			<li>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
				animi, aspernatur
			</li>
			<li>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
				animi, aspernatur
			</li>
		</ul>
		<div class="jumbotron text-center mt-4 p-3">
			<p class="lead font-weight-bold">Looking for Help?</p>
			<p class="lead">
				This is a simple hero unit, a simple jumbotron-style component
				for calling extra attention to featured content or information.
			</p>
			<button class="btn btn-primary">Read Manual</button>
		</div>
	</div>
</template>

<script>
import BaseInputField from '@/components/BaseInputField';
import { ref } from 'vue';

export default {
	name: 'LicenseList',
	components: {
		BaseInputField
	},
	computed: {
		chevronRight: function() {
			return feather.icons['chevron-right'].toSvg({
				width: 18
			});
		}
	},
	setup() {
		const name = ref('');
		return {
			name
		};
	}
};
</script>

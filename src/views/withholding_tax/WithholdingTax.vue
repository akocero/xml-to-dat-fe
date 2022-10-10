<template>
	<div class="card boiler shadow-md p-4">
		<div class="row mb-4 ">
			<div
				class="col-md-12 d-flex justify-content-between align-items-center"
			>
				<h4 class="h4 mb-0">
					Lorem ipsum dolor sit amet.
				</h4>
			</div>
		</div>
		<h5 class="h5">
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
		<form action="" class="">
			<div class="row">
				<div class="form-group col-4">
					<BaseSelectField
						id="input_currency"
						label="Reports"
						v-model="currency"
						:error="error"
						:errorField="error?.errors?.currency || null"
						:options="[
							{
								value: 'php',
								label: 'MAP'
							},
							{
								value: 'usd',
								label: 'QAP'
							},
							{
								value: 'usd',
								label: 'SAWT'
							},
							{
								value: 'usd',
								label: 'EWT Monthly'
							},
							{
								value: 'usd',
								label: 'EWT Quarterly'
							}
						]"
						:required="true"
					/>
				</div>
				<div class="col-3 d-flex align-items-end pb-3">
					<button class="btn btn-custom-primary">
						Upload XML File
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import BaseInputField from '@/components/BaseInputField';
import BaseSelectField from '@/components/BaseSelectField';
import { ref } from 'vue';

export default {
	name: 'WithholdingTax',
	components: {
		BaseInputField,
		BaseSelectField
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

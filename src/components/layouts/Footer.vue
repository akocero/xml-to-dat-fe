<template>
	<!-- Main Footer -->
	<footer class="main-footer text-sm">
		<!-- To the right -->
		<div class="float-right d-none d-sm-inline"></div>
		<!-- Default to the left -->
		Copyright &copy; {{ currentYear }} XML to DAT File by
		<a href="https://www.mseedsystems.com/"
			>Mustard Seed Systems Corporation</a
		>. All rights reserved.
	</footer>
</template>
<script>
export default {
	name: 'Footer',
	data() {
		return {
			currentYear: new Date().getFullYear()
		};
	}
};
</script>

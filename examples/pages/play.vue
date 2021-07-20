<template>
	<div class="aaaa">
		好好学习天天向DD上 <ab></ab>
		<div class="button" @click="handleClick"></div>
	</div>
</template>
<script>
	import ab from './ceshi.jsx';
	export default {
		components: {
			ab,
		},
		methods: {
			handleClick() {
				this.$ImgPrview();
			},
		},
	};
</script>
<style lang="scss" scoped>
	.aaaa {
		width: 200px;
	}
	.button {
		width: 200px;
		height: 50px;
		border: 1px solid red;
	}
</style>
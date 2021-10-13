<template>
	<div class="aaaa">
		好好学习天天向DD上 <ab></ab>
		<div class="button" @click="handleClick"></div>
		<el-input v-model="value"></el-input>
		<i class="el-icon-edit"></i>
		<i class="el-icon-share"></i>
		<i class="el-icon-delete"></i>
		<el-button type="primary" icon="el-icon-search">搜索</el-button>
	</div>
</template>
<script>
	import ab from './ceshi.jsx';
	export default {
		components: {
			ab,
		},
		data() {
			return {
				value: '',
				listShow: [
					{
						fileName: '1610086152323.jpg',
						name: '1610086152323',
						suffix: 'jpg',
						type: 'img',
						url: 'https://m7-mopower-test.7moor.com/undefined/accessory/undefined/dccf1830eb9b11eb93e88341319654b2.jpg',
					},
				],
			};
		},
		methods: {
			handleClick() {
				this.$ImgPrview({
					list: this.listShow,
					img: this.listShow[0],
					isHiddenDelBtn: true,
				});
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
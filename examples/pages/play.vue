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
	data () {
		return {
			listShow: [{
				fileName: "1610086152323.jpg",
				name: "1610086152323",
				suffix: "jpg",
				type: "img",
				url: "https://m7-mopower-test.7moor.com/undefined/accessory/undefined/dccf1830eb9b11eb93e88341319654b2.jpg"
			}]
		};
	},
	methods: {
		handleClick () {
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
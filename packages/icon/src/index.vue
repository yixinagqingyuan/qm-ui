<template>
	<i :class="`iconfont ${name}`"></i>
</template>

<script >
export default {
	name: 'MpIcon',
	props: {
		name: {
			type: String,
			default: '',
		},
	},
}
</script>

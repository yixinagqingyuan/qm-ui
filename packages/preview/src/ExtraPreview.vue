<template>
	<div class="mp-empty-state">
		<slot></slot>
		<p>.{{ previewType }}文件类型无法预览</p>
		<p>建议下载至本地查看</p>
	</div>
</template>
<script lang="ts">
export default {
	name: 'extraPreview',
	props: {
		previewType: {
			type: String,
			default: '',
		},
	},
};
</script>

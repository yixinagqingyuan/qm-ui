<template>
	<div class="mp-pdf" ref="allPage" @scroll="scrollPage">
		<canvas v-for="index in numPages" :key="index" :ref="`scrollPdfCanvas${index}`" class="mp-pdf__preview"></canvas>
	</div>
</template>
<script>
// https://github.com/mozilla/pdf.js/issues/13190
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
// https://github.com/mozilla/pdf.js/issues/11990
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;
export default {
	name: 'previewPdf',
	data () {
		return {
			numPages: 0, // pdf 总页数
			isChangeScroll: false,
			isChangePage: false,
			pdfData: null,
			// 页面滚动时计算当前在第几页
			scrollPage: throttle((e) => {
				this.changePage(e.target);
			}, 200),
		};
	},
	watch: {
		currentPage () {
			this.currentPageChanged();
		},
		url () {
			this.urlChanged();
		},
		rotate () {
			this.rotateChanged();
		},
	},
	methods: {
		changePage (e) {
			// 控制currentPage触发滚动时 不走下面逻辑
			if (this.isChangePage) {
				this.isChangePage = false;
				return;
			}
			const pdfHeight = e.children[0].clientHeight;
			const scrollTop = e.scrollTop + e.offsetHeight;
			let page = Math.ceil(scrollTop / pdfHeight);
			if (page > this.numPages) {
				page = this.numPages;
			}
			// 当前页滚动时 不会触发currentPage变化
			if (page !== this.currentPage) {
				this.isChangeScroll = true;
			}
			this.$emit('scroll-page', page);
		},
		loadPdfData () {
			this.$emit('load-success', true);
			// 用于异步获取PDf文档，发送多个Ajax请求以块的形式下载文档。它返回一个Promise，该Promise的成功回调传递一个对象，该对象包含PDF文档的信息，该回调中的代码将在完成PDf文档获取时执行。
			this.pdfData = pdfjsLib.getDocument(this.url);
			this.renderScrollPdf();
		},
		renderScrollPdf () {
			this.pdfData.promise.then((pdf) => {
				this.numPages = pdf.numPages;
				this.$emit('all-pages', this.numPages);
				this.renderScrollPdfPage(1);
				this.$nextTick(() => {
					this.$emit('load-success', false);
				});
			});
		},
		renderScrollPdfPage (num, rotate = 0) {
			this.pdfData.promise.then((pdf) => {
				let numPages = pdf.numPages;
				// 用于获取PDF文档中的各个页面
				pdf.getPage(num).then((page) => {
					let canvas = this.$refs[`scrollPdfCanvas${num}`][0];
					const scale = 2; // 解决字体模糊问题

					// 针对提供的展示比例，返回PDf文档的页面尺寸 getViewport({ scale, rotation, dontFlip })
					let viewport = page.getViewport({ scale, rotate });
					const { width, height } = viewport;
					canvas.height = height;
					canvas.width = width;

					let ctx = canvas.getContext('2d');
					let renderContext = {
						canvasContext: ctx,
						viewport,
					};
					// 渲染PDF
					page.render(renderContext).promise.then(() => {
						if (num < numPages) {
							this.renderScrollPdfPage(num + 1, rotate);
						}
					});
				});
			});
		},
		currentPageChanged (val, oldVal) {
			// 控制通过鼠标滚动触发时 不走下面逻辑
			if (this.isChangeScroll) {
				this.isChangeScroll = false;
				return;
			}
			// currentPage变化时 重置滚动条
			this.isChangePage = true;
			const allPage = this.$refs.allPage;
			const pdfHeight = allPage.children[0].clientHeight;
			allPage.scrollTop = pdfHeight * (val - 1);
		},
		urlChanged () {
			this.loadPdfData();
		},
		rotateChanged (val) {
			this.renderScrollPdfPage(1, val);
		},
	},
	mounted () {
		this.loadPdfData();
	},
};
</script>
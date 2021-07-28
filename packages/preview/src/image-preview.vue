<template>
	<transition @after-leave="handleAfterLeave">
		<div v-show="visible" @click.stop="">
			<div class="qo-preview">
				<div class="qo-preview__header">
					<span class="qo-preview--left">文件预览</span>
					<span class="qo-preview--right" @click="close">关闭</span>
				</div>
				<div class="qo-preview__main">
					<transition name="el-message-fade">
						<div class="qo-main--left" v-show="collapse">
							<div class="qo-main--left-img" :class="{ 'qo-main--left-border': item.url === showImg.url }" v-for="item in list" @click="switchImg(item)">
								<div class="icon">
								</div>
								<span class="text ellipsis">
									{{ item.name }}
								</span>
							</div>
						</div>
					</transition>
					<div class="qo-main--right">
						<!-- img图片格式预览 -->
						<img v-if="showImg.type === 'img'" :style="imgStyle" @mousewheel="mouseWheelHandler" ref="img" :src="showImg.url" @load="handleImgLoad" @error="handleImgError" @mousedown="handleMouseDown" alt="" />
						<!-- pdf格式预览 使用vue-pdf -->
						<pafCom v-else-if="showImg.type === 'pdf'" :style="imgStyle" :rotate="rotate" :currentPage="currentPage" :url="showImg.url" style="width: 100%; height: 100%; overflow: auto; background: #00000008" @scroll-page="(page) => (currentPage = scrollPage = page)" @all-pages="(pages) => (this.allPage = pages)" @load-success="(load) => (pdfLoading = load)"></pafCom>
						<!-- office格式 使用微软在线预览 -->
						<iframe v-else-if="officePreviewList.includes(showImg.type)" style="width: 100%; min-height: 600px" :src="`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
								showImg.url
							)}`" width="100%" height="100%" frameborder="1" />
						<!-- 其余展示图片 -->
						<extra-preview v-else :style="imgStyle" :previewType="showImg.suffix"></extra-preview>
						<div class="qo-main--right-tool__left" @click="prev">
							<mp-icon name="icon-fangxiang-zuo-xian">
							</mp-icon>
						</div>
						<div class="qo-main--right-tool__right" @click="next">
							<mp-icon name="icon-fangxiang-you-xian"></mp-icon>
						</div>
						<div class="qo-main--right-tool">
							<div class="qo-main--side">
								<mp-icon :name="collapse ? 'icon-shouqi-shouqi' : 'icon-shouqi-zhankai'" @click="collapse = !collapse"></mp-icon>
							</div>
							<div v-show="showImg.type === 'pdf'" class="qo-main--page">
								<span @click="handleActions('pageDown')">
									<mp-icon name="icon-fangxiang-zuo-xian"></mp-icon>
								</span>
								<span>{{ scrollPage || currentPage }}/{{ allPage }}</span><span @click="handleActions('pageUp')">
									<mp-icon name="icon-fangxiang-you-xian"></mp-icon>
								</span>
							</div>
							<div class="qo-main--zoom">
								<span @click="handleActions('zoomOut')">
									<mp-icon name="icon-suoxiao-xian"></mp-icon>
								</span>
								<span>{{ getScale }}%</span><span @click="handleActions('zoomIn')">
									<mp-icon name="icon-fangda-xian"></mp-icon>
								</span>
							</div>
							<div class="qo-main--rotate" @click="handleActions('clocelise')">
								<mp-icon name="icon-shunshizhen2"></mp-icon>
							</div>
							<div class="qo-main--download">
								<a style="color: #fff" :href="showImg.url + '?attname=' + showImg.fileName" download target="_blank">
									<mp-icon name='icon-xiazai' class="pointer"></mp-icon>
								</a>
							</div>
							<div class="qo-main--delete" v-if="!isHiddenDelBtn" @click="handleDelete">
								<mp-icon name="icon-shanchu1-xian"></mp-icon>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import pafCom from './pdf.vue';
import ExtraPreview from './ExtraPreview.vue';
import { rafThrottle } from '@mopower-ui/utils/util';
export default {
	name: 'MpPreview',
	props: {
		img: {
			type: Object,
			default: () => ({})
		},
		list: {
			type: Array,
			default: () => []
		},
		isHiddenDelBtn: {
			type: Boolean,
			default: false
		}
	},
	components: {
		pafCom,
		ExtraPreview
	},
	data () {
		return {
			visible: true,
			collapse: true, // 控制左侧显示或隐藏
			currentPage: 1, // pdf当前页
			rotate: 0, // pdf旋转交付
			scrollPage: 0,
			allPage: 1, // pdf总页数
			pdfLoading: false,
			showImg: {},
			officePreviewList: ['doc', 'docs', 'ppt', 'pptx', 'xls', 'xlsx'], // 可以通过office在线预览的后缀列表
			_dragHandler: '',
			transform: {
				scale: 1,
				deg: 0,
				offsetX: 0,
				offsetY: 0,
				enableTransition: false,
			},
			loading: false,
			mouseWheelHandler: rafThrottle((e) => {
				const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
				if (delta > 0) {
					this.handleActions('zoomIn', {
						zoomRate: 0.015,
						enableTransition: false,
					});
				} else {
					this.handleActions('zoomOut', {
						zoomRate: 0.015,
						enableTransition: false,
					});
				}
			}),
		};
	},
	watch: {
		'showImg.url' () {
			this.urlLoading();
		}
	},
	methods: {
		urlLoading (val) {
			this.$nextTick(() => {
				const $img = this.$refs.img;
				if ($img && !$img.complete) {
					this.loading = true;
				}
			});
		},
		close () {
			this.visible = false;
		},
		switchImg (item) {
			this.resetStyle();
			this.showImg = item;
		},
		resetStyle () {
			this.transform = {
				scale: 1,
				deg: 0,
				offsetX: 0,
				offsetY: 0,
				enableTransition: false,
			};
			this.scrollPage = 0;
			this.currentPage = 1;
			this.rotate = 0;
		},
		handleImgLoad (e) {
			this.loading = false;
		},
		handleImgError (e) {
			this.loading = false;
			e.target.alt = '加载失败';
		},
		handleMouseDown (e) {
			if (this.loading || e.button !== 0) {
				return;
			}
			const { offsetX, offsetY } = this.transform;
			const startX = e.pageX;
			const startY = e.pageY;
			this._dragHandler = rafThrottle((ev) => {
				this.transform.offsetX = offsetX + ev.pageX - startX;
				this.transform.offsetY = offsetY + ev.pageY - startY;
			});
			document.addEventListener('mousemove', this._dragHandler, false);
			document.addEventListener(
				'mouseup',
				(ev) => {
					document.removeEventListener('mousemove', this._dragHandler, false);
				},
				false
			);
			e.preventDefault();
		},
		prev () {
			this.findImg((index, len) => {
				return index === 0 ? len - 1 : index - 1;
			});
		},
		next () {
			this.findImg((index, len) => {
				return index === len - 1 ? 0 : index + 1;
			});
		},
		findImg (fn) {
			const len = this.list.length;
			this.list.find((item, index) => {
				if (item.url === this.showImg.url) {
					this.showImg = this.list[fn(index, len)];
					this.resetStyle();
					return true;
				}
			});
		},
		handleDelete () {
			var _this = this;
			_this.callback('delete', this.showImg);
			const index = this.list.findIndex((item) => {
				return this.showImg.url === item.url;
			});
			this.list.splice(index, 1);
			if (this.list.length > 0) {
				this.showImg = this.list[index];
			} else {
				this.showImg = {};
			}
		},
		handleAfterLeave () {
			this.$destroy();
			this.$el.parentNode.removeChild(this.$el);
		},
		handleActions (action, options = {}) {
			const { zoomRate, rotateDeg, enableTransition } = {
				zoomRate: 0.2,
				rotateDeg: 90,
				enableTransition: true,
				...options,
			};
			const { transform } = this;
			switch (action) {
				case 'zoomOut':
					if (transform.scale > 0.2) {
						transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
					}
					break;
				case 'zoomIn':
					transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
					break;
				case 'clocelise':
					if (this.showImg.type === 'pdf') {
						this.rotate += rotateDeg;
					} else {
						transform.deg += rotateDeg;
					}
					break;
				case 'anticlocelise':
					transform.deg -= rotateDeg;
					break;
				case 'pageDown':
					this.scrollPage = 0;
					if (this.currentPage > 1) {
						this.currentPage--;
					}
					break;
				case 'pageUp':
					this.scrollPage = 0;
					if (this.currentPage < this.allPage) {
						this.currentPage++;
					}
					break;
			}
			transform.enableTransition = enableTransition;
		}
	},
	created () {
		console.log(this.img);
		this.showImg = this.img;
	},
	computed: {
		imgStyle () {
			const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
			const style = {
				transform: `scale(${scale}) rotate(${deg}deg)`,
				transition: enableTransition ? 'transform .3s' : '',
				marginLeft: `${offsetX}px`,
				marginTop: `${offsetY}px`,
			};
			return style;
		},
		getScale () {
			return Math.floor(this.transform.scale * 100);
		}
	}
};
</script>
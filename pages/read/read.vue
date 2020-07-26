<template>
	<view class="con" :style="{height: height+'px',backgroundColor:'#'+bgm}">
		<!-- 	<uni-nav-bar :background-color="'#'+bgm" fixed="true" status-bar="true" @clickLeft='clickLeft' @clickRight="tanchuang"
		 color="white" left-icon="back" left-text="返回" right-text="目录" :title="content"></uni-nav-bar> -->
		<uni-nav-bar :background-color="'#'+bgm" fixed="true" status-bar="true" @clickLeft='clickLeft' :color="'#'+fontColor"
		 left-icon="back" :title="content">
			<view slot="right" style="display: flex;flex-direction: row;">
				<text @click="tanchuang">
					目录
				</text>
				<image class="img-set" @click="open" src="../../static/images/icon/set.png" mode=""></image>
			</view>
		</uni-nav-bar>
		<view class="cont" :style="{backgroundColor:'#'+bgm}" @click="open">
			<view class="content" :style="{fontSize:fontsize+'rpx',backgroundColor:'#'+bgm,color:'#'+fontColor}" v-for="item in list">
				<text space="ensp">{{' '+'  '+item}}</text><br>
			</view>
		</view>
		<uni-drawer :visible="status">
			<view style="padding:30rpx;">
				<view class="uni-title" @click="getContents(item.content_id,item.book_id)" style="font-size: 32rpx;padding-bottom: 15rpx;"
				 v-for="item in contentList">{{item.title}}</view>
			</view>
			<view class="nex-btn">
				<text class="txt1" @click="getLastList(content_id,book_id)">上一章</text>
				<text class="txt2" @click="getMoreList(content_id,book_id)">下一章</text>
			</view>

			<!-- <view class="ack">
				<button type="default" @click="getFontSize">+</button>
			</view> -->
		</uni-drawer>
		<!-- 	<view class="setting">
			  <icon :type="setting" size="26"/>十二猴子
		</view> -->
		<uni-popup ref="popup" type="bottom">
			<view class="popun">
				<view class="change">
					<view class="last" @click="getContents(content_id-1,book_id)">
						上一章
					</view>
					<view class="booktitle">
						{{content}}
					</view>
					<view @click="getContents(content_id+1,book_id)" class="next">
						下一章
					</view>
				</view>
				<view class="color">
					<view class="c-title">
						主题
					</view>
					<view class="c-bg">
						<view v-for="(item,index)  in colora" @click="changeThem(item.co,item.aa)" :key="index" class="bgm" :style="{backgroundColor: '#'+item.aa}"></view>
					</view>
				</view>
				<view class="fontsize">
					<view class="font-title">
						字体
					</view>
					<view class="font">
						<view class="ins" @click="onSize">
							A-
						</view>
						<view class="font-data">
							{{fontsize/2}}
						</view>
						<view @click="inSize" class="ins">
							A+
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				book_id: '',
				height: 0,
				list: [],
				content: '',
				content_id: 1,
				status: false,
				page: 1,
				size: 10,
				contentList: [],
				fontColor: '',
				bgm: '',
				fontsize: 32,
				colora: [{
						aa: 'd2cec5',
						co: '2a2a2a'
					},
					{
						aa: 'd9eaea',
						co: '1d330f'
					},
					{
						aa: 'b4b4b4',
						co: '025c69'
					},
					{
						aa: 'd3c3da',
						co: '3c0158'
					},
					{
						aa: 'e7e7e7',
						co: '191970'
					}, {
						aa: '2a2a2a',
						co: '7d7b4b'
					}
				],
			}
		},
		onLoad(op) {
			this.book_id = op.bookid
			this.content_id = op.con_id;
			var that = this
			uni.getSystemInfo({
				success: function(res) {
					console.log(res.windowHeight);
					that.height = res.windowHeight
				},
			})
			this.fontColor = uni.getStorageSync('c') || '1d330f'
			this.bgm = uni.getStorageSync('bgm') || 'd9eaea'
		},
		onShow() {
			this.getContent()
			uni.getSystemInfo({
				success: function(res) {

					console.log(res.windowHeight);
					this.height = res.windowHeight
				},
			})
			this.getList()
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			getContents(cid, bid) {
				this.book_id = bid;
				this.content_id = cid
				this.getContent()
			},
			onSize() {
				this.fontsize = this.fontsize - 2
			},
			inSize() {
				this.fontsize = this.fontsize + 2
			},
			changeThem(c, b) {
				this.fontColor = c;
				this.bgm = b
				uni.setStorage({
					key: 'bgm',
					data: b
				})
				uni.setStorage({
					key: 'c',
					data: c
				})
			},
			getContent() {
				this.$request('/read/content', {
						book_id: this.book_id,
						content_id: this.content_id
					}, 'get')
					.then(res => {
						console.log(res.content)
						this.list = res.content
						this.content = res.title
						this.content_id=+res.content_id
						console.log(this.content)
					})
			},
			tanchuang() {
				this.status = !this.status;
			},
			clickLeft() {
				uni.navigateBack({
					delta: 1
				})
			},
			getList() {
				this.$request('/read/list', {
					book_id: this.book_id,
					page: this.page,
					size: this.size
				}, 'get').then(res => {
					console.log(res.res.data)
					this.contentList = res.res.data
				})
			},
			getMoreList() {
				this.page = this.page + 1
				this.$request('/read/list', {
					book_id: this.book_id,
					page: this.page,
					size: this.size
				}, 'get').then(res => {
					console.log(res.res.data)
					this.contentList = res.res.data

				})
			},
			getLastList() {
				this.page = this.page - 1
				this.$request('/read/list', {
					book_id: this.book_id,
					page: this.page,
					size: this.size
				}, 'get').then(res => {
					console.log(res.res.data)
					this.contentList = res.res.data

				})
			}
		}
	}
</script>

<style scoped>
	.con {
		color: #1d330f;
		background-color: #d9eaea;
	}

	.img-set {
		height: 38rpx;
		width: 38rpx;
		margin-left: 10rpx;
	}

	.cont {
		background-color: #d9eaea;
	}

	.content {
		width: 97%;
		margin: 0 auto;
		margin-top: 10rpx;
		background-color: #d9eaea;
	}

	.nex-btn {
		text-align: center;
		font-size: 32rpx;
	}

	.txt1 {
		padding-right: 30rpx;
	}

	.txt2 {
		padding-left: 30rpx;
	}

	.popun {
		background-color: #ffffff;
		padding-bottom: 35rpx;
	}

	.change {
		display: flex;
		font-size: 30rpx;
		margin-top: 20rpx;
		padding-top: 15rpx;
	}

	.last {

		width: 18%;
		text-align: center;
	}

	.booktitle {
		width: 64%;
		text-align: center;
		overflow: hidden;

	}

	.next {
		width: 18%;
		text-align: center;

	}

	.color {
		font-size: 30rpx;
		display: flex;
		margin-top: 35rpx;
		text-align: center;
	}

	.c-bg {
		display: flex;
		width: 75%;
	}

	.c-title {
		text-align: center;
		width: 15%;
	}

	.bgm {
		margin-left: 15rpx;
		margin-right: 15rpx;
		border-radius: 10rpx;
		height: 40rpx;
		width: 60rpx;
	}

	/* 字体 */
	.fontsize {
		display: flex;
		width: 100%;
		margin-top: 35rpx;
		font-size: 30rpx;
	}

	.font-title {
		width: 15%;
		text-align: center;
	}

	.font {
		width: 80%;
		margin-left: 15rpx;
		color: #505050;
		display: flex;
	}

	.ins {
		border: 1rpx solid #d5d5d5;
		padding-left: 25rpx;
		height: 38rpx;
		line-height: 38rpx;
		padding-right: 25rpx;
	}

	.ins:active {
		background-color: #ececec;
	}

	.font-data {
		padding-left: 25rpx;
		height: 38rpx;
		line-height: 38rpx;
		padding-right: 25rpx;
	}
</style>

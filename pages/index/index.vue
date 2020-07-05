<template>
	<view>
		<view class="container">
			<!-- 顶部轮播图 -->
			<view class="swiper">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in banner" class="banner" :key="index">
						<view class="banner-item">
							<image class="banner_img" :src="item.img_url" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="category" v-for="(item,index) in category">
				<view class="category-img">
					<image class="category-imgs" :src="item.img" mode="aspectFill"></image>
					<view class="category-name">{{item.name}}</view>
				</view>
			</view>
			<view class="recommand">
				<view class="re-title">
					推荐阅读
				</view>
				<view class="recommand-content">
					<swiper class="icons" :indicator-dots="indicatorDotss" :autoplay="autoplays" :interval="intervals" :duration="durations">
						<block>
							<swiper-item class="re-swiper" v-for="(item,index) in recommandList" :key="index">
								<view class="re-cotent" v-for="(items,indexs) in item" :key="indexs">
									<view class="icon" @click="toDetail(items.book_id)">
										<image class="re-img" :src="items.main_img_url"></image>
										<view class="re-bookname">
											<text class="re-booknames">{{items.name}}</text>
										</view>
									</view>
								</view>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view>
		</view>

		
			<view class="book">
				<view class="book-title">
					最新上架
				</view>
				<view class="bookList" v-for="(item,index) in list" @click="toDetail(item.book_id)">
					
					<image class="book-img" :src="item.main_img_url" mode=""></image>
					<view class="book-description">
						<view class="book-name">
							{{item.name}}
						</view>
						<view class="book-author">
							作者：{{item.author}}
						</view>
						<view class="book-xq">
							{{item.description}}
						</view>
						<view class="book-num">
							<text class="book-number">{{item.word_num+'万'}}</text>
							<text class="book-cate">{{item.cate}}</text>
							<text class="book-status">{{item.l_status?'完本':'连载中'}}</text>
						</view>
					</view>
				</view>
			</view>
		
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				i: '',
				banner: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				indicatorDotss: false,
				autoplays: false,
				intervals: 2000,
				durations: 500,
				listQuery: {
					page: 1,
					limit: 10
				},
				loadMore: true,
				more: "more",
				category: [{
						id: 1,
						img: '../../static/images/icon/boy.png',
						name: "男生"
					},
					{
						id: 2,
						img: '../../static/images/icon/girl.png',
						name: '女生'
					},
					{
						id: 3,
						img: '../../static/images/icon/top.png',
						name: '排行'
					},
					{
						id: 4,
						img: '../../static/images/icon/famous.png',
						name: '名著'
					},
					{
						id: 5,
						img: '../../static/images/icon/category.png',
						name: '书库'
					}
				],
				list: [],
				statusTypes: [{
					value: 'more',
					text: '加载前',
					checked: true
				}, {
					value: 'loading',
					text: '加载中',
					checked: false
				}, {
					value: 'noMore',
					text: '没有更多',
					checked: false
				}],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				loadingText: '正在加载',
				recommandList: []
			}
		},
		onLoad() {
			this.getBanner()
			this.getRecommand()
			this.getBook()
		},
		onReachBottom() {
			console.log(123)

			if (this.loadMore) {
				this.more = "loading"
				this.getMoreBook()
			} else {
				this.more = "none"
			}

		},
		onPullDownRefresh() {
			this.getBook()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			getBanner() {
				this.$request('/getbanner', {}, 'get').then(res => {
					this.banner = res.banner.data
				})
			},
			getRecommand() {
				this.$request('/book/adminRecommend', {}, 'get').then(res => {
					console.log(res)
					this.recommandList = res
				})
			},
			getBook() {
				uni.showLoading({
							title: '正在加载中',
							mask: true
				})
				this.listQuery.page=1
				this.$request('/book/recommend', this.listQuery, 'get').then(res => {
					this.list = res.data.data;
					this.listQuery.page++
				})
			},
			getMoreBook() {
				uni.showLoading({
							title: '正在加载中',
							mask: true
				})
				this.$request('/book/recommend', this.listQuery, 'get').then(res => {
					if (res.data.data.length < 10) {
						this.loadMore = false
						this.list = this.list.concat(res.data.data);
					} else {
						this.more = 'more'
						this.loadMore = true
						this.list = this.list.concat(res.data.data);
						this.listQuery.page++
					}
				})
			},
			toDetail(id){
				console.log(id)
				uni.navigateTo({
					url: '../book-detail/book-detail?id=' + id,
					 animationType: 'pop-in',
					    animationDuration: 200
				})
			},
			change(id) {
				uni.navigateTo({
					url: '../demo/demo?id=' + id,
					 animationType: 'pop-in',
					    animationDuration: 200
				})
			}
		}
	}
</script>

<style>
	/* banner */

	.swiper {
		width: 100%;
		height: 300rpx
	}

	.banner_img {
		width: 100%;
		height: 300rpx;
	}

	/* category */
	.category {
		width: 100%;
		display: inline;
		padding-bottom: 10rpx;
		border-bottom: 15rpx solid rgb(240, 240, 240,0.5);
	}

	.category-img {
		width: 20%;
		margin-top: 25rpx;
		display: inline-block;
		text-align: center;
	}

	.category-imgs {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
	}

	.category-name {
		text-align: center;
		font-size: 30rpx;
	}

	.recommand {
		margin-top: 20px;
	}

	.uni-swiper-dots {
		position: absolute;
		font-size: 0;
	}
.recommand-content uni-swiper{
	height: 285rpx!important;
}
	.re-swiper {
		
		width: 100%;
		display: inline;
	}

	.re-img {
		width: 90%;
		height: 210rpx;
	}

	.re-cotent {
		display: inline;
		text-align: center;
		width: 100%;
	}

	.icon {
		display: inline-block;
		width: 25%;

	}

	.re-bookname {
		font-size: 10rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		letter-spacing: 1rpx;
	}

	.re-booknames {
		font-size: 28rpx;
		width: 90%;
		padding-left: 8rpx;
	}

	.re-title {
		border-left: 4px solid #0EA391;
		font-size: 32rpx;
		margin-bottom: 15rpx;
	}

	/* bookList */
	.book {
		border-top: 15rpx solid rgb(240, 240, 240,0.5);
		padding-top: 10px;
		
	}

	.book-title {
		border-left: 4px solid #0EA391;
		font-size: 32rpx;
		margin-bottom: 15rpx;
	}

	.bookList {
		display: flex;
		flex-direction: row;
		padding-bottom: 10px;
		border-bottom: 15rpx solid rgb(240, 240, 240,0.5);
		margin-top: 22rpx;
		
	}
	.book-name{
		color: #000000;
		font-size: 32rpx;
	}
	.book-img {
		width: 170rpx;
		height: 220rpx;
		margin-left: 15rpx;
		box-shadow: 0 0 8rpx #838287
	}

	.book-description {
		font-size: 26rpx;
		margin-left: 15rpx;
	}
	.book-author{
		line-height: 55rpx;
	}
	.book-xq {
		width: 550rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 45rpx;
	}
	.book-num{
		position: absolute;
		bottom: 30rpx;
		font-size: 24rpx;
		color: #888;
	}
	.bookList{
		position: relative;
		color: #888;
	}
	.book-number{
		background-color: rgb(240, 240, 240);
		padding-left: 10rpx;
		font-size: 24rpx;
		padding-right: 10rpx;
		border-radius: 10rpx;
	}
	.book-cate{
		background-color: rgb(240, 240, 240);
		padding-left: 10rpx;
		font-size: 24rpx;
		padding-right: 10rpx;
		margin-left: 15rpx;
		border-radius: 10rpx;
	}
	.book-status{
		background-color: rgb(240, 240, 240);
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-left: 15rpx;
		font-size: 24rpx;
		border-radius: 10rpx;
	}
	.border-line{
		width: 100%;
		border-top: 15rpx solid rgb(240, 240, 240);
	}
</style>

<template>
	<view class="mains">
	<!-- 	<uni-nav-bar >
		    <view style="text-align: center;width: 100%;">个人中心</view>
		  
		</uni-nav-bar> -->
		
		<!-- <uni-nav-bar left-icon="" fixed="true" left-text=" s" right-text="菜单" title="搜索图书"></uni-nav-bar> -->
		<view class="se">
			<uni-search-bar maxlength="30" :radius="100" @confirm="search" @input="inputSearch"></uni-search-bar>
		</view>
	<!-- 	<view class="searchList" v-for="item in searchList">
			<view class="">
				{{item.name}}
			</view>
		</view> -->
		<view style="height: 110rpx;">
			
		</view>
		<view class="book">
			<view class="bookList" v-for="(item,index) in list">
				<image class="book-img" :src="item.main_img_url"></image>
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
		<!-- <uni-load-more :status="more"></uni-load-more> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				searchList:[]
			}
		},
		methods: {
			search(val){
				var that=this;
				console.log(val.value)
					
			},
			inputSearch(val){
				console.log(val)
				this.$request('/book/search',{keyword:val.value},'get',1).then(res=>{
					console.log(res.data)
					this.searchList=res.data.data
					this.list=res.data.data
				})
			},
			change(val){
				
			}
		}
	}
</script>

<style scoped>
	.mains{
		background-color: rgb(240, 240, 240);
		height: 100vh;
	}
	.se{
		position: fixed;
		width: 100%;
		z-index: 999;
	}
	.list{
		width: 100%;
		height: 100%;
		background-color: #f6f8fa;
	}
	/* searchlist */
	.searchList{
		position: relative;
		z-index: 999;
	}
	/* bookList */
	.book {
		border-top: 15rpx solid rgb(240, 240, 240);
		margin-right: 10rpx;
		margin-left: 10rpx;
		background-color: rgb(240, 240, 240);
	}
	
	.book-title {
		border-left: 4px solid #0EA391;
		font-size: 32rpx;
		margin-bottom: 15rpx;
	}
	
	.bookList {
		display: flex;
		flex-direction: row;
		background-color: rgb(255, 255, 255);
		
		padding: 15rpx;
		margin-bottom: 15rpx;
		
	}
	
	.book-img {
		width: 200rpx;
		height: 220rpx;
		box-shadow: 0 0 8rpx #838287
	}
	
	.book-description {
		font-size: 30rpx;
		margin-left: 25rpx;
	}
	.book-author{
		line-height: 55rpx;
	}
	.book-xq {
		width: 520rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 45rpx;
	}
	.book-num{
		position: absolute;
		bottom: 20rpx;
		font-size: 26rpx;
		color: #888;
	}
	.bookList{
		position: relative;
		color: #888;
	}
	.book-number{
		background-color: rgb(240, 240, 240);
		padding-left: 10rpx;
		padding-right: 10rpx;
		border-radius: 10rpx;
	}
	.book-cate{
		background-color: rgb(240, 240, 240);
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-left: 15rpx;
		border-radius: 10rpx;
	}
	.book-status{
		background-color: rgb(240, 240, 240);
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-left: 15rpx;
		border-radius: 10rpx;
	}
</style>

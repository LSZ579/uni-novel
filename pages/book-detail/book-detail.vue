<template>
	<view class="container">
		<!-- 	<uni-nav-bar>
		    <view>标题栏</view>
		    <view slot="left">left</view>
		    <view slot="right">right</view>
		</uni-nav-bar> -->
		<view class="navar">
			<uni-nav-bar background-color="#a2a0a1" @clickLeft='clickLeft' color="white" left-icon="back" left-text="返回"
			 right-text="目录" title="图书详情"></uni-nav-bar>
		</view>
		<view class="header">
			<view>
				<image class="book-img" :src="detail.book.main_img_url"></image>
			</view>
			<view class="book-detail">
				<view class="name">
					<text>{{detail.book.name}}</text>
				</view>
				<view class="author">
					<text>作者{{detail.book.author}}</text>
				</view>
				<view class="author">
					<text>评分{{score.score }}</text>
					<text>（共有{{ score.count}}人评分）</text>
				</view>
				<view class="num">
					<text>{{detail.book.word_num}}万</text>
					<text>{{detail.book.l_status==1?' 连载中':' 完本'}}</text>
				</view>
			</view>
		</view>
		<view class="section">
			<!-- 	<uni-collapse showAnimation="true" accordion="true">
			    <uni-collapse-item title="标题文字">
			        <view style="padding: 30rpx;">
			            手风琴效果
			        </view>
			    </uni-collapse-item>
			</uni-collapse> -->
			简介：{{detail.book.description}}
		</view>

		<view class="list">
			<view class="directory" @click="toNewestRead()" style="border-top: 15rpx solid rgb(240, 240, 240);margin-top:20rpx">
				<view class="directory_t">最新</view>
				<view class="directory_z" v-if="detail.book.famous">
					第{{detail.book.content_num}}章
				</view>
				<view v-else class="directory_z">{{newContent.title}}</view>
				<image class="icon" src="../../static/images/tabBar/my.png"></image>
			</view>

			<view class="directory" @click="toDiretory" style=" border-bottom: 1rpx solid rgb(240, 240, 240); border-top: 1rpx solid rgb(240, 240, 240);">
				<view class="directory_t">目录</view>
				<view class="directory_z">共{{detail.book.famous?detail.book.content_num:count}}章</view>
				<image class="icon" src="../../static/images/tabBar/my.png"></image>
			</view>
		</view>
		<view class="comments_title">
			<view class="comments_ping">评论
				<!-- <text>（{{commentsList.length||0}}条）</text> -->
			</view>
			<button class="con_to" @click="comment">
				<view class="comments_right">
					<image class="comments_timg" src="../../static/images/icon/xie.png"></image>
					<text class="comments_xie">写书评</text>
				</view>
			</button>
		</view>
		<view class="comment">
			<!-- 评论内容 -->
			<view class="comments">
				<block v-for="item in commentsList">

					<view class="one">
						<image class="avatar_img" :src="item.user_avatar"></image>
						<text class="c_author">{{item.user_name}}</text>

						<text v-if="item.score==null||item.score==0"></text>
						<text v-else class="user_score">{{item.score}}分</text>
					</view>

					<view>
						<text class="commen">{{item.comments}}</text>
					</view>
					<view class="com_time">
						<text>{{item.create_time}}</text>
						<view class="c-btn">
							<button class="support_btn">
								<image v-if="item.support.length>0" :src="'../../static/images/icon/'+item.support[0].supports+'.gif'"></image>
								<image v-if="item.support.length<=0" src="../../static/images/icon/2.gif"></image>
								<text class="txts">{{item.counts.supports}}</text>
							</button>
							<button class="forcomment" @click="toComment">
								<image src="../../static/images/icon/comment.png"></image>
								<text>{{item.comment_count_count}}</text>
							</button>
						</view>

					</view>
					<view class="lines"></view>
				</block>
			</view>
			<view @click="getNext" v-if="commentsList.length>=2" class="more">查看更多</view>
			<view v-if="commentsList.length<=0">
				<view class="comments_null">这里空空如也</view>
				<button class="comments_hot">趁热来一发吧</button>
			</view>
			<!-- 评论内容结束 -->
		</view>
		<view class="footers">
			<button open-type='share' class="shares">
				<text>分享好友</text>
			</button>
			<button class="reads" @click="toRead">开始阅读</button>

			<button v-if="!bookCollect" class="status1" @click="colect">
				<text>加入书架</text>
			</button>
			<button v-else class="status2" @click="colect">移出书架</button>
		</view>
		<view class="pop">
			<uni-popup ref="popup" type="bottom">
				<view style="background-color: #ffffff;padding: 10rpx;padding-top: 20rpx;">
					<view>
						<textarea class="uni-textarea" v-model="comments" selection-start="2" @blur="bindTextAreaBlur" :cursor="2" placeholder-class="placeholder"
						 focus="true" placeholder="请输入内容" />
						</view>
				<view class="comment" style="display:inline-flex;margin-top: 10px;">
					<view class="if-score">
						评分
					</view>
					<view>
						<uni-rate style="margin-top: 12px;" v-model="scores" @change="getScore"></uni-rate>
					</view>
				</view>
				<button class="submit" @click="sumComment" type="primary">提交评论</button>
			</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				score: 0,
				newContent: {},
				count: 0,
				book_id: '',
				bookCollect: 0,
				comments:'',
				commentsList: [],
				scores:0,
				info:{},
				query: {
					page: 1,
					size: 5
				}
			}
		},
		onLoad(options) {
			this.book_id = options.id
			console.log(options.id)
			this.getDetail(options.id)
			this.getCollectStatus()
			this.getComment(options.id)
		},
		methods: {
			getScore(val){
				console.log(val)
				this.scores=val.value
			},
			getDetail(id) {
				uni.showLoading({
					title: '正在加载'
				})
				this.$request('/book/' + id, {}).then(res => {
					console.log(res.book.book)
					this.detail = res.book
					this.score = res.book.avg
					this.newContent = res.book.maxId
					this.count = res.book.count
				})
			},
			 comment(){
			         this.$refs.popup.open()
					 this.getuid()
			      },
			clickLeft() {
				uni.navigateBack({
					delta: 1
				})
			},
			getComment(bookid) {
				this.$request('/comment/getcomments', {
					page: this.query.page,
					size: this.query.size,
					book_id: bookid
				}).then(res => {
					console.log(res.com.data)
					this.commentsList = res.com.data
				})
			},
			toRead() {
				uni.navigateTo({
					url: '../read/read?bookid=' + this.book_id+'&&con_id=1'
				})
			},
			getCollectStatus() {
				this.$request('/collect/get', {
						book_id: this.book_id
					}, 'post')
					.then(res => {
						this.bookCollect = res
					}).catch(res=>{
						this.bookCollect=false
					})
			},
			colect() {
				this.$request('/collect', {
					book_id: this.book_id
				}, 'post').then(res => {
					console.log(res)
					this.getCollectStatus()
					if (!res) {
						uni.showToast({
							title: '移除书架',
							icon: 'success'
						})
					} else {
						uni.showToast({
							title: "收藏成功",
							icon: 'success'
						})
					}
				})
			},
		getuid(){
			this.$request('/token/uid',{},'post')
			.then(res=>{
				this.info=res
			})
		},
			sumComment(){
				console.log(this.scores)
				if(this.comments==undefined||!this.comments){
					uni.showToast({
						title:'内容不能为空',
						type:'fail'
					})
				}
				else{
					this.$request('/comment',{
						 "book_id": this.book_id,
						  "user_avatar": this.info.avatar,
						  "user_name": this.info.user_name,
						  "score": this.scores,
						  "comments":this.comments
					},'post').then(res=>{
						this.getComment(this.book_id)
						uni.showToast({
							title:'提交成功',
							icon:'success'
						})
						this.$refs.popup.close()
					})
				}
			},
			toNewestRead(){
				uni.navigateTo({
					url: '../read/read?bookid=' + this.book_id+'&&con_id='+this.detail.book.content_num?this.detail.book.content_num:this.newContent.content_id
				})
			}
		}
	}
</script>

<style scoped>
	.navar {
		background-color: #a2a0a1;
		color: white;
	}

	.header {
		display: flex;
		flex-direction: row;
		background-color: #a2a0a1;
		padding-bottom: 40rpx;
		color: white;
	}

	.book-img {
		width: 185rpx;
		height: 225rpx;
		margin: 10rpx;
		margin-left: 20rpx;
	}

	.book-detail {
		margin-left: 20rpx;
		font-size: 30rpx;
		line-height: 55rpx;
	}
	/* 写评论 */
	.uni-textarea{
		margin:  0 auto;
		width: 100%;
		height: 250rpx;
		background-color: #f9f9f9;
	}
	.comment{
		
	}
	.placeholder{
		
		padding-left: 10rpx;
	}
	.if-score{
		font-size: 32rpx;
		padding-right: 15rpx;
	}
	.submit{
		margin-top: 25rpx;
	}
	.to-score{
		margin-tpp: 35rpx;
	}
	/* section */
	.section {
		font-size: 30rpx;
		padding: 15rpx;
		color: rgb(111, 111, 111);
	}

	/* list */
	.list {
		margin-top: 25rpx;
	}

	/* 目录 */

	.directory {
		display: flex;
		flex-direction: row;
		position: relative;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 32rpx;
		padding-bottom: 15rpx;
		padding-top: 15rpx;
		margin-top: 5rpx;
	}

	.directory:active {
		background-color: rgb(248, 248, 248, 0.5);
	}

	.directory_t {
		line-height: 60rpx;
		margin-left: 25rpx;
		width: 10%;
	}

	.directory_z {
		font-size: 24rpx;
		margin-left: 15rpx;
		width: 70%;
		color: gray;
		line-height: 60rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.directory .icon {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		margin-top: 10rpx;
		padding-right: 20rpx;
		opacity: 0.5;
		right: 0;
	}

	/* 目录结束 */




	/* 写评论 */

	.comments_t {
		border-bottom: 1rpx solid gainsboro;
		height: 60rpx;
		font-size: 32rpx;
	}

	.comments_title {
		font-size: 32rpx;
		display: flex;
		flex-direction: row;
		height: 60rpx;
		margin-top: 60rpx;
		border-bottom: 1rpx solid gainsboro;
		width: 94%;
		margin-left: 2.5%;
		position: relative;
	}

	.comments_ping {
		line-height: 35rpx;
		margin-left: 10rpx
	}

	.comments_ping text {
		font-size: 26rpx;
		color: grey;
		line-height: 35rpx;
	}

	.comments_xie {
		line-height: 35rpx;
		color: #f1932b;
		background-color: white;
		font-size: 28rpx;
		padding-top: 5rpx;
		padding-left: 8rpx
	}

	.comments_right {
		display: flex;
		flex-direction: row;
		background: white
	}

	.comments_timg {
		line-height: 35rpx;
		width: 35rpx;
		height: 35rpx;
	}

	.con_to {
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		position: absolute;
		right: 0;
		color: #f1932b;
		line-height: 45rpx;
		background: white
	}

	.con_to::after {
		border: none;
	}

	.comments_hot::after {
		border: none;
	}

	.user_score {
		font-size: 24rpx;
		color: #f1932b;
	}

	/* comment */

	.all_comment {
		width: 100%;
	}

	.comments {
		margin-top: 50rpx;
	}

	.one {
		display: flex;
		flex-direction: row;
		margin-left: 35rpx;
		line-height: 50rpx;
		margin-top: 15rpx;
	}

	.avatar_img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 6rpx;
		box-shadow: 0 0 4rpx #8b8b8b;
	}

	.one text {
		margin-left: 15rpx;
	}

	.one .c_author {
		color: rgb(2, 118, 212);
		font-size: 28rpx
	}

	.commen {

		margin-left: 110rpx;
		display: -webkit-box;
		font-size: 26rpx;
		color: gray;
		margin-top: 20rpx;
	}

	.com_time {
		display: flex;
		flex-direction: row;
		font-size: 20rpx;
		color: #8a8a8a;
		margin-top: 40rpx;
		position: relative;
		height: 60rpx;
	}

	.com_time text {
		padding-left: 35rpx;
		line-height: 65rpx;
	}

	.con_to {
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		position: absolute;
		right: 0;
		color: #f1932b;
		line-height: 45rpx;
		background: white
	}

	.con_to::after {
		border: none;
	}

	.comments_hot::after {
		border: none;
	}

	.comments_hot {
		background: white;
		text-align: center;
		font-size: 28rpx;
		line-height: 45rpx;
		color: rgb(58, 112, 228);
	}

	.comments_null {
		text-align: center;
		font-size: 28rpx;
		line-height: 45rpx;
		color: rgb(117, 117, 117);
	}

	.support_btn image {
		width: 65rpx;
		height: 65rpx;
	}

	.support_btn {
		display: flex;
		flex-direction: row;
		font-size: 22rpx;
		background: white;
	}

	.txts {
		font-size: 22rpx;
		line-height: 65rpx;
		margin-left: -35rpx
	}

	.c-btn {
		position: absolute;
		right: 0;
		display: flex;
		flex-direction: row;

	}

	.forcomment {
		height: 60rpx;
		display: flex;
		flex-direction: row;
		line-height: 60rpx;
		font-size: 22rpx;
		background: white;
		margin-top: 2.5rpx
	}

	.forcomment image {
		width: 35rpx;
		height: 35rpx;
		margin-top: 12.5rpx
	}

	.forcomment text {
		line-height: 60rpx;
		margin-left: -20rpx;
	}


	.footers {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100rpx;
		border-top: 1px solid #dadada;
		width: 100%;
		overflow: hidden;
	}

	.status2 {
		color: gainsboro !important;
		border-radius: 0;
	}

	button::after {
		border: none;
		border-radius: 0;
	}

	.footers button ::after {
		border: none;
		border-radius: 0;
	}

	.footers button {
		border-radius: 0;
		width: 33.333333%;
		float: left;
		text-align: center;
		font-size: 36rpx;
		background: #ffffff;
		border: none;
		color: #3b3b3b;
		height: 150rpx;
		line-height: 100rpx;
	}

	.footers .shares {
		background: #ffffff;
		border-radius: 0;
	}

	.footers .reads {
		background: #17b5af;
		color: #fff;
		border-radius: 0;
	}

	.footers .shares text {
		text-align: center;
	}

	.status1 text {
		text-align: center;
	}

	.more {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		text-align: center;
		font-size: 28rpx;
		color: #31ceda;
		border-top: 1px solid #e5e5e5;
		margin-top: 10rpx;
	}

	.create {
		height: 45rpx;
		width: 20%;
		margin-left: 75%;
		line-height: 45rpx;
		text-align: center;
		font-size: 28rpx;
		color: #31ceda;
		border: 1px solid #e5e5e5;
		margin-top: 25rpx;
	}

	/* 猜你喜欢 */

	.b-s {
		position: absolute;
		top: 0;
		margin-top: 35rpx;
		width: 140rpx;
		margin-left: 40rpx;
	}

	.li-image {
		width: 140rpx;
		height: 192rpx;
		border-radius: 10rpx;
		margin-left: 40rpx;
		margin-top: 15rpx;
		position: relative;
	}

	.scroll-view {
		display: flex;
		flex-wrap: wrap;
	}

	.booktitle {
		font-size: 25rpx;
		margin-left: 40rpx;
		width: 140rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.booktime {
		font-size: 14rpx;
		margin-left: 40rpx;
		width: 140rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		color: gray;
		white-space: nowrap;
	}

	.isnull {
		font-size: 26rpx;
		color: red;
		text-align: center;
	}

	.like_t {
		margin-top: 25rpx;
		height: 60rpx;
		position: relative;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid gainsboro;
	}

	.like_n {
		padding-left: 25rpx;
		line-height: 60rpx;
	}

	.like_y {
		height: 60rpx;
		position: absolute;
		right: 0;
		margin-right: 27rpx;
		display: flex;
		flex-direction: row;
	}

	.like_y1 text {
		font-size: 25rpx;
		line-height: 60rpx;
		color: gray;
		margin-right: 18rpx;
	}

	.like_y2 {
		height: 60rpx;
	}

	.like_y2 image {
		margin-top: 15rpx;
		width: 30rpx;
		height: 30rpx;
	}

	/* 猜你喜欢结束 */
</style>

<template>
	<view>
	
			<uni-nav-bar background-color="#a2a0a1" fixed="true"  status-bar="true" @clickLeft='clickLeft' @clickRight="tanchuang" color="white" left-icon="back" left-text="返回"
			 right-text="目录" :title="content"></uni-nav-bar>
	
		<view class="content" :style="{fontSize:fontsize+'rpx'}" v-for="item in list">
			<text space="ensp">{{' '+'  '+item}}</text><br>
		</view>
		<uni-drawer :visible="status">
		    <view style="padding:30rpx;" >
		        <view class="uni-title" @click="getContents(item.content_id,item.book_id)" style="font-size: 32rpx;padding-bottom: 15rpx;" v-for="item in contentList">{{item.title}}</view>
		    </view>
			<view class="nex-btn">
				<text class="txt1" @click="getLastList">上一章</text>
				<text class="txt2" @click="getMoreList">下一章</text>
			</view>
			<!-- <view class="ack">
				<button type="default" @click="getFontSize">+</button>
			</view> -->
		</uni-drawer>
	<!-- 	<view class="setting">
			  <icon :type="setting" size="26"/>十二猴子
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				book_id:'',
				list:[],
				content:'',
				content_id:1,
				status:false,
				page:1,
				size:20,
				contentList:[],
				fontsize:32
			}
		},
		onLoad(op) {
			this.book_id=op.bookid
			this.content_id=op.con_id
		},
		onShow() {
			this.getContent()
			this.getList()
		},
		methods: {
			getContents(cid,bid){
				this.book_id=bid;
				this.content_id=cid
				this.getContent()
			},
			getFontSize(){
				this.fontsize=this.fontsize+2
			},
			getContent(){
				this.$request('/read/content',{book_id:this.book_id,  content_id:this.content_id},'get')
				.then(res=>{
					console.log(res.content)
					this.list=res.content
					this.content=res.title
					console.log(this.content)
				})
			},
			tanchuang(){
				this.status=!this.status;
			},
			getList(){
				this.$request('/read/list',{
					book_id: this.book_id,
					  page: this.page,
					   size: this.size
				},'get').then(res=>{
					console.log(res.res.data)
					this.contentList=res.res.data
				})
			},
			getMoreList(){
				this.page=this.page+1
				this.$request('/read/list',{
					book_id: this.book_id,
					  page: this.page,
					   size: this.size
				},'get').then(res=>{
					console.log(res.res.data)
					this.contentList=res.res.data
					
				})
			},
			getLastList(){
				this.page=this.page-1
				this.$request('/read/list',{
					book_id: this.book_id,
					  page: this.page,
					   size: this.size
				},'get').then(res=>{
					console.log(res.res.data)
					this.contentList=res.res.data
					
				})
			}
		}
	}
</script>

<style scoped>
	.content{
		width: 98%;
		margin-left: 1%;
	}
	.nex-btn{
		text-align: center;
		font-size: 32rpx;
	}
	.txt1{
		padding-right: 30rpx;
	}
	.txt2{
		padding-left: 30rpx;
	}
</style>

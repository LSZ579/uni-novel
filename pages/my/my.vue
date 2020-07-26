<template>
	<view class="page">
		<uni-nav-bar>
		    <view style="text-align: center;width: 100%;">个人中心</view>
		  
		</uni-nav-bar>
	<!-- 	<view class="unLogin" v-if="status">
			<button type="default">登录</button>
		</view> -->
		<view class="isLogin" >
			<view class="my" v-if="status">
			  <view class='bgm'>
			    <view class="avatar" >
			      <image @click="settingInfo" class="avatar_img"  :style="{backgroundImage:'url('+require('../../static/images/avatar/上传头像.png')+')'}"  :src="user.avatar"></image>
			      <view @click="settingInfo" class="name">
			        <text class="avatar_name">{{user.user_name}}</text>
			        <text class="login">状态：已登录</text>
			      </view>
				  <view class="logout" >
					<text @click="logOut">退出登录</text>
				  </view>
			    </view>
			  </view>
			  <view class="myInformation">
			    <view class="info">
			      <view class="info_num">{{info.commentNum}}</view>
			      <view>点评</view>
			    </view>
			
			    <view class="info">
			      <view class="info_num">{{info.suggestNum}}</view>
			      <view>留言</view>
			    </view>
			    <view class="info">
			      <view class="info_num">{{info.userCNum}}</view>
			      <view>消息回复</view>
			    </view>
			    <view class="info">
			      <view class="info_num">{{info.collectNum}}本</view>
			      <view>书架</view>
			    </view>
			  </view>
			</view>
			
			<view v-else class="btn2">
			  <button @click="toLogin()">登录</button>
			</view>
		</view>
		
		
		<view class="mybar">
		  <view>
		    <button class="suggest" @click="toCreateSuggest">
		      <image class="suggest_t" src="../../static/images/icon/suggest.png"></image>
		      <text class="suggest_tt">留言</text>
		      <image class="suggest_j" src="../../static/images/icon/jiantou.png"></image>
		    </button>
		  </view>
		
		  <view class="line"></view>
		  <view>
		    <button class="suggest" @click="toNews">
		      <image class="suggest_t" src="../../static/images/icon/news.png"></image>
		      <text class="suggest_tt">消息回复</text>
		     <!-- <text class="suggest_news" v-if="{{news==0}}"></text>
		      <text class="suggest_news" v-else>{{news}}</text>
		      <text class="suggest_newss" v-if="{{news!=0}}"></text> -->
		      <image class="suggest_j" src="../../static/images/icon/jiantou.png"></image>
		    </button>
		  </view>
		  <view class="line"></view>
		  <view>
		    <button class="suggest" @click="toMybookComments">
		      <image class="suggest_t" src="../../static/images/icon/comments.png"></image>
		      <text class="suggest_tt">我的书评</text>
		      <image class="suggest_j" src="/static/images/icon/jiantou.png"></image>
		    </button>
		  </view>
		
		  <view class="line"></view>
		  <view>
		    <button class="suggest" @click="toHistory">
		      <image class="suggest_t" src="../../static/images/icon/zuji.png"></image>
		      <text class="suggest_tt">浏览记录</text>
		      <image class="suggest_j" src="../../static/images/icon/jiantou.png"></image>
		    </button>
		  </view>
		</view>
		
	<!-- 	<view class="sao">
		  <view>
		    <button class="suggest" bindtap="screenISBN">
		      <image class="suggest_t" src="/images/icon/saoyisao.png"></image>
		      <text class="suggest_tt">扫一扫</text>
		      <image class="suggest_j" src="/images/icon/jiantou.png"></image>
		    </button>
		  </view>
		</view> -->
		
		<view class="system">
		  <view>
		    <button class="suggest"@click="toVersion">
		      <image class="suggest_t" src="/static/images/icon/banben.png" style="opacity:0.6"></image>
		      <text class="suggest_tt">版本信息</text>
		      <image class="suggest_j" src="../../static/images/icon/jiantou.png"></image>
		    </button>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:false,
				info:'',
				user:'',
				avate:'../../static/images/avatar/上传头像.png'
			}
		},
		onLoad() {
		
		},
		onPullDownRefresh() {
			var that=this
			uni.getStorageSync('token')?this.status=true:this.status=false
			that.getuid()
			that.getInfo()
				setTimeout(() => {
							uni.stopPullDownRefresh()
						}, 1000)
		},
		onShow() {
			uni.getStorageSync('token')?this.status=true:this.status=false
			console.log(this.status)
			//this.login()
			var that=this
			
				that.getuid()
				that.getInfo()
		},
		methods: {
			settingInfo(){
				console.log(6666)
				uni.navigateTo({
					url:'../setInfo/setInfo?name='+this.user.user_name+'&url='+this.user.avatar
				})
			},
			login(){
				this.$request('/token/phone',{ac:123666,se:123456},'post').then(res=>{
					console.log(res)
					this.token=res.token
					uni.setStorageSync('token',res.token)
				})
			},
			logOut(){
				uni.clearStorage('token')
				this.status=false
				console.log(555)
			},
			getuid(){
				this.$request('/token/uid',{},'post')
				.then(res=>{
					this.user=res
				})
			},
			getInfo(){
				this.$request('/token/getUserMessage',{},'post').then(res=>{
					console.log(res)
					this.info=res
				})
			},
			toLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
.page{
  width: 100vw;
  height: 100vh;
  background: rgb(230, 230, 230,0.5)
}
.my{
  width: 95%;
  margin-left: 2.5%;
  margin-top: 30rpx;
  background-color: white;
  border-radius:15rpx ;
  box-shadow: 0 0 10rpx rgba(167, 167, 167, 0.2)
}
.logout{
	text-align: right;
	font-size: 26rpx;
	color: #bd0000;
	flex: 1;
}
.avatar{
  display: flex;
  flex-direction: row;
  margin-left: 30rpx;
  height: 100rpx;
  padding: 17rpx 0;
  border-bottom: 1rpx solid gainsboro;
  margin-right: 30rpx;
}
.avatar_name{
  line-height: 80rpx;
  margin-left: 20rpx;
  margin-top: -10rpx;
  font-size: 34rpx;
  color: rgb(214, 61, 0)
}
.avatar_img{
  width: 100rpx;
  height: 100rpx;
  border: 1rpx gainsboro solid;
  border-radius: 65rpx;
  background-repeat: no-repeat;
  background-size: cover;
}
.name{
  display: flex;
  flex-direction: column;
}

/* information */
.myInformation{
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 15rpx;
  text-align: center;
  font-size: 22rpx;
  color: rgb(119, 119, 119);
  padding-bottom: 30rpx;
  padding-top: 10rpx;
}
.info{
  width: 20%;
  margin-left: 4%;
}
 .info_num{
   font-size: 24rpx;
   color: black;
   padding-bottom: 10rpx;
   font-weight: 500
 }
.login{
  line-height: 20rpx;
  font-size: 20rpx;color: rgb(163, 163, 163);
  margin-left: 20rpx;
}


.name1{
  display: flex;
  flex-direction: row;
  height: 50rpx
}

.btn2{
  width: 200rpx;
  height: 80rpx;
  position: relative;
  left: 50%;
  margin-left: -100rpx;
  margin-top: 30rpx
}
.btn2 button{
   background-color: #df2525;
  color: white;
  font-size: 32rpx;
  width: 100%;
  height: 70rpx;
  line-height: 70rpx;
  font-weight:600

}

.mybar{
  width: 95%;
  margin-left: 2.5%;
  margin-top: 30rpx;
  background-color: white;
  padding: 15rpx 0;
  border-radius:10rpx ;
  box-shadow: 0 0 10rpx rgba(167, 167, 167, 0.2)
}



.suggest{
  display: flex;
  flex-direction: row;
  height: 80rpx;
  background: none;
 
}

.suggest::after{
  border: none;
}
.suggest_t{
  width: 40rpx;
  height: 40rpx;
  padding-top: 20rpx;
}
.suggest_tt{
  line-height: 80rpx;
  font-size: 30rpx;
 padding-left: 15rpx
}
.suggest_j{
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  right: 0;
  opacity: 0.6;
  margin-right: 10rpx;
  padding-top: 20rpx;
}

.line{
  border-bottom: 1rpx solid rgb(240, 240, 240);
  width: 95%;
  height: 10rpx;
  margin-left: 2.5%;
}

.suggest_news{
  position: absolute;
  right: 0;
  margin-right: 90rpx;
  line-height: 80rpx;
  color: red
}
.suggest_newss{
  position: absolute;
  right: 0;
  margin-right: 70rpx;
  line-height: 80rpx;
  margin-top: 40rpx;
  width: 10rpx;
  height: 10rpx;
  background: red;
  border-radius: 5rpx
}

.sao{
   width: 95%;
  margin-left: 2.5%;
  margin-top: 20rpx;
  background-color: white;
  padding: 5rpx 0;
  box-shadow: 0 0 10rpx rgba(167, 167, 167, 0.2);
  border-radius:10rpx 
}
.system{
    width: 95%;
  margin-left: 2.5%;
  margin-top: 20rpx;
  background-color: white;
  padding: 5rpx 0;
  border-radius:10rpx;
  box-shadow: 0 0 10rpx rgba(167, 167, 167, 0.2)
}
</style>

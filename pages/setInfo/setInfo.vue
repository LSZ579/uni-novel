<template>
	<view>
		<view class="avatar">
			<view style="line-height: 120rpx;">
				头像：
			</view>
			<view class="img">
				<image @click="unload"  :style="{backgroundImage:'url('+require('../../static/images/icon/unload.png')+')'}" :src="u" mode=""></image>
			</view>
		</view>
		<view class="name">
			图片：<input class="input" type="text" v-model="u" />
		</view>
		<view class="name">
			昵称：<input class="input" type="text" v-model="name" />
		</view>
		<view class="" style="margin-top: 30rpx;margin: 20px;">
			<button @click="sumit" type="primary">提交更改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query:{
					url:''
				},
				defaultUrl: '../../static/images/icon/unload.png',
				name: '',
				u:''
			}
		},
		onLoad(o) {
			this.name = o.name
			this.u = o.url
		},
		methods: {

			unload() {
				let _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: 'https://lsz520.xyz/public/index.php/api/v1/insertbook/uploadImgs',
							filePath: tempFilePaths[0],
							name: 'file',
							success: function(res) {
								console.log(JSON.parse(res.data))
								console.log(res.data,55555)
								let u=JSON.parse(res.data)
								//console.log(u)
								//let url='https://lsz520.xyz/public'+u.url
								//console.log(u)
								//_self.$set(this.query,'url',url)
								//console.log(this.url)
								
								_self.u='https://lsz520.xyz/public'+u.url
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});

			},
			sumit(){
				this.$request('/uploadImgs/updateInfo',{name:this.name,url:this.u},'post').then(res=>{
					if(res){
						uni.showToast({
							title:'成功更改',
							type:'suceess'
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.name {
		display: flex;
		margin: 20px;
		line-height: 72rpx;
	}

	.input {
		border: 1rpx solid #efefef;
		width: 80%;
		border-radius: 15rpx;
		height: 72rpx;
	}

	.avatar {
		display: flex;
		margin: 20px;
	}

	.avatar .img image {
		width: 120rpx;
		height: 120rpx;
		background-repeat: no-repeat;  background-size: cover;
	}
</style>

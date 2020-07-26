<template>
	<view>
		<view class="list">
			<view>

				<!-- 	<uni-swipe-action-item v-for="(item,index) in list" :key="index" :options="options">
				    <view class='cont'><image :src="item.book.main_img_url" mode=""></image></view>
				</uni-swipe-action-item> -->
				<uni-swipe-action v-for="(item,index) in list" :key="index">
					<uni-swipe-action-item :options="options" @click="deletes(item.book_id)" @change="change">
						<view class='cont'>
							<view class="img">
								<image :src="item.book.main_img_url" mode="">
							</view>
							<view class="detail">
								<view class="name">
									{{item.book.name}}
								</view>
								<view class="detail-content">
									<view class="z">{{item.record?`上次阅读：${item.record}`:'暂无阅读记录'}}</view>
									<view class="z">阅读时间：{{item.new_time||'无'}}</view>
									<view class="z">{{item.time}}收藏</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<view style="color: #cccccc;text-align: center;font-size: 26rpx;margin: 10px;">
					-我是有底线的-
				</view>
			</view>



		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				query: {
					page: 1,
					size: 10
				},
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onLoad() {
			this.getMyBook()
		},
		onReachBottom() {

		},
		onPullDownRefresh() {
			this.getMyBook()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			deletes(e) {
				console.log(e)
				uni.showLoading({
					title:'正在删除'
				})
				let query=[]
				let token=''
				query.push(e)
				uni.getStorage({
					key: 'token',
					success: function(res) {
						console.log(res.data);
						token = res.data;
					}
				});
				uni.request({
					url:'https://lsz520.xyz/public/index.php/api/v1/collect/batch',
					method:'POST',
					data:{
						arr:query
					},
					header:{
						token
					}
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title: '移除成功',
						type:'success'
					});
					this.getMyBook()
				})
				// this.$request('/collect/batch',{arr:query},'post').then(res=>{
				// 	this.uni.showToast({
				// 		title: '成功',
				// 		type:'success'
				// 	});
				// })
			},
			change(open) {
				console.log('当前开启状态：' + open)
			},
			getMyBook() {
				this.$request('/collect/getbookself', {}, 'post')
					.then(res => {
						console.log(res)
						let arr = res
						for (var i = 0; i < arr.length; i++) {
							var nowTime = new Date();
							var year = nowTime.getFullYear()
							var month = nowTime.getMonth() + 1
							var day = nowTime.getDate();
							var hours = parseInt(nowTime.getHours());
							var minutes = nowTime.getMinutes();
							var time = '';
							var times = arr[i].time;
							var timeyear = times.substring(0, 4);
							var timemo = times.substring(5, 7);
							var timeday = times.substring(8, 10);
							var timehours = parseInt(times.substring(11, 13));
							var timeminutes = times.substring(14, 16);
							var d_year = year - timeyear;
							var d_mo = Number(month) - Number(timemo);
							var d_day = Math.abs(day - timeday);
							var d_hours = hours - timehours;
							var d_minutes = Math.abs(minutes - timeminutes);
							// console.log(timeday+'---'+day)
							// console.log(d_day)
							// console.log(d_hours)
							if (d_day <= 1 && d_year <= 1 && d_mo <= 1) {
								switch (d_day) {
									case 0:
										if (d_hours == 0 && d_minutes > 0) {
											time = d_minutes + '分钟前'
										} else if (d_hours == 0 && d_minutes == 0) {
											time = '1分钟前';
										} else {
											time = d_hours + '小时前';
										}
										break;
									case 1:
										if (d_hours < 0) {
											time = (24 + d_hours) + '小时前';
										} else {
											time = d_day + '天前';
										}
										break;
								}
							} else if (d_day > 1 && d_mo < 1 && d_year < 1) {
								time = d_day + '天前';
							} else if (d_mo == 1 && d_year < 1 && d_day != 0) {
								time = (30 - Math.abs(d_day)) + '天前';
							} else if (d_mo == 1 && d_year < 1 && d_day == 0) {
								time = '1月前';
							} else if (d_mo > 1 && d_year < 1) {
								time = d_mo + '月前';
							} else {
								time = time.substring(0, 10)
							}
							arr[i].time = time;
						}
						// for(var i=0,len=arr.length;i<len;i++){
						// 	arr[i].time=arr[i].time.substring(0,10)
						// }
						this.list = arr
					})
			}
		}
	}
</script>

<style scoped>
	.cont {
		display: flex;
		width: 98%;
		margin: 0 auto;
		margin-top: 10px;
	}

	.img image {
		width: 160rpx;
		height: 190rpx;
		box-shadow: 1px 0 10rpx #d6d6d6;
	}

	.detail {
		padding-left: 15rpx;
	}

	.detail-content {
		font-size: 24rpx;
		color: rgb(150, 147, 142);
	}

	.z {
		padding-top: 10rpx;
	}
</style>

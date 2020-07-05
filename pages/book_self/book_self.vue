<template>
	<view>
		<view class="list">
			<view v-for="(item,index) in list" :key="index">
				<image :src="item.book.main_img_url" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad(){
			this.getMyBook()
		},
		methods: {
			getMyBook(){
				this.$request('/collect/getbookself',{},'post')
				.then(res=>{
					console.log(res)
					this.list=res
				})
			}
		}
	}
</script>

<style>

</style>
